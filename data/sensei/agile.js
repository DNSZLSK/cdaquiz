// Vocabulaire Sensei - chapitre "Besoins et agilité" : 3 lecons, 12 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "agile",
  title: "Besoins et agilité",
  goal: "Comprendre un besoin et le transformer en travail concret.",
  lessons: [
    {
      id: "besoins",
      title: "Comprendre le besoin",
      sub: "Fonctionnel, non fonctionnel, partie prenante",
      steps: [
        {
          type: "concept",
          term: "Besoin fonctionnel",
          def: "Ce que le système doit **faire**. Une action visible pour l'utilisateur.",
          code: `- L'utilisateur peut réinitialiser son mot de passe.
- L'admin peut exporter les commandes en CSV.`,
          phrase: "C'est un besoin fonctionnel : l'export CSV."
        },
        {
          type: "concept",
          term: "Besoin non fonctionnel",
          def: "**Comment** le système doit le faire : vitesse, sécurité, disponibilité, accessibilité…",
          code: `- La page s'affiche en moins de 2 secondes.
- Les mots de passe sont hachés.
- Le site est disponible 99,9 % du temps.`,
          phrase: "La performance est un besoin non fonctionnel."
        },
        {
          type: "qcm",
          q: "« Les données sont chiffrées en base. » C'est un besoin…",
          options: ["fonctionnel", "non fonctionnel"],
          correct: 1,
          explain: "Ça ne décrit pas une action de l'utilisateur, mais une **qualité** (la sécurité) : **non fonctionnel**."
        },
        {
          type: "qcm",
          q: "« Le client peut suivre sa livraison. » C'est un besoin…",
          options: ["fonctionnel", "non fonctionnel"],
          correct: 0,
          explain: "C'est une **action** que l'utilisateur fait : **fonctionnel**."
        },
        {
          type: "concept",
          term: "Partie prenante",
          def: "**Toute personne concernée** par le projet : client, utilisateurs, équipe, juridique… En anglais : stakeholder.",
          phrase: "Il faut valider ce besoin avec les parties prenantes."
        },
        {
          type: "cloze",
          sentence: "« L'appli doit être utilisable avec un lecteur d'écran » est un besoin ___.",
          options: ["non fonctionnel", "fonctionnel", "technique interdit"],
          correct: 0,
          why: [
            "",
            "Ce n'est pas une nouvelle action : c'est une qualité (l'accessibilité).",
            "Ça n'existe pas : c'est un besoin d'accessibilité."
          ]
        }
      ]
    },
    {
      id: "user-story",
      title: "User stories",
      sub: "Format, critères d'acceptation, Definition of Done",
      steps: [
        {
          type: "concept",
          term: "User story",
          def: "Un besoin écrit **du point de vue de l'utilisateur**, en une phrase : « En tant que [qui], je veux [quoi] afin de [pourquoi] ».",
          code: `En tant que client,
je veux suivre ma commande
afin de savoir quand elle arrive.`,
          phrase: "J'ai rédigé la user story du suivi de commande."
        },
        {
          type: "build",
          intro: "Reconstruisez la user story.",
          answer: ["En tant qu'administrateur", "je veux exporter les commandes", "afin de faire la comptabilité"],
          distractors: ["la base de données", "en moins de 2 secondes"]
        },
        {
          type: "concept",
          term: "Critères d'acceptation",
          def: "Les **conditions précises** pour dire que la story est réussie. Format courant : **Étant donné** (le contexte) / **Quand** (l'action) / **Alors** (le résultat).",
          code: `Étant donné une commande expédiée,
quand le client ouvre « Mes commandes »,
alors il voit le numéro de suivi.`,
          phrase: "Les critères d'acceptation sont écrits au format Given/When/Then."
        },
        {
          type: "cloze",
          sentence: "Dans un critère d'acceptation, « Alors » décrit ___.",
          options: ["le contexte de départ", "l'action de l'utilisateur", "le résultat attendu"],
          correct: 2,
          why: ["Le contexte, c'est « Étant donné ».", "L'action, c'est « Quand ».", ""]
        },
        {
          type: "concept",
          term: "Definition of Done",
          def: "La liste commune de ce qui doit être fait pour qu'une tâche soit **vraiment terminée** : code relu, tests verts, documentation à jour…",
          phrase: "Ce n'est pas fini : ça ne respecte pas la Definition of Done."
        },
        {
          type: "explain",
          q: "Écrivez une user story pour une fonctionnalité de Muaddib (ou d'une appli de votre choix), avec un critère d'acceptation.",
          keywords: ["en tant que", "je veux", "afin de", "étant donné", "quand", "alors"],
          model: "En tant que développeur, je veux analyser les dépendances de mon projet afin de repérer les paquets suspects. Étant donné un projet avec un package.json, quand je lance l'analyse, alors je vois la liste des dépendances à risque avec leur niveau de gravité."
        }
      ]
    },
    {
      id: "scrum",
      title: "Scrum et agilité",
      sub: "Sprint, backlog, rôles, MVP",
      steps: [
        {
          type: "concept",
          term: "Agilité",
          def: "Livrer **petit et souvent**, montrer le résultat, et **s'adapter** aux retours, plutôt que tout prévoir au début.",
          phrase: "On travaille en agile, par petites itérations."
        },
        {
          type: "concept",
          term: "Sprint",
          def: "Une **période fixe** (souvent 2 semaines) pendant laquelle l'équipe réalise un lot de tâches choisi au début.",
          phrase: "Cette story est prévue pour le prochain sprint."
        },
        {
          type: "concept",
          term: "Backlog",
          def: "La **liste priorisée** de tout ce qu'il reste à faire. Le plus important est en haut.",
          phrase: "On ajoute la story au backlog."
        },
        {
          type: "concept",
          term: "Rôles Scrum",
          def: "**Product Owner** : décide quoi faire et dans quel ordre (il gère le backlog). **Scrum Master** : aide l'équipe à bien travailler et retire les obstacles. **Développeurs** : réalisent.",
          phrase: "Le Product Owner a repriorisé le backlog."
        },
        {
          type: "concept",
          term: "Rituels Scrum",
          def: "Le Scrum Guide 2020 parle d'**événements** (« rituels » est le mot courant en entreprise). **Sprint Planning** : on choisit le travail et l'**objectif du sprint** (Sprint Goal). **Daily Scrum** : 15 min chaque jour pour faire le point sur l'avancement vers cet objectif. **Sprint Review** : on montre ce qui est fait. **Rétrospective** : on améliore notre façon de travailler.",
          phrase: "On en parlera à la rétrospective."
        },
        {
          type: "concept",
          term: "MVP",
          def: "Minimum Viable Product : la **plus petite version utile** du produit, pour tester l'idée vite avec de vrais utilisateurs.",
          phrase: "Pour le MVP, on garde seulement l'analyse npm."
        },
        {
          type: "qcm",
          q: "Qui décide de l'ordre des tâches dans le backlog ?",
          options: ["Le Scrum Master", "Le Product Owner", "Le développeur le plus senior"],
          correct: 1,
          explain: "Le **Product Owner** porte la vision du produit et priorise le backlog."
        },
        {
          type: "cloze",
          sentence: "La réunion où l'équipe discute de sa façon de travailler pour s'améliorer s'appelle la ___.",
          options: ["daily", "sprint review", "rétrospective"],
          correct: 2,
          why: ["Le daily sert à se synchroniser chaque jour.", "La sprint review sert à montrer le produit.", ""]
        }
      ]
    },
    {
      id: "agile-mesure",
      title: "Estimer et suivre",
      sub: "Epic, story points, vélocité, limite WIP, refinement",
      steps: [
        {
          type: "concept",
          term: "Epic",
          def: "Une **grosse user story**, trop grosse pour un sprint, qu'on découpe en plusieurs stories. Exemple : « Gérer le paiement » se découpe en « payer par carte », « rembourser »…",
          phrase: "On découpe l'epic Paiement en quatre stories."
        },
        {
          type: "concept",
          term: "Story points",
          def: "Une **estimation relative** de l'effort d'une story (complexité, incertitude), pas un nombre d'heures. Une story à 8 points est environ deux fois plus lourde qu'une story à 3 ou 5.",
          phrase: "L'équipe estime cette story à 5 story points."
        },
        {
          type: "concept",
          term: "Vélocité",
          def: "Le nombre de **story points terminés** par l'équipe en un sprint, en moyenne. Elle sert à prévoir combien prendre au prochain sprint, jamais à comparer des équipes ou des personnes.",
          phrase: "Notre vélocité est d'environ 30 points par sprint."
        },
        {
          type: "concept",
          term: "Limite WIP",
          def: "Le nombre maximal de tâches **en cours en même temps** dans une colonne du tableau Kanban (WIP : Work In Progress). Quand la limite est atteinte, on aide à finir avant de commencer autre chose.",
          phrase: "La colonne En revue a atteint sa limite WIP."
        },
        {
          type: "concept",
          term: "Refinement",
          def: "La séance où l'équipe et le Product Owner **préparent les prochaines stories** : on les clarifie, on les découpe, on les estime. Le Scrum Guide parle d'affinage du Product Backlog.",
          phrase: "On clarifiera cette story au prochain refinement."
        },
        {
          type: "cloze",
          sentence: "L'équipe termine en moyenne 30 story points par sprint : c'est sa ___.",
          options: ["vélocité", "Definition of Done", "limite WIP"],
          correct: 0,
          why: [
            "",
            "La Definition of Done, ce sont les critères pour dire qu'un élément est terminé.",
            "La limite WIP plafonne les tâches en cours en même temps, elle ne mesure pas ce qui est terminé."
          ]
        },
        {
          type: "qcm",
          q: "Le manager veut comparer la vélocité de deux équipes pour savoir laquelle travaille le mieux. Que lui répond un senior ?",
          options: [
            "« Chaque équipe estime à sa façon : leurs points ne se comparent pas. »",
            "« Bonne idée : l'équipe avec la plus forte vélocité est la plus productive. »",
            "« Il faut d'abord convertir les points en heures pour pouvoir comparer. »"
          ],
          correct: 0,
          explain: "Les story points sont **relatifs** à chaque équipe : 5 points chez l'une ne valent pas 5 points chez l'autre. La vélocité sert à **prévoir**, pas à juger. Convertir en heures ferait perdre tout l'intérêt de l'estimation relative."
        }
      ]
    }
  ]
};
