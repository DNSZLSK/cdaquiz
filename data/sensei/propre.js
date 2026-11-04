// Vocabulaire Sensei - chapitre "Code propre, debug et tests" : 8 lecons, 30 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "propre",
  title: "Code propre, debug et tests",
  goal: "Conditions, erreurs, debug, nommage, refactoring, tests, complexité.",
  lessons: [
    {
      id: "condition",
      title: "Les conditions",
      sub: "if, else, booléen, modulo",
      steps: [
        {
          type: "concept",
          term: "Booléen",
          def: "Une valeur qui ne peut être que `true` (vrai) ou `false` (faux). Une comparaison donne toujours un booléen.",
          code: `5 > 3     // true
2 === 7   // false`,
          phrase: "La comparaison retourne un booléen."
        },
        {
          type: "concept",
          term: "Condition",
          def: "Un **aiguillage**. `if` pose une question. Si la réponse est `true`, on exécute le bloc. Sinon, on passe au bloc `else` (s'il existe).",
          code: `let age = 20;
if (age >= 18) {
  console.log("majeur");   // ← exécuté (20 >= 18 est true)
} else {
  console.log("mineur");   // ← sauté
}`,
          phrase: "Si l'âge est supérieur ou égal à 18, on affiche majeur."
        },
        {
          type: "concept",
          term: "Opérateurs logiques",
          def: "Pour combiner des tests. `&&` = **ET** (les deux doivent être vrais). `||` = **OU** (un seul suffit). `!` = **NON** (inverse).",
          code: `true && false   // false
true || false   // true
!true           // false`,
          phrase: "On vérifie que l'utilisateur est connecté ET administrateur."
        },
        {
          type: "qcm",
          q: "Qu'affiche ce code ?",
          code: `const age = 16;
const avecParent = true;
if (age >= 18 || avecParent) {
  console.log("entrée");
} else {
  console.log("refus");
}`,
          options: ["entrée", "refus"],
          correct: 0,
          explain: "`age >= 18` est false, mais `avecParent` est true. Avec `||` (OU), **un seul vrai suffit** → \"entrée\"."
        },
        {
          type: "concept",
          term: "Modulo",
          def: "`%` donne le **reste** d'une division. Un nombre pair divisé par 2 a un reste de 0.",
          code: `7 % 2   // 7 = 2×3 + 1  → reste 1
8 % 2   // 8 = 2×4 + 0  → reste 0 (pair)`,
          phrase: "On utilise le modulo pour savoir si un nombre est pair."
        },
        {
          type: "trace",
          intro: "On compte les nombres pairs. Remplis chaque tour.",
          code: `let count = 0;
for (let i = 1; i <= 4; i++) {
  if (i % 2 === 0) {
    count = count + 1;
  }
}
console.log(count);`,
          cols: ["i", "i % 2", "pair ?", "count"],
          rows: [
            {c:["départ", "—", "—", "0"]},
            {
              c: [
                "1",
                {a:"1"},
                {a:"non", yn:1},
                {a:"0"}
              ],
              hint: "`1 % 2` = 1 (1 = 2×0 + 1). Pas 0 → pas pair. count ne change pas : 0."
            },
            {
              c: [
                "2",
                {a:"0"},
                {a:"oui", yn:1},
                {a:"1"}
              ],
              hint: "`2 % 2` = 0 → pair. `count = 0 + 1` = 1."
            },
            {
              c: [
                "3",
                {a:"1"},
                {a:"non", yn:1},
                {a:"1"}
              ],
              hint: "`3 % 2` = 1 → pas pair. count reste 1."
            },
            {
              c: [
                "4",
                {a:"0"},
                {a:"oui", yn:1},
                {a:"2"}
              ],
              hint: "`4 % 2` = 0 → pair. `count = 1 + 1` = 2."
            }
          ],
          after: "Ensuite `i` vaut 5, `5 <= 4` est faux, on sort. On affiche **2**."
        },
        {
          type: "cloze",
          sentence: "`5 > 3` donne `true` : le résultat d'une comparaison est un ___.",
          options: ["booléen", "tableau", "argument"],
          correct: 0,
          why: ["", "Un tableau est une liste de valeurs.", "Un argument est une valeur donnée à une fonction."]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: `const note = 12;
if (note >= 16) {
  console.log("très bien");
} else if (note >= 10) {
  console.log("validé");
} else {
  console.log("raté");
}`,
          answers: ["validé", "valide"],
          hint: "On teste dans l'ordre. `12 >= 16` ? Non. Alors on passe au test suivant.",
          explain: "`12 >= 16` → false. `12 >= 10` → true → **validé**. Le dernier `else` est sauté."
        }
      ]
    },
    {
      id: "while",
      title: "La boucle while",
      sub: "while, boucle infinie",
      steps: [
        {
          type: "concept",
          term: "while",
          def: "Une boucle qui dit : « **tant que** le test est vrai, refais le bloc ». Utile quand on ne sait pas à l'avance combien de tours il faudra.",
          code: `let n = 1;
while (n < 10) {
  n = n * 2;
}
// n vaut 16 à la fin`,
          phrase: "Tant que n est inférieur à 10, on le double."
        },
        {
          type: "concept",
          term: "Boucle infinie",
          def: "Une boucle dont le test **ne devient jamais faux**. Le programme tourne pour toujours et se bloque.",
          code: `let i = 0;
while (i < 5) {
  console.log(i);
  // ❌ oubli de i++ : i reste à 0 pour toujours
}`,
          phrase: "On a une boucle infinie car la condition d'arrêt n'est jamais atteinte."
        },
        {
          type: "trace",
          intro: "Remplis chaque tour. Le test se fait **avant** de modifier n.",
          code: `let n = 1;
let steps = 0;
while (n < 20) {
  n = n * 2;
  steps = steps + 1;
}
console.log(steps);`,
          cols: ["Tour", "n < 20 ?", "n", "steps"],
          rows: [
            {c:["départ", "—", "1", "0"]},
            {
              c: [
                "1",
                {a:"oui", yn:1},
                {a:"2"},
                {a:"1"}
              ],
              hint: "n contient 1. `1 < 20` → oui. n = `1 * 2` = 2. steps = 1."
            },
            {
              c: [
                "2",
                {a:"oui", yn:1},
                {a:"4"},
                {a:"2"}
              ],
              hint: "`2 < 20` → oui. n = `2 * 2` = 4. steps = 2."
            },
            {
              c: [
                "3",
                {a:"oui", yn:1},
                {a:"8"},
                {a:"3"}
              ],
              hint: "`4 < 20` → oui. n = 8. steps = 3."
            },
            {
              c: [
                "4",
                {a:"oui", yn:1},
                {a:"16"},
                {a:"4"}
              ],
              hint: "`8 < 20` → oui. n = 16. steps = 4."
            },
            {
              c: [
                "5",
                {a:"oui", yn:1},
                {a:"32"},
                {a:"5"}
              ],
              hint: "`16 < 20` → oui. n = 32. steps = 5."
            },
            {
              c: [
                "6",
                {a:"non", yn:1},
                "—",
                "—"
              ],
              hint: "n contient 32. `32 < 20` → non : on sort."
            }
          ],
          after: "On affiche `steps` : **5**."
        },
        {
          type: "qcm",
          q: "Que se passe-t-il ?",
          code: `let i = 10;
while (i > 0) {
  i = i + 1;
}`,
          options: ["La boucle fait 10 tours", "La boucle ne tourne pas", "Boucle infinie"],
          correct: 2,
          explain: "i part de 10 et **augmente** : 11, 12, 13… Il sera toujours > 0. Le test ne devient jamais faux : **boucle infinie**."
        },
        {
          type: "cloze",
          sentence: "Une boucle dont la condition ne devient jamais fausse est une boucle ___.",
          options: ["infinie", "imbriquée", "itérative"],
          correct: 0,
          why: [
            "",
            "Imbriquée, c'est une boucle dans une boucle.",
            "« Itérative » n'est pas le bon mot ici : on parle d'une boucle qui ne s'arrête jamais."
          ]
        }
      ]
    },
    {
      id: "erreurs",
      title: "Lire une erreur",
      sub: "Bug, stack trace, exception",
      steps: [
        {
          type: "concept",
          term: "Bug",
          def: "Un **écart** entre ce que le code devrait faire et ce qu'il fait vraiment.",
          phrase: "On a un bug : la fonction retourne 3 au lieu de 8."
        },
        {
          type: "concept",
          term: "ReferenceError",
          def: "Erreur quand on utilise un **nom qui n'existe pas**. Le plus souvent : une faute de frappe.",
          code: `const total = 10;
console.log(totl);
// ReferenceError: totl is not defined`,
          phrase: "On a une ReferenceError : la variable n'est pas définie."
        },
        {
          type: "concept",
          term: "TypeError",
          def: "Erreur quand on fait avec une valeur **une chose impossible pour son type**. Par exemple lire une propriété de `undefined`.",
          code: `const user = undefined;
console.log(user.name);
// TypeError: Cannot read properties of undefined`,
          phrase: "On essaie de lire une propriété sur undefined, d'où la TypeError."
        },
        {
          type: "qcm",
          q: "Quelle erreur donne ce code ?",
          code: `function saluer(nom) {
  return "Salut " + nom;
}
console.log(salut("Kevin"));`,
          options: ["ReferenceError", "TypeError", "Aucune erreur"],
          correct: 0,
          explain: "La fonction s'appelle `saluer`, mais on appelle `salut` : **ce nom n'existe pas** → ReferenceError."
        },
        {
          type: "concept",
          term: "Stack trace",
          def: "La **liste des fonctions** en cours au moment de l'erreur, avec les numéros de ligne. La ligne du **haut** montre où ça a cassé.",
          code: `TypeError: Cannot read properties of undefined (reading 'name')
    at afficher (app.js:12:20)    ← ici : ligne 12
    at main (app.js:30:3)         ← appelée depuis la ligne 30`,
          rule: "Lis une erreur en 3 temps : **1.** le type (TypeError…) **2.** le message **3.** la première ligne de la stack trace qui pointe vers **ton** fichier.",
          phrase: "D'après la stack trace, l'erreur vient de la ligne 12 de app.js."
        },
        {
          type: "concept",
          term: "Exception",
          def: "Une erreur « lancée » pendant l'exécution. `try` essaie un bloc. Si une exception arrive, `catch` l'**attrape** au lieu de laisser le programme planter.",
          code: `try {
  risque();          // si ça plante ici…
} catch (error) {
  console.log("Problème");   // …on arrive ici
}`,
          phrase: "On attrape l'exception avec un bloc try/catch."
        },
        {
          type: "cloze",
          sentence: "La liste des fonctions en cours au moment de l'erreur s'appelle la ___.",
          options: ["stack trace", "boucle", "dette technique"],
          correct: 0,
          why: ["", "Une boucle répète du code.", "La dette technique, c'est le coût futur des raccourcis."]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: `try {
  const user = undefined;
  console.log(user.name);
  console.log("fin");
} catch (error) {
  console.log("Oups");
}`,
          answers: ["Oups", "\"Oups\""],
          hint: "`user.name` sur undefined lance une TypeError. Où va le programme ensuite ?",
          explain: "La ligne 3 lance une exception. On saute directement dans `catch` (\"fin\" n'est jamais affiché) → **Oups**."
        }
      ]
    },
    {
      id: "debug",
      title: "Déboguer avec méthode",
      sub: "Hypothèse, console.log, breakpoint",
      steps: [
        {
          type: "concept",
          term: "Déboguer",
          def: "Trouver et corriger un bug avec méthode : **1.** observer **2.** faire une hypothèse **3.** la tester **4.** corriger **5.** vérifier.",
          phrase: "Je débogue : mon hypothèse est que la boucle commence au mauvais index."
        },
        {
          type: "concept",
          term: "Breakpoint",
          def: "Un **point d'arrêt** : le programme se met en pause sur une ligne. Tu peux alors regarder le contenu de chaque boîte (variable).",
          rule: "Dans VS Code : clic à gauche du numéro de ligne (un point rouge apparaît), puis F5.",
          phrase: "Je pose un breakpoint dans la boucle pour inspecter i."
        },
        {
          type: "concept",
          term: "Erreur de décalage",
          def: "Se tromper **d'un seul cran** dans une boucle : commencer à 1 au lieu de 0, ou s'arrêter un tour trop tôt. En anglais : off-by-one.",
          code: `for (let i = 1; i < nums.length; i++)
//           ↑ oublie l'index 0`,
          phrase: "C'est une erreur off-by-one : on saute le premier élément."
        },
        {
          type: "predict",
          q: "`sum([5, 1, 2])` devrait donner 8. Que retourne-t-il vraiment ?",
          code: `function sum(nums) {
  let total = 0;
  for (let i = 1; i < nums.length; i++) {
    total = total + nums[i];
  }
  return total;
}
sum([5, 1, 2]);`,
          answers: ["3"],
          hint: "Regarde la valeur de départ de `i`. Quel élément est oublié ?",
          explain: "i part de 1 : on additionne `nums[1]` (1) et `nums[2]` (2). Le 5 (index 0) est oublié → **3**."
        },
        {
          type: "qcm",
          q: "Où est le bug ?",
          code: "for (let i = 1; i < nums.length; i++)",
          options: [
            "`i < nums.length` devrait être `i <= nums.length`",
            "`let i = 1` devrait être `let i = 0`",
            "`i++` devrait être `i--`"
          ],
          correct: 1,
          explain: "Les index commencent à **0**. En partant de 1, on saute le premier élément. Attention : `<=` serait aussi un bug (on lirait `nums[3]`, qui n'existe pas)."
        },
        {
          type: "cloze",
          sentence: "Un ___ met le programme en pause sur une ligne pour inspecter les variables.",
          options: ["breakpoint", "commit", "callback"],
          correct: 0,
          why: [
            "",
            "Un commit est une photo du projet dans Git.",
            "Un callback est une fonction donnée à une autre fonction."
          ]
        },
        {
          type: "qcm",
          q: "Face à un bug, que fais-tu en premier ?",
          options: [
            "Je demande directement la correction à une IA",
            "Je lis le message d'erreur et je regarde quelle ligne pose problème",
            "Je réécris tout le fichier"
          ],
          correct: 1,
          explain: "D'abord **observer** : lire le type d'erreur, le message, la ligne. Souvent, la réponse est déjà écrite dedans."
        }
      ]
    },
    {
      id: "nommage",
      title: "Bien nommer",
      sub: "Lisibilité, conventions, nombre magique",
      steps: [
        {
          type: "concept",
          term: "Lisibilité",
          def: "À quel point un **humain** comprend vite le code. Le code est lu bien plus souvent qu'il n'est écrit.",
          code: `// peu lisible
const d = u.filter(x => x.a > 17);
// lisible
const adults = users.filter(user => user.age > 17);`,
          phrase: "On renomme pour améliorer la lisibilité."
        },
        {
          type: "concept",
          term: "camelCase",
          def: "La convention de nommage en JavaScript : premier mot en minuscule, puis **chaque mot suivant commence par une majuscule**.",
          code: `let totalPrice;      // ✅ camelCase
let total_price;     // snake_case (Python)
class UserService {} // PascalCase (pour les classes)`,
          phrase: "On respecte la convention camelCase."
        },
        {
          type: "concept",
          term: "Nommer une fonction",
          def: "Une fonction **fait une action** : on la nomme avec un **verbe**. Une variable **contient quelque chose** : on la nomme avec un **nom**.",
          code: `function getUser() {}      // verbe : get
function calculateTotal() {}
const userList = [];       // nom`,
          phrase: "La fonction est nommée par un verbe qui décrit son action."
        },
        {
          type: "concept",
          term: "Nombre magique",
          def: "Un nombre écrit directement dans le code, **sans explication**. On le remplace par une constante avec un nom.",
          code: `if (age >= 18) {}          // 18 = pourquoi ?
const MAJORITY_AGE = 18;
if (age >= MAJORITY_AGE) {} // ✅ clair`,
          phrase: "On extrait le nombre magique dans une constante nommée."
        },
        {
          type: "qcm",
          q: "Quel est le meilleur nom pour une fonction qui envoie un email de bienvenue ?",
          options: [
            "`email()`",
            "`sendWelcomeEmail()`",
            "`doStuff()`",
            "`welcomeEmailData`"
          ],
          correct: 1,
          explain: "**sendWelcomeEmail** : un verbe (send), en camelCase, qui dit exactement ce que fait la fonction."
        },
        {
          type: "qcm",
          q: "Lequel est écrit en camelCase ?",
          options: [
            "`user_name`",
            "`UserName`",
            "`userName`",
            "`USERNAME`"
          ],
          correct: 2,
          explain: "**userName** : premier mot en minuscule, les suivants commencent par une majuscule."
        },
        {
          type: "cloze",
          sentence: "`if (age >= 18)` : 18 est un nombre ___ qu'on devrait mettre dans une constante.",
          options: ["magique", "primitif", "privé"],
          correct: 0,
          why: [
            "",
            "C'est bien une valeur primitive, mais le problème ici est qu'il n'a **pas de nom** : on dit nombre magique.",
            "Privé concerne la visibilité dans une classe."
          ]
        }
      ]
    },
    {
      id: "refacto",
      title: "Refactoriser",
      sub: "Refactoring, duplication, dette technique",
      steps: [
        {
          type: "concept",
          term: "Refactoring",
          def: "**Ranger** le code sans changer ce qu'il fait. Même entrées, même résultat, mais plus clair.",
          rule: "Si le comportement change, ce n'est **pas** un refactoring : c'est une modification.",
          phrase: "On refactorise cette fonction pour la rendre plus lisible."
        },
        {
          type: "concept",
          term: "Duplication",
          def: "Le même code **copié-collé** à plusieurs endroits. Si on doit le corriger, il faut penser à tous les endroits. Le principe **DRY** (Don't Repeat Yourself) dit : évite de te répéter.",
          code: `const prixA = 100 + 100 * 0.2;
const prixB = 50 + 50 * 0.2;    // même calcul copié`,
          phrase: "Il y a de la duplication : appliquons DRY."
        },
        {
          type: "concept",
          term: "Extraire une fonction",
          def: "Le refactoring le plus courant : prendre un morceau de code répété, le mettre dans une fonction avec un bon nom, et l'appeler.",
          code: `function addTax(price) {
  return price + price * 0.2;
}
const prixA = addTax(100);
const prixB = addTax(50);`,
          phrase: "On extrait le calcul dans une fonction addTax."
        },
        {
          type: "concept",
          term: "Dette technique",
          def: "Le **coût futur** d'un raccourci pris aujourd'hui. Comme un crédit : aller vite maintenant, payer plus tard en temps de correction.",
          phrase: "Ce copier-coller crée de la dette technique."
        },
        {
          type: "qcm",
          q: "Est-ce un refactoring ?",
          code: `// avant
function total(a, b) { return a + b; }
// après
function total(a, b) { return a + b + 1; }`,
          options: ["Oui", "Non"],
          correct: 1,
          explain: "Le résultat **change** (`total(2, 3)` donnait 5, maintenant 6). Ce n'est pas un refactoring, c'est une modification du comportement."
        },
        {
          type: "qcm",
          q: "Ton collègue copie-colle 5 fois le même calcul pour aller plus vite. Quel mot décrit le mieux le problème ?",
          options: ["De la dette technique", "Une boucle infinie", "Une fonction pure"],
          correct: 0,
          explain: "Il gagne du temps aujourd'hui, mais chaque correction future devra être faite 5 fois : c'est de la **dette technique**."
        },
        {
          type: "cloze",
          sentence: "Changer la forme du code sans changer son comportement, c'est du ___.",
          options: ["refactoring", "debug", "déploiement"],
          correct: 0,
          why: ["", "Déboguer, c'est corriger un comportement faux.", "Déployer, c'est mettre en ligne."]
        }
      ]
    },
    {
      id: "tests",
      title: "Tester son code",
      sub: "Test unitaire, assertion, cas limite",
      steps: [
        {
          type: "concept",
          term: "Test unitaire",
          def: "Un petit programme qui vérifie **une seule fonction** : on lui donne une entrée connue et on vérifie la sortie.",
          code: `function add(a, b) { return a + b; }

test("add additionne", () => {
  expect(add(2, 3)).toBe(5);   // ✅ vert
});`,
          phrase: "On écrit un test unitaire pour la fonction add."
        },
        {
          type: "concept",
          term: "Assertion",
          def: "La ligne qui **vérifie** : « je m'attends à ce que ce résultat soit égal à ça ». Si c'est faux, le test devient rouge.",
          code: `expect(add(2, 3)).toBe(5);
//     résultat      attendu`,
          phrase: "L'assertion échoue : on attendait 5 et on a reçu 6."
        },
        {
          type: "qcm",
          q: "Quel test échoue ?",
          code: `function double(n) {
  return n + 2;     // bug !
}
expect(double(2)).toBe(4);   // test A
expect(double(3)).toBe(6);   // test B`,
          options: ["Le test A", "Le test B", "Les deux"],
          correct: 1,
          explain: "`double(2)` = 2 + 2 = 4 → A passe **par hasard**. `double(3)` = 3 + 2 = 5, pas 6 → **B échoue**. Un seul test ne suffit pas !"
        },
        {
          type: "concept",
          term: "Cas limite",
          def: "Une entrée **au bord** de ce qui est prévu : tableau vide, 0, nombre négatif, `null`, texte vide. C'est là que se cachent les bugs.",
          code: `average([])     // tableau vide ?
average([0])    // un seul élément ?
average(null)   // pas de tableau du tout ?`,
          phrase: "Il faut tester le cas limite du tableau vide."
        },
        {
          type: "predict",
          q: "Que retourne `average([])` ?",
          code: `function average(nums) {
  let total = 0;
  for (const n of nums) {
    total = total + n;
  }
  return total / nums.length;
}`,
          answers: ["NaN"],
          hint: "Avec un tableau vide, total vaut 0 et `nums.length` vaut 0. Que donne `0 / 0` en JavaScript ?",
          explain: "`0 / 0` donne **NaN** (Not a Number, « pas un nombre »). C'est un bug de cas limite : il faudrait traiter le tableau vide à part."
        },
        {
          type: "concept",
          term: "Régression",
          def: "Un bug qui **réapparaît** dans quelque chose qui marchait avant, à cause d'une nouvelle modification. Les tests servent à les détecter tout de suite.",
          phrase: "Ce commit a introduit une régression, les tests sont rouges."
        },
        {
          type: "cloze",
          sentence: "Un tableau vide passé à une fonction est un cas ___.",
          options: ["limite", "d'utilisation", "de test unitaire"],
          correct: 0,
          why: [
            "",
            "Un cas d'utilisation est une action d'un utilisateur (UML).",
            "Un test unitaire vérifie une fonction. Le tableau vide est le **cas** testé."
          ]
        }
      ]
    },
    {
      id: "complexite",
      title: "La complexité",
      sub: "O(1), O(n), O(n²)",
      steps: [
        {
          type: "concept",
          term: "Complexité algorithmique",
          def: "Comment le **temps de calcul grandit** quand les données grandissent. On l'écrit avec la notation « grand O ».",
          phrase: "Quelle est la complexité de cet algorithme ?"
        },
        {
          type: "concept",
          term: "O(1)",
          def: "**Temps constant** : 1 opération, que le tableau ait 10 ou 1 million d'éléments.",
          code: "nums[0]   // lire une case : toujours 1 opération",
          phrase: "L'accès par index est en O(1)."
        },
        {
          type: "concept",
          term: "O(n)",
          def: "**Temps linéaire** : une boucle sur n éléments = n opérations. 2× plus de données = 2× plus long.",
          code: `for (const n of nums) {   // n tours
  console.log(n);
}`,
          phrase: "Parcourir le tableau est en O(n)."
        },
        {
          type: "concept",
          term: "O(n²)",
          def: "**Temps quadratique** : une boucle **dans** une boucle. Pour n éléments, n × n opérations. Ça explose vite.",
          code: `for (const a of nums) {
  for (const b of nums) {   // n tours, n fois
    compare(a, b);
  }
}`,
          phrase: "Deux boucles imbriquées : on est en O(n²)."
        },
        {
          type: "trace",
          intro: "Calcule le nombre d'opérations pour chaque taille de tableau.",
          code: `// O(n)  : une boucle         → n opérations
// O(n²) : boucle dans boucle → n × n opérations`,
          cols: ["n éléments", "O(n)", "O(n²)"],
          rows: [
            {
              c: [
                "10",
                {a:"10"},
                {a:"100"}
              ],
              hint: "O(n) : 10. O(n²) : 10 × 10 = 100."
            },
            {
              c: [
                "100",
                {a:"100"},
                {a:"10000"}
              ],
              hint: "O(n) : 100. O(n²) : 100 × 100 = 10 000."
            },
            {
              c: [
                "1000",
                {a:"1000"},
                {a:"1000000"}
              ],
              hint: "O(n) : 1 000. O(n²) : 1 000 × 1 000 = 1 000 000."
            }
          ],
          after: "Avec 1 000 éléments, O(n²) fait **mille fois** plus d'opérations que O(n)."
        },
        {
          type: "qcm",
          q: "Quelle est la complexité de ce code ?",
          code: `function hasDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}`,
          options: ["O(1)", "O(n)", "O(n²)"],
          correct: 2,
          explain: "Une boucle **dans** une boucle, chacune sur le tableau : **O(n²)**."
        },
        {
          type: "cloze",
          sentence: "Une boucle dans une boucle sur le même tableau a une complexité en ___.",
          options: ["O(n²)", "O(1)", "O(n)"],
          correct: 0,
          why: ["", "O(1), c'est un temps constant (une seule opération).", "O(n), c'est une seule boucle."]
        }
      ]
    }
  ]
};
