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
        "3 entités (Cinéma, Film, Projeter)",
        "1 entité (Cinéma) et 2 associations",
        "2 entités et 0 association"
      ],
      "answer": 0,
      "explanation": "Cinéma et Film sont des entités (ils ont des attributs propres et existent indépendamment). Projeter est une association qui les relie. Une association modélise un lien entre entités, pas une entité à part entière.",
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
        "Professeur (0,N) : Enseigner : (0,N) Matière",
        "Professeur (1,1) : Enseigner : (1,N) Matière",
        "Professeur (0,1) : Enseigner : (1,1) Matière"
      ],
      "answer": 0,
      "explanation": "Un professeur enseigne UNE ou PLUSIEURS matières → minimum 1, maximum N → (1,N). Une matière est enseignée par UN SEUL professeur → minimum 1, maximum 1 → (1,1). La cardinalité se lit depuis l'entité vers l'association.",
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
        "On crée une 3ème table APPARTENIR",
        "La clé primaire de SALARIE migre comme clé étrangère dans SERVICE",
        "On fusionne les deux tables en une seule"
      ],
      "answer": 0,
      "explanation": "Règle MCD → MLD : dans une relation 1-N, la clé primaire du côté 1 (SERVICE) migre comme clé étrangère dans la table du côté N (SALARIE). Pas besoin de table de jointure. Le salarié a un champ id_service qui référence le service.",
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
        "2 tables : ETUDIANT (avec id_cours), COURS",
        "2 tables : ETUDIANT, COURS (avec id_etudiant)",
        "1 table unique avec tous les champs"
      ],
      "answer": 0,
      "explanation": "Règle MCD → MLD : une relation N-N crée TOUJOURS une table de jointure. Cette table contient les clés étrangères des deux entités + les attributs portés par l'association (ici date_inscription). C'est le seul moyen de représenter une relation many-to-many en relationnel.",
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
        "Option A : l'auto-incrément garantit l'unicité",
        "Les deux empêchent le doublon",
        "Aucune : il faut une contrainte UNIQUE séparée"
      ],
      "answer": 0,
      "explanation": "Avec une clé primaire composée (id_etudiant, id_cours), la BDD refuse d'insérer deux lignes avec le même couple. Avec un id auto-incrémenté, rien n'empêche le doublon (chaque ligne aurait un id différent même si étudiant et cours sont les mêmes). L'option A nécessiterait une contrainte UNIQUE supplémentaire.",
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
        "On crée une table HABITER",
        "On fusionne SALARIE et ADRESSE en une seule table",
        "On met la clé de SALARIE dans ADRESSE ET la clé de ADRESSE dans SALARIE"
      ],
      "answer": 0,
      "explanation": "Relation 1-1 : la clé d'une table migre dans l'autre comme clé étrangère. Pas de table de jointure. On choisit le côté le plus logique (ici id_adresse dans SALARIE, comme dans ton exo Spring Boot Entreprise). On pourrait aussi fusionner, mais garder deux tables est plus propre si les données sont indépendantes.",
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
        "Sur l'entité Lutin",
        "Sur l'entité Cadeau",
        "Dans une entité séparée DatePreparation"
      ],
      "answer": 0,
      "explanation": "La date de préparation dépend de QUEL lutin prépare QUEL cadeau — elle n'a de sens que pour un couple (lutin, cadeau) précis. Donc elle se place sur l'association, pas sur une entité. En MLD, elle sera une colonne de la table de jointure.",
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
        "Navire (1,1) : Occuper : (1,1) Emplacement",
        "Navire (0,1) : Occuper : (0,1) Emplacement",
        "Navire (1,N) : Occuper : (0,1) Emplacement"
      ],
      "answer": 0,
      "explanation": "Un navire peut occuper 0 ou N emplacements (au fil du temps, différentes dates). Un emplacement peut accueillir 0 ou N navires (au fil du temps). Le 'un seul à la fois' est une contrainte temporelle, pas une cardinalité — elle sera gérée par la logique applicative ou une contrainte SQL, pas par le MCD.",
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
        "Il manque une clé primaire",
        "Il y a trop de colonnes",
        "Aucun problème, c'est correct"
      ],
      "answer": 0,
      "explanation": "Les données client (nom, ville) sont dupliquées à chaque commande. Si Dupont déménage, il faut modifier TOUTES ses lignes (risque d'incohérence). La solution : une table CLIENT (id, nom, ville) et une clé étrangère id_client dans COMMANDE. C'est la normalisation (2NF/3NF).",
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
        "REFERENCE",
        "LINK TO",
        "CONNECT"
      ],
      "answer": 0,
      "explanation": "FOREIGN KEY (colonne) REFERENCES table(colonne) crée la contrainte de clé étrangère. La BDD vérifiera que chaque id_service dans salarie correspond à un id existant dans service. C'est la traduction SQL d'une relation du MLD.",
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
      "code": "MCD d'un système de réservation :\n- CLIENT (id, nom, email) — (0,N)\n- RESERVATION — avec attribut date_resa\n- CHAMBRE (id, numero, etage, prix) — (0,N)\n\nRelation N-N : un client peut réserver plusieurs chambres,\nune chambre peut être réservée par plusieurs clients.",
      "question": "Quel MLD est correct ?",
      "options": [
        "3 tables : CLIENT, CHAMBRE, RESERVATION (id_client FK, id_chambre FK, date_resa)",
        "2 tables : CLIENT (avec id_chambre), CHAMBRE",
        "2 tables : CLIENT, CHAMBRE (avec id_client et date_resa)",
        "4 tables : CLIENT, CHAMBRE, RESERVATION, DATE"
      ],
      "answer": 0,
      "explanation": "N-N → table de jointure RESERVATION avec les FK des deux entités + l'attribut date_resa. C'est le même pattern que l'exercice du Père Noël (enfant-cadeau), du port de plaisance (navire-emplacement) et de Spring Boot Entreprise (salarié-projet) de ta formation.",
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
        "3 entités séparées sans lien entre elles",
        "Une seule entité ANIMAL avec tous les champs (beaucoup de NULL)",
        "3 associations entre ANIMAL et chaque type"
      ],
      "answer": 0,
      "explanation": "C'est de l'héritage en MCD (spécialisation/généralisation). ANIMAL porte les attributs communs, chaque sous-entité porte ses attributs spécifiques. En MLD, on a le choix : une table par sous-entité (avec les attributs hérités dupliqués), ou une table unique avec des NULL, ou 4 tables avec FK. Le choix dépend des requêtes prévues.",
      "hint": "Quand des entités partagent des attributs communs mais ont aussi des attributs propres, c'est de l'héritage."
    }
  ]
};
