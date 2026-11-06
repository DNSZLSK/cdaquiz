// SQL Lab : scenarios, schema, editeur, execution reelle (sql.js) et validation.
import { registerScreen, showScreen } from '../screens.js';
import { escapeHtml } from '../utils.js';
import { loadSqlJs, createDb, execUser } from './sql-engine.js';
import { validate, failureMessage } from './sql-compare.js';
import { getStatus, getEntry, record, getDomainStats } from './progress.js';
import { playSuccess, playFail, playSqlError, playComplete, toggleMuted, muteButtonLabel } from './sounds.js';
import { recapHtml } from './recap.js';
import { getDraft, setDraft } from './drafts.js';
import { highlightCode, isSqlKeyword } from './highlight.js';
import './selftest.js';

const MAX_ROWS = 200;
const DIFFICULTY_LABELS = { beginner: 'débutant', intermediate: 'intermédiaire', advanced: 'avancé' };

const GLADOS_OK = [
    "Résultat identique. Calibration réussie.",
    "Correct. Le Centre d'Enrichissement prend note de votre efficacité.",
    "Requête conforme. Vous faites des progrès remarquables. Pour un humain.",
    "Résultat validé. Le gâteau se rapproche.",
    "Exact. Nous n'avons même pas eu besoin de falsifier ce résultat."
];

const GLADOS_KO = [
    "Ne vous découragez pas. Les sujets de test médiocres sont aussi utiles à la science.",
    "L'échec n'est que le succès arrondi à l'inférieur.",
    "Cette tentative a été consignée dans votre dossier permanent.",
    "Réessayez. La science ne se fait pas en un jour. Sauf ici.",
    "Le Centre d'Enrichissement vous rappelle que la base de données ne vous juge pas. Nous, si."
];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const draftKey = () => `${state.scenario.id}:${state.scenario.exercises[state.index].id}`;

let state = null; // { entry, bank, SQL, scenario, index, db }
let lastEntry = null; // pour le bouton Reessayer si le chargement initial echoue
let wired = false;
const el = () => document.getElementById('laboSql');

registerScreen('labo-sql', {
    show() { el().style.display = 'block'; },
    hide() { el().style.display = 'none'; }
});

export async function openSqlLab(entry) {
    lastEntry = entry;
    wire();
    showScreen('labo-sql');
    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back-hub">← Labo</button>
            <span class="labo-title">${entry.title}</span>
        </div>
        <p class="sql-loading">Initialisation du moteur SQLite…</p>
    `;
    try {
        const [SQL, mod] = await Promise.all([loadSqlJs(), entry.load()]);
        state = {
            entry, bank: mod.default, SQL, scenario: null, index: 0, db: null,
            feedbackCache: new Map() // exId -> {fb, res} : dernier verdict, restaure au retour
        };
        renderScenarioList();
    } catch (err) {
        el().innerHTML = `
            <div class="labo-topbar">
                <button data-action="back-hub">← Labo</button>
                <span class="labo-title">${entry.title}</span>
            </div>
            <div class="sql-error">Échec du chargement du moteur SQL : ${escapeHtml(err.message)}</div>
            <button class="btn-primary" data-action="retry-load">Réessayer</button>
        `;
    }
}

function scenarioPrefix() {
    return state.scenario.exercises[0].id.split('-')[0] + '-';
}

function renderRecap() {
    const sc = state.scenario;
    const stats = getDomainStats('sql', scenarioPrefix());
    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back-scenarios">← Scénarios</button>
            <span class="labo-title">${escapeHtml(sc.title)}</span>
        </div>
        <h2>Protocole terminé</h2>
        ${recapHtml(stats, sc.exercises.length)}
        <div class="labo-actions">
            <button data-action="review">Revoir les exercices</button>
            <button class="btn-primary" data-action="back-scenarios">Retour aux scénarios</button>
        </div>
    `;
    document.getElementById('progressBar').style.width = '100%';
}

function scenarioStats(sc) {
    let ok = 0;
    for (const ex of sc.exercises) {
        if (getStatus('sql', ex.id) === 'ok') ok++;
    }
    return { ok, total: sc.exercises.length };
}

