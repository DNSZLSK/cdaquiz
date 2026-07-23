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

export function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
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
