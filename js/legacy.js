const modules = {
    python: {
        name: "Python",
        description: "Types, boucles, fonctions, fichiers",
        questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    git: {
        name: "Git",
        description: "Branches, commits, conflits, versioning",
        questions: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    recursivite: {
        name: "Récursivité",
        description: "Fonctions récursives et cas de base",
        questions: [24, 25]
    },
    debogage: {
        name: "Débogage",
        description: "Breakpoints, step, pile d'appels",
        questions: [26, 27, 28, 29]
    },
    memoire: {
        name: "Mémoire",
        description: "Schémas mémoire, pointeurs, références",
        questions: [30, 31, 32]
    },
    tests: {
        name: "Tests Unitaires",
        description: "FIRST, mocks, assertions",
        questions: [33, 34, 35, 36, 37, 38, 39, 40, 41, 59, 60, 61, 62]
    },
    poo: {
        name: "POO",
        description: "Classes, héritage, encapsulation, abstraction",
        questions: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 148, 149]
    },
    documentation: {
        name: "Documentation",
        description: "JavaDoc, Sphinx, commentaires",
        questions: [52]
    },
    uml: {
        name: "UML",
        description: "Diagrammes de classes",
        questions: [53, 54]
    },
    unity: {
        name: "Unity",
        description: "MonoBehaviour, composants, GameObjects",
        questions: [55, 56, 57, 58]
    },
     bdd: {
        name: "Base de données",
        description: "MCD/MLD, SQL, CRUD, jointures",
        questions: [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73]
    },
    web: {
        name: "Web",
        description: "HTML/RGAA, CSS, Bootstrap, JS, Angular",
        questions: [74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98]
    },
    conception: {
        name: "Conception et Maquettage",
        description: "UML cas d'utilisation, maquettage, responsive",
        questions: [99, 100, 101, 102, 103, 104, 105, 106]
    },
    agile: {
        name: "Méthodes agiles",
        description: "Scrum, Kanban, cycle en V",
        questions: [107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
    },
    architecture: {
        name: "Architecture logicielle",
        description: "3-Tiers, microservices, ORM, Spring/MVC",
        questions: [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133]
    },
    docker: {
        name: "Docker",
        description: "Conteneurisation, images, compose, volumes, réseau",
        questions: [134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147]
    }
};

const portalVoices = [
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/critical-error.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/good-shot.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/hello-friend.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/hey-hey-hey.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/i-dont-blame-you.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/i-see-you.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/illegal-operation.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/is-anyone-there.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/noooooo.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/oh-dear.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/please-stop.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/sleep-mode-activated.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/thank-you.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/um-hello.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/what-are-you-doing.mp3',
    'https://raw.githubusercontent.com/DNSZLSK/cdaquiz/master/turretVocals/who-are-you.mp3'
];

// Variable pour stocker le dernier son joué
let lastPlayedIndex = -1;

// Fonction pour jouer un vocal aléatoire (sans répétition immédiate)
function playRandomPortalVoice() {
    let randomIndex;
    
    // Si on a plusieurs sons, éviter de rejouer le même
    if (portalVoices.length > 1) {
        do {
            randomIndex = Math.floor(Math.random() * portalVoices.length);
        } while (randomIndex === lastPlayedIndex);
    } else {
        randomIndex = 0;
    }
    
    lastPlayedIndex = randomIndex;
    
    const audio = new Audio(portalVoices[randomIndex]);
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Erreur lecture audio:', err));
}

// Ajouter l'événement au logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('apertureLogo');
    if (logo) {
        logo.addEventListener('click', playRandomPortalVoice);
    }
});

