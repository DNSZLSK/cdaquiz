// Code de synchro entre appareils : toute la progression (quiz, labo,
// classement) compressee en une chaine a copier/coller. Fusion sans
// ecrasement : le meilleur statut gagne, les tentatives s'additionnent.
const QUIZ_PROGRESS_KEY = 'cdaquiz_progress';
const LABO_PROGRESS_KEY = 'cdaquiz_labo_progress';
const LEADERBOARD_KEY = 'cdaquiz_leaderboard';

const MAGIC_GZIP = 'CDAQ1:';
const MAGIC_PLAIN = 'CDAQ0:';

function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
}

function bytesToBase64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
}

function base64ToBytes(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
}

export async function buildSyncCode() {
    const payload = JSON.stringify({
        p: readJson(QUIZ_PROGRESS_KEY, {}),
        l: readJson(LABO_PROGRESS_KEY, { v: 1 }),
        b: readJson(LEADERBOARD_KEY, [])
    });
    const raw = new TextEncoder().encode(payload);
    if (typeof CompressionStream === 'undefined') {
        return MAGIC_PLAIN + bytesToBase64(raw);
    }
    const gz = await new Response(
        new Blob([raw]).stream().pipeThrough(new CompressionStream('gzip'))
    ).arrayBuffer();
    return MAGIC_GZIP + bytesToBase64(new Uint8Array(gz));
}

async function decodeSyncCode(code) {
    const trimmed = code.trim();
    let bytes;
    if (trimmed.startsWith(MAGIC_GZIP)) {
        const gz = base64ToBytes(trimmed.slice(MAGIC_GZIP.length));
        bytes = await new Response(
            new Blob([gz]).stream().pipeThrough(new DecompressionStream('gzip'))
        ).arrayBuffer();
    } else if (trimmed.startsWith(MAGIC_PLAIN)) {
        bytes = base64ToBytes(trimmed.slice(MAGIC_PLAIN.length));
    } else {
        throw new Error('Code de synchro non reconnu (il doit commencer par CDAQ).');
    }
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (typeof data !== 'object' || data === null) throw new Error('Contenu invalide.');
    return data;
}

// ok est definitif ; sinon l'entree la plus recente decide du statut et de la
// derniere reponse. Tentatives : max des deux (PAS la somme : la fusion doit
// etre idempotente, rejouer le meme code ne doit rien changer).
function mergeLaboEntry(a, b) {
    if (!a) return b;
    if (!b) return a;
    const newer = (b.t || 0) >= (a.t || 0) ? b : a;
    const merged = {
        s: (a.s === 'ok' || b.s === 'ok') ? 'ok' : newer.s,
        n: Math.max(a.n || 0, b.n || 0),
        t: Math.max(a.t || 0, b.t || 0)
    };
    const answer = newer.a !== undefined ? newer.a : (a.a !== undefined ? a.a : b.a);
    if (answer !== undefined) merged.a = answer;
    return merged;
}

export async function applySyncCode(code) {
    const incoming = await decodeSyncCode(code);
    const report = { quiz: 0, labo: 0, scores: 0 };

    // Progression quiz : meilleur pourcentage par module
    const localP = readJson(QUIZ_PROGRESS_KEY, {});
    for (const [mod, inc] of Object.entries(incoming.p || {})) {
        if (!inc || typeof inc.bestPct !== 'number') continue;
        const cur = localP[mod];
        if (!cur || inc.bestPct > (cur.bestPct || 0)) {
            localP[mod] = { bestPct: Math.max(inc.bestPct, cur?.bestPct || 0), lastPct: cur?.lastPct ?? inc.lastPct };
            report.quiz++;
        }
    }
    localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(localP));

    // Progression labo : fusion entree par entree
    const localL = readJson(LABO_PROGRESS_KEY, { v: 1 });
    for (const [domain, entries] of Object.entries(incoming.l || {})) {
        if (domain === 'v' || typeof entries !== 'object' || entries === null) continue;
        if (!localL[domain]) localL[domain] = {};
        for (const [id, inc] of Object.entries(entries)) {
            const before = JSON.stringify(localL[domain][id] || null);
            localL[domain][id] = mergeLaboEntry(localL[domain][id], inc);
            if (JSON.stringify(localL[domain][id]) !== before) report.labo++;
        }
    }
    localStorage.setItem(LABO_PROGRESS_KEY, JSON.stringify(localL));

    // Classement : union dedupliquee, tri, top 50
    const localB = readJson(LEADERBOARD_KEY, []);
    const seen = new Set(localB.map(e => JSON.stringify(e)));
    for (const entry of incoming.b || []) {
        if (!entry || typeof entry.name !== 'string') continue;
        const key = JSON.stringify(entry);
        if (!seen.has(key)) {
            seen.add(key);
            localB.push(entry);
            report.scores++;
        }
    }
    localB.sort((x, y) => y.pct - x.pct || x.timeSec - y.timeSec);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(localB.slice(0, 50)));

    return report;
}
