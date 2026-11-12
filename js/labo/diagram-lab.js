// Labo « Lire un diagramme » : deux exercices sur la meme banque.
//   01 C'est quel diagramme ? : 10 diagrammes tires parmi 30 (un par type), 4 propositions.
//   02 Les 7 differences : deux versions d'un diagramme, trouver et justifier les 7 ecarts.
// Progression (progress.js, donc synchro cloud comprise) :
//   'q-<cle>' : ok des que le diagramme a ete reconnu une fois ; 'f-<key>' : ok si fiche faite a 7/7.
import { registerScreen, showScreen } from '../screens.js';
import { getStatus, record, getDomainStats } from './progress.js';
import { playSuccess, playFail, playComplete, toggleMuted, muteButtonLabel } from './sounds.js';
import { esc, svgWrap } from './diagram-draw.js';

const root = () => document.getElementById('laboDiagram');
const $ = id => document.getElementById(id);
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fr = n => String(n).replace('.', ',');
const ANS_LABEL = { A: 'Version A', B: 'Version B', both: 'Les deux se valent' };

let entry = null, bank = null, wired = false, tab = 'q';
let quiz = null;  // { order, i, score, misses }
let diff = null;  // { sheet, state, points, miss, active, why }
let sheetOrder = [], sheetPos = -1;

registerScreen('labo-diagram', {
    show() { root().style.display = 'block'; },
    hide() { root().style.display = 'none'; }
});

export async function openDiagramLab(e) {
    entry = e;
    bank = (await e.load()).default;
    root().innerHTML = shell();
    wire();
    showScreen('labo-diagram');
    document.getElementById('progressBar').style.width = '0%';
    selectTab(tab);
    startQuiz();
    sheetPos = -1; sheetOrder = [];
    nextSheet();
    root().scrollIntoView({ block: 'start' });
}

function shell() {
    return `
        <div class="labo-topbar">
            <button data-action="back">← Labo</button>
            <span class="labo-title">${esc(entry.title)}</span>
            <button class="labo-mute" data-action="mute">${muteButtonLabel()}</button>
            <span class="labo-counter" id="dgCal" title="Éléments calibrés"></span>
        </div>
        <div class="dg-tabs" role="tablist" aria-label="Exercices">
            <button class="dg-tab" role="tab" data-tab="q" id="dgTabQ" aria-controls="dgQ">
                <span class="dg-tabnum">01</span><span><span class="dg-t1">C'est quel diagramme ?</span><span class="dg-t2">10 diagrammes tirés parmi 30, 4 propositions chacun</span></span>
            </button>
            <button class="dg-tab" role="tab" data-tab="d" id="dgTabD" aria-controls="dgD">
                <span class="dg-tabnum">02</span><span><span class="dg-t1">Les 7 différences</span><span class="dg-t2">4 fiches : classes, séquence, cas d'utilisation, déploiement</span></span>
            </button>
        </div>

        <section id="dgQ" role="tabpanel" aria-labelledby="dgTabQ" class="dg-stack">
            <div id="dgQRun" class="dg-stack">
                <div class="dg-qhead">
                    <div class="dg-qnum" id="dgQNum"></div>
                    <div class="dg-muted" id="dgQScore"></div>
                </div>
                <div class="dg-track"><i id="dgQBar"></i></div>
                <div class="dg-panel dg-box" id="dgQDiagram"></div>
                <p class="dg-label">C'est quel diagramme ?</p>
                <div class="dg-opts" id="dgQOpts"></div>
                <div class="dg-panel dg-feedback" id="dgQFeedback" hidden></div>
            </div>
            <div class="dg-panel dg-stack" id="dgQEnd" hidden></div>
        </section>

        <section id="dgD" role="tabpanel" aria-labelledby="dgTabD" class="dg-stack" hidden>
            <div class="dg-panel">
                <p class="dg-label" id="dgDKind"></p>
                <h2 class="dg-h2" id="dgDTitle"></h2>
                <p class="dg-muted">Deux stagiaires ont modélisé les mêmes règles. Leurs diagrammes diffèrent à 7 endroits. Cliquez sur une différence, dans l'une ou l'autre version, puis indiquez quelle version respecte les règles et pourquoi. À certains endroits, les deux versions se valent.</p>
                <ol class="dg-rules" id="dgDRules"></ol>
            </div>
            <div class="dg-stats">
                <div class="dg-stat"><b id="dgDFound">0</b><span>/ 7 trouvées</span></div>
                <div class="dg-stat"><b id="dgDPoints">0</b><span>points</span></div>
                <div class="dg-stat"><b id="dgDMiss">0</b><span>clics à vide</span></div>
            </div>
            <div class="dg-versions">
                <div class="dg-version"><div class="dg-vname">A</div><div class="dg-box" id="dgDA" data-version="A"></div></div>
                <div class="dg-version"><div class="dg-vname">B</div><div class="dg-box" id="dgDB" data-version="B"></div></div>
            </div>
            <div class="dg-toast" id="dgDToast" aria-live="polite"></div>
            <div class="dg-panel dg-stack" id="dgDQuestion" hidden></div>
            <div class="dg-panel dg-stack" id="dgDEnd" hidden></div>
        </section>

        <p class="dg-note">Sujets et diagrammes inventés pour l'exercice : rien n'est repris d'un support de cours.</p>
    `;
}

