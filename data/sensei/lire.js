// Vocabulaire Sensei - chapitre "Lire et décrire le code" : 6 lecons, 27 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "lire",
  title: "Lire et décrire le code",
  goal: "Faire tourner le code dans ta tête et nommer chaque morceau.",
  lessons: [
    {
      id: "affect",
      title: "Ranger une valeur",
      sub: "Variable, affectation, constante",
      steps: [
        {
          type: "concept",
          term: "Variable",
          def: "Une **boîte** avec un nom écrit dessus. Dedans, il y a une valeur.",
          code: {
            js: "let age = 34;   // la boîte « age » contient 34",
            py: "age = 34   # la boîte « age » contient 34",
            rs: "let age = 34;   // la boîte « age » contient 34"
          },
          phrase: "On déclare une variable age, initialisée à 34."
        },
        {
          type: "concept",
          term: "Affectation",
          def: {
            js: "En code, `=` est un **ordre** : « mets dans la boîte de gauche le résultat de droite ». Ce n'est pas « égal » comme en maths.",
            py: "En code, `=` est un **ordre** : « mets dans la boîte de gauche le résultat de droite ». Ce n'est pas « égal » comme en maths.",
            rs: "En code, `=` est un **ordre** : « mets dans la boîte de gauche le résultat de droite ». En Rust, la boîte doit être déclarée avec `mut` pour pouvoir changer."
          },
          code: {
            js: `let x = 5;   // la boîte x contient 5
x = x + 1;   // la boîte x contient maintenant 6`,
            py: `x = 5       # la boîte x contient 5
x = x + 1   # la boîte x contient maintenant 6`,
            rs: `let mut x = 5;   // mut : la boîte peut changer
x = x + 1;       // la boîte x contient maintenant 6`
          },
          rule: "Lis `x = x + 1` comme « x **devient** x + 1 ». L'ordinateur fait 2 choses, dans cet ordre : **1.** il calcule la droite avec ce qu'il y a dans la boîte : `5 + 1` = 6. **2.** il met 6 dans la boîte x. Le 5 est effacé.",
          phrase: "On affecte 6 à x. (Affecter = donner une valeur à une variable.)"
        },
        {
          type: "label",
          intro: "Touche le bon nom pour chaque morceau surligné.",
          code: {
            js: `let prix = 10;
prix = prix * 2;`,
            py: `prix = 10
prix = prix * 2`,
            rs: `let mut prix = 10;
prix = prix * 2;`
          },
          options: ["variable", "valeur", "affectation", "opérateur"],
          marks: [
            {line:1, text:"prix", answer:"variable", why:"`prix` est le nom de la boîte : c'est une variable."},
            {line:1, text:"10", answer:"valeur", why:"`10` est ce qu'on met dans la boîte : une valeur."},
            {line:2, text:"=", answer:"affectation", why:"`=` met le résultat dans la boîte : c'est l'affectation."},
            {line:2, text:"*", answer:"opérateur", why:"`*` fait un calcul (multiplier) : c'est un opérateur."}
          ],
          traps: ["constante", "comparaison"]
        },
        {
          type: "cloze",
          sentence: "Dans `x = x + 1`, le signe `=` sert à ___ une valeur dans x.",
          options: ["comparer", "ranger", "additionner"],
          correct: 1,
          why: [
            "Comparer, c'est le rôle de `===` en JS, ou de `==` en Python et Rust. `=` ne compare jamais.",
            "",
            "Additionner, c'est le rôle de `+`. Le `=` vient après : il range le résultat."
          ]
        },
        {
          type: "qcm",
          q: "Que contient la boîte `a` à la fin ?",
          code: {
            js: `let a = 5;
a = a + 2;`,
            py: `a = 5
a = a + 2`,
            rs: `let mut a = 5;
a = a + 2;`
          },
          options: ["5", "7", "2", "Erreur"],
          correct: 1,
          explain: "**1.** On calcule la droite : `a + 2` → `5 + 2` → 7. **2.** On met 7 dans `a`."
        },
        {
          type: "trace",
          intro: "Note ce que contient la boîte `x` après chaque ligne.",
          code: {
            js: `let x = 3;
x = x * 2;
x = x - 1;
console.log(x);`,
            py: `x = 3
x = x * 2
x = x - 1
print(x)`,
            rs: `let mut x = 3;
x = x * 2;
x = x - 1;
println!("{}", x);`
          },
          cols: ["Ligne", "Calcul", "x"],
          rows: [
            {c:["1", "on met 3", "3"]},
            {
              c: [
                "2",
                "x * 2 → 3 * 2",
                {a:"6"}
              ],
              hint: "La boîte x contient 3. `3 * 2` = 6."
            },
            {
              c: [
                "3",
                "x - 1 → 6 - 1",
                {a:"5"}
              ],
              hint: "La boîte x contient maintenant 6. `6 - 1` = 5."
            }
          ],
          after: "La ligne 4 affiche ce que contient x : **5**."
        },
        {
          type: "concept",
          term: "Constante",
          def: {
            js: "Une boîte **scellée** : déclarée avec `const`, on ne peut plus changer ce qu'il y a dedans.",
            py: "Une boîte **scellée**. Python n'a pas de vraie constante : par convention, on écrit son nom en MAJUSCULES pour dire « n'y touche pas ».",
            rs: "Une boîte **scellée**. En Rust, une variable `let` sans `mut` est déjà non modifiable. `const` sert aux valeurs fixes de tout le programme."
          },
          code: {
            js: `const taux = 0.2;
taux = 0.5;   // ❌ erreur : taux est une constante`,
            py: "TAUX = 0.2   # constante par convention",
            rs: `const TAUX: f64 = 0.2;
let x = 5;
x = 6;   // ❌ erreur : x n'est pas mut`
          },
          phrase: "taux est une constante : on ne peut pas la réaffecter."
        },
        {
          type: "build",
          intro: "Remets les étiquettes dans l'ordre pour décrire ce code comme un dev.",
          code: {js:"let total = 0;", py:"total = 0", rs:"let mut total = 0;"},
          answer: ["On déclare", "une variable", "total", "initialisée à", "0"],
          distractors: ["une fonction", "égale à"],
          explain: "« Initialisée à » est plus précis que « égale à » : on **met** 0 dans la boîte, on ne compare pas."
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: {
            js: `let n = 10;
n = n - 4;
n = n * 2;
console.log(n);`,
            py: `n = 10
n = n - 4
n = n * 2
print(n)`,
            rs: `let mut n = 10;
n = n - 4;
n = n * 2;
println!("{}", n);`
          },
          answers: ["12"],
          hint: "Une ligne à la fois : la boîte n contient 10, puis `10 - 4`, puis le résultat fois 2.",
          explain: "10 → `10 - 4` = 6 → `6 * 2` = **12**."
        },
        {
          type: "explain",
          q: "Décris ce code avec tes mots. Essaie d'utiliser : variable, affecte, valeur, affiche.",
          code: {
            js: `let prix = 10;
prix = prix * 2;
console.log(prix);`,
            py: `prix = 10
prix = prix * 2
print(prix)`,
            rs: `let mut prix = 10;
prix = prix * 2;
println!("{}", prix);`
          },
          keywords: ["variable", "affecte", "valeur", "affiche"],
          model: "On déclare une variable prix, initialisée à 10. Ensuite, on lui affecte sa valeur actuelle multipliée par 2 : prix contient maintenant 20. Enfin, on affiche sa valeur : 20."
        }
      ]
    },
    {
      id: "boucle",
      title: "Tourner en boucle",
      sub: "Itération, incrémenter, condition d'arrêt",
      steps: [
        {
          type: "concept",
          term: "Boucle",
          def: "Un bloc de code qui se **répète**. Il recommence tant qu'il reste des tours à faire.",
          code: {
            js: `for (let i = 1; i <= 3; i++) {
  console.log(i);
}
// affiche 1, puis 2, puis 3`,
            py: `for i in range(1, 4):
    print(i)
# affiche 1, puis 2, puis 3`,
            rs: `for i in 1..=3 {
    println!("{}", i);
}
// affiche 1, puis 2, puis 3`
          },
          phrase: "On parcourt une boucle de 1 à 3."
        },
        {
          type: "concept",
          term: "Itération",
          def: "**Un tour** de boucle. L'exemple au-dessus fait 3 tours : 3 itérations.",
          phrase: "À chaque itération, on ajoute i au total."
        },
        {
          type: "concept",
          term: "Incrémenter",
          def: {
            js: "Ajouter 1 à une variable. `i++` veut dire exactement `i = i + 1`. Enlever 1 (`i--`), c'est **décrémenter**.",
            py: "Ajouter 1 à une variable. `i += 1` veut dire `i = i + 1` (Python n'a pas de `++`). Enlever 1, c'est **décrémenter**.",
            rs: "Ajouter 1 à une variable. `i += 1` veut dire `i = i + 1` (Rust n'a pas de `++`). Enlever 1, c'est **décrémenter**."
          },
          code: {
            js: `let i = 4;
i++;   // i contient maintenant 5`,
            py: `i = 4
i += 1   # i contient maintenant 5`,
            rs: `let mut i = 4;
i += 1;   // i contient maintenant 5`
          },
          phrase: "On incrémente le compteur à la fin de chaque tour."
        },
        {
          type: "concept",
          term: "Condition d'arrêt",
          def: "Ce qui décide **quand la boucle s'arrête**. Tant qu'elle n'est pas atteinte, on refait un tour.",
          code: {
            js: `for (let i = 1; i <= 3; i++)
//   ①départ   ②test   ③après le tour`,
            py: `for i in range(1, 4):
# range(1, 4) donne 1, 2, 3 : le 4 est EXCLU`,
            rs: `for i in 1..=3 {   // 1 à 3, 3 INCLUS
for i in 1..3 {    // 1 et 2 : le 3 est EXCLU`
          },
          rule: {
            js: "Un `for` a 3 parties séparées par `;`. **①** le départ, fait une seule fois. **②** le test, avant chaque tour : faux → on sort. **③** ce qu'on fait après chaque tour (ici `i++`).",
            py: "`range(début, fin)` : **la fin est exclue**. `range(1, 4)` donne 1, 2, 3. La boucle s'arrête quand il n'y a plus de valeurs.",
            rs: "`1..=3` : 3 est **inclus**. `1..3` : 3 est **exclu**. La boucle s'arrête quand il n'y a plus de valeurs."
          },
          phrase: "La boucle s'arrête quand i dépasse 3."
        },
        {
          type: "label",
          intro: "Nomme chaque partie de la boucle.",
          code: {
            js: `for (let i = 1; i <= 3; i++) {
  total = total + i;
}`,
            py: `for i in range(1, 4):
    total = total + i`,
            rs: `for i in 1..=3 {
    total = total + i;
}`
          },
          options: {
            js: ["départ", "condition d'arrêt", "incrémentation", "corps de la boucle"],
            py: ["compteur de boucle", "valeurs parcourues", "corps de la boucle", "condition"],
            rs: ["compteur de boucle", "valeurs parcourues", "corps de la boucle", "condition"]
          },
          marks: {
            js: [
              {
                line: 1,
                text: "let i = 1",
                answer: "départ",
                why: "`let i = 1` est fait une seule fois, au début : c'est le départ."
              },
              {
                line: 1,
                text: "i <= 3",
                answer: "condition d'arrêt",
                why: "`i <= 3` est testé avant chaque tour : quand c'est faux, on s'arrête."
              },
              {
                line: 1,
                text: "i++",
                answer: "incrémentation",
                why: "`i++` ajoute 1 après chaque tour : c'est l'incrémentation."
              },
              {
                line: 2,
                text: "total = total + i",
                answer: "corps de la boucle",
                why: "Ce qui est entre les accolades est répété : c'est le corps de la boucle."
              }
            ],
            py: [
              {
                line: 1,
                text: "i",
                answer: "compteur de boucle",
                why: "`i` prend une nouvelle valeur à chaque tour : c'est le compteur."
              },
              {line:1, text:"range(1, 4)", answer:"valeurs parcourues", why:"`range(1, 4)` fournit les valeurs 1, 2, 3."},
              {
                line: 2,
                text: "total = total + i",
                answer: "corps de la boucle",
                why: "La ligne indentée sous le `for` est répétée : c'est le corps."
              }
            ],
            rs: [
              {
                line: 1,
                text: "i",
                answer: "compteur de boucle",
                why: "`i` prend une nouvelle valeur à chaque tour : c'est le compteur."
              },
              {line:1, text:"1..=3", answer:"valeurs parcourues", why:"`1..=3` fournit les valeurs 1, 2, 3."},
              {
                line: 2,
                text: "total = total + i",
                answer: "corps de la boucle",
                why: "Ce qui est entre les accolades est répété : c'est le corps."
              }
            ]
          },
          traps: {js:["décrémentation", "itération"], py:["incrémentation", "itération"], rs:["incrémentation", "itération"]}
        },
        {
          type: "trace",
          intro: "Remplis une ligne par tour. Attention : le test regarde `i`, pas `total`.",
          code: `let total = 0;
for (let i = 1; i <= 3; i++) {
  total = total + i;
}
console.log(total);`,
          cols: ["Tour", "i", "i <= 3 ?", "total"],
          rows: [
            {c:["départ", "—", "—", "0"]},
            {
              c: [
                "1",
                "1",
                {a:"oui", yn:1},
                {a:"1"}
              ],
              hint: "`i` vaut 1. `1 <= 3` → oui. `total = 0 + 1` = 1."
            },
            {
              c: [
                "2",
                {a:"2"},
                {a:"oui", yn:1},
                {a:"3"}
              ],
              hint: "`i++` → `i` vaut 2. `2 <= 3` → oui. `total = 1 + 2` = 3."
            },
            {
              c: [
                "3",
                {a:"3"},
                {a:"oui", yn:1},
                {a:"6"}
              ],
              hint: "`i` vaut 3. `3 <= 3` → oui (3 est égal à 3). `total = 3 + 3` = 6."
            },
            {
              c: [
                "4",
                {a:"4"},
                {a:"non", yn:1},
                "—"
              ],
              hint: "`i` vaut 4. `4 <= 3` → non : on sort de la boucle."
            }
          ],
          after: "La boucle s'arrête. On affiche `total` : **6**."
        },
        {
          type: "trace",
          intro: "Même structure. Ici `x` diminue. À chaque tour, on repart de ce que contient la boîte x.",
          code: `let x = 10;
for (let i = 1; i <= 3; i++) {
  x = x - i;
}
console.log(x);`,
          cols: ["Tour", "i", "i <= 3 ?", "x"],
          rows: [
            {c:["départ", "—", "—", "10"]},
            {
              c: [
                "1",
                "1",
                {a:"oui", yn:1},
                {a:"9"}
              ],
              hint: "`x = x - i` → `x = 10 - 1` → 9."
            },
            {
              c: [
                "2",
                {a:"2"},
                {a:"oui", yn:1},
                {a:"7"}
              ],
              hint: "La boîte x contient 9, `i` vaut 2 : `9 - 2` = 7."
            },
            {
              c: [
                "3",
                {a:"3"},
                {a:"oui", yn:1},
                {a:"4"}
              ],
              hint: "La boîte x contient 7, `i` vaut 3 : `7 - 3` = 4."
            },
            {
              c: [
                "4",
                {a:"4"},
                {a:"non", yn:1},
                "—"
              ],
              hint: "`4 <= 3` → non : on sort."
            }
          ],
          after: "On affiche `x` : **4**."
        },
        {
          type: "cloze",
          sentence: "Une boucle qui fait 3 tours fait 3 ___.",
          options: ["itérations", "incrémentations", "conditions"],
          correct: 0,
          why: [
            "",
            "Incrémenter, c'est ajouter 1 au compteur. Ça arrive à chaque tour, mais **un tour** s'appelle une itération.",
            "La condition est le test qui décide si on continue. Il n'y en a qu'une, vérifiée à chaque tour."
          ]
        },
        {
          type: "qcm",
          q: "Combien d'itérations fait cette boucle ?",
          code: {
            js: "for (let i = 0; i < 3; i++) { }",
            py: `for i in range(3):
    pass`,
            rs: "for i in 0..3 { }"
          },
          options: ["2", "3", "4"],
          correct: 1,
          explain: "`i` prend les valeurs 0, puis 1, puis 2. Ensuite on s'arrête. Donc **3** tours."
        },
        {
          type: "build",
          intro: "Décris la boucle `total` comme un dev.",
          code: {
            js: `for (let i = 1; i <= 3; i++) {
  total = total + i;
}`,
            py: `for i in range(1, 4):
    total = total + i`,
            rs: `for i in 1..=3 {
    total = total + i;
}`
          },
          answer: ["On parcourt", "les nombres de 1 à 3", "et à chaque itération", "on ajoute i", "à total"],
          distractors: ["on compare i", "à la fonction"]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: {
            js: `let count = 0;
for (let i = 0; i < 5; i++) {
  count = count + 2;
}
console.log(count);`,
            py: `count = 0
for i in range(5):
    count = count + 2
print(count)`,
            rs: `let mut count = 0;
for i in 0..5 {
    count = count + 2;
}
println!("{}", count);`
          },
          answers: ["10"],
          hint: "Compte d'abord les tours (i = 0, 1, 2, 3, 4), puis ajoute 2 à chaque tour.",
          explain: "5 tours, +2 à chaque fois : 2, 4, 6, 8, **10**."
        },
        {
          type: "explain",
          q: "Décris ce code avec tes mots. Essaie d'utiliser : variable, boucle, itération, affiche.",
          code: {
            js: `let total = 0;
for (let i = 1; i <= 3; i++) {
  total = total + i;
}
console.log(total);`,
            py: `total = 0
for i in range(1, 4):
    total = total + i
print(total)`,
            rs: `let mut total = 0;
for i in 1..=3 {
    total = total + i;
}
println!("{}", total);`
          },
          keywords: ["variable", "boucle", "itération", "affiche"],
          model: "On initialise une variable total à 0. La boucle parcourt i de 1 à 3. À chaque itération, on ajoute i à total. À la fin, on affiche total, qui vaut 6."
        }
      ]
    },
    {
      id: "fonction",
      title: "Les fonctions",
      sub: "Paramètre, argument, valeur de retour",
      steps: [
        {
          type: "concept",
          term: "Fonction",
          def: {
            js: "Une **recette** avec un nom. On l'écrit une fois, puis on peut l'utiliser autant de fois qu'on veut.",
            py: "Une **recette** avec un nom. On l'écrit une fois (avec `def`), puis on peut l'utiliser autant de fois qu'on veut.",
            rs: "Une **recette** avec un nom. On l'écrit une fois (avec `fn`), puis on peut l'utiliser autant de fois qu'on veut. En Rust, on précise le type des paramètres et du résultat."
          },
          code: {
            js: `function double(n) {
  return n * 2;
}
double(3);   // 6
double(10);  // 20`,
            py: `def double(n):
    return n * 2

double(3)    # 6
double(10)   # 20`,
            rs: `fn double(n: i32) -> i32 {
    n * 2
}

double(3);   // 6
double(10);  // 20`
          },
          phrase: "On déclare une fonction double."
        },
        {
          type: "concept",
          term: "Paramètre",
          def: "Le nom entre parenthèses quand on **écrit** la fonction. C'est une boîte vide qui attend une valeur.",
          code: {
            js: `function double(n) {   // n est le paramètre
  return n * 2;
}`,
            py: `def double(n):   # n est le paramètre
    return n * 2`,
            rs: `fn double(n: i32) -> i32 {   // n est le paramètre (de type i32)
    n * 2
}`
          },
          phrase: "La fonction prend un paramètre n."
        },
        {
          type: "concept",
          term: "Argument",
          def: "La vraie valeur entre parenthèses quand on **utilise** la fonction. Elle est mise dans la boîte du paramètre.",
          code: {
            js: "double(3);   // 3 est l'argument → n reçoit 3",
            py: "double(3)   # 3 est l'argument → n reçoit 3",
            rs: "double(3);   // 3 est l'argument → n reçoit 3"
          },
          rule: "**Paramètre** = le nom, quand on écrit la fonction (`n`). **Argument** = la valeur, quand on l'utilise (`3`).",
          phrase: "On appelle double avec l'argument 3."
        },
        {
          type: "concept",
          term: "Valeur de retour",
          def: {
            js: "Ce que `return` renvoie. Le résultat **remplace** l'appel, là où on l'a écrit. Après `return`, la fonction s'arrête.",
            py: "Ce que `return` renvoie. Le résultat **remplace** l'appel, là où on l'a écrit. Après `return`, la fonction s'arrête.",
            rs: "Le résultat renvoyé par la fonction. En Rust, c'est la **dernière ligne sans point-virgule** (ou un `return`). Le résultat **remplace** l'appel."
          },
          code: {
            js: `const r = double(3);
// double(3) est remplacé par 6
// donc : const r = 6;`,
            py: `r = double(3)
# double(3) est remplacé par 6
# donc : r = 6`,
            rs: `let r = double(3);
// double(3) est remplacé par 6
// donc : let r = 6;`
          },
          phrase: "La fonction retourne n multiplié par 2."
        },
        {
          type: "label",
          intro: "Nomme chaque morceau de la fonction.",
          code: {
            js: `function greet(name) {
  return "Salut " + name;
}
greet("Bob");`,
            py: `def greet(name):
    return "Salut " + name

greet("Bob")`,
            rs: `fn greet(name: &str) -> String {
    format!("Salut {}", name)
}

greet("Bob");`
          },
          options: ["nom de la fonction", "paramètre", "valeur de retour", "argument"],
          marks: {
            js: [
              {line:1, text:"greet", answer:"nom de la fonction", why:"`greet` est le nom qu'on donne à la recette."},
              {line:1, text:"name", answer:"paramètre", why:"`name` est dans la définition : c'est le paramètre."},
              {
                line: 2,
                text: "\"Salut \" + name",
                answer: "valeur de retour",
                why: "C'est ce que `return` renvoie : la valeur de retour."
              },
              {
                line: 4,
                text: "\"Bob\"",
                answer: "argument",
                why: "`\"Bob\"` est la valeur donnée à l'appel : c'est l'argument."
              }
            ],
            py: [
              {line:1, text:"greet", answer:"nom de la fonction", why:"`greet` est le nom qu'on donne à la recette."},
              {line:1, text:"name", answer:"paramètre", why:"`name` est dans la définition : c'est le paramètre."},
              {
                line: 2,
                text: "\"Salut \" + name",
                answer: "valeur de retour",
                why: "C'est ce que `return` renvoie : la valeur de retour."
              },
              {
                line: 4,
                text: "\"Bob\"",
                answer: "argument",
                why: "`\"Bob\"` est la valeur donnée à l'appel : c'est l'argument."
              }
            ],
            rs: [
              {line:1, text:"greet", answer:"nom de la fonction", why:"`greet` est le nom qu'on donne à la recette."},
              {line:1, text:"name", answer:"paramètre", why:"`name` est dans la définition : c'est le paramètre."},
              {
                line: 2,
                text: "format!(\"Salut {}\", name)",
                answer: "valeur de retour",
                why: "Dernière ligne sans point-virgule : c'est la valeur de retour."
              },
              {
                line: 5,
                text: "\"Bob\"",
                answer: "argument",
                why: "`\"Bob\"` est la valeur donnée à l'appel : c'est l'argument."
              }
            ]
          },
          traps: ["variable locale", "appel de fonction"]
        },
        {
          type: "cloze",
          sentence: "Dans `double(3)`, 3 est un ___.",
          options: ["paramètre", "argument", "retour"],
          correct: 1,
          why: [
            "Le paramètre, c'est le **nom** dans la définition : `n`. 3 est la **valeur** donnée à l'appel.",
            "",
            "La valeur de retour, c'est ce qui **ressort** (6), pas ce qu'on donne."
          ]
        },
        {
          type: "trace",
          intro: "Quand des appels sont l'un dans l'autre, on calcule **de l'intérieur vers l'extérieur**.",
          code: {
            js: `function double(n) {
  return n * 2;
}
const result = double(double(3));
console.log(result);`,
            py: `def double(n):
    return n * 2

result = double(double(3))
print(result)`,
            rs: `fn double(n: i32) -> i32 {
    n * 2
}

let result = double(double(3));
println!("{}", result);`
          },
          cols: ["Étape", "Appel", "n", "Retourne"],
          rows: [
            {
              c: [
                "1 (intérieur)",
                "double(3)",
                {a:"3"},
                {a:"6"}
              ],
              hint: "L'appel le plus à l'intérieur est `double(3)`. `n` reçoit 3, et `3 * 2` = 6."
            },
            {
              c: [
                "2 (extérieur)",
                {a:"double(6)"},
                {a:"6"},
                {a:"12"}
              ],
              hint: "Le 6 remplace `double(3)`. Il reste `double(6)`. `6 * 2` = 12."
            }
          ],
          after: "`result` vaut **12**."
        },
        {
          type: "cloze",
          sentence: "La fonction double ___ n multiplié par 2.",
          options: ["retourne", "affiche", "déclare"],
          correct: 0,
          why: [
            "",
            "Afficher, c'est montrer à l'écran (`console.log`, `print`). Ici rien ne s'affiche : la valeur est **renvoyée**.",
            "Déclarer, c'est créer une variable ou une fonction. Ici on **renvoie** un résultat."
          ]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: {
            js: `function add(a, b) {
  return a + b;
}
console.log(add(2, add(1, 1)));`,
            py: `def add(a, b):
    return a + b

print(add(2, add(1, 1)))`,
            rs: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

println!("{}", add(2, add(1, 1)));`
          },
          answers: ["4"],
          hint: "De l'intérieur vers l'extérieur : d'abord `add(1, 1)`.",
          explain: "`add(1, 1)` retourne 2. Il reste `add(2, 2)`, qui retourne **4**."
        },
        {
          type: "concept",
          term: "Fonction pure",
          def: "Une fonction qui **1.** donne toujours le même résultat avec les mêmes arguments, et **2.** ne touche à rien en dehors d'elle.",
          code: {
            js: `function double(n) { return n * 2; }
// double(3) donne 6 aujourd'hui, demain, toujours.`,
            py: `def double(n):
    return n * 2
# double(3) donne 6 aujourd'hui, demain, toujours.`,
            rs: `fn double(n: i32) -> i32 { n * 2 }
// double(3) donne 6 aujourd'hui, demain, toujours.`
          },
          phrase: "double est une fonction pure : pas d'effet de bord."
        },
        {
          type: "build",
          intro: "Décris la fonction double comme un dev.",
          code: {
            js: `function double(n) {
  return n * 2;
}`,
            py: `def double(n):
    return n * 2`,
            rs: `fn double(n: i32) -> i32 {
    n * 2
}`
          },
          answer: ["La fonction double", "prend un paramètre n", "et retourne", "n multiplié par 2"],
          distractors: ["affiche", "un argument n"],
          explain: "Dans la définition, `n` est un **paramètre** (pas un argument), et la fonction **retourne** (elle n'affiche rien)."
        },
        {
          type: "explain",
          q: "Décris ce code avec tes mots. Essaie d'utiliser : fonction, paramètre, retourne.",
          code: {
            js: `function calculatePrice(price, tax) {
  return price + price * tax;
}`,
            py: `def calculate_price(price, tax):
    return price + price * tax`,
            rs: `fn calculate_price(price: f64, tax: f64) -> f64 {
    price + price * tax
}`
          },
          keywords: ["fonction", "paramètre", "retourne", "pure"],
          model: "calculatePrice est une fonction qui prend deux paramètres, price et tax. Elle retourne le prix augmenté de la taxe. Elle ne modifie rien à l'extérieur : c'est une fonction pure."
        },
        {
          type: "senior",
          intro: "Un dev senior relit ta fonction et te pose deux questions.",
          code: {
            js: `function calculatePrice(price, tax) {
  return price + price * tax;
}`,
            py: `def calculate_price(price, tax):
    return price + price * tax`,
            rs: `fn calculate_price(price: f64, tax: f64) -> f64 {
    price + price * tax
}`
          },
          questions: [
            {
              q: {
                js: "Que se passe-t-il si on appelle `calculatePrice(100)` sans le deuxième argument ?",
                py: "Que se passe-t-il si on appelle `calculate_price(100)` sans le deuxième argument ?",
                rs: "Que se passe-t-il si on appelle `calculate_price(100.0)` sans le deuxième argument ?"
              },
              model: {
                js: "Le paramètre tax vaut undefined, donc price * tax donne NaN : la fonction retourne NaN, sans erreur visible. On pourrait donner une valeur par défaut au paramètre : tax = 0.2.",
                py: "Python lève une TypeError : il manque un argument obligatoire. On pourrait donner une valeur par défaut au paramètre : tax=0.2.",
                rs: "Le code ne compile pas : Rust exige tous les arguments. L'erreur est trouvée avant même l'exécution."
              },
              keywords: ["argument", "paramètre"]
            },
            {
              q: "Cette fonction est-elle pure ? Pourquoi ?",
              model: "Oui. Avec les mêmes arguments, elle retourne toujours le même résultat, et elle ne modifie rien en dehors d'elle : elle n'a pas d'effet de bord.",
              keywords: ["pure", "effet de bord", "même résultat"]
            }
          ]
        }
      ]
    },
    {
      id: "objet",
      title: "Objets et références",
      sub: "Objet, propriété, référence",
      steps: [
        {
          type: "concept",
          term: "Objet",
          def: {
            js: "Une **fiche** qui regroupe plusieurs informations. Chaque information a un nom (la clé) et une valeur.",
            py: "Une **fiche** qui regroupe plusieurs informations. En Python, la fiche la plus simple est le **dictionnaire** (`dict`) : chaque clé a une valeur.",
            rs: "Une **fiche** qui regroupe plusieurs informations. En Rust, on décrit la fiche avec une **struct** : chaque champ a un nom et un type."
          },
          code: {
            js: `const user = { name: "Bob", age: 34 };
//              clé : valeur`,
            py: `user = {"name": "Bob", "age": 34}
#        clé : valeur`,
            rs: `struct User { name: String, age: u32 }
let user = User { name: String::from("Bob"), age: 34 };`
          },
          phrase: "user est un objet avec deux propriétés."
        },
        {
          type: "concept",
          term: "Propriété",
          def: {
            js: "Une ligne de la fiche : une clé et sa valeur. On la lit avec un point.",
            py: "Une ligne de la fiche : une clé et sa valeur. Dans un dict, on la lit avec des crochets.",
            rs: "Une ligne de la fiche (un **champ**). On la lit avec un point."
          },
          code: {
            js: `user.age    // 34
user.name   // "Bob"`,
            py: `user["age"]    # 34
user["name"]   # "Bob"`,
            rs: `user.age    // 34
user.name   // "Bob"`
          },
          phrase: "On accède à la propriété age de user."
        },
        {
          type: "label",
          intro: "Nomme chaque morceau.",
          code: {
            js: `const user = { name: "Bob", age: 34 };
console.log(user.age);`,
            py: `user = {"name": "Bob", "age": 34}
print(user["age"])`,
            rs: `let user = User { name: String::from("Bob"), age: 34 };
println!("{}", user.age);`
          },
          options: ["la fiche (objet)", "clé", "valeur", "lecture d'une propriété"],
          marks: {
            js: [
              {line:1, text:"user", answer:"la fiche (objet)", why:"`user` désigne toute la fiche : l'objet."},
              {line:1, text:"name", answer:"clé", why:"`name` est le nom de l'information : la clé."},
              {line:1, text:"\"Bob\"", answer:"valeur", why:"`\"Bob\"` est l'information elle-même : la valeur."},
              {
                line: 2,
                text: "user.age",
                answer: "lecture d'une propriété",
                why: "`user.age` va lire la valeur de la clé age."
              }
            ],
            py: [
              {line:1, text:"user", answer:"la fiche (objet)", why:"`user` désigne toute la fiche : ici un dictionnaire."},
              {line:1, text:"\"name\"", answer:"clé", why:"`\"name\"` est le nom de l'information : la clé."},
              {line:1, text:"\"Bob\"", answer:"valeur", why:"`\"Bob\"` est l'information elle-même : la valeur."},
              {
                line: 2,
                text: "user[\"age\"]",
                answer: "lecture d'une propriété",
                why: "`user[\"age\"]` va lire la valeur de la clé age."
              }
            ],
            rs: [
              {line:1, text:"user", answer:"la fiche (objet)", why:"`user` désigne toute la fiche : une struct User."},
              {line:1, text:"name", answer:"clé", why:"`name` est le nom du champ : la clé."},
              {line:1, text:"String::from(\"Bob\")", answer:"valeur", why:"C'est l'information elle-même : la valeur."},
              {line:2, text:"user.age", answer:"lecture d'une propriété", why:"`user.age` va lire la valeur du champ age."}
            ]
          },
          traps: ["écriture d'une propriété", "méthode"]
        },
        {
          type: "concept",
          term: "Valeur primitive",
          def: "Une valeur simple : un nombre, un booléen (`true`/`false`). Avec `b = a`, on fait une **photocopie** de la valeur.",
          code: {
            js: `let a = 1;
let b = a;   // b reçoit une copie de 1
b = 5;       // a contient toujours 1`,
            py: `a = 1
b = a    # b reçoit une copie de 1
b = 5    # a contient toujours 1`,
            rs: `let a = 1;
let mut b = a;   // b reçoit une copie de 1
b = 5;           // a contient toujours 1`
          },
          phrase: "Les primitives sont copiées par valeur."
        },
        {
          type: "concept",
          term: "Référence",
          def: {
            js: "Avec un objet, `b = a` ne fait pas de photocopie : `a` et `b` sont **deux noms pour la même fiche**.",
            py: "Avec un dict ou une liste, `b = a` ne fait pas de photocopie : `a` et `b` sont **deux noms pour la même fiche**.",
            rs: "Une référence (`&` ou `&mut`) est un **deuxième nom** qui pointe vers la même fiche, sans la copier. (En Rust, `let b = a;` sur une fiche la **déplace** : voir le chapitre Rust.)"
          },
          code: {
            js: `const a = { count: 1 };
const b = a;     // même fiche, deux noms
b.count = 5;     // a.count vaut aussi 5`,
            py: `a = {"count": 1}
b = a              # même fiche, deux noms
b["count"] = 5     # a["count"] vaut aussi 5`,
            rs: `let mut a = Compteur { count: 1 };
let b = &mut a;   // b pointe vers la fiche a
b.count = 5;      // a.count vaut aussi 5`
          },
          rule: "Nombre, booléen → photocopie. Objet, dict, tableau → même fiche partagée.",
          phrase: "b est une référence vers le même objet que a."
        },
        {
          type: "cloze",
          sentence: "Avec un objet, `b = a` ne copie pas l'objet : b est une ___ vers le même objet.",
          options: ["référence", "constante", "fonction"],
          correct: 0,
          why: [
            "",
            "Une constante, c'est une boîte qu'on ne peut plus changer. Ça ne dit rien sur le partage de la fiche.",
            "Une fonction est une recette. Ici on parle de deux noms pour la même fiche."
          ]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: {
            js: `const a = { count: 1 };
const b = a;
b.count = 5;
console.log(a.count);`,
            py: `a = {"count": 1}
b = a
b["count"] = 5
print(a["count"])`,
            rs: `let mut a = Compteur { count: 1 };
let b = &mut a;
b.count = 5;
println!("{}", a.count);`
          },
          answers: ["5"],
          hint: "`a` et `b` désignent-ils deux fiches, ou une seule ?",
          explain: "Une seule fiche, deux noms. On la modifie par `b`, on la lit par `a` : **5**."
        },
        {
          type: "predict",
          q: "Et maintenant, avec un nombre ?",
          code: {
            js: `let a = 1;
let b = a;
b = 5;
console.log(a);`,
            py: `a = 1
b = a
b = 5
print(a)`,
            rs: `let a = 1;
let mut b = a;
b = 5;
println!("{}", a);`
          },
          answers: ["1"],
          hint: "Un nombre est une valeur primitive : `b = a` fait une photocopie.",
          explain: "`b` a reçu une **copie** de 1. Changer `b` ne touche pas `a` : **1**."
        },
        {
          type: "build",
          intro: "Décris la situation comme un dev.",
          code: {
            js: `const a = { count: 1 };
const b = a;`,
            py: `a = {"count": 1}
b = a`,
            rs: `let mut a = Compteur { count: 1 };
let b = &mut a;`
          },
          answer: ["a et b", "sont deux références", "vers le même objet"],
          distractors: ["deux copies", "du même nombre"]
        },
        {
          type: "explain",
          q: "Décris ce code. Essaie d'utiliser : objet, propriété, référence.",
          code: {
            js: `const panier = { total: 0 };
const p = panier;
p.total = 50;
console.log(panier.total);`,
            py: `panier = {"total": 0}
p = panier
p["total"] = 50
print(panier["total"])`,
            rs: `let mut panier = Panier { total: 0 };
let p = &mut panier;
p.total = 50;
println!("{}", panier.total);`
          },
          keywords: ["objet", "propriété", "référence", "même objet"],
          model: "panier référence un objet avec une propriété total à 0. p n'est pas une copie : c'est une deuxième référence vers le même objet. Modifier la propriété total par p modifie donc panier, et on affiche 50."
        }
      ]
    },
    {
      id: "tableau",
      title: "Tableaux et callbacks",
      sub: "Index, callback, filter, map",
      steps: [
        {
          type: "concept",
          term: "Tableau",
          def: {
            js: "Une **liste rangée** de valeurs, entre crochets. En anglais : Array.",
            py: "Une **liste rangée** de valeurs, entre crochets. En Python, on dit une **liste** (`list`).",
            rs: "Une **liste rangée** de valeurs. En Rust, la liste qui peut grandir s'appelle un **Vec**."
          },
          code: {js:"const nums = [4, 7, 10, 3];", py:"nums = [4, 7, 10, 3]", rs:"let nums = vec![4, 7, 10, 3];"},
          phrase: "nums référence un tableau de nombres."
        },
        {
          type: "concept",
          term: "Index",
          def: "Le **numéro de place** d'un élément dans un tableau. On commence à compter à **0**.",
          code: {
            js: `const nums = [4, 7, 10, 3];
//  index :   0  1   2  3
nums[0]   // 4
nums[1]   // 7`,
            py: `nums = [4, 7, 10, 3]
#  index : 0  1   2  3
nums[0]   # 4
nums[1]   # 7`,
            rs: `let nums = vec![4, 7, 10, 3];
//    index :   0  1   2  3
nums[0]   // 4
nums[1]   // 7`
          },
          phrase: "L'élément à l'index 0 est 4."
        },
        {
          type: "concept",
          term: "length",
          def: {
            js: "Le **nombre d'éléments** dans un tableau : `nums.length`. Le dernier index est toujours `length - 1`.",
            py: "Le **nombre d'éléments** dans une liste : `len(nums)`. Le dernier index est toujours `len(nums) - 1`.",
            rs: "Le **nombre d'éléments** dans un Vec : `nums.len()`. Le dernier index est toujours `len() - 1`."
          },
          code: {
            js: `nums.length   // 4
nums[3]       // 3 (le dernier)`,
            py: `len(nums)   # 4
nums[3]     # 3 (le dernier)`,
            rs: `nums.len()   // 4
nums[3]      // 3 (le dernier)`
          },
          phrase: "Le tableau a une longueur de 4."
        },
        {
          type: "cloze",
          sentence: "`nums[0]` lit l'élément à l'___ 0.",
          options: ["index", "itération", "argument"],
          correct: 0,
          why: [
            "",
            "Une itération est un tour de boucle. Ici on lit une place précise.",
            "Un argument est une valeur donnée à une fonction. Le 0 ici est une position."
          ]
        },
        {
          type: "concept",
          term: "Fonction fléchée",
          def: {
            js: "Une façon **courte** d'écrire une fonction. `n => n * 10` se lit : « prend n, retourne n × 10 ».",
            py: "Une façon **courte** d'écrire une fonction : la **lambda**. `lambda n: n * 10` se lit : « prend n, retourne n × 10 ».",
            rs: "Une façon **courte** d'écrire une fonction : la **closure**. `|n| n * 10` se lit : « prend n, retourne n × 10 »."
          },
          code: {
            js: `n => n * 10
// c'est la même chose que :
function (n) { return n * 10; }`,
            py: `lambda n: n * 10
# c'est la même chose que :
def f(n):
    return n * 10`,
            rs: `|n| n * 10
// c'est la même chose que :
fn f(n: i32) -> i32 { n * 10 }`
          },
          phrase: "On passe une fonction courte à map."
        },
        {
          type: "concept",
          term: "Callback",
          def: "Une fonction qu'on **donne à une autre fonction**, pour qu'elle l'utilise à notre place.",
          code: {
            js: `nums.filter(n => n > 5);
//          └─ callback : filter va l'appeler
//             pour chaque élément`,
            py: `filter(lambda n: n > 5, nums)
#      └─ callback : filter va l'appeler
#         pour chaque élément`,
            rs: `nums.into_iter().filter(|n| *n > 5)
//                      └─ callback (closure)`
          },
          phrase: "filter appelle le callback sur chaque élément."
        },
        {
          type: "concept",
          term: "filter",
          def: "Une **passoire**. Elle teste chaque élément et **garde** ceux pour qui le test est vrai. Elle donne un **nouveau** tableau.",
          code: {
            js: "[4, 7, 10, 3].filter(n => n > 5)   // [7, 10]",
            py: `[n for n in [4, 7, 10, 3] if n > 5]   # [7, 10]
# (liste en compréhension : la façon Python de filtrer)`,
            rs: `vec![4, 7, 10, 3].into_iter().filter(|n| *n > 5).collect::<Vec<i32>>()
// [7, 10]  (collect() fabrique le nouveau Vec)`
          },
          phrase: "On filtre le tableau pour ne garder que les nombres supérieurs à 5."
        },
        {
          type: "trace",
          intro: "`filter` teste chaque élément, un par un.",
          code: {
            js: `const nums = [4, 7, 10, 3];
const big = nums.filter(n => n > 5);`,
            py: `nums = [4, 7, 10, 3]
big = [n for n in nums if n > 5]`,
            rs: `let nums = vec![4, 7, 10, 3];
let big: Vec<i32> = nums.into_iter().filter(|n| *n > 5).collect();`
          },
          cols: ["n", "n > 5 ? (gardé ?)"],
          rows: [
            {
              c: [
                "4",
                {a:"non", yn:1}
              ],
              hint: "`4 > 5` → non, 4 n'est pas gardé."
            },
            {
              c: [
                "7",
                {a:"oui", yn:1}
              ],
              hint: "`7 > 5` → oui, 7 est gardé."
            },
            {
              c: [
                "10",
                {a:"oui", yn:1}
              ],
              hint: "`10 > 5` → oui, 10 est gardé."
            },
            {
              c: [
                "3",
                {a:"non", yn:1}
              ],
              hint: "`3 > 5` → non."
            }
          ],
          after: "`big` vaut **[7, 10]**."
        },
        {
          type: "concept",
          term: "map",
          def: "Une **machine à transformer**. Elle applique une fonction à chaque élément et donne un **nouveau** tableau, de la même longueur.",
          code: {
            js: "[7, 10].map(n => n * 10)   // [70, 100]",
            py: "[n * 10 for n in [7, 10]]   # [70, 100]",
            rs: `vec![7, 10].into_iter().map(|n| n * 10).collect::<Vec<i32>>()
// [70, 100]`
          },
          phrase: "On transforme chaque élément avec map."
        },
        {
          type: "cloze",
          sentence: "map ___ chaque élément et retourne un nouveau tableau de même longueur.",
          options: ["transforme", "filtre", "supprime"],
          correct: 0,
          why: [
            "",
            "Filtrer, c'est garder certains éléments (c'est filter). map les garde tous.",
            "map ne supprime rien : le nouveau tableau a la même longueur."
          ]
        },
        {
          type: "label",
          intro: "Nomme chaque morceau.",
          code: {
            js: "const big = nums.filter(n => n > 5);",
            py: "big = [n for n in nums if n > 5]",
            rs: "let big: Vec<i32> = nums.into_iter().filter(|n| *n > 5).collect();"
          },
          options: {
            js: ["tableau de départ", "méthode", "callback", "nouveau tableau"],
            py: ["liste de départ", "condition de filtre", "nouvelle liste", "élément"],
            rs: ["tableau de départ", "méthode", "callback", "nouveau tableau"]
          },
          marks: {
            js: [
              {line:1, text:"nums", answer:"tableau de départ", why:"`nums` est le tableau qu'on filtre."},
              {
                line: 1,
                text: "filter",
                answer: "méthode",
                why: "`filter` est appelée avec un point sur nums : c'est une méthode."
              },
              {line:1, text:"n => n > 5", answer:"callback", why:"Cette fonction est donnée à filter : c'est un callback."},
              {line:1, text:"big", answer:"nouveau tableau", why:"`big` reçoit le résultat : un nouveau tableau."}
            ],
            py: [
              {line:1, text:"big", answer:"nouvelle liste", why:"`big` reçoit le résultat : une nouvelle liste."},
              {line:1, text:"n", answer:"élément", why:"`n` prend la valeur de chaque élément, un par un."},
              {line:1, text:"nums", answer:"liste de départ", why:"`nums` est la liste qu'on parcourt."},
              {line:1, text:"if n > 5", answer:"condition de filtre", why:"`if n > 5` décide quels éléments sont gardés."}
            ],
            rs: [
              {line:1, text:"big", answer:"nouveau tableau", why:"`big` reçoit le résultat : un nouveau Vec."},
              {line:1, text:"nums", answer:"tableau de départ", why:"`nums` est le Vec qu'on filtre."},
              {line:1, text:"filter", answer:"méthode", why:"`filter` est appelée avec un point : c'est une méthode."},
              {line:1, text:"|n| *n > 5", answer:"callback", why:"Cette closure est donnée à filter : c'est un callback."}
            ]
          },
          traps: {js:["élément", "propriété"], py:["index", "méthode"], rs:["élément", "propriété"]}
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ? (écris le tableau, par exemple [1, 2])",
          code: {
            js: `const nums = [4, 7, 10, 3];
const big = nums.filter(n => n > 5).map(n => n * 10);
console.log(big);`,
            py: `nums = [4, 7, 10, 3]
big = [n * 10 for n in nums if n > 5]
print(big)`,
            rs: `let nums = vec![4, 7, 10, 3];
let big: Vec<i32> = nums.into_iter()
    .filter(|n| *n > 5)
    .map(|n| n * 10)
    .collect();
println!("{:?}", big);`
          },
          answers: ["[70,100]", "70,100"],
          hint: "Deux étapes, l'une après l'autre : d'abord on filtre, puis on transforme le résultat.",
          explain: "Filtrer → `[7, 10]`, puis transformer → **[70, 100]**."
        },
        {
          type: "build",
          intro: "Décris ce code comme un dev.",
          code: {
            js: "const big = nums.filter(n => n > 5);",
            py: "big = [n for n in nums if n > 5]",
            rs: "let big: Vec<i32> = nums.into_iter().filter(|n| *n > 5).collect();"
          },
          answer: ["On filtre", "le tableau nums", "pour ne garder que", "les nombres supérieurs à 5"],
          distractors: ["on transforme", "les index"]
        },
        {
          type: "explain",
          q: "Décris ce code comme un dev. Essaie d'utiliser : tableau, objet, paramètre, callback, retourne.",
          code: {
            js: `const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 34 },
  { name: "Charlie", age: 22 }
];

function getAdults(users) {
  return users.filter(user => user.age >= 18);
}`,
            py: `users = [
    {"name": "Alice", "age": 28},
    {"name": "Bob", "age": 34},
    {"name": "Charlie", "age": 22},
]

def get_adults(users):
    return [user for user in users if user["age"] >= 18]`
          },
          keywords: ["tableau", "objet", "propriété", "paramètre", "callback", "retourne", "nouveau tableau"],
          model: "users référence un tableau d'objets. Chaque objet a deux propriétés : name (un texte) et age (un nombre). La fonction getAdults prend un tableau en paramètre et le filtre avec un callback qui teste user.age >= 18. Elle retourne un nouveau tableau qui contient seulement les utilisateurs majeurs (ici, les trois)."
        },
        {
          type: "senior",
          intro: "Un dev senior relit getAdults et te pose deux questions.",
          code: {
            js: `function getAdults(users) {
  return users.filter(user => user.age >= 18);
}`,
            py: `def get_adults(users):
    return [user for user in users if user["age"] >= 18]`
          },
          questions: [
            {
              q: "Que retourne la fonction si users est un tableau vide ?",
              model: "Elle retourne un nouveau tableau vide. Le filtre ne trouve aucun élément à garder, mais il ne plante pas.",
              keywords: ["tableau vide", "nouveau tableau"]
            },
            {
              q: "La fonction modifie-t-elle le tableau users ?",
              model: "Non. Elle retourne un nouveau tableau, et users reste intact. Elle n'a donc pas d'effet de bord sur ce tableau.",
              keywords: ["nouveau tableau", "effet de bord"]
            }
          ]
        }
      ]
    },
    {
      id: "pieges",
      title: "Les pièges",
      sub: "Les mots qu'on confond souvent",
      steps: [
        {
          type: "concept",
          term: "Égalité stricte",
          def: {
            js: "`===` **compare** deux valeurs et répond `true` ou `false`. À ne pas confondre avec `=`, qui **met** une valeur dans une boîte.",
            py: "`==` **compare** deux valeurs et répond `True` ou `False`. À ne pas confondre avec `=`, qui **met** une valeur dans une boîte.",
            rs: "`==` **compare** deux valeurs et répond `true` ou `false`. À ne pas confondre avec `=`, qui **met** une valeur dans une boîte."
          },
          code: {
            js: `x = 5;      // met 5 dans x
x === 5;    // pose la question « x vaut 5 ? » → true`,
            py: `x = 5    # met 5 dans x
x == 5   # pose la question « x vaut 5 ? » → True`,
            rs: `x = 5;    // met 5 dans x
x == 5    // pose la question « x vaut 5 ? » → true`
          },
          phrase: "On teste l'égalité entre age et 18."
        },
        {
          type: "cloze",
          sentence: "Pour **comparer** deux valeurs, on utilise ___.",
          options: {
            js: [
              "`=`",
              "`===`",
              "`=>`"
            ],
            py: [
              "`=`",
              "`==`",
              ":"
            ],
            rs: [
              "`=`",
              "`==`",
              "`=>`"
            ]
          },
          correct: 1,
          why: {
            js: [
              "`=` met une valeur dans une boîte, il ne compare pas.",
              "",
              "`=>` sert à écrire une fonction fléchée."
            ],
            py: [
              "`=` met une valeur dans une boîte, il ne compare pas.",
              "",
              "`:` ouvre un bloc (après `if`, `for`, `def`)."
            ],
            rs: [
              "`=` met une valeur dans une boîte, il ne compare pas.",
              "",
              "`=>` sert dans un `match`, pour dire « dans ce cas, fais ça »."
            ]
          }
        },
        {
          type: "concept",
          term: "Méthode",
          def: "Une fonction **rangée dans un objet**. On l'utilise avec un point : `objet.methode()`.",
          code: {
            js: `nums.filter(...)   // filter est une méthode de nums
console.log(...)   // log est une méthode de console`,
            py: `nums.append(5)     # append est une méthode de la liste
"bob".upper()      # upper est une méthode du texte`,
            rs: `nums.len()         // len est une méthode du Vec
nums.push(5);      // push aussi`
          },
          rule: "Fonction seule → **fonction**. Fonction utilisée avec un point sur un objet → **méthode**.",
          phrase: "filter est une méthode des tableaux."
        },
        {
          type: "qcm",
          q: "Ici, le mot après le point est…",
          code: {js:"nums.map(n => n * 2)", py:"nums.append(5)", rs:"nums.push(5);"},
          options: ["Une variable", "Une méthode", "Un paramètre"],
          correct: 1,
          explain: "Il est utilisé avec un point sur le tableau `nums` : c'est une **méthode**."
        },
        {
          type: "concept",
          term: "undefined / null",
          def: {
            js: "`undefined` : la boîte est **vide parce que personne n'a rien mis**. `null` : la boîte est **vide exprès**, le dev l'a voulu.",
            py: "En Python, il n'y a qu'une seule valeur « vide » : `None`. Elle remplace à la fois `null` et `undefined` de JavaScript.",
            rs: "Rust n'a **pas** de null. Une valeur qui peut manquer s'écrit `Option` : `Some(valeur)` ou `None`. Le compilateur t'oblige à traiter les deux cas."
          },
          code: {
            js: `let a;          // undefined : rien n'a été mis
let b = null;   // null : vide volontairement`,
            py: "b = None   # vide volontairement",
            rs: `let a: Option<i32> = Some(5);   // il y a une valeur
let b: Option<i32> = None;      // pas de valeur`
          },
          phrase: "La fonction retourne une valeur vide si rien n'est trouvé."
        },
        {
          type: "concept",
          term: "Déclarer / appeler",
          def: "**Déclarer** une fonction, c'est écrire la recette : rien ne se passe. **Appeler** la fonction, c'est cuisiner : on écrit son nom avec des parenthèses.",
          code: {
            js: `function hello() { console.log("salut"); }   // déclaration
hello();                                     // appel → affiche salut`,
            py: `def hello():          # déclaration
    print("salut")

hello()               # appel → affiche salut`,
            rs: `fn hello() { println!("salut"); }   // déclaration
hello();                            // appel → affiche salut`
          },
          phrase: "La fonction est déclarée, mais jamais appelée."
        },
        {
          type: "qcm",
          q: "Qu'affiche ce code ?",
          code: {
            js: `function hello() {
  console.log("salut");
}`,
            py: `def hello():
    print("salut")`,
            rs: `fn hello() {
    println!("salut");
}`
          },
          options: ["salut", "Rien du tout", "Une erreur"],
          correct: 1,
          explain: "La recette est écrite (**déclarée**) mais personne ne cuisine (**aucun appel**) : il manque `hello()`. Rien ne s'affiche."
        },
        {
          type: "cloze",
          sentence: "Dans `add(2, 3)`, 2 et 3 sont des ___.",
          options: ["paramètres", "arguments", "propriétés"],
          correct: 1,
          why: [
            "Les paramètres sont les **noms** dans la définition (`a`, `b`).",
            "",
            "Les propriétés sont les informations d'un objet. Ici on donne des valeurs à une fonction."
          ]
        }
      ]
    }
  ]
};
