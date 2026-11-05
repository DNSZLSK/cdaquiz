// Ecran quiz : chrome commun (header, boutons, barre de progression) + dispatch
// vers le type d'exercice de la question courante.
import { getQuestionsFor, getQuestionsByIds, getModuleName } from '../../data/catalog.js';
import { getExerciseType } from '../exercises/registry.js';
import { createQuizSession } from '../quiz-session.js';
import { showScreen } from '../screens.js';
import { showResults } from './results.js';
import { unit } from './mascot.js';

let session = null;

export function getSession() {
    return session;
}

export function startQuiz(moduleKey) {
    beginQuiz(getQuestionsFor(moduleKey), moduleKey);
}

export function startRetry() {
    if (!session) return;
    beginQuiz(getQuestionsByIds(session.wrongIds.slice()), 'retry');
}

export function restartQuiz() {
    if (!session) return;
    beginQuiz(getQuestionsByIds(session.setIds.slice()), session.moduleKey);
}

function beginQuiz(questions, moduleKey) {
    session = createQuizSession({ questions, moduleKey });
    showScreen('quiz');
    renderQuestion();
    updateProgress();
}

function renderQuestion() {
    const container = document.getElementById('quizContent');
    const runtime = session.current();
    const question = runtime.question;

    // Ecran plein, facon lecon : croix + barre epaisse en haut, barre d'action collee en bas
    container.innerHTML = `
        <div class="question-container active ap-lesson">
            <div class="ap-lesson-top">
                <button class="ap-x" data-action="menu" aria-label="Retour au menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
                <div class="ap-progress" aria-hidden="true"><i id="lessonBar"></i></div>
                <span class="ap-count">${session.index + 1}/${session.length()}</span>
            </div>
            <span class="ap-chip">${getModuleName(question.module)}</span>

            <div class="exercise-body"></div>

            <div class="buttons ap-sheet" id="quizSheet">
                <div class="ap-sheet-in">
                    <div class="ap-sheet-fb" id="sheetFb" aria-live="polite"></div>
                    <div class="ap-sheet-actions">
                        <button class="ap-btn ap-btn-ghost" data-action="prev" ${session.isFirst() ? 'disabled' : ''}>Précédent</button>
                        <button class="btn-primary" id="validateBtn" data-action="validate">Valider</button>
                        <button class="btn-primary" id="nextBtn" data-action="next" style="display: none;">
                            ${session.isLast() ? 'Voir les résultats' : 'Continuer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const bodyEl = container.querySelector('.exercise-body');
    const handler = getExerciseType(question);
    handler.render(runtime, bodyEl);

    // Question deja validee (retour via Precedent) : on reaffiche la correction
    // au lieu de permettre une re-validation (et un double comptage du score).
    const saved = session.answers.get(session.index);
    if (saved) {
        handler.restoreAnswer?.(runtime, bodyEl, saved.answer);
        handler.showCorrection(runtime, bodyEl, saved.answer, saved.result);
        document.getElementById('validateBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'block';
        showSheetFeedback(saved.result.correct, false);
    }
}

// Repliques originales du Centre d'Enrichissement pour la barre du bas
const SHEET_OK = ["Réponse conforme.", "Correct. Résultat consigné.", "Exact. Le protocole continue."];
const SHEET_KO = ["Réponse non conforme.", "Écart détecté.", "Résultat inattendu."];
const pickLine = arr => arr[Math.floor(Math.random() * arr.length)];

// La barre du bas passe au vert ou au rouge, avec l'Unite 03 et une replique
function showSheetFeedback(correct, animate) {
    const sheet = document.getElementById('quizSheet');
    const fb = document.getElementById('sheetFb');
    if (!sheet || !fb) return;
    sheet.classList.add(correct ? 'is-ok' : 'is-ko');
    if (animate) sheet.classList.add('is-in');
    fb.innerHTML = `${unit(correct ? 'content' : 'pensif', 52, correct && animate ? 'bob' : '')}
        <div><strong>${pickLine(correct ? SHEET_OK : SHEET_KO)}</strong>
        <span>${correct ? 'Continuez sur cette lancée.' : "Lisez l'explication avant de continuer."}</span></div>`;
}

async function validateAnswer() {
    const container = document.getElementById('quizContent');
    const bodyEl = container.querySelector('.exercise-body');
    const runtime = session.current();
    const question = runtime.question;
    const handler = getExerciseType(question);

    const answer = handler.collectAnswer(bodyEl);
    if (answer === null) {
        showEmptyAnswerModal();
        return;
    }

    if (session.answers.has(session.index)) return; // deja validee

    const result = await handler.evaluate(runtime, answer);
    session.answers.set(session.index, { answer, result });
    session.recordResult(question, result.correct);
    handler.showCorrection(runtime, bodyEl, answer, result);

    document.getElementById('validateBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
    showSheetFeedback(result.correct, true);
    const expl = bodyEl.querySelector('.explanation');
    if (expl) expl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// Fenetre "Erreur de protocole" (aussi utilisee par le Code Lab) : meme style que la
// fenetre d'identification. Fermeture au clic sur Compris ou sur le fond.
export function showEmptyAnswerModal() {
    const overlay = document.createElement('div');
    overlay.className = 'ap-modal-overlay';
    overlay.innerHTML = `
        <div class="ap-modal" role="alertdialog" aria-labelledby="apModalTitle">
            <h3 id="apModalTitle">Erreur de protocole</h3>
            <p>Le Centre d'Enrichissement vous rappelle de sélectionner au moins une réponse avant de continuer.</p>
            <button class="btn-primary" data-close>Compris</button>
        </div>
    `;
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('[data-close]')) overlay.remove();
    });
    document.body.appendChild(overlay);
    overlay.querySelector('[data-close]').focus();
}

function nextQuestion() {
    if (!session.isLast()) {
        session.next();
        renderQuestion();
        updateProgress();
    } else {
        session.stopTimer();
        showScreen('results');
        showResults(session);
    }
}

function previousQuestion() {
    if (!session.isFirst()) {
        session.prev();
        renderQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const pct = session.progressPct() + '%';
    document.getElementById('progressBar').style.width = pct;
    const bar = document.getElementById('lessonBar');
    if (bar) bar.style.width = pct;
}

export function initQuizScreen() {
    // Delegation : les listeners survivent aux innerHTML successifs.
    document.getElementById('quizContent').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn || btn.disabled) return;
        switch (btn.dataset.action) {
            case 'menu': showScreen('menu'); break;
            case 'prev': previousQuestion(); break;
            case 'validate': validateAnswer(); break;
            case 'next': nextQuestion(); break;
        }
    });
}
