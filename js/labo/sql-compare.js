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

// Colonnes « nues » : avec GROUP BY, chaque colonne du SELECT principal doit etre
// agregee, citee dans le GROUP BY, ou dependre de la cle primaire d'une table groupee
// (GROUP BY client.id autorise client.nom). SQLite accepte le reste (avec MAX ou MIN
// il prend la ligne du maximum, sinon une ligne quelconque du groupe) ; PostgreSQL et
// MySQL (ONLY_FULL_GROUP_BY) le refusent.
const SQL_WORDS = new Set(('select from where group by having order limit offset as and or not null is in like between case when then else end distinct asc desc '
    + 'join on inner left right outer cross over partition with recursive union except intersect exists all any glob escape collate nocase '
    + 'true false current_date current_time current_timestamp integer real text').split(' '));
function topLevel(sql) {
    // remplace le contenu des parentheses et des chaines par des espaces : ne reste que le niveau 0
    let out = '', depth = 0, q = false;
    for (const ch of sql) {
        if (q) { if (ch === "'") q = false; out += ' '; continue; }
        if (ch === "'") { q = true; out += ' '; continue; }
        if (ch === '(') { depth++; out += ' '; continue; }
        if (ch === ')') { depth--; out += ' '; continue; }
        out += depth ? ' ' : ch;
    }
    return out;
}
// Decoupe src[start, end) aux virgules de niveau 0 (hors parentheses et chaines).
function splitTop(src, start, end) {
    const parts = []; let cur = '', depth = 0, q = false;
    for (let i = start; i < end; i++) { const ch = src[i];
        if (q) { cur += ch; if (ch === "'") q = false; continue; }
        if (ch === "'") q = true; else if (ch === '(') depth++; else if (ch === ')') depth--;
        if (ch === ',' && depth === 0 && !q) { parts.push(cur); cur = ''; } else cur += ch; }
    parts.push(cur);
    return parts.map(s => s.trim()).filter(Boolean);
}
// Renvoie { sure, doubt } :
// - sure  : colonne qualifiee t.col que PostgreSQL ET MySQL refusent (t n'est groupee ni
//           par t.col, ni par t.id, ni par une egalite de jointure avec une colonne groupee) ;
// - doubt : cas que l'on ne sait pas trancher sans le schema (colonne sans prefixe dans une
//           jointure, dependance deduite d'une egalite : MySQL l'accepte, PostgreSQL non).
// Hypothese : la cle primaire de chaque table s'appelle id (vrai dans les bases du Labo).
// En cas de doute, on avertit sans refuser : un faux refus est pire qu'un faux accept.
export function bareColumns(sql) {
    const src = sql.replace(/"([^"]+)"/g, '$1');          // "client"."nom" -> client.nom
    const flat = topLevel(src);
    const g = flat.match(/\bgroup\s+by\b[\s\S]*?(?=\bhaving\b|\border\s+by\b|\blimit\b|\bwindow\b|;|$)/i);
    const sel = flat.match(/\bselect\b[\s\S]*?\bfrom\b/i);
    if (!g || !sel) return { sure: [], doubt: [] };
    const compact = s => s.replace(/\s+/g, '').toLowerCase();
    // liste du SELECT : expression + alias eventuel
    const items = splitTop(src, sel.index + sel[0].search(/select/i) + 6, sel.index + sel[0].length - 4).map(it => {
        const m = it.match(/^([\s\S]*?)\s+(?:as\s+)?([a-z_]\w*)$/i);
        return m && !/[.(]$/.test(m[1]) && !SQL_WORDS.has(m[2].toLowerCase()) ? { expr: m[1], alias: m[2].toLowerCase() } : { expr: it, alias: null };
    });
    // GROUP BY : expressions, numeros de colonne (GROUP BY 1) et alias resolus
    const grouped = new Set(), okItems = new Set();
    for (const gx of splitTop(src, g.index + g[0].search(/by/i) + 2, g.index + g[0].length)) {
        const c = compact(gx);
        if (/^\d+$/.test(c) && items[+c - 1]) { okItems.add(+c - 1); grouped.add(compact(items[+c - 1].expr)); continue; }
        const byAlias = items.findIndex(it => it.alias === c); if (byAlias >= 0) okItems.add(byAlias);
        grouped.add(c);
    }
    const quals = new Set([...grouped].filter(x => /^[a-z_]\w*\.id$/.test(x)).map(x => x.split('.')[0]));
    // egalites t.id = colonne groupee (ON / WHERE) : MySQL en deduit une dependance, PostgreSQL non
    const viaEq = new Set();
    for (const m of src.matchAll(/([a-z_]\w*)\.([a-z_]\w*)\s*=\s*([a-z_]\w*)\.([a-z_]\w*)/gi)) {
        const [a, b] = [`${m[1]}.${m[2]}`.toLowerCase(), `${m[3]}.${m[4]}`.toLowerCase()];
        if (grouped.has(a) && m[4].toLowerCase() === 'id') viaEq.add(m[3].toLowerCase());
        if (grouped.has(b) && m[2].toLowerCase() === 'id') viaEq.add(m[1].toLowerCase());
    }
    const fromPart = flat.slice(sel.index + sel[0].length, g.index);
    const singleTable = !/\bjoin\b|,/i.test(fromPart.replace(/\bwhere\b[\s\S]*$/i, ''));
    const sure = [], doubt = [];
    items.forEach((it, k) => {
        if (okItems.has(k) || grouped.has(compact(it.expr))) return;
        if (/\b(count|sum|avg|min|max|total|group_concat|string_agg|json_group_array)\s*\(/i.test(it.expr)) return;
        const text = it.expr.replace(/'(?:[^']|'')*'/g, "''");
        for (const m of text.matchAll(/\b([a-z_]\w*)(?:\s*\.\s*([a-z_]\w*))?\b(\s*\()?/gi)) {
            if (m[3]) continue;                                   // appel de fonction : julianday(...), iif(...)
            const t = m[2] ? m[1].toLowerCase() : null, col = (m[2] || m[1]).toLowerCase();
            if (!t && SQL_WORDS.has(col)) continue;
            const name = t ? `${t}.${col}` : col;
            if (grouped.has(name)) continue;
            if (t) {
                if (quals.has(t)) continue;                       // GROUP BY t.id : toute la ligne de t en depend
                (viaEq.has(t) ? doubt : sure).push(name);
            } else {
                if ([...grouped].some(x => x.endsWith('.' + col))) continue;
                if (singleTable && (grouped.has('id') || quals.size)) continue; // une table groupee par sa cle
                doubt.push(name);
            }
        }
    });
    return { sure: [...new Set(sure)], doubt: [...new Set(doubt)] };
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
        // Bon resultat, mais obtenu avec des colonnes nues : refuse avec explication
        if (cmp.equal) {
            const { sure, doubt } = bareColumns(userSql);
            if (sure.length) return { correct: false, mode, reason: 'bare', bare: sure, userSet: setU, expectedArity: setR.columns.length };
            if (doubt.length) return { correct: true, mode, reason: null, userSet: setU, expectedArity: setR.columns.length,
                warning: `Accepté, mais vérifiez ${doubt.join(', ')} : ni agrégé ni dans le GROUP BY. SQLite et MySQL peuvent l'accepter, PostgreSQL le refusera si cette colonne ne dépend pas de la clé primaire d'une table groupée.` };
        }
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
        case 'bare': return `Bon résultat, mais ${verdict.bare.join(', ')} n'est ni agrégé ni dans le GROUP BY. SQLite l'accepte (avec MAX ou MIN, il reprend la ligne du maximum ; sinon, une ligne quelconque du groupe), mais PostgreSQL et MySQL (ONLY_FULL_GROUP_BY) refusent la requête. Utilisez une sous-requête ou une fonction de fenêtre.`;
        default: return 'Les valeurs retournées ne correspondent pas au résultat attendu.';
    }
}
