export default {
  "domain": "uml-archi",
  "title": "UML / Architecture",
  "icon": "📐",
  "exercises": [
    {
      "id": "uml-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "composition vs agrégation"
      ],
      "code": "// Scénario A\nclass Maison {\n    List<Piece> pieces; // créées dans le constructeur de Maison\n    Maison() {\n        this.pieces = List.of(new Piece(\"salon\"), new Piece(\"cuisine\"));\n    }\n}\n\n// Scénario B\nclass Playlist {\n    List<Chanson> chansons; // les chansons existent indépendamment\n    void ajouter(Chanson c) {\n        this.chansons.add(c);\n    }\n}",
      "question": "Quelle relation est une composition et laquelle est une agrégation ?",
      "options": [
        "A = composition, B = agrégation",
        "A = agrégation, B = composition",
        "Les deux sont des compositions",
        "Les deux sont des agrégations"
      ],
      "answer": 0,
      "explanation": "A : les Pièces sont créées DANS la Maison. Sans Maison, pas de Pièces. Si la Maison est détruite, les Pièces disparaissent → composition. B : les Chansons existent indépendamment de la Playlist. Supprimer la Playlist ne supprime pas les Chansons → agrégation.",
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
        "1 - 1",
        "1 - N",
        "N - N",
        "0 - 1"
      ],
      "answer": 1,
      "explanation": "Un Auteur a une List<Livre> (plusieurs livres) : côté N. Un Livre a un seul Auteur : côté 1. Multiplicité : 1 Auteur → N Livres.",
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
      "explanation": "Une association N-N avec attribut produit TOUJOURS une table de jointure. Résultat : table ETUDIANT, table MATIERE, table NOTER (avec etudiant_id, matiere_id, note). L'attribut 'note' est porté par la table de jointure car il dépend des deux entités.",
      "hint": "Règle MCD → MLD : une association N-N crée une 3ème table (table de jointure)."
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
        "A = View, B = Model, C = Controller",
        "A = Controller, B = View, C = Model"
      ],
      "answer": 1,
      "explanation": "A (@Entity) = Model (données). B (@Service) = aussi côté Model, c'est la logique métier (le M de MVC inclut les données ET la logique). C (@RestController) = Controller (reçoit les requêtes, coordonne). Dans une API REST, la View est le JSON retourné au client.",
      "hint": "En Spring, le Model comprend DEUX choses : les Entity (données) et les Service (logique métier)."
    },
    {
      "id": "uml-05",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "héritage vs interface en UML"
      ],
      "code": "class Forme {}\nclass Cercle extends Forme {}\nclass Rectangle extends Forme {}\n\ninterface IDessinable {\n    void dessiner();\n}\n\nclass Cercle extends Forme implements IDessinable {\n    public void dessiner() { /* ... */ }\n}",
      "question": "En UML, comment représente-t-on extends vs implements ?",
      "options": [
        "extends = flèche pleine avec triangle vide, implements = flèche pointillée avec triangle vide",
        "Les deux utilisent la même flèche",
        "extends = flèche pointillée, implements = flèche pleine",
        "extends = flèche avec losange, implements = flèche simple"
      ],
      "answer": 0,
      "explanation": "En UML : l'héritage (extends) est une flèche pleine avec un triangle vide pointant vers le parent. L'implémentation (implements) est une flèche en pointillés avec un triangle vide pointant vers l'interface. Le triangle est toujours du côté du parent/interface.",
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
        "DAO (Data Access Object) — permet de changer de base de données sans modifier la logique métier",
        "Singleton — garantit une seule instance de connexion à la BDD",
        "Observer — notifie les composants quand les données changent",
        "Factory — crée des objets Produit sans connaître le type exact"
      ],
      "answer": 0,
      "explanation": "Le pattern DAO isole l'accès aux données derrière une interface. Le Service utilise IProduitDAO sans savoir si c'est MySQL ou MongoDB derrière. Pour changer de BDD, on remplace l'implémentation sans toucher au reste du code. En Spring, les Repository sont des DAO.",
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
        "Client-(1,1)---Commande / Commande-(1,1)---Produit",
        "Client-(0,N)---Commande / Commande-(0,N)---Produit",
        "Client-(1,N)---Commande / Produit-(1,N)---Commande"
      ],
      "answer": 0,
      "explanation": "Client → Commande : un client peut avoir 0 ou N commandes (0,N). Commande → Client : une commande a 1 et 1 seul client (1,1 côté Commande). Commande-Produit : une commande contient 1 à N produits, un produit peut être dans 0 à N commandes → association N-N (table de jointure nécessaire).",
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
        "A = microservices, B = monolithique",
        "Les deux sont du 3-tiers",
        "Les deux sont des microservices"
      ],
      "answer": 0,
      "explanation": "A : tout le code est dans un seul projet déployé ensemble → monolithique (architecture 3-tiers classique). B : chaque domaine métier est un service indépendant avec sa propre BDD, communiquant via l'API Gateway → microservices.",
      "hint": "Monolithique = un seul déploiement. Microservices = plusieurs services indépendants."
    }
  ]
};
