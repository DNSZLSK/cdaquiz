// Vocabulaire Sensei - chapitre "Le vocabulaire du senior" : 4 lecons, 22 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "senior",
  title: "Le vocabulaire du senior",
  goal: "Les expressions que les devs expérimentés utilisent tous les jours, et comment les placer.",
  lessons: [
    {
      id: "senior-bugs",
      title: "Parler d'un problème",
      sub: "Happy path, edge case, race condition, goulot",
      steps: [
        {
          type: "concept",
          term: "Happy path",
          def: "Le **chemin heureux** : le scénario où tout se passe bien (bonnes données, pas d'erreur). Un senior pense aussi à tout le reste.",
          beginner: "Ça marche quand je teste.",
          phrase: "Ça marche sur le happy path, mais on n'a pas géré les erreurs."
        },
        {
          type: "concept",
          term: "Edge case",
          def: "Un **cas à la marge** : une situation rare ou extrême. Liste vide, 0, texte de 300 caractères, 29 février… En français : cas limite.",
          beginner: "Ça plante dans un cas bizarre.",
          phrase: "Il y a un edge case quand la liste est vide."
        },
        {
          type: "concept",
          term: "Race condition",
          def: "Deux actions se font **en même temps**, et le résultat dépend de **celle qui finit en premier**. Exemple : deux clics rapides sur « Payer » créent deux paiements.",
          beginner: "Des fois ça marche, des fois non.",
          phrase: "On a une race condition entre les deux requêtes."
        },
        {
          type: "concept",
          term: "Goulot d'étranglement",
          def: "La partie **la plus lente**, qui ralentit tout le reste. Accélérer le reste ne sert à rien tant qu'on ne règle pas le goulot. En anglais : bottleneck.",
          beginner: "C'est lent.",
          phrase: "Le goulot d'étranglement, c'est la requête SQL sans index."
        },
        {
          type: "concept",
          term: "Scalabilité",
          def: "La capacité à **supporter plus** (plus d'utilisateurs, plus de données) sans s'écrouler. « Ça ne scale pas » : ça marche avec 10 utilisateurs, pas avec 10 000.",
          beginner: "Ça marchera plus quand il y aura du monde.",
          phrase: "Cette boucle en O(n²) ne scale pas."
        },
        {
          type: "qcm",
          q: "Le débutant dit : « Des fois ça marche, des fois non, je comprends pas. » Que dirait un senior ?",
          options: [
            "« C'est un bug aléatoire, il vaut mieux relancer le serveur et voir si ça revient. »",
            "« Ça doit venir du réseau, il est instable en ce moment : il faut réessayer plus tard. »",
            "« On a sûrement une race condition : le résultat dépend de l'ordre d'arrivée des requêtes. »"
          ],
          correct: 2,
          explain: "Le senior **nomme** le mécanisme probable (race condition) et **explique** pourquoi (l'ordre des requêtes). Rien n'est vraiment « aléatoire » en informatique."
        },
        {
          type: "cloze",
          sentence: "Ça marche quand tout va bien, sur le ___, mais pas quand l'utilisateur oublie un champ.",
          options: ["edge case", "happy path", "goulot d'étranglement"],
          correct: 1,
          why: [
            "L'edge case, c'est justement le cas à la marge, comme le champ oublié. Ici on parle du cas où tout va bien.",
            "",
            "Le goulot parle de lenteur, pas de scénario."
          ]
        },
        {
          type: "cloze",
          sentence: "Une liste vide, une date du 29 février, un nom de 300 caractères : ce sont des ___.",
          options: ["race conditions", "happy paths", "edge cases"],
          correct: 2,
          why: [
            "Une race condition demande deux actions en même temps.",
            "Le happy path, c'est quand tout est normal. Ici ce sont des cas extrêmes.",
            ""
          ]
        },
        {
          type: "build",
          intro: "Construisez la phrase du senior.",
          answer: ["Le goulot d'étranglement", "c'est la requête SQL", "qui n'a pas d'index"],
          distractors: ["c'est lent", "le happy path"]
        },
        {
          type: "explain",
          q: "Reformulez comme un senior : « Le site devient super lent quand il y a beaucoup de monde, je sais pas pourquoi. »",
          keywords: ["scal", "goulot", "utilisateurs"],
          model: "Le site ne scale pas : les temps de réponse explosent quand le nombre d'utilisateurs augmente. Il faut trouver le goulot d'étranglement, par exemple une requête SQL sans index ou une boucle en O(n²)."
        }
      ]
    },
    {
      id: "senior-review",
      title: "Relire le code des autres",
      sub: "Code review, hardcodé, code mort, sur-ingénierie",
      steps: [
        {
          type: "concept",
          term: "Code review",
          def: "La **relecture** du code d'un collègue avant de le fusionner. Le but : trouver les problèmes et partager les connaissances, **pas** juger la personne.",
          beginner: "Je regarde ton code.",
          phrase: "J'ai fait la code review de ta PR, j'ai laissé deux commentaires."
        },
        {
          type: "concept",
          term: "Hardcodé",
          def: "Une valeur **écrite en dur** dans le code, au lieu d'être dans une configuration ou une constante. Exemple : une adresse de serveur ou un mot de passe directement dans le fichier.",
          code: {
            js: "const url = \"http://192.168.1.12:3000\";   // hardcodé",
            py: "url = \"http://192.168.1.12:3000\"   # hardcodé",
            rs: "let url = \"http://192.168.1.12:3000\";   // hardcodé"
          },
          beginner: "T'as mis l'adresse directement.",
          phrase: "Ce lien vers l'API est hardcodé, il faudrait le mettre dans la config."
        },
        {
          type: "concept",
          term: "Code mort",
          def: "Du code qui **n'est jamais exécuté** : une fonction jamais appelée, un `if` toujours faux. On le supprime, Git garde l'historique.",
          beginner: "Ce truc sert à rien.",
          phrase: "Cette fonction est du code mort, on peut la supprimer."
        },
        {
          type: "concept",
          term: "Boilerplate",
          def: "Du code **répétitif et obligatoire**, toujours le même, qu'on écrit juste pour que le reste marche (configuration, imports, structure de base).",
          beginner: "Tout le code de base qu'on recopie.",
          phrase: "Le framework génère le boilerplate pour nous."
        },
        {
          type: "concept",
          term: "Sur-ingénierie",
          def: "Faire **beaucoup plus compliqué que nécessaire**, pour des besoins qui n'existent pas encore. En anglais : over-engineering.",
          beginner: "C'est trop compliqué pour ce que ça fait.",
          phrase: "Trois design patterns pour un formulaire, c'est de la sur-ingénierie."
        },
        {
          type: "concept",
          term: "Nit",
          def: "En code review, un **petit détail** sans gravité (un nom, une virgule). On commence le commentaire par « nit: » pour dire « ce n'est pas bloquant ».",
          code: "nit: je renommerais data en users, c'est plus parlant.",
          phrase: "C'est juste un nit, ce n'est pas bloquant."
        },
        {
          type: "qcm",
          q: "En review, vous voyez `const API_KEY = \"abc123\";` dans le code. Quel commentaire est le plus senior ?",
          options: [
            "« La clé API est hardcodée : sortez-la dans une variable d'environnement, sinon elle finit dans Git. »",
            "« Attention, ce code n'est pas terrible, il faudrait le revoir avant de le fusionner. »",
            "« nit: renomme la variable en apiKey, c'est la convention camelCase en JavaScript. »"
          ],
          correct: 0,
          explain: "Il **nomme** le problème (hardcodée), **propose** une solution (variable d'environnement) et **explique** le risque (Git). Et ce n'est pas un nit : c'est un problème de sécurité."
        },
        {
          type: "cloze",
          sentence: "Une fonction que personne n'appelle jamais, c'est du code ___.",
          options: ["dupliqué", "mort", "hardcodé"],
          correct: 1,
          why: ["Dupliqué, c'est du code copié à plusieurs endroits.", "", "Hardcodé parle d'une valeur écrite en dur."]
        },
        {
          type: "cloze",
          sentence: "« nit: » au début d'un commentaire de review veut dire que la remarque est ___.",
          options: ["urgente", "non bloquante", "une faille de sécurité"],
          correct: 1,
          why: ["C'est l'inverse : nit annonce un petit détail.", "", "Une faille n'est jamais un nit."]
        },
        {
          type: "build",
          intro: "Écrivez le commentaire de review.",
          answer: ["Cette valeur est hardcodée", "il faudrait la mettre", "dans la configuration"],
          distractors: ["c'est du code mort", "c'est nul"]
        },
        {
          type: "explain",
          q: "Écrivez un commentaire de code review poli et précis pour ce code.",
          code: {
            js: `function getPrice(p) {
  return p * 1.2;
}`,
            py: `def get_price(p):
    return p * 1.2`,
            rs: `fn get_price(p: f64) -> f64 {
    p * 1.2
}`
          },
          keywords: ["nombre magique", "constante", "nom", "TVA"],
          model: "nit: 1.2 est un nombre magique. Je le sortirais dans une constante nommée, par exemple TVA_RATE = 0.2, pour qu'on comprenne tout de suite que c'est la TVA. Et p pourrait s'appeler priceHT, c'est plus parlant."
        }
      ]
    },
    {
      id: "senior-change",
      title: "Parler des changements",
      sub: "Breaking change, rétrocompatible, rollback, hotfix",
      steps: [
        {
          type: "concept",
          term: "Breaking change",
          def: "Une modification qui **casse** le code de ceux qui vous utilisent : on renomme une fonction publique, on change le format d'une réponse d'API.",
          beginner: "J'ai changé un truc et l'appli des autres marche plus.",
          phrase: "Renommer ce champ est un breaking change pour le front."
        },
        {
          type: "concept",
          term: "Rétrocompatible",
          def: "Une nouvelle version qui **marche encore avec l'ancien code** de ceux qui vous utilisent. C'est l'inverse d'un breaking change.",
          phrase: "On ajoute le nouveau champ sans supprimer l'ancien, pour rester rétrocompatible."
        },
        {
          type: "concept",
          term: "Rollback",
          def: "**Revenir à la version précédente** quand une mise en production se passe mal.",
          beginner: "On remet comme avant !",
          phrase: "La mise en prod a cassé le paiement, on fait un rollback."
        },
        {
          type: "concept",
          term: "Hotfix",
          def: "Une **correction urgente** mise en production tout de suite, sans attendre la prochaine version.",
          phrase: "On déploie un hotfix pour corriger la faille."
        },
        {
          type: "concept",
          term: "Feature flag",
          def: "Un **interrupteur** dans le code qui active ou désactive une fonctionnalité sans redéployer. Pratique pour la tester sur quelques utilisateurs.",
          code: {
            js: `if (flags.nouveauPanier) {
  afficherNouveauPanier();
}`,
            py: `if flags.nouveau_panier:
    afficher_nouveau_panier()`,
            rs: `if flags.nouveau_panier {
    afficher_nouveau_panier();
}`
          },
          phrase: "La nouvelle page est derrière un feature flag."
        },
        {
          type: "concept",
          term: "POC",
          def: "Proof of Concept : un **prototype rapide** pour vérifier qu'une idée est faisable, sans soigner le code. On le jette souvent après.",
          beginner: "J'ai fait un test vite fait pour voir si ça marche.",
          phrase: "On fait un POC de deux jours avant de choisir la techno."
        },
        {
          type: "qcm",
          q: "Vous renommez `user_name` en `username` dans la réponse de votre API. Le front utilisait `user_name`. C'est…",
          options: ["un hotfix", "un rollback", "un breaking change"],
          correct: 2,
          explain: "Le front attend `user_name` et ne le trouve plus : il casse. C'est un **breaking change**."
        },
        {
          type: "cloze",
          sentence: "La mise en prod a cassé la connexion : on fait un ___ vers la version d'hier.",
          options: ["rollback", "POC", "feature flag"],
          correct: 0,
          why: [
            "",
            "Un POC est un prototype, pas un retour en arrière.",
            "Un feature flag aurait pu éviter le problème, mais revenir à la version d'hier, c'est un rollback."
          ]
        },
        {
          type: "build",
          intro: "Expliquez votre choix comme un senior.",
          answer: ["On garde l'ancien champ", "pour rester rétrocompatible", "pendant la migration"],
          distractors: ["on fait un breaking change", "vite fait"]
        },
        {
          type: "explain",
          q: "Reformulez comme un senior : « J'ai mis la nouvelle version en ligne, ça a tout cassé, du coup j'ai remis l'ancienne vite fait et là je corrige. »",
          keywords: ["rollback", "hotfix", "régression"],
          model: "Le déploiement a introduit une régression, donc on a fait un rollback vers la version précédente. Je prépare un hotfix, et on redéploiera une fois qu'il sera testé."
        }
      ]
    },
    {
      id: "senior-choix",
      title: "Défendre une conception",
      sub: "KISS, YAGNI, source unique de vérité, état",
      steps: [
        {
          type: "concept",
          term: "KISS",
          def: "Keep It Simple, Stupid : **la solution la plus simple qui marche** est souvent la meilleure.",
          phrase: "Restons KISS : une simple fonction suffit."
        },
        {
          type: "concept",
          term: "YAGNI",
          def: "You Aren't Gonna Need It : **ne codez pas aujourd'hui ce dont vous n'avez pas besoin aujourd'hui**. Ça évite la sur-ingénierie.",
          beginner: "On sait jamais, ça pourra servir.",
          phrase: "Le multi-langue ? YAGNI pour l'instant."
        },
        {
          type: "concept",
          term: "Source unique de vérité",
          def: "Une information est stockée **à un seul endroit**, et tout le monde lit celle-là. Sinon, deux copies finissent par ne plus être d'accord.",
          beginner: "Le prix est pas le même sur la page et dans le panier.",
          phrase: "La base de données est la source unique de vérité pour les prix."
        },
        {
          type: "concept",
          term: "État",
          def: "**Les données qui changent** pendant que l'application tourne : le contenu du panier, l'utilisateur connecté, l'onglet ouvert. En anglais : state.",
          phrase: "L'état du panier est perdu quand on recharge la page."
        },
        {
          type: "concept",
          term: "Asynchrone",
          def: "Une opération qui **prend du temps** (appel réseau, lecture de fichier) : le programme continue pendant ce temps et récupère le résultat plus tard. `await` met **la fonction en cours** en pause jusqu'au résultat, sans bloquer le reste du programme.",
          code: {
            js: "const res = await fetch(\"/api/users\");   // on attend la réponse",
            py: "res = await client.get(\"/api/users\")   # on attend la réponse",
            rs: "let res = client.get(url).send().await?;   // on attend la réponse"
          },
          phrase: "L'appel à l'API est asynchrone."
        },
        {
          type: "qcm",
          q: "Votre collègue veut prévoir 5 moyens de paiement alors que le client n'en demande qu'un. Quelle réponse est la plus senior ?",
          options: [
            "« YAGNI : on fait la carte bancaire, et on rendra le code extensible quand un deuxième moyen arrivera. »",
            "« Bonne idée : autant prévoir les 5 moyens tout de suite, on gagnera du temps plus tard. »",
            "« Non, le client n'a demandé que la carte, on ne fera jamais les autres moyens de paiement. »"
          ],
          correct: 0,
          explain: "Il **nomme** le principe (YAGNI), **propose** un plan (une seule chose maintenant) et **rassure** (on pourra étendre plus tard). Ce n'est ni un oui mou, ni un non sec."
        },
        {
          type: "cloze",
          sentence: "Le prix est stocké à deux endroits et ils ne sont plus d'accord : il manque une source unique de ___.",
          options: ["données", "vérité", "configuration"],
          correct: 1,
          why: [
            "On dit « source unique de vérité » : c'est l'expression consacrée.",
            "",
            "Ce n'est pas l'expression consacrée."
          ]
        },
        {
          type: "cloze",
          sentence: "Un appel réseau qui prend du temps et qu'on attend avec `await` est ___.",
          options: ["idempotent", "hardcodé", "asynchrone"],
          correct: 2,
          why: [
            "Idempotent veut dire « même résultat si on le refait ». Rien à voir avec le temps d'attente.",
            "Hardcodé parle d'une valeur écrite en dur.",
            ""
          ]
        },
        {
          type: "build",
          intro: "Construisez la réponse du senior.",
          answer: ["Restons simples", "une fonction suffit", "on ajoutera le reste", "quand on en aura besoin"],
          distractors: ["on sait jamais", "un singleton"]
        },
        {
          type: "explain",
          q: "Défendez ce choix comme un senior, avec « parce que » et un compromis : vous avez choisi une simple fonction plutôt qu'un design pattern compliqué.",
          keywords: ["parce que", "simple", "en revanche", "besoin"],
          model: "J'ai choisi une simple fonction parce que le besoin actuel est simple : c'est plus lisible et plus facile à tester. En revanche, si on ajoute d'autres cas plus tard, on pourra la refactoriser vers un pattern Strategy. YAGNI pour l'instant."
        }
      ]
    },
    {
      id: "senior-archi",
      title: "Parler d'architecture",
      sub: "Idempotent, couplage, cohésion, contrat d'API",
      steps: [
        {
          type: "concept",
          term: "Idempotent",
          def: "Une opération qu'on peut **rejouer** sans changer le résultat : la faire 1 fois ou 5 fois donne le même état. `DELETE /commandes/42` est idempotent ; un `POST /paiements` rejoué crée deux paiements, sauf avec une clé d'idempotence.",
          phrase: "Le webhook peut arriver deux fois, le traitement doit être idempotent."
        },
        {
          type: "concept",
          term: "Couplage",
          def: "À quel point deux modules **dépendent l'un de l'autre**. Couplage fort : changer l'un oblige à changer l'autre. On vise un couplage **faible**.",
          phrase: "Ce service lit les tables de l'autre : le couplage est trop fort."
        },
        {
          type: "concept",
          term: "Cohésion",
          def: "À quel point un module est **centré sur une seule responsabilité**. Forte cohésion : tout ce qu'il contient sert le même but. On vise une cohésion **forte**.",
          phrase: "La classe Utils mélange tout : sa cohésion est faible."
        },
        {
          type: "concept",
          term: "Contrat d'API",
          def: "Ce que l'API **promet** à ceux qui l'appellent : les routes, les paramètres, le format des réponses, les codes d'erreur. Le changer sans prévenir, c'est un breaking change.",
          phrase: "On a respecté le contrat d'API : le champ est toujours là."
        },
        {
          type: "cloze",
          sentence: "Rejouer deux fois la même requête ne doit pas créer deux paiements : le traitement doit être ___.",
          options: ["idempotent", "asynchrone", "rétrocompatible"],
          correct: 0,
          why: [
            "",
            "Asynchrone, c'est ne pas bloquer en attendant le résultat. Ici, la question est : que se passe-t-il si on rejoue ?",
            "Rétrocompatible parle d'une nouvelle version qui marche avec l'ancien code."
          ]
        },
        {
          type: "qcm",
          q: "Une classe Utils contient l'envoi d'emails, le calcul de la TVA et le format des dates. Que dit un senior ?",
          options: [
            "« Son couplage est faible : elle ne dépend d'aucune autre classe du projet. »",
            "« Elle est idempotente : on peut l'appeler plusieurs fois sans risque. »",
            "« Sa cohésion est faible : elle mélange trois responsabilités sans rapport. »"
          ],
          correct: 2,
          explain: "Il **nomme** le problème (cohésion faible) et **explique** pourquoi (trois responsabilités). Un faible couplage serait une qualité, mais il ne dit rien du mélange de rôles ; l'idempotence concerne une opération qu'on rejoue, pas une classe."
        },
        {
          type: "qcm",
          q: "Le service Facturation lit directement les tables du service Commandes. Quel est le problème ?",
          options: [
            "Une cohésion trop forte : Facturation est trop centré sur un seul rôle",
            "Un couplage fort : un changement de table chez Commandes casse Facturation",
            "Un problème d'idempotence : lire les tables modifie les données de Commandes"
          ],
          correct: 1,
          explain: "Facturation dépend des **détails internes** de Commandes : renommer une colonne chez Commandes casse Facturation. C'est un **couplage fort**. On passe plutôt par le **contrat d'API** de Commandes. Une cohésion forte est une qualité, et une lecture ne modifie rien."
        }
      ]
    }
  ]
};
