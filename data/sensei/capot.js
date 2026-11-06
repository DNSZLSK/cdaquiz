// Vocabulaire Sensei - chapitre "Sous le capot" : 3 lecons, 7 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "capot",
  title: "Sous le capot",
  goal: "Comprendre ce que fait vraiment le langage quand votre code tourne.",
  lessons: [
    {
      id: "ordre-exec",
      title: "L'ordre d'exécution",
      sub: "Event loop, promise, hoisting",
      steps: [
        {
          type: "concept",
          term: "Event loop",
          def: {
            js: "La **boucle d'événements** : JavaScript n'exécute qu'une chose à la fois. Le code en cours va d'abord jusqu'au bout, puis la boucle prend dans la file les callbacks prêts (timer écoulé, réponse réseau arrivée) et les exécute un par un.",
            py: "La **boucle d'événements** d'`asyncio` : elle fait tourner plusieurs coroutines sur un seul thread. Quand une coroutine attend (`await`), la boucle passe à une autre qui est prête.",
            rs: "La **boucle d'événements** : Rust n'en a pas d'intégrée, c'est un runtime comme Tokio qui la fournit. Quand une tâche attend (`.await`), le runtime fait avancer une autre tâche prête."
          },
          code: {
            js: `console.log("1");
setTimeout(() => console.log("3"), 0);
console.log("2");
// affiche 1, 2, puis 3 : le callback attend que le code en cours soit fini`,
            py: `import asyncio

async def tache(nom, secondes):
    await asyncio.sleep(secondes)   # rend la main à la boucle
    print(nom)

async def main():
    await asyncio.gather(tache("lente", 0.2), tache("rapide", 0.1))

asyncio.run(main())   # affiche rapide, puis lente`
          },
          phrase: "Ce calcul de 2 secondes bloque l'event loop : plus rien ne répond."
        },
        {
          type: "concept",
          term: "Promise",
          def: {
            js: "Une **promesse** : un objet qui représente un résultat qui arrivera plus tard. Elle est d'abord en attente, puis complétée (avec une valeur) ou rompue (avec une erreur). `await` attend son résultat sans bloquer l'event loop.",
            py: "Le mot vient de JavaScript : un objet qui représente un **résultat qui arrivera plus tard**. En Python, on parle d'objet *awaitable* : une coroutine, qu'on attend avec `await`. Appeler une fonction `async` ne lance rien, ça crée la coroutine.",
            rs: "Le mot vient de JavaScript : un objet qui représente un **résultat qui arrivera plus tard**. En Rust, c'est une **Future** : elle ne fait rien tant qu'un runtime ne l'attend pas avec `.await`."
          },
          code: {
            js: `const p = new Promise(resolve => setTimeout(() => resolve(42), 100));
console.log(p);                 // Promise { <pending> } : pas encore de valeur
p.then(v => console.log(v));    // 42, 100 ms plus tard`,
            py: `import asyncio

async def lire():
    await asyncio.sleep(0.1)
    return 42

async def main():
    coro = lire()
    print(coro)          # <coroutine object lire at 0x...> : rien n'a tourné
    print(await coro)    # 42

asyncio.run(main())`,
            rs: `async fn lire() -> u32 {
    println!("lecture…");
    42
}

fn main() {
    let f = lire();   // n'affiche rien : une Future ne fait rien seule
    // il faut un runtime comme Tokio pour l'attendre : f.await
}`
          },
          phrase: "Cette fonction renvoie une Promise : il faut l'attendre avec await."
        },
        {
          type: "concept",
          term: "Hoisting",
          def: {
            js: "La **remontée** des déclarations : avant d'exécuter le code, JavaScript enregistre les déclarations en haut de leur portée. Une `function` déclarée plus bas est utilisable plus haut. Un `var` existe dès le début, mais vaut `undefined` jusqu'à son affectation. `let` et `const` existent aussi, mais les lire avant leur ligne lève une ReferenceError.",
            py: "Un mot de JavaScript : la **remontée** des déclarations en haut de leur portée, qui rend une fonction utilisable avant sa ligne. **Python n'a pas de hoisting** : un nom n'existe qu'une fois sa ligne exécutée. Appeler une fonction définie plus bas dans le fichier lève une NameError.",
            rs: "Un mot de JavaScript : la **remontée** des déclarations en haut de leur portée. Rust n'en a pas pour les variables : une variable n'existe qu'à partir de son `let`. En revanche, les fonctions d'un module sont visibles partout dans le module, quel que soit leur ordre."
          },
          code: {
            js: `console.log(salut());   // bonjour : la fonction est remontée
console.log(x);         // undefined : var est remonté, pas sa valeur
var x = 5;
console.log(y);         // ❌ ReferenceError : y n'est pas encore initialisé
let y = 5;
function salut() { return "bonjour"; }`,
            py: `print(salut())   # ❌ NameError : salut n'est pas encore défini

def salut():
    return "bonjour"`,
            rs: `fn main() {
    println!("{}", salut());   // bonjour : l'ordre des fonctions est libre
    // println!("{}", x);      // ❌ refusé : x n'existe pas encore
    let x = 5;
}

fn salut() -> &'static str { "bonjour" }`
          },
          phrase: "Ça marche grâce au hoisting : la fonction est déclarée plus bas."
        },
        {
          type: "qcm",
          q: "Dans quel ordre s'affichent les lettres ?",
          code: {
            js: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`,
            py: `import asyncio

async def main():
    print("A")
    asyncio.get_running_loop().call_soon(print, "B")
    print("C")
    await asyncio.sleep(0)

asyncio.run(main())`
          },
          options: ["A, B, C", "A, C, B", "B, A, C"],
          correct: 1,
          explain: {
            js: "Même avec un délai de 0 ms, le callback passe par la file de l'**event loop** : il attend que le code en cours soit fini. A et C s'affichent d'abord, B ensuite.",
            py: "`call_soon` range l'appel dans la file de l'**event loop** : il attend que la coroutine rende la main, au `await`. A et C s'affichent d'abord, B ensuite."
          }
        },
        {
          type: "cloze",
          sentence: "Appeler une fonction déclarée plus bas dans le fichier marche en JavaScript grâce au ___.",
          options: ["hoisting", "callback", "shadowing"],
          correct: 0,
          why: [
            "",
            "Un callback est une fonction passée en argument à une autre fonction. Ça ne dit rien de l'ordre des déclarations.",
            "Le shadowing, c'est redéclarer une variable avec le même nom, qui masque l'ancienne."
          ]
        }
      ]
    },
    {
      id: "generateurs",
      title: "Produire et nettoyer",
      sub: "Générateur, context manager",
      steps: [
        {
          type: "concept",
          term: "Générateur",
          def: {
            js: "Une fonction (`function*`) qui **produit ses valeurs une par une**, à la demande, avec `yield`. Elle se met en pause après chaque valeur et reprend au `next()` suivant. On peut ainsi parcourir une suite très longue, ou infinie, sans la stocker en mémoire.",
            py: "Une fonction qui contient `yield` : elle **produit ses valeurs une par une**, à la demande, et se met en pause entre deux. On peut ainsi parcourir un fichier de 10 Go ligne par ligne sans tout charger en mémoire.",
            rs: "Une fonction qui **produit ses valeurs une par une**, à la demande. Rust n'a pas encore de générateurs stables : on obtient le même effet avec un **itérateur**, qui calcule chaque valeur seulement quand on la demande."
          },
          code: {
            js: `function* compteur() {
  let n = 1;
  while (true) yield n++;   // pause à chaque valeur
}
const it = compteur();
console.log(it.next().value, it.next().value);   // 1 2`,
            py: `def compteur():
    n = 1
    while True:
        yield n      # pause à chaque valeur
        n += 1

it = compteur()
print(next(it), next(it))   # 1 2`,
            rs: `let mut it = 1..;   // itérateur infini : rien n'est calculé d'avance
println!("{} {}", it.next().unwrap(), it.next().unwrap());   // 1 2`
          },
          phrase: "On lit le fichier avec un générateur pour ne pas tout charger en mémoire."
        },
        {
          type: "concept",
          term: "Context manager",
          def: {
            py: "Un objet utilisé avec `with`, qui garantit une action **à l'entrée et à la sortie** du bloc, même si une exception est levée : fermer un fichier, rendre un verrou, valider ou annuler une transaction. En français : gestionnaire de contexte.",
            js: "Un mot de Python : un objet utilisé avec `with`, qui garantit une action **à l'entrée et à la sortie** du bloc, même si une exception est levée (fermer un fichier). En JavaScript, on obtient la même garantie avec `try...finally`.",
            rs: "Un mot de Python : un objet utilisé avec `with`, qui garantit une action **à l'entrée et à la sortie** du bloc (fermer un fichier). En Rust, c'est automatique : quand une valeur sort de sa portée, sa méthode `drop` est appelée, et le fichier se ferme."
          },
          code: {
            py: `with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("bonjour")
print(f.closed)   # True : with a fermé le fichier`,
            js: `const fs = require("fs");
const fd = fs.openSync("notes.txt", "w");
try {
  fs.writeSync(fd, "bonjour");
} finally {
  fs.closeSync(fd);   // exécuté même si writeSync lève une erreur
}`,
            rs: `use std::fs::File;
use std::io::Write;

fn main() {
    {
        let mut f = File::create("notes.txt").unwrap();
        f.write_all(b"bonjour").unwrap();
    }   // f sort de sa portée : drop() ferme le fichier
}`
          },
          phrase: "On ouvre le fichier avec un context manager pour être sûr qu'il soit fermé."
        },
        {
          type: "qcm",
          q: {
            py: "Une exception survient au milieu du bloc. Le fichier est-il fermé ?",
            js: "Une erreur survient au milieu du bloc. Le fichier est-il fermé ?",
            rs: "Une panique survient au milieu du bloc, avec le réglage par défaut (`panic = \"unwind\"`). Le fichier est-il fermé ?"
          },
          code: {
            py: `with open("notes.txt", "w", encoding="utf-8") as f:
    raise ValueError("panne")`,
            js: `const fd = fs.openSync("notes.txt", "w");
try {
  throw new Error("panne");
} finally {
  fs.closeSync(fd);
}`,
            rs: `{
    let f = File::create("notes.txt").unwrap();
    panic!("panne");
}`
          },
          options: {
            py: ["Non : l'exception quitte le bloc avant la fermeture du fichier", "Seulement si un except appelle f.close() à la main", "Oui : with ferme le fichier même si une exception quitte le bloc"],
            js: ["Non : l'erreur quitte le bloc avant la fermeture du fichier", "Seulement si un catch appelle fs.closeSync(fd) à la main", "Oui : finally s'exécute même si une erreur quitte le bloc"],
            rs: ["Non : la panique arrête tout avant la fermeture du fichier", "Seulement si on appelle drop(f) à la main avant panic!", "Oui : Rust appelle drop sur f pendant la panique"]
          },
          correct: 2,
          explain: {
            py: "C'est tout l'intérêt du **context manager** : la sortie du bloc est garantie. Essai : après l'exception, `f.closed` vaut `True`.",
            js: "Le bloc `finally` s'exécute toujours, erreur ou pas. Essai : après l'erreur, réutiliser `fd` échoue avec EBADF, car le descripteur est déjà fermé.",
            rs: "Avec le réglage par défaut, `panic = \"unwind\"`, une panique déroule la pile et appelle `drop` sur chaque valeur de la portée : `f` est fermé. Essai avec un type qui affiche un message dans `drop` : le message s'affiche pendant la panique. Avec `panic = \"abort\"` (dans le `[profile]` de Cargo.toml), le programme s'arrête net : **aucun `drop` n'est appelé**, le programme ne libère rien lui-même, et c'est le système d'exploitation qui récupère les ressources du processus. Même essai : aucun message."
          }
        },
        {
          type: "cloze",
          sentence: "En Python, `with` s'appuie sur un ___ pour fermer le fichier même en cas d'erreur.",
          options: ["générateur", "context manager", "décorateur"],
          correct: 1,
          why: [
            "Un générateur produit des valeurs une par une avec yield. Il ne garantit rien à la sortie d'un bloc.",
            "",
            "Un décorateur enveloppe une fonction pour modifier son comportement, comme @cache."
          ]
        }
      ]
    },
    {
      id: "concurrence",
      title: "Quand tout se bloque",
      sub: "GIL, deadlock",
      steps: [
        {
          type: "concept",
          term: "GIL",
          def: "Global Interpreter Lock : dans CPython, l'interpréteur Python standard, un **verrou** qui ne laisse qu'**un seul thread exécuter du code Python à la fois**. Des threads accélèrent donc l'attente (réseau, disque), pas le calcul pur : pour calculer en parallèle, on lance plusieurs processus (`multiprocessing`). Depuis Python 3.13, il existe un build sans GIL, dit **free-threaded**. Depuis Python 3.14, il est officiellement supporté mais reste optionnel : il s'installe en plus de l'interpréteur standard, qui garde le GIL. Sources : docs.python.org/3/howto/free-threading-python.html et docs.python.org/3/whatsnew/3.14.html.",
          code: {
            py: `import threading, time

def calcul():
    sum(i * i for i in range(5_000_000))

t = time.perf_counter(); calcul(); calcul()
print(f"à la suite : {time.perf_counter() - t:.1f} s")

t = time.perf_counter()
th = [threading.Thread(target=calcul) for _ in range(2)]
for x in th: x.start()
for x in th: x.join()
print(f"2 threads  : {time.perf_counter() - t:.1f} s")   # pas plus rapide : le GIL`
          },
          phrase: "Les threads n'accélèrent pas ce calcul à cause du GIL."
        },
        {
          type: "concept",
          term: "Deadlock",
          def: "Un **interblocage** : deux tâches s'attendent l'une l'autre, et aucune ne peut avancer. A tient le verrou 1 et attend le verrou 2 ; B tient le verrou 2 et attend le verrou 1. Le programme ne plante pas : il **se fige**. Le remède classique : toujours prendre les verrous dans le même ordre.",
          code: {
            py: `import threading, time

v1, v2 = threading.Lock(), threading.Lock()

def tache(nom, a, b):
    with a:
        time.sleep(0.1)            # l'autre thread prend son premier verrou
        if b.acquire(timeout=1):   # sans timeout : bloqué pour toujours
            b.release()
        else:
            print(nom, "bloqué : deadlock")

t1 = threading.Thread(target=tache, args=("A", v1, v2))
t2 = threading.Thread(target=tache, args=("B", v2, v1))
t1.start(); t2.start(); t1.join(); t2.join()`,
            rs: `use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};

fn main() {
    let v1 = Arc::new(Mutex::new(()));
    let v2 = Arc::new(Mutex::new(()));
    let (a1, a2) = (Arc::clone(&v1), Arc::clone(&v2));
    let t = thread::spawn(move || {
        let _g1 = a1.lock().unwrap();
        thread::sleep(Duration::from_millis(100));
        let _g2 = a2.lock().unwrap();   // attend v2, tenu par main
    });
    let _g2 = v2.lock().unwrap();
    thread::sleep(Duration::from_millis(100));
    let _g1 = v1.lock().unwrap();       // attend v1, tenu par le thread : figé
    t.join().unwrap();
}`
          },
          phrase: "Les deux threads s'attendent l'un l'autre : c'est un deadlock."
        },
        {
          type: "qcm",
          q: "Le thread A prend le verrou `compte`, puis le verrou `historique`. Le thread B prend `historique`, puis `compte`. Que peut-il arriver ?",
          options: [
            "Une race condition : les deux threads écrivent dans compte en même temps",
            "Rien : des verrous empêchent justement les problèmes de concurrence",
            "Un deadlock : chacun peut tenir un verrou et attendre l'autre sans fin"
          ],
          correct: 2,
          explain: "A tient `compte` et attend `historique` ; B tient `historique` et attend `compte` : aucun ne lâche. C'est un **deadlock**. Les verrous évitent la race condition, mais pris dans un ordre différent, ils créent ce blocage. Le remède : les prendre toujours dans le même ordre, `compte` puis `historique`."
        },
        {
          type: "cloze",
          sentence: "En CPython, deux threads qui font du calcul pur ne vont pas plus vite, à cause du ___.",
          options: ["GIL", "deadlock", "ramasse-miettes"],
          correct: 0,
          why: [
            "",
            "Un deadlock fige le programme. Ici, le calcul se termine, il ne va simplement pas plus vite.",
            "Le ramasse-miettes libère la mémoire inutilisée. Il n'empêche pas deux threads de calculer en même temps."
          ]
        }
      ]
    }
  ]
};
