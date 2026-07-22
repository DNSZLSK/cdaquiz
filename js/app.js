// Bootstrap de l'application : enregistre les types d'exercices et les ecrans,
// cable les listeners statiques, affiche le menu.
import { registerExerciseType } from './exercises/registry.js';
import { qcmType } from './exercises/qcm.js';
import { registerScreen, showScreen } from './screens.js';
import { renderModuleGrid } from './ui/menu.js';
import { startQuiz, startRetry, restartQuiz, initQuizScreen } from './ui/quiz.js';
import { saveScore } from './ui/results.js';
import { playRandomPortalVoice } from './audio.js';
import { initTabs, setTabsVisible, setActiveTab } from './ui/tabs.js';

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
    initQuizScreen();

    // Onglets QUIZ | LABO (le hub labo se charge en lazy au premier clic)
    initTabs({
        onQuiz: () => showScreen('menu'),
        onLabo: async () => {
            const hub = await import('./labo/hub.js');
            hub.openHub();
        }
    });

    // Grille de modules : delegation
    document.getElementById('moduleGrid').addEventListener('click', (e) => {
        const card = e.target.closest('[data-module]');
        if (card) startQuiz(card.dataset.module);
    });

    // Boutons statiques de l'ecran resultats
    document.getElementById('saveScoreBtn').addEventListener('click', saveScore);
    document.getElementById('backToMenuBtn').addEventListener('click', () => showScreen('menu'));
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);

    // Bouton "Re-tester les anomalies" (genere dynamiquement)
    document.getElementById('retrySection').addEventListener('click', (e) => {
        if (e.target.closest('[data-action="retry"]')) startRetry();
    });

    // Voix de tourelle Portal au clic sur le logo
    const logo = document.getElementById('apertureLogo');
    if (logo) logo.addEventListener('click', playRandomPortalVoice);

    showScreen('menu');
}

initApp();