/* ---------- Progression ---------- */
function updateCal() {
    $('dgCal').textContent = `${getDomainStats(entry.domain).ok}/${entry.count}`;
}

// Enregistre un resultat. Sons : premiere reussite (ou completion du domaine), echec une fois sur trois.
function recordResult(id, ok) {
    const prev = getStatus(entry.domain, id);
    record(entry.domain, id, ok ? 'ok' : 'ko');
    if (ok && prev !== 'ok') {
        getDomainStats(entry.domain).ok >= entry.count ? playComplete() : playSuccess();
    } else if (!ok) {
        playFail();
    }
    updateCal();
}

/* ---------- Onglets ---------- */
function selectTab(which) {
    tab = which;
    const q = which === 'q';
    $('dgTabQ').setAttribute('aria-selected', String(q));
    $('dgTabD').setAttribute('aria-selected', String(!q));
    $('dgQ').hidden = !q;
    $('dgD').hidden = q;
    updateCal();
}

/* ---------- Exercice 1 : c'est quel diagramme ? ---------- */
// Une partie = un diagramme tire au hasard pour chacun des 10 types.
function drawQuiz() {
    const byType = {};
    bank.QUESTIONS.forEach(q => { (byType[q.ok] = byType[q.ok] || []).push(q); });
    return shuffle(Object.keys(byType).map(k => byType[k][Math.floor(Math.random() * byType[k].length)]));
}

function scoreText(n) { return n + (n > 1 ? ' bonnes réponses' : ' bonne réponse'); }

function startQuiz() {
    quiz = { order: drawQuiz(), i: 0, score: 0, misses: [] };
    $('dgQEnd').hidden = true;
    $('dgQRun').hidden = false;
    renderQ();
}

function renderQ() {
    const q = quiz.order[quiz.i], dg = bank.DIAG[q.d]();
    $('dgQNum').innerHTML = String(quiz.i + 1).padStart(2, '0') + '<small>/ ' + quiz.order.length + '</small>';
    $('dgQScore').textContent = scoreText(quiz.score);
    $('dgQBar').style.width = (quiz.i / quiz.order.length * 100) + '%';
    $('dgQDiagram').innerHTML = svgWrap(dg.vb, dg.svg, 'Diagramme à identifier');
    const keys = shuffle([q.ok, ...q.ds]);
    $('dgQOpts').innerHTML = keys.map(k => `<button class="dg-opt" data-k="${k}"><span>${esc(bank.NAMES[k])}</span><span class="dg-tag"></span></button>`).join('');
    $('dgQFeedback').hidden = true;
}

