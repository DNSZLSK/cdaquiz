// Registre des types d'exercices. Contrat d'un handler :
//   prepare(question) -> runtime          (ne mute jamais la question source)
//   render(runtime, bodyEl)               (enonce + zone de reponse)
//   collectAnswer(bodyEl) -> answer|null  (null => reponse vide, modale)
//   evaluate(runtime, answer) -> {correct} (pur ; peut etre async, le moteur await)
//   showCorrection(runtime, bodyEl, answer, result)
const types = new Map();

export function registerExerciseType(name, handler) {
    types.set(name, handler);
}

export function getExerciseType(question) {
    const type = question.type ?? 'qcm';
    const handler = types.get(type);
    if (!handler) throw new Error(`Type d'exercice non enregistre : ${type}`);
    return handler;
}
