// Hub du mode LABO : une card par domaine, avec compteur et progression.
import { laboCatalog } from '../../data/exercises/index.js';
import { registerScreen, showScreen } from '../screens.js';
import { setTabsVisible, setActiveTab } from '../ui/tabs.js';
import { getDomainStats, resetAll } from './progress.js';

const el = () => document.getElementById('laboHub');

registerScreen('labo-hub', {
    show() {
        setTabsVisible(true);
        setActiveTab('labo');
        document.getElementById('progressBar').style.width = '0%';
        renderHub();
        el().style.display = 'block';
    },
    hide() {
        el().style.display = 'none';
        setTabsVisible(false);
    }
});

function renderHub() {
    const cards = laboCatalog.map(d => {
        const stats = getDomainStats(d.domain);
        const pct = Math.round((stats.ok / d.count) * 100);
        return `
            <div class="module-card labo-domain-card" style="--module-color: ${d.color}" data-domain="${d.domain}">
                <h3>${d.title}</h3>
                <p>${d.description}</p>
                <p class="question-count">${d.count} exercices</p>
                <div class="labo-progress-track">
                    <div class="labo-progress-fill" style="width: ${pct}%; background: ${d.color};"></div>
                </div>
                <p class="labo-progress-label">${stats.ok}/${d.count} réussis${pct === 100 ? ' · terminé' : ''}</p>
            </div>
        `;
    }).join('');

    el().innerHTML = `
        <h2>Laboratoire d'Enrichissement</h2>
        <p class="labo-subtitle">Exercices pratiques : écrire, lire et comprendre du code.</p>
        <div class="module-grid">${cards}</div>
        <button class="labo-reset" data-action="reset-progress">Réinitialiser la progression du laboratoire</button>
    `;
}

async function openDomain(domainKey) {
    const entry = laboCatalog.find(d => d.domain === domainKey);
    if (!entry) return;
    if (entry.kind === 'sql') {
        const mod = await import('./sql-lab.js');
        await mod.openSqlLab(entry);
    } else {
        const mod = await import('./code-lab.js');
        await mod.openCodeLab(entry);
    }
}

// Cablage unique : ce module n'est importe qu'une fois (cache des imports ES).
el().addEventListener('click', (e) => {
    if (e.target.closest('[data-action="reset-progress"]')) {
        if (window.confirm('Effacer toute la progression du laboratoire ? Les scores du quiz ne sont pas concernés.')) {
            resetAll();
            renderHub();
        }
        return;
    }
    const card = e.target.closest('[data-domain]');
    if (card) openDomain(card.dataset.domain);
});

export function openHub() {
    showScreen('labo-hub');
}
