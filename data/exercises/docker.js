export default {
  "domain": "docker",
  "title": "Docker / Déploiement",
  "exercises": [
    {
      "id": "dk-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "commandes docker de base"
      ],
      "code": "docker ps -a",
      "question": "Qu'affiche cette commande ?",
      "options": [
        "Tous les containers : actifs et arrêtés",
        "Uniquement les containers arrêtés",
        "Tous les containers et toutes les images du système",
        "Les containers actifs avec leur consommation CPU et mémoire"
      ],
      "answer": 0,
      "explanation": "docker ps affiche les containers actifs. L'option -a (all) ajoute aussi les containers arrêtés. Sans -a, seuls les containers en cours d'exécution sont listés. Croire que -a filtre sur les seuls arrêtés inverse son rôle : le flag AJOUTE les arrêtés, il ne retire pas les actifs. Les images se listent avec docker images, jamais avec ps. Et la consommation CPU/mémoire en direct est le rôle de docker stats, pas de docker ps.",
      "hint": "Sans option, docker ps n'affiche que les containers en cours d'exécution. Que change -a ?"
    },
    {
      "id": "dk-02",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "commandes docker"
      ],
      "code": "docker exec -it mon_container /bin/bash",
      "question": "Que fait cette commande ?",
      "options": [
        "Crée un nouveau container à partir de l'image mon_container et y lance bash",
        "Ouvre un terminal interactif DANS un container déjà en cours d'exécution",
        "Se rattache au processus principal (PID 1) du container, comme docker attach",
        "Démarre le container mon_container s'il est arrêté, puis y ouvre un shell"
      ],
      "answer": 1,
      "explanation": "docker exec exécute une commande dans un container ACTIF. -i (interactive) garde STDIN ouvert, -t (tty) alloue un pseudo-terminal. /bin/bash lance un shell. C'est comme se connecter en SSH dans le container. Créer un container à partir d'une image relève de docker run : ici mon_container désigne un container existant, pas une image. docker attach se raccroche au processus principal (PID 1), alors qu'exec démarre un NOUVEAU processus dans le container. Enfin exec échoue si le container est arrêté : il ne le démarre pas, c'est le rôle de docker start.",
      "hint": "exec = exécuter une commande dans un container existant. -it = mode interactif + terminal."
    },
    {
      "id": "dk-03",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "Dockerfile"
      ],
      "code": "FROM eclipse-temurin:21.0.13_9-jre\nWORKDIR /app\n______ target/mon-api.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]",
      "question": "Quelle instruction copie le fichier JAR dans l'image ?",
      "options": [
        "ADD",
        "COPY",
        "RUN",
        "VOLUME"
      ],
      "answer": 1,
      "explanation": "COPY copie des fichiers depuis le contexte de build (votre machine) vers l'image Docker. ADD copierait aussi le fichier, mais il est réservé aux cas particuliers (décompression d'archives, téléchargement d'URL) : la bonne pratique pour une simple copie est COPY. RUN exécute une commande à l'intérieur de l'image pendant le build et n'a pas accès aux fichiers de votre machine. VOLUME déclare un point de montage rempli au lancement du container : il ne copie rien dans l'image au build. Remarquez l'image de base : eclipse-temurin:21.0.13_9-jre, avec une version exacte (jamais latest ni une image sans tag, pour que le build reste reproductible) et un simple JRE. Pour lancer un jar, inutile d'installer un JDK complet sur une Ubuntu sans tag.",
      "hint": "Deux instructions savent copier des fichiers ; l'une sait aussi décompresser des archives et télécharger des URL. Laquelle suffit ici ?"
    },
    {
      "id": "dk-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "port mapping"
      ],
      "code": "docker run -itd -p 3000:8080 mon-image",
      "question": "Sur quel port de votre machine accédez-vous à l'application ?",
      "options": [
        "8080",
        "3000",
        "Les deux : -p publie 3000 et 8080 sur l'hôte",
        "Aucun, tant que le Dockerfile ne contient pas EXPOSE 8080"
      ],
      "answer": 1,
      "explanation": "-p 3000:8080 mappe le port 3000 de l'hôte (votre machine) vers le port 8080 du container. Vous accédez donc à http://localhost:3000 depuis votre navigateur. L'app dans le container écoute toujours sur 8080. Répondre 8080 vient d'une lecture inversée du format, qui est bien -p HÔTE:CONTAINER. Un seul port est publié côté hôte : 8080 n'est joignable que depuis le réseau interne de Docker, pas depuis localhost. Enfin EXPOSE n'est pas requis pour que -p fonctionne : cette instruction documente le port d'écoute, son absence ne bloque rien.",
      "hint": "Le format est -p HÔTE:CONTAINER. Le premier nombre est le port de votre machine."
    },
    {
      "id": "dk-05",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "Dockerfile Angular",
        "nginx"
      ],
      "code": "FROM nginx:1.30.6-alpine\n______ dist/mon-app-angular/browser /usr/share/nginx/html\nEXPOSE 80",
      "question": "Quelle instruction copie le build Angular dans le serveur nginx ?",
      "options": [
        "RUN",
        "COPY",
        "ADD",
        "WORKDIR"
      ],
      "answer": 1,
      "explanation": "COPY copie le résultat de ng build dans le répertoire de nginx qui sert les fichiers statiques. Depuis Angular 17, ce résultat se trouve dans dist/<app>/browser. Pour qu'une URL comme /produits/42 marche aussi au rechargement, il faut en plus une configuration nginx avec try_files $uri $uri/ /index.html, qui renvoie toutes les routes vers l'application Angular. L'image nginx sert ensuite ces fichiers sur le port 80. RUN exécute une commande dans l'image au moment du build (par exemple apk add) mais ne peut pas atteindre les fichiers de votre machine. ADD ferait la copie, mais il est réservé aux archives à décompresser et aux URLs : pour des fichiers statiques, la bonne pratique est COPY. WORKDIR se contente de définir le répertoire courant des instructions suivantes, il ne transfère aucun fichier.",
      "hint": "Le build Angular produit des fichiers statiques. Il suffit de les copier dans le bon dossier de nginx."
    },
    {
      "id": "dk-06",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "différence image/container"
      ],
      "code": "docker build -t mon-api .\ndocker run -itd -p 8080:8080 mon-api\ndocker run -itd -p 8081:8080 mon-api",
      "question": "Combien d'images et de containers sont créés ?",
      "options": [
        "1 image, 2 containers",
        "2 images, 2 containers",
        "1 image, 1 container",
        "1 image, 3 containers"
      ],
      "answer": 0,
      "explanation": "docker build crée 1 image. Chaque docker run crée 1 container à partir de cette image. Une image est un modèle immuable, un container est une instance en cours d'exécution. Comme une classe et ses objets en POO. 2 images supposerait que chaque run reconstruise l'image, or run ne fait qu'instancier une image existante. 1 seul container supposerait que le second run remplace le premier, mais chaque run crée un container distinct (les ports hôtes 8080 et 8081 sont d'ailleurs différents). Et si docker build passe par des containers intermédiaires, ils sont supprimés en fin de build : il ne reste qu'une image, pas un container supplémentaire.",
      "hint": "Image = classe (modèle). Container = objet (instance). Combien de new sont appelés ?"
    },
    {
      "id": "dk-07",
      "type": "debug",
      "difficulty": "advanced",
      "concepts": [
        "Dockerfile",
        "ordre des instructions"
      ],
      "code": "FROM ubuntu\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]\nCOPY target/api.jar /app/app.jar\nRUN apt update && apt install -y openjdk-21-jdk",
      "question": "Ce Dockerfile fonctionne, mais dès que le jar change, chaque rebuild réinstalle Java. Pourquoi ?",
      "options": [
        "RUN apt install est placé APRÈS COPY : modifier le jar invalide le cache des layers suivants, donc l'installation de Java",
        "RUN apt update dépend de dépôts distants qui changent : Docker le détecte et réexécute l'installation à chaque build",
        "ENTRYPOINT placé avant COPY casse la mise en cache de tous les layers suivants, car les instructions de lancement ne sont pas cachées",
        "Le cache de build est désactivé par défaut : il faut passer --cache-from à docker build pour réutiliser les layers"
      ],
      "answer": 0,
      "explanation": "Chaque instruction d'un Dockerfile crée un layer mis en cache. Quand les fichiers copiés changent, le layer du COPY ET tous les layers suivants sont invalidés et reconstruits. Ici RUN apt install est placé après COPY : à chaque modification du jar, Docker refait aussi l'installation de Java. L'ordre correct : les instructions stables d'abord (FROM, RUN install), puis le COPY du jar qui change souvent. Docker ne consulte jamais les dépôts apt distants pour décider de rejouer un RUN : le cache se fonde sur la chaîne de commande, inchangée ici, c'est bien l'invalidation en cascade qui le force. ENTRYPOINT est déclaratif (exécuté au lancement du container, pas au build) : sa position n'affecte pas le cache, le mettre en dernier est une convention de lisibilité. Enfin le cache de layers est actif par défaut : --cache-from sert seulement à importer le cache d'une autre machine (en CI par exemple), pas à l'activer.",
      "hint": "Chaque instruction crée un layer Docker mis en cache. Un layer invalidé invalide tous les suivants."
    },
    {
      "id": "dk-08",
      "type": "debug",
      "difficulty": "advanced",
      "concepts": [
        "compose.yaml",
        "depends_on",
        "healthcheck"
      ],
      "code": "services:\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_PASSWORD: secret\n  api:\n    build: .\n    depends_on:\n      - db",
      "question": "Au premier docker compose up, l'API plante avec « Connection refused » vers la base, puis fonctionne si on la relance. Pourquoi ?",
      "options": [
        "depends_on attend que le conteneur db soit démarré, pas que Postgres accepte les connexions",
        "depends_on ne fonctionne qu'avec docker run, Compose l'ignore complètement",
        "Les deux services ne sont pas sur le même réseau, il faut en déclarer un",
        "L'image postgres:17 met plusieurs minutes à se télécharger, il faut l'épingler"
      ],
      "answer": 0,
      "explanation": "depends_on sous sa forme simple n'attend que le démarrage du conteneur db, pas que Postgres ait fini de s'initialiser : l'API tente de se connecter trop tôt. Correction : un healthcheck sur db (test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]) et depends_on: db: condition: service_healthy. Compose prend bien en compte depends_on, et place tous les services d'un fichier sur un réseau commun par défaut : l'API joint db par son nom. Enfin, l'image est téléchargée avant le démarrage des conteneurs, ce n'est pas la cause.",
      "hint": "« Conteneur démarré » et « base prête à accepter des connexions » : est-ce la même chose ?"
    }
  ]
};
