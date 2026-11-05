import { getModuleName } from '../../data/catalog.js';
import { loadLeaderboard, addLeaderboardEntry, recordProgress } from '../storage.js';
import { escapeHtml, formatTime } from '../utils.js';

let currentSession = null;

export function showResults(session) {
    currentSession = session;
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('results').classList.add('show');

    // Message GLaDOS en français selon le score
    const percentage = (session.score / session.length()) * 100;
    let glaDOSMessage = '';

    if (session.score === 0) {
        glaDOSMessage = "Nous avons dû modifier vos résultats. Vous êtes un cas particulier.";
    } else if (percentage === 100) {
        glaDOSMessage = "Excellent. Vous êtes un triomphe.";
    } else if (percentage >= 75) {
        glaDOSMessage = "Performance acceptable. Le gâteau et les conseils en cas de chagrin seront disponibles à la fin du test.";
    } else if (percentage >= 50) {
        glaDOSMessage = "Le Centre d'Enrichissement vous rappelle que l'échec n'est que le succès arrondi à l'inférieur.";
    } else {
        glaDOSMessage = "Le test est maintenant terminé. Toutes les technologies Aperture restent opérationnelles.";
    }

    const scoreDisplay = document.querySelector('.score-display');
    scoreDisplay.innerHTML = `
        <div class="score">${session.score}<span class="score-of">/${session.length()}</span></div>
        <div class="total">${session.length() > 1 ? 'réponses justes' : 'réponse juste'}</div>
        <p class="ap-quote">"${glaDOSMessage}"</p>
    `;

    // Stats par module
    const statsDiv = document.getElementById('moduleStats');
    statsDiv.innerHTML = '<h3>Détails par module</h3>';

    for (const [moduleKey, stats] of Object.entries(session.moduleScores)) {
        const pct = (stats.correct / stats.total) * 100;
        let scoreClass = 'bad';
        if (pct >= 75) scoreClass = 'good';
        else if (pct >= 50) scoreClass = 'medium';

        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <span class="module-name">${getModuleName(moduleKey)}</span>
            <span class="module-score ${scoreClass}">${stats.correct}/${stats.total} (${pct.toFixed(0)}%)</span>
        `;
        statsDiv.appendChild(item);
    }

    // Temps de réalisation
    document.getElementById('scoreTime').textContent = 'Temps : ' + formatTime(session.lastElapsedSec);

    // Saisie du pseudo + classement
    const nameSection = document.getElementById('nameInputSection');
    nameSection.style.display = 'block';
    const nameInput = document.getElementById('playerName');
    nameInput.value = '';
    nameInput.style.borderColor = '';
    renderLeaderboard();
    document.getElementById('leaderboard').style.display = 'block';

    // Enregistrer la progression du sujet de test
    recordProgress(session.moduleKey, session.score, session.length());

    // Re-tester les anomalies (questions ratées)
    const retrySection = document.getElementById('retrySection');
    if (session.wrongIds.length > 0) {
        retrySection.innerHTML = '<button class="btn-retry" data-action="retry">'
            + '⟲ Re-tester les anomalies (' + session.wrongIds.length + ')</button>';
    } else {
        retrySection.innerHTML = '';
    }
}

export function saveScore() {
    if (!currentSession) return;
    const input = document.getElementById('playerName');
    const name = input.value.trim();
    if (!name) {
        input.focus();
        input.style.borderColor = '#d73a49';
        return;
    }

    const total = currentSession.length();
    const pct = total > 0 ? Math.round((currentSession.score / total) * 100) : 0;
    addLeaderboardEntry({
        name: name,
        score: currentSession.score,
        total: total,
        pct: pct,
        timeSec: currentSession.lastElapsedSec,
        module: currentSession.moduleKey,
        date: new Date().toISOString()
    });

    document.getElementById('nameInputSection').style.display = 'none';
    renderLeaderboard();
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboardContent');
    const moduleKey = currentSession.moduleKey;
    const entries = loadLeaderboard()
        .filter(e => e.module === moduleKey)
        .sort((a, b) => b.pct - a.pct || a.timeSec - b.timeSec)
        .slice(0, 10);

    let html = '<div class="ap-results-meta">Module : ' + escapeHtml(getModuleName(moduleKey)) + '</div>';

    if (entries.length === 0) {
        html += '<div class="leaderboard-empty">Aucun score enregistré pour ce module. Soyez le premier !</div>';
    } else {
        entries.forEach((e, i) => {
            const topClass = i < 3 ? ' top' + (i + 1) : '';
            html += '<div class="leaderboard-item' + topClass + '">'
                + '<span class="rank">#' + (i + 1) + '</span>'
                + '<span class="player">' + escapeHtml(e.name) + '</span>'
                + '<span class="lb-score">' + e.score + '/' + e.total + ' (' + e.pct + '%)</span>'
                + '<span class="lb-time">' + formatTime(e.timeSec) + '</span>'
                + '</div>';
        });
    }
    container.innerHTML = html;
}
