export default {
  "domain": "bootstrap",
  "title": "Bootstrap",
  "exercises": [
    {
      "id": "bs-01",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "grille",
        "colonnes"
      ],
      "code": "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-6\">Gauche</div>\n    <div class=\"col-6\">Droite</div>\n  </div>\n</div>",
      "question": "Comment s'affichent les deux blocs ?",
      "options": [
        "Côte à côte, chacun sur 6 colonnes sur 12, soit la moitié de la largeur",
        "Empilés, car sans préfixe de breakpoint (col-md-6) les colonnes restent en pleine largeur",
        "Côte à côte, mais les gouttières font déborder les colonnes hors du container",
        "Empilés, car il manque la classe d-flex sur la row pour les aligner horizontalement"
      ],
      "answer": 0,
      "explanation": "La grille Bootstrap fait 12 colonnes. col-6 = 6/12 = 50% de la largeur. Deux col-6 côte à côte remplissent la row. Le container centre le tout et ajoute du padding. col-6 sans préfixe s'applique dès le plus petit écran : un préfixe comme md ne ferait que retarder l'activation, il n'est pas requis pour la mise en colonnes. Les gouttières (padding des colonnes) sont compensées par les marges négatives de la row, rien ne déborde. Enfin la row est déjà en display: flex, ajouter d-flex serait redondant.",
      "hint": "La grille Bootstrap compte 12 colonnes. Sans préfixe, col-6 s'applique-t-il dès le plus petit écran ?"
    },
    {
      "id": "bs-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "responsive",
        "breakpoints"
      ],
      "code": "<div class=\"row\">\n  <div class=\"col-12 col-md-4\">A</div>\n  <div class=\"col-12 col-md-4\">B</div>\n  <div class=\"col-12 col-md-4\">C</div>\n</div>",
      "question": "Comment s'affichent les blocs sur un téléphone (< 768px) ?",
      "options": [
        "Empilés verticalement, chacun sur toute la largeur",
        "Sur une seule ligne en 3 colonnes, car col-md-4 s'applique jusqu'à 768px",
        "Empilés verticalement mais réduits à 4/12 de la largeur chacun",
        "Sur une seule ligne, les colonnes étant compressées par le flex-shrink de la row"
      ],
      "answer": 0,
      "explanation": "col-12 s'applique par défaut (mobile-first) : chaque bloc prend 12/12 = 100% de la largeur, donc empilés. col-md-4 s'active à partir de 768px (md), pas en dessous : md correspond à un min-width, pas à un max-width, lire l'inverse est le contresens classique du mobile-first. Sous 768px, c'est col-12 qui impose la largeur, les blocs ne sont donc pas réduits à 4/12. Et les colonnes de la grille ont une largeur en pourcentage fixée par leur classe : le flex-shrink ne les recompresse pas sur une seule ligne.",
      "hint": "Bootstrap est mobile-first : quelle classe s'applique sous le breakpoint md ?"
    },
    {
      "id": "bs-03",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "bouton"
      ],
      "code": "<button class=\"btn ______\">Valider</button>",
      "question": "Quelle classe donne un bouton bleu (style primaire) Bootstrap ?",
      "options": [
        "btn-primary",
        "btn-info",
        "btn-outline-primary",
        "bg-primary"
      ],
      "answer": 0,
      "explanation": "btn-primary = bleu (couleur d'action principale). Bootstrap utilise des noms sémantiques : primary (bleu), success (vert), danger (rouge), warning (jaune), info (cyan), secondary (gris). btn-info donne un bouton cyan (information), pas le bleu primaire. btn-outline-primary existe mais produit un bouton à fond transparent avec bordure bleue, pas le bouton plein demandé. bg-primary est un utilitaire de couleur de fond : il colore l'arrière-plan mais n'applique pas le style de bouton (texte, états hover et focus).",
      "hint": "Bootstrap utilise des noms de couleur sémantiques, pas des noms de couleur réels."
    },
    {
      "id": "bs-04",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "card"
      ],
      "code": "<div class=\"card\" style=\"width: 18rem;\">\n  <img src=\"photo.jpg\" class=\"card-img-top\" alt=\"...\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">Titre</h5>\n    <p class=\"card-text\">Description du contenu.</p>\n    <a href=\"#\" class=\"btn btn-primary\">Voir plus</a>\n  </div>\n</div>",
      "question": "Quel composant Bootstrap est utilisé ici ?",
      "options": [
        "Card : un conteneur flexible avec image, titre, texte et action",
        "Media object : une image alignée à côté d'un contenu textuel",
        "Jumbotron : un grand encart de mise en avant, avec titre et texte",
        "Toast : une notification légère avec en-tête et corps de message"
      ],
      "answer": 0,
      "explanation": "Les Cards sont des conteneurs flexibles avec contenu varié (image, titre, texte, boutons). Très utilisées pour afficher des produits, des articles, des profils. Les classes card-img-top, card-body, card-title structurent le contenu. Le media object (Bootstrap 4) place l'image à côté du texte, pas au-dessus, et n'utilise pas les classes card-*. Le jumbotron est un bandeau d'accroche pleine largeur sans structure image + corps, supprimé en Bootstrap 5. Un toast est une notification temporaire structurée par toast-header et toast-body, pas par card-body.",
      "hint": "Regardez la classe principale du conteneur div."
    },
    {
      "id": "bs-05",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "navbar",
        "responsive"
      ],
      "code": "<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n  <a class=\"navbar-brand\" href=\"#\">MonSite</a>\n  <button class=\"navbar-toggler\" data-bs-toggle=\"collapse\" data-bs-target=\"#navMenu\"\n          aria-controls=\"navMenu\" aria-expanded=\"false\" aria-label=\"Ouvrir le menu\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"navMenu\">\n    <ul class=\"navbar-nav\">\n      <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Accueil</a></li>\n      <li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Contact</a></li>\n    </ul>\n  </div>\n</nav>",
      "question": "Que se passe-t-il sur un écran < 992px (lg) ?",
      "options": [
        "Les liens sont cachés derrière un bouton hamburger ☰ qui les déploie au clic",
        "Les liens s'empilent verticalement et restent visibles, le bouton servant à les replier",
        "Rien ne change : navbar-expand-lg fige la navbar en version étendue sur tous les écrans",
        "Les liens sont cachés mais le bouton hamburger n'apparaît qu'au-dessus de 992px"
      ],
      "answer": 0,
      "explanation": "navbar-expand-lg = les liens sont visibles à partir de lg (992px). En dessous, la classe collapse masque le menu par défaut : elle ne l'affiche pas, le toggler sert donc à le déployer, pas à replier des liens déjà visibles. navbar-expand-lg ne fige rien : c'est précisément le seuil en dessous duquel la navbar se replie. Et le navbar-toggler n'apparaît pas au-dessus de 992px, c'est l'inverse : il est affiché sous 992px et masqué au-dessus, là où les liens reprennent leur place horizontale. Ses attributs aria-controls, aria-expanded et aria-label indiquent aux lecteurs d'écran ce qu'il ouvre et s'il est ouvert.",
      "hint": "navbar-expand-lg : à partir de quelle largeur la navbar est-elle étendue, et que devient-elle en dessous ?"
    },
    {
      "id": "bs-06",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "formulaire Bootstrap"
      ],
      "code": "<form>\n  <div class=\"______\">\n    <label for=\"email\" class=\"form-label\">Email</label>\n    <input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"nom@exemple.com\">\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Envoyer</button>\n</form>",
      "question": "Quelle classe Bootstrap entoure un label + input pour l'espacement ?",
      "options": [
        "mb-3",
        "form-group",
        "input-group",
        "form-floating"
      ],
      "answer": 0,
      "explanation": "En Bootstrap 5, mb-3 (margin-bottom: 1rem) est la méthode standard pour espacer les champs de formulaire. form-group était justement la classe dédiée de Bootstrap 4, mais elle a été supprimée en v5 au profit des utilitaires d'espacement. input-group sert à accoler un texte ou un bouton directement à l'input (comme un @ devant un champ), pas à espacer un bloc label + champ. form-floating existe aussi mais crée un label flottant à l'intérieur du champ et impose de placer le label après l'input, ce qui ne correspond pas à ce code.",
      "hint": "En Bootstrap 5, l'espacement utilise des classes utilitaires : m = margin, b = bottom, 3 = taille."
    }
  ]
};