function renderScenarioList() {
    const cards = state.bank.scenarios.map((sc, i) => {
        const stats = scenarioStats(sc);
        const pct = Math.round((stats.ok / stats.total) * 100);
        return `
            <div class="module-card labo-domain-card" style="--module-color: ${state.entry.color}" data-scenario="${i}">
                <h3>${escapeHtml(sc.title)}</h3>
                <p>${escapeHtml(sc.description)}</p>
                <p class="question-count">${stats.total} exercices · niveau ${DIFFICULTY_LABELS[sc.difficulty] || sc.difficulty}</p>
                <div class="labo-progress-track">
                    <div class="labo-progress-fill" style="width: ${pct}%; background: ${state.entry.color};"></div>
                </div>
                <p class="labo-progress-label">${stats.ok}/${stats.total} calibrés</p>
            </div>
        `;
    }).join('');

    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back-hub">← Labo</button>
            <span class="labo-title">${state.entry.title}</span>
        </div>
        <h2>Choisissez un scénario</h2>
        <div class="module-grid">${cards}</div>
    `;
    document.getElementById('progressBar').style.width = '0%';
}

function openScenario(i) {
    state.scenario = state.bank.scenarios[i];
    state.index = 0;
    resetDb();
    renderPlayer();
}

function resetDb() {
    if (state.db) state.db.close();
    state.db = createDb(state.SQL, state.scenario.schema.seed_sql);
}

function chipClass(status, isCurrent) {
    let cls = 'labo-chip';
    if (status) cls += ` labo-chip-${status}`;
    if (isCurrent) cls += ' labo-chip-current';
    return cls;
}

function renderPlayer() {
    const sc = state.scenario;
    const ex = sc.exercises[state.index];

    const chips = sc.exercises.map((e, i) =>
        `<button class="${chipClass(getStatus('sql', e.id), i === state.index)}" data-goto="${i}">${i + 1}</button>`
    ).join('');

    const schema = sc.schema.tables.map(t => `
        <details class="sql-table">
            <summary>${escapeHtml(t.name)} <span class="sql-table-cols">(${t.columns.length} colonnes)</span></summary>
            <ul>
                ${t.columns.map(c => `<li><code>${escapeHtml(c.name)}</code> <span class="sql-coltype">${escapeHtml(c.type)}</span></li>`).join('')}
            </ul>
        </details>
    `).join('');

    el().innerHTML = `
        <div class="labo-topbar">
            <button data-action="back-scenarios">← Scénarios</button>
            <span class="labo-title">${escapeHtml(sc.title)}</span>
            <button class="labo-mute" data-action="mute">${muteButtonLabel()}</button>
            <span class="labo-counter">${state.index + 1}/${sc.exercises.length}</span>
        </div>
        <div class="labo-chips">${chips}</div>
        <div class="sql-player">
            <div class="sql-main">
                <p class="sql-concepts">${(ex.concepts || []).map(c => escapeHtml(c)).join(' · ')}</p>
                <p class="labo-attempts" id="laboAttempts" style="visibility: ${getEntry('sql', ex.id)?.n ? 'visible' : 'hidden'};">Tentatives : ${getEntry('sql', ex.id)?.n || 0}</p>
                <div class="question-text">${escapeHtml(ex.question)}</div>
                <details class="labo-hint">
                    <summary>Indice</summary>
                    <p>${escapeHtml(ex.hint || '')}</p>
                </details>
                <div class="sql-editor-wrap">
                    <pre class="sql-editor-highlight" aria-hidden="true"><code id="sqlHighlight"></code></pre>
                    <textarea class="sql-editor" id="sqlEditor" rows="5" placeholder="Écrivez votre requête SQL ici…"
                        autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off"></textarea>
                </div>
                <div class="sql-actions">
                    <button data-action="run" title="Ctrl+Entrée">Exécuter</button>
                    <button class="btn-primary" data-action="validate" title="Ctrl+Maj+Entrée">Valider</button>
                    <button data-action="expected">Résultat attendu</button>
                    <button data-action="solution">Solution</button>
                    <button data-action="${state.index === sc.exercises.length - 1 ? 'finish' : 'next'}">
                        ${state.index === sc.exercises.length - 1 ? 'Terminer' : 'Suivant'}</button>
                </div>
                <div class="sql-feedback" id="sqlFeedback"></div>
                <div class="sql-result-wrap" id="sqlResult"></div>
            </div>
            <aside class="sql-schema">
                <h4>Schéma de la base</h4>
                ${schema}
            </aside>
        </div>
    `;
    document.getElementById('progressBar').style.width = ((state.index + 1) / sc.exercises.length) * 100 + '%';
    const chipsEl = el().querySelector('.labo-chips');
    if (chipsEl.scrollWidth > chipsEl.clientWidth) chipsEl.classList.add('scrollable');
    setupEditor();

    // Dernier verdict de cet exercice (session) : restaure bandeau + table,
    // comme le Code Lab restaure la reponse validee.
    const cached = state.feedbackCache.get(ex.id);
    if (cached) {
        document.getElementById('sqlFeedback').innerHTML = cached.fb;
        document.getElementById('sqlResult').innerHTML = cached.res;
    }
}

// Auto-majuscules : des qu'un separateur est tape apres un mot-cle SQL en
// minuscules (hors chaine '...'), le mot passe en majuscules.
function autoUppercase(ta) {
    const pos = ta.selectionStart;
    const val = ta.value;
    if (pos < 2 || pos !== ta.selectionEnd) return;
    if (!/[\s,;()=*<>!]/.test(val[pos - 1])) return;
    const before = val.slice(0, pos - 1);
    const m = before.match(/([A-Za-z_]+)$/);
    if (!m) return;
    const word = m[1];
    if (word === word.toUpperCase()) return;
    if (!isSqlKeyword(word.toUpperCase())) return;
    if (((before.match(/'/g) || []).length) % 2 === 1) return; // dans une chaine
    const start = pos - 1 - word.length;
    ta.value = val.slice(0, start) + word.toUpperCase() + val.slice(pos - 1);
    ta.setSelectionRange(pos, pos);
}

// Coloration live : textarea au texte transparent superpose a un <pre> colorise,
// synchronises au pixel (memes fonte/padding/line-height). Actif partout, avec
// filet de securite : toute panne du calque rebascule en texte simple visible.
function setupEditor() {
    const ta = document.getElementById('sqlEditor');
    const code = document.getElementById('sqlHighlight');
    const pre = code.parentElement;
    const wrap = ta.closest('.sql-editor-wrap');
    wrap.classList.add('overlay-on');
    const overlayOn = () => wrap.classList.contains('overlay-on');

    // Brouillon de la session en priorite, sinon la derniere requete validee
    // (durable, survit au rechargement)
    const exId = state.scenario.exercises[state.index].id;
    ta.value = getDraft(draftKey()) || getEntry('sql', exId)?.a || '';

    const sync = () => {
        // L'auto-majuscule ne doit JAMAIS pouvoir interrompre la mise a jour du
        // calque colorise : en mode overlay le texte du textarea est transparent,
        // un calque fige rendrait la frappe invisible.
        try { autoUppercase(ta); } catch (e) { /* on continue sans majuscules */ }
        setDraft(draftKey(), ta.value);
        if (overlayOn()) {
            try {
                // \n final : garde la derniere ligne vide visible dans le pre
                code.innerHTML = highlightCode(ta.value, 'sql') + '\n';
                pre.scrollTop = ta.scrollTop;
                pre.scrollLeft = ta.scrollLeft;
            } catch (e) {
                // Panne de coloration : retour au mode simple, texte visible
                wrap.classList.remove('overlay-on');
                pre.style.display = 'none';
            }
        }
    };
    ta.addEventListener('input', sync);
    ta.addEventListener('scroll', () => {
        pre.scrollTop = ta.scrollTop;
        pre.scrollLeft = ta.scrollLeft;
    });
    ta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            e.shiftKey ? validateAction() : run();
        }
    });
    sync();
}

function renderResultTable(set, container) {
    if (!set) {
        container.innerHTML = '<p class="sql-empty">La requête n\'a retourné aucune ligne.</p>';
        return;
    }
    const rows = set.values.slice(0, MAX_ROWS);
    container.innerHTML = `
        <table class="sql-result">
            <thead><tr>${set.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
            <tbody>
                ${rows.map(r => `<tr>${r.map(v => `<td>${v === null ? '<em>NULL</em>' : escapeHtml(v)}</td>`).join('')}</tr>`).join('')}
            </tbody>
        </table>
        ${set.values.length > MAX_ROWS ? `<p class="sql-truncated">… et ${set.values.length - MAX_ROWS} lignes supplémentaires (affichage tronqué)</p>` : ''}
    `;
}

function run() {
    const sql = document.getElementById('sqlEditor').value.trim();
    const feedback = document.getElementById('sqlFeedback');
    const result = document.getElementById('sqlResult');
    if (!sql) { feedback.innerHTML = '<div class="sql-banner sql-banner-info">Écrivez une requête avant d\'exécuter.</div>'; return; }

    const res = execUser(state.db, sql);
    if (res.error) {
        feedback.innerHTML = '';
        result.innerHTML = `<div class="sql-error">${escapeHtml(res.error)}</div>`;
        return;
    }
    feedback.innerHTML = '';
    const last = res.sets.length ? res.sets[res.sets.length - 1] : null;
    renderResultTable(last, result);
}

function validateAction() {
    const sql = document.getElementById('sqlEditor').value.trim();
    const feedback = document.getElementById('sqlFeedback');
    const result = document.getElementById('sqlResult');
    if (!sql) { feedback.innerHTML = '<div class="sql-banner sql-banner-info">Écrivez une requête avant de valider.</div>'; return; }

    const ex = state.scenario.exercises[state.index];
    const verdict = validate(ex, sql, state.scenario, state.SQL);
    const prevStatus = getStatus('sql', ex.id);

    if (verdict.correct) {
        record('sql', ex.id, 'ok', sql);
        feedback.innerHTML = `<div class="sql-banner sql-banner-ok">${pick(GLADOS_OK)}</div>`
            + (verdict.warning ? `<div class="sql-banner sql-banner-warn">${escapeHtml(verdict.warning)}</div>` : '');
        if (prevStatus !== 'ok') {
            const done = getDomainStats('sql', scenarioPrefix()).ok === state.scenario.exercises.length;
            done ? playComplete() : playSuccess();
        }
    } else {
        record('sql', ex.id, 'ko', sql);
        feedback.innerHTML = `
            <div class="sql-banner sql-banner-ko">${escapeHtml(failureMessage(verdict))}</div>
            <p class="sql-glados">${pick(GLADOS_KO)}</p>
        `;
        verdict.sqlError ? playSqlError() : playFail();
    }
    if (verdict.userSet) renderResultTable(verdict.userSet, result);
    if (verdict.mode === 'state') resetDb(); // le bac a sable repart propre apres un UPDATE/DELETE
    const attemptsEl = document.getElementById('laboAttempts');
    attemptsEl.textContent = `Tentatives : ${getEntry('sql', ex.id)?.n || 1}`;
    attemptsEl.style.visibility = 'visible';
    state.feedbackCache.set(ex.id, { fb: feedback.innerHTML, res: result.innerHTML });
    refreshChips();
}

// Montre la table attendue sans reveler la requete : le juste milieu entre
// l'indice et la solution.
function showExpected() {
    const ex = state.scenario.exercises[state.index];
    const feedback = document.getElementById('sqlFeedback');
    const result = document.getElementById('sqlResult');
    if (/^\s*(UPDATE|DELETE|INSERT)/i.test(ex.solution)) {
        feedback.innerHTML = '<div class="sql-banner sql-banner-info">Cet exercice modifie la base : c\'est l\'état final des tables qui est comparé, pas un résultat affichable.</div>';
        return;
    }
    const db = createDb(state.SQL, state.scenario.schema.seed_sql);
    try {
        const res = db.exec(ex.solution);
        feedback.innerHTML = '<div class="sql-banner sql-banner-info">Résultat attendu (à vous de trouver la requête) :</div>';
        renderResultTable(res.length ? res[res.length - 1] : null, result);
    } finally {
        db.close();
    }
}

function showSolution() {
    const ex = state.scenario.exercises[state.index];
    if (!window.confirm('Afficher la solution ? L\'exercice sera marqué "solution consultée".')) return;
    if (getStatus('sql', ex.id) !== 'ok') record('sql', ex.id, 'sol');
    document.getElementById('sqlFeedback').innerHTML = `
        <div class="sql-banner sql-banner-info">Solution :</div>
        <pre class="code-block sql-solution">${highlightCode(ex.solution, 'sql')}</pre>
    `;
    refreshChips();
}

function refreshChips() {
    const sc = state.scenario;
    el().querySelectorAll('[data-goto]').forEach((chip, i) => {
        chip.className = chipClass(getStatus('sql', sc.exercises[i].id), i === state.index);
    });
}

function wire() {
    if (wired) return;
    wired = true;
    el().addEventListener('click', (e) => {
        const scCard = e.target.closest('[data-scenario]');
        if (scCard) { openScenario(Number(scCard.dataset.scenario)); return; }
        const chip = e.target.closest('[data-goto]');
        if (chip) {
            state.index = Number(chip.dataset.goto);
            resetDb();
            renderPlayer();
            return;
        }
        const btn = e.target.closest('[data-action]');
        if (!btn || btn.disabled) return;
        switch (btn.dataset.action) {
            case 'back-hub': showScreen('labo-hub'); break;
            case 'back-scenarios': renderScenarioList(); break;
            case 'retry-load': if (lastEntry) openSqlLab(lastEntry); break;
            case 'run': run(); break;
            case 'validate': validateAction(); break;
            case 'expected': showExpected(); break;
            case 'solution': showSolution(); break;
            case 'finish': renderRecap(); break;
            case 'review': state.index = 0; resetDb(); renderPlayer(); break;
            case 'mute': toggleMuted(); btn.textContent = muteButtonLabel(); break;
            case 'next':
                if (state.index < state.scenario.exercises.length - 1) {
                    state.index++;
                    resetDb();
                    renderPlayer();
                }
                break;
        }
    });
}
