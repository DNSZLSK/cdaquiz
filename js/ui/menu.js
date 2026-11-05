import { modules } from '../../data/modules.js';
import { getQuestionsFor } from '../../data/catalog.js';
import { loadProgress } from '../storage.js';
import { PICTO } from './pictos.js';

const plural = (n, word) => `${n} ${word}${n > 1 ? 's' : ''}`;

// Panneau de module : numero de chambre en chiffres fins, pictogramme, titre, description,
// puis compteur et calibration en bas. La couleur du module n'apparait que par petites touches.
function tile(key, num, name, description, count, p) {
    const pct = p ? p.bestPct : 0;
    return `
        <span class="tile-head">
            <span class="tile-num">${String(num).padStart(2, '0')}</span>
            <span class="tile-picto">${PICTO[key] || PICTO.all}</span>
        </span>
        <h3>${name}</h3>
        <p>${description}</p>
        <span class="tile-foot">
            <span class="tile-meta">${plural(count, 'question')}</span>
            <span class="tile-cal${p ? '' : ' is-empty'}">${p ? `Calibration max ${pct}%` : 'Non calibré'}</span>
        </span>
        <span class="tile-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>
    `;
}

export function renderModuleGrid() {
    const grid = document.getElementById('moduleGrid');
    grid.innerHTML = '';
    const progress = loadProgress();

    // Option "Tous les modules"
    const allCard = document.createElement('div');
    allCard.className = 'module-card all';
    allCard.dataset.module = 'all';
    allCard.innerHTML = tile('all', 0, 'Tous les modules', "Protocole d'évaluation complet", getQuestionsFor('all').length, progress['all']);
    grid.appendChild(allCard);

    // Un panneau par module
    let n = 0;
    for (const [key, module] of Object.entries(modules)) {
        const card = document.createElement('div');
        card.className = `module-card ${key}`;
        card.dataset.module = key;
        card.innerHTML = tile(key, ++n, module.name, module.description, getQuestionsFor(key).length, progress[key]);
        grid.appendChild(card);
    }
}
