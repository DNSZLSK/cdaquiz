// Code Lab : QCM code par domaine, navigation libre, statut persistant par exercice.
import { registerExerciseType, getExerciseType } from '../exercises/registry.js';
import { codeQcmType } from '../exercises/code-qcm.js';
import { registerScreen, showScreen } from '../screens.js';
import { showEmptyAnswerModal } from '../ui/quiz.js';
import { getStatus, getEntry, record, getDomainStats } from './progress.js';
import { playSuccess, playFail, playComplete } from './sounds.js';
import { recapHtml } from './recap.js';

// Les banques utilisent type: predict|complete|identify|debug — tous rendus par code-qcm.
for (const t of ['predict', 'complete', 'identify', 'debug']) {
    registerExerciseType(t, codeQcmType);
}

let state = null; // { entry, exercises, index, runtime }
let wired = false;
const el = () => document.getElementById('laboCode');

registerScreen('labo-code', {
    show() { el().style.display = 'block'; },
    hide() { el().style.display = 'none'; }
});

export async function openCodeLab(entry) {
    const bank = (await entry.load()).default;
    state = {
        entry,
        exercises: bank.exercises,
        index: 0,
        runtime: null,
        runtimes: new Map(), // index -> runtime : le melange des options est stable pour la session
        answers: new Map(),  // index -> {answer, result} : reponse validee, restauree au retour
        retrying: new Set()  // index en nouvelle tentative : ne pas re-restaurer la reponse durable
    };
    wire();
    showScreen('labo-code');
    renderExercise();
}

function chipClass(status, isCurrent) {
    let cls = 'labo-chip';
    if (status) cls += ` labo-chip-${status}`;
    if (isCurrent) cls += ' labo-chip-current';
    return cls;
}

