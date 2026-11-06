export default {
  "domain": "spring-boot",
  "title": "Spring Boot / JPA",
  "exercises": [
    {
      "id": "sb-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "architecture 3-tiers"
      ],
      "code": "@RestController\n@RequestMapping(\"/api/cours\")\npublic class CoursController {\n    private final CoursService coursService;\n\n    public CoursController(CoursService coursService) {\n        this.coursService = coursService;\n    }\n    \n    @GetMapping\n    public List<CoursDTO> getAll() {\n        return coursService.findAll();\n    }\n}",
      "question": "À quelle couche de l'architecture 3-tiers appartient ce code ?",
      "options": [
        "Couche Métier (Service)",
        "Couche Données (Repository)",
        "Couche Présentation (Controller)",
        "Couche Modèle (Entity)"
      ],
      "answer": 2,
      "explanation": "Les annotations @RestController et @RequestMapping indiquent que c'est un contrôleur REST. C'est la couche Présentation : elle reçoit les requêtes HTTP et délègue le traitement au Service, sans contenir de logique métier. Injecter CoursService ne fait pas de cette classe un Service : elle se contente de l'appeler. Elle n'accède pas non plus à la base : ce dialogue est le rôle du Repository. Et CoursDTO n'est pas une Entity : un DTO appartient au contrat de l'API, pas au modèle persistant.",
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
        "@MappedSuperclass",
        "@Entity",
        "@Repository",
        "@Embeddable"
      ],
      "answer": 1,
      "explanation": "@Entity indique à JPA que cette classe correspond à une table en base de données ; sans elle, Produit n'est pas mappé et @Table(name = \"produit\") est ignoré. @MappedSuperclass partage des mappings avec des classes filles mais ne crée aucune table pour la classe elle-même. @Embeddable décrit un composant destiné à être intégré dans une autre entité, sans table propre ni @Id. @Repository est un stéréotype Spring de la couche d'accès aux données : il déclare un bean, pas un mapping JPA.",
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
        "CrudRepository uniquement : c'est l'interface que Spring Data exige pour générer l'implémentation",
        "JpaRepository uniquement : les deux autres ne prennent pas en charge les query methods dérivées",
        "Repository uniquement : les interfaces qui en héritent ne sont pas détectées par le scan de Spring",
        "Les trois fonctionnent : Spring Data accepte toute interface qui hérite de Repository"
      ],
      "answer": 3,
      "explanation": "Spring Data génère l'implémentation de toute interface qui hérite de Repository, directement ou non : les trois conviennent, et on choisit JpaRepository parce qu'il est le plus complet. Depuis Spring Data 3 (Spring Boot 3), JpaRepository étend ListCrudRepository et ListPagingAndSortingRepository : il apporte le CRUD avec des List, la pagination, le tri et des méthodes JPA comme flush() ou deleteAllInBatch(). Attention, PagingAndSortingRepository n'étend plus CrudRepository depuis cette version. Spring Data n'exige pas CrudRepository en particulier. Les query methods dérivées comme findByPrixGreaterThan fonctionnent dès l'interface marqueur Repository, pas seulement avec JpaRepository. Et le scan détecte toute interface qui étend Repository, directement ou par héritage.",
      "hint": "Spring Data génère l'implémentation de toute interface qui hérite de Repository. Qu'apporte chaque niveau en plus ?"
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
        "SELECT nom FROM membre WHERE ville = ? ORDER BY nom ASC",
        "SELECT * FROM membre WHERE ville LIKE ? ORDER BY nom ASC",
        "SELECT * FROM membre WHERE nom = ? ORDER BY ville ASC"
      ],
      "answer": 0,
      "explanation": "Spring Data JPA décompose le nom de la méthode : findBy + Ville donne WHERE ville = ?, OrderBy + Nom + Asc donne ORDER BY nom ASC. La méthode renvoie des entités Membre complètes, donc SELECT * : il n'y a pas de projection sur la seule colonne nom. L'égalité stricte est utilisée : LIKE ne serait généré qu'avec un mot-clé comme Containing ou StartingWith. Enfin, ville sert de filtre et nom de critère de tri, pas l'inverse : chaque segment du nom de méthode a une position précise.",
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
        "@JoinColumn(name = \"coach_id\")",
        "@ManyToMany"
      ],
      "answer": 1,
      "explanation": "Un Cours a UN seul Coach : c'est le côté 'many' de la relation, donc @ManyToOne. Le mappedBy = \"coach\" dans Coach indique que le champ 'coach' de Cours porte la clé étrangère. @OneToMany décrirait la relation inverse et s'applique à une collection, pas à un champ Coach simple. @JoinColumn seul ne définit aucune cardinalité : il ne fait que nommer la colonne de jointure, en complément d'une annotation de relation. @ManyToMany supposerait qu'un cours ait plusieurs coachs et créerait une table de jointure, ce qui contredit l'énoncé.",
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
        "Pour éviter les LazyInitializationException, seul problème que pose le renvoi direct d'une Entity",
        "Pour ne pas exposer les données sensibles comme le mot de passe et contrôler la forme de la réponse API",
        "Parce que Jackson ne sait pas sérialiser en JSON une Entity qui contient une relation @ManyToOne",
        "Pour que Hibernate cesse de suivre en base les modifications de l'objet renvoyé au client"
      ],
      "answer": 1,
      "explanation": "Le DTO (Data Transfer Object) sert à contrôler exactement ce que l'API expose : ici le mot de passe et l'adresse disparaissent, et la relation Abonnement est aplatie en typeAbonnement. L'Entity est liée à la BDD, le DTO au contrat de l'API. Les LazyInitializationException sont un argument réel mais pas le seul : la fuite de données sensibles est le risque principal. Jackson sait sérialiser une Entity avec ses relations, au risque justement d'exposer trop de champs, voire de boucler. Et le dirty checking d'Hibernate s'arrête avec la fermeture du contexte de persistance, DTO ou pas.",
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
        "@Bean",
        "@Repository",
        "@Service",
        "@Configuration"
      ],
      "answer": 2,
      "explanation": "@Service marque cette classe comme un bean de la couche métier : Spring la détecte au scan et peut l'injecter dans les contrôleurs ; le repository lui est fourni par injection par constructeur, la forme recommandée. @Bean ne se pose pas sur une classe : il déclare un bean via une méthode d'une classe de configuration. @Repository est le stéréotype de la couche d'accès aux données : ici c'est ProduitRepository qui joue ce rôle. @Configuration désigne une classe qui déclare des beans, pas un composant métier.",
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
      "code": "@RestController\n@RequestMapping(\"/api/animaux\")\npublic class AnimalController {\n    private final AnimalService animalService;\n\n    public AnimalController(AnimalService animalService) {\n        this.animalService = animalService;\n    }\n    \n    @GetMapping(\"/{id}\")\n    public AnimalDTO getById(@PathVariable Long id) {\n        return animalService.findById(id);\n    }\n    \n    @GetMapping\n    public List<AnimalDTO> getAll() {\n        return animalService.findAll();\n    }\n}",
      "question": "Quelle URL appeler pour récupérer l'animal avec l'id 42 ?",
      "options": [
        "GET /api/animaux/42",
        "GET /api/animaux?id=42",
        "GET /api/animaux/id/42",
        "GET /api/animaux/{42}"
      ],
      "answer": 0,
      "explanation": "@RequestMapping(\"/api/animaux\") définit le préfixe et @GetMapping(\"/{id}\") ajoute un segment dynamique : l'URL complète est /api/animaux/42, où @PathVariable récupère la valeur 42. La forme ?id=42 correspondrait à un paramètre lu avec @RequestParam, pas à une variable de chemin. Le nom de la variable n'apparaît pas dans l'URL : /api/animaux/id/42 ne correspond à aucun mapping déclaré. Quant aux accolades de {id}, elles n'existent que dans le gabarit côté serveur : le client ne les envoie jamais.",
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
      "code": "@Entity\npublic class Etudiant {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String nom;\n    \n    @ManyToMany\n    @JoinTable(\n        name = \"inscription\",\n        joinColumns = @JoinColumn(name = \"etudiant_id\"),\n        inverseJoinColumns = @JoinColumn(name = \"matiere_id\")\n    )\n    private List<Matiere> matieres;\n}\n\n@Entity\npublic class Matiere {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String intitule;\n    \n    @ManyToMany(mappedBy = \"matieres\")\n    private List<Etudiant> etudiants;\n}",
      "question": "Combien de tables sont créées en base de données ?",
      "options": [
        "2 (etudiant, matiere)",
        "3 (etudiant, matiere, inscription)",
        "3 (etudiant, matiere, etudiant_matiere)",
        "4 (etudiant, matiere, inscription, matiere_etudiant)"
      ],
      "answer": 1,
      "explanation": "@ManyToMany nécessite une table de jointure, et @JoinTable la nomme explicitement 'inscription' avec les clés étrangères etudiant_id et matiere_id : donc 3 tables. Deux tables ne suffiraient pas : une simple clé étrangère ne peut pas représenter du plusieurs-à-plusieurs. Le nom par défaut etudiant_matiere ne s'applique pas ici, puisque @JoinTable l'a remplacé par 'inscription'. Et le mappedBy = \"matieres\" côté Matiere désigne la relation déjà déclarée au lieu d'en créer une seconde : aucune quatrième table n'est générée. Remarque : la stratégie IDENTITY compte ici. Avec un @GeneratedValue sans stratégie, Hibernate 6 utilise des séquences ; sur MySQL, qui n'en a pas, il les simule par des tables etudiant_seq et matiere_seq, soit 5 tables au total.",
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
        "NullPointerException au premier appel : rien n'injecte coursService et il reste null",
        "UnsatisfiedDependencyException au démarrage : Spring ne trouve pas de bean CoursService à injecter",
        "NoSuchBeanDefinitionException au premier appel : le bean CoursService n'est instancié que paresseusement",
        "Aucune erreur : Spring injecte automatiquement tout champ dont le type correspond à un bean du contexte"
      ],
      "answer": 0,
      "explanation": "Sans @Autowired ni constructeur, Spring ne considère pas coursService comme un point d'injection : le champ reste null et coursService.findAll() lève une NullPointerException au premier appel HTTP. UnsatisfiedDependencyException supposerait une injection déclarée mais impossible à satisfaire : ici rien n'est déclaré, donc le démarrage se passe sans erreur. NoSuchBeanDefinitionException viendrait d'une recherche explicite d'un bean absent du contexte, pas d'un champ ignoré. Et l'injection par type n'est jamais automatique sur un champ nu : il faut @Autowired, @Inject ou l'injection par constructeur.",
      "hint": "Comment les autres controllers reçoivent-ils leur Service ? Ici, qui donne une valeur au champ coursService ?"
    },
    {
      "id": "sb-11",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "JPA",
        "LAZY",
        "problème N+1",
        "JOIN FETCH"
      ],
      "code": "@Entity\npublic class Commande {\n    @Id private Long id;\n    @ManyToOne(fetch = FetchType.LAZY)\n    private Client client;\n    // getters\n}\n\n// dans un service, avec 100 commandes en base\nList<Commande> commandes = commandeRepository.findAll();\nfor (Commande c : commandes) {\n    System.out.println(c.getClient().getNom());\n}",
      "question": "Combien de requêtes SQL ce code envoie-t-il, si les 100 commandes ont 100 clients différents ?",
      "options": [
        "1 requête, grâce à la jointure faite par findAll()",
        "2 requêtes : une pour les commandes, une pour tous les clients",
        "100 requêtes : une par commande, pour charger son client",
        "101 requêtes : une pour les commandes, puis une par client"
      ],
      "answer": 3,
      "explanation": "findAll() charge les 100 commandes en une requête. Avec fetch = LAZY, chaque client n'est chargé qu'au premier accès : c.getClient().getNom() déclenche une requête par commande, soit 1 + 100 = 101. C'est le problème N+1. On le corrige en chargeant les clients avec les commandes : une requête @Query avec JOIN FETCH, ou @EntityGraph(attributePaths = \"client\") sur la méthode du Repository. findAll() ne fait aucune jointure automatique, et Hibernate ne regroupe pas tout seul les clients en une requête sans configuration (batch fetching).",
      "hint": "LAZY : quand le client est-il réellement chargé ? Comptez la requête de départ, puis celles déclenchées dans la boucle."
    }
  ]
};
