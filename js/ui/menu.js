import { modules } from '../../data/modules.js';
import { getQuestionsFor } from '../../data/catalog.js';
import { loadProgress } from '../storage.js';

function progressLine(p) {
    if (!p) return '';
    const cls = p.bestPct >= 75 ? 'good' : (p.bestPct >= 50 ? 'medium' : 'bad');
    return `<p class="module-progress ${cls}">Calibration max : ${p.bestPct}%</p>`;
}

export function renderModuleGrid() {
    const grid = document.getElementById('moduleGrid');
    grid.innerHTML = '';
    const progress = loadProgress();

    // Option "Tous les modules"
    const allCard = document.createElement('div');
    allCard.className = 'module-card all';
    allCard.dataset.module = 'all';
    allCard.innerHTML = `
        <h3>Tous les modules</h3>
        <p>Protocole d'évaluation complet</p>
        <p class="question-count">${getQuestionsFor('all').length} questions</p>
        ${progressLine(progress['all'])}
    `;
    grid.appendChild(allCard);

    // Cartes pour chaque module
    for (const [key, module] of Object.entries(modules)) {
        const card = document.createElement('div');
        card.className = `module-card ${key}`;
        card.dataset.module = key;
        card.innerHTML = `
            <h3>${module.name}</h3>
            <p>${module.description}</p>
            <p class="question-count">${getQuestionsFor(key).length} questions</p>
            ${progressLine(progress[key])}
        `;
        grid.appendChild(card);
    }
}
