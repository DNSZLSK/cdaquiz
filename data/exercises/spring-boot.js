export default {
  "domain": "spring-boot",
  "title": "Spring Boot / JPA",
  "icon": "🌱",
  "exercises": [
    {
      "id": "sb-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "architecture 3-tiers"
      ],
      "code": "@RestController\n@RequestMapping(\"/api/cours\")\npublic class CoursController {\n    @Autowired\n    private CoursService coursService;\n    \n    @GetMapping\n    public List<CoursDTO> getAll() {\n        return coursService.findAll();\n    }\n}",
      "question": "À quelle couche de l'architecture 3-tiers appartient ce code ?",
      "options": [
        "Couche Données (Repository)",
        "Couche Métier (Service)",
        "Couche Présentation (Controller)",
        "Couche Modèle (Entity)"
      ],
      "answer": 2,
      "explanation": "Les annotations @RestController et @RequestMapping indiquent que c'est un contrôleur REST. C'est la couche Présentation : elle reçoit les requêtes HTTP et délègue le traitement au Service. Elle ne contient aucune logique métier.",
      "hint": "Regardez les annotations de la classe. @RestController expose des endpoints HTTP."
    },
    {
      "id": "sb-02",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "@Entity",
        "JPA"
      ],
      "code": "______\n@Table(name = \"produit\")\npublic class Produit {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false)\n    private String nom;\n    \n    private double prix;\n}",
      "question": "Quelle annotation manque au-dessus de @Table ?",
      "options": [
        "@Component",
        "@Entity",
        "@Repository",
        "@Service"
      ],
      "answer": 1,
      "explanation": "@Entity indique à JPA que cette classe correspond à une table en base de données. Sans @Entity, JPA ne sait pas que Produit doit être mappé en table. @Table(name = \"produit\") précise le nom de la table (optionnel si le nom de la classe correspond).",
      "hint": "Cette annotation dit à JPA : 'cette classe représente une table en BDD'."
    },
    {
      "id": "sb-03",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "Repository",
        "Spring Data JPA"
      ],
      "code": "public interface ProduitRepository extends ______ <Produit, Long> {\n    List<Produit> findByPrixGreaterThan(double prix);\n}",
      "question": "Quelle interface doit être étendue ?",
      "options": [
        "CrudRepository",
        "JpaRepository",
        "Repository",
        "Les trois fonctionnent, mais JpaRepository est le plus complet"
      ],
      "answer": 3,
      "explanation": "JpaRepository étend CrudRepository et PagingAndSortingRepository. Il fournit les opérations CRUD de base + la pagination + le tri + des méthodes comme flush() et deleteInBatch(). En pratique, on utilise presque toujours JpaRepository car il offre le plus de fonctionnalités.",
      "hint": "Les trois héritent l'un de l'autre. Le plus complet est le plus utilisé en pratique."
    },
    {
      "id": "sb-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "Spring Data JPA",
        "query methods"
      ],
      "code": "public interface MembreRepository extends JpaRepository<Membre, Long> {\n    List<Membre> findByVilleOrderByNomAsc(String ville);\n}",
      "question": "Quelle requête SQL est générée automatiquement par Spring Data JPA ?",
      "options": [
        "SELECT * FROM membre WHERE ville = ? ORDER BY nom ASC",
        "SELECT * FROM membre ORDER BY nom ASC",
        "SELECT ville FROM membre ORDER BY nom ASC",
        "SELECT * FROM membre WHERE nom = ? ORDER BY ville ASC"
      ],
      "answer": 0,
      "explanation": "Spring Data JPA analyse le nom de la méthode : findBy + Ville → WHERE ville = ?, OrderBy + Nom + Asc → ORDER BY nom ASC. C'est une convention de nommage : chaque segment du nom de méthode correspond à une clause SQL.",
      "hint": "Spring Data JPA décompose le nom de la méthode : findBy[Champ], OrderBy[Champ][Direction]."
    },
    {
      "id": "sb-05",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "@OneToMany",
        "@ManyToOne",
        "relations JPA"
      ],
      "code": "// Un coach encadre plusieurs cours\n// Un cours est encadré par un seul coach\n\n@Entity\npublic class Coach {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String nom;\n    \n    @OneToMany(mappedBy = \"coach\")\n    private List<Cours> cours;\n}\n\n@Entity\npublic class Cours {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String intitule;\n    \n    ______\n    private Coach coach;\n}",
      "question": "Quelle annotation manque côté Cours ?",
      "options": [
        "@OneToMany",
        "@ManyToOne",
        "@OneToOne",
        "@ManyToMany"
      ],
      "answer": 1,
      "explanation": "Un Cours a UN seul Coach (@ManyToOne). Plusieurs Cours peuvent avoir le même Coach. C'est le côté 'many' de la relation. Le mappedBy = \"coach\" dans Coach indique que c'est le champ 'coach' dans Cours qui porte la clé étrangère.",
      "hint": "Du point de vue du Cours : PLUSIEURS cours → UN coach."
    },
    {
      "id": "sb-06",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "DTO"
      ],
      "code": "// Entity\n@Entity\npublic class Membre {\n    @Id private Long id;\n    private String nom;\n    private String email;\n    private String motDePasse; // sensible !\n    private String adresse;\n    @ManyToOne\n    private Abonnement abonnement;\n}\n\n// DTO\npublic class MembreDTO {\n    private Long id;\n    private String nom;\n    private String email;\n    private String typeAbonnement;\n}",
      "question": "Pourquoi utiliser un DTO plutôt que retourner directement l'Entity ?",
      "options": [
        "Pour des raisons de performance uniquement",
        "Pour ne pas exposer les données sensibles (mot de passe) et contrôler la forme de la réponse API",
        "Parce que JPA l'oblige",
        "Pour pouvoir utiliser @Autowired"
      ],
      "answer": 1,
      "explanation": "Le DTO (Data Transfer Object) sert à contrôler exactement quelles données sont exposées par l'API. Ici, le mot de passe et l'adresse ne sont pas dans le DTO. On a aussi aplati la relation Abonnement en un simple typeAbonnement. L'Entity est liée à la BDD, le DTO est lié à l'API.",
      "hint": "Comparez les champs de l'Entity et du DTO. Quels champs sont absents du DTO ?"
    },
    {
      "id": "sb-07",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "@Service",
        "injection"
      ],
      "code": "______\npublic class ProduitService {\n    \n    private final ProduitRepository produitRepository;\n    \n    public ProduitService(ProduitRepository produitRepository) {\n        this.produitRepository = produitRepository;\n    }\n    \n    public List<Produit> findAll() {\n        return produitRepository.findAll();\n    }\n    \n    public Produit findById(Long id) {\n        return produitRepository.findById(id)\n            .orElseThrow(() -> new RuntimeException(\"Produit introuvable\"));\n    }\n}",
      "question": "Quelle annotation manque au-dessus de la classe ?",
      "options": [
        "@Controller",
        "@Repository",
        "@Service",
        "@Entity"
      ],
      "answer": 2,
      "explanation": "@Service marque cette classe comme un bean de la couche métier. Spring la détecte automatiquement et peut l'injecter dans les contrôleurs. Le repository est injecté via le constructeur (injection par constructeur, recommandée par Spring).",
      "hint": "Cette classe contient la logique métier et fait le lien entre Controller et Repository."
    },
    {
      "id": "sb-08",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "@GetMapping",
        "@PathVariable"
      ],
      "code": "@RestController\n@RequestMapping(\"/api/animaux\")\npublic class AnimalController {\n    @Autowired\n    private AnimalService animalService;\n    \n    @GetMapping(\"/{id}\")\n    public AnimalDTO getById(@PathVariable Long id) {\n        return animalService.findById(id);\n    }\n    \n    @GetMapping\n    public List<AnimalDTO> getAll() {\n        return animalService.findAll();\n    }\n}",
      "question": "Quelle URL appeler pour récupérer l'animal avec l'id 42 ?",
      "options": [
        "GET /api/animaux/42",
        "GET /api/animaux?id=42",
        "GET /api/42/animaux",
        "POST /api/animaux/42"
      ],
      "answer": 0,
      "explanation": "@RequestMapping(\"/api/animaux\") définit le préfixe. @GetMapping(\"/{id}\") ajoute un segment dynamique. L'URL complète est /api/animaux/42. @PathVariable récupère la valeur 42 depuis l'URL.",
      "hint": "@PathVariable extrait la valeur depuis le chemin de l'URL, pas depuis les query parameters."
    },
    {
      "id": "sb-09",
      "type": "identify",
      "difficulty": "advanced",
      "concepts": [
        "@ManyToMany",
        "table de jointure"
      ],
      "code": "@Entity\npublic class Etudiant {\n    @Id @GeneratedValue\n    private Long id;\n    private String nom;\n    \n    @ManyToMany\n    @JoinTable(\n        name = \"inscription\",\n        joinColumns = @JoinColumn(name = \"etudiant_id\"),\n        inverseJoinColumns = @JoinColumn(name = \"matiere_id\")\n    )\n    private List<Matiere> matieres;\n}\n\n@Entity\npublic class Matiere {\n    @Id @GeneratedValue\n    private Long id;\n    private String intitule;\n    \n    @ManyToMany(mappedBy = \"matieres\")\n    private List<Etudiant> etudiants;\n}",
      "question": "Combien de tables sont créées en base de données ?",
      "options": [
        "2 (etudiant, matiere)",
        "3 (etudiant, matiere, inscription)",
        "4",
        "1"
      ],
      "answer": 1,
      "explanation": "@ManyToMany crée automatiquement une table de jointure. @JoinTable nomme cette table 'inscription' avec deux colonnes de clés étrangères. Résultat : 3 tables — etudiant, matiere, et inscription (la table pivot).",
      "hint": "Une relation Many-to-Many nécessite toujours une table intermédiaire pour stocker les associations."
    },
    {
      "id": "sb-10",
      "type": "debug",
      "difficulty": "advanced",
      "concepts": [
        "injection",
        "NullPointerException"
      ],
      "code": "@RestController\n@RequestMapping(\"/api/cours\")\npublic class CoursController {\n    \n    private CoursService coursService;\n    \n    @GetMapping\n    public List<CoursDTO> getAll() {\n        return coursService.findAll();\n    }\n}",
      "question": "Ce code compile mais provoque une erreur au runtime. Laquelle et pourquoi ?",
      "options": [
        "NullPointerException — coursService n'est jamais injecté (il manque @Autowired ou un constructeur)",
        "ClassCastException — CoursDTO n'est pas compatible",
        "404 Not Found — le mapping est incorrect",
        "Aucune erreur, ça fonctionne"
      ],
      "answer": 0,
      "explanation": "coursService est déclaré mais jamais injecté. Il manque soit @Autowired sur le champ, soit un constructeur qui prend CoursService en paramètre. Sans injection, coursService reste null et coursService.findAll() lève NullPointerException.",
      "hint": "Comparez avec les autres controllers : qu'ont-ils de plus au-dessus du champ Service ?"
    }
  ]
};
