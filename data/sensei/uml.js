// Vocabulaire Sensei - chapitre "Architecture et UML" : 4 lecons, 18 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "uml",
  title: "Architecture et UML",
  goal: "Découper un logiciel et le dessiner avec les bons schémas.",
  lessons: [
    {
      id: "couches",
      title: "Couches et MVC",
      sub: "Architecture, logique métier, MVC",
      steps: [
        {
          type: "concept",
          term: "Architecture logicielle",
          def: "Le **plan de la maison** : comment le logiciel est découpé en grandes parties, et comment ces parties se parlent.",
          phrase: "Avant de coder, on définit l'architecture de l'application."
        },
        {
          type: "concept",
          term: "Architecture en couches",
          def: "On empile des **étages**. Chaque étage a un rôle, et ne parle qu'à l'étage juste en dessous.",
          code: `[ Présentation ]   ce que l'utilisateur voit (pages, boutons)
       │
[ Métier ]         les règles (calculer, valider)
       │
[ Données ]        lire et écrire en base de données`,
          phrase: "La couche présentation ne parle jamais directement à la base de données."
        },
        {
          type: "concept",
          term: "Logique métier",
          def: "Les **règles propres au domaine** de l'application. Elles existeraient même sans ordinateur.",
          code: `// règles métier d'une boutique :
// - un panier ne dépasse pas 10 articles
// - la livraison est gratuite dès 50 €`,
          phrase: "Cette vérification fait partie de la logique métier."
        },
        {
          type: "cloze",
          sentence: "« La livraison est gratuite dès 50 € » fait partie de la logique ___.",
          options: ["de présentation", "métier", "de données"],
          correct: 1,
          why: [
            "La présentation, c'est l'affichage. La règle des 50 € existe même sans écran.",
            "",
            "La couche données lit et écrit en base. Elle ne décide pas des règles."
          ]
        },
        {
          type: "concept",
          term: "MVC",
          def: "Un découpage en 3 rôles. **Modèle** : les données et les règles. **Vue** : l'affichage. **Contrôleur** : il reçoit l'action de l'utilisateur et fait le lien entre les deux.",
          code: `[ Utilisateur ] clique sur « Commander »
       ▼
[ Contrôleur ]  reçoit la demande
       ▼
[ Modèle ]      vérifie et enregistre la commande
       ▼
[ Vue ]         affiche « Commande confirmée »`,
          phrase: "Le contrôleur appelle le modèle, puis renvoie la vue."
        },
        {
          type: "label",
          intro: "Dans ce code serveur, nommez le rôle de chaque morceau (MVC).",
          code: {
            js: `router.post("/orders", (req, res) => {
  const order = Order.create(req.body);
  res.render("confirmation", { order });
});`,
            py: `@app.post("/orders")
def create_order():
    order = Order.create(request.json)
    return render_template("confirmation.html", order=order)`
          },
          options: ["contrôleur", "modèle", "vue"],
          marks: {
            js: [
              {
                line: 1,
                text: "router.post(\"/orders\"",
                answer: "contrôleur",
                why: "Il reçoit la requête de l'utilisateur : c'est le contrôleur."
              },
              {line:2, text:"Order.create", answer:"modèle", why:"Order gère les données et les règles : c'est le modèle."},
              {
                line: 3,
                text: "res.render(\"confirmation\"",
                answer: "vue",
                why: "Il fabrique la page affichée : c'est la vue."
              }
            ],
            py: [
              {
                line: 2,
                text: "def create_order()",
                answer: "contrôleur",
                why: "Cette fonction reçoit la requête : c'est le contrôleur."
              },
              {line:3, text:"Order.create", answer:"modèle", why:"Order gère les données et les règles : c'est le modèle."},
              {
                line: 4,
                text: "render_template(\"confirmation.html\"",
                answer: "vue",
                why: "Il fabrique la page affichée : c'est la vue."
              }
            ]
          },
          traps: ["service", "middleware"]
        },
        {
          type: "qcm",
          q: "Dans MVC, qui s'occupe de l'affichage ?",
          options: ["La vue", "Le modèle", "Le contrôleur"],
          correct: 0,
          explain: "La **vue** affiche. Le modèle gère les données, le contrôleur fait le lien."
        },
        {
          type: "build",
          intro: "Décrivez le rôle du contrôleur.",
          answer: ["Le contrôleur", "reçoit la requête", "puis appelle", "le modèle"],
          distractors: ["la vue stocke", "les données"]
        },
        {
          type: "explain",
          q: "Décrivez ce que fait ce code. Essayez d'utiliser : contrôleur, modèle, vue, requête.",
          code: {
            js: `router.post("/orders", (req, res) => {
  const order = Order.create(req.body);
  res.render("confirmation", { order });
});`,
            py: `@app.post("/orders")
def create_order():
    order = Order.create(request.json)
    return render_template("confirmation.html", order=order)`
          },
          keywords: ["contrôleur", "modèle", "vue", "requête"],
          model: "C'est un contrôleur : il reçoit une requête POST sur /orders. Il demande au modèle Order de créer la commande à partir des données envoyées. Ensuite, il renvoie la vue confirmation, qui affiche la commande."
        }
      ]
    },
    {
      id: "classes-uml",
      title: "Le diagramme de classes",
      sub: "UML, attribut, méthode, visibilité",
      steps: [
        {
          type: "concept",
          term: "UML",
          def: "Un **langage de schémas** standard pour dessiner un logiciel. Tout le monde lit les mêmes symboles de la même façon.",
          phrase: "On modélise l'application en UML avant de la coder."
        },
        {
          type: "concept",
          term: "Diagramme de classes",
          def: "Une boîte par classe, en **3 étages** : le nom, puis les attributs, puis les méthodes.",
          code: `┌──────────────────────┐
│ Compte               │  ← nom de la classe
├──────────────────────┤
│ - solde : float      │  ← attributs
│ + titulaire : string │
├──────────────────────┤
│ + deposer(m: float)  │  ← méthodes
│ + lireSolde(): float │
└──────────────────────┘`,
          phrase: "Le diagramme de classes montre les attributs et les méthodes de Compte."
        },
        {
          type: "concept",
          term: "Attribut",
          def: "Une information que chaque objet de la classe possède (une propriété). En UML : `nom : type`.",
          code: `- solde : float
+ titulaire : string`,
          phrase: "La classe Compte a un attribut solde de type float."
        },
        {
          type: "concept",
          term: "Visibilité",
          def: "Qui a le droit d'utiliser un attribut ou une méthode. **+** public : tout le monde. **−** privé : seulement la classe elle-même. **#** protégé : la classe et ses classes filles.",
          rule: "**+** public, **−** privé, **#** protégé.",
          phrase: "L'attribut solde est privé, on y accède par une méthode publique."
        },
        {
          type: "label",
          intro: "Nommez chaque morceau de ce diagramme.",
          code: `┌──────────────────────┐
│ Compte               │
├──────────────────────┤
│ - solde : float      │
│ + titulaire : string │
├──────────────────────┤
│ + deposer(m: float)  │
└──────────────────────┘`,
          options: ["nom de la classe", "attribut privé", "attribut public", "méthode publique"],
          marks: [
            {line:2, text:"Compte", answer:"nom de la classe", why:"Le premier étage contient le nom de la classe."},
            {
              line: 4,
              text: "- solde : float",
              answer: "attribut privé",
              why: "Étage des attributs, avec le signe − : attribut privé."
            },
            {
              line: 5,
              text: "+ titulaire : string",
              answer: "attribut public",
              why: "Étage des attributs, avec le signe + : attribut public."
            },
            {
              line: 7,
              text: "+ deposer(m: float)",
              answer: "méthode publique",
              why: "Dernier étage, avec des parenthèses et le signe + : méthode publique."
            }
          ],
          traps: ["attribut protégé", "méthode privée"]
        },
        {
          type: "cloze",
          sentence: "Dans un diagramme de classes, le signe `-` devant un attribut veut dire ___.",
          options: ["public", "privé", "supprimé"],
          correct: 1,
          why: ["Public, c'est le signe +.", "", "Le − ne supprime rien : il indique la visibilité."]
        },
        {
          type: "qcm",
          q: "Quelle ligne UML correspond à ce code ?",
          code: {
            js: `class Compte {
  #solde = 0;
}`,
            py: `class Compte:
    def __init__(self):
        self._solde = 0   # _ = privé par convention (__ ajoute un renommage)`,
            rs: `pub struct Compte {
    solde: f64,   // sans pub = privé
}`
          },
          options: ["+ solde : number", "# solde : number", "- solde : number"],
          correct: 2,
          explain: "Le solde est **privé** (`#` en JS, `__` en Python, pas de `pub` en Rust) : en UML on écrit **−**."
        },
        {
          type: "build",
          intro: "Décrivez le diagramme Compte.",
          answer: ["La classe Compte", "a un attribut privé solde", "et une méthode publique deposer"],
          distractors: ["un attribut public solde", "une classe privée"]
        },
        {
          type: "explain",
          q: "Décrivez ce diagramme comme un dev. Essayez d'utiliser : classe, attribut, privé, méthode, publique.",
          code: `┌──────────────────────────────┐
│ Utilisateur                  │
├──────────────────────────────┤
│ - email : string             │
│ - motDePasseHash : string    │
├──────────────────────────────┤
│ + seConnecter(mdp): boolean  │
└──────────────────────────────┘`,
          keywords: ["classe", "attribut", "privé", "méthode", "publique"],
          model: "La classe Utilisateur a deux attributs privés : email et motDePasseHash, de type string. Elle a une méthode publique seConnecter, qui prend un mot de passe en paramètre et retourne un booléen. Les attributs sont privés : on ne peut pas lire le hash depuis l'extérieur."
        }
      ]
    },
    {
      id: "relations",
      title: "Les relations entre classes",
      sub: "Association, cardinalité, agrégation, composition",
      steps: [
        {
          type: "concept",
          term: "Association",
          def: "Deux classes **se connaissent** et travaillent ensemble. On trace un trait simple entre elles.",
          code: "Client ──────── Commande",
          phrase: "Il y a une association entre Client et Commande."
        },
        {
          type: "concept",
          term: "Cardinalité",
          def: "**Combien** d'objets de chaque côté. `1` : exactement un. `0..1` : zéro ou un. `*` ou `0..*` : zéro ou plusieurs. `1..*` : au moins un. En UML, le terme officiel est **multiplicité** ; « cardinalité » vient de Merise (MCD).",
          code: `Client 1 ──────── 0..* Commande
// un client passe zéro ou plusieurs commandes
// une commande appartient à exactement un client`,
          phrase: "La cardinalité est de un à plusieurs."
        },
        {
          type: "cloze",
          sentence: "`1..*` veut dire ___.",
          options: ["au moins un", "exactement un", "zéro ou un"],
          correct: 0,
          why: [
            "",
            "Exactement un, c'est `1` tout seul.",
            "Zéro ou un, c'est `0..1`."
          ]
        },
        {
          type: "concept",
          term: "Agrégation",
          def: "Un objet **regroupe** d'autres objets, mais ces objets peuvent **vivre sans lui**. Losange **vide** ◇ côté « tout ».",
          code: `Équipe ◇──────── Joueur
// si l'équipe disparaît, les joueurs existent toujours`,
          phrase: "Équipe agrège des joueurs."
        },
        {
          type: "qcm",
          q: "Dans ce diagramme, que signifie le losange plein ◆ du côté de Commande ?",
          code: `Commande ◆──────── 1..* LigneDeCommande`,
          options: ["Une agrégation : les lignes survivent à la commande", "Un héritage : une ligne de commande est une commande", "Une composition : les lignes meurent avec la commande"],
          correct: 2,
          explain: "Losange **plein** ◆ = **composition** : si on supprime la commande, ses lignes disparaissent avec elle. Losange **vide** ◇ = **agrégation** : les parties survivent au tout (un joueur survit à son équipe). L'héritage se note autrement : une flèche à triangle vide vers la classe mère."
        },
        {
          type: "concept",
          term: "Généralisation",
          def: "Le nom UML de l'**héritage** (« **est un** ») : une flèche en trait plein avec un triangle vide, qui pointe vers la classe mère.",
          code: `Chien ──────▷ Animal
// un chien est un animal`,
          phrase: "Le diagramme montre une généralisation de Chien vers Animal."
        },
        {
          type: "label",
          intro: "Nommez chaque symbole.",
          code: `Client 1 ──────── 0..* Commande
Commande ◆──────── 1..* LigneDeCommande
Chien ──────▷ Animal`,
          options: ["association", "cardinalité", "composition", "héritage"],
          marks: [
            {line:1, text:"────────", answer:"association", why:"Un trait simple entre deux classes : une association."},
            {line:1, text:"0..*", answer:"cardinalité", why:"`0..*` dit combien d'objets : c'est une cardinalité."},
            {line:2, text:"◆", answer:"composition", why:"Losange plein : composition."},
            {line:3, text:"▷", answer:"héritage", why:"Triangle vide : héritage."}
          ],
          traps: ["agrégation", "dépendance"]
        },
        {
          type: "qcm",
          q: "Une Maison et ses Pièces : si on détruit la maison, les pièces disparaissent. Quelle relation ?",
          options: ["Composition ◆", "Agrégation ◇", "Héritage ▷"],
          correct: 0,
          explain: "Les pièces **meurent avec** la maison : **composition** (losange plein)."
        },
        {
          type: "qcm",
          q: "Une Playlist et ses Chansons : une chanson existe même si on supprime la playlist. Quelle relation ?",
          options: ["Composition ◆", "Héritage ▷", "Agrégation ◇"],
          correct: 2,
          explain: "Les chansons **survivent** : **agrégation** (losange vide)."
        },
        {
          type: "build",
          intro: "Lisez la première ligne du schéma à voix haute.",
          code: "Client 1 ──────── 0..* Commande",
          answer: ["Un client", "passe", "zéro ou plusieurs", "commandes"],
          distractors: ["exactement une", "hérite de"]
        },
        {
          type: "explain",
          q: "Décrivez cette relation. Essayez d'utiliser : composition, au moins une, disparaissent.",
          code: "Commande ◆──────── 1..* LigneDeCommande",
          keywords: ["composition", "commande", "ligne", "au moins une"],
          model: "Une commande est composée d'au moins une ligne de commande. C'est une composition (losange plein) : si on supprime la commande, ses lignes disparaissent avec elle."
        }
      ]
    },
    {
      id: "usecase-seq",
      title: "Cas d'utilisation et séquence",
      sub: "Acteur, include, extend, messages",
      steps: [
        {
          type: "concept",
          term: "Diagramme de cas d'utilisation",
          def: "Un schéma qui montre **qui** utilise le système, et **pour faire quoi**. On ne parle pas encore du code.",
          code: `        ┌──────── Boutique ────────┐
Client ─┼── (Passer une commande) │
        │                         │
Admin ──┼── (Gérer le catalogue)  │
        └─────────────────────────┘`,
          phrase: "Le diagramme de cas d'utilisation montre ce que chaque acteur peut faire."
        },
        {
          type: "concept",
          term: "Acteur",
          def: "Une **personne ou un système extérieur** qui interagit avec l'application : un client, un admin, la banque qui valide un paiement.",
          phrase: "La banque est un acteur secondaire du cas « Payer »."
        },
        {
          type: "concept",
          term: "Cas d'utilisation",
          def: "Une **action complète** qu'un acteur réalise avec le système. On l'écrit avec un verbe : « Passer une commande ».",
          phrase: "Le cas d'utilisation « Passer une commande » est déclenché par le client."
        },
        {
          type: "concept",
          term: "include / extend",
          def: "**include** : une étape **toujours** faite. « Payer » inclut « S'authentifier ». **extend** : une étape **optionnelle**. « Appliquer un code promo » étend « Payer ».",
          rule: "include = obligatoire, à chaque fois. extend = seulement dans certains cas.",
          phrase: "Le code promo est une extension du cas Payer."
        },
        {
          type: "qcm",
          q: "« Payer » demande **toujours** de s'authentifier. Quelle relation entre les deux ?",
          options: ["include", "extend"],
          correct: 0,
          explain: "Toujours fait → **include**."
        },
        {
          type: "cloze",
          sentence: "La banque qui valide un paiement est un ___ du système.",
          options: ["cas d'utilisation", "acteur", "attribut"],
          correct: 1,
          why: [
            "Un cas d'utilisation est une action (« Payer »). La banque est quelqu'un qui agit.",
            "",
            "Un attribut est une information dans une classe."
          ]
        },
        {
          type: "concept",
          term: "Diagramme de séquence",
          def: "Qui envoie **quel message** à qui, et **dans quel ordre**. Chaque participant a une ligne verticale (sa **ligne de vie**). Le temps descend. Un message se dessine en trait plein, sa réponse en **pointillés**.",
          code: `Client         API        BDD
  │ POST /login │          │
  │────────────▶│          │
  │             │  SELECT  │
  │             │─────────▶│
  │             │◀╌╌╌╌╌╌╌╌╌│
  │   200 OK    │          │
  │◀╌╌╌╌╌╌╌╌╌╌╌╌│          │`,
          phrase: "Le diagramme de séquence montre que l'API interroge la base avant de répondre."
        },
        {
          type: "label",
          intro: "Nommez chaque morceau du diagramme.",
          code: `Client         API        BDD
  │ POST /login │          │
  │────────────▶│          │
  │             │  SELECT  │
  │             │─────────▶│
  │             │◀╌╌╌╌╌╌╌╌╌│
  │   200 OK    │          │
  │◀╌╌╌╌╌╌╌╌╌╌╌╌│          │`,
          options: ["participant", "message (requête)", "réponse"],
          marks: [
            {line:1, text:"API", answer:"participant", why:"En haut, les participants : chacun a sa ligne de vie."},
            {
              line: 3,
              text: "────────────▶",
              answer: "message (requête)",
              why: "Flèche pleine vers la droite : un message envoyé."
            },
            {line:8, text:"◀╌╌╌╌╌╌╌╌╌╌╌╌", answer:"réponse", why:"Flèche en pointillés qui revient vers le client : la réponse."}
          ],
          traps: ["cas d'utilisation", "message asynchrone"]
        },
        {
          type: "qcm",
          q: "Dans un diagramme de séquence, le temps s'écoule…",
          options: ["De haut en bas", "De gauche à droite", "De bas en haut"],
          correct: 0,
          explain: "Le temps **descend** : le premier message est en haut."
        },
        {
          type: "build",
          intro: "Racontez le diagramme de séquence.",
          answer: ["Le client", "envoie une requête", "à l'API", "qui interroge", "la base de données"],
          distractors: ["hérite de", "la vue"]
        },
        {
          type: "explain",
          q: "Racontez ce diagramme. Essayez d'utiliser : client, requête, API, base de données, réponse.",
          code: `Client         API        BDD
  │ POST /login │          │
  │────────────▶│          │
  │             │  SELECT  │
  │             │─────────▶│
  │             │◀╌╌╌╌╌╌╌╌╌│
  │   200 OK    │          │
  │◀╌╌╌╌╌╌╌╌╌╌╌╌│          │`,
          keywords: ["client", "requête", "API", "base de données", "réponse"],
          model: "Le client envoie une requête POST /login à l'API. L'API interroge la base de données avec un SELECT pour trouver l'utilisateur. La base répond, puis l'API renvoie une réponse 200 OK au client."
        }
      ]
    }
  ]
};
