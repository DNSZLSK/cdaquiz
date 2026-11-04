// Vocabulaire Sensei - chapitre "Objets et design patterns" : 6 lecons, 25 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "objets",
  title: "Objets et design patterns",
  goal: "Classe, encapsulation, SOLID, patterns du GoF.",
  lessons: [
    {
      id: "classe",
      title: "Classes et instances",
      sub: "Classe, instance, constructeur, this",
      steps: [
        {
          type: "concept",
          term: "Classe",
          def: "Un **moule** (ou un plan). Elle décrit les propriétés et les méthodes qu'auront les objets fabriqués avec elle.",
          code: `class Counter {
  constructor() {
    this.value = 0;
  }
  increment() {
    this.value = this.value + 1;
  }
}`,
          phrase: "La classe Counter définit une propriété value et une méthode increment."
        },
        {
          type: "concept",
          term: "Instance",
          def: "Un objet **fabriqué avec le moule**, grâce au mot `new`. On peut fabriquer autant d'instances qu'on veut, chacune a ses propres valeurs.",
          code: `const a = new Counter();   // une instance
const b = new Counter();   // une autre instance`,
          phrase: "On instancie la classe Counter."
        },
        {
          type: "concept",
          term: "Constructeur",
          def: "La méthode spéciale `constructor`, appelée **automatiquement** au moment du `new`. Elle prépare l'objet.",
          code: `class User {
  constructor(name) {
    this.name = name;
  }
}
const u = new User("Alice");   // u.name vaut "Alice"`,
          phrase: "Le constructeur initialise la propriété name."
        },
        {
          type: "concept",
          term: "this",
          def: "Dans une méthode, `this` veut dire « **l'objet sur lequel on travaille en ce moment** ».",
          code: `a.increment();   // dans increment, this = a
b.increment();   // dans increment, this = b`,
          phrase: "this désigne l'instance courante."
        },
        {
          type: "trace",
          intro: "Suivez la valeur de `c.value`.",
          code: `const c = new Counter();
c.increment();
c.increment();
console.log(c.value);`,
          cols: ["Ligne", "Ce qui se passe", "c.value"],
          rows: [
            {
              c: [
                "1",
                "constructor : this.value = 0",
                {a:"0"}
              ],
              hint: "`new` appelle le constructeur, qui met 0 dans value."
            },
            {
              c: [
                "2",
                "increment()",
                {a:"1"}
              ],
              hint: "`this.value = 0 + 1` = 1."
            },
            {
              c: [
                "3",
                "increment()",
                {a:"2"}
              ],
              hint: "`this.value = 1 + 1` = 2."
            }
          ],
          after: "On affiche **2**."
        },
        {
          type: "cloze",
          sentence: "`new Counter()` crée une ___ de la classe Counter.",
          options: ["instance", "méthode", "propriété"],
          correct: 0,
          why: [
            "",
            "Une méthode est une action de l'objet. `new` fabrique un objet.",
            "Une propriété est une information dans l'objet. `new` fabrique l'objet entier."
          ]
        },
        {
          type: "build",
          intro: "Décrivez `const c = new Counter();`",
          answer: ["On crée", "une instance", "de la classe Counter"],
          distractors: ["une méthode", "qui hérite"]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: `const a = new Counter();
const b = new Counter();
a.increment();
a.increment();
b.increment();
console.log(a.value + b.value);`,
          answers: ["3"],
          hint: "Chaque instance a sa propre boîte value.",
          explain: "a.value = 2, b.value = 1. 2 + 1 = **3**."
        }
      ]
    },
    {
      id: "encaps",
      title: "Encapsulation et abstraction",
      sub: "Cacher les détails, exposer l'essentiel",
      steps: [
        {
          type: "concept",
          term: "Encapsulation",
          def: "**Protéger** les données d'un objet : on les cache, et on ne permet de les modifier qu'à travers des méthodes qui vérifient.",
          code: `class Compte {
  #solde = 0;          // # = privé : inaccessible dehors
  deposer(montant) {
    if (montant > 0) this.#solde = this.#solde + montant;
  }
  lireSolde() { return this.#solde; }
}`,
          phrase: "Le solde est encapsulé : on ne peut le modifier que par deposer."
        },
        {
          type: "qcm",
          q: "Que se passe-t-il ?",
          code: `const compte = new Compte();
compte.#solde = 1000000;`,
          options: ["Le solde passe à 1 000 000", "Erreur : #solde est privé", "Le solde reste à 0 sans erreur"],
          correct: 1,
          explain: "`#solde` est **privé** : JavaScript refuse qu'on y touche depuis l'extérieur (erreur). C'est l'encapsulation."
        },
        {
          type: "concept",
          term: "Abstraction",
          def: "Utiliser quelque chose **sans connaître ses détails**. On conduit une voiture sans savoir comment marche le moteur.",
          code: `[3, 1, 2].sort();   // on sait CE QUE ça fait (trier)
                    // pas COMMENT c'est codé`,
          phrase: "Cette méthode fournit une abstraction : on n'a pas besoin de connaître l'algorithme de tri."
        },
        {
          type: "concept",
          term: "Interface publique",
          def: "Ce que les autres **ont le droit d'utiliser** d'un objet : ses méthodes publiques. Le reste est un détail interne.",
          code: `// interface publique de Compte :
compte.deposer(50);
compte.lireSolde();`,
          phrase: "L'interface publique de la classe se limite à deposer et lireSolde."
        },
        {
          type: "cloze",
          sentence: "Cacher les données et n'y donner accès que par des méthodes, c'est l'___.",
          options: ["encapsulation", "abstraction", "héritage"],
          correct: 0,
          why: [
            "",
            "L'abstraction, c'est utiliser sans connaître les détails. Proche, mais ici on parle de **protéger** les données.",
            "L'héritage, c'est reprendre une autre classe."
          ]
        },
        {
          type: "qcm",
          q: "Pourquoi passer par `deposer()` plutôt que modifier le solde directement ?",
          options: [
            "Pour que le code soit plus long",
            "Pour pouvoir vérifier la valeur (par exemple refuser un montant négatif)",
            "Parce que les propriétés sont lentes"
          ],
          correct: 1,
          explain: "La méthode est un **gardien** : elle vérifie (`montant > 0`) avant de modifier. C'est tout l'intérêt de l'encapsulation."
        }
      ]
    },
    {
      id: "heritage",
      title: "Héritage et composition",
      sub: "extends, « est un » / « a un », polymorphisme",
      steps: [
        {
          type: "concept",
          term: "Héritage",
          def: "Une classe **reprend tout** d'une autre avec `extends`, et peut en ajouter. Relation « **est un** » : un Chien **est un** Animal.",
          code: `class Animal {
  constructor(nom) { this.nom = nom; }
  presenter() { return "Je suis " + this.nom; }
}
class Chien extends Animal {}`,
          phrase: "Chien hérite de Animal."
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: `const rex = new Chien("Rex");
console.log(rex.presenter());`,
          answers: ["Je suis Rex", "\"Je suis Rex\""],
          hint: "Chien n'a pas de méthode presenter… mais il hérite de celle d'Animal.",
          explain: "Chien hérite de presenter d'Animal → **Je suis Rex**."
        },
        {
          type: "concept",
          term: "Composition",
          def: "Un objet **contient** d'autres objets. Relation « **a un** » : une Voiture **a un** Moteur.",
          code: `class Voiture {
  constructor() {
    this.moteur = new Moteur();   // composition
  }
}`,
          rule: "« est un » → héritage. « a un » → composition. En cas de doute, les devs préfèrent souvent la composition, plus souple.",
          phrase: "On préfère la composition à l'héritage ici."
        },
        {
          type: "qcm",
          q: "Un Panier contient des Produits. Quelle relation ?",
          options: ["Héritage (« est un »)", "Composition (« a un »)"],
          correct: 1,
          explain: "Un panier n'**est** pas un produit. Il **a** des produits → **composition**."
        },
        {
          type: "concept",
          term: "Polymorphisme",
          def: "**Même méthode, comportement différent** selon l'objet. On appelle `parler()` sans se soucier de qui parle.",
          code: `class Chien { parler() { return "Wouf"; } }
class Chat  { parler() { return "Miaou"; } }`,
          phrase: "Grâce au polymorphisme, on appelle parler sur n'importe quel animal."
        },
        {
          type: "cloze",
          sentence: "Une Voiture a un Moteur : c'est de la ___.",
          options: ["composition", "héritage", "polymorphisme"],
          correct: 0,
          why: [
            "",
            "L'héritage, c'est « est un ». Une voiture n'est pas un moteur.",
            "Le polymorphisme, c'est une même méthode avec des comportements différents."
          ]
        },
        {
          type: "predict",
          q: "Qu'affiche ce code ?",
          code: `const animaux = [new Chien(), new Chat()];
console.log(animaux.map(a => a.parler()));`,
          answers: ["[\"Wouf\",\"Miaou\"]", "[Wouf,Miaou]", "Wouf,Miaou"],
          hint: "map appelle parler() sur chaque animal. Chacun répond à sa façon.",
          explain: "Le chien répond Wouf, le chat Miaou : **[\"Wouf\", \"Miaou\"]**."
        }
      ]
    },
    {
      id: "patterns",
      title: "Design patterns",
      sub: "Factory, Observer, Strategy",
      steps: [
        {
          type: "concept",
          term: "Design pattern",
          def: "Une **solution connue** à un problème de conception qui revient souvent. C'est un vocabulaire commun entre devs : dire « c'est un Observer » évite 10 minutes d'explication.",
          phrase: "On pourrait utiliser un design pattern ici."
        },
        {
          type: "concept",
          term: "Factory",
          def: "Une fonction (ou méthode) dont le travail est de **fabriquer des objets** à votre place, prêts à l'emploi.",
          code: `function createUser(name) {
  return { name: name, role: "user", active: true };
}
const u = createUser("Alice");`,
          phrase: "createUser est une factory."
        },
        {
          type: "concept",
          term: "Observer",
          def: "Des objets **s'abonnent** à un événement. Quand il arrive, ils sont **prévenus**. Comme s'abonner à une chaîne YouTube.",
          code: `button.addEventListener("click", () => {
  console.log("cliqué !");   // prévenu à chaque clic
});`,
          phrase: "addEventListener implémente le pattern Observer."
        },
        {
          type: "concept",
          term: "Strategy",
          def: "On rend un comportement **interchangeable** en le passant comme une fonction. On choisit la « stratégie » au moment de l'appel.",
          code: `const parPrix = (a, b) => a.prix - b.prix;
const parNom  = (a, b) => a.nom.localeCompare(b.nom);
produits.sort(parPrix);   // on choisit la stratégie de tri`,
          phrase: "La fonction de comparaison est une stratégie."
        },
        {
          type: "qcm",
          q: "Une newsletter prévient tous ses abonnés à chaque nouvel article. Quel pattern ?",
          options: ["Factory", "Observer", "Strategy"],
          correct: 1,
          explain: "Des abonnés prévenus quand un événement arrive : **Observer**."
        },
        {
          type: "cloze",
          sentence: "`addEventListener` est un exemple du pattern ___.",
          options: ["Observer", "Factory", "Singleton"],
          correct: 0,
          why: ["", "Factory fabrique des objets.", "Singleton garantit une seule instance."]
        },
        {
          type: "qcm",
          q: "`createButton(\"OK\")` retourne un bouton tout configuré. Quel pattern ?",
          options: ["Factory", "Observer", "Strategy"],
          correct: 0,
          explain: "Une fonction qui **fabrique** des objets prêts à l'emploi : **Factory**."
        }
      ]
    },
    {
      id: "solid",
      title: "Les principes SOLID",
      sub: "5 règles pour un code qui vieillit bien",
      steps: [
        {
          type: "concept",
          term: "SOLID",
          def: "**5 principes** de conception, un par lettre. Ils servent à écrire du code qu'on peut modifier sans tout casser.",
          phrase: "Cette classe ne respecte pas SOLID."
        },
        {
          type: "concept",
          term: "S : responsabilité unique",
          def: "Une classe = **une seule raison de changer**. Elle fait une seule chose.",
          code: `// ❌ Facture calcule ET envoie ET imprime
// ✅ Facture calcule, Mailer envoie, Printer imprime`,
          phrase: "On applique le principe de responsabilité unique."
        },
        {
          type: "concept",
          term: "O : ouvert / fermé",
          def: "Le code est **ouvert à l'extension** (on peut ajouter un cas) mais **fermé à la modification** (on n'a pas besoin de toucher au code qui marche).",
          code: `// ❌ ajouter un moyen de paiement = modifier un énorme if/else
// ✅ ajouter un moyen de paiement = ajouter une nouvelle classe`,
          phrase: "Grâce au principe ouvert/fermé, on ajoute PayPal sans modifier l'existant."
        },
        {
          type: "concept",
          term: "L : substitution de Liskov",
          def: "Une classe fille doit pouvoir **remplacer sa classe mère sans surprise**. Si Pingouin hérite d'Oiseau mais plante sur `voler()`, c'est raté.",
          phrase: "Cet héritage viole le principe de Liskov."
        },
        {
          type: "concept",
          term: "I : ségrégation des interfaces",
          def: "Plusieurs **petites interfaces** spécialisées valent mieux qu'une grosse. On n'oblige personne à implémenter des méthodes inutiles.",
          phrase: "On découpe l'interface pour respecter la ségrégation."
        },
        {
          type: "concept",
          term: "D : inversion des dépendances",
          def: "Dépendre d'une **abstraction** (« un mailer »), pas d'un détail (« Gmail »). C'est l'idée derrière l'injection de dépendances.",
          code: `function envoyerFacture(client, mailer) {   // n'importe quel mailer
  mailer.send(client.email);
}`,
          phrase: "On inverse la dépendance : le code métier ne connaît plus Gmail."
        },
        {
          type: "qcm",
          q: "Pour ajouter un nouveau type de remise, vous devez modifier une fonction de 200 lignes pleine de if. Quel principe est violé ?",
          options: ["S : responsabilité unique", "O : ouvert / fermé", "L : Liskov"],
          correct: 1,
          explain: "Ajouter un cas oblige à **modifier** le code existant : le principe **ouvert/fermé** n'est pas respecté."
        },
        {
          type: "cloze",
          sentence: "Une classe qui calcule, enregistre ET envoie des emails viole le principe de ___.",
          options: ["responsabilité unique", "substitution de Liskov", "ségrégation des interfaces"],
          correct: 0,
          why: [
            "",
            "Liskov parle d'héritage : une fille qui remplace sa mère.",
            "La ségrégation parle de la taille des interfaces."
          ]
        },
        {
          type: "build",
          intro: "Expliquez le principe D.",
          answer: ["Le code métier", "dépend d'une abstraction", "et non", "d'une implémentation précise"],
          distractors: ["hérite de Gmail", "d'une constante"]
        }
      ]
    },
    {
      id: "gof",
      title: "Les patterns du GoF",
      sub: "Création, structure, comportement",
      steps: [
        {
          type: "concept",
          term: "GoF",
          def: "Le **Gang of Four** : quatre auteurs d'un livre de 1994 qui décrit 23 design patterns, rangés en **3 familles**.",
          phrase: "C'est un des patterns du GoF."
        },
        {
          type: "concept",
          term: "Familles de patterns",
          def: "**Création** : comment fabriquer les objets (Factory, Singleton). **Structure** : comment assembler les objets (Adapter, Decorator). **Comportement** : comment les objets communiquent (Observer, Strategy).",
          rule: "Création = fabriquer. Structure = assembler. Comportement = communiquer.",
          phrase: "Adapter est un pattern de structure."
        },
        {
          type: "concept",
          term: "Singleton",
          def: "Une classe qui n'a **qu'une seule instance** dans toute l'application. Exemple : la configuration. Attention : c'est un état global, difficile à tester.",
          code: `class Config {
  static #instance = null;
  static get() {
    if (!Config.#instance) Config.#instance = new Config();
    return Config.#instance;
  }
}
Config.get() === Config.get();   // true : la même instance`,
          phrase: "La connexion à la base est un singleton."
        },
        {
          type: "concept",
          term: "Adapter",
          def: "Un **adaptateur de prise** : il permet à deux parties qui ne parlent pas la même langue de travailler ensemble.",
          code: `// l'ancienne API attend des centimes : ancien.pay(5000)
class PaiementAdapter {
  constructor(ancien) { this.ancien = ancien; }
  payer(euros) { this.ancien.pay(euros * 100); }
}`,
          phrase: "On utilise un adapter pour brancher l'ancienne API de paiement."
        },
        {
          type: "concept",
          term: "Decorator",
          def: "On **emballe** un objet ou une fonction pour lui ajouter un comportement (logs, cache, contrôle d'accès) **sans modifier** l'original.",
          code: `function avecLog(fn) {
  return (...args) => {
    console.log("appel avec", args);
    return fn(...args);
  };
}
const addAvecLog = avecLog(add);`,
          phrase: "On décore la fonction avec un log."
        },
        {
          type: "qcm",
          q: "Singleton appartient à quelle famille ?",
          options: ["Création", "Structure", "Comportement"],
          correct: 0,
          explain: "Il contrôle **la fabrication** des objets (une seule instance) : famille **création**."
        },
        {
          type: "qcm",
          q: "Vous devez utiliser une bibliothèque dont les méthodes n'ont pas les noms que votre code attend. Quel pattern ?",
          options: ["Singleton", "Adapter", "Observer"],
          correct: 1,
          explain: "Faire parler deux interfaces différentes : **Adapter**."
        },
        {
          type: "cloze",
          sentence: "Ajouter un cache autour d'une fonction sans la modifier, c'est le pattern ___.",
          options: ["Decorator", "Factory", "Strategy"],
          correct: 0,
          why: ["", "Factory fabrique des objets.", "Strategy permet de choisir un comportement parmi plusieurs."]
        },
        {
          type: "explain",
          q: "Expliquez ce code en nommant le pattern. Essayez d'utiliser : pattern, decorator, fonction, comportement.",
          code: `function avecLog(fn) {
  return (...args) => {
    console.log("appel avec", args);
    return fn(...args);
  };
}`,
          keywords: ["decorator", "fonction", "comportement", "sans modifier"],
          model: "avecLog est un decorator : c'est une fonction qui prend une autre fonction en paramètre et retourne une nouvelle fonction. Cette nouvelle fonction affiche ses arguments, puis appelle la fonction d'origine. On ajoute donc un comportement (le log) sans modifier la fonction de départ."
        }
      ]
    }
  ]
};
