// SQL Lab : scenarios, schema, editeur, execution reelle (sql.js) et validation.
import { registerScreen, showScreen } from '../screens.js';
import { escapeHtml } from '../utils.js';
import { loadSqlJs, createDb, execUser } from './sql-engine.js';
import { validate, failureMessage } from './sql-compare.js';
import { getStatus, record } from './progress.js';
import { highlightCode } from './highlight.js';
import './selftest.js';

const MAX_ROWS = 200;
const DIFFICULTY_LABELS = { beginner: 'débutant', intermediate: 'intermédiaire', advanced: 'avancé' };

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
        state = { entry, bank: mod.default, SQL, scenario: null, index: 0, db: null };
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
                <p class="labo-progress-label">${stats.ok}/${stats.total} réussis</p>
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
            <span class="labo-counter">${state.index + 1}/${sc.exercises.length}</span>
        </div>
        <div class="labo-chips">${chips}</div>
        <div class="sql-player">
            <div class="sql-main">
                <p class="sql-concepts">${(ex.concepts || []).map(c => escapeHtml(c)).join(' · ')}</p>
                <div class="question-text">${escapeHtml(ex.question)}</div>
                <details class="labo-hint">
                    <summary>Indice</summary>
                    <p>${escapeHtml(ex.hint || '')}</p>
                </details>
                <textarea class="sql-editor" id="sqlEditor" rows="5" placeholder="Écrivez votre requête SQL ici…"
                    autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off"></textarea>
                <div class="sql-actions">
                    <button data-action="run">Exécuter</button>
                    <button class="btn-primary" data-action="validate">Valider</button>
                    <button data-action="solution">Solution</button>
                    <button data-action="next" ${state.index === sc.exercises.length - 1 ? 'disabled' : ''}>Suivant</button>
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

    if (verdict.correct) {
        record('sql', ex.id, 'ok');
        feedback.innerHTML = '<div class="sql-banner sql-banner-ok">Résultat identique. Calibration réussie.</div>';
    } else {
        record('sql', ex.id, 'ko');
        feedback.innerHTML = `<div class="sql-banner sql-banner-ko">${escapeHtml(failureMessage(verdict))}</div>`;
    }
    if (verdict.userSet) renderResultTable(verdict.userSet, result);
    if (verdict.mode === 'state') resetDb(); // le bac a sable repart propre apres un UPDATE/DELETE
    refreshChips();
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
            case 'solution': showSolution(); break;
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
