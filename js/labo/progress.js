// Progression du mode LABO. Cle dediee — ne touche JAMAIS aux cles du quiz
// (cdaquiz_leaderboard, cdaquiz_progress).
const KEY = 'cdaquiz_labo_progress';

function loadAll() {
    try {
        const d = JSON.parse(localStorage.getItem(KEY));
        return (d && d.v === 1) ? d : { v: 1 };
    } catch (e) {
        return { v: 1 };
    }
}

export function getStatus(domain, id) {
    return loadAll()[domain]?.[id]?.s || null;
}

// status : 'ok' (reussi, definitif) | 'ko' (echoue) | 'sol' (solution vue)
export function record(domain, id, status) {
    const all = loadAll();
    if (!all[domain]) all[domain] = {};
    const cur = all[domain][id] || { s: null, n: 0 };
    // 'ok' est definitif ; 'sol' n'ecrase pas 'ok'
    const next = cur.s === 'ok' ? 'ok' : status;
    all[domain][id] = { s: next, n: cur.n + 1, t: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(all));
}

export function getEntry(domain, id) {
    return loadAll()[domain]?.[id] || null;
}

export function resetAll() {
    localStorage.removeItem(KEY);
}

export function getDomainStats(domain, idPrefix = '') {
    const entries = Object.entries(loadAll()[domain] || {})
        .filter(([id]) => id.startsWith(idPrefix));
    const stats = { ok: 0, ko: 0, sol: 0 };
    for (const [, v] of entries) {
        if (v.s in stats) stats[v.s]++;
    }
    return stats;
}
