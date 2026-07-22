export default {
  "domain": "docker",
  "title": "Docker / Déploiement",
  "icon": "🐳",
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
        "Tous les containers (actifs ET arrêtés)",
        "Uniquement les containers actifs",
        "Toutes les images Docker",
        "Les volumes Docker"
      ],
      "answer": 0,
      "explanation": "docker ps affiche les containers actifs. L'option -a (all) ajoute aussi les containers arrêtés. Sans -a, seuls les containers en cours d'exécution sont listés.",
      "hint": "-a signifie 'all'. Sans ce flag, seuls les containers en cours d'exécution s'affichent."
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
        "Crée et démarre un nouveau container",
        "Ouvre un terminal interactif DANS un container déjà en cours d'exécution",
        "Construit une image Docker",
        "Arrête le container mon_container"
      ],
      "answer": 1,
      "explanation": "docker exec exécute une commande dans un container ACTIF. -i (interactive) garde STDIN ouvert, -t (tty) alloue un pseudo-terminal. /bin/bash lance un shell. C'est comme se connecter en SSH dans le container.",
      "hint": "exec = exécuter une commande dans un container existant. -it = mode interactif + terminal."
    },
    {
      "id": "dk-03",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "Dockerfile"
      ],
      "code": "FROM ubuntu\nEXPOSE 8080\nWORKDIR /app\n______ target/mon-api.jar app.jar\n\nRUN apt update\nRUN apt install -y openjdk-21-jdk\n\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]",
      "question": "Quelle instruction copie le fichier JAR dans l'image ?",
      "options": [
        "ADD",
        "COPY",
        "MOVE",
        "PUT"
      ],
      "answer": 1,
      "explanation": "COPY copie des fichiers depuis le contexte de build (votre machine) vers l'image Docker. ADD fait la même chose mais peut aussi décompresser des archives et télécharger des URLs. En pratique, on préfère COPY pour la clarté.",
      "hint": "Deux instructions Docker copient des fichiers. La plus simple et recommandée est..."
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
        "Les deux fonctionnent",
        "Aucun — il manque --expose"
      ],
      "answer": 1,
      "explanation": "-p 3000:8080 mappe le port 3000 de l'hôte (votre machine) vers le port 8080 du container. Vous accédez donc à http://localhost:3000 depuis votre navigateur. L'app dans le container écoute toujours sur 8080.",
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
      "code": "FROM nginx:1.17.1-alpine\n______ dist/mon-app-angular /usr/share/nginx/html\nEXPOSE 80",
      "question": "Quelle instruction copie le build Angular dans le serveur nginx ?",
      "options": [
        "RUN",
        "COPY",
        "ADD",
        "WORKDIR"
      ],
      "answer": 1,
      "explanation": "COPY copie le contenu du dossier dist/ (le résultat de ng build) dans le répertoire de nginx qui sert les fichiers statiques. L'image nginx sert ensuite ces fichiers sur le port 80.",
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
        "3 images, 0 container"
      ],
      "answer": 0,
      "explanation": "docker build crée 1 image. Chaque docker run crée 1 container à partir de cette image. Une image est un modèle immuable, un container est une instance en cours d'exécution. Comme une classe et ses objets en POO.",
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
        "ENTRYPOINT doit obligatoirement être la dernière instruction, sinon le build échoue",
        "COPY ne peut pas copier un fichier .jar dans une image ubuntu",
        "Il manque EXPOSE, ce qui désactive le cache de build"
      ],
      "answer": 0,
      "explanation": "Chaque instruction d'un Dockerfile crée un layer mis en cache. Quand les fichiers copiés changent, le layer du COPY ET tous les layers suivants sont invalidés et reconstruits. Ici RUN apt install est placé après COPY : à chaque modification du jar, Docker refait aussi l'installation de Java. L'ordre correct : les instructions stables d'abord (FROM, RUN install), puis le COPY du jar qui change souvent. ENTRYPOINT est déclaratif (exécuté au lancement du container, pas au build) : sa position n'affecte pas le build, le mettre en dernier est une convention de lisibilité.",
      "hint": "Chaque instruction crée un layer Docker mis en cache. Un layer invalidé invalide tous les suivants."
    }
  ]
};