const quizData = [
    { id: 1, module: "python", question: "Quelle est la différence entre le type int et le type float ?", options: ["int stocke des nombres entiers, float stocke des nombres à virgule","int est limité à 64 bits, float gère les très grands nombres entiers","float est une version optimisée de int pour accélérer les calculs","int occupe moins de mémoire car il ne code pas la partie décimale"], correct: [0], explanation: "int représente les nombres entiers (5, -3, 100) et float les nombres à virgule flottante (3.14, -0.5). En Python, int n'a pas de limite de taille fixe : l'idée d'un plafond à 64 bits est fausse. float n'est pas un int optimisé, c'est un type distinct potentiellement moins précis. Et int n'est pas choisi pour économiser la mémoire, mais parce qu'il modélise une valeur entière." },

    { id: 2, module: "python", question: "Comment s'appelle cette opération : nom = \"Sophie \" + \"Duchemin\"", options: ["Concaténation","Interpolation","Formatage","Jointure"], correct: [0], explanation: "Assembler deux chaînes bout à bout avec l'opérateur + est une concaténation. L'interpolation insère des valeurs dans une chaîne via les f-strings (f\"{nom}\"). Le formatage construit une chaîne avec format() ou %. La jointure (str.join) assemble les éléments d'une liste avec un séparateur, ce qui n'est pas le cas ici." },

    { id: 3, module: "python", question: "Comment ajouter un élément à la fin d'un tableau en Python ? En Java ?", options: ["Python : liste.append(element) / Java : liste.add(element)","Python : liste.add(element) / Java : liste.append(element)","Python : liste.push(element) / Java : liste.add(element)","Python : liste.insert(element) / Java : liste.push(element)"], correct: [0], explanation: "En Python on ajoute en fin de liste avec append() ; en Java (ArrayList) avec add(). add() n'existe pas sur une liste Python et append() n'existe pas sur une List Java : ces deux noms sont inversés dans les distracteurs. push() est une méthode JavaScript (ou de pile), pas de liste Python ; et insert() existe en Python mais demande un index de position, donc ne sert pas à ajouter simplement en fin." },

    { id: 4, module: "python", question: "Comment concaténer deux tableaux en Python ? En Java ?", options: ["Python : liste1 + liste2 / Java : liste1.addAll(liste2)","Python : liste1.extend(liste2) / Java : liste1.merge(liste2)","Python : liste1.concat(liste2) / Java : liste1.addAll(liste2)","Python : liste1.merge(liste2) / Java : liste1 + liste2"], correct: [0], explanation: "En Python, l'opérateur + concatène deux listes en créant une nouvelle liste ; en Java, addAll() ajoute tous les éléments d'une liste à une autre. extend() existe bien en Python mais modifie la liste en place au lieu d'en créer une nouvelle, et merge() n'est pas une méthode de List Java. concat() n'existe pas sur les listes Python (c'est une méthode de chaînes/JS), et Java ne surcharge pas l'opérateur + pour les listes." },

    { id: 5, module: "python", question: "Quelle est la différence entre if, elif et else ?", options: ["if teste une condition, elif teste une autre si la précédente est fausse, else couvre les cas restants","if est obligatoire, elif et else sont optionnels et parfaitement interchangeables","elif peut s'écrire seul sans if préalable lorsque la condition est simple","else évalue une condition par défaut quand if et elif sont jugés ambigus"], correct: [0], explanation: "if teste la première condition, elif (else if) teste une condition suivante uniquement si les précédentes sont fausses, et else s'exécute quand aucune n'est vraie. elif et else ne sont pas interchangeables : elif porte une condition, else non. elif ne peut jamais exister sans un if qui l'ouvre. Enfin else n'évalue aucune condition : c'est précisément la branche par défaut sans test." },

    { id: 6, module: "python", question: "Quelle est la différence entre une boucle for et une boucle while ?", options: ["for itère sur une séquence connue, while continue tant qu'une condition reste vraie","for est plus rapide car l'interpréteur connaît d'avance le nombre d'itérations","while crée une nouvelle variable de boucle à chaque tour, for réutilise la même","for ne peut parcourir que des nombres, while accepte n'importe quelle condition"], correct: [0], explanation: "for parcourt une séquence (liste, range, chaîne...), tandis que while répète tant que sa condition est vraie. La rapidité n'est pas la distinction : for n'est pas optimisé par une connaissance préalable du nombre de tours. while ne crée pas de variable spéciale par itération. Et for n'est pas limité aux nombres : il itère sur tout objet itérable, pas seulement des entiers." },

    { id: 7, module: "python", question: "Est-ce que les commentaires sont lus et exécutés par Python ?", options: ["Non, ils sont ignorés par l'interpréteur","Oui, ils sont parsés puis exécutés pour produire la documentation","Oui, les # sont ignorés mais les docstrings sont exécutées comme du code","Non, sauf les lignes commençant par #! qui sont exécutées par le système"], correct: [0], explanation: "Les commentaires (#) sont purement et simplement ignorés par l'interpréteur : ils ne sont pas exécutés. Une docstring est une chaîne littérale stockée dans __doc__, mais ce n'est pas une exécution de logique. La ligne shebang #! est lue par le shell Unix au lancement, pas par l'interpréteur Python, et reste un commentaire à l'intérieur du fichier." },

    { id: 8, module: "python", question: "Pourquoi est-il utile d'utiliser des fonctions dans un programme ?", options: ["Réutiliser le code sans le dupliquer","Mieux organiser et structurer le programme","Exécuter le code plus vite qu'en ligne grâce à la compilation","Réduire la consommation mémoire par rapport au code dupliqué"], correct: [0,1], explanation: "Les fonctions servent surtout à réutiliser le code (éviter la duplication) et à structurer/organiser le programme, ce qui facilite la maintenance et les tests : ces deux réponses sont correctes. En revanche, un appel de fonction n'accélère pas l'exécution (il ajoute même un léger coût d'appel) et l'objectif n'est pas l'économie de mémoire : ces deux affirmations confondent lisibilité et performance." },

    { id: 9, module: "python", question: "Que se passe-t-il si on définit une fonction, mais qu'on ne l'appelle jamais ?", options: ["Rien, la fonction reste en mémoire mais son corps n'est pas exécuté","Python émet un avertissement signalant une fonction inutilisée","Python supprime automatiquement les fonctions jamais appelées pour optimiser","Son corps est tout de même exécuté une fois lors de la définition"], correct: [0], explanation: "Définir une fonction enregistre simplement son nom et son code ; le corps ne s'exécute qu'à un appel explicite. Python n'émet aucun avertissement pour une fonction non utilisée et ne supprime pas le code 'mort'. Surtout, le corps n'est jamais exécuté au moment de la définition : seul l'en-tête (def) est évalué pour créer l'objet fonction." },

    { id: 10, module: "python", question: "Que représente un paramètre dans une fonction ?", options: ["Une variable locale qui reçoit une valeur lors de l'appel","Une copie indépendante de la variable, recréée à chaque appel","Le type de donnée attendu, déclaré dans la signature","La valeur concrète fournie par l'appelant au moment de l'appel"], correct: [0], explanation: "Un paramètre est une variable locale, déclarée dans la signature, qui reçoit une valeur lors de l'appel. Il ne s'agit pas d'une copie systématique : Python passe une référence vers l'objet, et pour un objet mutable l'original peut être modifié. Le paramètre n'est pas non plus un type (une annotation est optionnelle et distincte). Enfin la valeur fournie par l'appelant s'appelle l'argument, pas le paramètre : c'est la confusion classique entre les deux." },

    { id: 11, module: "python", question: "À quoi sert le mot-clé return dans une fonction ?", options: ["Renvoyer une valeur et arrêter immédiatement la fonction","Arrêter la fonction sans pouvoir renvoyer de valeur","Créer une variable accessible en dehors de la fonction","Déclarer le type de la valeur que la fonction renverra"], correct: [0], explanation: "return renvoie une valeur à l'appelant et met fin tout de suite à l'exécution de la fonction. Il peut renvoyer une valeur : sans expression (return seul), il renvoie None. Il ne crée pas de variable globale : la portée des variables locales ne change pas. Et il ne déclare pas de type : annoncer un type de retour relève de l'annotation -&gt; type, pas de return." },

    { id: 12, module: "python", question: "Dans quel cas utiliserais-tu le mode 'r' et dans quel cas utiliserais-tu le mode 'w' en ouvrant un fichier ?", options: ["'r' pour lire un fichier existant, 'w' pour écrire en écrasant le contenu","'r' pour lire et écrire à la fois, 'w' pour écrire sans pouvoir lire","'w' pour écrire à la suite du contenu, 'r' pour lire depuis le début","'r' crée le fichier s'il est absent, 'w' échoue si le fichier existe déjà"], correct: [0], explanation: "'r' (read) ouvre en lecture un fichier existant ; 'w' (write) ouvre en écriture et écrase tout contenu présent (ou crée le fichier). 'r' ne permet pas l'écriture (il faudrait 'r+'). 'w' n'ajoute pas à la suite : c'est 'a' (append) qui conserve l'existant. Et c'est l'inverse pour la création : 'r' lève une erreur si le fichier n'existe pas, alors que 'w' le crée sans broncher." },

    { id: 13, module: "python", question: "Que risque-t-on si on ferme un fichier en mode écriture sans l'opération close() ?", options: ["Une perte de données possible car le tampon n'est pas vidé sur le disque","Le fichier reste verrouillé jusqu'au redémarrage de la machine","Python lève immédiatement une exception FileNotClosedError","Aucun risque : Python écrit chaque caractère sur le disque en temps réel"], correct: [0], explanation: "Sans close(), les données encore en tampon (buffer) risquent de ne jamais être écrites sur le disque. Le fichier n'est pas verrouillé jusqu'au redémarrage : il est libéré au plus tard à la fin du programme. Il n'existe pas d'exception FileNotClosedError. Et l'écriture n'est pas faite caractère par caractère en temps réel : elle est justement bufferisée, d'où l'intérêt de close() ou du bloc with qui ferme automatiquement." },

    { id: 14, module: "git", question: "À quoi sert une branche dans un projet versionné avec Git ?", options: ["Développer une fonctionnalité isolément sans impacter la branche principale","Sauvegarder une copie compressée du projet à un instant donné","Permettre à plusieurs développeurs d'éditer le même fichier en simultané sans conflit","Conserver une copie de secours synchronisée en continu avec le dépôt distant"], correct: [0], explanation: "Une branche permet de travailler sur une fonctionnalité ou une correction en parallèle, sans toucher au code de la branche principale. Ce n'est pas une sauvegarde ni une archive compressée : c'est un simple pointeur vers une suite de commits. Elle ne supprime pas non plus les conflits lorsque deux personnes modifient le même fichier : ces conflits surgissent au moment de fusionner. Et elle ne se synchronise pas automatiquement avec le distant." },

    { id: 15, module: "git", question: "Que se passe-t-il lorsqu'on fusionne une branche avec la branche principale ?", options: ["Les modifications de la branche sont intégrées dans la branche principale","Un commit de fusion est systématiquement créé à chaque merge","La branche fusionnée est ensuite supprimée automatiquement","L'historique de la branche est réécrit en un seul commit dans main"], correct: [0], explanation: "Fusionner (merge) intègre les changements de la branche source dans la branche cible (main). Un commit de fusion n'est pas systématique : en fast-forward, Git avance simplement le pointeur sans créer de commit. La branche source n'est pas supprimée d'office après la fusion. Et un merge ne réécrit pas l'historique en un seul commit : c'est le rebase interactif ou le squash qui produisent ce résultat." },

    { id: 16, module: "git", question: "Quelle est la commande pour enregistrer des modifications dans l'historique local de Git ?", options: ["git commit","git add","git stash","git push"], correct: [0], explanation: "git commit enregistre les modifications mises en staging dans l'historique local. git add ne fait que placer les fichiers en staging, sans créer d'entrée d'historique. git stash met de côté temporairement les changements non commités au lieu de les enregistrer. git push, lui, envoie des commits déjà existants vers le dépôt distant : il n'en crée pas." },

    { id: 17, module: "git", question: "Quelle commande permet de copier un dépôt distant sur ton ordinateur ?", options: ["git clone","git fetch","git pull","git init"], correct: [0], explanation: "git clone crée en une fois une copie locale complète d'un dépôt distant, avec tout son historique. git fetch suppose un dépôt déjà existant et récupère les nouveautés sans les fusionner. git pull met aussi à jour un dépôt déjà cloné en fusionnant les changements. git init initialise un dépôt vide localement, sans rien copier depuis un distant." },

    { id: 18, module: "git", question: "Quelle commande permet de changer de branche ?", options: ["git switch","git checkout","git branch","git merge"], correct: [0,1], explanation: "git switch (commande moderne dédiée) et git checkout (commande historique) permettent tous deux de changer de branche : les deux réponses sont correctes. git branch sans argument se contente de lister les branches, ou en crée une nouvelle avec un nom, mais ne bascule pas dessus. git merge fusionne une branche dans la branche courante : il n'en change pas." },

    { id: 19, module: "git", question: "Quelle est la principale différence entre Git et GitLab ?", options: ["Git est l'outil de versioning, GitLab une plateforme web qui héberge des dépôts Git","Git fonctionne en ligne de commande, GitLab n'est que son interface graphique officielle","GitLab est l'édition entreprise payante du logiciel Git","Git gère uniquement le code local, GitLab gère uniquement les issues et la CI/CD"], correct: [0], explanation: "Git est le logiciel de gestion de version ; GitLab (comme GitHub) est une plateforme web qui héberge des dépôts Git et ajoute CI/CD, issues, merge requests, etc. GitLab n'est pas l'interface graphique officielle de Git : ce sont deux produits d'éditeurs différents. Ce n'est pas non plus une version payante de Git. Et GitLab ne se limite pas aux issues et à la CI/CD : il héberge bel et bien le code versionné." },

    { id: 20, module: "git", question: "Cite un autre outil de gestion de version que Git.", options: ["SVN (Subversion)","Jenkins","Docker","Maven"], correct: [0], explanation: "SVN (Subversion) est un autre système de contrôle de version, tout comme Mercurial ou Perforce. Jenkins est un serveur d'intégration continue (CI), pas un gestionnaire de version. Docker sert à conteneuriser des applications. Maven est un outil de build et de gestion de dépendances Java : aucun de ces trois ne versionne le code source." },

    { id: 21, module: "git", question: "Quelle est la différence entre un dépôt local et un dépôt distant ?", options: ["Le local est sur ta machine, le distant sur un serveur partagé","Le local ne garde que la dernière version, le distant tout l'historique","Le distant est en lecture seule, seul le local autorise les modifications","Le local et le distant ne stockent jamais les mêmes branches"], correct: [0], explanation: "Le dépôt local réside sur votre machine, le dépôt distant (remote) est hébergé sur un serveur pour partager et collaborer. Les deux contiennent l'historique complet : le local ne se limite pas à la dernière version. Le distant n'est pas en lecture seule, on y pousse des modifications via push. Et rien n'empêche local et distant de partager les mêmes branches : c'est même le cas habituel après un push." },

    { id: 22, module: "git", question: "Pourquoi est-il important de push régulièrement ses modifications vers le dépôt distant ?", options: ["Sauvegarder son travail et le partager avec l'équipe","Pouvoir continuer à créer des commits, impossible sans connexion au distant","Éviter que le dépôt local soit effacé à la fin de chaque session","Empêcher l'expiration automatique des commits locaux après 24 heures"], correct: [0], explanation: "Pousser régulièrement sécurise le travail sur le serveur et le partage avec l'équipe. Créer des commits ne nécessite aucune connexion : Git est distribué et tout l'historique vit en local. Le dépôt local n'est pas effacé entre les sessions. Et les commits locaux n'expirent pas après un délai : ils sont persistants, simplement isolés tant qu'on n'a pas poussé." },

    { id: 23, module: "git", question: "Qu'est-ce qu'un conflit de fusion (merge conflict) dans Git ?", options: ["Les mêmes lignes ont été modifiées différemment dans deux branches","Deux développeurs poussent exactement au même instant sur la branche","Une branche a pris trop de retard par rapport à la branche principale","Le serveur distant rejette la fusion pour des raisons de sécurité"], correct: [0], explanation: "Un conflit de fusion survient quand Git ne peut pas fusionner automatiquement parce que les mêmes lignes ont été modifiées de façon divergente dans deux branches ; il marque alors les zones à résoudre à la main. Ce n'est pas une question de simultanéité de push, ni de retard d'une branche (un retard se rattrape par un simple merge ou rebase sans conflit s'il n'y a pas de chevauchement). Et le serveur distant ne déclenche pas de conflit pour des motifs de sécurité." },

    { id: 24, module: "recursivite", question: "Qu'est-ce qui distingue une fonction récursive d'une fonction classique ?", options: ["Elle s'appelle elle-même pour résoudre des sous-problèmes plus simples","Elle délègue son traitement à une boucle interne gérée par le compilateur","Elle renvoie obligatoirement plusieurs valeurs au cours de son exécution","Elle déclenche son exécution simultanée sur plusieurs threads distincts"], correct: [0], explanation: "Une fonction récursive se caractérise par le fait qu'elle s'appelle elle-même pour décomposer un problème en sous-problèmes plus simples. La boucle interne décrit une approche itérative, pas récursive ; renvoyer plusieurs valeurs relève d'un tuple ou d'une collection, sans lien avec la récursivité ; l'exécution parallèle sur plusieurs threads relève du multithreading." },

    { id: 25, module: "recursivite", question: "Pourquoi est-il important de définir un cas de base dans une fonction récursive ?", options: ["Pour arrêter la récursion et éviter de dépasser la pile d'appels","Pour activer l'optimisation de récursivité terminale par l'interpréteur","Pour permettre au ramasse-miettes de libérer la mémoire des appels","Pour fixer la valeur retournée par défaut quand l'entrée est invalide"], correct: [0], explanation: "Le cas de base est la condition d'arrêt : sans lui, la fonction s'appellerait indéfiniment jusqu'au stack overflow. La récursivité terminale (tail call) est une optimisation distincte qui n'a pas besoin du cas de base pour exister ; le ramasse-miettes gère le tas, pas la fin de la récursion ; gérer une entrée invalide est une validation des données, pas le rôle du cas de base." },

    { id: 26, module: "debogage", question: "À quoi sert un point d'arrêt dans un débogueur ?", options: ["Suspendre l'exécution à une ligne pour inspecter l'état du programme","Signaler une ligne comme source probable d'un bug à corriger","Empêcher l'exécution d'une ligne jugée problématique par le débogueur","Écrire automatiquement dans un journal les valeurs lues à cet endroit"], correct: [0], explanation: "Un point d'arrêt suspend l'exécution à une ligne précise pour inspecter variables, pile d'appels et flux d'exécution. Il ne désigne pas un bug ni n'empêche l'exécution de la ligne : celle-ci s'exécutera normalement quand on reprend ; et il ne journalise rien automatiquement, ce qui correspondrait plutôt à un point de trace (logpoint)." },

    { id: 27, module: "debogage", question: "Où est-il judicieux de placer un point d'arrêt lorsqu'on cherche une erreur logique dans une boucle ?", options: ["Au début de la boucle pour inspecter chaque itération une à une","À la sortie de la boucle pour observer uniquement le résultat final","Sur la ligne précise dont on sait déjà qu'elle provoque l'erreur","Juste avant et juste après chaque variable modifiée dans le bloc"], correct: [0], explanation: "Pour une erreur logique dans une boucle, placer le point d'arrêt au début du corps de boucle permet de suivre l'évolution des variables itération après itération et de repérer quand la logique dérape. Le mettre en sortie masque justement les étapes intermédiaires ; on cherche encore la ligne fautive, on ne la connaît pas ; et un point d'arrêt se pose sur une ligne, pas autour de chaque variable." },

    { id: 28, module: "debogage", question: "Quelle est la différence entre les actions 'step over' et 'step into' dans un débogueur ?", options: ["Step over exécute l'appel d'un trait, step into entre dans la fonction appelée","Step over avance d'une ligne, step into remonte à la ligne précédente","Step into est plus rapide car il survole les appels de fonction sans s'arrêter","Step over entre dans les fonctions système, step into dans le code utilisateur"], correct: [0], explanation: "Step over (F10) exécute la ligne courante d'un trait sans entrer dans les fonctions qu'elle appelle, tandis que step into (F11) entre dans la fonction appelée pour la déboguer pas à pas. Step into ne remonte jamais en arrière et ne survole pas les appels (il fait l'inverse) ; la distinction système/utilisateur correspond plutôt aux filtres 'step filters', pas à over contre into." },

    { id: 29, module: "debogage", question: "Pourquoi est-il utile de consulter la pile d'appels lorsqu'un programme plante avec une erreur ?", options: ["Elle montre la suite des appels de fonctions ayant mené à l'erreur","Elle permet de restaurer le programme à un état stable précédent","Elle pointe automatiquement la ligne exacte qu'il faut corriger","Elle affiche l'ensemble des variables de toutes les portées actives"], correct: [0], explanation: "La pile d'appels (stack trace) retrace la séquence des fonctions appelées jusqu'au point de l'erreur, ce qui permet de remonter à la source du problème. Elle ne restaure aucun état (ce serait un rollback) ; elle indique où l'erreur s'est produite mais pas quoi corriger, qui reste l'analyse du développeur ; et elle liste les frames d'appel, pas la valeur de toutes les variables." },

    { id: 30, module: "memoire", question: "Que représente un schéma mémoire d'un programme ?", options: ["La représentation de l'organisation des variables et objets en mémoire","La courbe de consommation de RAM du processus au fil du temps","Le diagramme des dépendances entre les modules du programme","La cartographie des accès en lecture et écriture sur le disque"], correct: [0], explanation: "Un schéma mémoire représente comment les variables, objets et structures de données sont organisés et reliés en mémoire pendant l'exécution. La courbe de consommation de RAM est un profil mémoire dans le temps ; les dépendances entre modules forment un diagramme de dépendances ; les accès disque relèvent du profilage des entrées-sorties, pas d'un schéma mémoire." },

    { id: 31, module: "memoire", question: "Quelle est la différence entre la valeur d'une variable et l'adresse d'une variable ?", options: ["La valeur est le contenu stocké, l'adresse est son emplacement en mémoire","L'adresse reste un identifiant fixe alors que la valeur peut changer ensuite","La valeur est toujours numérique et l'adresse toujours notée en hexadécimal","L'adresse pointe vers la valeur, qui pointe à son tour vers les vraies données"], correct: [0], explanation: "La valeur est le contenu de la variable (par exemple 42 ou 'hello') et l'adresse est l'emplacement en mémoire où ce contenu est rangé. L'adresse n'est pas un identifiant garanti fixe : elle peut changer d'une exécution à l'autre ; une valeur n'est pas forcément un nombre (chaîne, booléen) ; et il n'existe pas de double indirection systématique où la valeur pointerait encore ailleurs." },

    { id: 32, module: "memoire", question: "Quel type de passage est utilisé lorsque tu modifies une liste dans une fonction en Python ?", options: ["Passage par référence : la liste d'origine est bien modifiée dans la fonction","Passage par valeur : une copie indépendante de la liste est créée à l'appel","Passage par pointeur : l'adresse est copiée mais la référence reste intacte","Passage par copie profonde : chacun des éléments de la liste est dupliqué"], correct: [0], explanation: "Python passe les objets mutables comme les listes par référence (plus exactement par partage d'objet) : modifier la liste dans la fonction affecte l'original car les deux noms désignent le même objet. Le passage par valeur créerait une copie isolée ; Python n'expose pas de pointeurs à la manière du C ; et une copie profonde duplique tous les éléments, ce que Python ne fait pas automatiquement." },

    { id: 33, module: "tests", question: "À quel moment du développement est-il recommandé d'écrire les tests unitaires ?", options: ["Avant ou pendant le développement, par exemple en suivant le TDD","Une fois tout le code de la fonctionnalité entièrement terminé","Seulement durant la phase de maintenance corrective du projet","Juste avant la mise en production, lors de la recette finale"], correct: [0], explanation: "Il est recommandé d'écrire les tests avant le code (TDD) ou en parallèle du développement, pour valider chaque brique au fur et à mesure et orienter la conception. Attendre la fin du développement laisse passer des bugs et complique la correction ; les réserver à la maintenance ou à la veille de mise en production fait perdre tout le bénéfice de détection précoce." },

    { id: 34, module: "tests", question: "Quelle différence fais-tu entre assertEquals et assertTrue ?", options: ["assertEquals compare une valeur attendue à une valeur obtenue, assertTrue teste un booléen","assertEquals contrôle strictement le type alors qu'assertTrue tolère les conversions","assertTrue est désormais déprécié au profit d'assertEquals dans JUnit 5","assertEquals ne fonctionne qu'avec des nombres, assertTrue avec tout le reste"], correct: [0], explanation: "assertEquals(expected, actual) vérifie l'égalité entre une valeur attendue et une valeur obtenue, tandis qu'assertTrue(condition) vérifie qu'une expression booléenne vaut vrai. assertTrue n'est pas déprécié dans JUnit ; assertEquals n'est pas limité aux nombres et fonctionne avec tout type via equals ; et aucune des deux ne pratique de conversion implicite particulière." },

    { id: 35, module: "tests", question: "Pourquoi est-il important d'avoir un jeu de données varié pour les tests unitaires ?", options: ["Pour couvrir à la fois les cas nominaux, les cas limites et les cas d'erreur","Pour gonfler artificiellement le taux de couverture de code mesuré","Pour reproduire à l'identique les conditions réelles de la production","Pour mesurer le comportement et les temps de réponse sous forte charge"], correct: [0], explanation: "Un jeu de données varié sert à éprouver le code sur les cas normaux, les valeurs limites (edge cases) et les cas d'erreur, gage de robustesse. Gonfler la couverture sans assertions pertinentes est un faux objectif ; reproduire la production exacte relève des tests d'intégration ou de bout en bout ; et tester sous forte charge relève des tests de performance, pas des tests unitaires." },

    { id: 36, module: "tests", question: "Donne un exemple de situation où un jeu de données mal choisi peut faire croire à tort que le code est correct.", options: ["Tester une division uniquement avec des diviseurs positifs et jamais nuls","Régénérer des données aléatoires différentes à chaque exécution du test","Garder un seul jeu de données mais relancer le test plusieurs fois de suite","Réutiliser exactement les valeurs employées pendant l'écriture du code"], correct: [0], explanation: "Tester une division seulement avec des diviseurs positifs non nuls laisse passer le bug de division par zéro et donne une fausse impression de code correct : il manque le cas limite. Des données aléatoires rendraient surtout le test non répétable ; répéter le même jeu n'élargit pas la couverture ; réutiliser les valeurs de développement est une mauvaise pratique mais ne masque pas en soi un bug précis." },

    { id: 37, module: "tests", question: "Que signifie l'acronyme FIRST dans le contexte des tests unitaires ?", options: ["Fast, Independent, Repeatable, Self-validating, Timely","Find, Inspect, Run, Succeed, Terminate","Fast, Isolated, Reliable, Simple, Thorough","Function, Input, Result, State, Test"], correct: [0], explanation: "FIRST signifie Fast (rapide), Independent (indépendant), Repeatable (répétable), Self-validating (auto-validant, verdict pass/fail clair) et Timely (écrit au bon moment). Les autres propositions reprennent des mots vraisemblables, dont 'Isolated', 'Reliable' ou 'Simple', qui sonnent juste mais ne correspondent pas aux termes exacts de l'acronyme." },

    { id: 38, module: "tests", question: "Pourquoi est-ce important que les tests soient répétables et indépendants ?", options: ["Pour obtenir le même verdict à chaque exécution, indépendamment de l'ordre","Pour autoriser l'exécution en parallèle et réduire la durée totale des tests","Pour diminuer la consommation mémoire pendant le déroulement des tests","Pour simplifier la génération automatique des rapports de couverture"], correct: [0], explanation: "Répétable signifie obtenir le même résultat à chaque exécution (aucune dépendance à l'heure, au hasard ou à un état global) et indépendant signifie qu'un test ne dépend ni du résultat ni de l'ordre d'exécution d'un autre. L'exécution parallèle est une conséquence possible de l'indépendance, pas son but ; la mémoire et la génération de rapports ne sont pas l'objectif de ces principes." },

    { id: 39, module: "tests", question: "Quel serait un signe qu'un test ne respecte pas le principe Fast ?", options: ["Le test met plusieurs secondes à s'exécuter, par exemple en accédant au réseau","Le test contient plusieurs assertions pour vérifier différents résultats","Le test a besoin d'une phase de préparation des données avant l'action","Le test appelle successivement plusieurs méthodes de la classe testée"], correct: [0], explanation: "Un test lent, qui met plusieurs secondes (souvent à cause d'un accès réseau, disque ou base de données), viole le principe Fast : les tests unitaires doivent s'exécuter en millisecondes. Avoir plusieurs assertions, une préparation de données (Arrange) ou plusieurs appels de méthodes est parfaitement normal et n'a aucun impact sur la rapidité." },

    { id: 40, module: "tests", question: "À quoi sert un mock dans un test unitaire ?", options: ["Simuler une dépendance externe afin d'isoler le code réellement testé","Accélérer l'exécution en sautant volontairement des portions de code","Produire automatiquement des jeux de données de test aléatoires","Conserver les résultats des tests en vue d'une analyse ultérieure"], correct: [0], explanation: "Un mock simule une dépendance (base de données, API, service externe) afin de tester le code en isolation, sans subir la lenteur ou l'instabilité de ces systèmes. Il n'a pas pour rôle de sauter du code, de générer des données aléatoires (rôle d'un générateur de fixtures) ni d'archiver des résultats (rôle d'un rapport de tests)." },

    { id: 41, module: "tests", question: "Dans quel cas utiliserais-tu un mock plutôt qu'une méthode réelle dans un test ?", options: ["Quand la méthode dépend d'un service externe comme une base, une API ou le réseau","Quand la méthode est trop complexe pour être appelée directement dans un test","Quand on cherche surtout à augmenter rapidement la couverture de code","Quand la méthode renvoie naturellement une valeur différente à chaque appel"], correct: [0], explanation: "On utilise un mock quand la dépendance réelle est externe, lente, coûteuse ou instable (base de données, API, réseau, système de fichiers), afin d'isoler le code testé. La complexité d'une méthode ne justifie pas en soi un mock ; viser la couverture n'est pas un motif valable ; et un comportement non déterministe se gère justement en simulant la dépendance, pas en mockant la méthode testée elle-même." },

    { id: 59, module: "tests", question: "Que signifie le pattern AAA dans l'organisation d'un test unitaire ?", options: ["Arrange (préparer le contexte), Act (exécuter l'action), Assert (vérifier le résultat)","Add (ajouter), Apply (appliquer), Analyze (analyser le résultat obtenu)","Assert (vérifier d'abord), Arrange (préparer ensuite), Act (exécuter enfin)","Allocate (allouer), Activate (activer), Audit (contrôler la sortie produite)"], correct: [0], explanation: "Le pattern AAA structure un test en trois phases dans cet ordre : Arrange (préparer le contexte et les données), Act (exécuter l'action testée) puis Assert (vérifier le résultat). La troisième proposition donne les bons mots mais dans le mauvais ordre, ce qui n'a aucun sens ; les variantes Add/Apply/Analyze et Allocate/Activate/Audit sont des inventions plausibles mais erronées." },

    { id: 60, module: "tests", question: "Quelle est la différence entre any() et eq() dans Mockito ?", options: ["any() accepte n'importe quelle valeur du type, eq() exige une égalité exacte","any() s'utilise pour les objets alors qu'eq() est réservé aux types primitifs","eq() est le plus permissif des deux car il s'appuie sur la méthode equals()","any() contrôle seulement le type tandis qu'eq() contrôle la valeur et le type"], correct: [0], explanation: "any(Type.class) accepte n'importe quelle valeur du type indiqué, alors qu'eq(valeur) exige que l'argument soit exactement égal à la valeur donnée (comparaison via equals). eq() est le plus restrictif, pas le plus permissif ; any() s'utilise aussi bien pour objets que primitifs (avec anyInt, anyLong, etc.) ; et c'est any() qui ne regarde au plus que le type, pas eq()." },

    { id: 61, module: "tests", question: "Quelle règle faut-il respecter quand on utilise des matchers Mockito (any(), eq(), etc.) ?", options: ["Dès qu'un argument est un matcher, tous les autres arguments doivent aussi en être","On ne peut placer qu'un seul matcher par appel de méthode mocké","Les matchers doivent être passés dans l'ordre alphabétique de leurs noms","Les matchers ne s'utilisent qu'avec verify(), jamais à l'intérieur de when()"], correct: [0], explanation: "La règle de Mockito impose que si un seul argument est un matcher, alors tous les arguments doivent être des matchers : verify(mock).method(any(), \"valeur\") échoue et il faut écrire verify(mock).method(any(), eq(\"valeur\")). On peut combiner plusieurs matchers dans un appel ; leur ordre suit celui des paramètres, pas l'alphabet ; et ils fonctionnent aussi bien avec when() qu'avec verify()." },

    { id: 62, module: "tests", question: "Quelle est la différence entre verify() et when() dans Mockito ?", options: ["when() configure le comportement du mock, verify() contrôle les appels effectués","verify() se place avant l'action testée alors que when() se place après","when() ne s'applique qu'aux mocks et verify() qu'aux objets réels instanciés","verify() configure et contrôle d'un coup, when() se contente de configurer"], correct: [0], explanation: "when(mock.method()).thenReturn(value) configure le comportement du mock pendant la phase Arrange, tandis que verify(mock).method() vérifie après coup qu'un appel a bien eu lieu, pendant la phase Assert. verify() vient donc après l'action, pas avant ; verify() s'utilise sur des mocks ; et aucune des deux ne fait configuration et vérification en même temps." },

    { id: 42, module: "poo", question: "Quelle est la différence entre une classe et une instance de classe ?", options: ["La classe est le modèle/plan, l'instance est un objet concret créé à partir de ce modèle","La classe contient les données, l'instance contient seulement les méthodes héritées","L'instance est le modèle réutilisable, la classe est une de ses copies en mémoire","La classe et l'instance sont identiques, seul le nom de la variable change"], correct: [0], explanation: "La classe définit la structure (attributs et méthodes) ; l'instance est un objet concret créé à partir de cette classe, avec ses propres valeurs d'attributs. Inverser les rôles (instance = modèle) est faux : c'est la classe le modèle. Les méthodes appartiennent à la classe mais s'appliquent à l'instance, donc séparer données et méthodes ainsi est faux, et classe et instance ne sont pas interchangeables." },

    { id: 43, module: "poo", question: "Que représente un attribut dans une classe ? Et une méthode ?", options: ["Attribut = donnée/propriété décrivant l'état de l'objet, Méthode = comportement/action de l'objet","Attribut = action exécutée par l'objet, Méthode = donnée décrivant son état","Attribut = membre public de la classe, Méthode = membre privé de la classe","Attribut = variable globale partagée, Méthode = variable locale à un appel"], correct: [0], explanation: "Un attribut stocke l'état/les données de l'objet ; une méthode définit son comportement/ses actions. La deuxième option inverse les deux définitions. La visibilité (public/privé) ne distingue pas attribut et méthode, qui peuvent chacun être public ou privé. Et un attribut n'est pas une variable globale : il appartient à l'objet." },

    { id: 44, module: "poo", question: "À quoi sert le mot-clé 'self' (Python) ou 'this' (Java) dans une méthode de classe ?", options: ["Référencer l'instance courante pour accéder à ses propres attributs et méthodes","Référencer la classe parente pour appeler ses méthodes héritées","Déclarer que le membre appartient à la classe et non à une instance","Créer une nouvelle instance de la classe au sein de la méthode"], correct: [0], explanation: "self (Python) ou this (Java) désigne l'instance courante, ce qui permet d'accéder à ses propres attributs et méthodes. Référencer le parent se fait avec super, pas avec this/self. Un membre rattaché à la classe (et non à l'instance) est un membre static/de classe, autre concept. Et self/this ne crée aucune instance : il pointe vers celle qui existe déjà." },

    { id: 45, module: "poo", question: "Quel est le rôle d'un constructeur dans une classe ?", options: ["Initialiser les attributs et l'état de l'instance lors de sa création","Libérer les ressources et l'état de l'instance lors de sa destruction","Définir le type de retour attendu par les méthodes de la classe","Copier une instance existante pour en produire une instance identique"], correct: [0], explanation: "Le constructeur (__init__ en Python, même nom que la classe en Java) initialise l'état de l'objet à sa création. Libérer les ressources à la destruction est le rôle du destructeur, pas du constructeur. Le constructeur ne déclare pas de type de retour, et dupliquer une instance existante relève d'un constructeur de copie, un cas particulier et non son rôle général." },

    { id: 46, module: "poo", question: "Que se passe-t-il si on ne définit pas de constructeur dans une classe ?", options: ["Le langage fournit automatiquement un constructeur par défaut, sans paramètres","La classe devient abstraite et ne peut plus être instanciée directement","Tous les attributs sont obligatoirement initialisés à zéro par le langage","Une erreur est levée à la compilation tant qu'aucun objet n'est créé"], correct: [0], explanation: "Sans constructeur défini explicitement, le langage fournit un constructeur par défaut (vide, sans paramètres) qui permet d'instancier la classe. L'absence de constructeur ne rend pas la classe abstraite (cela vient du mot-clé abstract/d'une méthode abstraite). Les attributs ne sont pas tous mis à zéro automatiquement (en Python ils n'existent même pas), et aucune erreur n'est levée : l'instanciation reste possible." },

    { id: 47, module: "poo", question: "Quels sont les quatre grands principes de la programmation orientée objet ?", options: ["L'Encapsulation, masquer les données internes et contrôler leur accès","L'Héritage, réutiliser et spécialiser les membres d'une autre classe","Le Polymorphisme, une même méthode prend plusieurs formes selon l'objet","La Composition, assembler un objet à partir d'autres objets qu'il contient"], correct: [0,1,2], explanation: "Les quatre piliers de la POO sont l'Encapsulation, l'Héritage, le Polymorphisme et l'Abstraction. Encapsulation, Héritage et Polymorphisme proposés ici en font partie. La Composition est une relation entre objets (relation 'a un'), utile et fréquente, mais ce n'est pas l'un des quatre piliers : le pilier manquant est l'Abstraction." },

    { id: 48, module: "poo", question: "Explique le principe d'Encapsulation.", options: ["Masquer les données internes et n'autoriser leur accès qu'à travers des méthodes contrôlées","Exposer uniquement une interface simple en cachant la complexité de l'implémentation","Permettre à une classe de réutiliser les attributs et méthodes d'une autre classe","Permettre à une même méthode de se comporter différemment selon le type d'objet"], correct: [0], explanation: "L'encapsulation masque les données internes (attributs privés) et en contrôle l'accès via des méthodes publiques (getters/setters), protégeant l'intégrité des données. Exposer une interface en cachant la complexité décrit l'abstraction, notion proche mais distincte. Réutiliser les membres d'une autre classe est l'héritage, et adapter le comportement d'une méthode au type de l'objet est le polymorphisme." },

    { id: 49, module: "poo", question: "Comment l'abstraction améliore-t-elle la lisibilité et la maintenance du code ?", options: ["En exposant une interface simple et en cachant les détails d'implémentation complexes","En masquant les attributs derrière des getters et setters pour protéger les données","En regroupant les classes proches dans un même package bien nommé","En permettant à une sous-classe de redéfinir les méthodes de sa classe parente"], correct: [0], explanation: "L'abstraction améliore la lisibilité et la maintenance en se concentrant sur le 'quoi' plutôt que le 'comment' : on expose une interface simple et on cache les détails complexes. Protéger les attributs via getters/setters décrit l'encapsulation. Regrouper des classes dans un package relève de l'organisation/modularité, pas de l'abstraction, et redéfinir des méthodes en sous-classe est du polymorphisme par override." },

    { id: 50, module: "poo", question: "Quelle est la différence entre association et composition entre deux classes ?", options: ["Association = relation faible, objets indépendants ; Composition = l'enfant ne peut exister sans le parent","Association = relation forte à cycles de vie liés ; Composition = simple lien entre objets indépendants","Association = relation entre classes ; Composition = relation d'héritage entre une classe et sa parente","Association = relation N:N uniquement ; Composition = relation 1:1 entre deux objets distincts"], correct: [0], explanation: "Dans une association, les objets existent indépendamment (Professeur-Étudiant) ; dans une composition, l'enfant ne peut exister sans le parent (Voiture-Moteur), leurs cycles de vie sont liés. La deuxième option inverse exactement les deux définitions. La composition n'est pas de l'héritage (relation 'a un' contre relation 'est un'), et la distinction ne tient pas à la cardinalité (N:N ou 1:1)." },

    { id: 51, module: "poo", question: "Dans quel cas utiliserais-tu une composition plutôt qu'une simple association ?", options: ["Quand un objet fait partie intégrante d'un autre et ne peut exister sans lui","Quand deux objets indépendants ont seulement besoin de se référencer parfois","Quand une classe doit hériter du comportement complet d'une autre classe","Quand plusieurs objets partagent une même instance au cours du temps"], correct: [0], explanation: "La composition s'utilise pour une relation 'fait partie de' forte, où l'enfant ne survit pas sans le parent (Maison-Pièce, Commande-LigneCommande). Un simple besoin de se référencer entre objets indépendants décrit une association. Hériter du comportement d'une autre classe est de l'héritage, et le partage d'une même instance par plusieurs objets correspond plutôt à une agrégation." },

    { id: 52, module: "documentation", question: "Quelle est la différence entre un commentaire simple et une documentation générée automatiquement avec JavaDoc/Sphinx ?", options: ["JavaDoc/Sphinx génèrent une documentation HTML navigable à partir de commentaires structurés par des tags","JavaDoc/Sphinx s'exécutent au runtime et peuvent modifier le comportement du programme documenté","JavaDoc/Sphinx remplacent les commentaires en compilant le code source en pages web","JavaDoc/Sphinx vérifient la syntaxe du code et signalent les erreurs à la place du compilateur"], correct: [0], explanation: "JavaDoc/Sphinx exploitent des commentaires structurés par des tags (@param, @return, :param:, :returns:) pour générer automatiquement une documentation HTML navigable. Ces outils n'agissent pas au runtime et ne modifient pas le comportement du code. Ils ne compilent pas le code et ne le remplacent pas, et ils ne jouent pas le rôle d'un compilateur ou d'un analyseur d'erreurs." },

    { id: 53, module: "uml", question: "Que signifie un losange noir dans un diagramme UML ?", options: ["Une composition : relation forte où le composant ne peut exister sans le composé","Une agrégation : relation faible où les deux objets restent indépendants","Une réalisation : une classe qui implémente le contrat d'une interface","Une généralisation : une sous-classe qui hérite d'une classe parente"], correct: [0], explanation: "En UML, le losange noir (plein) représente une composition : relation forte aux cycles de vie liés, où le composant ne survit pas sans le composé. Le losange blanc (vide) désigne au contraire l'agrégation, relation faible. La réalisation d'interface se note par une flèche pointillée à triangle vide, et la généralisation (héritage) par une flèche pleine à triangle vide." },

    { id: 54, module: "uml", question: "Comment peut-on représenter l'héritage entre deux classes sur un diagramme de classe ?", options: ["Une flèche à triangle vide, en trait plein, pointant vers la classe parente","Une flèche à triangle vide, en trait pointillé, pointant vers la classe parente","Une flèche à losange plein, en trait plein, partant de la classe parente","Une flèche à pointe simple, en trait plein, pointant vers la classe enfant"], correct: [0], explanation: "L'héritage (généralisation) se représente par une flèche à triangle vide en trait plein, allant de l'enfant vers le parent. Le trait pointillé à triangle vide désigne, lui, la réalisation d'une interface, pas l'héritage de classe. Le losange plein note une composition, et la flèche à pointe simple représente une association ou une dépendance, pas un héritage." },

    { id: 55, module: "unity", question: "À quoi correspond une classe qui hérite de MonoBehaviour dans Unity ?", options: ["Un script personnalisé que l'on peut attacher à un GameObject comme composant","Un composant natif fourni par le moteur, comme Transform ou Rigidbody","Un asset de données réutilisable indépendant de toute scène, comme un ScriptableObject","Un objet de la scène servant uniquement de conteneur à d'autres objets"], correct: [0], explanation: "Hériter de MonoBehaviour permet de créer un script attachable à un GameObject, avec accès au cycle de vie (Start, Update...) et à l'écosystème Unity. Transform et Rigidbody sont des composants natifs intégrés, pas des MonoBehaviour que l'on écrit. Un ScriptableObject hérite d'une autre classe (pour des données hors scène), et un simple conteneur de scène est un GameObject, pas un MonoBehaviour." },

    { id: 56, module: "unity", question: "Quelle est la différence entre la méthode Start() et la méthode Update() dans une classe Unity ?", options: ["Start() s'exécute une seule fois à l'initialisation, Update() à chaque frame","Start() s'exécute à chaque frame, Update() une seule fois à l'initialisation","Start() s'exécute à intervalle fixe pour la physique, Update() à chaque frame","Start() et Update() s'exécutent toutes deux une fois, dans cet ordre, au lancement"], correct: [0], explanation: "Start() est appelée une seule fois lors de l'initialisation (avant la première frame), tandis qu'Update() est appelée à chaque frame. La deuxième option inverse les deux. L'exécution à intervalle fixe pour la physique décrit FixedUpdate(), pas Start(). Et Update() n'est pas appelée une seule fois : elle tourne en boucle tant que l'objet est actif." },

    { id: 57, module: "unity", question: "Pourquoi utilise-t-on souvent le mot-clé public devant certaines variables dans Unity ? Quels avantages et risques cela entraîne-t-il ?", options: ["Avantage : la variable devient éditable directement dans l'Inspector sans toucher au code","Risque : la variable est exposée publiquement, ce qui affaiblit l'encapsulation de la classe","Avantage : déclarer la variable public améliore sensiblement les performances d'exécution","Risque : une variable public ne peut plus du tout être lue ou modifiée par un autre script"], correct: [0,1], explanation: "Une variable public est sérialisée : son avantage est d'être éditable dans l'Inspector (pratique pour le design) ; son risque est d'être exposée publiquement, ce qui affaiblit l'encapsulation (on préfère souvent [SerializeField] private). En revanche, la visibilité public n'a aucun effet sur les performances d'exécution, et elle rend la variable plus accessible aux autres scripts, pas moins : ces deux propositions sont donc fausses." },

    { id: 58, module: "unity", question: "Comment utiliser la composition pour enrichir le comportement d'un GameObject dans Unity ?", options: ["Attacher au même GameObject plusieurs composants spécialisés, chacun avec une responsabilité unique","Créer une hiérarchie d'héritage où une classe de base regroupe tous les comportements","Regrouper les objets en parent-enfant dans la hiérarchie de la scène pour cumuler leurs scripts","Centraliser tout le comportement dans un unique script monolithique attaché à l'objet"], correct: [0], explanation: "Unity favorise la composition : on attache au GameObject plusieurs composants spécialisés (mouvement, vie, attaque...), chacun avec une responsabilité unique. Tout regrouper dans une classe de base relève de l'héritage, l'approche opposée. Le parentage parent-enfant dans la scène organise la transformation spatiale mais n'ajoute pas les scripts du parent aux enfants, et un script monolithique unique va à l'encontre de la composition." },

    { id: 63, module: "bdd", question: "Quel est le rôle d'un MCD dans la modélisation d'une base de données ?", options: ["Représenter les entités, attributs et associations de façon conceptuelle, sans choix technique","Décrire les tables, colonnes typées et clés étrangères prêtes pour le SGBD","Lister les requêtes SQL et les vues nécessaires aux écrans de l'application","Définir les index et le partitionnement pour accélérer les requêtes lourdes"], correct: [0], explanation: "Le MCD (Modèle Conceptuel de Données) décrit entités, attributs et associations de manière abstraite, indépendamment de tout SGBD : c'est l'étape de conception, avant toute implémentation. Les tables typées avec clés étrangères relèvent du MLD/MPD, étape suivante. Les requêtes et vues SQL appartiennent à l'exploitation, pas à la modélisation. Les index et le partitionnement sont des choix physiques d'optimisation (MPD), absents du niveau conceptuel." },

    { id: 64, module: "bdd", question: "Quelles transformations sont nécessaires pour passer d'un MCD à un MLD ?", options: ["Chaque entité devient une table, les associations N:N une table de liaison, les 1:N une clé étrangère","Chaque association devient une table et chaque entité une simple contrainte CHECK","Chaque cardinalité maximale devient une contrainte UNIQUE sur la colonne concernée","Chaque attribut devient un index et chaque identifiant un trigger de validation"], correct: [0], explanation: "Le passage MCD vers MLD transforme chaque entité en table, l'identifiant en clé primaire, une association 1:N en clé étrangère côté N, et une association N:N en table de liaison portant deux clés étrangères. Les associations ne deviennent pas systématiquement des tables, et les entités ne se réduisent jamais à des CHECK. Les cardinalités guident le placement des clés étrangères, pas la création de contraintes UNIQUE. Les attributs deviennent des colonnes, pas des index, et les identifiants deviennent des clés, pas des triggers." },

    { id: 65, module: "bdd", question: "Qu'est-ce qu'un serveur de base de données et à quoi sert-il ?", options: ["Un logiciel SGBD qui stocke les données, gère la sécurité et répond aux requêtes SQL","Une interface graphique permettant de visualiser et de saisir les données des tables","Une machine physique dédiée au seul stockage de fichiers et de sauvegardes","Un service cloud chargé de répliquer les données entre plusieurs centres distants"], correct: [0], explanation: "Un serveur de base de données est un logiciel SGBD (MySQL, PostgreSQL...) qui stocke les données, gère la sécurité, les transactions et la concurrence, et répond aux requêtes SQL des clients. L'interface graphique de saisie décrit en réalité un client comme phpMyAdmin. Le serveur n'est pas qu'un simple espace de fichiers : il interprète et exécute du SQL. La réplication multi-sites est une fonctionnalité optionnelle d'exploitation, pas la définition d'un serveur de BDD." },

    { id: 66, module: "bdd", question: "Quelle est la différence entre un client de base de données et un serveur de base de données ?", options: ["Le client envoie des requêtes SQL, le serveur les exécute et lui renvoie les résultats","Le client conserve les données en local, le serveur se charge de leur archivage durable","Le serveur tourne toujours sur une machine distante, le client uniquement en local","Le client ne fait que lire les données, le serveur prend en charge toutes les écritures"], correct: [0], explanation: "Dans l'architecture client-serveur, le client (phpMyAdmin, application, ligne de commande) envoie des requêtes SQL et le serveur (MySQL, PostgreSQL) les exécute puis retourne les résultats. Le client ne stocke pas les données : c'est le serveur qui les héberge. Le serveur peut très bien tourner en local (localhost), il n'est pas forcément distant. Le client n'est pas limité à la lecture : il déclenche aussi les écritures, c'est le serveur qui les applique." },

    { id: 67, module: "bdd", question: "Donne un exemple d'action que tu peux faire avec un client comme phpMyAdmin.", options: ["Créer des tables, exécuter des requêtes SQL et importer ou exporter des données","Installer le moteur MySQL et déclarer le service au démarrage du système","Régler la taille des buffers et les paramètres de cache du moteur","Programmer les sauvegardes automatiques et configurer la réplication maître-esclave"], correct: [0], explanation: "phpMyAdmin est un client d'administration : il permet de créer, modifier et supprimer des tables, d'exécuter des requêtes SQL, de gérer les utilisateurs et d'importer ou exporter des données. Installer le moteur MySQL relève de l'administration système, en amont du client. Régler les buffers et le cache modifie la configuration du serveur lui-même. La réplication maître-esclave est une tâche d'exploitation côté serveur, pas une action courante du client." },

    { id: 68, module: "bdd", question: "Que doit contenir la définition d'une table pour qu'elle soit complète ?", options: ["Le nom de la table, ses colonnes typées, une clé primaire et les contraintes utiles","Le nom de la table et la simple liste des noms de colonnes, sans plus","Le nom de la table, ses colonnes et au moins un index sur une colonne","Les colonnes de la table accompagnées des requêtes SELECT qui les exploitent"], correct: [0], explanation: "Une définition de table complète comprend le nom de la table, ses colonnes (nom et type), une clé primaire et les contraintes pertinentes (NOT NULL, UNIQUE, CHECK, FOREIGN KEY), parfois des valeurs par défaut. Le seul nom des colonnes ne suffit pas : sans type ni clé primaire, la table est incomplète. Un index est une optimisation facultative, pas un élément obligatoire de la définition. Les requêtes SELECT exploitent la table mais ne font pas partie de sa structure." },

    { id: 69, module: "bdd", question: "Quelle est la différence entre une clé primaire et une clé étrangère dans une base de données relationnelle ?", options: ["La clé primaire identifie de façon unique chaque ligne, la clé étrangère référence une autre table","La clé primaire peut être NULL, alors que la clé étrangère ne l'est jamais","Une table admet plusieurs clés primaires mais ne peut avoir qu'une seule clé étrangère","La clé étrangère est toujours indexée automatiquement, ce que la clé primaire n'est pas"], correct: [0], explanation: "La clé primaire (PRIMARY KEY) identifie de manière unique chaque ligne d'une table et ne peut jamais être NULL. La clé étrangère (FOREIGN KEY) référence la clé primaire d'une autre table pour matérialiser une relation. C'est l'inverse qui est vrai pour les NULL : la primaire interdit NULL, l'étrangère peut l'autoriser. Une table n'a qu'une seule clé primaire mais peut posséder plusieurs clés étrangères. Côté indexation, c'est plutôt la clé primaire qui est indexée d'office, pas l'étrangère." },

    { id: 70, module: "bdd", question: "Que signifie l'acronyme CRUD ?", options: ["Create, Read, Update, Delete : les quatre opérations de base sur les données","Connect, Request, Update, Disconnect : le cycle d'une session client-serveur","Commit, Rollback, Undo, Drop : les quatre actions de gestion des transactions","Cache, Retrieve, Upload, Delete : les opérations de transfert de données"], correct: [0], explanation: "CRUD signifie Create (INSERT), Read (SELECT), Update (UPDATE) et Delete (DELETE) : les quatre opérations fondamentales de manipulation des données. Connect/Request/Disconnect décrivent un cycle de connexion réseau, sans rapport avec l'acronyme. Commit, Rollback et Drop sont de vraies commandes SQL mais relèvent des transactions ou du DDL, pas de CRUD. Cache et Upload n'appartiennent pas non plus aux opérations CRUD." },

    { id: 71, module: "bdd", question: "Quelle est la différence entre les opérations UPDATE et DELETE ?", options: ["UPDATE modifie des valeurs dans des lignes existantes, DELETE supprime des lignes entières","UPDATE est annulable par ROLLBACK, tandis que DELETE est toujours définitif","DELETE s'exécute plus vite car il ignore la vérification des contraintes","UPDATE ne peut modifier qu'une seule colonne à la fois dans une requête"], correct: [0], explanation: "UPDATE modifie les valeurs de colonnes dans des lignes déjà présentes, alors que DELETE retire des lignes complètes de la table ; les deux s'appuient sur une clause WHERE pour cibler les lignes. UPDATE comme DELETE sont annulables par ROLLBACK tant que la transaction n'est pas validée. DELETE vérifie bien les contraintes, notamment les clés étrangères, et n'est pas plus rapide pour cette raison. UPDATE peut modifier plusieurs colonnes d'un coup en les séparant par des virgules dans le SET." },

    { id: 72, module: "bdd", question: "À quoi sert une jointure entre deux tables ?", options: ["Combiner les données de plusieurs tables selon une condition de liaison entre colonnes","Fusionner définitivement deux tables en une seule table physique","Recopier les lignes d'une table source vers une table de destination","Maintenir synchronisées les données de deux bases distinctes en temps réel"], correct: [0], explanation: "Une jointure (JOIN) combine les données de plusieurs tables dans une même requête grâce à une condition de liaison, le plus souvent clé primaire égale clé étrangère. Elle ne fusionne pas physiquement les tables : celles-ci restent séparées, seul le résultat de la requête les rapproche. Elle ne recopie pas les lignes d'une table vers une autre, ce que ferait un INSERT ... SELECT. Et elle ne synchronise pas deux bases : c'est le rôle de la réplication." },

    { id: 73, module: "bdd", question: "Quelle est la différence entre un INNER JOIN et un LEFT JOIN ?", options: ["INNER ne renvoie que les lignes appariées, LEFT renvoie toutes celles de la table de gauche","LEFT JOIN est plus performant car il parcourt moins de lignes que INNER JOIN","INNER JOIN peut relier plus de deux tables, là où LEFT JOIN se limite à deux","LEFT JOIN engendre des doublons que INNER JOIN élimine automatiquement"], correct: [0], explanation: "INNER JOIN ne retourne que les lignes ayant une correspondance dans les deux tables, tandis que LEFT JOIN retourne toutes les lignes de la table de gauche, complétées par des NULL à droite en l'absence de correspondance. LEFT JOIN n'est pas plus performant : il traite au contraire au moins autant de lignes. Les deux types de jointure peuvent enchaîner plus de deux tables. Et aucune des deux ne gère les doublons : ils dépendent des données et des conditions, pas du type de jointure." },

    { id: 74, module: "web", question: "Quelle est la fonction des balises &lt;header&gt;, &lt;main&gt; et &lt;footer&gt; dans une page HTML ?", options: ["Ce sont des balises sémantiques qui structurent la page : en-tête, contenu principal et pied de page","Ce sont des balises de mise en forme qui appliquent un style prédéfini à ces zones","Ce sont des conteneurs neutres équivalents à &lt;div&gt;, sans valeur sémantique ajoutée","Ce sont des balises qui chargent automatiquement les ressources liées à la page"], correct: [0], explanation: "&lt;header&gt;, &lt;main&gt; et &lt;footer&gt; sont des balises sémantiques HTML5 qui décrivent le rôle des zones (en-tête, contenu principal unique, pied de page), au bénéfice de l'accessibilité et du SEO. Elles n'appliquent aucun style par elles-mêmes (rôle du CSS) ; contrairement à &lt;div&gt; elles portent un sens ; et elles ne gèrent pas le chargement des ressources (rôle de &lt;link&gt; ou des scripts)." },

    { id: 75, module: "web", question: "Quelle est la différence entre une balise de structure comme &lt;div&gt; et une balise sémantique comme &lt;article&gt; ?", options: ["&lt;div&gt; est un conteneur générique sans signification, &lt;article&gt; décrit un contenu autonome et porteur de sens","&lt;div&gt; sert à la mise en page, &lt;article&gt; applique automatiquement une mise en forme typographique","&lt;article&gt; est un ancien élément que &lt;div&gt; a remplacé depuis l'arrivée de HTML5","&lt;div&gt; ne peut contenir que du texte, &lt;article&gt; peut contenir n'importe quel élément"], correct: [0], explanation: "&lt;div&gt; est un conteneur neutre, sans sens particulier, utilisé pour grouper et styler. &lt;article&gt; est une balise sémantique désignant un contenu autonome (article, billet, commentaire) qui améliore accessibilité et référencement. &lt;article&gt; n'applique pas de style automatique, n'a pas été remplacé par &lt;div&gt; (c'est l'inverse, HTML5 l'a introduit), et &lt;div&gt; peut parfaitement contenir d'autres éléments." },

    { id: 76, module: "web", question: "Pourquoi l'accessibilité est-elle importante dans une application web ?", options: ["Rendre le site utilisable par tous, notamment au lecteur d'écran et au clavier","Améliorer le référencement, sans réel impact pour les utilisateurs eux-mêmes","Adapter automatiquement l'affichage aux différentes tailles d'écran","Protéger les formulaires contre les saisies malveillantes des visiteurs"], correct: [0], explanation: "L'accessibilité (a11y) vise à rendre le contenu utilisable par tous, dont les personnes en situation de handicap (lecteur d'écran, navigation clavier) ; c'est aussi une obligation légale en France (RGAA). Le SEO en bénéficie mais n'est pas le but ; l'adaptation aux tailles d'écran est le responsive ; la protection des saisies relève de la sécurité." },

    { id: 77, module: "web", question: "Donne un exemple de règle RGAA liée aux images ou aux contrastes.", options: ["Fournir un attribut alt décrivant chaque image porteuse d'information","Compresser les images pour qu'elles pèsent moins de 10 Ko sur la page","Privilégier le format PNG pour garantir la netteté de chaque image","Éviter d'employer la couleur comme seul vecteur d'information important"], correct: [0,3], explanation: "Côté images, le RGAA impose un attribut alt pertinent pour chaque image porteuse d'information (alt vide pour les images décoratives). Côté contrastes, l'information ne doit pas reposer uniquement sur la couleur et le ratio texte/fond doit être suffisant (4.5:1 pour le texte normal). Le poids des fichiers et le choix d'un format relèvent de la performance ou du graphisme, pas de l'accessibilité." },

    { id: 78, module: "web", question: "Quelles sont les différentes façons d'ajouter du CSS à une page HTML ?", options: ["En ligne via l'attribut style, en interne via la balise &lt;style&gt;, en externe via un fichier .css lié","En interne via la balise &lt;style&gt; placée dans le &lt;head&gt; de la page","En externe via un fichier .css relié à la page avec une balise &lt;link&gt;","En ligne via la balise &lt;script&gt; qui injecte les règles dans le document"], correct: [0,1,2], explanation: "Il existe trois manières d'ajouter du CSS : en ligne (attribut style sur la balise, à éviter), en interne (balise &lt;style&gt; dans le &lt;head&gt;) et en externe (fichier .css lié via &lt;link&gt;, méthode recommandée). Les options 2 et 3 sont donc justes mais incomplètes prises seules ; la dernière est fausse car &lt;script&gt; sert à exécuter du JavaScript, pas à déclarer des règles de style." },

    { id: 79, module: "web", question: "À quoi sert un framework comme Bootstrap dans une page web ?", options: ["Fournir des composants et une grille responsive prêts à l'emploi pour accélérer le développement","Remplacer le HTML par ses propres balises afin de structurer plus rapidement la page","Optimiser et minifier automatiquement le code afin d'accélérer le chargement du site","Gérer la logique applicative et les appels au serveur à la place de JavaScript"], correct: [0], explanation: "Bootstrap est un framework CSS (et un peu JS) qui fournit des composants prêts à l'emploi (boutons, modales, barre de navigation), une grille responsive et des classes utilitaires, ce qui accélère le développement et harmonise le rendu. Il n'introduit pas de balises remplaçant le HTML, ne minifie pas le projet (rôle d'un bundler) et ne gère pas la logique applicative (rôle de JavaScript)." },

    { id: 80, module: "web", question: "Qu'est-ce qu'une grille responsive et comment aide-t-elle à adapter l'interface aux écrans ?", options: ["Un système de colonnes qui réorganise le contenu selon la taille de l'écran","Une image de fond qui ajuste sa résolution à l'écran d'affichage","Un ensemble de media queries qui chargent une page distincte par appareil","Un tableau HTML dont les colonnes figent la mise en page sur tous les écrans"], correct: [0], explanation: "Une grille responsive divise la page en colonnes (12 chez Bootstrap) dont la disposition s'adapte à la largeur de l'écran via des breakpoints : le contenu s'empile sur mobile et se place côte à côte sur desktop. Ce n'est pas une image de fond, cela ne charge pas une page séparée par appareil (une seule page s'adapte), et contrairement à un tableau HTML elle ne fige pas la mise en page." },

    { id: 81, module: "web", question: "Que permet de faire JavaScript sur une page web que HTML/CSS ne permettent pas ?", options: ["Rendre la page dynamique et interactive : réagir aux actions et modifier le contenu sans recharger","Définir la structure et le contenu sémantique affichés dans le navigateur","Mettre en forme la page : appliquer couleurs, polices et disposition aux éléments","Garantir l'affichage identique de la page sur tous les navigateurs du marché"], correct: [0], explanation: "HTML structure le contenu et CSS le met en forme, mais tous deux sont statiques. JavaScript rend la page dynamique : réagir aux événements (clic, saisie), modifier le DOM en temps réel, appeler des API, valider des formulaires, le tout sans rechargement. Définir la structure est le rôle de HTML, la mise en forme celui de CSS, et JS ne garantit pas à lui seul un rendu identique partout." },

    { id: 82, module: "web", question: "Donne un exemple d'interaction utilisateur qui peut être gérée avec JavaScript.", options: ["Afficher ou masquer un menu déroulant au clic sur un bouton","Appliquer une couleur de fond et une bordure à un encadré","Déclarer le type de document en tête de page avec le DOCTYPE","Relier une feuille de style externe au document HTML"], correct: [0], explanation: "Afficher ou masquer un menu au clic est typiquement géré par JavaScript, qui répond aux actions de l'utilisateur (clic, survol, saisie, défilement). Appliquer une couleur ou une bordure relève du CSS, déclarer le DOCTYPE et relier une feuille de style sont des éléments statiques du HTML, sans interaction utilisateur." },

    { id: 83, module: "web", question: "Cite deux frameworks web populaires à part Angular.", options: ["React et Vue.js","Express et Spring","jQuery et Sass","Webpack et Vite"], correct: [0], explanation: "À côté d'Angular, les principaux frameworks ou bibliothèques front-end sont React (Meta) et Vue.js, rejoints par Svelte. Express et Spring sont des frameworks back-end ; jQuery est une bibliothèque DOM plus ancienne et Sass un préprocesseur CSS, donc pas des frameworks d'application ; Webpack et Vite sont des outils de build, pas des frameworks d'interface." },

    { id: 84, module: "web", question: "Que gère principalement Angular dans une application web ?", options: ["La partie front-end : composants, liaison de données et navigation côté client","La partie back-end : exposition des API et exécution de la logique serveur","La persistance : stockage et requêtage des données dans une base relationnelle","L'infrastructure : configuration du serveur web, du DNS et de l'hébergement"], correct: [0], explanation: "Angular est un framework front-end : il gère l'interface (composants, data binding, router, services, appels HTTP) et structure toute la partie client. Il ne s'occupe pas du back-end (rôle de Node, Spring, etc.), ni de la persistance des données (rôle d'un SGBD), ni de l'infrastructure serveur ou DNS." },

    { id: 85, module: "web", question: "Qu'est-ce qui différencie une SPA d'un site web classique ?", options: ["La SPA charge une seule page et met à jour le contenu en JS sans recharger, le site classique recharge une page à chaque navigation","La SPA génère chaque page sur le serveur avant envoi, le site classique la construit dans le navigateur","La SPA fonctionne sans JavaScript, le site classique dépend entièrement de JavaScript pour s'afficher","La SPA charge tout le contenu d'un bloc au démarrage, le site classique ne charge jamais d'un seul coup"], correct: [0], explanation: "Une SPA (Single Page Application) charge une seule page HTML puis met à jour le contenu dynamiquement en JavaScript lors de la navigation, sans rechargement complet ; un site classique (MPA) recharge une page entière depuis le serveur à chaque clic. La SPA construit l'affichage côté client (et non sur le serveur), repose justement sur JavaScript, et ne charge pas forcément tout le contenu d'un bloc." },

    { id: 86, module: "web", question: "Quel est l'intérêt d'une SPA pour l'expérience utilisateur ?", options: ["Une navigation fluide et rapide, sans rechargement complet de la page","Un référencement naturel renforcé sans effort de configuration supplémentaire","Un fonctionnement complet même lorsque JavaScript est désactivé","Un premier affichage toujours plus rapide qu'un site multipage classique"], correct: [0], explanation: "L'atout d'une SPA pour l'expérience utilisateur est une navigation fluide proche d'une application native : seules les parties utiles du contenu sont mises à jour, sans 'flash' de rechargement. En revanche le SEO demande au contraire une attention particulière, la SPA dépend de JavaScript pour s'afficher, et son premier chargement est souvent plus lourd, pas plus rapide." },

    { id: 87, module: "web", question: "À quoi sert NPM dans un projet Angular ou JavaScript ?", options: ["Gérer les dépendances (bibliothèques) et les scripts du projet","Transpiler le TypeScript et les templates en JavaScript exécutable","Lancer un serveur de production pour héberger l'application en ligne","Assembler et minifier les fichiers source en un bundle optimisé"], correct: [0], explanation: "NPM (Node Package Manager) gère les dépendances déclarées dans package.json (installation, versions) et permet de lancer des scripts (build, test, start). La transpilation est l'affaire du compilateur (TypeScript, Angular CLI), l'hébergement celui d'un serveur, et l'assemblage minifié celui d'un bundler (Webpack, Vite) ; NPM se contente d'orchestrer et d'installer ces outils." },

    { id: 88, module: "web", question: "Quels fichiers sont généralement créés automatiquement quand on génère un composant Angular ?", options: ["Un fichier .ts contenant la logique de la classe du composant","Un fichier .html servant de template pour la vue du composant","Un fichier .css ou .scss regroupant les styles propres au composant","Un fichier .json déclarant à lui seul les routes du composant"], correct: [0,1,2], explanation: "La commande ng generate component crée par défaut quatre fichiers : le composant TypeScript (.component.ts), son template (.component.html), sa feuille de style (.component.css ou .scss) et son fichier de test (.component.spec.ts). Les trois premières options sont donc correctes ; la dernière est fausse car les routes ne sont pas générées avec le composant et se déclarent dans la configuration du Router, pas dans un fichier .json dédié." },

    { id: 89, module: "web", question: "Comment un composant parent peut-il envoyer des données à un composant enfant dans Angular ?", options: ["Via une propriété de l'enfant décorée avec @Input()","Via une propriété de l'enfant décorée avec @Output()","Via un EventEmitter émis par l'enfant vers le parent","Via une variable de service injectée uniquement dans le parent"], correct: [0], explanation: "Le parent transmet des données à l'enfant par binding de propriété, l'enfant déclarant cette propriété avec @Input(). @Output() et l'EventEmitter servent au sens inverse (enfant vers parent), c'est donc l'erreur classique à éviter ici. Un service partagé permettrait aussi la communication, mais il devrait être injecté dans les deux composants, pas seulement dans le parent." },

    { id: 90, module: "web", question: "Quel est le rôle du router dans une application Angular ?", options: ["Associer des URL à des composants et gérer la navigation dans la SPA","Acheminer les requêtes HTTP de l'application vers l'API du serveur","Répartir le trafic réseau entrant entre plusieurs serveurs de l'application","Convertir les fichiers TypeScript du projet en JavaScript pour le navigateur"], correct: [0], explanation: "Le Router Angular gère la navigation côté client : il associe chaque URL à un composant à afficher sans recharger la page, et prend en charge les paramètres d'URL, les routes enfants et les guards. Il ne sert pas à émettre des requêtes HTTP (rôle de HttpClient), ni à répartir du trafic réseau (rôle d'un load balancer), ni à transpiler le TypeScript (rôle du compilateur)." },

    { id: 91, module: "web", question: "Quelle est la différence entre une route statique et une route paramétrée ?", options: ["Une route statique a un chemin fixe, une route paramétrée contient une variable comme /produit/:id","Une route statique est définie au build, une route paramétrée est ajoutée au démarrage de l'application","Une route statique mène à une page sans données, une route paramétrée à une page reliée à une API","Une route statique s'affiche sans composant, une route paramétrée déclenche le chargement d'un composant"], correct: [0], explanation: "Une route statique a un chemin fixe (ex: /accueil) tandis qu'une route paramétrée contient un paramètre dynamique (ex: /produit/:id) récupéré via ActivatedRoute pour afficher le bon contenu. La distinction ne tient pas au moment de définition (les deux sont déclarées dans la configuration), ni à la présence de données ou d'API, ni à l'affichage d'un composant : toute route affichée pointe vers un composant." },

    { id: 92, module: "web", question: "Quel est le rôle d'un service Angular dans la gestion des données ?", options: ["Centraliser la logique métier et l'accès aux données, partagés entre composants via l'injection de dépendances","Stocker durablement les données de l'application dans le navigateur entre deux sessions","Mettre à jour automatiquement le template HTML dès qu'une donnée change","Définir la structure visuelle et les styles communs à plusieurs composants"], correct: [0], explanation: "Un service Angular centralise la logique métier et l'accès aux données (appels HTTP, partage d'état) et est injecté dans les composants via @Injectable, ce qui évite la duplication. Il ne gère pas la persistance dans le navigateur (rôle du localStorage), ni le rafraîchissement de la vue (rôle du data binding), ni la structure visuelle ou les styles (rôle des templates et du CSS)." },

    { id: 93, module: "web", question: "Que signifie un appel API asynchrone dans Angular ?", options: ["Une requête dont le résultat arrive plus tard sans bloquer l'exécution, gérée par un Observable ou une Promise","Une requête dont la réponse est attendue avant de poursuivre la suite du code","Une requête planifiée qui s'exécute seulement au démarrage de l'application","Une requête expédiée directement à la base de données depuis le navigateur"], correct: [0], explanation: "Un appel asynchrone (souvent une requête HTTP via HttpClient) n'attend pas la réponse pour continuer : le code poursuit son exécution et traite le résultat à son arrivée, via un Observable RxJS (auquel on s'abonne avec subscribe) ou une Promise. Attendre la réponse avant de continuer décrit le comportement synchrone (bloquant) ; un appel n'est pas restreint au démarrage ; et le navigateur dialogue avec une API, pas directement avec la base." },

    { id: 94, module: "web", question: "À quoi sert un token JWT dans une application web ?", options: ["Transporter de façon sécurisée l'identité de l'utilisateur authentifié entre le client et le serveur","Chiffrer l'ensemble des échanges réseau à la place du protocole HTTPS","Conserver côté serveur la session de chaque utilisateur connecté à l'application","Masquer le mot de passe de l'utilisateur dans la barre d'adresse du navigateur"], correct: [0], explanation: "Un JWT (JSON Web Token) est un jeton signé délivré après authentification : le client le renvoie à chaque requête (en-tête Authorization) pour prouver son identité, ce qui permet une authentification stateless. Il ne chiffre pas les échanges (rôle de HTTPS, le JWT est seulement signé), n'est justement pas stocké en session côté serveur (c'est tout l'intérêt du stateless), et ne concerne pas l'affichage du mot de passe dans l'URL." },

    { id: 95, module: "web", question: "Comment protéger certaines routes d'une application Angular pour que seules les personnes connectées y accèdent ?", options: ["En utilisant un Guard comme CanActivate qui vérifie l'authentification avant d'autoriser l'accès","En masquant le composant protégé à l'aide d'une règle CSS conditionnelle","En filtrant la requête côté serveur grâce à un intercepteur HttpInterceptor","En retirant la route du fichier de configuration tant que l'utilisateur n'est pas connecté"], correct: [0], explanation: "Côté Angular, on protège une route avec un Guard tel que CanActivate : avant d'activer la route, il vérifie une condition (utilisateur connecté, rôle suffisant) et redirige sinon vers /login. Le masquage CSS n'empêche pas l'accès réel ; un HttpInterceptor agit sur les requêtes HTTP, pas sur l'activation des routes ; et retirer la route de la configuration n'est pas une protection dynamique exploitable." },

    { id: 96, module: "web", question: "Quelle est la différence entre Flexbox et CSS Grid ?", options: ["Flexbox organise les éléments sur un axe (1D), Grid gère lignes et colonnes simultanément (2D)","Flexbox positionne les éléments en lignes et colonnes, Grid les aligne sur un seul axe","Flexbox sert à la mise en page globale, Grid à l'alignement de petits composants","Flexbox s'utilise sur le conteneur, Grid s'applique directement sur chaque élément enfant"], correct: [0], explanation: "Flexbox dispose des éléments sur un seul axe (ligne ou colonne), idéal pour une barre de navigation, tandis que CSS Grid gère deux dimensions (lignes et colonnes), idéal pour une mise en page complète. L'option 2 inverse les deux ; l'option 3 inverse aussi leurs usages typiques ; et l'option 4 est fausse car display: flex et display: grid se déclarent tous deux sur le conteneur parent." },

    { id: 97, module: "web", question: "Quelle est la différence entre let, const et var en JavaScript ?", options: ["let et const ont une portée de bloc (const non réassignable), var a une portée de fonction et est à éviter","var et const ont une portée de bloc, let a une portée de fonction et reste réassignable","let interdit toute réassignation, const autorise la réassignation mais pas la redéclaration","var, let et const ont une portée de bloc, seule var subit le hoisting au sein du script"], correct: [0], explanation: "var (ancien) a une portée de fonction et des comportements pièges (hoisting), alors que let et const (ES6) ont une portée de bloc : let est réassignable, const ne l'est pas. Les autres options confondent les rôles : c'est var, pas const, qui a une portée de fonction ; c'est const, pas let, qui empêche la réassignation ; et var n'a pas une portée de bloc." },

    { id: 98, module: "web", question: "À quoi sert le décorateur @Component dans Angular ?", options: ["Déclarer une classe comme composant et y associer son template, son sélecteur et ses styles","Déclarer une classe comme service injectable et fournir ses dépendances à l'application","Déclarer une classe comme module et regrouper les composants qui lui sont associés","Déclarer une propriété recevant les données transmises par le composant parent"], correct: [0], explanation: "Le décorateur @Component transforme une classe TypeScript en composant Angular en fournissant ses métadonnées : selector (balise d'utilisation), templateUrl (le HTML) et styleUrls (les styles). Rendre une classe injectable est le rôle de @Injectable (services) ; regrouper des composants est celui de @NgModule ; et recevoir des données du parent est le rôle de @Input(), pas de @Component." },

    { id: 99, module: "conception", question: "Quel est le rôle d'un diagramme de cas d'utilisation dans la phase de conception d'une application ?", options: ["Décrire les fonctionnalités du système du point de vue des utilisateurs et de leurs interactions","Détailler la structure interne des classes avec leurs attributs et leurs méthodes","Représenter l'ordre chronologique des messages échangés entre les objets","Décrire les états successifs d'un objet au cours de son cycle de vie"], correct: [0], explanation: "Le diagramme de cas d'utilisation décrit ce que le système doit faire (le quoi), vu des acteurs, pour cadrer les besoins avec le client. La structure des classes relève du diagramme de classes ; la chronologie des messages, du diagramme de séquence ; les états successifs d'un objet, du diagramme d'états-transitions." },

    { id: 100, module: "conception", question: "Quelles sont les principales composantes d'un diagramme de cas d'utilisation UML ?", options: ["Les acteurs qui interagissent avec le système","Les cas d'utilisation représentant les fonctionnalités","La limite du système qui délimite son périmètre","Les attributs et les méthodes de chaque entité"], correct: [0,1,2], explanation: "Un diagramme de cas d'utilisation se compose des acteurs (utilisateurs ou systèmes externes), des cas d'utilisation (ovales représentant les fonctionnalités), des relations qui les lient et de la limite du système (rectangle englobant) : ces trois éléments en font partie. Les attributs et méthodes appartiennent au diagramme de classes, pas au diagramme de cas d'utilisation." },

    { id: 101, module: "conception", question: "En quoi une maquette est-elle complémentaire au diagramme de cas d'utilisation ?", options: ["Le cas d'utilisation dit ce que le système fait, la maquette montre à quoi ressemblera l'interface","La maquette remplace le diagramme de cas d'utilisation devenu inutile","La maquette détaille le code source qui implémente chaque fonctionnalité","Les deux représentent strictement la même information sous deux noms"], correct: [0], explanation: "Le diagramme de cas d'utilisation décrit les fonctionnalités de façon abstraite (le quoi) ; la maquette les concrétise visuellement (écrans, disposition, parcours) : ils se complètent. La maquette ne remplace pas le use case et ne décrit jamais le code source, et les deux ne portent pas la même information." },

    { id: 102, module: "conception", question: "Quelle est la différence entre une maquette filaire (wireframe) et une maquette graphique ?", options: ["Le wireframe est un schéma simple centré sur la structure, la maquette graphique ajoute couleurs, images et style final","Le wireframe est cliquable et interactif, la maquette graphique reste totalement figée","Le wireframe est en haute fidélité colorée, la maquette graphique se limite au noir et blanc","Le wireframe décrit la base de données, la maquette graphique décrit l'interface"], correct: [0], explanation: "Le wireframe (maquette filaire) est une ébauche basse fidélité, souvent en niveaux de gris, centrée sur la structure et le placement ; la maquette graphique (mockup) est haute fidélité avec couleurs, typographies et identité visuelle. L'interactivité dépend de l'outil et non du type ; c'est le wireframe (pas le mockup) qui est généralement épuré ; aucun des deux ne décrit la base de données." },

    { id: 103, module: "conception", question: "Quels outils ou méthodes peut-on utiliser pour créer une maquette d'interface utilisateur ?", options: ["Figma, un outil de maquettage collaboratif en ligne","Balsamiq, spécialisé dans les wireframes basse fidélité","Adobe XD, dédié au design et au prototypage d'interfaces","MySQL Workbench, pour modéliser le schéma des données"], correct: [0,1,2], explanation: "Figma, Balsamiq et Adobe XD sont des outils de maquettage d'interface : ils permettent de concevoir et tester l'écran avant de coder. MySQL Workbench, lui, sert à modéliser une base de données (MCD/MLD) et n'a rien à voir avec la maquette d'interface utilisateur." },

    { id: 104, module: "conception", question: "Qu'est-ce qu'une interface responsive et pourquoi est-elle importante ?", options: ["Une interface qui s'adapte automatiquement à la taille de l'écran : mobile, tablette ou ordinateur","Une interface qui réagit très vite aux clics grâce à un code optimisé","Une interface qui reste pleinement fonctionnelle même sans connexion internet","Une interface qui se traduit toute seule dans la langue de l'utilisateur"], correct: [0], explanation: "Une interface responsive s'adapte à la taille de l'écran (media queries, grilles fluides, images flexibles) et reste utilisable partout, ce qui est crucial puisque le trafic mobile est majoritaire. La rapidité de réaction relève de la performance, le fonctionnement hors-ligne du mode offline (service workers), et la traduction automatique de l'internationalisation : aucun n'est le responsive." },

    { id: 105, module: "conception", question: "Que représente un acteur dans un diagramme de cas d'utilisation ?", options: ["Un rôle joué par un utilisateur ou un système externe qui interagit avec l'application","Une fonctionnalité interne déclenchée automatiquement par le système","Une personne physique précise et nommément identifiée du projet","Un membre de l'équipe de développement qui code l'application"], correct: [0], explanation: "Un acteur représente un rôle (et non une personne précise) qui interagit avec le système : un utilisateur (client, administrateur) ou un autre système (API de paiement). Une fonctionnalité interne est un cas d'utilisation, pas un acteur ; un acteur n'est pas un individu nommé mais un rôle ; et le développeur n'est pas un acteur du système qu'il construit, sauf s'il en est aussi utilisateur." },

    { id: 106, module: "conception", question: "Que signifient les relations include et extend dans un diagramme de cas d'utilisation ?", options: ["include : un cas en intègre toujours un autre ; extend : un cas en étend un autre de façon optionnelle ou conditionnelle","include : un cas en étend un autre par option ; extend : un cas en intègre toujours un autre","Les relations include et extend ont exactement la même signification en UML","include relie deux acteurs entre eux ; extend relie deux systèmes externes"], correct: [0], explanation: "&lt;&lt;include&gt;&gt; : le cas de base intègre toujours le comportement inclus (étape commune factorisée, ex : 'Payer' inclut 'S'authentifier'). &lt;&lt;extend&gt;&gt; : un cas ajoute un comportement optionnel ou conditionnel à un autre (ex : 'Payer' étendu par 'Appliquer un code promo'). La deuxième option inverse les deux définitions ; elles n'ont pas le même sens ; et aucune des deux ne relie des acteurs ou des systèmes, mais bien des cas d'utilisation." },

    { id: 107, module: "agile", question: "Quelle est la principale différence dans l'organisation des étapes entre une méthode agile et le cycle en V ?", options: ["L'agile avance par itérations courtes et incrémentales, le cycle en V suit des phases séquentielles figées","Le cycle en V avance par itérations courtes, l'agile suit des phases séquentielles figées","L'agile supprime entièrement la phase de tests, présente uniquement dans le cycle en V","Le cycle en V livre le produit en continu, l'agile attend la toute fin du projet"], correct: [0], explanation: "Le cycle en V est séquentiel : chaque phase s'achève avant la suivante et le produit n'est livré qu'à la fin. L'agile procède par itérations courtes (sprints) livrant régulièrement un incrément. La deuxième option inverse les deux approches ; l'agile teste à chaque itération (il ne supprime pas les tests) ; et c'est l'agile, non le cycle en V, qui livre de façon continue." },

    { id: 108, module: "agile", question: "Cite deux des valeurs fondamentales du Manifeste Agile.", options: ["Les individus et leurs interactions, plus que les processus et les outils","Un logiciel qui fonctionne, plus qu'une documentation exhaustive","L'adaptation au changement, plus que le suivi rigide d'un plan","Le respect strict du contrat, plus que la collaboration avec le client"], correct: [0,1,2], explanation: "Le Manifeste Agile privilégie les individus et interactions (plus que les processus/outils), le logiciel fonctionnel (plus que la documentation), la collaboration avec le client (plus que le contrat) et l'adaptation au changement (plus que le plan) : les trois premières options sont des valeurs authentiques. La dernière est inversée : l'agile valorise la collaboration avec le client plus que la négociation contractuelle." },

    { id: 109, module: "agile", question: "Pourquoi dit-on que les méthodes agiles sont centrées sur l'utilisateur ?", options: ["On livre fréquemment et on recueille son retour pour ajuster le produit à ses besoins réels","On confie l'écriture du code directement à l'utilisateur final du produit","On met de côté les besoins métier afin d'accélérer la cadence de livraison","On délègue à l'utilisateur la rédaction de toute la documentation technique"], correct: [0], explanation: "Les méthodes agiles livrent des incréments fréquents et sollicitent le retour de l'utilisateur (démos de fin de sprint) pour ajuster le produit en continu à ses besoins réels. L'utilisateur n'écrit pas le code ; les besoins métier sont au contraire au centre de la démarche ; et la documentation n'est pas à sa charge : ces trois options décrivent une mauvaise compréhension de l'agilité." },

    { id: 110, module: "agile", question: "Quelles sont les colonnes de base que l'on retrouve dans un tableau Kanban ?", options: ["À faire (To Do), les tâches en attente de démarrage","En cours (In Progress), les tâches actuellement traitées","Terminé (Done), les tâches achevées","Sprint Backlog, la liste figée des bugs du produit"], correct: [0,1,2], explanation: "Un tableau Kanban de base comporte trois colonnes représentant le flux : 'À faire' (To Do), 'En cours' (In Progress) et 'Terminé' (Done) ; les cartes se déplacent de gauche à droite. Le Sprint Backlog est un artefact de Scrum (les tâches engagées pour un sprint), ce n'est ni une colonne standard de Kanban ni une liste de bugs." },

    { id: 111, module: "agile", question: "Quel est l'intérêt de limiter le Work In Progress (WIP) sur un tableau Kanban ?", options: ["Éviter la dispersion, réduire le multitâche et révéler les goulots d'étranglement pour finir les tâches plus vite","Permettre à chaque membre de commencer le plus de tâches possible en parallèle","Augmenter le nombre de tâches ouvertes en même temps pour produire davantage","Retirer la colonne Terminé afin d'alléger l'affichage du tableau"], correct: [0], explanation: "Limiter le Work In Progress (nombre maximal de tâches simultanées par colonne) réduit le multitâche, force à terminer avant de commencer, et fait apparaître les goulots d'étranglement, d'où un flux plus fluide. Les deux options suivantes prônent l'inverse (multiplier les tâches en cours, ce que le WIP combat) et la dernière confond la limite WIP avec la suppression d'une colonne." },

    { id: 112, module: "agile", question: "Comment sait-on si une tâche prend du retard sur un tableau Kanban ?", options: ["Elle stagne anormalement longtemps dans une colonne sans avancer","Le système l'efface automatiquement du tableau dès qu'elle traîne","Le tableau passe tout seul en rouge pour signaler le retard","Aucun retard ne peut jamais être détecté sur un tableau Kanban"], correct: [0], explanation: "Sur un Kanban, une tâche en retard se repère visuellement : elle reste bloquée trop longtemps dans une colonne (souvent 'En cours') sans progresser. Le tableau n'efface pas les cartes et ne change pas de couleur automatiquement ; et il est faux de dire qu'on ne peut rien détecter, puisque c'est justement la visualisation du flux qui rend les blocages évidents." },

    { id: 113, module: "agile", question: "À quoi sert le Planning Poker dans SCRUM ?", options: ["Estimer collectivement la complexité ou la charge des tâches par un vote, souvent en points","Tirer au sort le membre de l'équipe qui réalisera chacune des tâches","Fixer définitivement la date de livraison finale attendue par le client","Détendre simplement l'équipe par un jeu, sans objectif lié au projet"], correct: [0], explanation: "Le Planning Poker est une technique d'estimation collaborative : chacun vote simultanément (cartes en points, souvent suite de Fibonacci) pour estimer l'effort d'une tâche, et les écarts déclenchent une discussion qui affine l'estimation. Il ne sert ni à attribuer les tâches au hasard, ni à figer une date de livraison, ni à jouer sans objectif : c'est avant tout un outil d'estimation partagée." },

    { id: 114, module: "agile", question: "Quels rôles sont définis dans SCRUM pour organiser le travail d'une équipe ?", options: ["Le Product Owner, le Scrum Master et l'équipe de développement","Le chef de projet, l'analyste fonctionnel et le testeur qualité","Le directeur de service, le manager d'équipe et le stagiaire","Le client commanditaire, le fournisseur et le sous-traitant"], correct: [0], explanation: "Scrum définit trois responsabilités : le Product Owner (porte la vision produit et priorise le backlog), le Scrum Master (garant de la méthode, lève les obstacles) et les développeurs / l'équipe de développement (réalisent l'incrément). Les autres options listent des fonctions classiques d'organisation (chef de projet, manager, client/fournisseur) qui ne sont pas les rôles définis par le cadre Scrum." },

    { id: 115, module: "agile", question: "Qu'est-ce qu'un sprint dans Scrum ?", options: ["Une itération de durée fixe et courte, souvent 1 à 4 semaines, qui produit un incrément livrable","Une réunion quotidienne de quinze minutes pour synchroniser l'équipe","La phase finale de mise en production qui clôt définitivement le projet","Un document qui recense l'ensemble des bugs restants du produit"], correct: [0], explanation: "Un sprint est une itération de durée fixe (1 à 4 semaines, souvent 2) à l'issue de laquelle l'équipe produit un incrément 'terminé' et potentiellement livrable. La réunion quotidienne de quinze minutes est le Daily Scrum ; la mise en production n'est pas le sprint ; et une liste de bugs est un artefact distinct : ces options confondent le sprint avec d'autres éléments de Scrum." },

    { id: 116, module: "agile", question: "À quoi sert la cérémonie de rétrospective (Sprint Retrospective) ?", options: ["Analyser le sprint écoulé pour identifier ce qui a bien ou mal fonctionné et s'améliorer en continu","Présenter au client l'incrément terminé à la fin du sprint","Estimer et planifier les tâches retenues pour le prochain sprint","Faire le point quotidien sur l'avancement et les obstacles de l'équipe"], correct: [0], explanation: "La rétrospective clôt le sprint : l'équipe réfléchit à son fonctionnement (ce qui a marché, ce qui a coincé) et décide d'actions d'amélioration concrètes, moteur de l'amélioration continue. Présenter l'incrément au client est la Sprint Review ; planifier le sprint suivant est le Sprint Planning ; faire le point quotidien est le Daily Scrum : trois cérémonies à ne pas confondre avec la rétrospective." },

    { id: 117, module: "architecture", question: "Quelles sont les trois couches de l'architecture 3-Tiers et le rôle de chacune ?", options: ["Présentation (interface utilisateur), Métier (logique applicative) et Données (persistance)","Présentation (interface), Réseau (transport des paquets) et Stockage (fichiers)","Client (le navigateur), Serveur (le SGBD) et Hébergeur (le cloud)","Affichage (le HTML), Contrôle (les routes) et Sécurité (l'authentification)"], correct: [0], explanation: "Les trois couches de l'architecture 3-tiers sont Présentation (interface utilisateur), Métier (traitements et règles de gestion) et Données (accès et persistance en base). La 2e confond avec le modèle réseau OSI (couches transport/stockage). La 3e décrit l'infrastructure client-serveur, pas le découpage logique de l'application. La 4e cite des préoccupations transverses (routage, sécurité) qui ne sont pas les trois tiers." },

    { id: 118, module: "architecture", question: "En quoi l'architecture 3-Tiers facilite-t-elle la maintenance et l'évolution d'une application ?", options: ["La séparation des responsabilités permet de modifier une couche sans impacter les autres","Le regroupement de tout le code en un module unique simplifie chaque modification","Elle réduit le nombre de serveurs nécessaires en mutualisant les traitements","Elle impose un unique langage de programmation pour les trois couches"], correct: [0], explanation: "La force du 3-tiers est le faible couplage entre couches : on peut faire évoluer l'interface, la logique ou la base indépendamment, ce qui améliore testabilité et travail en parallèle. La 2e décrit en réalité le monolithe (tout regroupé), pas une architecture en couches. La 3e confond avec la scalabilité matérielle, qui n'est pas le but du découpage. La 4e est faux : chaque couche peut utiliser une technologie différente, c'est même un avantage." },

    { id: 119, module: "architecture", question: "Pourquoi est-il déconseillé de faire communiquer directement la couche présentation avec la base de données ?", options: ["Cela couple fortement l'interface à la structure de la base et nuit à la sécurité et à la maintenance","Cela contourne l'ORM et oblige à réécrire toutes les requêtes en langage natif","Cela sature la base car la couche présentation ouvre trop de connexions simultanées","Cela empêche l'application de fonctionner sans connexion internet permanente"], correct: [0], explanation: "Un accès direct présentation vers base crée un couplage fort : tout changement de schéma casse l'interface, la logique métier se disperse et la sécurité s'affaiblit (injections, gestion des droits). La 2e décrit une simple conséquence technique, pas le vrai problème d'architecture. La 3e invente un souci de connexions qui n'est pas le motif principal. La 4e n'a aucun lien avec la séparation des couches." },

    { id: 120, module: "architecture", question: "Quelle est la différence entre une architecture monolithique et une architecture microservices ?", options: ["Le monolithe est une seule application unifiée, les microservices découpent l'application en services indépendants déployables séparément","Le monolithe sépare l'interface et la base, les microservices fusionnent tout dans un même processus","Le monolithe communique uniquement en REST, les microservices uniquement par appels de méthodes internes","Le monolithe n'a pas de base de données, les microservices en partagent obligatoirement une seule"], correct: [0], explanation: "Un monolithe regroupe toute l'application en un seul bloc déployé d'un coup ; les microservices la découpent en petits services autonomes, déployables et scalables séparément, communiquant souvent en REST/HTTP. La 2e inverse les définitions. La 3e inverse aussi le mode de communication (c'est le monolithe qui fait des appels internes). La 4e est faux : chaque microservice possède plutôt sa propre base." },

    { id: 121, module: "architecture", question: "Pourquoi est-il recommandé qu'un microservice soit autonome et faiblement couplé ?", options: ["Pour le développer indépendamment des autres services et le faire évoluer sans coordination lourde","Pour pouvoir le déployer et le mettre à l'échelle séparément du reste de l'application","Pour limiter la propagation des pannes et améliorer la résilience globale du système","Pour qu'il partage sa base de données avec tous les services afin d'éviter les doublons"], correct: [0,1,2], explanation: "Un microservice autonome et faiblement couplé peut être développé, déployé et mis à l'échelle indépendamment, et une panne reste localisée (résilience) : les options 0, 1 et 2 sont donc toutes correctes. La 4e est fausse : partager une base unique entre tous les services recrée un couplage fort, ce qui va à l'encontre de l'autonomie recherchée (chaque service gère plutôt ses propres données)." },

    { id: 122, module: "architecture", question: "À quoi sert un ORM dans une application ?", options: ["Faire le lien entre les objets du code et les tables de la base, pour limiter l'écriture manuelle de SQL","Traduire automatiquement les requêtes SQL d'un SGBD vers un autre au moment de l'exécution","Générer le schéma relationnel à partir du diagramme UML sans intervention du développeur","Mettre en cache les résultats des requêtes pour éviter tout accès répété à la base"], correct: [0], explanation: "Un ORM (Hibernate/JPA) fait correspondre les classes objet aux tables relationnelles et permet de manipuler les données via des objets (save, find) sans écrire la plupart du SQL. La 2e confond avec un traducteur de dialectes SQL. La 3e décrit un générateur de modèle (forward engineering), pas le rôle d'un ORM. La 4e décrit un système de cache, fonctionnalité annexe parfois présente mais qui n'est pas la définition de l'ORM." },

    { id: 123, module: "architecture", question: "Quelle est la différence entre un ORM et des requêtes SQL classiques ?", options: ["L'ORM manipule des objets et génère le SQL automatiquement, le SQL classique consiste à écrire les requêtes à la main","L'ORM s'utilise uniquement en lecture, le SQL classique gère seul les écritures (INSERT, UPDATE)","L'ORM se connecte sans pilote JDBC, le SQL classique exige toujours un driver dédié","L'ORM ne fonctionne qu'avec les bases NoSQL, le SQL classique qu'avec le relationnel"], correct: [0], explanation: "Avec un ORM on manipule des objets et le framework génère le SQL (productivité, portabilité) ; en SQL classique on écrit les requêtes à la main (contrôle fin). La 2e est fausse : un ORM gère aussi parfaitement les écritures. La 3e est fausse : un ORM s'appuie justement sur un pilote JDBC sous le capot. La 4e inverse le périmètre : un ORM cible précisément le relationnel." },

    { id: 124, module: "architecture", question: "Quels sont les avantages de l'utilisation d'un ORM ?", options: ["Un gain de productivité et un code plus lisible et orienté objet, avec moins de SQL répétitif","Une meilleure portabilité entre SGBD grâce au mapping géré par le framework","Une protection contre certaines injections SQL via le requêtage paramétré","Un gain de performance garanti sur toutes les requêtes, même les plus complexes"], correct: [0,1,2], explanation: "Les vrais avantages d'un ORM sont la productivité et la lisibilité (moins de SQL), la portabilité entre SGBD, et une certaine protection contre les injections SQL : les options 0, 1 et 2 sont correctes. La 4e est fausse : sur les requêtes complexes, l'ORM est souvent moins performant qu'un SQL écrit et optimisé à la main ; le gain de performance n'est jamais garanti." },

    { id: 125, module: "architecture", question: "Comment définit-on une relation OneToMany ou ManyToOne dans une Entity ?", options: ["Avec des annotations posées sur les attributs (ex: @OneToMany, @ManyToOne) reliant les entités","En déclarant une contrainte FOREIGN KEY dans une requête SQL placée dans le constructeur","En faisant hériter l'entité enfant de l'entité parente pour matérialiser la relation","En définissant manuellement la table de liaison dans le fichier application.properties"], correct: [0], explanation: "Avec JPA/Hibernate, les relations se déclarent par des annotations sur les attributs : @OneToMany, @ManyToOne, @ManyToMany, en précisant le côté propriétaire (mappedBy, @JoinColumn). La 2e confond avec du SQL brut, que l'ORM doit justement éviter. La 3e confond une relation entre entités avec de l'héritage POO (une commande n'hérite pas d'un client). La 4e confond le mapping des relations avec la configuration de connexion." },

    { id: 126, module: "architecture", question: "À quoi sert une classe Repository ?", options: ["Gérer l'accès aux données d'une entité (CRUD) en abstrayant les détails de la base","Appliquer les règles de gestion métier avant d'enregistrer une entité en base","Recevoir les requêtes HTTP entrantes et router vers la bonne méthode","Convertir une entité en JSON pour la renvoyer au client appelant"], correct: [0], explanation: "Un Repository gère l'accès aux données d'une entité (CRUD) et masque le SQL ; Spring Data en fournit de prêts à l'emploi comme JpaRepository. La 2e décrit le rôle du Service (logique métier). La 3e décrit le rôle du Controller (point d'entrée HTTP). La 4e décrit une sérialisation, gérée par la couche présentation ou le framework, pas par le Repository." },

    { id: 127, module: "architecture", question: "Pourquoi est-il conseillé de centraliser la logique métier dans les services ?", options: ["Pour éviter de dupliquer les règles de gestion dans plusieurs controllers","Pour faciliter les tests unitaires en isolant la logique métier de l'accès aux données","Pour centraliser la maintenance des règles à un seul endroit identifiable","Pour déléguer l'application des règles de gestion directement aux triggers de la base"], correct: [0,1,2], explanation: "Centraliser la logique dans les services évite la duplication entre controllers, facilite les tests unitaires et regroupe la maintenance à un seul endroit : les options 0, 1 et 2 sont correctes. La 4e est fausse : déporter les règles métier dans des triggers SQL disperse la logique dans la base, la rend difficile à tester et à versionner, à l'opposé du but recherché." },

    { id: 128, module: "architecture", question: "Comment une classe Service interagit-elle avec un Repository et un Controller ?", options: ["Le Controller appelle le Service, qui applique la logique métier et utilise le Repository pour les données","Le Service appelle le Controller pour afficher, puis le Repository renvoie la vue finale","Le Repository appelle le Service pour valider, puis le Controller persiste les données","Le Controller appelle directement le Repository, le Service ne servant qu'à la vue"], correct: [0], explanation: "Le flux est descendant : le Controller reçoit la requête et délègue au Service, qui porte la logique métier et appelle le Repository pour lire/écrire en base. La 2e inverse le sens (un Service ne gère pas l'affichage). La 3e inverse les rôles (le Repository ne pilote pas le Service). La 4e court-circuite le Service, ce qui disperse la logique métier dans le Controller, justement ce qu'on cherche à éviter." },

    { id: 129, module: "architecture", question: "Quel est le rôle d'un Controller dans une application ?", options: ["Recevoir les requêtes HTTP, les déléguer aux services et renvoyer une réponse au client","Appliquer les règles de gestion métier puis appeler la base pour persister le résultat","Réaliser les opérations CRUD sur les entités en abstrayant l'accès à la base","Mapper les entités sur les tables et gérer les relations entre les objets"], correct: [0], explanation: "Le Controller est le point d'entrée HTTP (@RestController, @GetMapping) : il reçoit la requête, extrait les paramètres, appelle le service et renvoie la réponse, sans porter la logique métier. La 2e décrit le rôle du Service. La 3e décrit le rôle du Repository (CRUD). La 4e décrit le rôle de l'Entity et de l'ORM (mapping objet-table)." },

    { id: 130, module: "architecture", question: "Pourquoi doit-on éviter d'implémenter la logique métier directement dans le Controller ?", options: ["Pour respecter la séparation des responsabilités et garder un code réutilisable et testable","Parce qu'un Controller ne peut accéder ni au Service ni au Repository de l'application","Parce que la logique métier doit obligatoirement résider dans la couche présentation","Parce qu'un Controller est instancié à chaque requête, ce qui réinitialise les règles"], correct: [0], explanation: "Mettre la logique métier dans le Controller le rend volumineux, peu testable et non réutilisable (règle dupliquée à chaque point d'entrée) ; la déléguer au Service respecte la séparation des responsabilités. La 2e est fausse : le Controller appelle justement le Service. La 3e contredit le principe (la logique va dans la couche métier, pas présentation). La 4e invente un comportement technique sans rapport avec la raison réelle." },

    { id: 131, module: "architecture", question: "À quoi sert le pattern MVC (Modèle-Vue-Contrôleur) ?", options: ["Séparer l'application en Modèle (données), Vue (affichage) et Contrôleur (coordination)","Séparer l'application en Présentation, Métier et Données sur trois serveurs distincts","Découper l'application en services indépendants déployables et scalables séparément","Organiser le code en couches Modèle, Validation et Cache pour accélérer l'affichage"], correct: [0], explanation: "MVC sépare les responsabilités en Modèle (données et logique), Vue (affichage) et Contrôleur (reçoit les actions, coordonne modèle et vue). La 2e décrit l'architecture 3-tiers, proche mais distincte (le 3-tiers raisonne en tiers physiques, MVC en composants applicatifs). La 3e décrit les microservices. La 4e invente des couches qui ne correspondent pas aux trois rôles du pattern MVC." },

    { id: 132, module: "architecture", question: "À quoi sert une Entity (entité) dans une application Spring Boot ?", options: ["Représenter une table de la base, chaque instance correspondant à une ligne de cette table","Centraliser l'accès aux données d'un modèle via des méthodes CRUD prêtes à l'emploi","Porter la logique métier appliquée avant l'enregistrement des données en base","Recevoir les requêtes HTTP et les transmettre à la couche de service concernée"], correct: [0], explanation: "Une Entity (annotée @Entity) modélise une table : ses attributs correspondent aux colonnes et chaque instance représente une ligne (@Id pour la clé primaire). La 2e décrit le Repository (accès aux données). La 3e décrit le Service (logique métier). La 4e décrit le Controller (point d'entrée HTTP). L'Entity, elle, ne fait que représenter la donnée." },

    { id: 133, module: "architecture", question: "Qu'est-ce que l'injection de dépendances (ex: @Autowired) dans Spring ?", options: ["Laisser le framework fournir automatiquement les objets dont une classe a besoin, sans les instancier soi-même","Charger dynamiquement de nouvelles dépendances depuis un dépôt distant à l'exécution","Recharger automatiquement le code modifié sans avoir à redémarrer l'application","Imposer qu'une classe crée elle-même, avec new, chaque objet dont elle dépend"], correct: [0], explanation: "L'injection de dépendances délègue au conteneur Spring la création et la fourniture des objets (beans), via le constructeur ou @Autowired : on ne fait pas new soi-même, ce qui réduit le couplage et facilite les tests. La 2e confond avec un gestionnaire de dépendances type Maven (téléchargement de bibliothèques). La 3e décrit le hot reload. La 4e décrit exactement le contraire de l'injection (instanciation manuelle)." },

    { id: 134, module: "docker", question: "Quelle est la différence entre une machine virtuelle et un conteneur ?", options: ["Une VM virtualise un OS complet avec son noyau, un conteneur partage le noyau de l'hôte et n'embarque que l'application et ses dépendances","Un conteneur virtualise un noyau complet, une VM ne fait que partager le noyau de la machine hôte","Une VM partage le noyau de l'hôte, un conteneur embarque toujours son propre hyperviseur dédié","Une VM et un conteneur isolent tous deux l'application sans jamais virtualiser de système d'exploitation"], correct: [0], explanation: "Une machine virtuelle embarque un OS complet avec son noyau au-dessus d'un hyperviseur : lourde et lente à démarrer. Un conteneur partage le noyau de l'hôte et n'isole que l'application et ses dépendances : léger et démarrage en quelques secondes. La deuxième option inverse les rôles VM/conteneur ; la troisième attribue à tort l'hyperviseur au conteneur (c'est la VM qui en dépend) ; la quatrième est fausse car la VM virtualise bien un OS entier." },

    { id: 135, module: "docker", question: "Quels sont les avantages principaux de la conteneurisation pour le développement et le déploiement ?", options: ["La portabilité : une application s'exécute de façon identique sur n'importe quel hôte, fini le 'ça marche sur ma machine'","La légèreté et un déploiement rapide et reproductible, plus économes en ressources qu'une machine virtuelle","Le conteneur recompile et optimise automatiquement le code source de l'application au démarrage","Le conteneur ajoute de la mémoire RAM à l'hôte et chiffre tout le trafic réseau par défaut"], correct: [0,1], explanation: "La conteneurisation apporte la portabilité (exécution identique partout), l'isolation, la légèreté face aux VM et un déploiement rapide et reproductible : les deux premières options sont donc correctes. La troisième est fausse car un conteneur exécute le code tel quel sans le recompiler ni l'optimiser ; la quatrième invente des effets magiques (ni ajout de RAM, ni chiffrement réseau automatique)." },

    { id: 136, module: "docker", question: "Quelle est la différence entre une image Docker et un conteneur Docker ?", options: ["L'image est un modèle figé en lecture seule, le conteneur est une instance en cours d'exécution créée à partir de l'image","Le conteneur est un modèle figé en lecture seule, l'image est l'instance que l'on exécute à partir de lui","L'image et le conteneur sont tous deux modifiables à chaud et partagent le même cycle de vie","Une image est forcément liée à un unique conteneur qu'elle ne peut jamais relancer deux fois"], correct: [0], explanation: "Une image Docker est un modèle figé en lecture seule (application, dépendances, config) construit en couches ; un conteneur est une instance vivante et isolée créée à partir de l'image, comme un objet par rapport à une classe. La deuxième option inverse image et conteneur ; la troisième est fausse car l'image reste en lecture seule ; la quatrième aussi car une même image peut lancer plusieurs conteneurs." },

    { id: 137, module: "docker", question: "Que permet de faire un fichier Dockerfile ? Donne un exemple d'instruction souvent utilisée.", options: ["Décrire étape par étape la construction d'une image, avec des instructions comme FROM, RUN, COPY et CMD","Lister les conteneurs en cours d'exécution et afficher leur statut, leurs ports et leur identifiant","Orchestrer plusieurs services d'une application en décrivant leurs réseaux et volumes en YAML","Stocker en dehors du conteneur les données persistantes pour les conserver après sa suppression"], correct: [0], explanation: "Un Dockerfile est un fichier texte décrivant étape par étape la construction d'une image ; ses instructions courantes sont FROM (image de base), RUN (exécuter une commande), COPY (copier des fichiers), WORKDIR, EXPOSE et CMD/ENTRYPOINT. Lister les conteneurs est le rôle de docker ps ; orchestrer plusieurs services décrit le docker-compose.yml ; stocker des données persistantes est le rôle d'un volume." },

    { id: 138, module: "docker", question: "Quelle commande permet de lancer un conteneur à partir d'une image Docker ?", options: ["docker run &lt;image&gt;","docker build &lt;image&gt;","docker exec &lt;image&gt;","docker pull &lt;image&gt;"], correct: [0], explanation: "docker run &lt;image&gt; crée un conteneur à partir d'une image et le démarre, en téléchargeant l'image au besoin. docker build construit une image depuis un Dockerfile ; docker exec lance une commande dans un conteneur déjà en cours d'exécution ; docker pull se contente de télécharger une image sans créer de conteneur." },

    { id: 139, module: "docker", question: "Quelle option de docker run permet de lancer un conteneur en arrière-plan (mode détaché) ?", options: ["L'option -d (--detach)","L'option -it (--interactive --tty)","L'option -p (--publish)","L'option --rm (suppression auto)"], correct: [0], explanation: "L'option -d (ou --detach) lance le conteneur en arrière-plan et rend la main au terminal. À l'inverse, -it attache un terminal interactif au conteneur ; -p publie un port du conteneur vers l'hôte ; --rm supprime automatiquement le conteneur dès qu'il s'arrête." },

    { id: 140, module: "docker", question: "Quelle est la commande pour lister tous les conteneurs en cours d'exécution ?", options: ["docker ps","docker images","docker ps -a","docker container build"], correct: [0], explanation: "docker ps liste les conteneurs en cours d'exécution. docker images liste les images téléchargées, pas les conteneurs ; docker ps -a ajoute aussi les conteneurs arrêtés (donc pas uniquement ceux en cours) ; docker container build n'existe pas, la construction d'image se fait avec docker build." },

    { id: 141, module: "docker", question: "Pourquoi est-il important d'utiliser des volumes avec Docker ?", options: ["Pour persister les données au-delà de la vie du conteneur, sinon elles sont perdues à sa suppression","Pour réduire la taille de l'image en déplaçant ses couches vers un dossier de l'hôte","Pour accélérer le démarrage du conteneur en mettant son noyau en cache sur le disque","Pour isoler complètement le conteneur du réseau et bloquer ses connexions sortantes"], correct: [0], explanation: "Par défaut les données écrites dans un conteneur disparaissent à sa suppression (système de fichiers éphémère) ; un volume stocke les données en dehors du conteneur pour les conserver et les partager (ex : une base de données). Un volume n'allège pas l'image (il gère des données, pas des couches d'image), n'accélère pas le démarrage et ne touche pas au réseau (rôle des réseaux Docker)." },

    { id: 142, module: "docker", question: "Donne un exemple de commande docker run qui utilise un volume pour persister des données.", options: ["docker run -v mon_volume:/var/lib/mysql mysql","docker run -p mon_volume:/var/lib/mysql mysql","docker run --network mon_volume:/var/lib/mysql mysql","docker run -e mon_volume:/var/lib/mysql mysql"], correct: [0], explanation: "L'option -v monte un volume : docker run -v mon_volume:/var/lib/mysql mysql lie le volume 'mon_volume' au dossier des données MySQL du conteneur, ce qui persiste la base. -p publie un port (format hôte:conteneur), pas un volume ; --network attache le conteneur à un réseau ; -e définit une variable d'environnement, pas un point de montage." },

    { id: 143, module: "docker", question: "À quoi sert un fichier docker-compose.yml ?", options: ["Définir et orchestrer plusieurs conteneurs (services) d'une application dans un seul fichier YAML","Décrire les étapes de construction d'une unique image à partir du code source de l'application","Lister tous les conteneurs présents sur la machine, qu'ils soient en cours d'exécution ou arrêtés","Déclarer le port d'écoute interne d'un conteneur sans publier ce port vers la machine hôte"], correct: [0], explanation: "Un fichier docker-compose.yml décrit en YAML une application multi-conteneurs : ses services (ex : web + base de données), leurs images, ports, volumes, réseaux et variables d'environnement, et docker compose up démarre l'ensemble. Décrire la construction d'une image est le rôle du Dockerfile ; lister les conteneurs est celui de docker ps -a ; déclarer un port d'écoute interne est le rôle de l'instruction EXPOSE." },

    { id: 144, module: "docker", question: "Comment Docker permet-il à plusieurs conteneurs de communiquer entre eux ?", options: ["Via des réseaux Docker : les conteneurs d'un même réseau se joignent par leur nom de service grâce au DNS interne","Via un volume partagé qui relie automatiquement les ports des conteneurs entre eux","Via l'option -p de docker run, qui ouvre un canal direct entre deux conteneurs","Via le Dockerfile, où l'instruction EXPOSE connecte les conteneurs deux à deux"], correct: [0], explanation: "Docker crée des réseaux virtuels : les conteneurs attachés au même réseau communiquent, et la résolution DNS interne permet de joindre un conteneur par son nom de service (ex : l'app contacte 'db'). Un volume partage des données mais ne relie pas les ports ; -p publie un port vers l'hôte, il ne connecte pas deux conteneurs ; EXPOSE ne fait que documenter un port, il n'établit aucune liaison." },

    { id: 145, module: "docker", question: "Que fait la commande docker ps -a ?", options: ["Lister tous les conteneurs, y compris ceux qui sont arrêtés","Lister uniquement les conteneurs actuellement en cours d'exécution","Supprimer en une fois tous les conteneurs arrêtés de la machine","Lister toutes les images téléchargées présentes sur la machine"], correct: [0], explanation: "docker ps ne montre que les conteneurs en cours d'exécution ; l'option -a (--all) ajoute aussi les conteneurs arrêtés. Lister seulement les conteneurs actifs correspond à docker ps sans option ; supprimer les conteneurs arrêtés se fait avec docker container prune ; lister les images se fait avec docker images." },

    { id: 146, module: "docker", question: "À quoi sert l'instruction EXPOSE dans un Dockerfile ?", options: ["Documenter le port sur lequel le conteneur écoute, sans le publier vers la machine hôte","Publier automatiquement ce port vers l'hôte pour le rendre accessible de l'extérieur","Monter un volume sur ce port afin d'y persister les données échangées par le conteneur","Attacher le conteneur à un réseau Docker créé spécialement pour ce numéro de port"], correct: [0], explanation: "L'instruction EXPOSE documente, de façon informative, le port sur lequel l'application écoute à l'intérieur du conteneur ; elle ne publie pas ce port vers l'hôte. Pour le rendre accessible, il faut l'option -p au docker run (ex : -p 8080:80). EXPOSE ne monte aucun volume et n'attache le conteneur à aucun réseau." },

    { id: 147, module: "docker", question: "Quelle est la différence entre docker stop et docker rm ?", options: ["stop arrête un conteneur en cours d'exécution, rm supprime de la machine un conteneur arrêté","stop supprime définitivement le conteneur, rm se contente de le mettre en pause","stop met le conteneur en pause sans l'arrêter, rm redémarre un conteneur stoppé","stop agit sur les images et rm sur les conteneurs : ils ne portent pas sur le même objet"], correct: [0], explanation: "docker stop arrête proprement un conteneur en cours (il existe toujours, à l'état 'exited') tandis que docker rm supprime définitivement un conteneur, qui doit d'abord être arrêté. La mise en pause se fait avec docker pause (pas stop) ; le redémarrage avec docker start (pas rm) ; et tous deux agissent sur des conteneurs, la suppression d'une image étant assurée par docker rmi." },

    { id: 148, module: "poo", question: "Explique le principe d'Héritage en POO.", options: ["Permettre à une classe enfant de réutiliser et spécialiser les membres d'une classe parente","Masquer les données internes d'un objet et contrôler leur accès via des méthodes","Permettre à une même méthode de se comporter différemment selon le type de l'objet","Assembler un objet à partir d'autres objets dont il contrôle le cycle de vie"], correct: [0], explanation: "L'héritage permet à une classe enfant de réutiliser les attributs et méthodes d'une classe parente, tout en les spécialisant ; il modélise une relation 'est un' (un Chien EST UN Animal). Masquer les données via des méthodes est l'encapsulation. Adapter le comportement d'une méthode au type réel de l'objet est le polymorphisme, et assembler un objet à partir d'autres (cycle de vie contrôlé) est la composition." },

    { id: 149, module: "poo", question: "Explique le principe de Polymorphisme en POO.", options: ["Permettre à une même méthode de se comporter différemment selon le type de l'objet qui l'exécute","Permettre à une classe enfant de réutiliser les attributs et méthodes d'une classe parente","Masquer les données internes d'un objet et contrôler leur accès via des méthodes dédiées","Garantir qu'une classe ne possède qu'une seule instance partagée dans tout le programme"], correct: [0], explanation: "Le polymorphisme ('plusieurs formes') permet à une même méthode de se comporter différemment selon le type réel de l'objet (la méthode redéfinie par override est choisie à l'exécution), par exemple crierSon() qui donne 'Ouaf' pour un Chien et 'Miaou' pour un Chat. Réutiliser les membres d'une classe parente est l'héritage. Masquer les données via des méthodes est l'encapsulation, et garantir une instance unique est le design pattern Singleton." }
];

