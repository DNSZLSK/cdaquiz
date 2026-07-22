// Ecran quiz : chrome commun (header, boutons, barre de progression) + dispatch
// vers le type d'exercice de la question courante.
import { getQuestionsFor, getQuestionsByIds, getModuleName } from '../../data/catalog.js';
import { getExerciseType } from '../exercises/registry.js';
import { createQuizSession } from '../quiz-session.js';
import { showScreen } from '../screens.js';
import { showResults } from './results.js';

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

    container.innerHTML = `
        <div class="question-container active">
            <div class="question-header">
                <span class="question-number">Question ${session.index + 1}/${session.length()}</span>
                <span class="module-tag">${getModuleName(question.module)}</span>
            </div>

            <div class="exercise-body"></div>

            <div class="buttons">
                <div style="display: flex; gap: 12px;">
                    <button data-action="menu">Menu</button>
                    <button data-action="prev" ${session.isFirst() ? 'disabled' : ''}>
                        Précédent
                    </button>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-primary" id="validateBtn" data-action="validate">
                        Valider
                    </button>
                    <button class="btn-primary" id="nextBtn" data-action="next" style="display: none;">
                        ${session.isLast() ? 'Voir les résultats' : 'Suivant'}
                    </button>
                </div>
            </div>
        </div>
    `;

    const bodyEl = container.querySelector('.exercise-body');
    getExerciseType(question).render(runtime, bodyEl);
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

    const result = await handler.evaluate(runtime, answer);
    session.recordResult(question, result.correct);
    handler.showCorrection(runtime, bodyEl, answer, result);

    document.getElementById('validateBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
}

function showEmptyAnswerModal() {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border: 1px solid #d1d5da;
        padding: 30px 40px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
        max-width: 400px;
    `;
    errorDiv.innerHTML = `
        <div style="font-size: 1.2em; font-weight: 600; color: #24292e; margin-bottom: 15px;">
            Erreur de protocole
        </div>
        <div style="color: #586069; margin-bottom: 20px;">
            Le Centre d'Enrichissement vous rappelle de sélectionner au moins une réponse avant de continuer.
        </div>
    `;
    const okBtn = document.createElement('button');
    okBtn.className = 'btn-primary';
    okBtn.style.width = '100%';
    okBtn.textContent = 'Compris';
    okBtn.addEventListener('click', () => errorDiv.remove());
    errorDiv.appendChild(okBtn);
    document.body.appendChild(errorDiv);
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
    document.getElementById('progressBar').style.width = session.progressPct() + '%';
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
