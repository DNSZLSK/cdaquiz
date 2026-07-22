// Etat encapsule d'une partie de quiz (remplace les globaux du monolithe).
import { shuffleArray } from './utils.js';
import { getExerciseType } from './exercises/registry.js';

export function createQuizSession({ questions, moduleKey }) {
    const shuffled = shuffleArray(questions);
    const runtimes = shuffled.map(q => getExerciseType(q).prepare(q));

    const session = {
        moduleKey,
        setIds: questions.map(q => q.id),
        runtimes,
        index: 0,
        score: 0,
        moduleScores: {},
        wrongIds: [],
        startTime: Date.now(),
        lastElapsedSec: 0,

        current() { return runtimes[session.index]; },
        isFirst() { return session.index === 0; },
        isLast() { return session.index === runtimes.length - 1; },
        length() { return runtimes.length; },
        progressPct() { return ((session.index + 1) / runtimes.length) * 100; },

        recordResult(question, correct) {
            if (!correct && !session.wrongIds.includes(question.id)) {
                session.wrongIds.push(question.id);
            }
            if (!session.moduleScores[question.module]) {
                session.moduleScores[question.module] = { correct: 0, total: 0 };
            }
            if (correct) {
                session.score++;
                session.moduleScores[question.module].correct++;
            }
            session.moduleScores[question.module].total++;
        },

        next() { if (!session.isLast()) session.index++; },
        prev() { if (!session.isFirst()) session.index--; },

        stopTimer() {
            session.lastElapsedSec = Math.round((Date.now() - session.startTime) / 1000);
            return session.lastElapsedSec;
        }
    };
    return session;
}
