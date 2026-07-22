export default {
  "domain": "sql",
  "title": "SQL Lab",
  "scenarios": [
    {
      "id": "festival-breizh-rock",
      "title": "Festival Breizh Rock",
      "description": "Vous êtes bénévole au festival Breizh Rock de Paimpol. On vous a confié la base de données du festival. À vous de répondre aux demandes de l'équipe d'organisation !",
      "difficulty": "beginner",
      "schema": {
        "tables": [
          {
            "name": "scene",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "nom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "capacite",
                "type": "INTEGER NOT NULL"
              },
              {
                "name": "couverte",
                "type": "BOOLEAN NOT NULL DEFAULT 0"
              }
            ]
          },
          {
            "name": "artiste",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "nom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "genre",
                "type": "VARCHAR(50)"
              },
              {
                "name": "origine",
                "type": "VARCHAR(50)"
              },
              {
                "name": "cachet",
                "type": "DECIMAL(10,2)"
              }
            ]
          },
          {
            "name": "concert",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "id_artiste",
                "type": "INTEGER REFERENCES artiste(id)"
              },
              {
                "name": "id_scene",
                "type": "INTEGER REFERENCES scene(id)"
              },
              {
                "name": "jour",
                "type": "VARCHAR(10) NOT NULL"
              },
              {
                "name": "heure_debut",
                "type": "INTEGER NOT NULL"
              },
              {
                "name": "heure_fin",
                "type": "INTEGER NOT NULL"
              }
            ]
          },
          {
            "name": "benevole",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "nom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "prenom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "age",
                "type": "INTEGER"
              },
              {
                "name": "ville",
                "type": "VARCHAR(100)"
              },
              {
                "name": "telephone",
                "type": "VARCHAR(15)"
              }
            ]
          },
          {
            "name": "affectation",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "id_benevole",
                "type": "INTEGER REFERENCES benevole(id)"
              },
              {
                "name": "id_scene",
                "type": "INTEGER REFERENCES scene(id)"
              },
              {
                "name": "jour",
                "type": "VARCHAR(10) NOT NULL"
              },
              {
                "name": "poste",
                "type": "VARCHAR(50) NOT NULL"
              }
            ]
          }
        ],
        "seed_sql": "CREATE TABLE scene (id INTEGER PRIMARY KEY, nom VARCHAR(100) NOT NULL, capacite INTEGER NOT NULL, couverte BOOLEAN NOT NULL DEFAULT 0); CREATE TABLE artiste (id INTEGER PRIMARY KEY, nom VARCHAR(100) NOT NULL, genre VARCHAR(50), origine VARCHAR(50), cachet DECIMAL(10,2)); CREATE TABLE concert (id INTEGER PRIMARY KEY, id_artiste INTEGER REFERENCES artiste(id), id_scene INTEGER REFERENCES scene(id), jour VARCHAR(10) NOT NULL, heure_debut INTEGER NOT NULL, heure_fin INTEGER NOT NULL); CREATE TABLE benevole (id INTEGER PRIMARY KEY, nom VARCHAR(100) NOT NULL, prenom VARCHAR(100) NOT NULL, age INTEGER, ville VARCHAR(100), telephone VARCHAR(15)); CREATE TABLE affectation (id INTEGER PRIMARY KEY, id_benevole INTEGER REFERENCES benevole(id), id_scene INTEGER REFERENCES scene(id), jour VARCHAR(10) NOT NULL, poste VARCHAR(50) NOT NULL); INSERT INTO scene VALUES (1, 'Maen Braz', 5000, 0), (2, 'Ty Fest', 1200, 1), (3, 'Ar Mor', 800, 0), (4, 'Korrigan', 300, 1); INSERT INTO artiste VALUES (1, 'Soldat Louis', 'rock breton', 'Bretagne', 15000.00), (2, 'Matmatah', 'rock alternatif', 'Bretagne', 22000.00), (3, 'Denez Prigent', 'electro-trad', 'Bretagne', 12000.00), (4, 'The Celtic Tramps', 'punk breton', 'Bretagne', 5000.00), (5, 'Red Cardell', 'rock blues', 'Bretagne', 8000.00), (6, 'Sonerien Du', 'fest-noz', 'Bretagne', 3500.00), (7, 'EV', 'chanson', 'Bretagne', 18000.00), (8, 'Hamon Martin Quintet', 'fest-noz', 'Bretagne', 6000.00), (9, 'Les Ramoneurs de Menhirs', 'punk breton', 'Bretagne', 9000.00), (10, 'Dan Ar Braz', 'folk celtique', 'Bretagne', 25000.00), (11, 'Deluxe', 'electro funk', 'Aix-en-Provence', 20000.00), (12, 'Massilia Sound System', 'ragga', 'Marseille', 16000.00); INSERT INTO concert VALUES (1, 1, 1, 'vendredi', 21, 23), (2, 4, 3, 'vendredi', 18, 19), (3, 6, 4, 'vendredi', 22, 0), (4, 3, 2, 'vendredi', 20, 21), (5, 2, 1, 'samedi', 22, 0), (6, 9, 3, 'samedi', 19, 20), (7, 5, 2, 'samedi', 17, 18), (8, 10, 1, 'samedi', 19, 21), (9, 7, 2, 'samedi', 21, 23), (10, 11, 1, 'dimanche', 21, 23), (11, 12, 3, 'dimanche', 18, 19), (12, 8, 4, 'dimanche', 16, 17); INSERT INTO benevole VALUES (1, 'Le Goff', 'Maëlys', 22, 'Paimpol', '0612345678'), (2, 'Kermarrec', 'Yann', 35, 'Guingamp', '0623456789'), (3, 'Prigent', 'Nolwenn', 19, 'Lannion', '0634567890'), (4, 'Corre', 'Elouan', 28, 'Saint-Brieuc', '0645678901'), (5, 'Tanguy', 'Rozenn', 41, 'Paimpol', '0656789012'), (6, 'Le Bihan', 'Gwenaël', 17, 'Plouha', '0667890123'), (7, 'Morvan', 'Anaïs', 24, 'Paimpol', '0678901234'), (8, 'Quéré', 'Malo', 31, 'Bréhat', '0689012345'); INSERT INTO affectation VALUES (1, 1, 1, 'vendredi', 'bar'), (2, 2, 1, 'vendredi', 'sécurité'), (3, 3, 2, 'vendredi', 'accueil'), (4, 4, 3, 'vendredi', 'bar'), (5, 5, 1, 'samedi', 'bar'), (6, 1, 2, 'samedi', 'accueil'), (7, 6, 3, 'samedi', 'ramassage'), (8, 2, 1, 'samedi', 'sécurité'), (9, 7, 1, 'dimanche', 'bar'), (10, 3, 3, 'dimanche', 'accueil'), (11, 8, 4, 'dimanche', 'sécurité'), (12, 4, 1, 'dimanche', 'sécurité');"
      },
      "exercises": [
        {
          "id": "fbr-01",
          "question": "Affichez toutes les informations de tous les artistes.",
          "hint": "La commande la plus simple : SELECT suivi d'un caractère spécial pour dire 'tout'.",
          "concepts": [
            "SELECT",
            "étoile"
          ],
          "solution": "SELECT * FROM artiste;"
        },
        {
          "id": "fbr-02",
          "question": "Affichez uniquement le nom et le genre de chaque artiste.",
          "hint": "Listez les colonnes souhaitées après SELECT, séparées par des virgules.",
          "concepts": [
            "SELECT",
            "colonnes"
          ],
          "solution": "SELECT nom, genre FROM artiste;"
        },
        {
          "id": "fbr-03",
          "question": "Affichez les noms des artistes triés par ordre alphabétique.",
          "hint": "ORDER BY suivi du nom de la colonne. Par défaut c'est croissant (ASC).",
          "concepts": [
            "ORDER BY",
            "ASC"
          ],
          "solution": "SELECT nom FROM artiste ORDER BY nom ASC;"
        },
        {
          "id": "fbr-04",
          "question": "Affichez les artistes dont le cachet est supérieur à 10 000 €.",
          "hint": "Filtrez avec WHERE et l'opérateur de comparaison >.",
          "concepts": [
            "WHERE",
            "comparaison"
          ],
          "solution": "SELECT * FROM artiste WHERE cachet > 10000;"
        },
        {
          "id": "fbr-05",
          "question": "Affichez les artistes dont le genre contient le mot 'rock'.",
          "hint": "Utilisez LIKE avec le caractère joker % avant et après le mot cherché.",
          "concepts": [
            "WHERE",
            "LIKE"
          ],
          "solution": "SELECT * FROM artiste WHERE genre LIKE '%rock%';"
        },
        {
          "id": "fbr-06",
          "question": "Affichez les scènes couvertes (couverte = 1).",
          "hint": "Filtrez avec WHERE sur la colonne couverte.",
          "concepts": [
            "WHERE",
            "booléen"
          ],
          "solution": "SELECT * FROM scene WHERE couverte = 1;"
        },
        {
          "id": "fbr-07",
          "question": "Affichez les différents genres musicaux présents au festival, sans doublons.",
          "hint": "Le mot-clé DISTINCT élimine les doublons.",
          "concepts": [
            "DISTINCT"
          ],
          "solution": "SELECT DISTINCT genre FROM artiste;"
        },
        {
          "id": "fbr-08",
          "question": "Combien d'artistes participent au festival ?",
          "hint": "La fonction COUNT(*) compte le nombre de lignes.",
          "concepts": [
            "COUNT"
          ],
          "solution": "SELECT COUNT(*) FROM artiste;"
        },
        {
          "id": "fbr-09",
          "question": "Quel est le cachet maximum parmi tous les artistes ?",
          "hint": "La fonction MAX() retourne la valeur maximale d'une colonne.",
          "concepts": [
            "MAX"
          ],
          "solution": "SELECT MAX(cachet) FROM artiste;"
        },
        {
          "id": "fbr-10",
          "question": "Affichez le nom et le cachet de l'artiste le mieux payé.",
          "hint": "Utilisez une sous-requête : WHERE cachet = (SELECT MAX(cachet) FROM artiste).",
          "concepts": [
            "sous-requête",
            "MAX"
          ],
          "solution": "SELECT nom, cachet FROM artiste WHERE cachet = (SELECT MAX(cachet) FROM artiste);"
        },
        {
          "id": "fbr-11",
          "question": "Affichez le cachet moyen des artistes.",
          "hint": "La fonction AVG() calcule la moyenne.",
          "concepts": [
            "AVG"
          ],
          "solution": "SELECT AVG(cachet) FROM artiste;"
        },
        {
          "id": "fbr-12",
          "question": "Affichez les artistes dont le cachet est supérieur au cachet moyen.",
          "hint": "Combinez WHERE avec une sous-requête utilisant AVG().",
          "concepts": [
            "sous-requête",
            "AVG",
            "WHERE"
          ],
          "solution": "SELECT nom, cachet FROM artiste WHERE cachet > (SELECT AVG(cachet) FROM artiste);"
        },
        {
          "id": "fbr-13",
          "question": "Affichez le nombre d'artistes par genre musical.",
          "hint": "GROUP BY regroupe les lignes ayant la même valeur. Combinez avec COUNT().",
          "concepts": [
            "GROUP BY",
            "COUNT"
          ],
          "solution": "SELECT genre, COUNT(*) FROM artiste GROUP BY genre;"
        },
        {
          "id": "fbr-14",
          "question": "Affichez le nom de l'artiste et le nom de la scène pour chaque concert.",
          "hint": "Il faut faire une jointure (JOIN) entre concert, artiste et scene. Reliez par les clés étrangères.",
          "concepts": [
            "JOIN",
            "multi-tables"
          ],
          "solution": "SELECT artiste.nom, scene.nom FROM concert JOIN artiste ON concert.id_artiste = artiste.id JOIN scene ON concert.id_scene = scene.id;"
        },
        {
          "id": "fbr-15",
          "question": "Affichez tous les concerts du samedi avec le nom de l'artiste et le nom de la scène, triés par heure de début.",
          "hint": "Ajoutez un WHERE jour = 'samedi' à votre jointure, puis ORDER BY heure_debut.",
          "concepts": [
            "JOIN",
            "WHERE",
            "ORDER BY"
          ],
          "solution": "SELECT artiste.nom, scene.nom, concert.heure_debut FROM concert JOIN artiste ON concert.id_artiste = artiste.id JOIN scene ON concert.id_scene = scene.id WHERE concert.jour = 'samedi' ORDER BY concert.heure_debut;"
        },
        {
          "id": "fbr-16",
          "question": "Affichez le nombre de concerts par scène.",
          "hint": "Joignez concert et scene, puis GROUP BY sur le nom de la scène avec COUNT().",
          "concepts": [
            "JOIN",
            "GROUP BY",
            "COUNT"
          ],
          "solution": "SELECT scene.nom, COUNT(*) FROM concert JOIN scene ON concert.id_scene = scene.id GROUP BY scene.nom;"
        },
        {
          "id": "fbr-17",
          "question": "Affichez les bénévoles qui sont affectés à la scène 'Maen Braz'.",
          "hint": "Joignez affectation, benevole et scene. Filtrez sur scene.nom.",
          "concepts": [
            "JOIN",
            "WHERE",
            "multi-tables"
          ],
          "solution": "SELECT DISTINCT benevole.nom, benevole.prenom FROM affectation JOIN benevole ON affectation.id_benevole = benevole.id JOIN scene ON affectation.id_scene = scene.id WHERE scene.nom = 'Maen Braz';"
        },
        {
          "id": "fbr-18",
          "question": "Affichez les bénévoles qui travaillent plus d'un jour (affectés sur au moins 2 jours différents).",
          "hint": "GROUP BY sur le bénévole, comptez les jours DISTINCT, filtrez avec HAVING >= 2.",
          "concepts": [
            "GROUP BY",
            "HAVING",
            "COUNT DISTINCT"
          ],
          "solution": "SELECT benevole.nom, benevole.prenom, COUNT(DISTINCT affectation.jour) AS nb_jours FROM affectation JOIN benevole ON affectation.id_benevole = benevole.id GROUP BY benevole.id HAVING COUNT(DISTINCT affectation.jour) >= 2;"
        },
        {
          "id": "fbr-19",
          "question": "Calculez le coût total des cachets pour l'ensemble du festival.",
          "hint": "SUM() fait la somme d'une colonne.",
          "concepts": [
            "SUM"
          ],
          "solution": "SELECT SUM(cachet) FROM artiste;"
        },
        {
          "id": "fbr-20",
          "question": "Affichez les villes d'où viennent les bénévoles, sans doublons, triées par ordre alphabétique.",
          "hint": "DISTINCT + ORDER BY.",
          "concepts": [
            "DISTINCT",
            "ORDER BY"
          ],
          "solution": "SELECT DISTINCT ville FROM benevole ORDER BY ville;"
        }
      ]
    },
    {
      "id": "brasserie-ty-malt",
      "title": "Brasserie Ty Malt",
      "description": "Vous développez la base de données d'une micro-brasserie artisanale. Le brasseur veut suivre ses bières, ses ingrédients, ses commandes clients et son stock.",
      "difficulty": "intermediate",
      "schema": {
        "tables": [
          {
            "name": "biere",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "nom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "style",
                "type": "VARCHAR(50)"
              },
              {
                "name": "degre_alcool",
                "type": "DECIMAL(3,1)"
              },
              {
                "name": "prix_unitaire",
                "type": "DECIMAL(5,2)"
              },
              {
                "name": "stock",
                "type": "INTEGER DEFAULT 0"
              }
            ]
          },
          {
            "name": "ingredient",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "nom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "categorie",
                "type": "VARCHAR(50)"
              },
              {
                "name": "prix_kg",
                "type": "DECIMAL(7,2)"
              }
            ]
          },
          {
            "name": "recette_ingredient",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "id_biere",
                "type": "INTEGER REFERENCES biere(id)"
              },
              {
                "name": "id_ingredient",
                "type": "INTEGER REFERENCES ingredient(id)"
              },
              {
                "name": "quantite_kg",
                "type": "DECIMAL(5,3)"
              }
            ]
          },
          {
            "name": "client",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "nom",
                "type": "VARCHAR(100) NOT NULL"
              },
              {
                "name": "type_client",
                "type": "VARCHAR(20)"
              },
              {
                "name": "ville",
                "type": "VARCHAR(100)"
              }
            ]
          },
          {
            "name": "commande",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "id_client",
                "type": "INTEGER REFERENCES client(id)"
              },
              {
                "name": "date_commande",
                "type": "DATE"
              },
              {
                "name": "statut",
                "type": "VARCHAR(20) DEFAULT 'en attente'"
              }
            ]
          },
          {
            "name": "ligne_commande",
            "columns": [
              {
                "name": "id",
                "type": "INTEGER PRIMARY KEY"
              },
              {
                "name": "id_commande",
                "type": "INTEGER REFERENCES commande(id)"
              },
              {
                "name": "id_biere",
                "type": "INTEGER REFERENCES biere(id)"
              },
              {
                "name": "quantite",
                "type": "INTEGER NOT NULL"
              }
            ]
          }
        ],
        "seed_sql": "CREATE TABLE biere (id INTEGER PRIMARY KEY, nom VARCHAR(100) NOT NULL, style VARCHAR(50), degre_alcool DECIMAL(3,1), prix_unitaire DECIMAL(5,2), stock INTEGER DEFAULT 0); CREATE TABLE ingredient (id INTEGER PRIMARY KEY, nom VARCHAR(100) NOT NULL, categorie VARCHAR(50), prix_kg DECIMAL(7,2)); CREATE TABLE recette_ingredient (id INTEGER PRIMARY KEY, id_biere INTEGER REFERENCES biere(id), id_ingredient INTEGER REFERENCES ingredient(id), quantite_kg DECIMAL(5,3)); CREATE TABLE client (id INTEGER PRIMARY KEY, nom VARCHAR(100) NOT NULL, type_client VARCHAR(20), ville VARCHAR(100)); CREATE TABLE commande (id INTEGER PRIMARY KEY, id_client INTEGER REFERENCES client(id), date_commande DATE, statut VARCHAR(20) DEFAULT 'en attente'); CREATE TABLE ligne_commande (id INTEGER PRIMARY KEY, id_commande INTEGER REFERENCES commande(id), id_biere INTEGER REFERENCES biere(id), quantite INTEGER NOT NULL); INSERT INTO biere VALUES (1, 'Ambrée du Goëlo', 'ambrée', 6.5, 4.50, 120), (2, 'Blanche de Bréhat', 'blanche', 4.8, 3.80, 85), (3, 'IPA Tempête', 'IPA', 7.2, 5.20, 45), (4, 'Stout Noz', 'stout', 8.0, 5.50, 30), (5, 'Blonde des Abers', 'blonde', 5.0, 3.50, 200), (6, 'Triple Kornog', 'triple', 9.5, 6.80, 15), (7, 'Saison Estivale', 'saison', 4.5, 4.00, 0); INSERT INTO ingredient VALUES (1, 'Malt Pale Ale', 'malt', 1.80), (2, 'Malt Munich', 'malt', 2.10), (3, 'Malt Caramel', 'malt', 2.50), (4, 'Houblon Cascade', 'houblon', 28.00), (5, 'Houblon Citra', 'houblon', 45.00), (6, 'Houblon Strisselspalt', 'houblon', 22.00), (7, 'Levure Ale', 'levure', 85.00), (8, 'Blé malté', 'malt', 1.90), (9, 'Malt Torréfié', 'malt', 3.20), (10, 'Sarrasin', 'céréale', 2.80); INSERT INTO recette_ingredient VALUES (1, 1, 1, 3.500), (2, 1, 3, 1.200), (3, 1, 6, 0.080), (4, 1, 7, 0.015), (5, 2, 1, 2.800), (6, 2, 8, 1.500), (7, 2, 6, 0.050), (8, 3, 1, 4.000), (9, 3, 4, 0.120), (10, 3, 5, 0.100), (11, 4, 1, 3.000), (12, 4, 9, 2.000), (13, 4, 4, 0.090), (14, 5, 1, 3.800), (15, 5, 6, 0.060), (16, 5, 7, 0.012); INSERT INTO client VALUES (1, 'Le Phare', 'bar', 'Paimpol'), (2, 'Crêperie Ty Breizh', 'restaurant', 'Saint-Brieuc'), (3, 'Cave du Port', 'caviste', 'Binic'), (4, 'L Abri du Marin', 'bar', 'Erquy'), (5, 'Hôtel de la Plage', 'restaurant', 'Plérin'), (6, 'Pierre Dupont', 'particulier', 'Paimpol'), (7, 'Marie Le Gall', 'particulier', 'Lannion'), (8, 'Ferme de Kerloas', 'particulier', 'Ploubazlanec'); INSERT INTO commande VALUES (1, 1, '2026-06-01', 'livrée'), (2, 2, '2026-06-03', 'livrée'), (3, 1, '2026-06-15', 'livrée'), (4, 3, '2026-06-20', 'en attente'), (5, 4, '2026-07-01', 'en attente'), (6, 6, '2026-07-05', 'livrée'), (7, 5, '2026-07-10', 'en attente'), (8, 7, '2026-07-12', 'annulée'); INSERT INTO ligne_commande VALUES (1, 1, 1, 24), (2, 1, 5, 48), (3, 2, 2, 12), (4, 2, 1, 12), (5, 3, 3, 24), (6, 3, 1, 12), (7, 4, 5, 36), (8, 4, 2, 24), (9, 5, 4, 12), (10, 5, 1, 24), (11, 6, 6, 6), (12, 7, 1, 48), (13, 7, 3, 24), (14, 7, 5, 48);"
      },
      "exercises": [
        {
          "id": "tym-01",
          "question": "Affichez toutes les bières triées par degré d'alcool décroissant.",
          "hint": "ORDER BY ... DESC",
          "concepts": [
            "ORDER BY",
            "DESC"
          ],
          "solution": "SELECT * FROM biere ORDER BY degre_alcool DESC;"
        },
        {
          "id": "tym-02",
          "question": "Affichez les bières dont le stock est à zéro.",
          "hint": "WHERE stock = 0",
          "concepts": [
            "WHERE",
            "comparaison"
          ],
          "solution": "SELECT nom FROM biere WHERE stock = 0;"
        },
        {
          "id": "tym-03",
          "question": "Calculez le chiffre d'affaires potentiel si tout le stock était vendu (somme de prix_unitaire × stock pour chaque bière).",
          "hint": "SUM(prix_unitaire * stock)",
          "concepts": [
            "SUM",
            "expression"
          ],
          "solution": "SELECT SUM(prix_unitaire * stock) FROM biere;"
        },
        {
          "id": "tym-04",
          "question": "Affichez le nombre de bières par style.",
          "hint": "GROUP BY style avec COUNT(*).",
          "concepts": [
            "GROUP BY",
            "COUNT"
          ],
          "solution": "SELECT style, COUNT(*) FROM biere GROUP BY style;"
        },
        {
          "id": "tym-05",
          "question": "Affichez le nom de chaque bière avec la liste de ses ingrédients.",
          "hint": "Joignez biere → recette_ingredient → ingredient.",
          "concepts": [
            "JOIN",
            "multi-tables"
          ],
          "solution": "SELECT biere.nom AS biere, ingredient.nom AS ingredient, recette_ingredient.quantite_kg FROM recette_ingredient JOIN biere ON recette_ingredient.id_biere = biere.id JOIN ingredient ON recette_ingredient.id_ingredient = ingredient.id ORDER BY biere.nom;"
        },
        {
          "id": "tym-06",
          "question": "Calculez le coût en ingrédients de chaque bière (somme de quantite_kg × prix_kg par bière).",
          "hint": "JOIN les 3 tables, GROUP BY biere.nom, SUM(quantite_kg * prix_kg).",
          "concepts": [
            "JOIN",
            "GROUP BY",
            "SUM",
            "expression"
          ],
          "solution": "SELECT biere.nom, SUM(recette_ingredient.quantite_kg * ingredient.prix_kg) AS cout_ingredients FROM recette_ingredient JOIN biere ON recette_ingredient.id_biere = biere.id JOIN ingredient ON recette_ingredient.id_ingredient = ingredient.id GROUP BY biere.nom;"
        },
        {
          "id": "tym-07",
          "question": "Affichez les clients qui ont passé au moins 2 commandes.",
          "hint": "GROUP BY client, HAVING COUNT(*) >= 2.",
          "concepts": [
            "GROUP BY",
            "HAVING",
            "COUNT"
          ],
          "solution": "SELECT client.nom, COUNT(*) AS nb_commandes FROM commande JOIN client ON commande.id_client = client.id GROUP BY client.id HAVING COUNT(*) >= 2;"
        },
        {
          "id": "tym-08",
          "question": "Affichez le montant total de chaque commande (somme de quantite × prix_unitaire).",
          "hint": "Joignez commande → ligne_commande → biere, GROUP BY commande.id.",
          "concepts": [
            "JOIN",
            "GROUP BY",
            "SUM"
          ],
          "solution": "SELECT commande.id, commande.date_commande, SUM(ligne_commande.quantite * biere.prix_unitaire) AS montant_total FROM commande JOIN ligne_commande ON ligne_commande.id_commande = commande.id JOIN biere ON ligne_commande.id_biere = biere.id GROUP BY commande.id;"
        },
        {
          "id": "tym-09",
          "question": "Affichez la bière la plus commandée (en quantité totale).",
          "hint": "GROUP BY sur la bière avec SUM(quantite), puis triez en décroissant et gardez la première ligne : ORDER BY ... DESC LIMIT 1.",
          "concepts": [
            "GROUP BY",
            "SUM",
            "ORDER BY",
            "LIMIT"
          ],
          "solution": "SELECT biere.nom, SUM(ligne_commande.quantite) AS total FROM ligne_commande JOIN biere ON ligne_commande.id_biere = biere.id GROUP BY biere.id ORDER BY total DESC LIMIT 1;"
        },
        {
          "id": "tym-10",
          "question": "Affichez les bières qui n'ont jamais été commandées.",
          "hint": "LEFT JOIN ligne_commande sur biere, puis WHERE ligne_commande.id IS NULL.",
          "concepts": [
            "LEFT JOIN",
            "IS NULL"
          ],
          "solution": "SELECT biere.nom FROM biere LEFT JOIN ligne_commande ON biere.id = ligne_commande.id_biere WHERE ligne_commande.id IS NULL;"
        },
        {
          "id": "tym-11",
          "question": "Affichez les clients qui n'ont jamais passé de commande.",
          "hint": "LEFT JOIN commande sur client, puis WHERE commande.id IS NULL.",
          "concepts": [
            "LEFT JOIN",
            "IS NULL"
          ],
          "solution": "SELECT client.nom FROM client LEFT JOIN commande ON client.id = commande.id_client WHERE commande.id IS NULL;"
        },
        {
          "id": "tym-12",
          "question": "Affichez le chiffre d'affaires par ville de client (seulement pour les commandes livrées).",
          "hint": "Joignez toute la chaîne client → commande → ligne_commande → biere, filtrez statut = 'livrée', GROUP BY ville.",
          "concepts": [
            "JOIN",
            "WHERE",
            "GROUP BY",
            "SUM"
          ],
          "solution": "SELECT client.ville, SUM(ligne_commande.quantite * biere.prix_unitaire) AS ca FROM commande JOIN client ON commande.id_client = client.id JOIN ligne_commande ON ligne_commande.id_commande = commande.id JOIN biere ON ligne_commande.id_biere = biere.id WHERE commande.statut = 'livrée' GROUP BY client.ville ORDER BY ca DESC;"
        },
        {
          "id": "tym-13",
          "question": "Affichez les ingrédients de catégorie 'houblon' qui sont utilisés dans au moins 2 bières différentes.",
          "hint": "JOIN ingredient et recette_ingredient, WHERE categorie = 'houblon', GROUP BY ingredient, HAVING COUNT(DISTINCT id_biere) >= 2.",
          "concepts": [
            "JOIN",
            "WHERE",
            "GROUP BY",
            "HAVING",
            "COUNT DISTINCT"
          ],
          "solution": "SELECT ingredient.nom, COUNT(DISTINCT recette_ingredient.id_biere) AS nb_bieres FROM recette_ingredient JOIN ingredient ON recette_ingredient.id_ingredient = ingredient.id WHERE ingredient.categorie = 'houblon' GROUP BY ingredient.id HAVING COUNT(DISTINCT recette_ingredient.id_biere) >= 2;"
        },
        {
          "id": "tym-14",
          "question": "Modifiez le stock de la bière 'Saison Estivale' pour le passer à 50.",
          "hint": "UPDATE ... SET ... WHERE ...",
          "concepts": [
            "UPDATE",
            "SET",
            "WHERE"
          ],
          "solution": "UPDATE biere SET stock = 50 WHERE nom = 'Saison Estivale';"
        },
        {
          "id": "tym-15",
          "question": "Supprimez toutes les commandes annulées.",
          "hint": "DELETE FROM ... WHERE statut = 'annulée'. Attention : il faut d'abord supprimer les lignes de commande associées.",
          "concepts": [
            "DELETE",
            "WHERE"
          ],
          "solution": "DELETE FROM ligne_commande WHERE id_commande IN (SELECT id FROM commande WHERE statut = 'annulée'); DELETE FROM commande WHERE statut = 'annulée';"
        }
      ]
    }
  ]
};
