// Test de positionnement Sensei : 2 questions par chapitre (champ ch).
export default [
  {
    ch: "lire",
    step: {
      type: "cloze",
      sentence: "Dans `double(3)`, 3 est un ___.",
      options: ["paramètre", "argument", "retour"],
      correct: 1,
      why: ["Le paramètre est le nom dans la définition.", "", "Le retour est ce qui ressort."]
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
      options: ["« Le login bug. »", "« Avec un email en majuscules, l'API renvoie 401 au lieu de 200. »"],
      correct: 1,
      explain: "Étapes, observé, attendu : le collègue peut agir."
    }
  },
  {
    ch: "parler",
    step: {
      type: "cloze",
      sentence: "« J'ai ___ une application qui analyse les dépendances. »",
      options: ["développé", "fait", "eu"],
      correct: 0,
      why: ["", "« Fait » est vague : on ne sait pas ce que tu as fait.", "« Eu » ne veut rien dire ici."]
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
      options: ["hardcodée", "asynchrone", "rétrocompatible"],
      correct: 0,
      why: [
        "",
        "Asynchrone parle d'une opération qui prend du temps.",
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
      options: ["Factory", "Singleton", "Observer"],
      correct: 1,
      explain: "**Singleton** : une seule instance."
    }
  },
  {
    ch: "uml",
    step: {
      type: "qcm",
      q: "En UML, que veut dire le signe `-` devant un attribut ?",
      options: ["public", "privé", "protégé"],
      correct: 1,
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
      options: ["TypeError", "ReferenceError", "SyntaxError"],
      correct: 1,
      explain: "Un nom qui n'existe pas : **ReferenceError** (NameError en Python)."
    }
  },
  {
    ch: "propre",
    step: {
      type: "qcm",
      q: "Une boucle dans une boucle sur n éléments :",
      options: ["O(1)", "O(n)", "O(n²)"],
      correct: 2,
      explain: "n × n : **O(n²)**."
    }
  },
  {
    ch: "secu",
    step: {
      type: "qcm",
      q: "Bob est connecté mais reçoit un 403 sur la page admin. Quel contrôle l'a bloqué ?",
      options: ["Authentification", "Autorisation"],
      correct: 1,
      explain: "On sait qui il est, mais il n'a pas le droit : **autorisation**."
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
      q: "Image et conteneur : lequel est en train de tourner ?",
      options: ["L'image", "Le conteneur"],
      correct: 1,
      explain: "L'image est le modèle figé, le **conteneur** est l'image qui tourne."
    }
  },
  {
    ch: "devsecops",
    step: {
      type: "qcm",
      q: "Analyser ses dépendances pour trouver des CVE connues, c'est…",
      options: ["SAST", "SCA", "DAST"],
      correct: 1,
      explain: "**SCA** : Software Composition Analysis."
    }
  },
  {
    ch: "agile",
    step: {
      type: "qcm",
      q: "« La page charge en moins de 2 secondes » est un besoin…",
      options: ["fonctionnel", "non fonctionnel"],
      correct: 1,
      explain: "C'est une qualité (performance) : **non fonctionnel**."
    }
  },
  {
    ch: "agile",
    step: {
      type: "qcm",
      q: "Qui priorise le backlog en Scrum ?",
      options: ["Le Scrum Master", "Le Product Owner", "L'équipe de dev"],
      correct: 1,
      explain: "Le **Product Owner**."
    }
  },
  {
    ch: "rust",
    step: {
      type: "qcm",
      q: "Ce code Rust compile-t-il ?",
      code: {
        rs: `let x = 5;
x = 6;`
      },
      options: ["Oui", "Non"],
      correct: 1,
      explain: "`x` n'est pas `mut` : il est immuable."
    }
  },
  {
    ch: "rust",
    step: {
      type: "qcm",
      q: "En Rust, qu'est-ce qui remplace null ?",
      options: ["Result", "Option", "match"],
      correct: 1,
      explain: "**Option** : Some(valeur) ou None."
    }
  }
];
