// Hub du mode LABO : une card par domaine, avec compteur et progression.
import { laboCatalog } from '../../data/exercises/index.js';
import { registerScreen, showScreen, getCurrentScreen } from '../screens.js';
import { setTabsVisible, setActiveTab } from '../ui/tabs.js';
import { getDomainStats, resetAll } from './progress.js';
import { clearDrafts } from './drafts.js';
import { getLink, pushOverwrite } from './cloud.js';
import { PICTO } from '../ui/pictos.js';

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

// Pictogramme de chaque domaine (memes dessins que les modules du quiz)
const DOMAIN_PICTO = {
    'sql': 'bdd', 'mcd-mld': 'uml', 'oop-java': 'poo', 'tests-junit': 'tests', 'spring-boot': 'architecture',
    'spring-security': 'lock', 'angular': 'web', 'javascript': 'python', 'html-css': 'web', 'bootstrap': 'conception',
    'python': 'python', 'python-fichiers': 'documentation', 'git': 'git', 'docker': 'docker', 'uml-archi': 'uml'
};

function renderHub() {
    // Meme gabarit que les modules du quiz : numero de chambre fin, pictogramme,
    // titre, description, puis seulement la calibration et sa barre
    const cards = laboCatalog.map((d, i) => {
        const stats = getDomainStats(d.domain);
        const pct = Math.round((stats.ok / d.count) * 100);
        return `
            <div class="module-card labo-domain-card" style="--module-color: ${d.color}" data-domain="${d.domain}">
                <span class="tile-head">
                    <span class="tile-num">${String(i + 1).padStart(2, '0')}</span>
                    <span class="tile-picto">${PICTO[DOMAIN_PICTO[d.domain]] || PICTO.all}</span>
                </span>
                <h3>${d.title}</h3>
                <p>${d.description}</p>
                <span class="tile-foot">
                    <span class="tile-cal${stats.ok ? '' : ' is-empty'}">${stats.ok}/${d.count} calibrés${pct === 100 ? ' · protocole terminé' : ''}</span>
                </span>
                <span class="tile-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>
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
        const linked = !!getLink();
        const msg = 'Effacer toute la progression du laboratoire ? Les scores du quiz ne sont pas concernés.'
            + (linked ? '\n\nAppareil lié : le dossier cloud sera aussi mis à jour (les autres appareils gardent leur copie locale).' : '');
        if (window.confirm(msg)) {
            resetAll();
            clearDrafts(); // les requetes ecrites dans l'editeur SQL repartent aussi de zero
            if (linked) pushOverwrite().catch(() => { }); // sinon la synchro ressusciterait tout
            renderHub();
        }
        return;
    }
    const card = e.target.closest('[data-domain]');
    if (card) openDomain(card.dataset.domain);
});

// Meme rafraichissement pour le hub : une synchro qui apporte du nouveau
// redessine les cards si le hub est a l'ecran
window.addEventListener('cdaquiz:synced', () => {
    if (getCurrentScreen() === 'labo-hub') renderHub();
});

export function openHub() {
    showScreen('labo-hub');
}
