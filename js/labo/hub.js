// Hub du mode LABO : une card par domaine, avec compteur et progression.
import { laboCatalog } from '../../data/exercises/index.js';
import { registerScreen, showScreen } from '../screens.js';
import { setTabsVisible, setActiveTab } from '../ui/tabs.js';
import { getDomainStats, resetAll } from './progress.js';
import { clearDrafts } from './drafts.js';
import { buildSyncCode, applySyncCode } from './sync.js';

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
                <p class="labo-progress-label">${stats.ok}/${d.count} calibrés${pct === 100 ? ' · protocole terminé' : ''}</p>
            </div>
        `;
    }).join('');

    el().innerHTML = `
        <h2>Laboratoire d'Enrichissement</h2>
        <p class="labo-subtitle">Exercices pratiques : écrire, lire et comprendre du code.</p>
        <div class="module-grid">${cards}</div>

        <div class="labo-sync">
            <h3>Synchronisation entre appareils</h3>
            <p class="labo-subtitle">Copiez le code sur cet appareil, collez-le sur l'autre.
                La fusion garde le meilleur de chaque côté (quiz, labo et classement), sans rien écraser.</p>
            <div class="labo-actions">
                <button data-action="sync-copy">Copier ma progression</button>
                <button data-action="sync-paste">Coller une progression</button>
            </div>
            <div id="syncPanel" style="display: none;">
                <textarea id="syncInput" rows="3" placeholder="Collez le code de synchro ici (CDAQ...)"
                    autocapitalize="none" autocorrect="off" spellcheck="false"></textarea>
                <button class="btn-primary" data-action="sync-apply">Fusionner</button>
            </div>
            <p id="syncStatus" class="labo-progress-label"></p>
        </div>

        <button class="labo-reset" data-action="reset-progress">Réinitialiser la progression du laboratoire</button>
    `;
}

async function syncCopy() {
    const status = document.getElementById('syncStatus');
    try {
        const code = await buildSyncCode();
        try {
            await navigator.clipboard.writeText(code);
            status.textContent = `Code copié dans le presse-papiers (${code.length} caractères).`;
        } catch (e) {
            // Presse-papiers indisponible : on affiche le code pour copie manuelle
            const panel = document.getElementById('syncPanel');
            panel.style.display = 'block';
            document.getElementById('syncInput').value = code;
            status.textContent = 'Copiez le code affiché ci-dessus manuellement.';
        }
    } catch (e) {
        status.textContent = 'Impossible de générer le code : ' + e.message;
    }
}

async function syncApply() {
    const status = document.getElementById('syncStatus');
    const input = document.getElementById('syncInput');
    if (!input.value.trim()) {
        status.textContent = 'Collez d\'abord un code de synchro.';
        return;
    }
    try {
        const report = await applySyncCode(input.value);
        status.textContent = `Fusion réussie : ${report.labo} exercice(s) labo, ${report.quiz} module(s) quiz, ${report.scores} score(s) de classement mis à jour.`;
        input.value = '';
        renderHub();
        document.getElementById('syncStatus').textContent = status.textContent;
    } catch (e) {
        status.textContent = 'Échec de la fusion : ' + e.message;
    }
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
            clearDrafts(); // les requetes ecrites dans l'editeur SQL repartent aussi de zero
            renderHub();
        }
        return;
    }
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'sync-copy') { syncCopy(); return; }
    if (action === 'sync-paste') {
        const panel = document.getElementById('syncPanel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        return;
    }
    if (action === 'sync-apply') { syncApply(); return; }
    const card = e.target.closest('[data-domain]');
    if (card) openDomain(card.dataset.domain);
});

export function openHub() {
    showScreen('labo-hub');
}
