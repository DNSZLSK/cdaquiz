export default {
  "domain": "uml-archi",
  "title": "UML / Architecture",
  "exercises": [
    {
      "id": "uml-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "composition vs agrégation"
      ],
      "code": "// Scénario A\nclass Maison {\n    List<Piece> pieces; // créées dans le constructeur de Maison\n    Maison() {\n        this.pieces = List.of(new Piece(\"salon\"), new Piece(\"cuisine\"));\n    }\n}\n\n// Scénario B\nclass Playlist {\n    List<Chanson> chansons = new ArrayList<>(); // les chansons existent indépendamment\n    void ajouter(Chanson c) {\n        this.chansons.add(c);\n    }\n}",
      "question": "Quelle relation est une composition et laquelle est une agrégation ?",
      "options": [
        "A = composition, B = agrégation",
        "A = agrégation, B = composition",
        "A = composition, B = simple dépendance",
        "A = association simple, B = agrégation"
      ],
      "answer": 0,
      "explanation": "A : les Pièces sont créées DANS la Maison. Sans Maison, pas de Pièces. Si la Maison est détruite, les Pièces disparaissent → composition. B : les Chansons existent indépendamment de la Playlist. Supprimer la Playlist ne supprime pas les Chansons → agrégation. L'inversion est le piège classique : c'est le cycle de vie qui tranche, pas le fait d'avoir une List. B n'est pas une simple dépendance : une dépendance serait un usage ponctuel (paramètre, variable locale) sans stockage, or Playlist conserve durablement ses chansons. Et A est plus qu'une association simple : le cycle de vie des Pièces est lié à celui de la Maison, ce que note le losange plein.",
      "hint": "La question clé : l'objet contenu peut-il exister SANS l'objet conteneur ?"
    },
    {
      "id": "uml-02",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "multiplicité"
      ],
      "code": "class Auteur {\n    String nom;\n    List<Livre> livres; // un auteur écrit plusieurs livres\n}\n\nclass Livre {\n    String titre;\n    Auteur auteur; // un livre a un seul auteur (simplifié)\n}",
      "question": "Quelle est la multiplicité de la relation Auteur-Livre ?",
      "options": [
        "N - 1",
        "1 - N",
        "N - N",
        "1 - 1"
      ],
      "answer": 1,
      "explanation": "Un Auteur a une List<Livre> (plusieurs livres) : côté N. Un Livre a un seul Auteur : côté 1. Multiplicité : 1 Auteur → N Livres. N - 1 inverse le sens de lecture demandé (Auteur-Livre) : cela voudrait dire plusieurs auteurs pour un seul livre. N - N exigerait une collection des deux côtés, donc une List<Auteur> dans Livre, or Livre ne porte qu'une référence simple. 1 - 1 supposerait qu'un auteur n'écrit qu'un seul livre, ce que la List<Livre> contredit directement.",
      "hint": "List<> = plusieurs = côté N. Référence simple = un seul = côté 1."
    },
    {
      "id": "uml-03",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "MCD vers MLD"
      ],
      "code": "MCD :\n- Entité ETUDIANT (id, nom, prenom)\n- Entité MATIERE (id, intitule, coefficient)\n- Association NOTER entre ETUDIANT et MATIERE\n  avec attribut 'note' sur l'association\n  Cardinalités : un étudiant peut être noté dans plusieurs matières,\n  une matière peut noter plusieurs étudiants",
      "question": "Combien de tables le MLD produit-il ?",
      "options": [
        "2 tables",
        "3 tables",
        "4 tables",
        "1 table"
      ],
      "answer": 1,
      "explanation": "Une association N-N avec attribut produit TOUJOURS une table de jointure. Résultat : table ETUDIANT, table MATIERE, table NOTER (avec etudiant_id, matiere_id, note). L'attribut 'note' est porté par la table de jointure car il dépend des deux entités. Répondre 2 tables reviendrait à traiter l'association comme un 1-N en glissant matiere_id et note dans ETUDIANT, impossible : un étudiant a plusieurs notes. 4 tables supposerait une table séparée pour l'attribut note, alors qu'il se loge dans NOTER. 1 table aplatirait tout et dupliquerait les données de l'étudiant et de la matière à chaque note : c'est la dénormalisation à éviter.",
      "hint": "La note dépend à la fois de l'étudiant et de la matière : dans quelle table peut-elle tenir ?"
    },
    {
      "id": "uml-04",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "pattern MVC"
      ],
      "code": "// Fichier A\n@Entity\npublic class Produit {\n    @Id private Long id;\n    private String nom;\n    private double prix;\n}\n\n// Fichier B\n@Service\npublic class ProduitService {\n    public double calculerTTC(Produit p) {\n        return p.getPrix() * 1.20;\n    }\n}\n\n// Fichier C\n@RestController\npublic class ProduitController {\n    @GetMapping(\"/produits\")\n    public List<Produit> getAll() { ... }\n}",
      "question": "Dans le pattern MVC, à quoi correspond chaque fichier ?",
      "options": [
        "A = Model, B = Controller, C = View",
        "A = Model, B = Model (logique métier), C = Controller",
        "A = Model, B = View (mise en forme des données), C = Controller",
        "A = Model, B = hors MVC (couche technique à part), C = Controller"
      ],
      "answer": 1,
      "explanation": "A (@Entity) = Model (données). B (@Service) = aussi côté Model, c'est la logique métier (le M de MVC inclut les données ET la logique). C (@RestController) = Controller (reçoit les requêtes, coordonne). Dans une API REST, la View est le JSON retourné au client. B n'est pas le Controller : il ne reçoit aucune requête HTTP, il applique une règle métier. B n'est pas non plus la View : calculer un prix TTC est une règle de gestion, pas de la mise en forme. Enfin le Service n'est pas hors MVC : la logique métier est précisément ce que le M englobe en plus des entités.",
      "hint": "En Spring, le Model comprend DEUX choses : les Entity (données) et les Service (logique métier)."
    },
    {
      "id": "uml-05",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "héritage vs interface en UML"
      ],
      "code": "class Forme {}\nclass Rectangle extends Forme {}\n\ninterface IDessinable {\n    void dessiner();\n}\n\nclass Cercle extends Forme implements IDessinable {\n    public void dessiner() { /* ... */ }\n}",
      "question": "En UML, comment représente-t-on extends vs implements ?",
      "options": [
        "extends = flèche pleine avec triangle vide, implements = flèche pointillée avec triangle vide",
        "extends = flèche pointillée avec triangle vide, implements = flèche pleine avec triangle vide",
        "extends = flèche pleine avec triangle vide, implements = flèche pointillée à pointe ouverte",
        "extends = trait plein avec losange vide côté parent, implements = flèche pointillée avec triangle vide"
      ],
      "answer": 0,
      "explanation": "En UML : l'héritage (extends) est une flèche pleine avec un triangle vide pointant vers le parent. L'implémentation (implements) est une flèche en pointillés avec un triangle vide pointant vers l'interface. Le triangle est toujours du côté du parent/interface. L'inversion trait plein/pointillé est le piège le plus fréquent : le pointillé est réservé à la réalisation d'interface. La flèche pointillée à pointe ouverte existe bien, mais elle note la dépendance (use), pas implements. Quant au losange vide, il marque une agrégation en bout d'association, jamais un héritage.",
      "hint": "Plein = héritage (relation forte). Pointillé = implémentation (contrat, plus souple)."
    },
    {
      "id": "uml-06",
      "type": "identify",
      "difficulty": "advanced",
      "concepts": [
        "pattern DAO"
      ],
      "code": "public interface IProduitDAO {\n    Produit findById(Long id);\n    List<Produit> findAll();\n    void save(Produit p);\n    void delete(Long id);\n}\n\npublic class ProduitDAOMySQL implements IProduitDAO {\n    // Implémentation avec requêtes MySQL\n}\n\npublic class ProduitDAOMongo implements IProduitDAO {\n    // Implémentation avec MongoDB\n}",
      "question": "Quel pattern est utilisé ici et quel est son avantage ?",
      "options": [
        "DAO (Data Access Object) : permet de changer de base de données sans modifier la logique métier",
        "Strategy : permet de changer d'algorithme de persistance à l'exécution sans toucher au client",
        "Adapter (GoF) : convertit les API incompatibles de MySQL et MongoDB vers une interface commune",
        "Factory Method : délègue aux sous-classes le choix de l'implémentation concrète à instancier"
      ],
      "answer": 0,
      "explanation": "Le pattern DAO isole l'accès aux données derrière une interface. Le Service utilise IProduitDAO sans savoir si c'est MySQL ou MongoDB derrière. Pour changer de BDD, on remplace l'implémentation sans toucher au reste du code. En Spring, les Repository sont des DAO. Strategy a une structure identique (une interface, des implémentations interchangeables) mais son intention est d'encapsuler des algorithmes métier variables, pas d'isoler la couche de persistance : ici les noms et les méthodes CRUD signent un DAO. Adapter servirait à faire entrer une classe existante dans une interface qu'elle ne respecte pas, or les deux implémentations sont écrites directement pour IProduitDAO. Factory Method concerne la création d'objets : rien ici ne décide quelle instance fabriquer.",
      "hint": "L'interface définit le QUOI (findById, save...). Les implémentations définissent le COMMENT (SQL, Mongo...)."
    },
    {
      "id": "uml-07",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "MCD cardinalités"
      ],
      "code": "Règles métier :\n- Un client peut passer zéro ou plusieurs commandes\n- Une commande appartient à exactement un client\n- Une commande contient un ou plusieurs produits\n- Un produit peut apparaître dans zéro ou plusieurs commandes",
      "question": "Quelles sont les cardinalités en MCD ?",
      "options": [
        "Client-(0,N)---Commande / Commande-(1,N)---Produit avec association N-N",
        "Client-(1,N)---Commande / Commande-(1,N)---Produit avec association N-N",
        "Client-(0,N)---Commande / Commande-(0,N)---Produit avec association N-N",
        "Client-(0,N)---Commande / Commande-(1,N)---Produit avec clé étrangère dans Commande"
      ],
      "answer": 0,
      "explanation": "Client → Commande : un client peut avoir 0 ou N commandes (0,N). Commande → Client : une commande a 1 et 1 seul client (1,1 côté Commande). Commande-Produit : une commande contient 1 à N produits, un produit peut être dans 0 à N commandes → association N-N (table de jointure nécessaire). (1,N) côté Client oublierait le mot 'zéro' de la règle : un client sans aucune commande doit rester possible. (0,N) côté Commande vers Produit autoriserait une commande vide, or la règle impose 'un ou plusieurs' produits, donc un minimum de 1. Enfin une simple clé étrangère dans Commande ne peut porter qu'un seul produit par commande : une association N-N se traduit obligatoirement par une table de jointure au MLD.",
      "hint": "Lisez chaque règle métier et traduisez-la en (min, max)."
    },
    {
      "id": "uml-08",
      "type": "identify",
      "difficulty": "advanced",
      "concepts": [
        "architecture 3-tiers",
        "microservices"
      ],
      "code": "Architecture A:\n  Client (Angular) → Controller → Service → Repository → BDD\n  Tout dans un seul projet Spring Boot.\n\nArchitecture B:\n  Client (Angular) → API Gateway →\n    Service Utilisateurs (propre BDD)\n    Service Commandes (propre BDD)\n    Service Paiements (propre BDD)",
      "question": "Quelle architecture est monolithique et laquelle est microservices ?",
      "options": [
        "A = monolithique 3-tiers, B = microservices",
        "A = microservices (un service par couche), B = monolithe distribué",
        "A = monolithique 3-tiers, B = SOA : l'API Gateway y joue le rôle d'ESB",
        "A = client-serveur 2-tiers, B = microservices"
      ],
      "answer": 0,
      "explanation": "A : tout le code est dans un seul projet déployé ensemble → monolithique (architecture 3-tiers classique). B : chaque domaine métier est un service indépendant avec sa propre BDD, communiquant via l'API Gateway → microservices. Les couches Controller/Service/Repository de A ne sont pas des microservices : ce sont des couches logiques d'un même déploiement, pas des services autonomes. B n'est pas un monolithe distribué : ce terme désigne des services séparés mais fortement couplés (souvent une BDD partagée), or ici chaque service possède la sienne. Une API Gateway n'est pas un ESB : elle route les requêtes sans centraliser d'orchestration ni de transformation, ce qui distingue les microservices de la SOA classique. Enfin A compte bien trois tiers (présentation, métier, données), pas deux.",
      "hint": "Monolithique = un seul déploiement. Microservices = plusieurs services indépendants."
    }
  ]
};
