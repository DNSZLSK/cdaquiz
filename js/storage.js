// Persistance localStorage. Les cles sont celles de la v1 : ne jamais les changer
// sans migration (les scores des utilisateurs en dependent).
const LEADERBOARD_KEY = 'cdaquiz_leaderboard';
const PROGRESS_KEY = 'cdaquiz_progress';

export function loadLeaderboard() {
    try {
        return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
    } catch (e) {
        return [];
    }
}

export function addLeaderboardEntry(entry) {
    const board = loadLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.pct - a.pct || a.timeSec - b.timeSec);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 50)));
    window.dispatchEvent(new CustomEvent('cdaquiz:changed')); // synchro cloud eventuelle
}

// Modules retires du quiz : leurs scores et leurs entrees de classement sont effaces
// (ici en local, et dans js/labo/merge.js pour ce qui revient du cloud).
export const REMOVED_MODULES = ['unity'];

export function purgeRemovedModules() {
    let changed = false;
    const p = loadProgress();
    for (const m of REMOVED_MODULES) if (m in p) { delete p[m]; changed = true; }
    if (changed) localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    const board = loadLeaderboard();
    const kept = board.filter(e => !REMOVED_MODULES.includes(e.module));
    if (kept.length !== board.length) { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(kept)); changed = true; }
    // la prochaine synchro pousse l'etat nettoye vers le cloud
    if (changed) window.dispatchEvent(new CustomEvent('cdaquiz:changed'));
    return changed;
}

export function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
}

export function resetQuizProgress() {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(LEADERBOARD_KEY);
}

export function recordProgress(moduleKey, sc, total) {
    if (moduleKey === 'retry' || !total) return;
    const p = loadProgress();
    const pct = Math.round((sc / total) * 100);
    const cur = p[moduleKey] || { bestPct: 0 };
    p[moduleKey] = { bestPct: Math.max(cur.bestPct || 0, pct), lastPct: pct };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    window.dispatchEvent(new CustomEvent('cdaquiz:changed')); // synchro cloud eventuelle
}
