export default {
  "domain": "javascript",
  "title": "JavaScript",
  "exercises": [
    {
      "id": "js-01",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "var vs let vs const"
      ],
      "code": "let x = 10;\nconst y = 20;\nx = 15;\nconsole.log(x + y);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "35",
        "30",
        "25",
        "TypeError : Assignment to constant variable"
      ],
      "answer": 0,
      "explanation": "let permet la réassignation (x passe de 10 à 15). const ne le permet pas, mais ici c'est x qu'on modifie, pas y. 15 + 20 = 35. Répondre 30 revient à ignorer la ligne x = 15 et à additionner les valeurs initiales. 25 additionne l'ancienne et la nouvelle valeur de x (10 + 15) au lieu de x + y. Le TypeError ne se produirait que si on réassignait y, la seule constante du code.",
      "hint": "let = réassignable. const = non réassignable. Ici seul x est modifié."
    },
    {
      "id": "js-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "types",
        "concaténation"
      ],
      "code": "let a = \"5\";\nlet b = 3;\nconsole.log(a + b);\nconsole.log(a - b);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "53 puis 2",
        "8 puis 2",
        "53 puis NaN",
        "NaN puis NaN"
      ],
      "answer": 0,
      "explanation": "L'opérateur + avec une string fait de la concaténation : \"5\" + 3 = \"53\". L'opérateur - force la conversion en nombre : \"5\" - 3 = 2. C'est un piège classique de JavaScript. 8 puis 2 supposerait que + convertit aussi \"5\" en nombre, or + privilégie la concaténation dès qu'un opérande est une string. 53 puis NaN supposerait que - échoue sur une string, or \"5\" est convertible en 5. NaN n'apparaîtrait que si la string n'était pas numérique, comme \"abc\" - 3.",
      "hint": "+ concatène quand un opérande est une string. - convertit toujours en nombre."
    },
    {
      "id": "js-03",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "== vs ==="
      ],
      "code": "console.log(5 == \"5\");\nconsole.log(5 === \"5\");",
      "question": "Qu'affiche ce code ?",
      "options": [
        "true puis false",
        "true puis true",
        "false puis false",
        "false puis true"
      ],
      "answer": 0,
      "explanation": "== (égalité faible) convertit les types avant de comparer : 5 == \"5\" → true. === (égalité stricte) compare valeur ET type : number !== string → false. true puis true supposerait que === convertit aussi les types, ce qui est précisément ce qu'il ne fait pas. false puis false supposerait que == exige les mêmes types, or il les convertit. false puis true inverse purement le rôle des deux opérateurs. En pratique, toujours utiliser ===.",
      "hint": "== convertit les types. === ne convertit pas."
    },
    {
      "id": "js-04",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "tableau",
        "méthodes"
      ],
      "code": "const fruits = [\"pomme\", \"poire\", \"banane\"];\nfruits.push(\"kiwi\");\nconsole.log(fruits.length);\nconsole.log(fruits[3]);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "4 puis kiwi",
        "3 puis undefined",
        "TypeError : Assignment to constant variable",
        "4 puis banane"
      ],
      "answer": 0,
      "explanation": "const empêche la réassignation de la variable (fruits = ...) mais PAS la modification du contenu (push, pop, splice...). push ajoute \"kiwi\" en fin de tableau. length = 4, index 3 = \"kiwi\". 3 puis undefined supposerait que push a échoué sans rien ajouter. Le TypeError ne survient que si on réassigne la variable elle-même, pas quand on mute le tableau. 4 puis banane correspond à une numérotation des index à partir de 1, or fruits[3] désigne le quatrième élément.",
      "hint": "const protège la référence, pas le contenu. On peut modifier un tableau const."
    },
    {
      "id": "js-05",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "objet",
        "propriétés"
      ],
      "code": "const personne = {\n    nom: \"Dupont\",\n    age: 30,\n    saluer: function() {\n        return \"Bonjour, je suis \" + this.nom;\n    }\n};\n\nconsole.log(personne.saluer());\npersonne.age = 31;\nconsole.log(personne.age);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Bonjour, je suis Dupont puis 31",
        "Bonjour, je suis Dupont puis 30",
        "TypeError : Assignment to constant variable",
        "Bonjour, je suis undefined puis 31"
      ],
      "answer": 0,
      "explanation": "this.nom dans la méthode fait référence à l'objet personne. Le const n'empêche pas de modifier les propriétés de l'objet, seulement de réassigner la variable personne elle-même. Afficher 30 supposerait que const fige aussi les propriétés, ce qui est faux. Le TypeError n'apparaîtrait qu'en écrivant personne = ..., pas personne.age = 31. Et this.nom ne vaudrait undefined que si saluer était une arrow function (qui ne reçoit pas son propre this), or c'est une fonction classique.",
      "hint": "this dans une méthode d'objet fait référence à l'objet lui-même."
    },
    {
      "id": "js-06",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "arrow function",
        "callback"
      ],
      "code": "const nombres = [1, 2, 3, 4, 5];\nconst doubles = nombres.map(n => n * 2);\nconsole.log(doubles);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "[2, 4, 6, 8, 10]",
        "[1, 2, 3, 4, 5]",
        "undefined",
        "[3, 4, 5, 6, 7]"
      ],
      "answer": 0,
      "explanation": "map() crée un nouveau tableau en appliquant la fonction à chaque élément. n => n * 2 est une arrow function qui double chaque valeur. Le tableau d'origine n'est pas modifié. [1, 2, 3, 4, 5] serait le contenu de nombres, pas celui de doubles : map retourne bien un tableau transformé. undefined confond map avec forEach, qui exécute le callback mais ne retourne rien. [3, 4, 5, 6, 7] correspondrait à n + 2, une mauvaise lecture de l'opérateur.",
      "hint": "map() transforme chaque élément et retourne un NOUVEAU tableau."
    },
    {
      "id": "js-07",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "filter",
        "arrow function"
      ],
      "code": "const ages = [12, 25, 8, 34, 17, 42];\nconst majeurs = ages.filter(a => a >= 18);\nconsole.log(majeurs);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "[25, 34, 42]",
        "[12, 8, 17]",
        "[false, true, false, true, false, true]",
        "[12, 25, 8, 34, 17, 42]"
      ],
      "answer": 0,
      "explanation": "filter() crée un nouveau tableau avec les éléments qui passent le test. a >= 18 garde uniquement 25, 34 et 42. [12, 8, 17] inverse le test : ce serait le résultat de a < 18. Le tableau de booléens confond filter avec map(a => a >= 18), qui retournerait le résultat du test pour chaque élément au lieu de filtrer. Le tableau complet supposerait que filter ne retire rien, ou qu'on affiche ages au lieu de majeurs.",
      "hint": "filter() garde les éléments pour lesquels la fonction retourne true."
    },
    {
      "id": "js-08",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "DOM",
        "querySelector"
      ],
      "code": "// HTML : <p id=\"message\">Ancien texte</p>\n\nconst para = document._______(\"#message\");\npara.textContent = \"Nouveau texte\";",
      "question": "Quelle méthode sélectionne l'élément par son sélecteur CSS ?",
      "options": [
        "getElementById",
        "querySelector",
        "getElementsByClassName",
        "querySelectorAll"
      ],
      "answer": 1,
      "explanation": "querySelector() accepte n'importe quel sélecteur CSS (#id, .class, tag, etc.) et retourne le premier élément trouvé. getElementById fonctionnerait, mais avec \"message\" sans le # : il attend un id brut, pas un sélecteur CSS. getElementsByClassName cible une classe (sans point) et retourne une collection, pas un élément unique. querySelectorAll accepte bien un sélecteur CSS mais retourne une NodeList : para.textContent ne modifierait alors pas le paragraphe.",
      "hint": "Cette méthode utilise la même syntaxe que les sélecteurs CSS : # pour id, . pour class."
    },
    {
      "id": "js-09",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "événement",
        "addEventListener"
      ],
      "code": "const bouton = document.querySelector(\"#monBouton\");\n\nbouton.______(\"click\", function() {\n    alert(\"Bouton cliqué !\");\n});",
      "question": "Quelle méthode attache un écouteur d'événement ?",
      "options": [
        "dispatchEvent",
        "addEventListener",
        "attachEvent",
        "on"
      ],
      "answer": 1,
      "explanation": "addEventListener(type, callback) est la méthode standard pour écouter des événements DOM. Le premier argument est le type d'événement (\"click\", \"submit\", \"keydown\"...), le second est la fonction à exécuter. dispatchEvent fait l'inverse : il déclenche un événement au lieu de l'écouter. attachEvent est l'ancienne méthode propriétaire d'Internet Explorer, absente du standard actuel. on(\"click\", ...) est une méthode jQuery, pas une méthode du DOM natif.",
      "hint": "C'est la méthode moderne qui remplace les attributs onclick=\"...\" dans le HTML."
    },
    {
      "id": "js-10",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "DOM",
        "createElement"
      ],
      "code": "const liste = document.querySelector(\"#maListe\");\nconst li = document.createElement(\"li\");\nli.textContent = \"Nouvel élément\";\nliste.appendChild(li);\nconsole.log(liste.children.length);",
      "question": "Si #maListe contenait déjà 3 <li>, combien en contient-elle après ?",
      "options": [
        "4",
        "3",
        "1",
        "8"
      ],
      "answer": 0,
      "explanation": "createElement() crée un élément en mémoire. appendChild() l'ajoute comme dernier enfant de la liste. 3 existants + 1 ajouté = 4 enfants. Répondre 3 supposerait que l'élément créé reste en mémoire sans être inséré, or appendChild l'attache bien au DOM. 1 confond appendChild avec un remplacement du contenu (comme innerHTML = ou replaceChildren). 8 correspondrait à childNodes.length : avec un HTML indenté, les 3 <li> sont entourés de 4 nœuds texte (les retours à la ligne), plus le nouveau <li>. children, lui, ne compte que les éléments.",
      "hint": "createElement crée, appendChild insère. L'élément s'ajoute AUX existants, il ne les remplace pas."
    },
    {
      "id": "js-11",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "fetch",
        "async/await"
      ],
      "code": "async function chargerDonnees() {\n    const response = await fetch(\"https://api.exemple.com/data\");\n    const data = await response.json();\n    return data;\n}\n\nconst resultat = chargerDonnees();\nconsole.log(typeof resultat);",
      "question": "Quel type est affiché ?",
      "options": [
        "object (une Promise)",
        "object (les données)",
        "undefined",
        "function"
      ],
      "answer": 0,
      "explanation": "Une fonction async retourne TOUJOURS une Promise, même si elle utilise await à l'intérieur. Sans await devant chargerDonnees(), resultat est une Promise non résolue, pas les données. Il faudrait : const resultat = await chargerDonnees() (dans un contexte async). Les données ne seraient dans resultat qu'avec cet await à l'appel. undefined supposerait que l'appel ne retourne rien tant que le fetch n'est pas terminé, or la Promise existe immédiatement. function serait le résultat de typeof chargerDonnees sans parenthèses, mais ici la fonction est bien appelée.",
      "hint": "Une fonction async retourne toujours une Promise. Sans await à l'appel, on récupère la Promise elle-même."
    },
    {
      "id": "js-12",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "scope",
        "closure"
      ],
      "code": "function creerCompteur() {\n    let count = 0;\n    return function() {\n        count++;\n        return count;\n    };\n}\n\nconst compteur = creerCompteur();\nconsole.log(compteur()); // 1\nconsole.log(compteur()); // 2\nconsole.log(compteur()); // 3",
      "question": "Pourquoi count s'incrémente-t-il à chaque appel alors qu'il est déclaré dans creerCompteur() ?",
      "options": [
        "La fonction retournée garde une référence à la variable count de son scope parent (closure)",
        "count est hissé (hoisting) dans le scope global, ce qui le rend accessible partout",
        "count est stocké dans this, que les trois appels de compteur() se partagent",
        "creerCompteur() est ré-exécutée à chaque appel de compteur(), ce qui recrée count"
      ],
      "answer": 0,
      "explanation": "C'est une closure. La fonction anonyme retournée \"capture\" la variable count de son scope englobant. Même après la fin de creerCompteur(), count reste en vie tant que la fonction retournée existe. Le hoisting n'a rien à voir : une variable let reste confinée à son bloc et count demeure local à creerCompteur. this n'intervient pas non plus : la capture se fait par le scope lexical, pas via un objet. Enfin creerCompteur n'est appelée qu'une seule fois : si elle était ré-exécutée, count repartirait à 0 et on lirait 1, 1, 1.",
      "hint": "Une fonction en JS a accès aux variables de la fonction qui l'a créée, même après la fin de celle-ci."
    },
    {
      "id": "js-13",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "template literal"
      ],
      "code": "const nom = \"Kéwin\";\nconst age = 34;\nconst message = ______Bonjour ${nom}, tu as ${age} ans______;\nconsole.log(message);",
      "question": "Quels caractères entourent un template literal en JavaScript ?",
      "options": [
        "Des guillemets doubles \"...\"",
        "Des backticks `...`",
        "Des guillemets simples '...'",
        "Des accolades {...}"
      ],
      "answer": 1,
      "explanation": "Les template literals utilisent les backticks ` (accent grave). Ils permettent l'interpolation avec ${expression} et les sauts de ligne sans \\n. C'est l'équivalent des f-strings en Python. Avec des guillemets doubles ou simples, on obtient une chaîne ordinaire : ${nom} s'afficherait tel quel, sans être interprété. Les accolades servent à l'interpolation ${...} À L'INTÉRIEUR du template, elles ne délimitent pas la chaîne elle-même.",
      "hint": "Ce caractère se tape avec AltGr + 7 sur un clavier AZERTY (c'est une touche morte : appuyez ensuite sur Espace), et sous la touche Échap sur un clavier QWERTY."
    },
    {
      "id": "js-14",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "destructuring"
      ],
      "code": "const utilisateur = {\n    prenom: \"Marie\",\n    ville: \"Brest\",\n    age: 28\n};\n\nconst { prenom, ville } = utilisateur;\nconsole.log(prenom);\nconsole.log(ville);",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Marie puis Brest",
        "undefined puis undefined",
        "SyntaxError : un bloc {...} ne peut pas apparaître à gauche d'un =",
        "{prenom: 'Marie'} puis {ville: 'Brest'}"
      ],
      "answer": 0,
      "explanation": "C'est le destructuring d'objet. const { prenom, ville } = utilisateur extrait les propriétés prenom et ville dans des variables du même nom. C'est un raccourci pour const prenom = utilisateur.prenom. undefined supposerait que les noms ne correspondent à aucune propriété, or prenom et ville existent bien dans l'objet. La SyntaxError ne se produirait que sans le mot-clé const, où les accolades seraient lues comme un bloc de code. Enfin le destructuring affecte des valeurs, pas des sous-objets enveloppés dans des accolades.",
      "hint": "Les accolades à gauche du = extraient les propriétés de l'objet à droite."
    },
    {
      "id": "js-15",
      "type": "debug",
      "difficulty": "intermediate",
      "concepts": [
        "événement",
        "formulaire"
      ],
      "code": "const form = document.querySelector(\"#monForm\");\n\nform.addEventListener(\"submit\", function(event) {\n    const email = document.querySelector(\"#email\").value;\n    if (email === \"\") {\n        alert(\"Email requis !\");\n    }\n});",
      "question": "Le formulaire affiche l'alerte si l'email est vide, mais la page se recharge quand même. Pourquoi ?",
      "options": [
        "Il manque event.preventDefault() pour empêcher le rechargement de la page",
        "Il faut appeler event.stopPropagation() pour bloquer la propagation de l'événement",
        "Il faut retourner false dans le callback, comme avec les attributs onsubmit",
        "Il faut écouter \"click\" sur le bouton au lieu de \"submit\" sur le formulaire"
      ],
      "answer": 0,
      "explanation": "Par défaut, un formulaire HTML recharge la page à la soumission. event.preventDefault() empêche ce comportement par défaut. Ici, on l'appelle dans le if : l'envoi n'est bloqué que si l'email est vide, et le formulaire part normalement sinon. (Dans une application qui envoie les données elle-même avec fetch, on l'appelle au contraire dès le début du callback.) stopPropagation() bloque la remontée de l'événement vers les éléments parents, mais pas le comportement par défaut du formulaire. return false ne fonctionne qu'avec les gestionnaires inline (onsubmit=\"...\") ou jQuery, pas avec addEventListener. Et écouter \"click\" ne changerait rien : le formulaire se soumettrait quand même après le clic.",
      "hint": "Le comportement par défaut d'un <form> à la soumission est de recharger la page. Il faut l'empêcher explicitement."
    },
    {
      "id": "js-16",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "event loop",
        "microtâche",
        "setTimeout",
        "Promise"
      ],
      "code": "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");",
      "question": "Dans quel ordre s'affichent les lettres ?",
      "options": [
        "A, B, C, D",
        "A, D, B, C",
        "A, C, B, D",
        "A, D, C, B"
      ],
      "answer": 3,
      "explanation": "Le code synchrone s'exécute d'abord : A puis D. Ensuite, la boucle d'événements (event loop) vide la file des microtâches, où se trouvent les callbacks des Promises : C. Seulement après vient la file des tâches, où setTimeout a déposé son callback, même avec un délai de 0 : B. D'où A, D, C, B. Un setTimeout de 0 ne veut pas dire « tout de suite » : il passe après tout le code synchrone et après les microtâches.",
      "hint": "Trois files : le code synchrone, puis les microtâches (Promise), puis les tâches (setTimeout)."
    }
  ]
};
