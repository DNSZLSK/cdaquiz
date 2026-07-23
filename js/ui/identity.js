// Badge d'identification du header (visible partout) + modale du protocole
// de liaison. La synchro couvre TOUT : quiz, labo, classement.
import { isConfigured, getLink, link, unlink, syncNow, initCloudSync } from '../labo/cloud.js';
import { escapeHtml } from '../utils.js';

const badge = () => document.getElementById('linkBadge');

function renderBadge() {
    const el = badge();
    if (!isConfigured()) { el.style.display = 'none'; return; }
    const l = getLink();
    el.style.display = '';
    el.classList.toggle('linked', !!l);
    el.innerHTML = l
        ? `<span class="link-dot"></span>${escapeHtml(l.pseudo)}`
        : 'S\'identifier';
}

function modalHtml() {
    const l = getLink();
    if (!l) {
        return `
            <span class="mode-tabs-label">Protocole de liaison</span>
            <p class="identity-text">Identifiez-vous une seule fois par appareil : toute la progression
                (quiz, laboratoire, classement) se synchronise ensuite automatiquement entre vos appareils.</p>
            <div class="cloud-form">
                <input type="text" id="cloudPseudo" placeholder="Pseudo" maxlength="20"
                    autocapitalize="none" autocorrect="off" spellcheck="false">
                <input type="password" id="cloudPin" placeholder="PIN (4 à 8 chiffres)" inputmode="numeric" maxlength="8">
            </div>
            <div class="labo-actions">
                <button class="btn-primary" data-action="cloud-link">Établir la liaison</button>
                <button data-action="identity-close">Fermer</button>
            </div>
            <p id="cloudStatus" class="labo-progress-label"></p>
        `;
    }
    const last = l.lastSync
        ? new Date(l.lastSync).toLocaleString('fr-FR')
        : 'en attente';
    return `
        <span class="mode-tabs-label">Protocole de liaison · actif</span>
        <p class="identity-text">Sujet <strong>${escapeHtml(l.pseudo)}</strong> · dernière synchronisation : ${last}.
            Quiz, laboratoire et classement se synchronisent automatiquement.</p>
        <div class="labo-actions">
            <button data-action="cloud-sync">Synchroniser maintenant</button>
            <button data-action="cloud-unlink">Rompre la liaison</button>
            <button data-action="identity-close">Fermer</button>
        </div>
        <p id="cloudStatus" class="labo-progress-label"></p>
    `;
}

function openModal() {
    closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'identity-overlay';
    overlay.id = 'identityOverlay';
    overlay.innerHTML = `<div class="identity-modal">${modalHtml()}</div>`;
    overlay.addEventListener('click', async (e) => {
        if (e.target === overlay) { closeModal(); return; }
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (action === 'identity-close') closeModal();
        if (action === 'cloud-link') await doLink();
        if (action === 'cloud-sync') await doSync();
        if (action === 'cloud-unlink') doUnlink();
    });
    document.body.appendChild(overlay);
}

function closeModal() {
    document.getElementById('identityOverlay')?.remove();
}

function refreshModal() {
    const modal = document.querySelector('#identityOverlay .identity-modal');
    if (modal) modal.innerHTML = modalHtml();
}

async function doLink() {
    const status = document.getElementById('cloudStatus');
    try {
        status.textContent = 'Établissement de la liaison…';
        const report = await link(
            document.getElementById('cloudPseudo').value,
            document.getElementById('cloudPin').value
        );
        initCloudSync();
        renderBadge();
        refreshModal();
        document.getElementById('cloudStatus').textContent = report?.existed
            ? `Liaison établie : dossier existant récupéré (${report.labo} exercice(s), ${report.quiz} module(s), ${report.scores} score(s) fusionnés).`
            : 'Liaison établie : NOUVEAU dossier créé pour ce couple pseudo+PIN. Si vous vouliez retrouver une progression existante, rompez la liaison et vérifiez le pseudo et le PIN utilisés sur l\'autre appareil.';
    } catch (e) {
        unlink();
        renderBadge();
        status.textContent = 'Échec : ' + e.message;
    }
}

async function doSync() {
    const status = document.getElementById('cloudStatus');
    try {
        status.textContent = 'Synchronisation…';
        const report = await syncNow();
        refreshModal();
        document.getElementById('cloudStatus').textContent =
            `Synchronisé : ${report.labo} exercice(s), ${report.quiz} module(s), ${report.scores} score(s) mis à jour.`;
    } catch (e) {
        status.textContent = 'Échec : ' + e.message + ' (la progression locale reste intacte)';
    }
}

function doUnlink() {
    if (!window.confirm('Rompre la liaison sur cet appareil ? La progression locale est conservée ; le dossier cloud reste disponible pour les autres appareils liés.')) return;
    unlink();
    renderBadge();
    refreshModal();
}

export function initIdentity() {
    renderBadge();
    badge().addEventListener('click', openModal);
    if (getLink()) initCloudSync();
}
