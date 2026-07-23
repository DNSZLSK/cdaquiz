export default {
  "domain": "mcd-mld",
  "title": "MCD / MLD",
  "exercises": [
    {
      "id": "mcd-01",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "entité vs association"
      ],
      "code": "Un cinéma projette des films.\nChaque film a un titre, une durée et un genre.\nChaque cinéma a un nom et une adresse.\nUn cinéma peut projeter plusieurs films.\nUn film peut être projeté dans plusieurs cinémas.",
      "question": "Combien d'entités et d'associations dans ce MCD ?",
      "options": [
        "2 entités (Cinéma, Film) et 1 association (Projeter)",
        "3 entités (Cinéma, Film, Projeter) et 0 association",
        "2 entités (Cinéma, Film) et 2 associations (Projeter, EtreProjete)",
        "3 entités (Cinéma, Film, Projection) et 2 associations"
      ],
      "answer": 0,
      "explanation": "Cinéma et Film sont des entités (attributs propres, existence autonome) et Projeter est l'association qui les relie. Faire de Projeter une troisième entité confond MCD et MLD : c'est seulement au passage en relationnel que ce lien N-N deviendra une table. Il n'y a pas deux associations : 'projeter' et 'être projeté' sont les deux sens de lecture d'un seul et même lien. Et rien ne justifie une entité Projection : l'énoncé ne lui donne aucun attribut propre (date, salle, horaire).",
      "hint": "Une entité = quelque chose qui EXISTE avec ses propres attributs. Une association = un LIEN entre entités."
    },
    {
      "id": "mcd-02",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "cardinalités"
      ],
      "code": "Règles métier :\n- Un professeur enseigne une ou plusieurs matières\n- Une matière est enseignée par un seul professeur",
      "question": "Quelles sont les cardinalités ?",
      "options": [
        "Professeur (1,N) : Enseigner : (1,1) Matière",
        "Professeur (1,1) : Enseigner : (1,N) Matière",
        "Professeur (1,N) : Enseigner : (0,1) Matière",
        "Professeur (0,N) : Enseigner : (1,1) Matière"
      ],
      "answer": 0,
      "explanation": "Un professeur enseigne UNE ou PLUSIEURS matières, donc (1,N) ; une matière est enseignée par UN SEUL professeur, donc (1,1). La cardinalité se lit depuis l'entité vers l'association. La version (1,1)/(1,N) inverse les deux côtés : c'est l'erreur classique de sens de lecture. (0,1) côté Matière supposerait qu'une matière puisse n'avoir aucun professeur, ce que la règle exclut. Et (0,N) côté Professeur autoriserait un professeur sans aucune matière, alors que 'une ou plusieurs' impose un minimum de 1.",
      "hint": "(min, max). 'une ou plusieurs' = (1,N). 'un seul' = (1,1). 'zéro ou plusieurs' = (0,N)."
    },
    {
      "id": "mcd-03",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "MCD vers MLD",
        "relation 1-N"
      ],
      "code": "MCD :\n- Entité SERVICE (id, nom_service)\n- Entité SALARIE (id, nom, prenom)\n- Association APPARTENIR\n- Cardinalités : un salarié appartient à un seul service (1,1),\n  un service a zéro ou plusieurs salariés (0,N)",
      "question": "Comment se traduit cette association en MLD (tables) ?",
      "options": [
        "La clé primaire de SERVICE migre comme clé étrangère dans SALARIE",
        "La clé primaire de SALARIE migre comme clé étrangère dans SERVICE",
        "On crée une table de jointure APPARTENIR (id_salarie, id_service)",
        "La clé de SERVICE migre dans SALARIE avec une contrainte UNIQUE sur la FK"
      ],
      "answer": 0,
      "explanation": "Règle MCD vers MLD : dans une relation 1-N, la clé primaire du côté 1 (SERVICE) migre comme clé étrangère dans la table du côté N (SALARIE) : le salarié reçoit un champ id_service. Le sens inverse mettrait un id_salarie dans SERVICE, ce qui limiterait chaque service à un seul salarié. La table de jointure APPARTENIR n'est requise que pour une relation N-N, pas ici. Quant à la contrainte UNIQUE sur la FK, c'est la traduction d'une relation 1-1 : elle interdirait à deux salariés d'appartenir au même service.",
      "hint": "Relation 1-N = la clé du côté 1 va dans la table du côté N. Pas de table intermédiaire."
    },
    {
      "id": "mcd-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "MCD vers MLD",
        "relation N-N"
      ],
      "code": "MCD :\n- Entité ETUDIANT (id, nom)\n- Entité COURS (id, intitule)\n- Association INSCRIRE avec attribut 'date_inscription'\n- Cardinalités : un étudiant s'inscrit à 0 ou N cours (0,N),\n  un cours a 0 ou N étudiants inscrits (0,N)",
      "question": "Comment se traduit cette association en MLD ?",
      "options": [
        "3 tables : ETUDIANT, COURS, INSCRIPTION (avec id_etudiant, id_cours, date_inscription)",
        "2 tables : ETUDIANT (avec id_cours et date_inscription), COURS",
        "3 tables : ETUDIANT (avec date_inscription), COURS, INSCRIPTION (id_etudiant, id_cours)",
        "4 tables : ETUDIANT, COURS, INSCRIPTION et DATE_INSCRIPTION"
      ],
      "answer": 0,
      "explanation": "Une relation N-N crée toujours une table de jointure contenant les clés étrangères des deux entités plus les attributs portés par l'association (ici date_inscription). Placer id_cours et date_inscription dans ETUDIANT applique à tort la règle du 1-N et limiterait chaque étudiant à un seul cours. Mettre date_inscription dans ETUDIANT ne convient pas non plus : la date dépend du couple (étudiant, cours), un étudiant inscrit à deux cours aurait deux dates. Enfin, une quatrième table DATE_INSCRIPTION transformerait un simple attribut en entité, sans aucune donnée propre pour le justifier.",
      "hint": "Relation N-N = table de jointure obligatoire. Les attributs de l'association vont dans cette table."
    },
    {
      "id": "mcd-05",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "clé primaire composée"
      ],
      "code": "Table INSCRIPTION :\n- id_etudiant (FK → ETUDIANT)\n- id_cours (FK → COURS)\n- date_inscription\n\nOption A : clé primaire = id auto-incrémenté\nOption B : clé primaire composée = (id_etudiant, id_cours)",
      "question": "Quelle option empêche un étudiant de s'inscrire deux fois au même cours ?",
      "options": [
        "Option B : la clé composée interdit le doublon (id_etudiant, id_cours)",
        "Option A : chaque inscription reçoit un id unique, donc pas de doublon possible",
        "Les deux : toute clé primaire empêche par définition les lignes en double",
        "Aucune : il faut de toute façon ajouter une contrainte UNIQUE séparée"
      ],
      "answer": 0,
      "explanation": "Avec la clé primaire composée (id_etudiant, id_cours), la BDD refuse deux lignes portant le même couple : le doublon est impossible. L'auto-incrément de l'option A garantit seulement que chaque ligne a un id différent : deux inscriptions identiques recevraient les id 7 et 8 sans la moindre erreur. Une clé primaire n'empêche donc pas 'par définition' les doublons métier : tout dépend des colonnes qui la composent. Et la contrainte UNIQUE séparée n'est nécessaire qu'avec l'option A ; avec la clé composée de l'option B, elle serait redondante.",
      "hint": "La clé primaire garantit l'unicité. Composée, elle garantit l'unicité de la COMBINAISON."
    },
    {
      "id": "mcd-06",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "MCD vers MLD",
        "relation 1-1"
      ],
      "code": "MCD :\n- Entité SALARIE (id, nom, prenom)\n- Entité ADRESSE (id, rue, ville, code_postal)\n- Association HABITER\n- Cardinalités : un salarié a une seule adresse (1,1),\n  une adresse correspond à un seul salarié (1,1)",
      "question": "Comment se traduit cette relation 1-1 en MLD ?",
      "options": [
        "La clé de ADRESSE migre dans SALARIE (ou l'inverse), pas de table de jointure",
        "On crée une table de jointure HABITER (id_salarie, id_adresse)",
        "On place une FK dans chaque table : id_adresse dans SALARIE et id_salarie dans ADRESSE",
        "On fusionne obligatoirement les deux entités en une seule table"
      ],
      "answer": 0,
      "explanation": "Relation 1-1 : la clé d'une table migre dans l'autre comme clé étrangère (idéalement avec une contrainte UNIQUE), sans table de jointure. La table HABITER applique la règle du N-N : elle fonctionnerait, mais ajoute une table et des jointures inutiles pour un lien 1-1. Placer une FK dans chaque table crée une référence circulaire redondante : les deux liens pourraient diverger et se contredire. Quant à la fusion en une seule table, c'est une option envisageable mais jamais obligatoire : on garde deux tables quand les données sont logiquement indépendantes.",
      "hint": "1-1 = clé étrangère d'un côté, comme une 1-N mais avec une contrainte UNIQUE sur la FK."
    },
    {
      "id": "mcd-07",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "attribut sur association"
      ],
      "code": "Un lutin prépare des cadeaux.\nLorsqu'un lutin termine un cadeau, on enregistre la date de fin de préparation.\nPlusieurs lutins peuvent préparer le même type de cadeau.\nUn lutin peut préparer plusieurs cadeaux.",
      "question": "Où se place l'attribut 'date de préparation' dans le MCD ?",
      "options": [
        "Sur l'association PREPARER (entre Lutin et Cadeau)",
        "Sur l'entité Cadeau, puisque c'est le cadeau qui est terminé",
        "Sur l'entité Lutin, puisque c'est lui qui effectue la préparation",
        "Dans une entité faible DATE_PREPARATION reliée aux deux entités"
      ],
      "answer": 0,
      "explanation": "La date de préparation dépend de QUEL lutin prépare QUEL cadeau : elle n'a de sens que pour un couple (lutin, cadeau) précis, donc elle se place sur l'association et deviendra une colonne de la table de jointure en MLD. Sur Cadeau, il n'y aurait qu'une date par cadeau alors que plusieurs lutins peuvent préparer le même type de cadeau. Sur Lutin, un lutin qui prépare plusieurs cadeaux ne pourrait stocker qu'une seule date. Et une entité faible DATE_PREPARATION est injustifiée : une date isolée n'a ni identifiant ni attributs propres, ce n'est pas une entité.",
      "hint": "Si un attribut dépend du LIEN entre deux entités (pas d'une entité seule), il va sur l'association."
    },
    {
      "id": "mcd-08",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "cardinalités",
        "règles métier"
      ],
      "code": "Règles métier d'un port de plaisance :\n- Un emplacement peut accueillir un seul navire à la fois\n- Un navire peut être stationné sur un emplacement ou aucun\n- On enregistre les dates d'occupation",
      "question": "Quelles cardinalités pour l'association OCCUPER entre NAVIRE et EMPLACEMENT ?",
      "options": [
        "Navire (0,N) : Occuper : (0,N) Emplacement (avec dates sur l'association)",
        "Navire (0,1) : Occuper : (0,1) Emplacement (occupation facultative des deux côtés)",
        "Navire (0,1) : Occuper : (1,1) Emplacement (un emplacement est toujours occupé)",
        "Navire (0,N) : Occuper : (0,1) Emplacement (avec dates sur l'entité NAVIRE)"
      ],
      "answer": 0,
      "explanation": "Sur la durée de vie du système, un navire occupe 0 ou N emplacements (au fil de ses séjours) et un emplacement accueille 0 ou N navires : d'où (0,N) des deux côtés, avec les dates portées par l'association. Le 'un seul à la fois' est une contrainte temporelle, gérée par l'applicatif ou une contrainte SQL, pas par les cardinalités. La lecture (0,1)/(0,1) photographie la situation à un instant T alors que le MCD compte toutes les occurrences dans le temps ; la version (0,1)/(1,1) y ajoute un emplacement toujours occupé, ce que la règle n'impose pas. Et (0,N)/(0,1) mélange les deux lectures : si l'historique compte d'un côté, il compte des deux, et les dates dépendent du couple, pas du seul navire.",
      "hint": "Les cardinalités en MCD considèrent TOUTES les occurrences dans le temps, pas seulement à un instant T."
    },
    {
      "id": "mcd-09",
      "type": "identify",
      "difficulty": "advanced",
      "concepts": [
        "formes normales",
        "redondance"
      ],
      "code": "Table COMMANDE :\n| id | client_nom | client_ville | produit | quantite |\n| 1  | Dupont     | Paris        | Chaise  | 3        |\n| 2  | Dupont     | Paris        | Table   | 1        |\n| 3  | Martin     | Lyon         | Chaise  | 5        |",
      "question": "Quel problème de conception présente cette table ?",
      "options": [
        "Redondance : client_nom et client_ville sont répétés : il faut une table CLIENT séparée",
        "Violation de la 1NF : client_nom et client_ville sont des attributs multivalués",
        "La clé primaire devrait être composée (client_nom, produit) au lieu de id",
        "Dépendance transitive : quantite dépend de produit et doit migrer dans une autre table"
      ],
      "answer": 0,
      "explanation": "Les données client (nom, ville) sont dupliquées à chaque commande : si Dupont déménage, il faut modifier toutes ses lignes, avec un risque d'incohérence. La solution : une table CLIENT (id, nom, ville) référencée par une FK id_client dans COMMANDE, c'est la normalisation (2NF/3NF). Il n'y a pas de violation de la 1NF : chaque case contient une valeur atomique, aucun attribut multivalué. La clé composée (client_nom, produit) serait une mauvaise idée : elle empêcherait un client de recommander le même produit, et id joue déjà correctement son rôle de clé primaire. Enfin quantite dépend de la commande elle-même, pas de produit : il n'y a pas de dépendance transitive à extraire.",
      "hint": "Si une donnée est identique sur plusieurs lignes, c'est un signe de redondance à normaliser."
    },
    {
      "id": "mcd-10",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "clé étrangère",
        "SQL"
      ],
      "code": "CREATE TABLE service (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nom_service VARCHAR(100)\n);\n\nCREATE TABLE salarie (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nom VARCHAR(100),\n    prenom VARCHAR(100),\n    id_service INT,\n    ______ (id_service) REFERENCES service(id)\n);",
      "question": "Quel mot-clé SQL déclare une clé étrangère ?",
      "options": [
        "FOREIGN KEY",
        "REFERENCES",
        "CONSTRAINT",
        "CHECK"
      ],
      "answer": 0,
      "explanation": "FOREIGN KEY (colonne) REFERENCES table(colonne) crée la contrainte de clé étrangère : la BDD vérifiera que chaque id_service de salarie correspond à un id existant dans service. REFERENCES existe bien mais désigne la table cible, il apparaît d'ailleurs déjà plus loin sur la même ligne. CONSTRAINT sert uniquement à nommer une contrainte et doit être suivi de FOREIGN KEY (CONSTRAINT fk_service FOREIGN KEY ...). CHECK, lui, vérifie une condition sur les valeurs d'une ligne, pas un lien d'intégrité référentielle entre deux tables.",
      "hint": "Le mot-clé en deux mots qui signifie 'clé étrangère' en anglais."
    },
    {
      "id": "mcd-11",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "MCD complet",
        "règles de transformation"
      ],
      "code": "MCD d'un système de réservation :\n- CLIENT (id, nom, email) -- (0,N)\n- RESERVATION -- avec attribut date_resa\n- CHAMBRE (id, numero, etage, prix) -- (0,N)\n\nRelation N-N : un client peut réserver plusieurs chambres,\nune chambre peut être réservée par plusieurs clients.",
      "question": "Quel MLD est correct ?",
      "options": [
        "3 tables : CLIENT, CHAMBRE, RESERVATION (id_client FK, id_chambre FK, date_resa)",
        "2 tables : CLIENT, CHAMBRE (avec id_client FK et date_resa)",
        "3 tables : CLIENT (avec date_resa), CHAMBRE, RESERVATION (id_client FK, id_chambre FK)",
        "3 tables : CLIENT, CHAMBRE, RESERVATION (id_resa auto-incrémenté, date_resa, sans FK)"
      ],
      "answer": 0,
      "explanation": "N-N donne une table de jointure RESERVATION portant les FK des deux entités plus l'attribut de l'association (date_resa) : c'est le pattern universel du many-to-many, le même que pour enfant-cadeau, navire-emplacement ou salarié-projet. Deux tables avec id_client dans CHAMBRE appliqueraient la règle du 1-N : chaque chambre ne pourrait être réservée que par un seul client. Placer date_resa dans CLIENT est incorrect : la date dépend du couple (client, chambre), pas du client seul. Et une table RESERVATION sans clés étrangères ne relie plus rien : sans id_client ni id_chambre, impossible de savoir qui a réservé quelle chambre.",
      "hint": "Règle universelle : N-N = 3 tables. Les attributs de l'association vont dans la table du milieu."
    },
    {
      "id": "mcd-12",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "héritage en MCD"
      ],
      "code": "Dans un parc animalier :\n- Tous les animaux ont un nom, un age et un poids\n- Les mammifères ont en plus une période de gestation\n- Les oiseaux ont en plus une envergure\n- Les reptiles ont en plus un type d'écailles",
      "question": "Comment modéliser ça en MCD ?",
      "options": [
        "Une entité parente ANIMAL et 3 sous-entités (MAMMIFERE, OISEAU, REPTILE) en héritage",
        "Une seule entité ANIMAL avec un attribut discriminant et tous les attributs spécifiques",
        "3 entités MAMMIFERE, OISEAU, REPTILE portant chacune nom, age et poids",
        "Une entité ANIMAL reliée à une entité TYPE_ANIMAL qui porte les attributs spécifiques"
      ],
      "answer": 0,
      "explanation": "C'est de l'héritage en MCD (spécialisation/généralisation) : ANIMAL porte les attributs communs, chaque sous-entité porte ses attributs spécifiques. En MLD, on choisira ensuite entre table unique avec NULL, une table par sous-type ou 4 tables avec FK, selon les requêtes prévues. L'entité unique avec discriminant correspond justement à l'une de ces implémentations MLD, pas à la modélisation conceptuelle : au niveau MCD elle mélange tous les attributs. Trois entités indépendantes dupliqueraient nom, age et poids et feraient perdre la généralisation. Et une entité TYPE_ANIMAL reliée par association ne fonctionne pas : une entité a une structure fixe, elle ne peut pas porter une période de gestation pour l'un et une envergure pour l'autre.",
      "hint": "Quand des entités partagent des attributs communs mais ont aussi des attributs propres, c'est de l'héritage."
    }
  ]
};
