// Type d'exercice "code-qcm" : QCM a reponse unique avec bloc de code,
// badges type/difficulte et indice depliable. Utilise par le Code Lab.
import { escapeHtml, shuffleArray } from '../utils.js';
import { highlightCode, langForExercise } from '../labo/highlight.js';

const TYPE_LABELS = {
    predict: 'Predict',
    complete: 'Complete',
    identify: 'Identify',
    debug: 'Debug'
};

const DIFFICULTY_LABELS = {
    beginner: 'débutant',
    intermediate: 'intermédiaire',
    advanced: 'avancé'
};

export const codeQcmType = {
    prepare(question) {
        const options = shuffleArray(question.options.map((text, i) => ({ text, orig: i })));
        return { question, options };
    },

    render(runtime, bodyEl) {
        const q = runtime.question;
        const badges = `
            <div class="labo-badges">
                <span class="badge badge-type-${q.type}">${TYPE_LABELS[q.type] || q.type}</span>
                <span class="badge badge-difficulty-${q.difficulty}">${DIFFICULTY_LABELS[q.difficulty] || q.difficulty}</span>
            </div>
        `;
        bodyEl.innerHTML = `
            ${badges}
            <pre class="code-block"><code>${highlightCode(q.code, langForExercise(q.id))}</code></pre>
            <div class="question-text">${escapeHtml(q.question)}</div>
            <div class="answer-hint">Sélectionnez la bonne réponse</div>
            <div class="options">
                ${runtime.options.map((option, index) => `
                    <label class="option" data-index="${index}">
                        <input type="radio" name="answer" value="${index}">
                        <span>${escapeHtml(option.text)}</span>
                    </label>
                `).join('')}
            </div>
            <details class="labo-hint">
                <summary>Indice</summary>
                <p>${escapeHtml(q.hint || '')}</p>
            </details>
            <div class="explanation">
                <h4>Explication</h4>
                <p>${escapeHtml(q.explanation)}</p>
            </div>
        `;
    },

    // Re-coche la radio d'une reponse deja validee (retour via Precedent/chips)
    restoreAnswer(runtime, bodyEl, answer) {
        const radio = bodyEl.querySelector(`input[name="answer"][value="${answer}"]`);
        if (radio) radio.checked = true;
    },

    // Forme durable de la reponse : l'index d'ORIGINE de l'option (le melange
    // change a chaque session, la position cochee n'est pas stockable).
    toPersistedAnswer(runtime, answer) {
        return runtime.options[answer].orig;
    },

    fromPersistedAnswer(runtime, persisted) {
        const idx = runtime.options.findIndex(o => o.orig === persisted);
        return idx >= 0 ? idx : null;
    },

    collectAnswer(bodyEl) {
        const checked = bodyEl.querySelector('input[name="answer"]:checked');
        return checked ? Number(checked.value) : null;
    },

    evaluate(runtime, answer) {
        return { correct: runtime.options[answer].orig === runtime.question.answer };
    },

    showCorrection(runtime, bodyEl, answer, result) {
        bodyEl.querySelectorAll('.option').forEach(option => {
            option.classList.add('disabled');
            const index = Number(option.dataset.index);
            if (runtime.options[index].orig === runtime.question.answer) {
                option.classList.add('correct');
            } else if (index === answer) {
                option.classList.add('incorrect');
            }
        });
        bodyEl.querySelector('.explanation').classList.add('show');
        if (!result.correct) {
            bodyEl.querySelector('.labo-hint').open = true;
        }
    }
};