function renderExercise() {
    const { entry, exercises, index } = state;
    const q = exercises[index];
    if (!state.runtimes.has(index)) {
        state.runtimes.set(index, getExerciseType(q).prepare(q));
    }
    state.runtime = state.runtimes.get(index);

    const chips = exercises.map((ex, i) =>
        `<button class="${chipClass(getStatus(entry.domain, ex.id), i === index)}" data-goto="${i}">${i + 1}</button>`
    ).join('');

    const isLast = index === exercises.length - 1;
    const attempts = getEntry(entry.domain, q.id)?.n || 0;

    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back">← Labo</button>
            <span class="labo-title">${entry.title}</span>
            <span class="labo-counter">${index + 1}/${exercises.length}</span>
        </div>
        <div class="labo-chips">${chips}</div>
        <p class="labo-attempts" id="laboAttempts" style="visibility: ${attempts ? 'visible' : 'hidden'};">Tentatives : ${attempts}</p>
        <div class="exercise-body"></div>
        <div class="labo-actions">
            <button data-action="prev" ${index === 0 ? 'disabled' : ''}>Précédent</button>
            <button class="btn-primary" id="laboValidateBtn" data-action="validate">Valider</button>
            <button data-action="${isLast ? 'finish' : 'next'}">${isLast ? 'Terminer' : 'Suivant'}</button>
        </div>
    `;

    getExerciseType(q).render(state.runtime, el().querySelector('.exercise-body'));

    // Exercice deja valide (dans cette session, ou lors d'une session passee
    // via la reponse durable du localStorage) : on restaure la reponse et sa
    // correction, comme le quiz. S'il etait rate, Valider devient Reessayer.
    const handler = getExerciseType(q);
    let saved = state.answers.get(index);
    if (!saved && !state.retrying.has(index) && handler.fromPersistedAnswer) {
        const persisted = getEntry(entry.domain, q.id)?.a;
        if (persisted !== undefined && persisted !== null) {
            const answer = handler.fromPersistedAnswer(state.runtime, persisted);
            if (answer !== null) {
                saved = { answer, result: handler.evaluate(state.runtime, answer) };
                state.answers.set(index, saved);
            }
        }
    }
    if (saved) {
        const bodyEl = el().querySelector('.exercise-body');
        handler.restoreAnswer?.(state.runtime, bodyEl, saved.answer);
        handler.showCorrection(state.runtime, bodyEl, saved.answer, saved.result);
        setValidateButtonAfterAnswer(saved.result.correct);
    }

    document.getElementById('progressBar').style.width = ((index + 1) / exercises.length) * 100 + '%';
    const chipsEl = el().querySelector('.labo-chips');
    if (chipsEl.scrollWidth > chipsEl.clientWidth) chipsEl.classList.add('scrollable');
    el().scrollIntoView({ block: 'start' });
}

async function validate() {
    const q = state.exercises[state.index];
    const handler = getExerciseType(q);
    const bodyEl = el().querySelector('.exercise-body');

    const answer = handler.collectAnswer(bodyEl);
    if (answer === null) {
        showEmptyAnswerModal(); // meme modale "Erreur de protocole" que le quiz
        return;
    }

    const result = await handler.evaluate(state.runtime, answer);
    state.answers.set(state.index, { answer, result });
    state.retrying.delete(state.index);
    const prevStatus = getStatus(state.entry.domain, q.id);
    record(state.entry.domain, q.id, result.correct ? 'ok' : 'ko',
        handler.toPersistedAnswer ? handler.toPersistedAnswer(state.runtime, answer) : undefined);
    if (result.correct && prevStatus !== 'ok') {
        const done = getDomainStats(state.entry.domain).ok === state.exercises.length;
        done ? playComplete() : playSuccess();
    } else if (!result.correct) {
        playFail();
    }
    handler.showCorrection(state.runtime, bodyEl, answer, result);

    setValidateButtonAfterAnswer(result.correct);
    const attemptsEl = document.getElementById('laboAttempts');
    attemptsEl.textContent = `Tentatives : ${getEntry(state.entry.domain, q.id)?.n || 1}`;
    attemptsEl.style.visibility = 'visible';
    refreshChips();
}

// Apres une reponse : reussi -> Valider grise (rien a regagner) ; rate ->
// Valider devient Reessayer, meme emplacement (aucun decalage de mise en page).
function setValidateButtonAfterAnswer(correct) {
    const btn = document.getElementById('laboValidateBtn');
    if (correct) {
        btn.disabled = true;
    } else {
        btn.textContent = 'Réessayer';
        btn.dataset.action = 'retry-exercise';
    }
}

function retryExercise() {
    state.answers.delete(state.index);
    state.runtimes.delete(state.index); // nouveau melange des options
    state.retrying.add(state.index);    // bloque la restauration durable jusqu'a revalidation
    renderExercise();
}

function refreshChips() {
    const { entry, exercises, index } = state;
    el().querySelectorAll('[data-goto]').forEach((chip, i) => {
        chip.className = chipClass(getStatus(entry.domain, exercises[i].id), i === index);
    });
}

function renderRecap() {
    const { entry, exercises } = state;
    const stats = getDomainStats(entry.domain);
    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back">← Labo</button>
            <span class="labo-title">${entry.title}</span>
        </div>
        <h2>Protocole terminé</h2>
        ${recapHtml(stats, exercises.length)}
        <div class="labo-actions">
            <button data-action="review">Revoir les exercices</button>
            <button class="btn-primary" data-action="back">Retour au labo</button>
        </div>
    `;
    document.getElementById('progressBar').style.width = '100%';
}

function wire() {
    if (wired) return;
    wired = true;
    el().addEventListener('click', (e) => {
        const chip = e.target.closest('[data-goto]');
        if (chip) {
            state.index = Number(chip.dataset.goto);
            renderExercise();
            return;
        }
        const btn = e.target.closest('[data-action]');
        if (!btn || btn.disabled) return;
        switch (btn.dataset.action) {
            case 'back': showScreen('labo-hub'); break;
            case 'prev': if (state.index > 0) { state.index--; renderExercise(); } break;
            case 'next': if (state.index < state.exercises.length - 1) { state.index++; renderExercise(); } break;
            case 'validate': validate(); break;
            case 'retry-exercise': retryExercise(); break;
            case 'finish': renderRecap(); break;
            case 'review': state.index = 0; renderExercise(); break;
        }
    });
}
