export default {
  "domain": "git",
  "title": "Git",
  "exercises": [
    {
      "id": "git-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "zone de staging"
      ],
      "code": "git add monFichier.java",
      "question": "Que fait cette commande ?",
      "options": [
        "Ajoute le fichier à la zone de staging (prêt à être commité)",
        "Crée un commit avec ce fichier",
        "Envoie le fichier sur le dépôt distant",
        "Crée un nouveau fichier"
      ],
      "answer": 0,
      "explanation": "git add place le fichier dans la zone de staging (index). C'est une étape intermédiaire : le fichier est marqué pour le prochain commit mais pas encore commité. Le workflow complet est : modifier → git add → git commit → git push.",
      "hint": "Il y a 3 zones en Git : working directory → staging area → repository. add fait passer de la 1ère à la 2ème."
    },
    {
      "id": "git-02",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "commit"
      ],
      "code": "git commit -m \"feat: ajout du formulaire de connexion\"",
      "question": "Que fait cette commande ?",
      "options": [
        "Enregistre un snapshot des fichiers stagés dans l'historique local",
        "Envoie les modifications sur GitHub",
        "Fusionne la branche courante avec main",
        "Crée une nouvelle branche"
      ],
      "answer": 0,
      "explanation": "git commit enregistre les fichiers de la zone de staging dans l'historique LOCAL du dépôt. Le -m permet d'écrire le message de commit en ligne. Le commit reste local tant qu'on ne fait pas git push.",
      "hint": "commit = local. push = distant. Ce sont deux étapes séparées."
    },
    {
      "id": "git-03",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "workflow de base"
      ],
      "code": "# Fichier modifié : App.java\n\ngit status\ngit add App.java\ngit commit -m \"fix: correction du bug de connexion\"\ngit push origin main",
      "question": "Dans quel ordre les opérations se passent-elles ?",
      "options": [
        "Voir les changements → stager → commiter localement → envoyer sur le distant",
        "Stager → voir les changements → envoyer → commiter",
        "Commiter → stager → envoyer → voir les changements",
        "Envoyer → commiter → stager → voir les changements"
      ],
      "answer": 0,
      "explanation": "Le workflow Git standard : status (vérifier ce qui a changé) → add (stager les fichiers) → commit (enregistrer localement) → push (envoyer au dépôt distant). Chaque étape est nécessaire dans cet ordre.",
      "hint": "On ne peut pas pousser ce qu'on n'a pas commité, et on ne peut pas commiter ce qu'on n'a pas stagé."
    },
    {
      "id": "git-04",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "branche"
      ],
      "code": "git checkout -b feature/inscription\n# ... modifications ...\ngit add .\ngit commit -m \"feat: formulaire d'inscription\"\ngit push origin feature/inscription",
      "question": "Que fait git checkout -b feature/inscription ?",
      "options": [
        "Crée une nouvelle branche ET se positionne dessus",
        "Télécharge la branche depuis le distant",
        "Supprime la branche feature/inscription",
        "Fusionne feature/inscription dans main"
      ],
      "answer": 0,
      "explanation": "checkout -b = créer ET basculer. C'est un raccourci pour git branch feature/inscription + git checkout feature/inscription. La nouvelle branche part du commit actuel. Les modifications qui suivent n'affectent que cette branche.",
      "hint": "-b signifie 'créer'. Sans -b, checkout bascule sur une branche existante."
    },
    {
      "id": "git-05",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "merge"
      ],
      "code": "git checkout main\ngit merge feature/inscription",
      "question": "Que se passe-t-il ?",
      "options": [
        "Les commits de feature/inscription sont intégrés dans main",
        "main est copié dans feature/inscription",
        "Les deux branches sont supprimées",
        "Rien : il faut d'abord faire un pull request"
      ],
      "answer": 0,
      "explanation": "On se place sur main (checkout main), puis on y intègre les commits de feature/inscription (merge). Le merge crée un commit de fusion si les deux branches ont divergé, ou fait un fast-forward si main n'a pas bougé. Le pull request est une fonctionnalité GitHub/GitLab, pas de Git lui-même.",
      "hint": "On merge DANS la branche sur laquelle on se trouve. Se placer sur main = recevoir les changements."
    },
    {
      "id": "git-06",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "conflit de merge"
      ],
      "code": "<<<<<<< HEAD\nSystem.out.println(\"Bonjour\");\n=======\nSystem.out.println(\"Hello\");\n>>>>>>> feature/traduction",
      "question": "Que signifie ce contenu dans un fichier ?",
      "options": [
        "Un conflit de merge : Git ne sait pas quelle version garder",
        "Du code Java valide avec des commentaires",
        "Un fichier corrompu par Git",
        "Le résultat d'un git stash"
      ],
      "answer": 0,
      "explanation": "C'est un conflit de merge. HEAD (branche courante) a une version, feature/traduction en a une autre. Git ne peut pas choisir automatiquement. Le développeur doit : supprimer les marqueurs, garder le bon code, puis git add + git commit pour résoudre le conflit.",
      "hint": "<<<<<<< et >>>>>>> sont des marqueurs de conflit. Entre ======= se trouvent les deux versions."
    },
    {
      "id": "git-07",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "annuler des changements"
      ],
      "code": "# J'ai modifié App.java mais je veux annuler mes modifications\n# Le fichier N'A PAS encore été stagé (pas de git add)\n\ngit ______ App.java",
      "question": "Quelle commande annule les modifications non stagées ?",
      "options": [
        "checkout --",
        "reset",
        "revert",
        "undo"
      ],
      "answer": 0,
      "explanation": "git checkout -- fichier restaure le fichier à son dernier état commité, annulant les modifications locales. Attention : les modifications sont perdues définitivement. Si le fichier était déjà stagé, il faut d'abord git reset HEAD fichier.",
      "hint": "checkout sert aussi à restaurer des fichiers (pas seulement à changer de branche)."
    },
    {
      "id": "git-08",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "git log"
      ],
      "code": "git log --oneline -5",
      "question": "Que montre cette commande ?",
      "options": [
        "Les 5 derniers commits, chacun sur une seule ligne (hash court + message)",
        "Les 5 dernières branches créées",
        "Les 5 derniers fichiers modifiés",
        "Les 5 derniers push"
      ],
      "answer": 0,
      "explanation": "--oneline affiche chaque commit sur une seule ligne (hash court + message). -5 limite à 5 résultats. C'est un raccourci pour avoir une vue rapide de l'historique récent.",
      "hint": "log = historique des commits. --oneline = format compact. -N = limiter à N résultats."
    },
    {
      "id": "git-09",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "git stash"
      ],
      "code": "# En cours de travail sur feature/A, on doit basculer d'urgence sur un fix\ngit stash\ngit checkout main\n# ... fix urgent ...\ngit checkout feature/A\ngit stash pop",
      "question": "Que fait git stash ?",
      "options": [
        "Met de côté les modifications en cours sans les commiter, pour y revenir plus tard",
        "Supprime définitivement les modifications",
        "Crée un commit temporaire",
        "Envoie les modifications sur le distant"
      ],
      "answer": 0,
      "explanation": "git stash sauvegarde les modifications locales dans une pile temporaire et remet le working directory propre. On peut ensuite changer de branche. git stash pop restaure les modifications sauvegardées. C'est comme mettre son travail en pause.",
      "hint": "stash = mettre de côté. pop = récupérer. C'est une pile (le dernier stash est le premier récupéré)."
    },
    {
      "id": "git-10",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "gitignore"
      ],
      "code": "# fichier .gitignore\nnode_modules/\n*.class\n.env\ntarget/\n.idea/",
      "question": "Quel est le rôle de ce fichier ?",
      "options": [
        "Dire à Git d'ignorer ces fichiers/dossiers (ne pas les tracker ni commiter)",
        "Supprimer ces fichiers du disque",
        "Cacher ces fichiers dans l'explorateur",
        "Protéger ces fichiers contre la modification"
      ],
      "answer": 0,
      "explanation": ".gitignore liste les fichiers et dossiers que Git doit ignorer. node_modules/ (dépendances npm), *.class (compilés Java), .env (secrets), target/ (build Maven), .idea/ (config IDE) ne doivent JAMAIS être commités. C'est une des premières choses à configurer dans un projet.",
      "hint": "Ces fichiers sont soit générés automatiquement, soit contiennent des secrets, soit sont trop volumineux."
    }
  ]
};
