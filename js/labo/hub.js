// Hub du mode LABO : une card par domaine, avec compteur et progression.
import { laboCatalog } from '../../data/exercises/index.js';
import { registerScreen, showScreen } from '../screens.js';
import { setTabsVisible, setActiveTab } from '../ui/tabs.js';
import { getDomainStats, resetAll } from './progress.js';
import { clearDrafts } from './drafts.js';
import { isConfigured, getLink, link, unlink, syncNow, initCloudSync } from './cloud.js';
import { escapeHtml, formatTime } from '../utils.js';

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
        ${cloudPanelHtml()}
        <button class="labo-reset" data-action="reset-progress">Réinitialiser la progression du laboratoire</button>
    `;
}

function cloudPanelHtml() {
    if (!isConfigured()) return '';
    const l = getLink();
    if (!l) {
        return `
            <div class="labo-sync">
                <span class="mode-tabs-label">Protocole de liaison</span>
                <p class="labo-subtitle">Liez cet appareil une seule fois : la progression (quiz, labo, classement)
                    se synchronise ensuite automatiquement entre tous les appareils liés au même identifiant.</p>
                <div class="cloud-form">
                    <input type="text" id="cloudPseudo" placeholder="Pseudo" maxlength="20"
                        autocapitalize="none" autocorrect="off" spellcheck="false">
                    <input type="password" id="cloudPin" placeholder="PIN (4 à 8 chiffres)" inputmode="numeric" maxlength="8">
                    <button class="btn-primary" data-action="cloud-link">Établir la liaison</button>
                </div>
                <p id="cloudStatus" class="labo-progress-label"></p>
            </div>
        `;
    }
    const last = l.lastSync ? `dernière synchro : ${formatTime(Math.max(0, Math.round((Date.now() - l.lastSync) / 1000)))} auparavant` : 'en attente de première synchro';
    return `
        <div class="labo-sync labo-sync-active">
            <span class="mode-tabs-label">Protocole de liaison · actif</span>
            <p class="labo-subtitle">Sujet <strong>${escapeHtml(l.pseudo)}</strong> · ${last}.
                La progression se synchronise automatiquement.</p>
            <div class="labo-actions">
                <button data-action="cloud-sync">Synchroniser maintenant</button>
                <button data-action="cloud-unlink">Rompre la liaison</button>
            </div>
            <p id="cloudStatus" class="labo-progress-label"></p>
        </div>
    `;
}

async function cloudLink() {
    const status = document.getElementById('cloudStatus');
    try {
        status.textContent = 'Établissement de la liaison…';
        const report = await link(
            document.getElementById('cloudPseudo').value,
            document.getElementById('cloudPin').value
        );
        initCloudSync();
        renderHub();
        document.getElementById('cloudStatus').textContent = report
            ? `Liaison établie. Fusion initiale : ${report.labo} exercice(s), ${report.quiz} module(s), ${report.scores} score(s).`
            : 'Liaison établie.';
    } catch (e) {
        unlink(); // liaison ratee : ne pas rester dans un etat a moitie appaire
        status.textContent = 'Échec : ' + e.message;
    }
}

async function cloudSyncNow() {
    const status = document.getElementById('cloudStatus');
    try {
        status.textContent = 'Synchronisation…';
        const report = await syncNow();
        renderHub();
        document.getElementById('cloudStatus').textContent =
            `Synchronisé : ${report.labo} exercice(s), ${report.quiz} module(s), ${report.scores} score(s) mis à jour.`;
    } catch (e) {
        status.textContent = 'Échec : ' + e.message + ' (la progression locale reste intacte)';
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
    if (action === 'cloud-link') { cloudLink(); return; }
    if (action === 'cloud-sync') { cloudSyncNow(); return; }
    if (action === 'cloud-unlink') {
        if (window.confirm('Rompre la liaison sur cet appareil ? La progression locale est conservée ; les données cloud restent disponibles pour les autres appareils liés.')) {
            unlink();
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