let currentMode = 'normal';
let selectedModule = null;
let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let moduleScores = {};
let quizStartTime = 0;
let lastElapsedSec = 0;
let wrongIds = [];
let currentSetIds = [];
const LEADERBOARD_KEY = 'cdaquiz_leaderboard';
const PROGRESS_KEY = 'cdaquiz_progress';

function initApp() {
    renderModuleGrid();
}

function renderModuleGrid() {
    const grid = document.getElementById('moduleGrid');
    grid.innerHTML = '';
    const progress = loadProgress();

    // Option "Tous les modules"
    const allCard = document.createElement('div');
    allCard.className = 'module-card all';
    allCard.onclick = () => startQuiz('all');
    allCard.innerHTML = `
        <h3>Tous les modules</h3>
        <p>Protocole d'évaluation complet</p>
        <p class="question-count">${quizData.length} questions</p>
        ${progressLine(progress['all'])}
    `;
    grid.appendChild(allCard);

    // Cartes pour chaque module
    for (const [key, module] of Object.entries(modules)) {
        const card = document.createElement('div');
        card.className = `module-card ${key}`;
        card.onclick = () => startQuiz(key);
        card.innerHTML = `
            <h3>${module.name}</h3>
            <p>${module.description}</p>
            <p class="question-count">${module.questions.length} questions</p>
            ${progressLine(progress[key])}
        `;
        grid.appendChild(card);
    }
}

