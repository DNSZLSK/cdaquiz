export default {
  "domain": "html-css",
  "title": "HTML / CSS",
  "icon": "🎨",
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
        "<div>",
        "<header>",
        "<head>",
        "<section>"
      ],
      "answer": 1,
      "explanation": "<header> est la balise sémantique pour l'en-tête d'une page ou d'une section. <head> contient les métadonnées (dans <html>), pas le contenu visible. <div> fonctionne mais n'a aucune valeur sémantique.",
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
        "Les 3 empilées verticalement",
        "Les 3 collées à gauche",
        "Les 3 centrées avec un espace égal de chaque côté"
      ],
      "answer": 0,
      "explanation": "justify-content: space-between distribue l'espace entre les éléments. Le premier est collé au début, le dernier à la fin, et les autres sont répartis uniformément entre les deux.",
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
        "mail",
        "string"
      ],
      "answer": 1,
      "explanation": "type=\"email\" active la validation native du navigateur : il vérifie que la valeur contient un @ et un domaine. Sur mobile, il affiche aussi un clavier adapté avec @.",
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
        "Sur une seule ligne horizontale, centrés verticalement",
        "Empilés verticalement, alignés à gauche",
        "En grille 2×2"
      ],
      "answer": 0,
      "explanation": "flex-direction: column empile les éléments verticalement. align-items: center les centre sur l'axe transversal (horizontal quand la direction est column). gap: 10px met 10px d'espace entre chaque élément enfant.",
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
        "La 1ère — il manque l'attribut alt",
        "La 2ème — alt vide n'est pas valide",
        "La 3ème — le alt est trop descriptif",
        "Aucune, tout est correct"
      ],
      "answer": 0,
      "explanation": "La 1ère image n'a pas d'attribut alt. Les lecteurs d'écran ne peuvent pas la décrire aux utilisateurs malvoyants. La 2ème avec alt=\"\" est correcte : alt vide indique une image décorative que les lecteurs d'écran doivent ignorer. La 3ème a un alt descriptif, c'est parfait.",
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
        "position: fixed ne fonctionne pas avec margin: auto",
        "top et left devraient être en pixels, pas en %",
        "Il faut ajouter display: flex"
      ],
      "answer": 0,
      "explanation": "top: 50% et left: 50% placent le COIN SUPÉRIEUR GAUCHE de la modal au centre de l'écran. La modal déborde donc vers la droite et le bas. transform: translate(-50%, -50%) la décale de la moitié de sa propre taille, la centrant visuellement.",
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
        "Les éléments restent sur 3 colonnes",
        "Les éléments passent sur 2 colonnes",
        "Erreur CSS — 1fr n'est pas valide"
      ],
      "answer": 0,
      "explanation": "600px < 768px donc la media query s'applique. grid-template-columns passe de repeat(3, 1fr) (3 colonnes) à 1fr (1 seule colonne). Les éléments s'empilent verticalement. C'est le pattern responsive classique.",
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
      "explanation": ":hover s'active quand la souris survole l'élément. :active quand on clique dessus. :focus quand l'élément a le focus clavier. :visited pour les liens déjà visités.",
      "hint": "Le mot anglais pour 'survoler' / 'planer au-dessus de'."
    }
  ]
};
