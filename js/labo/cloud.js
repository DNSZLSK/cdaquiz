// Liaison entre appareils via Firebase Realtime Database, en REST pur (fetch,
// aucun SDK). Appairage une fois par appareil (pseudo + PIN), puis synchro
// automatique : a l'ouverture, apres chaque exercice (tamponnee), au retour
// du reseau. Le pseudo ne quitte jamais l'appareil : le cloud ne connait que
// l'empreinte SHA-256 de pseudo+PIN, qui sert de chemin de stockage.
import { CLOUD_DB_URL } from './cloud-config.js';
import { snapshotAll, mergeAll } from './merge.js';

const LINK_KEY = 'cdaquiz_cloud'; // { pseudo, hash, lastSync }
const PUSH_DEBOUNCE_MS = 3000;

export function isConfigured() {
    return !!CLOUD_DB_URL;
}

export function getLink() {
    try { return JSON.parse(localStorage.getItem(LINK_KEY)); }
    catch (e) { return null; }
}

async function sha256Hex(text) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function nodeUrl(link) {
    return CLOUD_DB_URL.replace(/\/+$/, '') + '/users/' + link.hash + '.json';
}

export async function link(pseudo, pin) {
    const cleanPseudo = pseudo.trim();
    const cleanPin = pin.trim();
    if (cleanPseudo.length < 2) throw new Error('Pseudo trop court (2 caractères minimum).');
    if (!/^\d{4,8}$/.test(cleanPin)) throw new Error('Le PIN doit faire 4 à 8 chiffres.');
    const hash = await sha256Hex(cleanPseudo.toLowerCase() + ':' + cleanPin);
    localStorage.setItem(LINK_KEY, JSON.stringify({ pseudo: cleanPseudo, hash, lastSync: 0 }));
    return syncNow();
}

export function unlink() {
    localStorage.removeItem(LINK_KEY);
}

// Cycle complet : tirer l'etat distant, le fusionner localement (idempotent),
// pousser l'etat fusionne. Le meme PIN sur deux pseudos differents donne deux
// empreintes differentes : aucune collision possible entre utilisateurs.
let syncing = null;
export function syncNow() {
    if (syncing) return syncing; // pas de cycles concurrents
    syncing = (async () => {
        const l = getLink();
        if (!l || !isConfigured()) return null;
        const res = await fetch(nodeUrl(l));
        if (!res.ok) throw new Error('Lecture cloud impossible (HTTP ' + res.status + ')');
        const remote = await res.json(); // null tant que rien n'a ete pousse
        const report = remote ? mergeAll(remote) : { quiz: 0, labo: 0, scores: 0, sensei: 0 };
        const put = await fetch(nodeUrl(l), {
            method: 'PUT',
            body: JSON.stringify({ ...snapshotAll(), t: Date.now() })
        });
        if (!put.ok) throw new Error('Écriture cloud impossible (HTTP ' + put.status + ')');
        localStorage.setItem(LINK_KEY, JSON.stringify({ ...l, lastSync: Date.now() }));
        // La fusion a apporte du nouveau : les ecrans visibles se rafraichissent
        if (report.quiz + report.labo + report.scores + report.sensei > 0) {
            window.dispatchEvent(new CustomEvent('cdaquiz:synced'));
        }
        // existed : permet a l'UI de distinguer "dossier existant recupere" de
        // "nouveau dossier cree" (symptome d'un pseudo/PIN different de l'autre
        // appareil : il n'y a pas de registre, donc pas d'erreur "mauvais PIN")
        report.existed = remote !== null;
        return report;
    })().finally(() => { syncing = null; });
    return syncing;
}

// Ecrase le dossier cloud avec l'etat local ACTUEL, sans fusion prealable.
// Reserve aux reinitialisations : un reset local serait sinon ressuscite par
// le pull-fusion du cycle normal.
export async function pushOverwrite() {
    const l = getLink();
    if (!l || !isConfigured()) return;
    const put = await fetch(nodeUrl(l), {
        method: 'PUT',
        body: JSON.stringify({ ...snapshotAll(), t: Date.now() })
    });
    if (!put.ok) throw new Error('Écriture cloud impossible (HTTP ' + put.status + ')');
    localStorage.setItem(LINK_KEY, JSON.stringify({ ...l, lastSync: Date.now() }));
}

let pushTimer = null;
let initialized = false;

// Demarre la synchro automatique (si l'appareil est appaire) :
// - un cycle au demarrage,
// - un cycle tamponne apres chaque changement de progression (evenement
//   cdaquiz:changed emis par storage.js et progress.js),
// - un cycle au retour du reseau.
// Les echecs sont silencieux : hors-ligne, la progression locale fait foi et
// sera fusionnee au prochain cycle reussi.
export function initCloudSync() {
    if (initialized || !isConfigured() || !getLink()) return;
    initialized = true;
    syncNow().catch(() => { });
    window.addEventListener('cdaquiz:changed', () => {
        clearTimeout(pushTimer);
        pushTimer = setTimeout(() => syncNow().catch(() => { }), PUSH_DEBOUNCE_MS);
    });
    window.addEventListener('online', () => syncNow().catch(() => { }));
}
