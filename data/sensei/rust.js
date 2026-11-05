// Vocabulaire Sensei - chapitre "Rust : la mémoire sous contrôle" : 5 lecons, 19 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "rust",
  title: "Rust : la mémoire sous contrôle",
  goal: "Ownership, emprunt, Option, Result : comprendre ce que les autres langages cachent.",
  lessons: [
    {
      id: "rs-mut",
      title: "Variables et types",
      sub: "Immuable par défaut, mut, types",
      steps: [
        {
          type: "concept",
          term: "Immuable par défaut",
          def: "En Rust, une variable **ne peut pas changer** sauf si on écrit `mut`. C'est l'inverse de JavaScript et Python.",
          code: {
            rs: `let x = 5;
x = 6;          // ❌ erreur de compilation

let mut y = 5;
y = 6;          // ✅ y est mutable`
          },
          phrase: "La variable est immuable : il faut la déclarer mut."
        },
        {
          type: "concept",
          term: "Types de base",
          def: "Rust connaît le type de chaque valeur **avant** l'exécution. `i32` : nombre entier. `f64` : nombre à virgule. `bool` : vrai/faux. `String` : texte modifiable. `&str` : texte fixe.",
          code: {
            rs: `let age: i32 = 34;
let prix: f64 = 9.99;
let actif: bool = true;
let nom: String = String::from("Bob");`
          },
          phrase: "age est de type i32."
        },
        {
          type: "concept",
          term: "Compilateur",
          def: "Le programme qui **transforme votre code en exécutable**. En Rust, il vérifie énormément de choses avant : beaucoup de bugs sont trouvés **avant** de lancer le programme.",
          phrase: "Le compilateur refuse le code : il y a une erreur de type."
        },
        {
          type: "qcm",
          q: "Ce code compile-t-il ?",
          code: {
            rs: `let total = 0;
total = total + 5;`
          },
          options: ["Oui", "Non"],
          correct: 1,
          explain: "`total` est immuable (pas de `mut`). Le compilateur refuse la deuxième ligne."
        },
        {
          type: "label",
          intro: "Nommez chaque morceau.",
          code: {rs:"let mut score: i32 = 10;"},
          options: ["mot-clé de déclaration", "rend modifiable", "type", "valeur"],
          marks: [
            {line:1, text:"let", answer:"mot-clé de déclaration", why:"`let` déclare une variable."},
            {line:1, text:"mut", answer:"rend modifiable", why:"`mut` autorise la variable à changer."},
            {line:1, text:"i32", answer:"type", why:"`i32` est le type : un entier sur 32 bits."},
            {line:1, text:"10", answer:"valeur", why:"`10` est la valeur mise dans la boîte."}
          ],
          traps: ["constante", "emprunt (&)"]
        },
        {
          type: "cloze",
          sentence: "En Rust, une variable déclarée sans `mut` est ___.",
          options: ["immuable", "privée", "globale"],
          correct: 0,
          why: [
            "",
            "Privé concerne la visibilité, pas le fait de pouvoir changer.",
            "Globale veut dire accessible partout, ce n'est pas le sujet."
          ]
        }
      ]
    },
    {
      id: "rs-own",
      title: "Stack, heap et ownership",
      sub: "Propriétaire, move, clone",
      steps: [
        {
          type: "concept",
          term: "Stack",
          def: "La **pile** : une zone mémoire rapide, pour les valeurs de **taille connue** (nombres, booléens). Comme une pile d'assiettes : on pose et on retire par le haut.",
          phrase: "Les entiers sont stockés sur la stack."
        },
        {
          type: "concept",
          term: "Heap",
          def: "Le **tas** : une zone mémoire pour les valeurs de **taille variable** (un texte qui grandit, un Vec). Sur la stack, on garde juste l'adresse (un **pointeur**).",
          code: {
            rs: `let nom = String::from("Bob");
// stack : pointeur + longueur
// heap  : les lettres B, o, b`
          },
          phrase: "Le contenu de la String est alloué sur le heap."
        },
        {
          type: "concept",
          term: "Ownership",
          def: "Chaque valeur a **un seul propriétaire**. Quand le propriétaire disparaît (fin du bloc `{ }`), la valeur est **libérée automatiquement**. Pas besoin de garbage collector.",
          phrase: "nom est le propriétaire de la String."
        },
        {
          type: "concept",
          term: "Move",
          def: "`let b = a;` sur une String **déplace** la valeur : b devient propriétaire, et a **n'est plus utilisable**. On ne copie pas les données du heap.",
          code: {
            rs: `let a = String::from("salut");
let b = a;            // la valeur est déplacée dans b
println!("{}", a);    // ❌ erreur : a a été déplacé`
          },
          phrase: "La valeur a été déplacée (move) dans b."
        },
        {
          type: "qcm",
          q: "Que se passe-t-il ?",
          code: {
            rs: `let a = String::from("hi");
let b = a;
println!("{}", b);`
          },
          options: ["Affiche hi", "Erreur : a a été déplacé", "Affiche rien"],
          correct: 0,
          explain: "On utilise **b**, le nouveau propriétaire : ça marche et ça affiche **hi**. C'est utiliser **a** qui serait une erreur."
        },
        {
          type: "concept",
          term: "Clone",
          def: "Une **copie explicite** des données, avec `.clone()`. Les deux variables ont alors chacune leur valeur.",
          code: {
            rs: `let a = String::from("salut");
let b = a.clone();    // vraie copie
println!("{} {}", a, b);   // ✅ les deux existent`
          },
          phrase: "On clone la String pour garder les deux."
        },
        {
          type: "cloze",
          sentence: "`let b = a;` avec une String : la valeur est ___ dans b.",
          options: ["déplacée", "copiée", "supprimée"],
          correct: 0,
          why: [
            "",
            "Une copie demanderait `.clone()`.",
            "Elle n'est pas supprimée : b en est maintenant propriétaire."
          ]
        },
        {
          type: "build",
          intro: "Expliquez le move.",
          answer: ["La valeur", "est déplacée", "dans b", "donc a n'est plus utilisable"],
          distractors: ["est copiée", "b est une constante"]
        }
      ]
    },
    {
      id: "rs-borrow",
      title: "Emprunter",
      sub: "&, &mut, règle d'emprunt",
      steps: [
        {
          type: "concept",
          term: "Emprunt",
          def: "Avec `&`, on **prête** une valeur sans donner la propriété. La fonction peut la lire, puis le propriétaire la récupère.",
          code: {
            rs: `fn longueur(s: &String) -> usize {
    s.len()
}
let nom = String::from("Bob");
let n = longueur(&nom);   // on prête nom
println!("{}", nom);      // ✅ nom est toujours là`
          },
          phrase: "La fonction emprunte la String au lieu de la prendre."
        },
        {
          type: "concept",
          term: "Emprunt mutable",
          def: "Avec `&mut`, on prête la valeur **pour la modifier**.",
          code: {
            rs: `fn ajouter(v: &mut Vec<i32>) {
    v.push(4);
}
let mut nums = vec![1, 2, 3];
ajouter(&mut nums);   // nums vaut [1, 2, 3, 4]`
          },
          phrase: "On passe un emprunt mutable pour modifier le Vec."
        },
        {
          type: "concept",
          term: "Règle d'emprunt",
          def: "À un instant donné : **plusieurs** emprunts en lecture (`&`), **OU un seul** emprunt en écriture (`&mut`). Jamais les deux. C'est ce qui empêche des bugs de mémoire et de concurrence.",
          rule: "Beaucoup de lecteurs OU un seul écrivain.",
          phrase: "Le compilateur refuse : il y a déjà un emprunt mutable."
        },
        {
          type: "qcm",
          q: "Ce code compile-t-il ?",
          code: {
            rs: `let mut s = String::from("a");
let r1 = &mut s;
let r2 = &mut s;
r1.push('b');`
          },
          options: ["Oui", "Non"],
          correct: 1,
          explain: "Deux emprunts **mutables** en même temps : interdit. Un seul écrivain à la fois."
        },
        {
          type: "cloze",
          sentence: "Pour qu'une fonction lise une valeur sans en devenir propriétaire, on lui passe un ___.",
          options: ["emprunt", "move", "clone"],
          correct: 0,
          why: [
            "",
            "Un move lui donnerait la propriété.",
            "Un clone fait une copie, ça marche mais ça coûte de la mémoire."
          ]
        }
      ]
    },
    {
      id: "rs-option",
      title: "Option, Result et match",
      sub: "Fini null et les exceptions",
      steps: [
        {
          type: "concept",
          term: "Option",
          def: "Une valeur **qui peut manquer**. `Some(valeur)` : il y a une valeur. `None` : il n'y en a pas. Rust n'a pas de `null`.",
          code: {
            rs: `fn trouver(id: i32) -> Option<String> {
    if id == 1 { Some(String::from("Alice")) } else { None }
}`
          },
          phrase: "La fonction retourne une Option : l'utilisateur peut ne pas exister."
        },
        {
          type: "concept",
          term: "Result",
          def: "Le résultat d'une opération **qui peut échouer**. `Ok(valeur)` : succès. `Err(erreur)` : échec. Rust n'a pas d'exceptions classiques.",
          code: {
            rs: `fn diviser(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 { Err(String::from("division par zéro")) }
    else { Ok(a / b) }
}`
          },
          phrase: "diviser retourne un Result : Ok ou Err."
        },
        {
          type: "concept",
          term: "match",
          def: "Un **aiguillage** qui teste tous les cas possibles. Le compilateur vérifie que vous n'en oubliez **aucun**.",
          code: {
            rs: `match trouver(2) {
    Some(nom) => println!("Trouvé : {}", nom),
    None => println!("Inconnu"),
}`
          },
          phrase: "On traite les deux cas avec un match."
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: {
            rs: `match diviser(10.0, 0.0) {
    Ok(r) => println!("{}", r),
    Err(e) => println!("Erreur : {}", e),
}`
          },
          answers: ["Erreur : division par zéro", "Erreur: division par zéro"],
          hint: "b vaut 0.0 : quelle branche de diviser est prise ?",
          explain: "b vaut 0 → `Err(\"division par zéro\")` → la branche Err affiche **Erreur : division par zéro**."
        },
        {
          type: "concept",
          term: "Opérateur ?",
          def: "`?` après un Result veut dire : « si c'est Err, **arrête la fonction et renvoie l'erreur** ; si c'est Ok, donne-moi la valeur ».",
          code: {
            rs: `fn lire_config() -> Result<String, std::io::Error> {
    let texte = std::fs::read_to_string("config.toml")?;
    Ok(texte)
}`
          },
          phrase: "On propage l'erreur avec l'opérateur point d'interrogation."
        },
        {
          type: "cloze",
          sentence: "Une fonction qui peut échouer et dire pourquoi retourne un ___.",
          options: ["Result", "Option", "match"],
          correct: 0,
          why: [
            "",
            "Option sert quand une valeur peut **manquer**. Pour un **échec** avec une raison, c'est Result.",
            "match sert à traiter les cas, ce n'est pas un type de retour."
          ]
        },
        {
          type: "label",
          intro: "Nommez chaque morceau.",
          code: {
            rs: `match trouver(2) {
    Some(nom) => println!("{}", nom),
    None => println!("Inconnu"),
}`
          },
          options: ["aiguillage", "cas avec valeur", "cas sans valeur"],
          marks: [
            {line:1, text:"match", answer:"aiguillage", why:"`match` teste tous les cas : c'est l'aiguillage."},
            {line:2, text:"Some(nom)", answer:"cas avec valeur", why:"`Some(nom)` : il y a une valeur, rangée dans nom."},
            {line:3, text:"None", answer:"cas sans valeur", why:"`None` : pas de valeur."}
          ],
          traps: ["boucle", "cas d'erreur (Err)"]
        }
      ]
    },
    {
      id: "rs-cargo",
      title: "Cargo et les crates",
      sub: "Cargo.toml, Cargo.lock, cargo audit",
      steps: [
        {
          type: "concept",
          term: "Cargo",
          def: "L'outil officiel de Rust : il **crée** le projet, **installe** les dépendances, **compile**, **teste**.",
          code: {
            rs: `cargo new mon_projet
cargo build
cargo test
cargo run`
          },
          phrase: "On lance les tests avec cargo test."
        },
        {
          type: "concept",
          term: "Crate",
          def: "Un **paquet** Rust (une bibliothèque ou un programme). Elles sont publiées sur crates.io, comme les paquets npm.",
          phrase: "On ajoute la crate serde pour lire du JSON."
        },
        {
          type: "concept",
          term: "Cargo.toml / Cargo.lock",
          def: "**Cargo.toml** : la liste des dépendances que vous demandez (comme package.json). **Cargo.lock** : les versions exactes installées (comme package-lock.json).",
          code: `[dependencies]
serde = "1.0"`,
          phrase: "La version exacte est figée dans Cargo.lock."
        },
        {
          type: "concept",
          term: "cargo audit",
          def: "Un outil de **SCA** pour Rust : il compare vos dépendances à une base de vulnérabilités connues (RustSec).",
          code: `cargo install cargo-audit
cargo audit`,
          phrase: "cargo audit signale une crate vulnérable."
        },
        {
          type: "cloze",
          sentence: "Le fichier qui fige les versions exactes des crates s'appelle ___.",
          options: ["Cargo.lock", "Cargo.toml", "main.rs"],
          correct: 0,
          why: [
            "",
            "Cargo.toml liste ce que vous **demandez**. Les versions exactes sont dans le lock.",
            "main.rs contient votre code."
          ]
        },
        {
          type: "qcm",
          q: "`cargo audit` est un outil de…",
          options: ["SAST", "SCA", "DAST"],
          correct: 1,
          explain: "Il analyse **les dépendances** : c'est de la **SCA**."
        }
      ]
    }
  ]
};
