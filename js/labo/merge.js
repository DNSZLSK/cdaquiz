// Moteur de fusion de progression (quiz + labo + classement + vocabulaire), IDEMPOTENT :
// rejouer la meme fusion ne change rien. Utilise par la synchro cloud.
const QUIZ_PROGRESS_KEY = 'cdaquiz_progress';
const LABO_PROGRESS_KEY = 'cdaquiz_labo_progress';
const LEADERBOARD_KEY = 'cdaquiz_leaderboard';
const SENSEI_PROGRESS_KEY = 'cdaquiz_sensei';
// Modules retires du quiz : jamais reintroduits depuis le cloud (voir js/storage.js)
const REMOVED_MODULES = ['unity'];

function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
}

export function snapshotAll() {
    return {
        p: readJson(QUIZ_PROGRESS_KEY, {}),
        l: readJson(LABO_PROGRESS_KEY, { v: 1 }),
        b: readJson(LEADERBOARD_KEY, []),
        s: readJson(SENSEI_PROGRESS_KEY, null)
    };
}

// Progression Sensei (onglet Vocabulaire). Regles, toutes idempotentes :
// - lecons faites : union (la date la plus ancienne est gardee) ;
// - cartes de revision : par mot, la version modifiee le plus recemment (champ t) ;
// - serie de jours : celle dont le dernier jour est le plus recent ;
// - le reste (points faibles, test, langage) : l'objet modifie le plus recemment.
function mergeSensei(a, b) {
    if (!b || typeof b !== 'object') return a;
    if (!a || typeof a !== 'object') return b;
    const newer = (b.updatedAt || 0) > (a.updatedAt || 0) ? b : a;
    const done = { ...(a.done || {}) };
    for (const [id, day] of Object.entries(b.done || {})) {
        if (!done[id] || day < done[id]) done[id] = day;
    }
    const cards = { ...(a.cards || {}) };
    for (const [id, card] of Object.entries(b.cards || {})) {
        const cur = cards[id];
        if (!cur || (card.t || 0) > (cur.t || 0)) cards[id] = card;
    }
    const sa = a.streak || {}, sb = b.streak || {};
    const streak = (sb.last || '') > (sa.last || '') || ((sb.last || '') === (sa.last || '') && (sb.n || 0) > (sa.n || 0)) ? sb : sa;
    return { ...newer, done, cards, streak, updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0) };
}

// ok est definitif ; sinon l'entree la plus recente decide du statut et de la
// derniere reponse. Tentatives : max des deux (idempotence).
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

// Fusionne un instantane distant {p, l, b} dans le localStorage local.
export function mergeAll(incoming) {
    const report = { quiz: 0, labo: 0, scores: 0, sensei: 0 };
    if (!incoming || typeof incoming !== 'object') return report;

    // Progression quiz : meilleur pourcentage par module
    const localP = readJson(QUIZ_PROGRESS_KEY, {});
    for (const [mod, inc] of Object.entries(incoming.p || {})) {
        if (!inc || typeof inc.bestPct !== 'number' || REMOVED_MODULES.includes(mod)) continue;
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
        if (!entry || typeof entry.name !== 'string' || REMOVED_MODULES.includes(entry.module)) continue;
        const key = JSON.stringify(entry);
        if (!seen.has(key)) {
            seen.add(key);
            localB.push(entry);
            report.scores++;
        }
    }
    localB.sort((x, y) => y.pct - x.pct || x.timeSec - y.timeSec);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(localB.slice(0, 50)));

    // Vocabulaire (Sensei)
    if (incoming.s && typeof incoming.s === 'object') {
        const localS = readJson(SENSEI_PROGRESS_KEY, null);
        const mergedS = mergeSensei(localS, incoming.s);
        if (JSON.stringify(mergedS) !== JSON.stringify(localS)) {
            localStorage.setItem(SENSEI_PROGRESS_KEY, JSON.stringify(mergedS));
            report.sensei++;
        }
    }

    return report;
}
