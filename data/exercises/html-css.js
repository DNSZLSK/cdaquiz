export default {
  "domain": "html-css",
  "title": "HTML / CSS",
  "exercises": [
    {
      "id": "hc-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "sémantique HTML5"
      ],
      "code": "<_____ >\n  <img src=\"logo.png\" alt=\"Logo\" />\n  <nav>\n    <a href=\"/\">Accueil</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</_____>",
      "question": "Quelle balise sémantique entoure le logo et la navigation en haut de page ?",
      "options": [
        "<main>",
        "<header>",
        "<head>",
        "<hgroup>"
      ],
      "answer": 1,
      "explanation": "<header> est la balise sémantique pour l'en-tête visible d'une page ou d'une section : elle regroupe typiquement le logo et la navigation. <head> se place dans <html> et ne contient que des métadonnées invisibles (title, meta, link), c'est la confusion classique avec <header>. <main> désigne le contenu principal et unique de la page, pas sa zone d'en-tête. <hgroup> existe bien mais ne sert qu'à regrouper un titre avec ses sous-titres, pas un logo et un menu.",
      "hint": "<head> est pour les métadonnées. La balise pour le contenu d'en-tête visible est différente."
    },
    {
      "id": "hc-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "flexbox",
        "justify-content"
      ],
      "code": ".container {\n  display: flex;\n  justify-content: space-between;\n  width: 300px;\n}\n\n.box {\n  width: 50px;\n  height: 50px;\n  background: coral;\n}\n\n<!-- HTML -->\n<div class=\"container\">\n  <div class=\"box\">A</div>\n  <div class=\"box\">B</div>\n  <div class=\"box\">C</div>\n</div>",
      "question": "Comment sont positionnées les 3 boîtes ?",
      "options": [
        "A collé à gauche, C collé à droite, B centré entre les deux",
        "Un espace identique avant A, entre chaque boîte et après C",
        "Les 3 boîtes regroupées au centre, l'espace restant aux deux extrémités",
        "A, B et C collées à gauche, tout l'espace restant à droite"
      ],
      "answer": 0,
      "explanation": "justify-content: space-between distribue l'espace ENTRE les éléments : le premier est collé au début, le dernier à la fin, et l'espace restant est réparti entre eux. Un espace identique avant, entre et après décrirait space-evenly. Les boîtes regroupées au centre correspondraient à center. Et les trois collées à gauche décriraient flex-start, la valeur par défaut, justement remplacée ici.",
      "hint": "space-BETWEEN met l'espace ENTRE les éléments, pas autour."
    },
    {
      "id": "hc-03",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "formulaire",
        "input type"
      ],
      "code": "<form>\n  <label for=\"email\">Email</label>\n  <input type=\"______\" id=\"email\" placeholder=\"votre@email.com\" required />\n  \n  <label for=\"mdp\">Mot de passe</label>\n  <input type=\"password\" id=\"mdp\" required />\n  \n  <button type=\"submit\">Connexion</button>\n</form>",
      "question": "Quel type d'input valide automatiquement le format email ?",
      "options": [
        "text",
        "email",
        "tel",
        "url"
      ],
      "answer": 1,
      "explanation": "type=\"email\" active la validation native du navigateur : il vérifie que la valeur contient un @ et un domaine. Sur mobile, il affiche aussi un clavier adapté avec @. type=\"text\" existe mais n'applique aucune validation de format. type=\"tel\" propose un clavier numérique sans rien valider, les formats de téléphone étant trop variés. type=\"url\" valide une adresse web (protocole compris), pas une adresse email.",
      "hint": "HTML5 a des types d'input spécialisés qui activent la validation native."
    },
    {
      "id": "hc-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "flexbox",
        "flex-direction",
        "align-items"
      ],
      "code": ".card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 20px;\n}\n\n<div class=\"card\">\n  <img src=\"photo.jpg\" />\n  <h2>Titre</h2>\n  <p>Description</p>\n  <button>Voir plus</button>\n</div>",
      "question": "Comment sont disposés les éléments dans la card ?",
      "options": [
        "Empilés verticalement, centrés horizontalement, avec 10px d'espace entre chaque",
        "Sur une seule ligne horizontale, avec 10px d'espace entre chaque",
        "Empilés verticalement, étirés sur toute la largeur de la card",
        "Empilés verticalement, regroupés au centre vertical de la card"
      ],
      "answer": 0,
      "explanation": "flex-direction: column empile les éléments verticalement, align-items: center les centre sur l'axe transversal (horizontal quand la direction est column) et gap: 10px espace chaque enfant. Une seule ligne horizontale supposerait la direction row par défaut, remplacée ici par column. L'étirement sur toute la largeur correspondrait à align-items: stretch, la valeur par défaut, écrasée ici par center. Le regroupement au centre vertical relèverait de justify-content: center, absent de ce code.",
      "hint": "En flex column, l'axe principal est vertical. align-items agit sur l'axe transversal (horizontal)."
    },
    {
      "id": "hc-05",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "accessibilité",
        "alt"
      ],
      "code": "<img src=\"graphique-ventes.png\" />\n<img src=\"decoration.png\" alt=\"\" />\n<img src=\"logo-entreprise.png\" alt=\"Logo MonEntreprise\" />",
      "question": "Quelle image pose un problème d'accessibilité ?",
      "options": [
        "La 1ère : il manque l'attribut alt",
        "La 2ème : un alt vide équivaut à une absence d'attribut alt",
        "La 3ème : le alt d'un logo ne doit pas citer le nom de l'entreprise",
        "Aucune : alt est un attribut facultatif quand src est renseigné"
      ],
      "answer": 0,
      "explanation": "La 1ère image n'a pas d'attribut alt : les lecteurs d'écran ne peuvent pas la décrire et certains lisent alors le nom du fichier. alt=\"\" n'équivaut pas à une absence d'alt : c'est le signal volontaire d'une image décorative que les lecteurs d'écran doivent ignorer. Le alt d'un logo doit au contraire citer le nom de l'entreprise, c'est exactement l'information utile à transmettre. Enfin alt n'est pas facultatif : il est requis pour l'accessibilité et la validité du HTML.",
      "hint": "alt=\"\" (vide) est volontaire pour les images décoratives. L'absence totale d'alt est le problème."
    },
    {
      "id": "hc-06",
      "type": "debug",
      "difficulty": "intermediate",
      "concepts": [
        "CSS",
        "centrage"
      ],
      "code": ".modal {\n  width: 400px;\n  margin: auto;\n  /* La modal ne se centre pas verticalement */\n  position: fixed;\n  top: 50%;\n  left: 50%;\n}",
      "question": "Pourquoi la modal ne paraît pas centrée visuellement ?",
      "options": [
        "Il manque transform: translate(-50%, -50%) pour compenser la taille de l'élément",
        "top: 50% se calcule par rapport à la largeur du viewport, pas à sa hauteur",
        "margin: auto est ignoré dès que l'élément est en position: fixed",
        "Il faudrait position: absolute, car fixed se place par rapport au parent et non à l'écran"
      ],
      "answer": 0,
      "explanation": "top: 50% et left: 50% placent le COIN SUPÉRIEUR GAUCHE de la modal au centre de l'écran : elle déborde donc vers la droite et le bas. transform: translate(-50%, -50%) la décale de la moitié de sa propre taille, la centrant visuellement. top en % se calcule bien par rapport à la hauteur du conteneur, ce sont margin et padding en % qui se réfèrent à la largeur. margin: auto n'est pas ignoré en position: fixed, il peut même centrer l'élément quand left et right valent 0. Et c'est l'inverse : fixed se positionne par rapport au viewport, absolute par rapport à un ancêtre positionné.",
      "hint": "top: 50% positionne le coin supérieur gauche, pas le centre de l'élément."
    },
    {
      "id": "hc-07",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "media query",
        "responsive"
      ],
      "code": ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}",
      "question": "Que se passe-t-il quand l'écran fait 600px de large ?",
      "options": [
        "Les éléments passent sur une seule colonne (empilés)",
        "Ils restent sur 3 colonnes : max-width cible les écrans plus larges que 768px",
        "Une seule colonne mais sans le gap de 20px, la media query remplaçant tout le bloc .grid",
        "L'affichage ne change qu'après rechargement : une media query n'est évaluée qu'au chargement"
      ],
      "answer": 0,
      "explanation": "600px < 768px donc la media query s'applique : grid-template-columns passe de repeat(3, 1fr) à 1fr et les éléments s'empilent sur une colonne. max-width cible les écrans plus étroits ou égaux à 768px, pas plus larges (ce serait min-width). La media query ne remplace que les propriétés qu'elle redéclare : le gap de 20px est conservé. Et les media queries sont réévaluées en continu lors du redimensionnement, sans aucun rechargement de la page.",
      "hint": "max-width: 768px s'applique quand l'écran est PLUS PETIT que 768px."
    },
    {
      "id": "hc-08",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "CSS",
        "pseudo-classe"
      ],
      "code": ".btn {\n  background: #4CAF50;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  cursor: pointer;\n}\n\n.btn:______ {\n  background: #45a049;\n}",
      "question": "Quelle pseudo-classe change la couleur quand la souris passe dessus ?",
      "options": [
        "active",
        "hover",
        "focus",
        "visited"
      ],
      "answer": 1,
      "explanation": ":hover s'active quand la souris survole l'élément, sans qu'aucun clic ne soit nécessaire. :active existe mais ne s'applique que pendant le clic, tant que le bouton de la souris reste enfoncé. :focus cible l'élément qui détient le focus, obtenu au clavier (Tab) ou après un clic, pas au simple survol. :visited ne concerne que les liens déjà visités, jamais un bouton.",
      "hint": "Le mot anglais pour 'survoler' / 'planer au-dessus de'."
    }
  ]
};
