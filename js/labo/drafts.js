// Brouillons de requetes SQL, conserves le temps de la session (pas de
// localStorage : un brouillon n'est pas une progression). Module separe pour
// que la reinitialisation du hub puisse aussi les vider.
const drafts = new Map();

export function getDraft(key) {
    return drafts.get(key) || '';
}

export function setDraft(key, value) {
    drafts.set(key, value);
}

export function clearDrafts() {
    drafts.clear();
}