function progressLine(p) {
    if (!p) return '';
    const cls = p.bestPct >= 75 ? 'good' : (p.bestPct >= 50 ? 'medium' : 'bad');
    return `<p class="module-progress ${cls}">Calibration max : ${p.bestPct}%</p>`;
}

function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
}

function recordProgress(moduleKey, sc, total) {
    if (moduleKey === 'retry' || !total) return;
    const p = loadProgress();
    const pct = Math.round((sc / total) * 100);
    const cur = p[moduleKey] || { bestPct: 0 };
    p[moduleKey] = { bestPct: Math.max(cur.bestPct || 0, pct), lastPct: pct };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function startQuiz(moduleKey) {
    let qs;
    if (moduleKey === 'all') {
        qs = [...quizData];
    } else {
        const questionIds = modules[moduleKey].questions;
        qs = quizData.filter(q => questionIds.includes(q.id));
    }
    beginQuiz(qs, moduleKey);
}

function startRetry() {
    const ids = wrongIds.slice();
    beginQuiz(quizData.filter(q => ids.includes(q.id)), 'retry');
}

function beginQuiz(questions, moduleKey) {
    selectedModule = moduleKey;
    quizStartTime = Date.now();
    currentSetIds = questions.map(q => q.id);

    // Mélanger les questions
    currentQuestions = shuffleArray(questions);

    // Mélanger les réponses pour chaque question
    currentQuestions.forEach(q => {
        const shuffled = shuffleOptions(q.options, q.correct);
        q.shuffledOptions = shuffled.options;
        q.shuffledCorrect = shuffled.correct;
    });

    // Reset
    currentQuestion = 0;
    score = 0;
    moduleScores = {};
    wrongIds = [];

    // Afficher le quiz
    document.getElementById('results').classList.remove('show');
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('menu').classList.remove('active');
    renderQuestion();
    updateProgress();
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function shuffleOptions(options, correctIndices) {
    const combined = options.map((opt, idx) => ({
        text: opt,
        wasCorrect: correctIndices.includes(idx)
    }));

    // Mélanger
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    // Reconstruire
    const newOptions = combined.map(c => c.text);
    const newCorrect = combined.map((c, idx) => c.wasCorrect ? idx : -1).filter(i => i >= 0);

    return { options: newOptions, correct: newCorrect };
}

function renderQuestion() {
    const container = document.getElementById('quizContent');
    const question = currentQuestions[currentQuestion];
    
    container.innerHTML = `
        <div class="question-container active">
            <div class="question-header">
                <span class="question-number">Question ${currentQuestion + 1}/${currentQuestions.length}</span>
                <span class="module-tag">${modules[question.module]?.name || question.module}</span>
            </div>
            
            <div class="question-text">${question.question}</div>

            <div class="answer-hint">Sélectionnez la ou les bonne(s) réponse(s)</div>

            <div class="options" id="options">
                ${question.shuffledOptions.map((option, index) => `
                    <label class="option" data-index="${index}">
                        <input type="checkbox" name="answer" value="${index}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            
            <div class="explanation" id="explanation">
                <h4>Explication</h4>
                <p>${question.explanation}</p>
            </div>
            
            <div class="buttons">
                <div style="display: flex; gap: 12px;">
                    <button onclick="backToMenu()">Menu</button>
                    <button onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>
                        Précédent
                    </button>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-primary" id="validateBtn" onclick="validateAnswer()">
                        Valider
                    </button>
                    <button class="btn-primary" id="nextBtn" onclick="nextQuestion()" style="display: none;">
                        ${currentQuestion === currentQuestions.length - 1 ? 'Voir les résultats' : 'Suivant'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function validateAnswer() {
    const question = currentQuestions[currentQuestion];
    const checkboxes = document.querySelectorAll('input[name="answer"]');
    const selectedAnswers = [];
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedAnswers.push(index);
        }
    });

    if (selectedAnswers.length === 0) {
        // Message style Aperture Science
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border: 1px solid #d1d5da;
            padding: 30px 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <div style="font-size: 1.2em; font-weight: 600; color: #24292e; margin-bottom: 15px;">
                Erreur de protocole
            </div>
            <div style="color: #586069; margin-bottom: 20px;">
                Le Centre d'Enrichissement vous rappelle de sélectionner au moins une réponse avant de continuer.
            </div>
            <button onclick="this.parentElement.remove()" class="btn-primary" style="width: 100%;">
                Compris
            </button>
        `;
        document.body.appendChild(errorDiv);
        return;
    }
    
    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('disabled');
    });

    // Check answers
    let isCorrect = true;
    checkboxes.forEach((checkbox, index) => {
        const option = checkbox.closest('.option');
        if (question.shuffledCorrect.includes(index)) {
            option.classList.add('correct');
            if (!checkbox.checked) {
                isCorrect = false;
            }
        } else if (checkbox.checked) {
            option.classList.add('incorrect');
            isCorrect = false;
        }
    });

    if (!isCorrect && !wrongIds.includes(question.id)) {
        wrongIds.push(question.id);
    }

    if (isCorrect) {
        score++;
        if (!moduleScores[question.module]) {
            moduleScores[question.module] = { correct: 0, total: 0 };
        }
        moduleScores[question.module].correct++;
    }

    if (!moduleScores[question.module]) {
        moduleScores[question.module] = { correct: 0, total: 0 };
    }
    moduleScores[question.module].total++;

    // Show explanation and next button
    document.getElementById('explanation').classList.add('show');
    document.getElementById('validateBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
    if (currentQuestion < currentQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.add('show');
    
    // Message GLaDOS en français selon le score
    const percentage = (score / currentQuestions.length) * 100;
    let glaDOSMessage = '';
    
    if (score === 0) {
        glaDOSMessage = "Nous avons dû modifier vos résultats. Vous êtes un cas particulier.";
    } else if (percentage === 100) {
        glaDOSMessage = "Excellent. Vous êtes un triomphe.";
    } else if (percentage >= 75) {
        glaDOSMessage = "Performance acceptable. Le gâteau et les conseils en cas de chagrin seront disponibles à la fin du test.";
    } else if (percentage >= 50) {
        glaDOSMessage = "Le Centre d'Enrichissement vous rappelle que l'échec n'est que le succès arrondi à l'inférieur.";
    } else {
        glaDOSMessage = "Le test est maintenant terminé. Toutes les technologies Aperture restent opérationnelles.";
    }

    const scoreDisplay = document.querySelector('.score-display');
    scoreDisplay.innerHTML = `
        <div class="score">${score}</div>
        <div class="total">${currentQuestions.length} questions</div>
        <div style="text-align: center; font-style: italic; color: #586069; margin-top: 20px; font-size: 0.9em; padding: 0 20px;">
            "${glaDOSMessage}"
        </div>
    `;

    // Stats par module
    const statsDiv = document.getElementById('moduleStats');
    statsDiv.innerHTML = '<h3>Détails par module</h3>';
    
    for (const [moduleKey, stats] of Object.entries(moduleScores)) {
        const percentage = (stats.correct / stats.total) * 100;
        let scoreClass = 'bad';
        if (percentage >= 75) scoreClass = 'good';
        else if (percentage >= 50) scoreClass = 'medium';

        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <span class="module-name">${modules[moduleKey]?.name || moduleKey}</span>
            <span class="module-score ${scoreClass}">${stats.correct}/${stats.total} (${percentage.toFixed(0)}%)</span>
        `;
        statsDiv.appendChild(item);
    }

    // Temps de réalisation
    lastElapsedSec = Math.round((Date.now() - quizStartTime) / 1000);
    document.getElementById('scoreTime').textContent = 'Temps : ' + formatTime(lastElapsedSec);

    // Saisie du pseudo + classement
    const nameSection = document.getElementById('nameInputSection');
    nameSection.style.display = 'block';
    const nameInput = document.getElementById('playerName');
    nameInput.value = '';
    nameInput.style.borderColor = '';
    renderLeaderboard();
    document.getElementById('leaderboard').style.display = 'block';

    // Enregistrer la progression du sujet de test
    recordProgress(selectedModule, score, currentQuestions.length);

    // Re-tester les anomalies (questions ratées)
    const retrySection = document.getElementById('retrySection');
    if (wrongIds.length > 0) {
        retrySection.innerHTML = '<button class="btn-retry" onclick="startRetry()">'
            + '⟲ Re-tester les anomalies (' + wrongIds.length + ')</button>';
    } else {
        retrySection.innerHTML = '';
    }
}


function restartQuiz() {
    const ids = currentSetIds.slice();
    beginQuiz(quizData.filter(q => ids.includes(q.id)), selectedModule);
}

function backToMenu() {
    document.getElementById('results').classList.remove('show');
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizContent').innerHTML = '';
    document.getElementById('menu').classList.add('active');
    document.getElementById('progressBar').style.width = '0%';
}

function formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return m + ' min ' + (s < 10 ? '0' : '') + s + ' s';
}