function answerQ(btn) {
    const q = quiz.order[quiz.i], good = btn.dataset.k === q.ok;
    if (good) quiz.score++; else quiz.misses.push(q);
    $('dgQOpts').querySelectorAll('.dg-opt').forEach(o => {
        o.disabled = true;
        if (o.dataset.k === q.ok) { o.classList.add('good'); o.querySelector('.dg-tag').textContent = 'Juste'; }
        else if (o === btn) { o.classList.add('bad'); o.querySelector('.dg-tag').textContent = 'Faux'; }
        else o.classList.add('dim');
    });
    recordResult('q-' + q.d, good);
    const last = quiz.i === quiz.order.length - 1;
    $('dgQFeedback').innerHTML = `<div class="dg-verdict ${good ? 'good' : 'bad'}">${good ? 'Juste.' : 'Non. La bonne réponse : ' + esc(bank.NAMES[q.ok]) + '.'}</div>
        <div class="dg-hint"><b>Ce qui le trahit</b>${esc(q.hint)}</div>
        <button class="btn-primary dg-btn" data-action="q-next">${last ? 'Voir le résultat' : 'Question suivante'}</button>`;
    $('dgQFeedback').hidden = false;
    $('dgQScore').textContent = scoreText(quiz.score);
    $('dgQFeedback').querySelector('[data-action="q-next"]').focus({ preventScroll: true });
    $('dgQFeedback').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function nextQ() {
    if (quiz.i < quiz.order.length - 1) {
        quiz.i++;
        renderQ();
        $('dgQNum').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
        endQuiz();
    }
}

function endQuiz() {
    $('dgQBar').style.width = '100%';
    $('dgQRun').hidden = true;
    const list = quiz.misses.length
        ? '<p class="dg-muted">À revoir : ' + quiz.misses.map(q => esc(bank.NAMES[q.ok])).join(' · ') + '.</p>'
        : '<p class="dg-muted">Aucune erreur. Les 10 types sont reconnus.</p>';
    $('dgQEnd').innerHTML = `<p class="dg-label">Résultat</p><div class="dg-big">${quiz.score}<small> / ${quiz.order.length}</small></div>${list}
        <button class="btn-primary dg-btn" data-action="q-again">Nouvelle série</button>`;
    $('dgQEnd').hidden = false;
}

/* ---------- Exercice 2 : les 7 differences ---------- */
// Les fiches defilent dans un ordre melange : on les voit toutes avant de retomber sur la meme.
function nextSheet() {
    sheetPos++;
    if (sheetPos >= sheetOrder.length) {
        const last = sheetOrder[sheetOrder.length - 1];
        sheetOrder = shuffle(bank.SHEETS.slice());
        if (sheetOrder.length > 1 && sheetOrder[0] === last) sheetOrder.push(sheetOrder.shift());
        sheetPos = 0;
    }
    startSheet(sheetOrder[sheetPos]);
}

function diffSvg(sheet, v) {
    let s = sheet.draw(v === 'A');
    s += sheet.diffs.map(d => `<rect class="hs" data-d="${d.id}" x="${d.zone[0]}" y="${d.zone[1]}" width="${d.zone[2]}" height="${d.zone[3]}"/>`).join('');
    s += '<g class="rings"></g>';
    return svgWrap(sheet.vb, s, sheet.kind + ', version ' + v, 'diffsvg');
}

function startSheet(sheet) {
    diff = { sheet, state: {}, points: 0, miss: 0, active: null, why: {} };
    sheet.diffs.forEach(d => { diff.why[d.id] = shuffle([{ t: d.ok, good: true }, ...d.bad.map(t => ({ t, good: false }))]); });
    $('dgDKind').textContent = sheet.kind;
    $('dgDTitle').textContent = sheet.title;
    $('dgDRules').innerHTML = sheet.rules.map(r => '<li>' + esc(r) + '</li>').join('');
    $('dgDA').innerHTML = diffSvg(sheet, 'A');
    $('dgDB').innerHTML = diffSvg(sheet, 'B');
    $('dgDQuestion').hidden = true;
    $('dgDEnd').hidden = true;
    toast("Cliquez sur un endroit où les deux versions ne disent pas la même chose.");
    updateStats();
}

function toast(t) { $('dgDToast').textContent = t; }
function found() { return Object.keys(diff.state).length; }
function updateStats() {
    $('dgDFound').textContent = found();
    $('dgDPoints').textContent = fr(diff.points);
    $('dgDMiss').textContent = diff.miss;
}

function drawRings() {
    ['dgDA', 'dgDB'].forEach(id => {
        $(id).querySelector('.rings').innerHTML = diff.sheet.diffs.filter(d => diff.state[d.id]).map(d => {
            const [x, y, w, h] = d.zone, st = diff.state[d.id];
            const c = st.done ? (st.pts === 1 ? 'good' : 'part') : 'on';
            return `<ellipse class="ring ${c}" cx="${x + w / 2}" cy="${y + h / 2}" rx="${w / 2 + 8}" ry="${h / 2 + 8}"/>`;
        }).join('');
    });
}

function onDiagramClick(target) {
    if (diff.active != null) {
        toast("Terminez d'abord la différence en cours, sous les diagrammes.");
        $('dgDQuestion').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
    }
    if (found() === diff.sheet.diffs.length) return;
    const hs = target.closest('.hs');
    if (!hs) { diff.miss++; updateStats(); toast('Rien de différent à cet endroit.'); return; }
    const id = +hs.dataset.d;
    if (diff.state[id]) { toast('Déjà trouvée. Cherchez ailleurs.'); return; }
    diff.state[id] = { done: false };
    diff.active = id;
    drawRings(); updateStats();
    toast('Trouvée. Répondez aux deux questions ci-dessous.');
    renderDiffQuestion(id);
}

function renderDiffQuestion(id) {
    const opts = diff.why[id];
    $('dgDQuestion').innerHTML = `
        <p class="dg-label">Différence ${found()} sur 7</p>
        <div class="dg-qblock"><h3>1 · Quelle version respecte les règles ?</h3>
            <div class="dg-picks" id="dgDV">${['A', 'B', 'both'].map(k => `<button class="dg-pick" data-v="${k}" aria-pressed="false">${ANS_LABEL[k]}</button>`).join('')}</div></div>
        <div class="dg-qblock"><h3>2 · Pourquoi ?</h3>
            <div class="dg-whys" id="dgDW">${opts.map((o, i) => `<button class="dg-pick" data-w="${i}" aria-pressed="false">${esc(o.t)}</button>`).join('')}</div></div>
        <div id="dgDRes" hidden></div>
        <button class="btn-primary dg-btn" id="dgDValidate" data-action="d-validate" disabled>Valider</button>`;
    $('dgDQuestion').hidden = false;
    $('dgDQuestion').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function pick(btn) {
    const group = btn.dataset.v !== undefined ? $('dgDV') : $('dgDW');
    group.querySelectorAll('.dg-pick').forEach(p => p.setAttribute('aria-pressed', p === btn ? 'true' : 'false'));
    const hasV = $('dgDV').querySelector('[aria-pressed="true"]'), hasW = $('dgDW').querySelector('[aria-pressed="true"]');
    $('dgDValidate').disabled = !(hasV && hasW);
}

function validateDiff() {
    const id = diff.active, d = diff.sheet.diffs.find(x => x.id === id), opts = diff.why[id];
    const vBtn = $('dgDV').querySelector('[aria-pressed="true"]'), wBtn = $('dgDW').querySelector('[aria-pressed="true"]');
    const vGood = vBtn.dataset.v === d.ans, wGood = opts[+wBtn.dataset.w].good;
    const pts = (vGood ? 0.5 : 0) + (wGood ? 0.5 : 0);
    diff.state[id] = { done: true, pts };
    diff.points += pts;
    $('dgDV').querySelectorAll('.dg-pick').forEach(p => { p.disabled = true; p.setAttribute('aria-pressed', 'false'); if (p.dataset.v === d.ans) p.classList.add('good'); else if (p === vBtn) p.classList.add('bad'); });
    $('dgDW').querySelectorAll('.dg-pick').forEach(p => { p.disabled = true; p.setAttribute('aria-pressed', 'false'); if (opts[+p.dataset.w].good) p.classList.add('good'); else if (p === wBtn) p.classList.add('bad'); });
    const msg = pts === 1 ? 'Juste sur les deux questions : 1 point.'
        : pts === 0.5 ? (vGood ? 'Bonne version, mais pas la bonne raison : 0,5 point.' : 'Bonne raison, mais pas la bonne version : 0,5 point.')
        : 'Ni la version ni la raison : 0 point.';
    $('dgDRes').innerHTML = `<div class="dg-verdict ${pts === 1 ? 'good' : 'bad'}">${msg}</div>`;
    $('dgDRes').hidden = false;
    const all = found() === diff.sheet.diffs.length;
    $('dgDValidate').outerHTML = `<button class="btn-primary dg-btn" id="dgDContinue" data-action="d-continue">${all ? 'Voir le résultat' : 'Chercher la suivante'}</button>`;
    drawRings(); updateStats();
    $('dgDContinue').focus({ preventScroll: true });
}

function closeDiff() {
    diff.active = null;
    $('dgDQuestion').hidden = true;
    const total = diff.sheet.diffs.length;
    if (found() < total) {
        toast('Cherchez la suivante.');
        $('dgDFound').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
    }
    const perfect = diff.sheet.diffs.filter(d => diff.state[d.id].pts === 1).length;
    recordResult('f-' + diff.sheet.key, diff.points === total);
    $('dgDEnd').innerHTML = `<p class="dg-label">Résultat</p><div class="dg-big">${fr(diff.points)}<small> / ${total}</small></div>
        <p class="dg-muted">${perfect} différence${perfect > 1 ? 's' : ''} entièrement justifiée${perfect > 1 ? 's' : ''}, ${diff.miss} clic${diff.miss > 1 ? 's' : ''} à vide. Les anneaux verts sont justes, les rouges sont à revoir.${diff.points === total ? ' Fiche calibrée.' : ' Une fiche est calibrée à 7 / 7.'}</p>
        <div class="dg-row"><button class="btn-primary dg-btn" data-action="d-next">Fiche suivante</button><button class="dg-btn" data-action="d-again">Refaire cette fiche</button></div>`;
    $('dgDEnd').hidden = false;
    toast('Les 7 différences sont trouvées.');
    $('dgDEnd').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* ---------- Cablage unique (delegation) ---------- */
function wire() {
    if (wired) return;
    wired = true;
    root().addEventListener('click', (e) => {
        const tabBtn = e.target.closest('[data-tab]');
        if (tabBtn) { selectTab(tabBtn.dataset.tab); return; }

        const box = e.target.closest('[data-version]');
        if (box) { onDiagramClick(e.target); return; }

        const btn = e.target.closest('button');
        if (!btn || btn.disabled) return;
        if (btn.classList.contains('dg-opt')) { answerQ(btn); return; }
        if (btn.classList.contains('dg-pick')) { pick(btn); return; }
        switch (btn.dataset.action) {
            case 'back': showScreen('labo-hub'); break;
            case 'mute': toggleMuted(); btn.textContent = muteButtonLabel(); break;
            case 'q-next': nextQ(); break;
            case 'q-again': startQuiz(); break;
            case 'd-validate': validateDiff(); break;
            case 'd-continue': closeDiff(); break;
            case 'd-again': startSheet(diff.sheet); break;
            case 'd-next': nextSheet(); $('dgDKind').scrollIntoView({ block: 'start', behavior: 'smooth' }); break;
        }
    });
}
