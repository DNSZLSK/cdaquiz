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
        "Enregistre un snapshot du fichier dans l'historique local du dépôt (commit)",
        "Envoie le fichier vers le dépôt distant origin",
        "Restaure le fichier à son dernier état commité"
      ],
      "answer": 0,
      "explanation": "git add place le fichier dans la zone de staging (index). C'est une étape intermédiaire : le fichier est marqué pour le prochain commit mais pas encore commité. Le workflow complet est : modifier → git add → git commit → git push. Enregistrer un snapshot dans l'historique est le rôle de git commit, pas de add. L'envoi vers le distant origin relève de git push. Et restaurer le fichier à son dernier état commité serait git restore (anciennement git checkout --), soit l'inverse de ce que fait add.",
      "hint": "Il y a 3 zones en Git : working directory → staging area → repository. Quelle commande fait passer un fichier d'une zone à la suivante ?"
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
        "Envoie les commits en attente vers le dépôt distant",
        "Place les fichiers modifiés dans la zone de staging",
        "Enregistre toutes les modifications, même celles non stagées"
      ],
      "answer": 0,
      "explanation": "git commit enregistre les fichiers de la zone de staging dans l'historique LOCAL du dépôt. Le -m permet d'écrire le message de commit en ligne. Le commit reste local tant qu'on ne fait pas git push. Envoyer les commits vers le distant est justement le rôle de git push. Placer les fichiers en staging est celui de git add, en amont. Et sans l'option -a, commit n'embarque pas les modifications non stagées : seul le contenu de l'index est enregistré.",
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
        "Voir les changements → commiter localement → stager → envoyer sur le distant",
        "Stager → voir les changements → commiter localement → envoyer sur le distant",
        "Voir les changements → stager → envoyer sur le distant → commiter localement"
      ],
      "answer": 0,
      "explanation": "Le workflow Git standard : status (vérifier ce qui a changé) → add (stager les fichiers) → commit (enregistrer localement) → push (envoyer au dépôt distant). Commiter avant de stager est impossible : commit n'enregistre que ce qui se trouve déjà dans l'index. Placer status après add ne correspond pas au script, où git status est bien exécuté en premier. Et envoyer avant de commiter n'a pas de sens : push ne transporte que des commits déjà créés.",
      "hint": "On ne peut pas pousser ce qu'on n'a pas commité, et on ne peut pas commiter ce qu'on n'a pas stagé."
    },
    {
      "id": "git-04",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "branche"
      ],
      "code": "git switch -c feature/inscription\n# ... modifications ...\ngit add .\ngit commit -m \"feat: formulaire d'inscription\"\ngit push -u origin feature/inscription",
      "question": "Que fait git switch -c feature/inscription ?",
      "options": [
        "Crée une nouvelle branche ET se positionne dessus",
        "Crée la branche mais reste positionné sur la branche courante",
        "Bascule sur une branche existante nommée feature/inscription",
        "Crée la branche directement sur le dépôt distant origin"
      ],
      "answer": 0,
      "explanation": "switch -c (c pour create) crée la branche ET bascule dessus : c'est la forme moderne de git checkout -b, et un raccourci pour git branch feature/inscription suivi de git switch feature/inscription. La nouvelle branche part du commit actuel, et les commits suivants n'affectent qu'elle. Créer sans basculer est le comportement de git branch seul. Basculer sur une branche existante correspond à git switch sans -c, qui échouerait ici puisque la branche n'existe pas encore. Et rien n'est créé côté distant à ce stade : c'est le git push -u origin feature/inscription final qui publie la branche (et -u la relie à la branche distante pour les prochains push et pull).",
      "hint": "Comparez avec git branch feature/inscription seul : que fait switch en plus ?"
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
        "Les commits de main sont intégrés dans feature/inscription",
        "Les commits de feature/inscription sont rejoués avec de nouveaux hashs",
        "La branche feature/inscription est supprimée après l'intégration"
      ],
      "answer": 0,
      "explanation": "On se place sur main (checkout main), puis on y intègre les commits de feature/inscription (merge). Le merge crée un commit de fusion si les deux branches ont divergé, ou fait un fast-forward si main n'a pas bougé. Le sens inverse (intégrer main dans feature/inscription) aurait exigé de rester positionné sur la branche feature. Rejouer les commits avec de nouveaux hashs décrit un rebase, pas un merge. Et Git ne supprime jamais la branche fusionnée automatiquement : git branch -d reste un geste explicite.",
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
        "La sortie d'un git diff entre les deux branches, copiée dans le fichier",
        "Des annotations ajoutées par git blame pour tracer les auteurs",
        "Un patch généré par git format-patch à appliquer manuellement"
      ],
      "answer": 0,
      "explanation": "C'est un conflit de merge. HEAD (branche courante) a une version, feature/traduction en a une autre. Git ne peut pas choisir automatiquement. Le développeur doit : supprimer les marqueurs, garder le bon code, puis git add + git commit pour résoudre le conflit. git diff affiche ses différences dans le terminal avec des préfixes + et -, il n'écrit pas ces marqueurs dans le fichier. git blame annote chaque ligne avec son commit et son auteur, sans balises <<<<<<<. Et un patch format-patch prend la forme d'un mail contenant un diff, pas de ces trois marqueurs imbriqués dans le code.",
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
        "restore",
        "restore --staged",
        "reset --hard",
        "revert"
      ],
      "answer": 0,
      "explanation": "git restore App.java remet le fichier dans son dernier état stagé (ou commité), en annulant les modifications locales : elles sont perdues définitivement. C'est la commande dédiée depuis Git 2.23, qui remplace l'ancien git checkout -- App.java. Si le fichier était déjà stagé, on le retire d'abord de l'index avec git restore --staged App.java. restore --staged seul fait l'inverse du besoin : il désindexe sans toucher au fichier. reset --hard refuse un chemin de fichier (Git répond 'Cannot do hard reset with paths') et remettrait de toute façon tout le projet en arrière. Et revert crée un commit qui annule un commit déjà enregistré, pas des modifications non commitées.",
      "hint": "On ne veut toucher ni à l'index, ni à l'historique : seulement au fichier dans le working directory."
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
        "Les 5 derniers commits, un par ligne : hash court et message",
        "Les 5 derniers commits, avec le détail des lignes modifiées (diff)",
        "Tout l'historique, affiché par pages de 5 commits",
        "Les commits des 5 derniers jours, au format compact"
      ],
      "answer": 0,
      "explanation": "--oneline affiche chaque commit sur une seule ligne (hash court + message). -5 limite à 5 résultats. C'est un raccourci pour avoir une vue rapide de l'historique récent. Le détail des lignes modifiées demanderait l'option -p (ou --stat pour un résumé), absente ici. -5 n'est pas une pagination : la commande s'arrête après 5 commits au lieu de parcourir tout l'historique par blocs. Et il s'agit d'un nombre de commits, pas d'une période : filtrer par date se ferait avec --since.",
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
        "Crée un commit de sauvegarde sur la branche courante, visible dans git log",
        "Annule les modifications en cours en restaurant le dernier commit",
        "Place les modifications en zone de staging pour le prochain commit"
      ],
      "answer": 0,
      "explanation": "git stash sauvegarde les modifications locales dans une pile temporaire et remet le working directory propre. On peut ensuite changer de branche. git stash pop restaure les modifications sauvegardées. C'est comme mettre son travail en pause. Aucun commit n'est ajouté à la branche : le stash vit dans une pile séparée et n'apparaît pas dans le git log de la branche courante. Rien n'est perdu non plus, contrairement à un git checkout -- qui écraserait les modifications. Et rien ne passe en staging : stash retire justement les changements de l'index et du working directory.",
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
        "Dire à Git de ne pas suivre ces fichiers et dossiers non encore trackés",
        "Retirer ces fichiers de l'historique des commits déjà créés",
        "Empêcher le push de ces fichiers tout en les laissant commités en local",
        "Donner à git clean la liste des fichiers à supprimer du disque"
      ],
      "answer": 0,
      "explanation": ".gitignore liste les fichiers et dossiers que Git doit ignorer. node_modules/ (dépendances npm), *.class (compilés Java), .env (secrets), target/ (build Maven), .idea/ (config IDE) ne doivent JAMAIS être commités. C'est une des premières choses à configurer dans un projet. Il n'agit que sur les fichiers non encore trackés : un fichier déjà commité reste dans l'historique tant qu'on ne fait pas git rm --cached. Il ne filtre rien au moment du push : tout commit local part vers le distant. Et git clean fait l'inverse de cette lecture : par défaut il épargne les fichiers ignorés au lieu de les cibler.",
      "hint": "Ces fichiers sont soit générés automatiquement, soit contiennent des secrets, soit sont trop volumineux."
    },
    {
      "id": "git-11",
      "type": "complete",
      "difficulty": "advanced",
      "concepts": [
        "reflog",
        "reset --hard",
        "récupération"
      ],
      "code": "git reset --hard HEAD~2   # oups : deux commits disparaissent de la branche\ngit ______                # retrouver l'id des commits perdus\ngit reset --hard HEAD@{1}  # revenir à l'état d'avant le reset",
      "question": "Quelle commande liste les positions récentes de HEAD, y compris celle d'avant le reset ?",
      "options": [
        "log",
        "reflog",
        "revert",
        "stash list"
      ],
      "answer": 1,
      "explanation": "git reflog enregistre chaque déplacement de HEAD (commit, reset, checkout…) dans le dépôt local, pendant 90 jours par défaut. Les commits « perdus » après un reset --hard y sont toujours : HEAD@{1} désigne la position d'avant le dernier déplacement. git log ne montre que les commits accessibles depuis la branche actuelle, donc plus ceux-là. revert crée un commit inverse, et stash list liste les modifications mises de côté.",
      "hint": "git log suit la branche. Quelle commande suit les mouvements de HEAD lui-même ?"
    }
  ]
};
