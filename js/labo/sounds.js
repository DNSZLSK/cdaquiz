// Sons du labo — voix de tourelles deja presentes dans le repo, dosees pour ne
// pas lasser : succes uniquement a la premiere reussite, echec une fois sur
// trois, completion systematique (rare). Coupables via un bouton (localStorage).
const KEY = 'cdaquiz_labo_muted';

export function isMuted() {
    return localStorage.getItem(KEY) === '1';
}

export function toggleMuted() {
    localStorage.setItem(KEY, isMuted() ? '0' : '1');
    return isMuted();
}

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function play(file) {
    if (isMuted()) return;
    const audio = new Audio('turretVocals/' + file);
    audio.volume = 0.3;
    audio.play().catch(() => { });
}

// Premiere reussite d'un exercice (le caller verifie que le statut n'etait pas deja 'ok')
export function playSuccess() {
    play('good-shot.mp3');
}

// Echec de validation — une fois sur trois seulement, sinon ca punit
export function playFail() {
    if (Math.random() < 1 / 3) {
        play(pick(['oh-dear.mp3', 'i-dont-blame-you.mp3', 'noooooo.mp3']));
    }
}

// Erreur de syntaxe SQL sur Valider (jamais sur Executer : on experimente librement)
export function playSqlError() {
    play('illegal-operation.mp3');
}

// Domaine ou scenario complete a 100 % — evenement rare, donc systematique
export function playComplete() {
    play('thank-you.mp3');
}

export function muteButtonLabel() {
    return isMuted() ? 'SON : OFF' : 'SON : ON';
}
