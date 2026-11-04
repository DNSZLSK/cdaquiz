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
          intro: "Reconstruis la user story.",
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
          options: ["le résultat attendu", "le contexte de départ", "l'action de l'utilisateur"],
          correct: 0,
          why: ["", "Le contexte, c'est « Étant donné ».", "L'action, c'est « Quand »."]
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
          def: "**Daily** : 15 min chaque jour (hier, aujourd'hui, mes blocages). **Sprint review** : on montre ce qui est fait. **Rétrospective** : on améliore notre façon de travailler.",
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
          options: ["rétrospective", "daily", "sprint review"],
          correct: 0,
          why: ["", "Le daily sert à se synchroniser chaque jour.", "La sprint review sert à montrer le produit."]
        }
      ]
    }
  ]
};
