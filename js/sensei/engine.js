// Onglet 03 Vocabulaire : la Chambre d'Enrichissement Lexical.
// Apprendre a parler du code comme un dev senior : chambres de test (lecons),
// revision espacee, lexique, test de positionnement et exercices generes a
// partir des mots (paires, terme a ecrire...). La voix est celle du Centre
// d'Enrichissement, portee par l'Unite d'evaluation 03 (IA de labo originale).
// Charge en lazy au premier clic sur l'onglet, comme le labo.
/* ============ OUTILS ============ */
import { CHAPTERS, PLACEMENT } from '../../data/sensei/index.js';
import { registerScreen, showScreen, getCurrentScreen } from '../screens.js';
import { setTabsVisible, setActiveTab } from '../ui/tabs.js';
import { playSuccess, playFail, playComplete, toggleMuted, muteButtonLabel } from '../labo/sounds.js';
import { unit } from '../ui/mascot.js';

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

/* L'Unite d'evaluation 03 (mascotte) est partagee : js/ui/mascot.js */
const say = (mood, html, size, bob) => `<div class="say-row">${unit(mood, size||56, bob?"bob":"")}<div class="bubble"><span class="unit-name">Unité 03</span>${html}</div></div>`;
const LINES = {
  good:["Réponse conforme. Résultat consigné.","Correct. Le Centre d'Enrichissement prend note.","Exact. Vous pouvez poursuivre le protocole.","Conforme. Votre vocabulaire progresse de façon mesurable.","Correct. Le Centre retire une ligne de son rapport d'inquiétude."],
  bad:["Réponse non conforme. Ce n'est pas un échec, c'est une donnée.","Écart détecté. Voici la valeur attendue :","Non conforme. Le Centre a vu bien pire, et l'a corrigé.","Résultat inattendu. Analysez la différence :"],
  skip:["Aveu d'ignorance enregistré. C'est une donnée utile.","Le Centre apprécie l'honnêteté de ses sujets. Voici la réponse :","Abstention consignée. Observez la réponse attendue :"]
};
function line(kind){ const st=L.st; if(st.lineKind!==kind){ st.lineKind=kind; st.line=rand(LINES[kind]); } return st.line; }
const ICON = {
  check:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  lock:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
  flame:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5 5 5.8 5 11a5 5 0 0 1-10 0c0-2.4 1.1-4 2.4-5.3.2 1.6.9 2.8 2.1 3.3C11 8 11.2 5 12 2z"/></svg>`,
  close:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  star:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>`
};

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
    <div class="hub-head">
      <h1>Chambre d'Enrichissement Lexical</h1>
      <p class="labo-subtitle">Vocabulaire technique : lire, nommer et expliquer du code comme un développeur senior.</p>
    </div>
    <div class="chips">
      <span class="labo-counter" title="Jours consécutifs de protocole">Série : ${streakNow()} j</span>
      <span class="labo-counter" title="Mots revus au moins 3 fois avec succès">Mots calibrés : ${masteredCount()}</span>
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
  if(!started && !P.placement) return {mood:"content", html:`Bienvenue dans la <strong>Chambre d'Enrichissement Lexical</strong>, sujet de test. Ce protocole va vous apprendre à parler du code comme un développeur senior.<span class="sub">Un test de positionnement est recommandé pour calibrer votre niveau de départ. Vous pouvez aussi commencer directement.</span>`,
    actions:`<button class="btn" data-act="placement">Lancer le test de positionnement</button>${rec?`<button class="btn ghost" data-start="${rec.gi}">Commencer directement</button>`:""}`};
  let html = n>1 ? `${n} jours consécutifs de protocole. Le Centre est satisfait.` : started ? "Bon retour, sujet de test." : "Bonjour, sujet de test.";
  if(rec) html += ` Prochaine chambre : <strong>${esc(rec.title)}</strong>.`; else html += " Toutes les chambres sont calibrées. Le Centre n'avait pas prévu ce cas.";
  if(due) html += `<span class="sub">${due} mot${due>1?"s":""} en attente de recalibration aujourd'hui.</span>`;
  return {mood:n>2?"fier":"calme", html, actions: rec?`<button class="btn" data-start="${rec.gi}">Entrer dans la chambre</button>${due?`<button class="btn ghost" data-go="review">Réviser d'abord</button>`:""}`:(due?`<button class="btn" data-go="review">Réviser</button>`:"")};
}
/* Couleur de chaque chapitre : meme palette que les modules du quiz (css/modules.css) */
const CH_COLOR = {lire:"#3572A5", parler:"#009688", senior:"#6f42c1", objets:"#E67E22", uml:"#3498DB", propre:"#27AE60", secu:"#E74C3C", devsecops:"#2496ED", agile:"#9B59B6", rust:"#CE422B", prod:"#D4A017", capot:"#5D6D7E"};
const chamberNum = gi => String(gi+1).padStart(2,"0");
const OFFSETS=[0,44,64,44,0,-44,-64,-44];
function renderPath(){
  const rec=recommended(), g=greeting(rec);
  const ws=weakSteps();
  const units = CHAPTERS.map((ch,ci)=>{
    const p=chapterProgress(ci), lv=P.placement&&P.placement.levels?P.placement.levels[ch.id]:undefined;
    const pct=Math.round(p.done/p.total*100);
    const rows = ch.lessons.map((l0,k)=>{ const lesson=LESSONS.find(x=>x.id===l0.id);
      const done=isDone(lesson.id), op=unlocked(lesson), next=rec&&rec.id===lesson.id, sel=view.sel===lesson.gi;
      const cls = done?"done":next?"next":op?"":"locked";
      const state = done?"Calibrée":next?"Recommandée":op?"":"Verrouillée";
      const nW=lesson.steps.filter(s=>s.type==="concept").length;
      const pop = sel ? `<div class="pop">
          <span class="eyebrow">Chambre de test ${chamberNum(lesson.gi)} · ${lesson.steps.length} étapes · ${nW} mots</span>
          <h3>${esc(lesson.title)}</h3><p class="small muted">${esc(lesson.sub)}</p>
          ${op?`<div class="actions"><button class="btn" data-start="${lesson.gi}">${done?"Refaire la chambre":"Entrer dans la chambre"}</button></div>`:`<p class="small">Accès refusé. Terminez d'abord : <strong>${esc(ch.lessons[k-1].title)}</strong>.</p>`}
        </div>` : "";
      // Parcours qui descend en zigzag : chaque chambre de test est un hublot numerote
      return `<li><div class="node-wrap${next?" has-here":""}" style="transform:translateX(${OFFSETS[k%OFFSETS.length]}px)">
          ${next?`<span class="here">Vous êtes ici</span>`:""}
          <button class="node ${cls}" data-node="${lesson.gi}" aria-expanded="${sel}" aria-label="Chambre de test ${chamberNum(lesson.gi)} : ${esc(lesson.title)}${state?", "+state.toLowerCase():""}">${done?ICON.check:op?`<span class="node-num">${chamberNum(lesson.gi)}</span>`:ICON.lock}</button>
          <span class="node-label"><span class="chamber-num">Chambre ${chamberNum(lesson.gi)}</span>${esc(lesson.title)}</span>
        </div>${pop}</li>`; }).join("");
    return `<section class="unit-block" style="--module-color:${CH_COLOR[ch.id]||"#FF6700"}" aria-label="${esc(ch.title)}">
      <div class="module-card chapter">
        <div class="spread"><span class="eyebrow">Chapitre ${String(ci+1).padStart(2,"0")}</span>${lv===2?`<span class="pill done">Acquis au test</span>`:lv===1?`<span class="pill">En partie au test</span>`:""}</div>
        <h3>${esc(ch.title)}</h3>
        <p>${esc(ch.goal)}</p>
        <div class="labo-progress-track"><div class="labo-progress-fill" style="width:${pct}%;background:var(--module-color)"></div></div>
        <p class="labo-progress-label">${p.done}/${p.total} chambres calibrées${pct===100?" · protocole terminé":""}</p>
      </div>
      <ol class="path">${rows}</ol>
    </section>`;
  }).join("");
  return `${header()}
  <section class="hero">${unit(g.mood,88)}<div class="bubble"><span class="unit-name">Unité 03</span>${g.html}${g.actions?`<div class="actions" style="margin-top:12px">${g.actions}</div>`:""}</div></section>
  ${vocabPool().length>=4?`<section class="panel"><div class="spread"><h3>Entraînement vocabulaire</h3><span class="pill">${vocabPool().length} mots</span></div><p class="small">10 exercices rapides sur les mots déjà appris : paires, mot manquant, terme à écrire. Les mots à recalibrer passent en premier.</p><div class="actions"><button class="btn small" data-act="vocab">Lancer l'entraînement</button></div></section>`:""}
  ${ws.length?`<section class="panel warn"><div class="spread"><h3>Anomalies détectées</h3><span class="pill warn">${ws.length}</span></div><p class="small">Les exercices où vous avez hésité. Les refaire est le moyen le plus efficace de progresser.</p><div class="actions"><button class="btn small" data-act="weak">Traiter les anomalies</button></div></section>`:""}
  <div class="chapters">${units}</div>
  <section class="panel"><span class="eyebrow">Protocole recommandé</span>
    <p class="small"><strong>Chaque jour, 15 min</strong> dans cette chambre. <strong>3 fois par semaine</strong>, 30 min de code sans tutoriel (Rustlings, Exercism).</p>
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
/* Equivalents acceptes pour "ecrivez le terme" : UNIQUEMENT des traductions anglaises
   exactes et des equivalents francais etablis. Pas de mot vague (liste, retour,
   pattern), pas d'usage a corriger (cryptage), pas de notion voisine mais differente
   (pile d'appels != stack trace, n-tiers != couches, requete preparee != parametree).
   Chaque cle doit etre un terme existant : verifie par les tests. */
const ALIASES = {
  "Affectation":["assignment"], "Constante":["constant"], "Itération":["iteration"],
  "Incrémenter":["increment"], "Condition d'arrêt":["condition de sortie"],
  "Paramètre":["parameter"], "Valeur de retour":["return value"],
  "Fonction pure":["pure function"], "Propriété":["property"], "Valeur primitive":["primitive value"],
  "Référence":["reference"], "Index":["indice"], "Fonction fléchée":["arrow function"],
  "Méthode":["method"], "Effet de bord":["side effect"], "Égalité stricte":["strict equality"],
  "Goulot d'étranglement":["bottleneck"], "Scalabilité":["scalability"],
  "Code review":["revue de code"], "Hardcodé":["codé en dur","hardcoded"], "Code mort":["dead code"],
  "Sur-ingénierie":["over-engineering","overengineering"], "Rétrocompatible":["backward compatible"],
  "Rollback":["retour arrière"], "Feature flag":["feature toggle"],
  "Source unique de vérité":["single source of truth"], "Constructeur":["constructor"],
  "Héritage":["inheritance"], "Polymorphisme":["polymorphism"], "Design pattern":["patron de conception"],
  "Logique métier":["business logic"], "Architecture en couches":["layered architecture"],
  "Diagramme de classes":["class diagram"], "Diagramme de séquence":["sequence diagram"], "Cas d'utilisation":["use case"],
  "Booléen":["boolean"], "Boucle infinie":["infinite loop"],
  "Breakpoint":["point d'arrêt"], "Erreur de décalage":["off-by-one error","off-by-one"],
  "Nombre magique":["magic number"], "Refactoring":["refactorisation"], "Dette technique":["technical debt"],
  "Test unitaire":["unit test"], "Edge case":["cas limite"],
  "Liste blanche":["allowlist","whitelist"], "Injection SQL":["SQL injection"], "Requête paramétrée":["parameterized query"],
  "Échappement":["escaping"], "Moindre privilège":["least privilege"],
  "Surface d'attaque":["attack surface"], "Chiffrement":["encryption"], "Hachage":["hashing"], "Sauvegarde":["backup"],
  "Dépôt":["repository"], "Branche":["branch"], "Merge":["fusion"], "Pull request":["PR","merge request"],
  "Conflit":["merge conflict"], "Intégration continue":["CI","continuous integration"], "Déploiement continu":["continuous deployment"],
  "Conteneur":["container"], "Registre":["registry"], "Dépendance transitive":["transitive dependency"], "Lockfile":["fichier de verrouillage"],
  "Partie prenante":["stakeholder"], "Critères d'acceptation":["acceptance criteria"],
  "Compilateur":["compiler"], "Emprunt":["borrowing"], "Emprunt mutable":["mutable borrow"],
  "Immuable par défaut":["immutable by default"],
  "Cardinalité":["multiplicité","multiplicity"], "Généralisation":["generalization"],
  "Authentification":["authentication"], "Autorisation":["authorization"], "Régression":["regression"],
  "Vulnérabilité":["vulnerability"], "Agrégation":["aggregation"], "Acteur":["actor"], "Attribut":["attribute"],
  "Stack":["pile"], "Heap":["tas"], "Move":["déplacement"], "Definition of Done":["DoD"],
  "User story":["récit utilisateur"], "POC":["proof of concept","preuve de concept"],
  "Breaking change":["changement cassant"], "Race condition":["condition de concurrence"],
  "Asynchrone":["asynchronous"], "État":["state"], "Lisibilité":["readability"], "Interface publique":["public interface"],
  "Besoin fonctionnel":["exigence fonctionnelle","functional requirement"],
  "Besoin non fonctionnel":["exigence non fonctionnelle","non-functional requirement"],
  "Portée":["scope"], "Itérateur":["iterator"], "Cause racine":["root cause"], "Contournement":["workaround"],
  "Couplage":["coupling"], "Cohésion":["cohesion"], "Contrat d'API":["API contract"], "Test double":["doublure de test"],
  "Latence":["latency"], "Débit":["throughput"], "p95":["95e percentile"],
  "SLO":["service level objective","objectif de niveau de service"], "SLA":["service level agreement","accord de niveau de service"],
  "Observabilité":["observability"], "Post-mortem sans reproche":["blameless post-mortem"], "Problème N+1":["N+1 query problem"],
  "Event loop":["boucle d'événements"], "Promise":["promesse"], "Hoisting":["remontée"], "Générateur":["generator"],
  "Context manager":["gestionnaire de contexte"], "GIL":["global interpreter lock"], "Deadlock":["interblocage"],
  "Couverture de code":["code coverage"], "Sel":["salt"], "Déploiement canary":["canary deployment","canary release"],
  "Vélocité":["velocity"], "Limite WIP":["WIP limit"], "Refinement":["affinage du backlog","backlog refinement"],
  "Lifetime":["durée de vie"], "Shadowing":["masquage"]
};
/* Comparaison tolerante pour "ecrivez le terme" : sans les mots de liaison
   (en, par, de, du, des, le, la, les, l', d', a), puis avec une petite faute de
   frappe permise (1 lettre des 6 caracteres, 2 des 12). */
const LINK_WORDS = new Set(["en","par","de","du","des","le","la","les","l","d","a","un","une","et"]);
const words = s => fold(s).replace(/[’'`]/g," ").replace(/[^a-z0-9+#²³]+/g," ").trim().split(/\s+/).filter(w=>w && !LINK_WORDS.has(w));
function editDistance(a, b){
  const d=Array.from({length:a.length+1},(_,i)=>[i]);
  for(let j=1;j<=b.length;j++) d[0][j]=j;
  for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++)
    d[i][j]=Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[a.length][b.length];
}
function looseMatch(expected, typed){
  const e=words(expected).join(""), t=words(typed).join("");
  if(!e || !t) return false;
  if(e===t) return true;
  const allowed = e.length>=12 ? 2 : e.length>=6 ? 1 : 0;
  const dist = editDistance(e,t);
  if(!(allowed>0 && dist<=allowed)) return false;
  // une faute de frappe n'est acceptee que si aucun AUTRE terme n'est aussi proche
  // (sinon "lisibilite" passerait pour "visibilite")
  const ef = fold(expected);
  return !TERMS.some(x=>{ const o=words(x.term).join(""); return fold(x.term)!==ef && o!==e && editDistance(o,t)<=dist; });
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
    return {type:"qcm", vocab:"word", terms:[t.id], q:mapVar(t.def, x=>"Quel terme correspond à cette définition ? « "+maskAll(x,t)+" »"),
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
    return {type:"predict", vocab:"type", terms:[t.id], q:mapVar(t.def, x=>"Écrivez le terme qui correspond : « "+maskAll(x,t)+" »"),
      label:"Le terme :", answers:[t.term, core], hint:`Il commence par « ${core.slice(0,2)}… »${words>1?` (${words} mots)`:""}.`, explain:defLine(t)}; },
  /* Débutant → senior */
  senior(t){ if(!t.beginner) return null; const d=distractors(t,3); if(d.length<3) return null;
    return {type:"qcm", vocab:"senior", terms:[t.id], q:"Un débutant dirait : « "+maskAll(t.beginner,t)+" ». Quel terme un senior utiliserait-il ?",
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
function startWeak(){ const ws=shuffle(weakSteps()).slice(0,12); if(!ws.length) return; startRun({mode:"weak", title:"Anomalies détectées", steps:ws}); }
function startPlacement(){ startRun({mode:"placement", title:"Test de positionnement", steps:PLACEMENT.map(p=>({step:p.step, ch:p.ch}))}); }
// Une erreur par etape au plus. La voix d'echec (1 fois sur 3, voir sounds.js) ne
// joue pas sur "Je ne sais pas" ni pendant le test de positionnement.
function erred(){ if(!L.st.erred){ L.st.erred=true; L.mistakes++; if(!L.st.skip && L.mode!=="placement") playFail(); } }
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
  const scored=L.steps.filter(c=>!["concept","explain","senior"].includes(c.step.type)).length;
  const chapterDone = L.mode==="lesson" && CHAPTERS[LESSON[L.lessonId].chIdx].lessons.every(l=>isDone(l.id));
  if(L.mode!=="placement"){ if(L.mistakes===0 || chapterDone) playComplete(); else playSuccess(); }
  bumpStreak(); save();
  view={name:"done", mode:L.mode, added, mistakes:L.mistakes, title:L.title, levels, total:L.steps.length, scored, ok:Math.max(0,scored-L.mistakes), chapterDone, missed:missed.map(id=>TERM[id].term)};
  L=null; render(); window.scrollTo(0,0);
}

/* Chaque étape renvoie : message de l'Unité 03, humeur, contenu, et barre du bas */
const btn = (act, label, cls, dis) => `<button class="btn ${cls||""}" data-act="${act}" ${dis?"disabled":""}>${label}</button>`;
const contBtn = kind => `<button class="btn full ${kind==="good"?"good":kind==="bad"?"bad":""}" data-act="next">Continuer</button>`;
function checkSheet(canCheck, checkAct, skipAct){ return {kind:"idle", actions:btn(checkAct,"Vérifier","full",!canCheck)+btn(skipAct,"Je ne sais pas","ghost")}; }
function resultSheet(ok, skip, text){ const kind=ok?"good":skip?"skip":"bad"; return {kind, title:line(kind), text, actions:contBtn(kind)}; }

function stepConcept(s){
  const before=s.beginner?`<div class="versus"><div class="vs before"><b>Le débutant dit</b><span>« ${esc(s.beginner)} »</span></div><div class="vs after"><b>Le senior dit</b><span>« ${esc(s.phrase)} »</span></div></div>`
    :`<div class="quote"><b>En contexte</b>« ${esc(s.phrase)} »</div>`;
  return {mood:"calme", bubble: s.beginner?"Terme fréquent en équipe. À mémoriser :":"Nouveau terme. À mémoriser :",
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
  return {mood:"calme", bubble:"Quel mot complète la phrase ?",
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
  return {mood:"pensif", bubble:md(pick(s.intro)||"Touchez chaque morceau surligné et nommez-le."),
    body:`<article class="card">${codeView(s.code, marksFn)}<div class="labels">${rows}</div></article>`,
    sheet: checked ? resultSheet(st.allOk, st.skip, st.allOk?"Chaque morceau porte le bon nom.":"Relisez les explications sous chaque morceau : ce sont les mots à retenir.") : checkSheet(all,"check-label","skip-label")};
}
function stepBuild(s){
  const st=L.st, answer=pick(s.answer), dis=pick(s.distractors)||[];
  if(!st.tiles){ st.tiles=shuffle(answer.concat(dis)); st.picked=[]; }
  const done=st.final;
  const tray=st.picked.map((ti,k)=>`<button class="tile" data-unpick="${k}" ${done?"disabled":""}>${esc(st.tiles[ti])}</button>`).join("");
  const bank=st.tiles.map((t,ti)=>{ const used=st.picked.includes(ti); return `<button class="tile ${used?"ph":""}" data-pick="${ti}" ${done||used?"disabled":""} ${used?'aria-hidden="true" tabindex="-1"':""}>${esc(t)}</button>`; }).join("");
  const hint = !done&&st.tries ? `<div class="note bad"><p class="small">Les ${st.goodPrefix} premières étiquettes sont bien placées. Retirez les autres et réessayez.</p></div>` : "";
  const text = st.ok ? md(pick(s.explain)||"La phrase est parfaite.") : `<p>« ${esc(answer.join(" "))} »</p>${s.explain?`<p>${md(pick(s.explain))}</p>`:""}`;
  return {mood:"calme", bubble:md(pick(s.intro)||"Remettez les étiquettes dans l'ordre."),
    body:`<article class="card">${s.code?codeView(s.code):""}
      <div class="tray ${done?(st.ok?"ok":"ko"):""}" aria-label="Votre phrase">${tray||`<span class="small muted">Touchez les étiquettes ci-dessous.</span>`}</div>
      <div class="bank" aria-label="Étiquettes">${bank}</div>${hint}</article>`,
    sheet: done ? resultSheet(st.ok, st.skip, text) : checkSheet(st.picked.length>0,"check-build","skip-build")};
}
function stepPredict(s){
  const st=L.st;
  const nearT = !st.final&&st.near ? TERM[st.near] : null, target = s.vocab ? TERM[s.terms[0]] : null;
  const near = nearT ? `<div class="note"><h4>Presque : « ${esc(nearT.term)} » est un mot proche</h4><p>${kindOf(nearT,target) ? `« ${esc(nearT.term)} » est un <strong>cas particulier</strong>. Ici, on cherche le mot plus général.` : kindOf(target,nearT) ? `« ${esc(nearT.term)} » est <strong>plus général</strong>. Ici, on cherche un mot plus précis.` : `Les deux vont ensemble, mais ce n'est pas le même mot.`}</p><p class="small"><strong>${esc(nearT.term)}</strong> : ${md(shortDef(pick(nearT.def)))}</p><p class="small muted">Ce n'est pas compté comme une erreur. Réessayez.</p></div>` : "";
  const hint = near || (!st.final&&st.tries ? `<div class="note bad"><p><strong>Indice :</strong> ${md(pick(s.hint))}</p></div>` : "");
  return {mood:"pensif", bubble:md(pick(s.q)),
    body:`<article class="card">${codeView(s.code)}
      <label class="small muted" for="pred">${esc(s.label||"Ce qui s'affiche :")}</label>
      <input class="field" id="pred" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(st.val||"")}" ${st.final?"disabled":""}>${hint}</article>`,
    sheet: st.final ? resultSheet(st.ok, st.skip, (st.ok&&st.loose&&target ? `<p>Accepté. Le terme exact : <strong>${esc(target.term)}</strong>.</p>` : "") + md(pick(s.explain)) + (!st.ok&&st.other&&TERM[st.other] ? `<p>Vous avez écrit « ${esc(TERM[st.other].term)} » : ${md(shortDef(pick(TERM[st.other].def)))}</p>` : "")) : {kind:"idle", actions:btn("check-pred","Vérifier","full")+btn("skip-pred","Je ne sais pas","ghost")}};
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
  const hint = !finished&&st.showHint ? `<div class="note ${st.reveal?"":"bad"}"><h4>${st.reveal?"Voici la ligne":"Regardez bien"}</h4><p>${md(s.rows[cr].hint||"")}</p></div>` : "";
  return {mood:"pensif", bubble:md(pick(s.intro)),
    body:`<article class="card">${codeView(s.code)}
      <div class="trace-wrap"><table class="trace"><thead><tr>${s.cols.map(c=>`<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>${hint}</article>`,
    sheet: finished ? {kind:"good", title:line("good"), text:md(s.after), actions:contBtn("good")} : {kind:"idle", actions:btn("check-row","Vérifier la ligne","full")+btn("reveal-row","Montrez-moi","ghost")}};
}
function stepExplain(s){
  const st=L.st, model=pick(s.model);
  let res="";
  if(st.result){
    const txt=fold(st.text||"");
    const kws=s.keywords.map(k=>`<span class="${txt.includes(fold(k))?"hit":""}">${esc(k)}</span>`).join("");
    res=`
      <div class="note"><h4>Les mots attendus</h4><p class="small muted">En vert : ceux que vous avez utilisés.</p><div class="kw">${kws}</div></div>
      <div class="quote"><b>Formulation de référence</b>${md(model)}</div>`;
  }
  const sheet = st.result ? {kind:"good", title:"Comparez avec votre réponse.", text:"Repérez les mots en vert et ceux qui manquent, puis répétez la formulation de référence à voix haute.", actions:contBtn("good")}
    : {kind:"idle", actions:btn("model-check","Voir la formulation de référence","full")};
  return {mood:st.result?"content":"calme",
    bubble:`${md(pick(s.q))}<span class="sub">Dites-le d'abord à voix haute, puis écrivez-le. Quoi, comment, pourquoi.</span>`,
    body:`<article class="card">${s.code?codeView(s.code):""}
      <label class="small muted" for="expl">Votre réponse :</label>
      <textarea class="field" id="expl" ${st.result?"disabled":""}>${esc(st.text||"")}</textarea>${res}</article>`,
    sheet};
}
function stepSenior(s){
  const st=L.st; st.qi=st.qi||0; st.ans=st.ans||[]; st.fb=st.fb||[];
  const qs=s.questions, qi=st.qi, q=qs[qi], f=st.fb[qi], last=qi===qs.length-1;
  let res="";
  if(f){
    res = `<div class="quote"><b>Formulation de référence</b>${md(pick(q.model))}</div>`;
  }
  const sheet = f ? {kind:"good", title:"Comparez avec votre réponse.", actions: last?contBtn("good"):btn("senior-next","Question suivante","full good")}
    : {kind:"idle", actions:btn("senior-model","Voir la réponse de référence","full")};
  return {mood:f?"content":"pensif",
    bubble:`<span class="sub" style="margin:0 0 4px">Question ${qi+1}/${qs.length} · revue de code</span>« ${md(pick(q.q))} »`,
    body:`<article class="card">${codeView(s.code)}
      <label class="small muted" for="senior">Votre réponse, comme à un collègue :</label>
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
    const text = st.skip ? "Relisez les 4 paires : elles reviendront bientôt." : missed.length ? `Hésitation sur : <strong>${missed.map(esc).join(", ")}</strong>. Ces mots reviendront plus tôt en révision.` : "Les 4 paires sont justes.";
    return {mood:st.erred?"calme":"content", bubble:"Les paires :", body:`<article class="card"><div class="pairs-list">${list}</div></article>`, sheet:resultSheet(!st.erred, st.skip, text)};
  }
  const cell=(side,id)=>{ const t=TERM[id], done=st.done.includes(id), sel=st.pick&&st.pick.side===side&&st.pick.id===id, ko=st.flash&&st.flash[side]===id;
    const txt = side==="L" ? esc(t.term) : md(maskAll(shortDef(pick(t.def)),t));
    return `<button class="pair ${side==="L"?"pair-term":""} ${done?"ok":sel?"sel":ko?"ko":""}" data-pair="${side}:${id}" ${done?"disabled":""} aria-pressed="${!!sel}">${txt}</button>`; };
  return {mood:"pensif", bubble:`Reliez chaque terme à sa définition.<span class="sub">Touchez un terme, puis la définition correspondante.</span>`,
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
  const origin = L.mode==="weak" ? `<p class="origin">Chambre : ${esc(LESSON[c.lessonId].title)}</p>` : L.mode==="placement" ? `<p class="origin">Test de positionnement · ${esc(CHAPTERS[chIndex(c.ch)].title)}</p>` : "";
  const fb = sh.kind!=="idle" ? `<div class="sheet-fb">${unit(sh.kind==="good"?"content":sh.kind==="bad"?"pensif":"calme",44,sh.kind==="good"&&anim?"bob":"")}<div class="txt"><h4>« ${esc(sh.title||"")} »</h4>${sh.text?`<div class="small">${sh.text}</div>`:""}</div></div>` : "";
  const tag = L.mode==="lesson" ? "Chambre de test "+chamberNum(LESSON[L.lessonId].gi) : L.mode==="vocab" ? "Entraînement" : L.mode==="weak" ? "Anomalies" : "Positionnement";
  return `<div class="lesson-top">
      <button class="quit" data-act="quit" aria-label="Quitter la chambre">${ICON.close}</button>
      <span class="step-num" role="progressbar" aria-label="Progression" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">Étape ${L.i+1}/${n}</span>
      <span class="step-tag">${esc(tag)}</span>
      <button class="mute" data-act="mute">${muteButtonLabel()}</button>
      ${langSwitch()}
    </div>
    ${origin}
    ${say(r.mood, r.bubble, 48)}
    ${r.body}
    <div class="sheet ${sh.kind} ${anim?"in":""}" role="region" aria-label="Actions" aria-live="polite"><div class="sheet-in">${fb}<div class="actions">${sh.actions}</div></div></div>`;
}

function renderDone(){
  const v=view;
  if(v.mode==="placement"){
    const lv=v.levels||{};
    const rows=CHAPTERS.map(c=>{ const n=lv[c.id]||0; return `<div class="stat-item"><span class="module-name">${esc(c.title)}</span><span class="module-score ${n===2?"good":n===1?"medium":""}">${n===2?"Acquis":n===1?"En partie":"À découvrir"}</span></div>`; }).join("");
    const rec=recommended();
    return `${header()}
      ${say("fier", `Test terminé : <strong>${P.placement.score} / ${P.placement.total}</strong>.<span class="sub">Ce n'est pas une note : c'est votre carte de départ. La suite du protocole a été préparée.</span>`, 88, true)}
      <div class="module-stats">${rows}</div>
      <div class="actions">${rec?`<button class="btn full" data-start="${rec.gi}">Commencer : ${esc(rec.title)}</button>`:""}<button class="btn ghost" data-go="path">Voir le parcours</button></div>`;
  }
  const n=streakNow();
  const quote = v.mistakes===0 ? (v.mode==="vocab"?"Entraînement terminé sans anomalie. Le Centre vérifie ses instruments.":"Chambre de test terminée sans anomalie. Le Centre est presque inquiet.")
    : v.chapterDone ? "Chapitre entièrement calibré. Une nouvelle série de chambres vous attend."
    : v.mode==="weak" ? "Les anomalies restantes reviendront lors du prochain protocole. Petit à petit."
    : v.mode==="vocab" ? `Hésitation sur ${v.missed.length} mot${v.missed.length>1?"s":""}. Ils reviendront dès demain en révision.`
    : `Hésitation sur ${v.mistakes} point${v.mistakes>1?"s":""}. Ils ont été placés dans « Anomalies détectées ».`;
  const title = v.mode==="weak"?"Anomalies traitées":v.mode==="vocab"?"Entraînement terminé":"Chambre de test terminée";
  return `${header()}
  <section class="center">
    ${unit(v.mistakes===0?"fier":"content",104,"bob")}
    <h2 class="done-title">${title}</h2>
    <p class="muted">${esc(v.title)}</p>
  </section>
  <div class="score-display">
    <div class="score">${v.ok}/${v.scored}</div>
    <div class="total">exercices réussis du premier coup</div>
    <div class="labo-recap-glados">"${esc(quote)}"</div>
  </div>
  <div class="module-stats">
    <div class="stat-item"><span class="module-name">Série de protocole</span><span class="module-score">${n} jour${n>1?"s":""}</span></div>
    ${v.mode==="lesson"?`<div class="stat-item"><span class="module-name">Mots ajoutés au vocabulaire</span><span class="module-score good">${v.added.length}</span></div>`:""}
    ${v.missed&&v.missed.length?`<div class="stat-item"><span class="module-name">Mots à recalibrer demain</span><span class="module-score bad">${v.missed.length}</span></div>`:""}
  </div>
  ${v.added.length?`<section class="panel"><span class="eyebrow">${v.added.length} mot${v.added.length>1?"s":""} ajouté${v.added.length>1?"s":""} à votre vocabulaire</span><div class="kw">${v.added.map(t=>`<span class="hit">${esc(t)}</span>`).join("")}</div><p class="small muted">Ils vous seront redemandés demain, puis de moins en moins souvent.</p></section>`:""}
  ${v.missed&&v.missed.length?`<section class="panel"><span class="eyebrow">À recalibrer demain</span><div class="kw">${v.missed.map(t=>`<span>${esc(t)}</span>`).join("")}</div></section>`:""}
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
    return `${header()}<section class="center">
      ${say("calme", has?`Aucun mot à recalibrer pour l'instant.<span class="sub">Prochaine révision : ${nextDue===addDays(today(),1)?"demain":frDate(nextDue)}. Une chambre de test en attendant ?</span>`:`Aucun mot à réviser.<span class="sub">Terminez votre première chambre de test : ses mots arriveront ici.</span>`, 64)}
      <button class="btn" data-go="path">Aller au parcours</button></section>${footerSync()}`;
  }
  if(v.i>=v.q.length) return `${header()}<section class="center">${unit("fier",104,"bob")}<h2 class="done-title">${v.known} / ${v.total}</h2><p class="muted">mots retrouvés du premier coup</p></section><div class="actions"><button class="btn full" data-go="path">Continuer</button></div>`;
  const t=TERM[v.q[v.i]], c=P.cards[t.id];
  const ask = v.mode==="term" ? "Que signifie ce terme ?" : v.mode==="def" ? "Quel terme correspond à cette définition ?" : "Quel mot manque dans cette phrase ?";
  const front = v.mode==="term" ? `<div class="term"><mark>${esc(t.term)}</mark></div>`
    : v.mode==="def" ? `<p class="def">${md(pick(t.def))}</p>` : `<p class="sentence">« ${esc(blankPhrase(t))} »</p>`;
  const back = v.revealed ? `<hr style="width:100%;border:0;border-top:2px dashed var(--line)">
      ${v.mode==="term"?`<p class="def">${md(pick(t.def))}</p>`:`<div class="term"><mark>${esc(t.term)}</mark></div>`}
      ${v.mode==="ctx"?`<p class="small">${md(pick(t.def))}</p>`:""}
      ${t.code?`<div style="width:100%;text-align:left">${codeView(t.code)}</div>`:""}
      <div class="quote" style="text-align:left;width:100%"><b>${t.beginner?"Le senior dit":"En contexte"}</b>« ${esc(t.phrase)} »</div>` : "";
  return `${header()}
  <p class="small muted" style="text-align:center">Carte ${v.i+1} sur ${v.q.length} · <span class="boxes" aria-label="Niveau ${c.box} sur 6">${[1,2,3,4,5,6].map(b=>`<i class="${b<=c.box?"on":""}"></i>`).join("")}</span></p>
  ${say(v.revealed?"content":"pensif", ask+(v.revealed?"":`<span class="sub">Dites la réponse à voix haute avant de retourner la carte.</span>`), 60)}
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
    </div>`; }).join("") || `<p class="muted">Aucun terme ne correspond.</p>`;
}
function renderLexicon(){
  return `${header()}
  ${say("calme", `Dictionnaire technique du Centre : <strong>${TERMS.length} termes</strong>. Ceux que vous avez déjà rencontrés sont en clair.`, 56)}
  ${vocabPool().length>=4?`<div class="actions"><button class="btn small" data-act="vocab">S'entraîner sur mes ${vocabPool().length} mots</button></div>`:""}
  <label class="small muted" for="lexq">Chercher un terme</label>
  <input class="field" id="lexq" value="${esc(view.filter||"")}" placeholder="callback, race condition, ownership…" autocomplete="off" style="font-family:var(--f-body)">
  <div class="lex" id="lexlist">${lexItems()}</div>
  ${footerSync()}`;
}

function render(){
  if(!CHAPTERS.length){ app.innerHTML=`<p>Le contenu du programme n'a pas pu être chargé. Rechargez la page.</p>`; return; }
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
  // "Montrez-moi" vient de remplir st.vals : relire les cases (encore vides) l'effacerait
  if(!reveal) readCells();
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
  if(act==="mute"){ toggleMuted(); b.textContent=muteButtonLabel(); return; }
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
      // Strict d'abord ; pour "ecrivez le terme", on tolere les mots de liaison
      // (architecture PAR couches = EN couches) et une petite faute de frappe
      let ok=pick(s.answers).some(a=>norm(a)===norm(vv));
      st.loose=false;
      if(!ok && s.vocab){
        const alias = ALIASES[TERM[s.terms[0]].term] || [];
        if(pick(s.answers).concat(alias).some(a=>looseMatch(a, vv))){ ok=true; st.loose=true; }
      }
      const other = s.vocab && !ok ? termTyped(vv) : null, target = s.vocab ? TERM[s.terms[0]] : null;
      st.other = other ? other.id : null;
      if(other && related(other,target) && !st.nearUsed){ st.nearUsed=true; st.near=other.id; render(); $("#pred").focus(); break; }
      st.near=null;
      if(ok){ st.final=true; st.ok=true; }
      else { st.tries=(st.tries||0)+1; erred(); if(st.tries>=2){ st.final=true; st.ok=false; } }
      render(); if(!st.final) $("#pred").focus(); break; }
    case "skip-pred": st.val=$("#pred").value; st.final=true; st.skip=true; st.ok=false; erred(); render(); break;
    case "check-row": checkRow(false); break;
    case "reveal-row": { readCells(); const r=s.rows[st.row]; r.c.forEach((c,ci)=>{ if(typeof c==="object") st.vals[st.row+"-"+ci]=c.a; }); checkRow(true); break; }
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
