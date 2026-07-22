// Type d'exercice QCM checkbox (multi-reponses) — portage a l'identique du quiz v1.
export const qcmType = {
    prepare(question) {
        const combined = question.options.map((opt, idx) => ({
            text: opt,
            wasCorrect: question.correct.includes(idx)
        }));
        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        return {
            question,
            shuffledOptions: combined.map(c => c.text),
            shuffledCorrect: combined.map((c, idx) => c.wasCorrect ? idx : -1).filter(i => i >= 0)
        };
    },

    render(runtime, bodyEl) {
        bodyEl.innerHTML = `
            <div class="question-text">${runtime.question.question}</div>

            <div class="answer-hint">Sélectionnez la ou les bonne(s) réponse(s)</div>

            <div class="options">
                ${runtime.shuffledOptions.map((option, index) => `
                    <label class="option" data-index="${index}">
                        <input type="checkbox" name="answer" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>

            <div class="explanation">
                <h4>Explication</h4>
                <p>${runtime.question.explanation}</p>
            </div>
        `;
    },

    collectAnswer(bodyEl) {
        const selected = [];
        bodyEl.querySelectorAll('input[name="answer"]').forEach((checkbox, index) => {
            if (checkbox.checked) selected.push(index);
        });
        return selected.length > 0 ? selected : null;
    },

    evaluate(runtime, answer) {
        const total = runtime.shuffledOptions.length;
        let correct = true;
        for (let index = 0; index < total; index++) {
            const isCorrectOption = runtime.shuffledCorrect.includes(index);
            const isChecked = answer.includes(index);
            if (isCorrectOption && !isChecked) correct = false;
            if (!isCorrectOption && isChecked) correct = false;
        }
        return { correct };
    },

    showCorrection(runtime, bodyEl, answer, result) {
        bodyEl.querySelectorAll('.option').forEach(option => {
            option.classList.add('disabled');
            const index = Number(option.dataset.index);
            if (runtime.shuffledCorrect.includes(index)) {
                option.classList.add('correct');
            } else if (answer.includes(index)) {
                option.classList.add('incorrect');
            }
        });
        bodyEl.querySelector('.explanation').classList.add('show');
    }
};
