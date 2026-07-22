// Ecran recapitulatif de fin de protocole (domaine code ou scenario SQL).
// Reutilise les classes de l'ecran de resultats du quiz (score-display, stat-item).

function gladosFor(pct) {
    if (pct === 100) return "Calibration parfaite. Le Centre d'Enrichissement est impressionné. C'est rare.";
    if (pct >= 75) return "Protocole largement validé. Le gâteau reste théorique, mais vous progressez.";
    if (pct >= 50) return "Protocole validé de justesse. Nous avons vu pire. Nous avons surtout vu mieux.";
    if (pct > 0) return "Protocole terminé. Les résultats ont été transmis au département des anomalies.";
    return "Nous avons dû modifier vos résultats. Vous êtes un cas particulier.";
}

export function recapHtml(stats, total) {
    const pct = total > 0 ? Math.round((stats.ok / total) * 100) : 0;
    const untried = total - stats.ok - stats.ko - stats.sol;
    return `
        <div class="score-display">
            <div class="score">${stats.ok}/${total}</div>
            <div class="total">exercices calibrés (${pct}%)</div>
            <div class="labo-recap-glados">"${gladosFor(pct)}"</div>
        </div>
        <div class="module-stats">
            <div class="stat-item"><span class="module-name">Réussis</span><span class="module-score good">${stats.ok}</span></div>
            <div class="stat-item"><span class="module-name">Échoués</span><span class="module-score bad">${stats.ko}</span></div>
            <div class="stat-item"><span class="module-name">Solutions consultées</span><span class="module-score medium">${stats.sol}</span></div>
            <div class="stat-item"><span class="module-name">Non tentés</span><span class="module-score">${untried}</span></div>
        </div>
    `;
}
