import { modules } from '../../data/modules.js';
import { getQuestionsFor } from '../../data/catalog.js';
import { loadProgress } from '../storage.js';
import { unit } from './mascot.js';
import { PICTO } from './pictos.js';

const plural = (n, word) => `${n} ${word}${n > 1 ? 's' : ''}`;

// Accueil : panneau de chambre de test. Grand numero fin, titre sobre, rangee de pictogrammes.
function renderHero() {
    const hero = document.getElementById('menuHero');
    if (!hero) return;
    const total = getQuestionsFor('all').length;
    hero.innerHTML = `
        <div class="ap-hero-sign">
            <div class="ap-hero-num" aria-hidden="true">00</div>
            <div class="ap-hero-rule" aria-hidden="true"></div>
            <div class="ap-hero-picto" aria-hidden="true">${PICTO.tests}${PICTO.python}${PICTO.bdd}${PICTO.uml}${PICTO.docker}</div>
        </div>
        <div class="ap-hero-text">
            <span class="ap-eyebrow">Protocole d'évaluation des compétences</span>
            <h1 class="ap-title">Test d'aptitude développeur</h1>
            <p class="ap-lead">${total} questions, des exercices de code et de SQL, et une chambre de vocabulaire. Le Centre d'Enrichissement mesure. Vous progressez.</p>
            <div class="ap-hero-actions">
                <button class="ap-btn ap-btn-primary" data-module="all">Lancer le protocole complet</button>
                <a class="ap-btn ap-btn-quiet" href="#moduleGrid">Choisir un module</a>
            </div>
        </div>
        <div class="ap-hero-unit" aria-hidden="true">${unit('calme', 132)}</div>
    `;
}

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
    renderHero();
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
