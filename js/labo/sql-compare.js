// Comparateur de resultats SQL — module PUR (aucune dependance DOM), testable
// en console et par selftest.js.
//
// Regles :
// - noms de colonnes ignores (les alias different legitimement), arite stricte ;
// - ordre des lignes ignore SAUF si la solution contient ORDER BY ;
// - NULL -> sentinelle, flottants arrondis a 6 decimales (AVG) ;
// - solutions UPDATE/DELETE/INSERT : comparaison de l'etat des tables, pas du
//   result set ;
// - piege sql.js : db.exec() OMET les result sets vides du tableau de retour.
import { createDb } from './sql-engine.js';

export function normalize(v) {
    if (v === null) return '\u0000NULL';
    if (typeof v === 'number' && !Number.isInteger(v)) return Number(v.toFixed(6));
    return v;
}

function lastSet(res) {
    return res.length ? res[res.length - 1] : null;
}

export function compareSets(a, b, ordered) {
    if (a.columns.length !== b.columns.length) return { equal: false, reason: 'arity' };
    if (a.values.length !== b.values.length) return { equal: false, reason: 'rowcount' };
    const na = a.values.map(r => JSON.stringify(r.map(normalize)));
    const nb = b.values.map(r => JSON.stringify(r.map(normalize)));
    const sa = ordered ? na : [...na].sort();
    const sb = ordered ? nb : [...nb].sort();
    const equal = sa.every((row, i) => row === sb[i]);
    if (equal) return { equal: true };
    if (ordered) {
        // Memes lignes mais mal triees ?
        const ua = [...na].sort(), ub = [...nb].sort();
        if (ua.every((row, i) => row === ub[i])) return { equal: false, reason: 'order' };
    }
    return { equal: false, reason: 'values' };
}

export function dumpState(db, scenario) {
    return JSON.stringify(scenario.schema.tables.map(t => {
        const r = db.exec(`SELECT * FROM ${t.name} ORDER BY 1`);
        return r.length ? r[0].values.map(row => row.map(normalize)) : [];
    }));
}

// Verdict complet. Repart de DEUX bases fraiches : le bac a sable de l'utilisateur
// (Executer) ne pollue jamais la validation.
export function validate(exercise, userSql, scenario, SQL) {
    const mode = /^\s*(UPDATE|DELETE|INSERT)/i.test(exercise.solution) ? 'state' : 'result';
    const dbU = createDb(SQL, scenario.schema.seed_sql);
    const dbR = createDb(SQL, scenario.schema.seed_sql);
    try {
        let resU;
        try {
            resU = dbU.exec(userSql);
        } catch (e) {
            return { correct: false, mode, sqlError: e.message };
        }
        const resR = dbR.exec(exercise.solution);

        if (mode === 'state') {
            const equal = dumpState(dbU, scenario) === dumpState(dbR, scenario);
            return { correct: equal, mode, reason: equal ? null : 'state' };
        }

        const setU = lastSet(resU);
        const setR = lastSet(resR);
        if (!setU && !setR) return { correct: true, mode };
        if (!setU || !setR) return { correct: false, mode, reason: 'empty', userSet: setU };
        const ordered = /\border\s+by\b/i.test(exercise.solution);
        const cmp = compareSets(setU, setR, ordered);
        return { correct: cmp.equal, mode, reason: cmp.reason || null, userSet: setU, expectedArity: setR.columns.length };
    } finally {
        dbU.close();
        dbR.close();
    }
}

export function failureMessage(verdict) {
    if (verdict.sqlError) return `Erreur SQL : ${verdict.sqlError}`;
    switch (verdict.reason) {
        case 'arity': return `Nombre de colonnes différent (${verdict.expectedArity} attendue${verdict.expectedArity > 1 ? 's' : ''}).`;
        case 'rowcount': return 'Le nombre de lignes ne correspond pas au résultat attendu.';
        case 'order': return 'Les bonnes lignes sont là, mais l\'ordre est incorrect — la consigne demande un tri.';
        case 'empty': return 'Votre requête ne retourne aucun résultat alors qu\'un résultat est attendu.';
        case 'state': return 'L\'état de la base après votre requête ne correspond pas à l\'état attendu.';
        default: return 'Les valeurs retournées ne correspondent pas au résultat attendu.';
    }
}
