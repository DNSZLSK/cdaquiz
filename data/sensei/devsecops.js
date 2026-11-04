// Vocabulaire Sensei - chapitre "DevSecOps" : 4 lecons, 22 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "devsecops",
  title: "DevSecOps",
  goal: "Git, CI/CD, Docker et sécurité de la supply chain.",
  lessons: [
    {
      id: "git",
      title: "Git",
      sub: "Commit, branche, merge, pull request",
      steps: [
        {
          type: "concept",
          term: "Dépôt",
          def: "Le dossier du projet **suivi par Git**, avec tout son historique. En anglais : repository (repo).",
          phrase: "Le code est dans le dépôt GitHub du projet."
        },
        {
          type: "concept",
          term: "Commit",
          def: "Une **photo** du projet à un moment donné, avec un message qui explique ce qui a changé.",
          code: `git add .
git commit -m "Corrige la validation de l'email"`,
          phrase: "J'ai fait un commit qui corrige la validation."
        },
        {
          type: "concept",
          term: "Branche",
          def: "Une **ligne de travail parallèle**. Vous travaillez sur votre branche sans toucher à la branche principale (`main`).",
          code: "git checkout -b fix-login   # crée la branche fix-login",
          phrase: "Je travaille sur une branche fix-login."
        },
        {
          type: "concept",
          term: "Merge",
          def: "**Fusionner** une branche dans une autre : les modifications de la branche rejoignent `main`.",
          phrase: "On merge la branche dans main."
        },
        {
          type: "concept",
          term: "Pull request",
          def: "Une **demande de fusion**. Vous proposez votre branche, les collègues relisent votre code (la **code review**), puis on merge.",
          phrase: "J'ai ouvert une pull request, tu peux la relire ?"
        },
        {
          type: "concept",
          term: "Conflit",
          def: "Deux personnes ont modifié **la même ligne** différemment. Git ne sait pas laquelle garder : c'est à vous de choisir.",
          phrase: "Il y a un conflit de merge sur app.js."
        },
        {
          type: "cloze",
          sentence: "Je demande à mes collègues de relire ma branche avant de la fusionner : j'ouvre une ___.",
          options: ["pull request", "branche", "stack trace"],
          correct: 0,
          why: ["", "La branche existe déjà : on demande à la fusionner.", "Une stack trace sert à lire une erreur."]
        },
        {
          type: "qcm",
          q: "Vous voulez corriger un bug sans risquer de casser `main`. Que faites-vous d'abord ?",
          options: ["Je modifie directement main", "Je crée une branche", "Je supprime le dépôt"],
          correct: 1,
          explain: "On crée une **branche**, on corrige, puis on ouvre une **pull request** pour la relecture."
        }
      ]
    },
    {
      id: "cicd",
      title: "CI/CD",
      sub: "Intégration continue, pipeline, GitHub Actions",
      steps: [
        {
          type: "concept",
          term: "Intégration continue",
          def: "À **chaque push**, un serveur récupère le code et lance automatiquement les tests. Si c'est rouge, on le sait tout de suite. En anglais : CI.",
          phrase: "La CI a échoué : un test est rouge."
        },
        {
          type: "concept",
          term: "Déploiement continu",
          def: "Quand tout est vert, le code est **mis en ligne automatiquement**. En anglais : CD.",
          phrase: "Avec le déploiement continu, chaque merge part en production."
        },
        {
          type: "concept",
          term: "Pipeline",
          def: "La **chaîne d'étapes automatiques** : récupérer le code → installer → tester → analyser la sécurité → construire → déployer. Si une étape échoue, la chaîne s'arrête.",
          phrase: "On ajoute une étape d'analyse de sécurité au pipeline."
        },
        {
          type: "concept",
          term: "GitHub Actions",
          def: "L'outil de CI/CD de GitHub. Le pipeline est décrit dans un fichier YAML, dans `.github/workflows/`.",
          code: `name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4   # récupère le code
      - run: npm ci                 # installe
      - run: npm test               # teste`,
          phrase: "Le workflow GitHub Actions lance les tests à chaque push."
        },
        {
          type: "qcm",
          q: "Dans le workflow ci-dessus, quand les tests se lancent-ils ?",
          options: ["Une fois par jour", "À chaque push", "Seulement quand on clique sur un bouton"],
          correct: 1,
          explain: "`on: [push]` : le workflow démarre **à chaque push**."
        },
        {
          type: "concept",
          term: "DevSecOps",
          def: "Intégrer la **sécurité à chaque étape** du développement, et pas seulement à la fin. On dit aussi « shift left » : déplacer la sécurité vers le début.",
          phrase: "En DevSecOps, la sécurité est automatisée dans le pipeline."
        },
        {
          type: "cloze",
          sentence: "Lancer les tests automatiquement à chaque push, c'est l'intégration ___.",
          options: ["continue", "manuelle", "unitaire"],
          correct: 0,
          why: ["", "Justement, c'est automatique, pas manuel.", "Unitaire qualifie un type de test, pas l'automatisation."]
        }
      ]
    },
    {
      id: "docker",
      title: "Conteneurs",
      sub: "Docker, image, conteneur, Dockerfile",
      steps: [
        {
          type: "concept",
          term: "Conteneur",
          def: "Une **boîte isolée** qui contient votre application et tout ce dont elle a besoin pour tourner. Elle marche pareil sur votre PC et sur le serveur.",
          phrase: "L'application tourne dans un conteneur."
        },
        {
          type: "concept",
          term: "Image",
          def: "Le **modèle figé** à partir duquel on lance des conteneurs. Image = moule, conteneur = gâteau. (Comme classe et instance !)",
          rule: "Une **image** ne tourne pas, c'est une recette figée. Un **conteneur** est une image en train de tourner.",
          phrase: "On construit une image, puis on lance un conteneur."
        },
        {
          type: "concept",
          term: "Dockerfile",
          def: "Le **fichier recette** qui explique comment construire l'image, étape par étape.",
          code: `FROM node:20          # part d'une image avec Node
WORKDIR /app
COPY . .              # copie le code
RUN npm ci            # installe les dépendances
CMD ["node", "server.js"]   # commande de démarrage`,
          phrase: "Le Dockerfile part de l'image node:20."
        },
        {
          type: "concept",
          term: "Registre",
          def: "Un **entrepôt d'images** en ligne, d'où on les télécharge et où on les publie. Exemple : Docker Hub.",
          phrase: "On pousse l'image sur le registre."
        },
        {
          type: "qcm",
          q: "Vous lancez 3 fois la même application avec Docker. Vous avez…",
          options: ["3 images, 1 conteneur", "1 image, 3 conteneurs", "3 Dockerfiles"],
          correct: 1,
          explain: "Un seul moule (**1 image**), trois gâteaux qui tournent (**3 conteneurs**)."
        },
        {
          type: "cloze",
          sentence: "Le modèle figé à partir duquel on lance des conteneurs s'appelle une ___.",
          options: ["image", "instance", "branche"],
          correct: 0,
          why: [
            "",
            "Le conteneur est l'équivalent de l'instance. Le modèle, c'est l'image.",
            "Une branche est une notion Git."
          ]
        }
      ]
    },
    {
      id: "supply",
      title: "Sécurité de la supply chain",
      sub: "Dépendances, SCA, SAST, DAST, SBOM",
      steps: [
        {
          type: "concept",
          term: "Supply chain logicielle",
          def: "**Tout ce qui entre** dans votre logiciel sans que vous l'ayez écrit : dépendances, outils de build, images Docker. Si un maillon est piégé, votre logiciel l'est aussi.",
          phrase: "L'attaque est passée par la supply chain, via une dépendance compromise."
        },
        {
          type: "concept",
          term: "Dépendance transitive",
          def: "Les **dépendances de vos dépendances**. Vous installez 1 paquet, il en apporte 50 autres que vous n'avez jamais choisis.",
          phrase: "La faille vient d'une dépendance transitive."
        },
        {
          type: "concept",
          term: "Lockfile",
          def: "Le fichier (`package-lock.json`) qui **fige les versions exactes** de toutes les dépendances. Tout le monde installe exactement les mêmes.",
          phrase: "Il faut commiter le lockfile."
        },
        {
          type: "concept",
          term: "Typosquatting",
          def: "Un attaquant publie un paquet piégé avec un **nom presque identique** à un paquet connu, en comptant sur une faute de frappe.",
          code: `npm install expres    # ❌ piège (il manque un s)
npm install express   # ✅ le vrai`,
          phrase: "Ce paquet est un cas de typosquatting."
        },
        {
          type: "concept",
          term: "SCA",
          def: "Software Composition Analysis : analyser **vos dépendances** pour trouver celles qui ont des vulnérabilités connues (CVE).",
          code: "npm audit",
          phrase: "L'outil de SCA signale une dépendance vulnérable."
        },
        {
          type: "concept",
          term: "SAST / DAST",
          def: "**SAST** : analyser le **code source** sans l'exécuter (statique). **DAST** : attaquer l'application **pendant qu'elle tourne** (dynamique).",
          rule: "S comme **Statique** : on lit le code. D comme **Dynamique** : on teste l'appli en marche.",
          phrase: "Le SAST a détecté une requête SQL non paramétrée."
        },
        {
          type: "concept",
          term: "SBOM",
          def: "Software Bill of Materials : la **liste d'ingrédients** complète d'un logiciel (toutes les dépendances et leurs versions).",
          phrase: "On génère un SBOM à chaque build."
        },
        {
          type: "qcm",
          q: "Un outil lit votre code et repère une concaténation SQL dangereuse, sans lancer l'application. C'est…",
          options: ["Du SAST", "Du DAST", "Un SBOM"],
          correct: 0,
          explain: "Il lit le code sans l'exécuter : analyse **statique**, donc **SAST**."
        },
        {
          type: "qcm",
          q: "Vous voulez savoir si une de vos 300 dépendances a une CVE connue. Quel type d'outil ?",
          options: ["DAST", "SCA", "Un Dockerfile"],
          correct: 1,
          explain: "Analyser les dépendances : c'est la **SCA** (exemple : `npm audit`)."
        },
        {
          type: "cloze",
          sentence: "La liste complète des composants d'un logiciel s'appelle un ___.",
          options: ["SBOM", "SAST", "lockfile"],
          correct: 0,
          why: [
            "",
            "Le SAST analyse le code source.",
            "Le lockfile fige les versions, mais le SBOM est la liste d'ingrédients complète, partageable."
          ]
        }
      ]
    }
  ]
};
