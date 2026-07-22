// Code Lab : QCM code par domaine, navigation libre, statut persistant par exercice.
import { registerExerciseType, getExerciseType } from '../exercises/registry.js';
import { codeQcmType } from '../exercises/code-qcm.js';
import { registerScreen, showScreen } from '../screens.js';
import { getStatus, getEntry, record, getDomainStats } from './progress.js';
import { playSuccess, playFail, playComplete, toggleMuted, muteButtonLabel } from './sounds.js';
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
    state = { entry, exercises: bank.exercises, index: 0, runtime: null };
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
    state.runtime = getExerciseType(q).prepare(q);

    const chips = exercises.map((ex, i) =>
        `<button class="${chipClass(getStatus(entry.domain, ex.id), i === index)}" data-goto="${i}">${i + 1}</button>`
    ).join('');

    const isLast = index === exercises.length - 1;
    const attempts = getEntry(entry.domain, q.id)?.n || 0;

    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back">← Labo</button>
            <span class="labo-title">${entry.title}</span>
            <button class="labo-mute" data-action="mute">${muteButtonLabel()}</button>
            <span class="labo-counter">${index + 1}/${exercises.length}</span>
        </div>
        <div class="labo-chips">${chips}</div>
        <p class="labo-attempts" id="laboAttempts" ${attempts ? '' : 'style="display: none;"'}>Tentatives : ${attempts}</p>
        <div class="exercise-body"></div>
        <div class="labo-actions">
            <button data-action="prev" ${index === 0 ? 'disabled' : ''}>Précédent</button>
            <button class="btn-primary" id="laboValidateBtn" data-action="validate">Valider</button>
            <button class="btn-primary" id="laboNextBtn" data-action="${isLast ? 'finish' : 'next'}"
                style="display: none;">${isLast ? 'Terminer' : 'Suivant'}</button>
        </div>
    `;

    getExerciseType(q).render(state.runtime, el().querySelector('.exercise-body'));
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
    if (answer === null) return; // pas de reponse cochee : on ne juge pas

    const result = await handler.evaluate(state.runtime, answer);
    const prevStatus = getStatus(state.entry.domain, q.id);
    record(state.entry.domain, q.id, result.correct ? 'ok' : 'ko');
    if (result.correct && prevStatus !== 'ok') {
        const done = getDomainStats(state.entry.domain).ok === state.exercises.length;
        done ? playComplete() : playSuccess();
    } else if (!result.correct) {
        playFail();
    }
    handler.showCorrection(state.runtime, bodyEl, answer, result);

    document.getElementById('laboValidateBtn').style.display = 'none';
    const nextBtn = document.getElementById('laboNextBtn');
    nextBtn.style.display = 'block';
    const attemptsEl = document.getElementById('laboAttempts');
    attemptsEl.textContent = `Tentatives : ${getEntry(state.entry.domain, q.id)?.n || 1}`;
    attemptsEl.style.display = '';
    refreshChips();
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
            case 'finish': renderRecap(); break;
            case 'review': state.index = 0; renderExercise(); break;
            case 'mute': toggleMuted(); btn.textContent = muteButtonLabel(); break;
        }
    });
}
