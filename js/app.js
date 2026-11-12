// Bootstrap de l'application : enregistre les types d'exercices et les ecrans,
// cable les listeners statiques, affiche le menu.
import { registerExerciseType } from './exercises/registry.js';
import { qcmType } from './exercises/qcm.js';
import { registerScreen, showScreen, getCurrentScreen } from './screens.js';
import { renderModuleGrid } from './ui/menu.js';
import { startQuiz, startRetry, restartQuiz, initQuizScreen } from './ui/quiz.js';
import { saveScore } from './ui/results.js';
import { playRandomPortalVoice } from './audio.js';
import { initTabs, setTabsVisible, setActiveTab } from './ui/tabs.js';
import { initIdentity } from './ui/identity.js';
import { resetQuizProgress } from './storage.js';
import { getLink, pushOverwrite } from './labo/cloud.js';
import { purgeRemovedModules } from './storage.js';
import { isMuted, toggleMuted, muteButtonLabel } from './labo/sounds.js';

registerExerciseType('qcm', qcmType);

registerScreen('menu', {
    show() {
        setTabsVisible(true);
        setActiveTab('quiz');
        renderModuleGrid();
        document.getElementById('menu').classList.add('active');
        document.getElementById('quizContent').style.display = 'block';
        document.getElementById('quizContent').innerHTML = '';
        document.getElementById('progressBar').style.width = '0%';
    },
    hide() {
        setTabsVisible(false);
        document.getElementById('menu').classList.remove('active');
    }
});

registerScreen('quiz', {
    show() {
        document.getElementById('quizContent').style.display = 'block';
    },
    hide() { }
});

registerScreen('results', {
    show() {
        // Le rendu est fait par showResults(session) dans ui/results.js.
    },
    hide() {
        document.getElementById('results').classList.remove('show');
        document.getElementById('quizContent').style.display = 'block';
    }
});

function initApp() {
    // Modules retires (Unity) : on efface leurs scores locaux avant tout affichage
    purgeRemovedModules();
    initQuizScreen();

    // Onglets QUIZ | LABO | VOCABULAIRE (labo et sensei se chargent en lazy au premier clic)
    initTabs({
        onQuiz: () => showScreen('menu'),
        onLabo: async () => {
            const hub = await import('./labo/hub.js');
            hub.openHub();
        },
        onSensei: async () => {
            const sensei = await import('./sensei/engine.js');
            sensei.openSensei();
        }
    });

    // Grille de modules : delegation
    document.getElementById('moduleGrid').addEventListener('click', (e) => {
        const card = e.target.closest('[data-module]');
        if (card) startQuiz(card.dataset.module);
    });

    // Nom de l'appli en haut a gauche : retour a l'accueil (onglet Quiz) depuis n'importe quel ecran
    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('menu');
        window.scrollTo(0, 0);
    });

    // Boutons statiques de l'ecran resultats
    document.getElementById('saveScoreBtn').addEventListener('click', saveScore);
    document.getElementById('backToMenuBtn').addEventListener('click', () => showScreen('menu'));
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);

    // Bouton "Re-tester les anomalies" (genere dynamiquement)
    document.getElementById('retrySection').addEventListener('click', (e) => {
        if (e.target.closest('[data-action="retry"]')) startRetry();
    });

    // Bouton son de l'en-tete : unique reglage des voix du labo et du vocabulaire (pas du gateau)
    const soundBtn = document.getElementById('soundToggle');
    const paintSound = () => {
        soundBtn.textContent = muteButtonLabel();
        soundBtn.setAttribute('aria-pressed', String(!isMuted()));
        soundBtn.classList.toggle('is-off', isMuted());
    };
    paintSound();
    soundBtn.addEventListener('click', () => { toggleMuted(); paintSound(); });

    // Voix de tourelle Portal au clic sur le logo
    const logo = document.getElementById('apertureLogo');
    if (logo) logo.addEventListener('click', playRandomPortalVoice);

    showScreen('menu');

    // PWA : service worker network-first (mises a jour automatiques, offline en
    // filet). Pas en dev local : un cache SW sur localhost rendrait fou.
    if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(location.hostname)) {
        navigator.serviceWorker.register('sw.js').catch(() => { });
    }

    // Badge d'identification du header (protocole de liaison, visible partout).
    // Demarre aussi la synchro auto si l'appareil est deja appaire.
    initIdentity();

    // Une synchro (manuelle ou automatique) a rapporte du nouveau : si le menu
    // quiz est a l'ecran, ses cartes se redessinent sans changer d'onglet
    window.addEventListener('cdaquiz:synced', () => {
        if (getCurrentScreen() === 'menu') renderModuleGrid();
    });

    // Reinitialisation de la progression du quiz (pendant du bouton labo)
    document.getElementById('quizResetBtn').addEventListener('click', async () => {
        const linked = !!getLink();
        const msg = 'Effacer la progression du quiz (calibrations par module) et le classement local ? La progression du laboratoire n\'est pas concernée.'
            + (linked ? '\n\nAppareil lié : le dossier cloud sera aussi mis à jour (les autres appareils gardent leur copie locale).' : '');
        if (!window.confirm(msg)) return;
        resetQuizProgress();
        if (linked) pushOverwrite().catch(() => { }); // sinon la synchro ressusciterait tout
        renderModuleGrid();
    });
}

initApp();
