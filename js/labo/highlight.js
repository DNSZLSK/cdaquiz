// Coloration syntaxique legere par regex, appliquee UNIQUEMENT sur du texte
// deja passe par escapeHtml (les blocs sont en lecture seule).
import { escapeHtml } from '../utils.js';

const KEYWORDS = {
    java: 'class interface enum extends implements public private protected static final abstract void int long double float boolean char byte short String new return if else for while do switch case break continue this super import package throw throws try catch finally null true false instanceof var record',
    python: 'def return if elif else for in while import from with as try except finally raise lambda class pass break continue and or not is None True False print global yield assert del',
    ts: 'const let var function export import from default class interface extends implements new return if else for of in while this async await try catch throw type readonly public private protected static null undefined true false',
    sql: 'SELECT FROM WHERE JOIN LEFT RIGHT OUTER INNER ON GROUP BY ORDER HAVING DISTINCT LIMIT AS AND OR NOT IN IS NULL LIKE COUNT SUM AVG MIN MAX INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE DESC ASC CASE WHEN THEN ELSE END BETWEEN UNION PRIMARY KEY FOREIGN REFERENCES INTEGER VARCHAR DECIMAL BOOLEAN DATE DEFAULT',
    docker: 'FROM COPY ADD RUN CMD ENTRYPOINT EXPOSE WORKDIR ENV ARG VOLUME USER LABEL docker build run exec ps stop rm rmi images pull push logs compose up down',
    shell: 'git init clone add commit push pull fetch merge rebase branch checkout switch restore status log diff stash tag reset revert remote cherry-pick config mv rm show blame'
};

const sets = {};
for (const [lang, words] of Object.entries(KEYWORDS)) {
    sets[lang] = new Set(words.split(' '));
}

// Syntaxe de commentaire propre a chaque langage : '--' est un decrement en
// Java, '//' une division entiere en Python, '#' une couleur hex / un
// selecteur d'id en CSS.
const COMMENT_PATTERNS = {
    java: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    ts: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/',
    python: '#[^\\n]*',
    docker: '#[^\\n]*',
    shell: '#[^\\n]*',
    sql: '--[^\\n]*'
};

export function highlightCode(raw, lang = 'java') {
    const kw = sets[lang] || sets.java;
    const esc = escapeHtml(raw);
    const re = new RegExp(
        '(' + (COMMENT_PATTERNS[lang] || COMMENT_PATTERNS.java) + ')'           // commentaires
        + "|(&quot;(?:(?!&quot;)[\\s\\S])*?&quot;|'[^'\\n]*'|`[^`]*`)"          // chaines
        + '|(@\\w+)'                                                            // annotations / decorateurs
        + '|(&lt;\\/?[a-zA-Z][a-zA-Z0-9-]*)'                                    // balises HTML
        + '|([A-Za-z_][A-Za-z0-9_]*)'                                           // identifiants
        + '|(\\b\\d+(?:\\.\\d+)?\\b)',                                          // nombres
        'g'
    );
    return esc.replace(re, (m, com, str, ann, tag, word, num) => {
        if (com) return `<span class="tok-com">${m}</span>`;
        if (str) return `<span class="tok-str">${m}</span>`;
        if (ann) return `<span class="tok-ann">${m}</span>`;
        if (tag) return `<span class="tok-tag">${m}</span>`;
        if (num) return `<span class="tok-num">${m}</span>`;
        if (word && kw.has(lang === 'sql' || lang === 'docker' ? word.toUpperCase() : word)) {
            return `<span class="tok-kw">${m}</span>`;
        }
        return m;
    });
}

// Langue deduite du prefixe d'id des exercices (oop-01, py-03, hc-02...)
const LANG_BY_PREFIX = {
    oop: 'java', tu: 'java', sb: 'java', uml: 'java', sec: 'java',
    ng: 'ts', js: 'ts', hc: 'ts', bs: 'ts',
    py: 'python', pyf: 'python',
    dk: 'docker', git: 'shell',
    fbr: 'sql', tym: 'sql', mcd: 'sql'
};

export function langForExercise(id) {
    return LANG_BY_PREFIX[String(id).split('-')[0]] || 'java';
}

export function isSqlKeyword(upperWord) {
    return sets.sql.has(upperWord);
}
