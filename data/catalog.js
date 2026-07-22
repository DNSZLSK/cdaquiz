// Index derive : la source de verite du lien module <-> questions est le champ q.module.
import { questions } from './questions.js';
import { modules } from './modules.js';

export const questionsByModule = new Map();
for (const q of questions) {
    if (!questionsByModule.has(q.module)) questionsByModule.set(q.module, []);
    questionsByModule.get(q.module).push(q);
    console.assert(modules[q.module], `Question ${q.id} : module inconnu "${q.module}"`);
}

export function getQuestionsFor(moduleKey) {
    if (moduleKey === 'all') return [...questions];
    return [...(questionsByModule.get(moduleKey) || [])];
}

export function getQuestionsByIds(ids) {
    return questions.filter(q => ids.includes(q.id));
}

export function getModuleName(key) {
    if (key === 'all') return 'Tous les modules';
    return modules[key]?.name || key;
}
