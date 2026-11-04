// Sensei : apprendre a parler du code comme un dev senior (onglet 03 Vocabulaire).
// Parcours de lecons, revision espacee, lexique, test de positionnement et
// exercices de vocabulaire generes a partir des mots (paires, mot a ecrire...).
// Charge en lazy au premier clic sur l'onglet, comme le labo.
/* ============ OUTILS ============ */
import { CHAPTERS, PLACEMENT } from '../../data/sensei/index.js';
import { registerScreen, showScreen, getCurrentScreen } from '../screens.js';
import { setTabsVisible, setActiveTab } from '../ui/tabs.js';

const app = document.getElementById('senseiRoot');
const $ = s => app.querySelector(s);
const LANGS = ["js","py","rs"];
const LANG_NAME = {js:"JavaScript", py:"Python", rs:"Rust"};
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const md = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const fold = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
function fmt(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
const today = () => fmt(new Date());
function addDays(s,n){const [y,m,d]=s.split("-").map(Number);return fmt(new Date(y,m-1,d+n))}
const frDate = s => { const [y,m,d]=s.split("-"); return d+"/"+m+"/"+y; };
function norm(s){
  let t = fold(s).trim().replace(/[«»“”'‘’]/g,"\"").replace(/\s+/g,"");
  if(["vrai","true","yes","o","y"].includes(t)) t="oui";
  if(["faux","false","no","n"].includes(t)) t="non";
  return t;
}
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
const rand = a => a[Math.floor(Math.random()*a.length)];

/* ============ SENSEI, LE MENTOR ============ */
let svgId=0;
function sensei(mood, size, extra){
  mood=mood||"calme"; size=size||64; const id="sc"+(++svgId);
  const happy = mood==="content"||mood==="fier";
  const eyes = happy
    ? `<path d="M47 58 q4 -5 8 0" stroke="#2B2F45" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M65 58 q4 -5 8 0" stroke="#2B2F45" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    : mood==="pensif"
    ? `<circle cx="52.5" cy="55.5" r="2.3" fill="#2B2F45"/><circle cx="70.5" cy="55.5" r="2.3" fill="#2B2F45"/>`
    : `<circle cx="51" cy="57" r="2.3" fill="#2B2F45"/><circle cx="69" cy="57" r="2.3" fill="#2B2F45"/>`;
  const brows = mood==="pensif"
    ? `<path d="M44 47 l10 -1"/><path d="M64 43 l10 3"/>`
    : happy ? `<path d="M44 46 q5 -4 10 0"/><path d="M64 46 q5 -4 10 0"/>` : `<path d="M44 47.5 h10"/><path d="M64 47.5 h10"/>`;
  const mouth = mood==="fier" ? `<path d="M52 70 q8 9 16 0 z" fill="#FFFFFF" stroke="#2B2F45" stroke-width="2" stroke-linejoin="round"/>`
    : mood==="content" ? `<path d="M53 71 q7 6 14 0" stroke="#2B2F45" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    : mood==="pensif" ? `<ellipse cx="63" cy="72" rx="2.6" ry="2.1" fill="#2B2F45"/>`
    : `<path d="M54 72 q6 2.5 12 0" stroke="#2B2F45" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  return `<svg class="sensei ${extra||""}" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="Sensei, ton mentor">
    <defs><clipPath id="${id}"><circle cx="60" cy="60" r="58"/></clipPath></defs>
    <circle cx="60" cy="60" r="58" fill="#EEF1F4"/>
    <g clip-path="url(#${id})">
      <path d="M75 38 C95 38 101 60 96 80 C94 89 86 91 85 84 C90 70 88 54 75 49 Z" fill="#A6AAB3"/>
      <path d="M86 60 C89 68 89 76 87 82" stroke="#8A8E98" stroke-width="1.6" fill="none"/>
      <rect x="77" y="38" width="8" height="10" rx="2.5" fill="#0098FF" transform="rotate(-18 81 43)"/>
      <path d="M20 124 C22 97 39 86 60 86 C81 86 98 97 100 124 Z" fill="#FF6700"/>
      <path d="M43 88 C48 99 72 99 77 88" stroke="#CC5200" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M54 95 v11 M66 95 v11" stroke="#FFE0CC" stroke-width="2.2" stroke-linecap="round"/>
      <rect x="52" y="76" width="16" height="12" rx="4" fill="#E8B892"/>
      <circle cx="39" cy="60" r="4.5" fill="#E8B892"/><circle cx="81" cy="60" r="4.5" fill="#E8B892"/>
      <ellipse cx="60" cy="58" rx="21" ry="24" fill="#F2C9A4"/>
      <path d="M38.5 58 C35 37 47 30 60 30 C74 30 86 38 81.5 58 C79 47 72 41 60 41 C49 41 42 47 38.5 58 Z" fill="#A6AAB3"/>
      <path d="M48 37 C53 34 60 33 66 34 M45 42 C50 38 57 37 64 38" stroke="#C9CCD2" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M39 62 C40 79 50 88 60 88 C70 88 80 79 81 62 C77 71 70 77 60 77 C50 77 43 71 39 62 Z" fill="#B7BAC1"/>
      <path d="M52 69 q8 -4.5 16 0 q-8 2.2 -16 0 z" fill="#B7BAC1"/>
      ${eyes}
      <g stroke="#2B2F45" stroke-width="2.6" fill="none" stroke-linecap="round">${brows}</g>
      <g stroke="#2B2F45" stroke-width="2.2" fill="#FFFFFF" fill-opacity=".28"><circle cx="51" cy="57" r="8"/><circle cx="69" cy="57" r="8"/></g>
      <path d="M59 56.5 h2 M43 56 l-4 -1.5 M77 56 l4 -1.5" stroke="#2B2F45" stroke-width="2.2" stroke-linecap="round"/>
      ${mouth}
      <g transform="translate(12 92)"><path d="M21 6 q7 0 7 6 q0 6 -7 6" stroke="#2B2F45" stroke-width="2.4" fill="none"/><rect x="0" y="0" width="22" height="24" rx="4" fill="#FFFFFF" stroke="#2B2F45" stroke-width="2.4"/><text x="11" y="16" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#FF6700">{ }</text></g>
    </g>
  </svg>`;
}
const say = (mood, html, size, bob) => `<div class="say-row">${sensei(mood, size||64, bob?"bob":"")}<div class="bubble">${html}</div></div>`;
const LINES = {
  good:["Bien vu.","Exactement le mot que j'aurais utilisé.","Propre.","Rien à redire.","C'est ça. Tu vois que tu sais.","Parfait, on continue."],
  bad:["Presque. Classique, même les seniors se font avoir.","Pas tout à fait. Regarde la nuance :","Pas grave, c'est comme ça qu'on apprend.","Bonne tentative. Voilà la différence :"],
  skip:["Bon réflexe de le dire. Voilà comment je le formule :","Aucun souci, je te montre :","Dire « je ne sais pas », c'est très senior. Regarde :"]
};
function line(kind){ const st=L.st; if(st.lineKind!==kind){ st.lineKind=kind; st.line=rand(LINES[kind]); } return st.line; }
const ICON = {
  check:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  lock:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
  flame:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5 5 5.8 5 11a5 5 0 0 1-10 0c0-2.4 1.1-4 2.4-5.3.2 1.6.9 2.8 2.1 3.3C11 8 11.2 5 12 2z"/></svg>`,
  close:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  star:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>`
};
const MUG = `<svg class="illu" viewBox="0 0 120 100" aria-hidden="true"><path d="M30 14 q6 -8 0 -14 M48 14 q6 -8 0 -14 M66 14 q6 -8 0 -14" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5" transform="translate(0 6)"/><rect x="18" y="26" width="64" height="62" rx="12" fill="var(--accent-soft)" stroke="currentColor" stroke-width="4"/><path d="M82 40 q20 0 20 18 q0 18 -20 18" stroke="currentColor" stroke-width="4" fill="none"/><text x="50" y="66" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="22" font-weight="700" fill="currentColor">{ }</text></svg>`;

/* Un champ peut être une valeur, ou {js, py, rs} selon le langage choisi */
const isVar = v => v && typeof v==="object" && !Array.isArray(v) && Object.keys(v).length>0 && Object.keys(v).every(k=>LANGS.includes(k));
function pickInfo(v){
  if(!isVar(v)) return {val:v, lang:null};
  const l=P.lang;
  if(v[l]!==undefined) return {val:v[l], lang:l};
  for(const k of ["js","py","rs"]) if(v[k]!==undefined) return {val:v[k], lang:k, fallback:true};
  return {val:undefined, lang:null};
}
const pick = v => pickInfo(v).val;

/* Coloration syntaxique selon le langage */
const KW = {
  js:"const let var function return for if else while true false null undefined new class extends this import export from try catch throw of typeof static async await in".split(" "),
  py:"def return for in if elif else while True False None class self import from try except raise lambda pass and or not with as".split(" "),
  rs:"let mut fn return for in if else while true false match impl struct enum pub use Some None Ok Err self Self const loop as ref".split(" ")
};
const RE = {};
LANGS.forEach(l=>{ RE[l]=new RegExp("(\\/\\/.*$|(?:^|(?<=\\s))#\\s.*$|--\\s.*$)|(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')|\\b(\\d+(?:\\.\\d+)?)\\b|\\b("+KW[l].join("|")+")\\b|(=>|===|!==|==|<=|>=|\\+\\+|\\+=|&&|\\|\\||[=+\\-*\\/<>%!?])","g"); });
function hlLine(line, lang){
  const re=RE[lang]||RE.js; let out="",last=0,m; re.lastIndex=0;
  while((m=re.exec(line))){ out+=esc(line.slice(last,m.index));
    const cls=m[1]?"t-com":m[2]?"t-str":m[3]?"t-num":m[4]?"t-kw":"t-op";
    out+=`<span class="${cls}">${esc(m[0])}</span>`; last=re.lastIndex; if(m[0]==="")re.lastIndex++; }
  return out+esc(line.slice(last));
}
function codeView(v, marksFn){
  const info=pickInfo(v); if(info.val==null) return "";
  const lang=info.lang||P.lang;
  const lines=String(info.val).split("\n").map((line,i)=>`<span class="ln">${(marksFn?marksFn(line,i+1,lang):hlLine(line,lang))||" "}</span>`).join("");
  const note = info.fallback ? `<span class="fallback">Exemple en ${LANG_NAME[info.lang]} (pas encore écrit en ${LANG_NAME[P.lang]}).</span>` : "";
  return `<div class="codewrap"><pre class="code" aria-label="Code">${lines}</pre>${note}</div>`;
}

/* ============ PROGRAMME ============ */
const LESSONS=[];
CHAPTERS.forEach((ch,ci)=>ch.lessons.forEach((l,k)=>LESSONS.push({...l, chIdx:ci, k, gi:LESSONS.length})));
const LESSON = Object.fromEntries(LESSONS.map(l=>[l.id,l]));
const TERMS=[];
LESSONS.forEach(l=>l.steps.forEach(s=>{ if(s.type==="concept") TERMS.push({id:slug(s.term),...s,lessonId:l.id}); }));
const TERM = Object.fromEntries(TERMS.map(t=>[t.id,t]));
const INTERVAL=[0,1,2,4,8,16,32];

/* ============ PROGRESSION ============ */
const LS_KEY="cdaquiz_sensei"; // fusionne par js/labo/merge.js lors de la synchro
const fresh = () => ({v:2, done:{}, cards:{}, streak:{n:0,last:null}, missions:{}, weak:[], placement:null, lang:"js", updatedAt:0});
function normalize(p){ const f=fresh(); p=p||{}; return {...f,...p, done:{...p.done}, cards:{...p.cards}, streak:{...f.streak,...p.streak}, missions:{...p.missions}, weak:Array.isArray(p.weak)?p.weak.slice():[], lang:LANGS.includes(p.lang)?p.lang:"js"}; }
function loadLocal(){ try{ const r=localStorage.getItem(LS_KEY); return r?normalize(JSON.parse(r)):null; }catch(e){ return null; } }
function saveLocal(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(P)); }catch(e){} }
let P = loadLocal() || fresh();
function save(){ P.updatedAt=Date.now(); saveLocal(); window.dispatchEvent(new CustomEvent('cdaquiz:changed')); }
function bumpStreak(){ const t=today(), s=P.streak; if(s.last===t) return; s.n=(s.last===addDays(t,-1))?s.n+1:1; s.last=t; }
const streakNow = () => (P.streak.last===today()||P.streak.last===addDays(today(),-1)) ? P.streak.n : 0;
const dueIds = () => Object.entries(P.cards).filter(([id,c])=>TERM[id] && c.due<=today()).map(([id])=>id);
const masteredCount = () => Object.values(P.cards).filter(c=>c.box>=3).length;
const isDone = id => !!P.done[id];
function unlocked(l){ return l.k===0 || isDone(CHAPTERS[l.chIdx].lessons[l.k-1].id); }
const weakKey = (lid,i) => lid+":"+i;
function addWeak(lid,i){ const k=weakKey(lid,i); if(!P.weak.includes(k)) P.weak.push(k); }
function removeWeak(lid,i){ P.weak=P.weak.filter(k=>k!==weakKey(lid,i)); }
const weakSteps = () => P.weak.map(k=>{ const [lid,i]=k.split(":"); const l=LESSON[lid]; return l&&l.steps[+i]?{lessonId:lid, idx:+i, step:l.steps[+i]}:null; }).filter(Boolean);

/* Parcours conseillé */
function chapterProgress(ci){ const ls=CHAPTERS[ci].lessons; return {done:ls.filter(l=>isDone(l.id)).length, total:ls.length}; }
const chIndex = id => CHAPTERS.findIndex(c=>c.id===id);
function firstUndone(chIds){ for(const id of chIds){ const ci=chIndex(id); if(ci<0) continue; const l=LESSONS.find(x=>x.chIdx===ci && !isDone(x.id) && unlocked(x)); if(l) return l; } return null; }
function recommended(){
  const lv=(P.placement&&P.placement.levels)||{};
  const order=CHAPTERS.map(c=>c.id).filter(id=>lv[id]!==2);
  return firstUndone(order) || firstUndone(CHAPTERS.map(c=>c.id));
}

/* ============ VUES ============ */
let view={name:"path"};
let L=null;
const cur = () => L && L.steps[L.i];

const langSwitch = () => `<span class="lang" role="group" aria-label="Langage des exemples">${LANGS.map(l=>`<button data-lang="${l}" aria-pressed="${P.lang===l}">${l==="js"?"JS":l==="py"?"Python":"Rust"}</button>`).join("")}</span>`;
function header(){
  const due=dueIds().length;
  return `<header class="top">
    <div class="brand"><span class="brand-dot" aria-hidden="true"></span>Sensei</div>
    <div class="chips">
      <span class="chip streak" title="Jours d'affilée">${ICON.flame}${streakNow()}</span>
      <span class="chip" title="Mots revus au moins 3 fois avec succès">${ICON.star}${masteredCount()}</span>
      ${langSwitch()}
    </div>
  </header>
  <nav class="tabs" aria-label="Sections">
    <button data-go="path" ${view.name==="path"?'aria-current="page"':""}>Parcours</button>
    <button data-go="review" ${view.name==="review"?'aria-current="page"':""}>Révision ${due?`<span class="badge">${due}</span>`:""}</button>
    <button data-go="lexicon" ${view.name==="lexicon"?'aria-current="page"':""}>Lexique</button>
  </nav>`;
}
const footerSync = () => "";

function greeting(rec){
  const started=Object.keys(P.done).length>0, n=streakNow(), due=dueIds().length;
  if(!started && !P.placement) return {mood:"content", html:`Salut, moi c'est <strong>Sensei</strong>. Je suis là pour t'apprendre à parler du code comme un senior.<span class="sub">On commence par un petit test pour voir où tu en es ? Ou on attaque directement.</span>`,
    actions:`<button class="btn" data-act="placement">Faire le test</button>${rec?`<button class="btn ghost" data-start="${rec.gi}">Commencer directement</button>`:""}`};
  let html = n>1 ? `${n} jours d'affilée. Respect.` : started ? "Content de te revoir." : "Salut.";
  if(rec) html += ` On reprend : <strong>${esc(rec.title)}</strong>.`; else html += " Tu as fini toutes les leçons. Chapeau.";
  if(due) html += `<span class="sub">Et tu as ${due} mot${due>1?"s":""} à réviser aujourd'hui.</span>`;
  return {mood:n>2?"fier":"calme", html, actions: rec?`<button class="btn" data-start="${rec.gi}">C'est parti</button>${due?`<button class="btn ghost" data-go="review">Réviser d'abord</button>`:""}`:(due?`<button class="btn" data-go="review">Réviser</button>`:"")};
}
const OFFSETS=[0,44,64,44,0,-44,-64,-44];
function renderPath(){
  const rec=recommended(), g=greeting(rec);
  const ws=weakSteps();
  const units = CHAPTERS.map((ch,ci)=>{
    const p=chapterProgress(ci), lv=P.placement&&P.placement.levels?P.placement.levels[ch.id]:undefined;
    const nodes = ch.lessons.map((l0,k)=>{ const l=LESSON[l0.id], gl=LESSONS[l.gi]||l; const lesson=LESSONS.find(x=>x.id===l0.id);
      const done=isDone(lesson.id), op=unlocked(lesson), next=rec&&rec.id===lesson.id, sel=view.sel===lesson.gi;
      const cls=done?"done":next?"next":op?"":"locked";
      const inner=done?ICON.check:op?String(k+1):ICON.lock;
      const nW=lesson.steps.filter(s=>s.type==="concept").length;
      const pop = sel ? `<div class="pop">
          <span class="eyebrow">Leçon ${k+1} · ${lesson.steps.length} étapes · ${nW} mots</span>
          <h3>${esc(lesson.title)}</h3><p class="small muted">${esc(lesson.sub)}</p>
          ${op?`<div class="actions"><button class="btn full" data-start="${lesson.gi}">${done?"Refaire la leçon":"Commencer"}</button></div>`:`<p class="small">Termine d'abord : <strong>${esc(ch.lessons[k-1].title)}</strong>.</p>`}
        </div>` : "";
      return `<li><div class="node-wrap${next?" has-here":""}" style="transform:translateX(${OFFSETS[k%OFFSETS.length]}px)">
          ${next?`<span class="here">Ici</span>`:""}
          <button class="node ${cls}" data-node="${lesson.gi}" aria-label="${esc(lesson.title)}${done?", terminée":op?"":", verrouillée"}" aria-expanded="${sel}">${inner}</button>
          <span class="node-label">${esc(lesson.title)}</span>
        </div>${pop}</li>`; }).join("");
    return `<section class="unit" aria-label="${esc(ch.title)}">
      <div class="banner p${ci%5+1}">
        <div class="spread"><span class="eyebrow">Chapitre ${ci+1}</span>${lv===2?`<span class="pill done">Acquis au test</span>`:lv===1?`<span class="pill">En partie au test</span>`:""}</div>
        <h2>${esc(ch.title)}</h2>
        <p class="small">${esc(ch.goal)}</p>
        <div class="row"><span class="meter" aria-hidden="true"><i style="width:${Math.round(p.done/p.total*100)}%"></i></span><span class="small"><strong>${p.done}/${p.total}</strong></span></div>
      </div>
      <ol class="path">${nodes}</ol>
    </section>`;
  }).join("");
  return `${header()}
  <section class="hero">${sensei(g.mood,96)}<div class="bubble">${g.html}${g.actions?`<div class="actions" style="margin-top:12px">${g.actions}</div>`:""}</div></section>
  ${vocabPool().length>=4?`<section class="panel"><div class="spread"><h2>Entraînement vocabulaire</h2><span class="pill">${vocabPool().length} mots</span></div><p class="small">10 exercices rapides sur les mots que tu as déjà appris : paires, mot qui manque, mot à écrire. Ceux à revoir passent en premier.</p><div class="actions"><button class="btn small" data-act="vocab">S'entraîner</button></div></section>`:""}
  ${ws.length?`<section class="panel soft"><div class="spread"><h2>Tes points faibles</h2><span class="pill warn">${ws.length}</span></div><p class="small">Les exercices où tu as hésité. Les refaire, c'est là qu'on progresse le plus.</p><div class="actions"><button class="btn small" data-act="weak">Les revoir</button></div></section>`:""}
  ${units}
  <section class="panel"><span class="eyebrow">Ta semaine idéale</span>
    <p class="small"><strong>Chaque jour, 15 min</strong> de Sensei. <strong>3 fois par semaine</strong>, 30 min de code sans tutoriel (Rustlings, Exercism).</p>
    ${P.placement?`<div class="actions"><button class="btn ghost small" data-act="placement">Refaire le test de positionnement</button></div>`:""}
  </section>
  ${footerSync()}`;
}

/* ---- Exercices de vocabulaire, fabriqués à partir des mots du programme ---- */
const mapVar = (v,f) => isVar(v) ? Object.fromEntries(Object.entries(v).map(([k,x])=>[k,f(x)])) : f(v);
const termParts = t => [...new Set([t.term, t.term.replace(/\s*\([^)]*\)/g,"").trim(), ...t.term.split(/\s*\/\s*|,\s*/)].filter(x=>x&&x.length>=3))].sort((a,b)=>b.length-a.length);
function maskOne(text, part){ let out=String(text), i, n=0; const fp=fold(part); while((i=fold(out).indexOf(fp))>=0 && n++<6) out=out.slice(0,i)+"…"+out.slice(i+part.length); return out; }
const maskAll = (text,t) => termParts(t).reduce((s,p)=>maskOne(s,p), text);
function shortDef(s){ s=String(s); const one=s.match(/^.*?[.!?](?=\s|$)/); let r=one?one[0]:s;
  if(r.length<35){ const two=s.match(/^.*?[.!?](?=\s|$).*?[.!?](?=\s|$)/); if(two) r=two[0]; } return r; }
const coreTerm = t => t.term.replace(/\s*\([^)]*\)/g,"").trim();
const uniqTerms = ts => { const seen=new Set(); return ts.filter(t=>{ const k=fold(t.term); if(seen.has(k)) return false; seen.add(k); return true; }); };
/* Deux mots sont « proches » quand l'un apparaît dans la définition de l'autre (while : « une boucle qui… »). */
const allText = v => isVar(v) ? Object.values(v).join(" ") : String(v||"");
function related(a, b){
  const da=fold(allText(a.def)+" "+(a.beginner||"")), db=fold(allText(b.def)+" "+(b.beginner||""));
  return termParts(b).some(p=>da.includes(fold(p))) || termParts(a).some(p=>db.includes(fold(p)));
}
/* « b est un cas particulier de a » : la définition de b contient le mot a */
const kindOf = (b, a) => termParts(a).some(p=>fold(allText(b.def)).includes(fold(p)));
/* Choisit n mots sans deux mots proches entre eux */
function apart(ts, n){ const out=[]; for(const t of ts){ if(out.length>=n) break; if(!out.some(o=>related(o,t)||fold(o.term)===fold(t.term))) out.push(t); } return out; }
let TERM_NORM=null;
function termTyped(v){
  if(!TERM_NORM){ TERM_NORM={}; TERMS.forEach(t=>[t.term, coreTerm(t)].forEach(x=>{ const k=norm(x); if(!TERM_NORM[k]) TERM_NORM[k]=t; })); }
  return TERM_NORM[norm(v)]||null;
}
function distractors(t, n){
  const ch=LESSON[t.lessonId].chIdx, avoid=fold(t.term);
  const ok=x=>x.id!==t.id && fold(x.term)!==avoid && !related(t,x);
  const same=shuffle(TERMS.filter(x=>ok(x)&&LESSON[x.lessonId].chIdx===ch)), other=shuffle(TERMS.filter(x=>ok(x)&&LESSON[x.lessonId].chIdx!==ch));
  return apart(same.concat(other), n);
}
const defLine = t => mapVar(t.def, x=>`**${t.term}** : ${x}`);
const VX = {
  /* Quel est le mot ? (définition → mot) */
  word(t){ const d=distractors(t,3); if(d.length<3) return null;
    return {type:"qcm", vocab:"word", terms:[t.id], q:mapVar(t.def, x=>"Quel est le mot pour ça ? « "+maskAll(x,t)+" »"),
      options:[t.term, ...d.map(x=>x.term)], correct:0, explain:defLine(t)}; },
  /* Le mot qui manque dans une phrase de senior */
  cloze(t){ const i=fold(t.phrase).indexOf(fold(t.term)); if(i<0) return null; const d=distractors(t,2); if(d.length<2) return null;
    const occ=t.phrase.slice(i,i+t.term.length), lower=occ[0]!==occ[0].toUpperCase();
    const look=x=> lower && x!==x.toUpperCase() ? x[0].toLowerCase()+x.slice(1) : x;
    return {type:"cloze", vocab:"cloze", terms:[t.id], sentence:t.phrase.slice(0,i)+"___"+t.phrase.slice(i+t.term.length),
      options:[occ, ...d.map(x=>look(x.term))], correct:0, explain:defLine(t)}; },
  /* Écris le mot, sans aide */
  type(t){ if(/[\/,]/.test(t.term) || t.term.length>28) return null; const core=coreTerm(t); if(core.length<3) return null;
    const words=core.split(/\s+/).length;
    return {type:"predict", vocab:"type", terms:[t.id], q:mapVar(t.def, x=>"Écris le mot qui correspond : « "+maskAll(x,t)+" »"),
      label:"Le mot :", answers:[t.term, core], hint:`Il commence par « ${core.slice(0,2)}… »${words>1?` (${words} mots)`:""}.`, explain:defLine(t)}; },
  /* Débutant → senior */
  senior(t){ if(!t.beginner) return null; const d=distractors(t,3); if(d.length<3) return null;
    return {type:"qcm", vocab:"senior", terms:[t.id], q:"Un débutant dirait : « "+maskAll(t.beginner,t)+" ». Quel mot un senior utiliserait ?",
      options:[t.term, ...d.map(x=>x.term)], correct:0, explain:`Le senior dit : « ${t.phrase} »`}; }
};
function oneFor(t, pref){
  const kinds = t.beginner ? ["senior","word","cloze","type"] : ["word","cloze","type"];
  const order = [pref, ...shuffle(kinds)].filter((k,i,a)=>k&&kinds.includes(k)&&a.indexOf(k)===i);
  for(const k of order){ const s=VX[k](t); if(s) return s; } return null;
}
const pairsStep = ts => ({type:"pairs", vocab:"pairs", terms:ts.map(t=>t.id)});
const KINDS = ["word","cloze","type","senior"];
/* Fin de leçon : des paires et 2 exercices sur les mots qu'on vient de voir */
function lessonVocab(l){
  const own=shuffle(TERMS.filter(t=>t.lessonId===l.id)); if(!own.length) return [];
  const before=TERMS.filter(t=>t.lessonId!==l.id && (P.cards[t.id] || (LESSON[t.lessonId].chIdx===l.chIdx && LESSON[t.lessonId].k<l.k)));
  const four=apart(own.concat(shuffle(before)), 4);
  const out=[]; if(four.length===4) out.push(pairsStep(four));
  const start=Math.floor(Math.random()*KINDS.length);
  own.slice(0, out.length?2:3).forEach((t,i)=>{ const s=oneFor(t, KINDS[(start+i)%KINDS.length]); if(s) out.push(s); });
  return out;
}
/* Entraînement : 10 exercices sur les mots appris, en priorité ceux à revoir */
const vocabPool = () => TERMS.filter(t=>P.cards[t.id]);
function startVocab(){
  const pool=uniqTerms(vocabPool()); if(pool.length<4) return;
  const t0=today(), score=t=>{ const c=P.cards[t.id]; return (c.due<=t0?0:10)+c.box; };
  const pri=shuffle(pool).sort((a,b)=>score(a)-score(b));
  const singles=pri.slice(0,8), p1=apart(singles.concat(shuffle(pool)), 4);
  const p2=apart(shuffle(pool.filter(t=>!p1.includes(t))), 4);
  const start=Math.floor(Math.random()*KINDS.length);
  const ex=singles.map((t,i)=>oneFor(t, KINDS[(start+i)%KINDS.length])).filter(Boolean);
  const steps=[pairsStep(p1), ...ex.slice(0,4)];
  if(p2.length===4) steps.push(pairsStep(p2));
  steps.push(...ex.slice(4));
  startRun({mode:"vocab", title:"Entraînement vocabulaire", steps:steps.map(s=>({step:s, idx:null}))});
}
function demote(ids){ ids.forEach(id=>{ const c=P.cards[id]; if(c){ c.box=1; c.due=addDays(today(),1); c.t=Date.now(); } }); }

/* ---- Moteur de leçon ---- */
function startRun(opts){ L={...opts, i:0, st:{}, mistakes:0, results:[]}; view={name:"lesson"}; render(); window.scrollTo(0,0); }
function startLesson(gi){ const l=LESSONS[gi]; startRun({mode:"lesson", title:l.title, lessonId:l.id, steps:l.steps.map((s,i)=>({step:s, lessonId:l.id, idx:i})).concat(lessonVocab(l).map(s=>({step:s, lessonId:l.id, idx:null})))}); }
function startWeak(){ const ws=shuffle(weakSteps()).slice(0,12); if(!ws.length) return; startRun({mode:"weak", title:"Points faibles", steps:ws}); }
function startPlacement(){ startRun({mode:"placement", title:"Test de positionnement", steps:PLACEMENT.map(p=>({step:p.step, ch:p.ch}))}); }
function erred(){ if(!L.st.erred){ L.st.erred=true; L.mistakes++; } }
function nextStep(){
  const c=cur(), ok=!L.st.erred, scored=!["concept","explain","senior"].includes(c.step.type);
  if(L.mode==="lesson" && scored && !ok && c.idx!=null) addWeak(c.lessonId,c.idx);
  if(L.mode==="weak" && scored && ok) removeWeak(c.lessonId,c.idx);
  if(c.step.vocab && !ok) L.missedTerms=(L.missedTerms||[]).concat(c.step.type==="pairs" ? (L.st.bad||[]) : c.step.terms);
  if(L.mode==="placement") L.results.push({ch:c.ch, ok});
  L.i++; L.st={};
  if(L.i>=L.steps.length) return finishRun();
  render(); window.scrollTo(0,0);
}
function finishRun(){
  const added=[];
  if(L.mode==="lesson"){
    LESSON[L.lessonId].steps.forEach(s=>{ if(s.type==="concept"){ const id=slug(s.term); if(!P.cards[id]){ P.cards[id]={box:1,due:addDays(today(),1),t:Date.now()}; added.push(s.term);} } });
    P.done[L.lessonId]=today();
  }
  let levels=null;
  if(L.mode==="placement"){
    levels={}; L.results.forEach(r=>{ levels[r.ch]=(levels[r.ch]||0)+(r.ok?1:0); });
    CHAPTERS.forEach(c=>{ if(levels[c.id]===undefined) levels[c.id]=0; });
    P.placement={date:today(), levels, score:L.results.filter(r=>r.ok).length, total:L.results.length};
  }
  const missed=[...new Set(L.missedTerms||[])]; demote(missed);
  bumpStreak(); save();
  view={name:"done", mode:L.mode, added, mistakes:L.mistakes, title:L.title, levels, total:L.steps.length, missed:missed.map(id=>TERM[id].term)};
  L=null; render(); window.scrollTo(0,0);
}

/* Chaque étape renvoie : bulle de Sensei, humeur, contenu, et barre du bas */
const btn = (act, label, cls, dis) => `<button class="btn ${cls||""}" data-act="${act}" ${dis?"disabled":""}>${label}</button>`;
const contBtn = kind => `<button class="btn full ${kind==="good"?"good":kind==="bad"?"bad":""}" data-act="next">Continuer</button>`;
function checkSheet(canCheck, checkAct, skipAct){ return {kind:"idle", actions:btn(checkAct,"Vérifier","full",!canCheck)+btn(skipAct,"Je ne sais pas","ghost")}; }
function resultSheet(ok, skip, text){ const kind=ok?"good":skip?"skip":"bad"; return {kind, title:line(kind), text, actions:contBtn(kind)}; }

function stepConcept(s){
  const before=s.beginner?`<div class="versus"><div class="vs before"><b>Le débutant dit</b><span>« ${esc(s.beginner)} »</span></div><div class="vs after"><b>Le senior dit</b><span>« ${esc(s.phrase)} »</span></div></div>`
    :`<div class="quote"><b>Pour en parler</b>« ${esc(s.phrase)} »</div>`;
  return {mood:"calme", bubble: s.beginner?"Celui-là, tu vas l'entendre souvent en équipe :":"Nouveau mot. Retiens bien celui-là :",
    body:`<article class="card">
      <div class="term"><mark>${esc(s.term)}</mark></div>
      <p class="def">${md(pick(s.def))}</p>
      ${s.code?codeView(s.code):""}
      ${s.rule?`<div class="rule"><b>À retenir</b>${md(pick(s.rule))}</div>`:""}
      ${before}
    </article>`,
    sheet:{kind:"idle", actions:`<button class="btn full" data-act="next">Compris</button>`}};
}
function optionsHtml(opts, correct, st){
  /* Ordre d'affichage tiré au hasard une fois par étape : la bonne réponse n'est jamais à une place fixe. */
  if(!st.perm || st.perm.length!==opts.length) st.perm=shuffle(opts.map((_,i)=>i));
  return `<div class="opts">${st.perm.map(i=>{ const o=opts[i];
    let cls="opt"; if(!st.answered&&st.sel===i) cls+=" sel";
    if(st.answered){ if(i===correct) cls+=" ok"; else if(i===st.sel) cls+=" ko"; }
    return `<button class="${cls}" data-opt="${i}" ${st.answered?"disabled":""}>${md(o)}</button>`; }).join("")}</div>`;
}
function stepQcm(s){
  const st=L.st, opts=pick(s.options), correct=pick(s.correct);
  return {mood:st.answered?(st.ok?"content":"calme"):"calme", bubble:md(pick(s.q)),
    body:`<article class="card">${s.code?codeView(s.code):""}${optionsHtml(opts,correct,st)}</article>`,
    sheet: st.answered ? resultSheet(st.ok, st.skip, md(pick(s.explain)||"")) : checkSheet(st.sel!=null,"check-qcm","skip-qcm")};
}
function stepCloze(s){
  const st=L.st, opts=pick(s.options), correct=pick(s.correct), why=pick(s.why)||[];
  const fill = st.sel!=null ? md(opts[st.sel]) : st.answered ? md(opts[correct]) : "&nbsp;";
  const sentence = md(pick(s.sentence)).replace("___", `<span class="blank ${st.answered?(st.ok?"ok":"ko"):""}">${fill}</span>`);
  let text="";
  if(st.answered){
    if(st.ok) text=`« ${md(opts[correct])} » est le mot juste.`;
    else text=`${st.sel!=null&&why[st.sel]?`<p><strong>Pourquoi pas « ${md(opts[st.sel])} » :</strong> ${md(why[st.sel])}</p>`:""}<p>Le mot juste : <strong>${md(opts[correct])}</strong>.</p>`;
    if(s.explain) text+=`<p>${md(pick(s.explain))}</p>`;
  }
  return {mood:"calme", bubble:"Quel mot va dans le trou ?",
    body:`<article class="card"><p class="sentence">${sentence}</p>${optionsHtml(opts,correct,st)}</article>`,
    sheet: st.answered ? resultSheet(st.ok, st.skip, text) : checkSheet(st.sel!=null,"check-qcm","skip-qcm")};
}
function placeMarks(line, marks){
  const claimed=[], found=[];
  marks.forEach(m=>{ let from=0, pos;
    while((pos=line.indexOf(m.text,from))>=0){ const end=pos+m.text.length; if(!claimed.some(([a,b])=>pos<b&&end>a)){ claimed.push([pos,end]); found.push({...m,pos,end}); break; } from=pos+1; } });
  return found.sort((a,b)=>a.pos-b.pos);
}
function stepLabel(s){
  const st=L.st; st.sel=st.sel||{};
  const marks=pick(s.marks), checked=st.checked;
  /* Les bons mots + des mots-pièges, mélangés une fois par étape. */
  if(!st.choices) st.choices=shuffle([...new Set(pick(s.options).concat(pick(s.traps)||[]))]);
  const opts=st.choices;
  const marksFn=(line,ln,lang)=>{
    const here=placeMarks(line, marks.map((m,i)=>({...m,_i:i})).filter(m=>m.line===ln));
    let out="",last=0;
    here.forEach(m=>{ out+=hlLine(line.slice(last,m.pos),lang);
      const cls = checked ? (st.sel[m._i]===m.answer?"ok":"ko") : "";
      out+=`<button class="mk ${cls}" data-mk="${m._i}" aria-label="Morceau ${m._i+1}">${esc(m.text)}<sup>${m._i+1}</sup></button>`; last=m.end; });
    return out+hlLine(line.slice(last),lang);
  };
  const rows=marks.map((m,i)=>{
    const v=st.sel[i], ok=checked&&v===m.answer, ko=checked&&v!==m.answer;
    return `<div class="lab ${ok?"ok":ko?"ko":st.active===i?"active":""}" id="lab-${i}">
      <div class="lab-head"><span class="num">${i+1}</span><code>${esc(m.text)}</code></div>
      <div class="choices" role="group" aria-label="Nom du morceau ${i+1}">${opts.map(o=>`<button class="choice ${v===o?"sel":""}" data-lab="${i}" data-v="${esc(o)}" ${checked?"disabled":""}>${esc(o)}</button>`).join("")}</div>
      ${checked?`<p class="small">${ok?"✓ ":"✗ C'est <strong>"+esc(m.answer)+"</strong>. "}${md(m.why||"")}</p>`:""}
    </div>`;
  }).join("");
  const all=marks.every((m,i)=>st.sel[i]);
  return {mood:"pensif", bubble:md(pick(s.intro)||"Touche chaque morceau surligné et dis-moi ce que c'est."),
    body:`<article class="card">${codeView(s.code, marksFn)}<div class="labels">${rows}</div></article>`,
    sheet: checked ? resultSheet(st.allOk, st.skip, st.allOk?"Tu as mis le bon mot sur chaque morceau.":"Relis les explications sous chaque morceau : ce sont les mots à retenir.") : checkSheet(all,"check-label","skip-label")};
}
function stepBuild(s){
  const st=L.st, answer=pick(s.answer), dis=pick(s.distractors)||[];
  if(!st.tiles){ st.tiles=shuffle(answer.concat(dis)); st.picked=[]; }
  const done=st.final;
  const tray=st.picked.map((ti,k)=>`<button class="tile" data-unpick="${k}" ${done?"disabled":""}>${esc(st.tiles[ti])}</button>`).join("");
  const bank=st.tiles.map((t,ti)=>{ const used=st.picked.includes(ti); return `<button class="tile ${used?"ph":""}" data-pick="${ti}" ${done||used?"disabled":""} ${used?'aria-hidden="true" tabindex="-1"':""}>${esc(t)}</button>`; }).join("");
  const hint = !done&&st.tries ? `<div class="note bad"><p class="small">Les ${st.goodPrefix} premières étiquettes sont bien placées. Retire les autres et réessaie.</p></div>` : "";
  const text = st.ok ? md(pick(s.explain)||"La phrase est parfaite.") : `<p>« ${esc(answer.join(" "))} »</p>${s.explain?`<p>${md(pick(s.explain))}</p>`:""}`;
  return {mood:"calme", bubble:md(pick(s.intro)||"Remets les étiquettes dans l'ordre."),
    body:`<article class="card">${s.code?codeView(s.code):""}
      <div class="tray ${done?(st.ok?"ok":"ko"):""}" aria-label="Ta phrase">${tray||`<span class="small muted">Touche les étiquettes ci-dessous.</span>`}</div>
      <div class="bank" aria-label="Étiquettes">${bank}</div>${hint}</article>`,
    sheet: done ? resultSheet(st.ok, st.skip, text) : checkSheet(st.picked.length>0,"check-build","skip-build")};
}
function stepPredict(s){
  const st=L.st;
  const nearT = !st.final&&st.near ? TERM[st.near] : null, target = s.vocab ? TERM[s.terms[0]] : null;
  const near = nearT ? `<div class="note"><h4>Presque : « ${esc(nearT.term)} » est un mot proche</h4><p>${kindOf(nearT,target) ? `« ${esc(nearT.term)} » est un <strong>cas particulier</strong>. Ici, on cherche le mot plus général.` : kindOf(target,nearT) ? `« ${esc(nearT.term)} » est <strong>plus général</strong>. Ici, on cherche un mot plus précis.` : `Les deux vont ensemble, mais ce n'est pas le même mot.`}</p><p class="small"><strong>${esc(nearT.term)}</strong> : ${md(shortDef(pick(nearT.def)))}</p><p class="small muted">Ça ne compte pas comme une erreur. Réessaie.</p></div>` : "";
  const hint = near || (!st.final&&st.tries ? `<div class="note bad"><p><strong>Indice :</strong> ${md(pick(s.hint))}</p></div>` : "");
  return {mood:"pensif", bubble:md(pick(s.q)),
    body:`<article class="card">${codeView(s.code)}
      <label class="small muted" for="pred">${esc(s.label||"Ce qui s'affiche :")}</label>
      <input class="field" id="pred" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(st.val||"")}" ${st.final?"disabled":""}>${hint}</article>`,
    sheet: st.final ? resultSheet(st.ok, st.skip, md(pick(s.explain)) + (!st.ok&&st.other&&TERM[st.other] ? `<p>Tu as écrit « ${esc(TERM[st.other].term)} » : ${md(shortDef(pick(TERM[st.other].def)))}</p>` : "")) : {kind:"idle", actions:btn("check-pred","Vérifier","full")+btn("skip-pred","Je ne sais pas","ghost")}};
}
function firstOpenRow(s){ const st=L.st; if(st.row===undefined) st.row=s.rows.findIndex(r=>r.c.some(c=>typeof c==="object")); return st.row; }
function stepTrace(s){
  const st=L.st; st.vals=st.vals||{}; st.bad=st.bad||{};
  const cr=firstOpenRow(s), finished=cr===-1;
  const rows=s.rows.map((r,ri)=>{
    const hasIn=r.c.some(c=>typeof c==="object");
    const state=!hasIn?"fixed":ri<cr||finished?"past":ri===cr?"cur":"future";
    const tds=r.c.map((c,ci)=>{
      if(typeof c!=="object") return `<td>${esc(c)}</td>`;
      const key=ri+"-"+ci;
      if(state==="past") return `<td class="filled">${esc(c.a)}</td>`;
      if(state==="future") return `<td>…</td>`;
      if(c.yn){ const v=st.vals[key]; return `<td><span class="yn ${st.bad[key]?"ko":""}" role="group" aria-label="${esc(s.cols[ci])}"><button data-yn="${key}" data-v="oui" class="${v==="oui"?"sel":""}">oui</button><button data-yn="${key}" data-v="non" class="${v==="non"?"sel":""}">non</button></span></td>`; }
      return `<td><input data-cell="${key}" id="cell-${key}" class="${st.bad[key]?"ko":""}" value="${esc(st.vals[key]||"")}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${esc(s.cols[ci])}, ligne ${ri+1}"></td>`;
    }).join("");
    return `<tr class="${state==="cur"?"cur":state==="future"?"future":""}">${tds}</tr>`;
  }).join("");
  const hint = !finished&&st.showHint ? `<div class="note ${st.reveal?"":"bad"}"><h4>${st.reveal?"Voici la ligne":"Regarde bien"}</h4><p>${md(s.rows[cr].hint||"")}</p></div>` : "";
  return {mood:"pensif", bubble:md(pick(s.intro)),
    body:`<article class="card">${codeView(s.code)}
      <div class="trace-wrap"><table class="trace"><thead><tr>${s.cols.map(c=>`<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>${hint}</article>`,
    sheet: finished ? {kind:"good", title:line("good"), text:md(s.after), actions:contBtn("good")} : {kind:"idle", actions:btn("check-row","Vérifier la ligne","full")+btn("reveal-row","Montre-moi","ghost")}};
}
function stepExplain(s){
  const st=L.st, model=pick(s.model);
  let res="";
  if(st.result){
    const txt=fold(st.text||"");
    const kws=s.keywords.map(k=>`<span class="${txt.includes(fold(k))?"hit":""}">${esc(k)}</span>`).join("");
    res=`
      <div class="note"><h4>Les mots attendus</h4><p class="small muted">En vert : ceux que tu as utilisés.</p><div class="kw">${kws}</div></div>
      <div class="quote"><b>Comment je le dirais</b>${md(model)}</div>`;
  }
  const sheet = st.result ? {kind:"good", title:"Compare avec ta réponse.", text:"Repère les mots en vert et ceux qui te manquent, puis redis ma phrase à voix haute.", actions:contBtn("good")}
    : {kind:"idle", actions:btn("model-check","Voir comment je le dirais","full")};
  return {mood:st.result?"content":"calme",
    bubble:`${md(pick(s.q))}<span class="sub">Dis-le d'abord à voix haute, puis écris-le. Quoi, comment, pourquoi.</span>`,
    body:`<article class="card">${s.code?codeView(s.code):""}
      <label class="small muted" for="expl">Ta réponse :</label>
      <textarea class="field" id="expl" ${st.result?"disabled":""}>${esc(st.text||"")}</textarea>${res}</article>`,
    sheet};
}
function stepSenior(s){
  const st=L.st; st.qi=st.qi||0; st.ans=st.ans||[]; st.fb=st.fb||[];
  const qs=s.questions, qi=st.qi, q=qs[qi], f=st.fb[qi], last=qi===qs.length-1;
  let res="";
  if(f){
    res = `<div class="quote"><b>Comment je le dirais</b>${md(pick(q.model))}</div>`;
  }
  const sheet = f ? {kind:"good", title:"Compare avec ta réponse.", actions: last?contBtn("good"):btn("senior-next","Question suivante","full good")}
    : {kind:"idle", actions:btn("senior-model","Voir ma réponse","full")};
  return {mood:f?"content":"pensif",
    bubble:`<span class="sub" style="margin:0 0 4px">Question ${qi+1}/${qs.length} · je relis ton code</span>« ${md(pick(q.q))} »`,
    body:`<article class="card">${codeView(s.code)}
      <label class="small muted" for="senior">Ta réponse, comme si tu parlais à un collègue :</label>
      <textarea class="field" id="senior" ${f?"disabled":""}>${esc(st.ans[qi]||"")}</textarea>${res}</article>`,
    sheet};
}
function stepPairs(s){
  const st=L.st, ids=s.terms;
  if(!st.L){ st.L=shuffle(ids); st.R=shuffle(ids); st.done=[]; st.bad=[]; }
  const finished=st.done.length===ids.length;
  if(finished){
    const list=ids.map(id=>{ const t=TERM[id]; return `<p><strong>${esc(t.term)}</strong> : ${md(shortDef(pick(t.def)))}</p>`; }).join("");
    const missed=[...new Set(st.bad)].map(id=>TERM[id].term);
    const text = st.skip ? "Relis les 4 paires : je te les redemande bientôt." : missed.length ? `Tu as hésité sur : <strong>${missed.map(esc).join(", ")}</strong>. Je te le redemande plus tôt en révision.` : "Les 4 paires sont justes.";
    return {mood:st.erred?"calme":"content", bubble:"Les paires :", body:`<article class="card"><div class="pairs-list">${list}</div></article>`, sheet:resultSheet(!st.erred, st.skip, text)};
  }
  const cell=(side,id)=>{ const t=TERM[id], done=st.done.includes(id), sel=st.pick&&st.pick.side===side&&st.pick.id===id, ko=st.flash&&st.flash[side]===id;
    const txt = side==="L" ? esc(t.term) : md(maskAll(shortDef(pick(t.def)),t));
    return `<button class="pair ${side==="L"?"pair-term":""} ${done?"ok":sel?"sel":ko?"ko":""}" data-pair="${side}:${id}" ${done?"disabled":""} aria-pressed="${!!sel}">${txt}</button>`; };
  return {mood:"pensif", bubble:`Relie chaque mot à sa définition.<span class="sub">Touche un mot, puis la définition qui va avec.</span>`,
    body:`<article class="card"><div class="pair-terms" role="group" aria-label="Les mots">${st.L.map(id=>cell("L",id)).join("")}</div>
      <div class="pair-defs" role="group" aria-label="Les définitions">${st.R.map(id=>cell("R",id)).join("")}</div></article>`,
    sheet:{kind:"idle", actions:btn("skip-pairs","Je ne sais pas","ghost")}};
}
const STEP = {pairs:stepPairs, concept:stepConcept,qcm:stepQcm,predict:stepPredict,trace:stepTrace,explain:stepExplain,label:stepLabel,cloze:stepCloze,build:stepBuild,senior:stepSenior};
let lastSheetKind="idle";
function renderLesson(){
  const c=cur(), s=c.step, n=L.steps.length, pct=Math.round(L.i/n*100);
  const r=(STEP[s.type]||stepConcept)(s);
  const sh=r.sheet||{kind:"idle",actions:""};
  const anim = sh.kind!=="idle" && lastSheetKind==="idle";
  lastSheetKind=sh.kind;
  const origin = L.mode==="weak" ? `<p class="origin">Leçon : ${esc(LESSON[c.lessonId].title)}</p>` : L.mode==="placement" ? `<p class="origin">Test de positionnement · ${esc(CHAPTERS[chIndex(c.ch)].title)}</p>` : "";
  const fb = sh.kind!=="idle" ? `<div class="sheet-fb">${sensei(sh.kind==="good"?"content":"calme",48,sh.kind==="good"&&anim?"bob":"")}<div class="txt"><h4>${esc(sh.title||"")}</h4>${sh.text?`<div class="small">${sh.text}</div>`:""}</div></div>` : "";
  return `<div class="lesson-top">
      <button class="quit" data-act="quit" aria-label="Quitter la leçon">${ICON.close}</button>
      <div class="bar" role="progressbar" aria-label="Progression" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.max(pct,3)}%"></i></div>
      ${langSwitch()}
    </div>
    ${origin}
    ${say(r.mood, r.bubble, 60)}
    ${r.body}
    <div class="sheet ${sh.kind} ${anim?"in":""}" role="region" aria-label="Actions" aria-live="polite"><div class="sheet-in">${fb}<div class="actions">${sh.actions}</div></div></div>`;
}

function renderDone(){
  const v=view;
  if(v.mode==="placement"){
    const lv=v.levels||{};
    const rows=CHAPTERS.map(c=>{ const n=lv[c.id]||0; return `<li><span>${esc(c.title)}</span><span class="pill ${n===2?"done":""}">${n===2?"Acquis":n===1?"En partie":"À découvrir"}</span></li>`; }).join("");
    const rec=recommended();
    return `${header()}
      ${say("fier", `Test terminé : <strong>${P.placement.score} / ${P.placement.total}</strong>.<span class="sub">Ce n'est pas une note, c'est ta carte de départ. Je t'ai préparé la suite.</span>`, 96, true)}
      <section class="panel"><ul class="results">${rows}</ul></section>
      <div class="actions">${rec?`<button class="btn full" data-start="${rec.gi}">Commencer : ${esc(rec.title)}</button>`:""}<button class="btn ghost" data-go="path">Voir le parcours</button></div>`;
  }
  const n=streakNow();
  const msg = v.mistakes===0 ? "Sans une seule erreur. Là, tu parles comme un senior."
    : v.mode==="weak" ? "Ce qui reste difficile reviendra la prochaine fois. Petit à petit."
    : v.mode==="vocab" ? `Tu as hésité sur ${v.missed.length} mot${v.missed.length>1?"s":""}. Ils reviennent dès demain dans ta révision.`
    : `Tu as hésité sur ${v.mistakes} point${v.mistakes>1?"s":""}. Je les garde de côté dans « Points faibles ».`;
  return `${header()}
  <section class="center">
    ${sensei("fier",130,"bob")}
    <h2 class="done-title">${v.mode==="weak"?"Points faibles revus":v.mode==="vocab"?"Entraînement terminé":"Leçon bouclée"}</h2>
    <p class="muted">${esc(v.title)}</p>
    <div class="stat">${ICON.flame}<b>${n}</b><span class="small">jour${n>1?"s":""} de série</span></div>
    <p>${esc(msg)}</p>
  </section>
  ${v.added.length?`<section class="panel"><span class="eyebrow">${v.added.length} mot${v.added.length>1?"s":""} de plus dans ton vocabulaire</span><div class="kw">${v.added.map(t=>`<span class="hit">${esc(t)}</span>`).join("")}</div><p class="small muted">Je te les redemande demain, puis de moins en moins souvent.</p></section>`:""}
  ${v.missed&&v.missed.length?`<section class="panel"><span class="eyebrow">À revoir demain</span><div class="kw">${v.missed.map(t=>`<span>${esc(t)}</span>`).join("")}</div></section>`:""}
  <div class="actions"><button class="btn full" data-go="path">Continuer</button>${v.mode==="vocab"?`<button class="btn ghost" data-act="vocab">Encore 10</button>`:""}</div>`;
}

/* ---- Révision ---- */
function cardMode(t){ const modes=["term","def"]; if(fold(t.phrase).includes(fold(t.term))) modes.push("ctx","ctx"); return modes[Math.floor(Math.random()*modes.length)]; }
function startReview(){ const ids=shuffle(dueIds()).slice(0,15); view={name:"review", q:ids, i:0, revealed:false, again:{}, known:0, total:ids.length, mode:ids[0]?cardMode(TERM[ids[0]]):"term"}; }
function blankPhrase(t){ const i=fold(t.phrase).indexOf(fold(t.term)); return i<0?t.phrase:t.phrase.slice(0,i)+"_____"+t.phrase.slice(i+t.term.length); }
function renderReview(){
  const v=view;
  if(!v.q || !v.q.length){
    const has=Object.keys(P.cards).length, nextDue=Object.values(P.cards).map(c=>c.due).sort()[0];
    return `${header()}<section class="center">${MUG}
      ${say("calme", has?`Rien à réviser pour l'instant.<span class="sub">Prochaine révision : ${nextDue===addDays(today(),1)?"demain":frDate(nextDue)}. Une petite leçon en attendant ?</span>`:`Pas encore de mots à réviser.<span class="sub">Termine ta première leçon : ses mots arriveront ici.</span>`, 64)}
      <button class="btn" data-go="path">Aller au parcours</button></section>${footerSync()}`;
  }
  if(v.i>=v.q.length) return `${header()}<section class="center">${sensei("fier",120,"bob")}<h2 class="done-title">${v.known} / ${v.total}</h2><p class="muted">mots retrouvés du premier coup</p></section><div class="actions"><button class="btn full" data-go="path">Continuer</button></div>`;
  const t=TERM[v.q[v.i]], c=P.cards[t.id];
  const ask = v.mode==="term" ? "Tu te souviens de ce que veut dire ce mot ?" : v.mode==="def" ? "Quel est le mot pour ça ?" : "Quel mot manque dans ma phrase ?";
  const front = v.mode==="term" ? `<div class="term"><mark>${esc(t.term)}</mark></div>`
    : v.mode==="def" ? `<p class="def">${md(pick(t.def))}</p>` : `<p class="sentence">« ${esc(blankPhrase(t))} »</p>`;
  const back = v.revealed ? `<hr style="width:100%;border:0;border-top:2px dashed var(--line)">
      ${v.mode==="term"?`<p class="def">${md(pick(t.def))}</p>`:`<div class="term"><mark>${esc(t.term)}</mark></div>`}
      ${v.mode==="ctx"?`<p class="small">${md(pick(t.def))}</p>`:""}
      ${t.code?`<div style="width:100%;text-align:left">${codeView(t.code)}</div>`:""}
      <div class="quote" style="text-align:left;width:100%"><b>${t.beginner?"Le senior dit":"Pour en parler"}</b>« ${esc(t.phrase)} »</div>` : "";
  return `${header()}
  <p class="small muted" style="text-align:center">Carte ${v.i+1} sur ${v.q.length} · <span class="boxes" aria-label="Niveau ${c.box} sur 6">${[1,2,3,4,5,6].map(b=>`<i class="${b<=c.box?"on":""}"></i>`).join("")}</span></p>
  ${say(v.revealed?"content":"pensif", ask+(v.revealed?"":`<span class="sub">Dis la réponse à voix haute avant de retourner la carte.</span>`), 60)}
  <section class="card flash">${front}${back}</section>
  <div class="actions">${v.revealed?`<button class="btn bad full" data-act="again">À revoir</button><button class="btn good full" data-act="know">Je savais</button>`:`<button class="btn full" data-act="reveal">Voir la réponse</button>`}</div>`;
}
function grade(know){
  const v=view, id=v.q[v.i], c=P.cards[id];
  if(know){ c.box=Math.min(c.box+1,6); c.due=addDays(today(),INTERVAL[c.box]); c.t=Date.now(); if(!v.again[id]) v.known++; }
  else { c.box=1; c.due=addDays(today(),1); c.t=Date.now(); if(!v.again[id]){ v.again[id]=1; v.q.push(id); } }
  v.i++; v.revealed=false; if(v.i<v.q.length) v.mode=cardMode(TERM[v.q[v.i]]);
  if(v.i>=v.q.length) bumpStreak();
  save(); render();
}

/* ---- Lexique ---- */
function lexItems(){
  const f=fold(view.filter||"");
  return TERMS.filter(t=>!f||fold(t.term+" "+pick(t.def)).includes(f)).map(t=>{ const c=P.cards[t.id], l=LESSON[t.lessonId];
    return `<div class="lex-item ${c?"":"locked"}">
      <div class="spread"><h3>${esc(t.term)}</h3>${c?`<span class="boxes" aria-label="Niveau ${c.box} sur 6">${[1,2,3,4,5,6].map(b=>`<i class="${b<=c.box?"on":""}"></i>`).join("")}</span>`:`<span class="pill">${esc(l.title)}</span>`}</div>
      <p class="small">${md(pick(t.def))}</p>
      ${c?`<p class="small muted"><em>« ${esc(t.phrase)} »</em></p>`:""}
    </div>`; }).join("") || `<p class="muted">Aucun mot ne correspond.</p>`;
}
function renderLexicon(){
  return `${header()}
  ${say("calme", `Ton dictionnaire de senior : <strong>${TERMS.length} mots</strong>. Ceux que tu as déjà vus sont en clair.`, 56)}
  ${vocabPool().length>=4?`<div class="actions"><button class="btn small" data-act="vocab">S'entraîner sur mes ${vocabPool().length} mots</button></div>`:""}
  <label class="small muted" for="lexq">Chercher un mot</label>
  <input class="field" id="lexq" value="${esc(view.filter||"")}" placeholder="callback, race condition, ownership…" autocomplete="off" style="font-family:var(--f-body)">
  <div class="lex" id="lexlist">${lexItems()}</div>
  ${footerSync()}`;
}

function render(){
  if(!CHAPTERS.length){ app.innerHTML=`<p>Le contenu du programme n'a pas pu être chargé. Recharge la page.</p>`; return; }
  app.className = "wrap" + (view.name==="lesson" ? " has-sheet" : "");
  setTabsVisible(view.name!=="lesson");
  const pb=document.getElementById('progressBar');
  if(pb) pb.style.width = view.name==="lesson"&&L ? Math.round(L.i/L.steps.length*100)+"%" : "0%";
  if(view.name!=="lesson") lastSheetKind="idle";
  if(view.name==="lesson") app.innerHTML=renderLesson();
  else if(view.name==="done") app.innerHTML=renderDone();
  else if(view.name==="review") app.innerHTML=renderReview();
  else if(view.name==="lexicon") app.innerHTML=renderLexicon();
  else app.innerHTML=renderPath();
}

/* ============ ACTIONS ============ */
function readCells(){ app.querySelectorAll("[data-cell]").forEach(i=>{ L.st.vals[i.dataset.cell]=i.value; }); }
function checkRow(reveal){
  const s=cur().step, st=L.st, ri=st.row, r=s.rows[ri];
  readCells();
  let allOk=true; st.bad={};
  r.c.forEach((c,ci)=>{ if(typeof c==="object"){ const key=ri+"-"+ci; if(norm(st.vals[key]||"")!==norm(c.a)){ allOk=false; st.bad[key]=1; } } });
  if(reveal){ erred(); st.reveal=true; st.showHint=true; st.bad={}; render(); return; }
  if(allOk){ st.showHint=false; st.reveal=false;
    let nx=ri+1; while(nx<s.rows.length && !s.rows[nx].c.some(c=>typeof c==="object")) nx++;
    st.row = nx<s.rows.length ? nx : -1;
  } else { erred(); st.showHint=true; st.reveal=false; }
  render();
  const first=app.querySelector("[data-cell]"); if(first) first.focus();
}
app.addEventListener("click", e=>{
  const lg=e.target.closest("[data-lang]");
  if(lg){
    if(view.name==="lesson" && L){ const t=cur().step.type;
      if(t==="label"&&!L.st.checked) L.st={}; if(t==="build"&&!L.st.final) L.st={}; if(t==="trace"&&L.st.vals) readCells(); }
    P.lang=lg.dataset.lang; save(); render(); return; }
  const go=e.target.closest("[data-go]");
  if(go){ const n=go.dataset.go; if(n==="review") startReview(); else view={name:n}; render(); window.scrollTo(0,0); return; }
  const startB=e.target.closest("[data-start]"); if(startB){ startLesson(+startB.dataset.start); return; }
  const nd=e.target.closest("[data-node]"); if(nd){ const gi=+nd.dataset.node; view.sel = view.sel===gi ? null : gi; render(); return; }
  if(view.name==="lesson"){
    const s=cur().step, st=L.st;
    const opt=e.target.closest("[data-opt]"); if(opt&&!st.answered){ st.sel=+opt.dataset.opt; render(); return; }
    const pr=e.target.closest("[data-pair]");
    if(pr&&s.type==="pairs"&&!pr.disabled){ const [side,id]=pr.dataset.pair.split(":"); st.flash=null;
      if(!st.pick || st.pick.side===side){ st.pick = st.pick&&st.pick.id===id ? null : {side,id}; }
      else { const term=side==="L"?id:st.pick.id, def=side==="R"?id:st.pick.id;
        if(term===def) st.done.push(term); else { erred(); st.bad.push(term); st.flash={L:term, R:def}; }
        st.pick=null; }
      render(); return; }
    const yn=e.target.closest("[data-yn]"); if(yn){ readCells(); st.vals[yn.dataset.yn]=yn.dataset.v; delete st.bad[yn.dataset.yn]; render(); return; }
    const mk=e.target.closest("[data-mk]"); if(mk){ st.active=+mk.dataset.mk; render(); const el=$("#lab-"+st.active); if(el){ el.scrollIntoView({block:"nearest"}); const b=el.querySelector(".choice"); if(b) b.focus(); } return; }
    const lab=e.target.closest("[data-lab]"); if(lab&&!st.checked){ st.sel=st.sel||{}; const i=+lab.dataset.lab; st.sel[i]=lab.dataset.v; st.active=pick(s.marks).findIndex((m,k)=>!st.sel[k]); render(); return; }
    const pk=e.target.closest("[data-pick]"); if(pk&&!st.final){ const ti=+pk.dataset.pick; if(!st.picked.includes(ti)) st.picked.push(ti); st.tries=0; render(); return; }
    const up=e.target.closest("[data-unpick]"); if(up&&!st.final){ st.picked.splice(+up.dataset.unpick,1); render(); return; }
  }
  const b=e.target.closest("[data-act]"); if(!b) return;
  const act=b.dataset.act;
  if(act==="placement"){ startPlacement(); return; }
  if(act==="weak"){ startWeak(); return; }
  if(act==="vocab"){ startVocab(); return; }
  if(view.name==="review"){
    if(act==="reveal"){ view.revealed=true; render(); }
    else if(act==="know") grade(true);
    else if(act==="again") grade(false);
    return;
  }
  if(view.name!=="lesson") return;
  const s=cur().step, st=L.st;
  switch(act){
    case "quit": if(L.mode!=="placement") save(); L=null; view={name:"path"}; render(); break;
    case "next": nextStep(); break;
    case "skip-pairs": st.done=s.terms.slice(); st.bad=s.terms.slice(); st.skip=true; erred(); render(); break;
    case "check-qcm": st.answered=true; st.ok=st.sel===pick(s.correct); if(!st.ok) erred(); render(); break;
    case "skip-qcm": st.answered=true; st.skip=true; st.ok=false; st.sel=null; erred(); render(); break;
    case "check-label": { const marks=pick(s.marks); st.checked=true; st.allOk=marks.every((m,i)=>st.sel[i]===m.answer); if(!st.allOk) erred(); render(); break; }
    case "skip-label": { const marks=pick(s.marks); st.sel={}; marks.forEach((m,i)=>st.sel[i]=m.answer); st.checked=true; st.allOk=false; st.skip=true; erred(); render(); break; }
    case "check-build": {
      const answer=pick(s.answer), got=st.picked.map(ti=>st.tiles[ti]);
      const ok=got.length===answer.length && got.every((t,i)=>t===answer[i]);
      if(ok){ st.final=true; st.ok=true; }
      else { erred(); st.tries=(st.tries||0)+1; st.attempts=(st.attempts||0)+1; let k=0; while(k<got.length&&got[k]===answer[k]) k++; st.goodPrefix=k;
        if(st.attempts>=2){ st.final=true; st.ok=false; st.picked=answer.map(a=>st.tiles.indexOf(a)); } }
      render(); break; }
    case "skip-build": { const answer=pick(s.answer); st.picked=answer.map(a=>st.tiles.indexOf(a)); st.final=true; st.ok=false; st.skip=true; erred(); render(); break; }
    case "check-pred": {
      const v=$("#pred").value; st.val=v;
      if(!v.trim()){ $("#pred").focus(); return; }
      const vv = s.vocab ? v.replace(/^\s*(le|la|les|un|une|des|du)\s+|^\s*l['’]\s*/i,"") : v;
      const ok=pick(s.answers).some(a=>norm(a)===norm(vv));
      const other = s.vocab && !ok ? termTyped(vv) : null, target = s.vocab ? TERM[s.terms[0]] : null;
      st.other = other ? other.id : null;
      if(other && related(other,target) && !st.nearUsed){ st.nearUsed=true; st.near=other.id; render(); $("#pred").focus(); break; }
      st.near=null;
      if(ok){ st.final=true; st.ok=true; }
      else { st.tries=(st.tries||0)+1; erred(); if(st.tries>=2){ st.final=true; st.ok=false; } }
      render(); if(!st.final) $("#pred").focus(); break; }
    case "skip-pred": st.val=$("#pred").value; st.final=true; st.skip=true; st.ok=false; erred(); render(); break;
    case "check-row": checkRow(false); break;
    case "reveal-row": { const r=s.rows[st.row]; r.c.forEach((c,ci)=>{ if(typeof c==="object") st.vals[st.row+"-"+ci]=c.a; }); checkRow(true); break; }
    case "model-check": st.text=($("#expl").value||"").trim(); st.result=true; render(); break;
    case "senior-model": st.ans[st.qi]=($("#senior").value||"").trim(); st.fb[st.qi]={}; render(); break;
    case "senior-next": st.qi++; render(); break;
  }
});
app.addEventListener("input", e=>{
  if(e.target.id==="lexq"){ view.filter=e.target.value; $("#lexlist").innerHTML=lexItems(); }
  if(e.target.dataset && e.target.dataset.cell && L){ L.st.vals[e.target.dataset.cell]=e.target.value; e.target.classList.remove("ko"); }
  if(e.target.id==="expl" && L){ L.st.text=e.target.value; }
  if(e.target.id==="senior" && L){ L.st.ans[L.st.qi]=e.target.value; }
});
app.addEventListener("keydown", e=>{
  if(e.key!=="Enter" || view.name!=="lesson") return;
  if(e.target.id==="pred"){ e.preventDefault(); const b=app.querySelector('[data-act="check-pred"]'); if(b) b.click(); }
  if(e.target.dataset && e.target.dataset.cell){ e.preventDefault(); const ins=[...app.querySelectorAll("[data-cell]")]; const k=ins.indexOf(e.target); if(k<ins.length-1) ins[k+1].focus(); else app.querySelector('[data-act="check-row"]').click(); }
});

/* ============ ECRAN CDAQUIZ ============ */
registerScreen('sensei', {
  show(){ setActiveTab('sensei'); app.style.display=''; render(); }, // '' : la classe wrap (flex) reprend la main
  hide(){ app.style.display='none'; setTabsVisible(false); const pb=document.getElementById('progressBar'); if(pb) pb.style.width='0%'; }
});
// Une synchro a apporte du nouveau : on recharge la progression fusionnee.
// Pas de redessin pendant une lecon ou une revision (on ne coupe pas l'exercice).
window.addEventListener('cdaquiz:synced', ()=>{
  const fresh=loadLocal(); if(fresh) P=fresh;
  if(getCurrentScreen()==='sensei' && view.name!=="lesson" && view.name!=="review") render();
});

export function openSensei(){ showScreen('sensei'); }