function loadLeaderboard() {
    try {
        return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveScore() {
    const input = document.getElementById('playerName');
    const name = input.value.trim();
    if (!name) {
        input.focus();
        input.style.borderColor = '#d73a49';
        return;
    }

    const total = currentQuestions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const entry = {
        name: name,
        score: score,
        total: total,
        pct: pct,
        timeSec: lastElapsedSec,
        module: selectedModule,
        date: new Date().toISOString()
    };

    const board = loadLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.pct - a.pct || a.timeSec - b.timeSec);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 50)));

    document.getElementById('nameInputSection').style.display = 'none';
    renderLeaderboard();
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboardContent');
    const moduleName = selectedModule === 'all'
        ? 'Tous les modules'
        : (modules[selectedModule] ? modules[selectedModule].name : selectedModule);
    const entries = loadLeaderboard()
        .filter(e => e.module === selectedModule)
        .sort((a, b) => b.pct - a.pct || a.timeSec - b.timeSec)
        .slice(0, 10);

    let html = '<div style="color:#586069; font-size:0.85em; margin-bottom:12px;">Module : ' + escapeHtml(moduleName) + '</div>';

    if (entries.length === 0) {
        html += '<div class="leaderboard-empty">Aucun score enregistré pour ce module. Soyez le premier !</div>';
    } else {
        entries.forEach((e, i) => {
            const topClass = i < 3 ? ' top' + (i + 1) : '';
            html += '<div class="leaderboard-item' + topClass + '">'
                + '<span class="rank">#' + (i + 1) + '</span>'
                + '<span class="player">' + escapeHtml(e.name) + '</span>'
                + '<span class="lb-score">' + e.score + '/' + e.total + ' (' + e.pct + '%)</span>'
                + '<span class="lb-time">' + formatTime(e.timeSec) + '</span>'
                + '</div>';
        });
    }
    container.innerHTML = html;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

window.onload = initApp;
