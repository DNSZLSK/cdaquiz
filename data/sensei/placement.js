// Test de positionnement Sensei : 2 a 4 questions par chapitre (champ ch). Ajouter a la fin, ne pas reordonner.
export default [
  {
    ch: "lire",
    step: {
      type: "cloze",
      sentence: "Dans `double(3)`, 3 est un ___.",
      options: ["paramètre", "retour", "argument"],
      correct: 2,
      why: ["Le paramètre est le nom dans la définition.", "Le retour est ce qui ressort.", ""]
    }
  },
  {
    ch: "lire",
    step: {
      type: "predict",
      q: "Qu'affiche ce code ?",
      code: {
        js: `let x = 10;
for (let i = 1; i <= 3; i++) {
  x = x - i;
}
console.log(x);`,
        py: `x = 10
for i in range(1, 4):
    x = x - i
print(x)`,
        rs: `let mut x = 10;
for i in 1..=3 {
    x = x - i;
}
println!("{}", x);`
      },
      answers: ["4"],
      hint: "10 - 1, puis - 2, puis - 3.",
      explain: "10 → 9 → 7 → **4**."
    }
  },
  {
    ch: "parler",
    step: {
      type: "qcm",
      q: "Quelle phrase aide le plus un collègue ?",
      options: [
        "« Le login ne marche plus pour certains utilisateurs, depuis ce matin. »",
        "« Je pense que le bug vient de l'API, quelqu'un peut regarder ? »",
        "« Avec un email en majuscules, l'API renvoie 401 au lieu de 200. »",
        "« Il y a un souci sur la connexion, c'est assez urgent. »"
      ],
      correct: 2,
      explain: "Elle donne le cas qui déclenche le bug (un email en majuscules), ce qui est **observé** (401) et ce qui est **attendu** (200) : le collègue peut reproduire tout de suite. Les autres disent qu'il y a un problème, sans dire lequel."
    }
  },
  {
    ch: "parler",
    step: {
      type: "cloze",
      sentence: "« J'ai ___ une application qui analyse les dépendances. »",
      options: ["développé", "fait", "eu"],
      correct: 0,
      why: ["", "« Fait » est vague : on ne sait pas ce que vous avez fait.", "« Eu » ne veut rien dire ici."]
    }
  },
  {
    ch: "senior",
    step: {
      type: "qcm",
      q: "« Des fois ça marche, des fois non : le résultat dépend de l'ordre d'arrivée des requêtes. » Comment s'appelle ce problème ?",
      options: ["Un edge case", "Une race condition", "Un breaking change"],
      correct: 1,
      explain: "Deux actions en même temps, résultat qui dépend de l'ordre : **race condition**."
    }
  },
  {
    ch: "senior",
    step: {
      type: "cloze",
      sentence: "Une URL de serveur écrite directement dans le code est ___.",
      options: ["asynchrone", "hardcodée", "rétrocompatible"],
      correct: 1,
      why: [
        "Asynchrone parle d'une opération qui prend du temps.",
        "",
        "Rétrocompatible parle d'une nouvelle version qui marche avec l'ancien code."
      ]
    }
  },
  {
    ch: "objets",
    step: {
      type: "cloze",
      sentence: "Cacher les données d'un objet et n'y donner accès que par des méthodes, c'est l'___.",
      options: ["encapsulation", "héritage", "abstraction"],
      correct: 0,
      why: [
        "",
        "L'héritage reprend une autre classe.",
        "L'abstraction cache les détails d'utilisation, mais protéger les données, c'est l'encapsulation."
      ]
    }
  },
  {
    ch: "objets",
    step: {
      type: "qcm",
      q: "Le pattern qui garantit une seule instance d'une classe :",
      options: ["Factory", "Observer", "Singleton"],
      correct: 2,
      explain: "**Singleton** : une seule instance."
    }
  },
  {
    ch: "uml",
    step: {
      type: "qcm",
      q: "En UML, que veut dire le signe `-` devant un attribut ?",
      options: ["privé", "public", "protégé"],
      correct: 0,
      explain: "**−** = privé, **+** = public, **#** = protégé."
    }
  },
  {
    ch: "uml",
    step: {
      type: "qcm",
      q: "Losange plein ◆ entre Commande et LigneDeCommande. C'est…",
      options: ["une agrégation", "une composition", "un héritage"],
      correct: 1,
      explain: "Losange plein = **composition** : les lignes meurent avec la commande."
    }
  },
  {
    ch: "propre",
    step: {
      type: "qcm",
      q: "`console.log(totl)` alors que la variable s'appelle total. Quelle erreur ?",
      options: ["TypeError", "SyntaxError", "ReferenceError"],
      correct: 2,
      explain: "Un nom qui n'existe pas : **ReferenceError** (NameError en Python)."
    }
  },
  {
    ch: "propre",
    step: {
      type: "qcm",
      q: "Une boucle dans une boucle sur n éléments :",
      options: ["O(1)", "O(n²)", "O(n)"],
      correct: 1,
      explain: "n × n : **O(n²)**."
    }
  },
  {
    ch: "secu",
    step: {
      type: "qcm",
      q: "Bob est connecté mais reçoit un 403 sur la page admin. Quel contrôle l'a bloqué ?",
      options: ["L'authentification", "L'autorisation", "Le rate limiting", "Le CORS"],
      correct: 1,
      explain: "On sait qui il est (il est connecté), mais il n'a pas le droit : **autorisation**. Le rate limiting répond 429 quand on envoie trop de requêtes. Le CORS est une règle du navigateur sur les appels entre domaines."
    }
  },
  {
    ch: "secu",
    step: {
      type: "qcm",
      q: "La protection principale contre l'injection SQL :",
      options: ["Une requête paramétrée", "Un mot de passe plus long", "Un index"],
      correct: 0,
      explain: "La **requête paramétrée** sépare le code SQL des données."
    }
  },
  {
    ch: "devsecops",
    step: {
      type: "qcm",
      q: "Avec Docker, qu'est-ce qui est en train de tourner ?",
      options: ["L'image", "Le Dockerfile", "Le registre", "Le conteneur"],
      correct: 3,
      explain: "Le Dockerfile est la recette, l'image est le modèle figé qu'on en construit, le registre est l'endroit où l'on stocke les images. Le **conteneur** est l'image qui tourne."
    }
  },
  {
    ch: "devsecops",
    step: {
      type: "qcm",
      q: "Analyser ses dépendances pour trouver des CVE connues, c'est…",
      options: ["SAST", "DAST", "SCA"],
      correct: 2,
      explain: "**SCA** : Software Composition Analysis."
    }
  },
  {
    ch: "agile",
    step: {
      type: "qcm",
      q: "« La page charge en moins de 2 secondes. » Qu'est-ce que c'est ?",
      options: ["Un besoin fonctionnel", "Une user story", "Un besoin non fonctionnel", "La Definition of Done"],
      correct: 2,
      explain: "C'est une qualité du système (la performance), pas une fonction : **besoin non fonctionnel**. Une user story suit le format « En tant que…, je veux…, afin de… ». La Definition of Done est la liste commune qui dit qu'un élément est terminé."
    }
  },
  {
    ch: "agile",
    step: {
      type: "qcm",
      q: "Qui priorise le backlog en Scrum ?",
      options: ["Le Scrum Master", "Les Developers", "Le Product Owner"],
      correct: 2,
      explain: "Le **Product Owner**."
    }
  },
  {
    ch: "rust",
    step: {
      type: "qcm",
      only: "rs",
      q: "Ce code Rust compile-t-il ?",
      code: {
        rs: `let x = 5;
x = 6;`
      },
      options: ["Non : x est immuable", "Oui : x vaut 6 ensuite", "Oui, avec un avertissement"],
      correct: 0,
      explain: "`x` n'est pas `mut` : il est immuable, et le compilateur refuse le code (erreur E0384, cannot assign twice to immutable variable)."
    }
  },
  {
    ch: "rust",
    step: {
      type: "qcm",
      q: "En Rust, qu'est-ce qui remplace null ?",
      options: ["Option", "Result", "match"],
      correct: 0,
      explain: "**Option** : Some(valeur) ou None."
    }
  },
  {
    ch: "devsecops",
    step: {
      type: "qcm",
      q: "Rejouer les commits de votre branche au-dessus de main, pour garder un historique en ligne droite, c'est…",
      options: ["un merge", "un cherry-pick", "un revert", "un rebase"],
      correct: 3,
      explain: "Le **rebase** rejoue vos commits un par un au-dessus de main. Un merge garde les deux branches et ajoute un commit de fusion. Un cherry-pick copie un commit choisi, pas toute la branche. Un revert crée un commit qui annule un commit précédent."
    }
  },
  {
    ch: "devsecops",
    step: {
      type: "qcm",
      q: "À chaque push, un serveur compile le code et lance les tests automatiquement. Comment s'appelle cette pratique ?",
      options: ["L'intégration continue", "Le déploiement continu", "La code review", "Le déploiement canary"],
      correct: 0,
      explain: "**Intégration continue** (CI) : chaque push est construit et testé. Le déploiement continu va plus loin et met en production automatiquement. Le déploiement canary envoie une nouvelle version à une petite partie des utilisateurs. La code review est une relecture humaine."
    }
  },
  {
    ch: "agile",
    step: {
      type: "qcm",
      q: "Laquelle de ces phrases est une user story ?",
      options: [
        "« En tant que client, je veux suivre ma commande, afin de savoir quand elle arrive. »",
        "« Le système doit répondre en moins de 2 secondes sur la page de suivi. »",
        "« Étant donné une commande expédiée, quand j'ouvre le suivi, alors je vois la date. »",
        "« Créer la table commande et l'API de suivi des colis. »"
      ],
      correct: 0,
      explain: "Une **user story** dit qui (le rôle), quoi (l'action) et pourquoi (le bénéfice). « Étant donné, quand, alors » est un critère d'acceptation. Une limite de temps est un besoin non fonctionnel. « Créer la table… » est une tâche technique."
    }
  },
  {
    ch: "prod",
    step: {
      type: "qcm",
      q: "La moyenne est de 120 ms, mais 5 % des requêtes durent 3 s ou plus. Quelle mesure le montre ?",
      options: ["La moyenne", "Le débit", "Le p95", "Le SLA"],
      correct: 2,
      explain: "Le **p95** est la durée sous laquelle passent 95 % des requêtes : ici 3 s. La moyenne noie les requêtes lentes. Le débit compte les requêtes par seconde. Le SLA est un engagement écrit dans le contrat."
    }
  },
  {
    ch: "prod",
    step: {
      type: "cloze",
      sentence: "Le contrat promet 99,5 % de disponibilité au client, avec des pénalités : c'est le ___.",
      options: ["SLA", "SLO", "p95"],
      correct: 0,
      why: [
        "",
        "Le SLO est l'objectif interne de l'équipe. La promesse écrite dans le contrat, c'est le SLA.",
        "Le p95 est une mesure de latence, pas un engagement."
      ]
    }
  },
  {
    ch: "capot",
    step: {
      type: "qcm",
      q: "Deux threads attendent chacun le verrou que tient l'autre, et le programme se fige. C'est…",
      options: ["une race condition", "un deadlock", "une fuite mémoire", "un timeout"],
      correct: 1,
      explain: "Chacun tient un verrou et attend l'autre : aucun n'avance, c'est un **deadlock**. Une race condition donne un résultat qui dépend de l'ordre d'arrivée, mais le programme avance. Un timeout est justement un moyen de ne pas attendre sans fin."
    }
  },
  {
    ch: "capot",
    step: {
      type: "qcm",
      q: "En JavaScript, pourquoi `setTimeout(f, 0)` n'exécute-t-il pas `f` tout de suite ?",
      options: [
        "Le délai minimum de setTimeout est d'une seconde",
        "Le hoisting déplace f après les autres instructions",
        "f est une Promise qui doit d'abord être résolue",
        "f passe par la file de l'event loop après le code en cours"
      ],
      correct: 3,
      explain: "Le callback passe par la file de l'**event loop** : il ne s'exécute qu'une fois le code en cours terminé, même avec 0 ms. Le hoisting concerne les déclarations, pas l'ordre d'exécution des callbacks, et `f` est une simple fonction."
    }
  }
];
