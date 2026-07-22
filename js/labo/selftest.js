// Harnais de dev : rejoue les 35 solutions SQL comme reponses utilisateur.
// Usage : laboSqlSelfTest() dans la console (apres avoir ouvert le SQL Lab,
// ou directement — tout se charge tout seul).
import { laboCatalog } from '../../data/exercises/index.js';
import { loadSqlJs } from './sql-engine.js';
import { validate } from './sql-compare.js';

window.laboSqlSelfTest = async function () {
    const SQL = await loadSqlJs();
    const bank = (await laboCatalog.find(d => d.domain === 'sql').load()).default;
    let pass = 0, fail = 0;
    for (const sc of bank.scenarios) {
        for (const ex of sc.exercises) {
            const v = validate(ex, ex.solution, sc, SQL);
            if (v.correct) {
                pass++;
            } else {
                fail++;
                console.error('FAIL', ex.id, v);
            }
        }
    }
    console.log(`laboSqlSelfTest : ${pass}/${pass + fail} OK`);
    return { pass, fail };
};
