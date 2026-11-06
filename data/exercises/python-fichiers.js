export default {
  "domain": "python-fichiers",
  "title": "Python : Fichiers & données",
  "exercises": [
    {
      "id": "pyf-01",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "CSV",
        "lecture"
      ],
      "code": "import csv\n\nwith open('agents.csv', 'r', newline='', encoding='utf-8') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row['nom'], row['langues'])\n\n# agents.csv :\n# nom,langues,pays_visites\n# Alice,\"français,anglais\",France\n# Boris,russe,Russie",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Alice français,anglais puis Boris russe",
        "Alice \"français,anglais\" puis Boris russe",
        "Alice français puis Boris russe",
        "Alice ['français', 'anglais'] puis Boris russe"
      ],
      "answer": 0,
      "explanation": "csv.DictReader gère les champs entre guillemets : \"français,anglais\" est traité comme UNE seule valeur (pas splitté par la virgule interne). Chaque ligne est un dictionnaire {colonne: valeur}. Les guillemets ne sont pas conservés dans la valeur : le module csv les retire au parsing. La virgule protégée ne décale pas non plus les colonnes, langues ne se réduit donc pas à 'français'. Et DictReader ne convertit jamais un champ en liste : toute valeur lue reste une string.",
      "hint": "Les guillemets dans un CSV protègent les virgules à l'intérieur d'un champ."
    },
    {
      "id": "pyf-02",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "CSV",
        "filtrage"
      ],
      "code": "import csv\n\npolyglotes = []\nwith open('agents.csv', 'r', newline='', encoding='utf-8') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        langues = row['langues']._______(',')\n        if len(langues) > 1:\n            polyglotes.append(row['nom'])\n\nprint(polyglotes)",
      "question": "Quelle méthode string découpe le champ langues en une liste ?",
      "options": [
        "split",
        "partition",
        "strip",
        "join"
      ],
      "answer": 0,
      "explanation": "split(',') découpe la string sur chaque virgule et retourne une liste. 'français,anglais'.split(',') → ['français', 'anglais']. len() > 1 vérifie qu'il y a plus d'une langue. partition(',') existe mais retourne toujours un tuple de trois éléments (avant, séparateur, après) et ne coupe qu'à la première virgule : le test len() > 1 serait toujours vrai. strip(',') ne découpe rien : il retire seulement les virgules en début et fin de chaîne. join fait l'opération inverse : il assemble une séquence en une seule string.",
      "hint": "C'est la méthode Python standard pour découper une string en liste. Le séparateur est passé en argument."
    },
    {
      "id": "pyf-03",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "JSON",
        "écriture"
      ],
      "code": "import json\n\nespion = {\n    \"nom\": \"Viktor\",\n    \"ancien_nom\": \"Serguei\",\n    \"langues\": [\"russe\", \"anglais\", \"allemand\"],\n    \"pays_visites\": [\"France\", \"Allemagne\"]\n}\n\nwith open('espion.json', 'w', encoding='utf-8') as f:\n    json.dump(espion, f, indent=2, ensure_ascii=False)\n\nwith open('espion.json', 'r', encoding='utf-8') as f:\n    data = json.load(f)\n    print(type(data['langues']))\n    print(data['langues'][0])",
      "question": "Qu'affiche ce code ?",
      "options": [
        "<class 'list'> puis russe",
        "<class 'str'> puis [",
        "<class 'tuple'> puis russe",
        "Erreur : UnicodeDecodeError sur les accents à la relecture"
      ],
      "answer": 0,
      "explanation": "json.dump() écrit le dict en JSON dans le fichier. json.load() relit le fichier et reconstruit la structure Python. Les listes JSON redeviennent des listes Python. Le contenu n'est pas relu comme du texte brut : json.load parse le fichier, data['langues'] n'est donc pas la string '[\"russe\", ...]' dont [0] donnerait '['. Les tableaux JSON deviennent des listes, jamais des tuples (c'est json.dumps qui, à l'inverse, sérialise un tuple en tableau). Et aucune erreur d'encodage ne survient : le fichier est écrit puis relu en UTF-8 (encoding='utf-8'), et ensure_ascii=False écrit les éventuels accents tels quels. Sans encoding, Python utiliserait l'encodage par défaut du système (cp1252 sous Windows) : à préciser toujours.",
      "hint": "JSON → Python : object → dict, array → list, string → str. Les types sont conservés automatiquement."
    },
    {
      "id": "pyf-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "fichier texte",
        "écriture"
      ],
      "code": "scores = [\n    {\"joueur\": \"Alice\", \"score\": 12.5},\n    {\"joueur\": \"Bob\", \"score\": 8.3}\n]\n\nwith open('scores.txt', 'w', encoding='utf-8') as f:\n    for s in scores:\n        f.write(f\"{s['joueur']} : {s['score']}\\n\")\n\nwith open('scores.txt', 'r', encoding='utf-8') as f:\n    contenu = f.read()\n    print(contenu)",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Deux lignes : Alice : 12.5 puis Bob : 8.3",
        "La liste ['Alice : 12.5\\n', 'Bob : 8.3\\n']",
        "Quatre lignes, une ligne vide après chaque score",
        "Une seule ligne : Alice : 12.5Bob : 8.3"
      ],
      "answer": 0,
      "explanation": "f.write() écrit la f-string dans le fichier. Le \\n ajoute un retour à la ligne après chaque entrée. f.read() lit tout le contenu du fichier d'un coup. read() retourne une seule string, pas une liste de lignes : c'est readlines() qui produirait ['Alice : 12.5\\n', ...]. write() n'ajoute aucun retour à la ligne de lui-même, contrairement à print, donc pas de lignes doublées. Et le \\n d'une f-string est bien interprété à l'écriture : ce n'est qu'en l'omettant que tout serait collé sur une seule ligne.",
      "hint": "write() écrit exactement ce qu'on lui donne. Le \\n est nécessaire pour les retours à la ligne."
    },
    {
      "id": "pyf-05",
      "type": "debug",
      "difficulty": "intermediate",
      "concepts": [
        "fichier",
        "mode d'ouverture"
      ],
      "code": "# On veut AJOUTER un score sans effacer les précédents\nwith open('scores.txt', 'w', encoding='utf-8') as f:\n    f.write(\"Charlie : 15.2\\n\")",
      "question": "Ce code efface les scores existants au lieu de les ajouter. Pourquoi ?",
      "options": [
        "Le mode 'w' (write) écrase le fichier : il faut utiliser 'a' (append)",
        "Il fallait ouvrir en 'r+' : ce mode se place automatiquement en fin de fichier",
        "Il manque f.seek(0, 2) avant write() pour positionner le curseur à la fin",
        "Le bloc with tronque le fichier à sa sortie : il faut appeler close() soi-même"
      ],
      "answer": 0,
      "explanation": "Mode 'w' = write = crée le fichier ou l'ÉCRASE s'il existe. Mode 'a' = append = ajoute à la fin sans effacer. Pour ajouter un score : open('scores.txt', 'a'). 'r+' ouvre bien en lecture/écriture mais place le curseur au DÉBUT du fichier : il écraserait les premiers caractères, et échouerait si le fichier n'existe pas. seek(0, 2) ne changerait rien ici : l'ouverture en 'w' a déjà vidé le fichier avant le moindre write(). Et with ne tronque rien à la sortie du bloc : il garantit simplement l'appel automatique de close().",
      "hint": "Que fait le mode 'w' à un fichier qui existe déjà ? Quel mode écrit à la suite du contenu ?"
    },
    {
      "id": "pyf-06",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "CSV",
        "écriture"
      ],
      "code": "import csv\n\nresultats = [\n    ['Nom', 'Score', 'Temps'],\n    ['Alice', 95, '02:30'],\n    ['Bob', 87, '03:15']\n]\n\nwith open('resultats.csv', 'w', newline='', encoding='utf-8') as f:\n    writer = csv.writer(f)\n    writer.writerows(resultats)\n\n# Contenu du fichier :",
      "question": "Que contient le fichier CSV créé ?",
      "options": [
        "3 lignes : Nom,Score,Temps / Alice,95,02:30 / Bob,87,03:15",
        "3 lignes : \"Nom\",\"Score\",\"Temps\" / \"Alice\",\"95\",\"02:30\" / \"Bob\",\"87\",\"03:15\"",
        "3 lignes : Nom;Score;Temps / Alice;95;02:30 / Bob;87;03:15",
        "Erreur : writerows() attend des dictionnaires, comme avec DictWriter"
      ],
      "answer": 0,
      "explanation": "csv.writer convertit les listes en lignes CSV séparées par des virgules. writerows() écrit toutes les lignes d'un coup. La première liste devient l'en-tête. Chaque ligne se termine par \\r\\n, le terminateur par défaut du module csv : c'est pour cela qu'on ouvre le fichier avec newline=''. Sans lui, Windows convertirait le \\n en \\r\\n, et chaque ligne finirait par \\r\\r\\n (une ligne vide en plus dans Excel). Les champs ne sont pas tous mis entre guillemets : le mode par défaut (QUOTE_MINIMAL) ne quote que les champs contenant le séparateur ou un retour à la ligne. Le délimiteur par défaut est la virgule, pas le point-virgule : le ';' est une habitude d'Excel en français, obtenue seulement avec delimiter=';'. Et writerows() accepte bien des listes : c'est DictWriter qui travaille avec des dictionnaires.",
      "hint": "writerows() prend une liste de listes. Chaque sous-liste = une ligne du CSV."
    },
    {
      "id": "pyf-07",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "gestion d'erreurs",
        "fichier"
      ],
      "code": "import json\n\ndef charger_scores(chemin):\n    ______:\n        with open(chemin, 'r', encoding='utf-8') as f:\n            return json.load(f)\n    except FileNotFoundError:\n        print(\"Fichier non trouvé, création d'un nouveau.\")\n        return []\n    except json.JSONDecodeError:\n        print(\"Fichier corrompu.\")\n        return []",
      "question": "Quel mot-clé commence le bloc de gestion d'erreurs ?",
      "options": [
        "try",
        "with",
        "raise",
        "except"
      ],
      "answer": 0,
      "explanation": "En Python : try/except (pas try/catch comme en Java/JS). Le code dans try est exécuté. Si une exception survient, le except correspondant la gère. Ici on gère deux cas : fichier inexistant et JSON invalide, et on retourne une liste vide au lieu de planter. with ouvre un contexte (déjà utilisé ici pour le fichier) mais n'intercepte aucune exception. raise fait l'inverse de ce qu'on cherche : il lève une exception au lieu de la gérer. except existe mais ne peut pas ouvrir le bloc : il vient obligatoirement après un try pour capter l'erreur.",
      "hint": "Les deux except ont besoin d'un bloc qui les précède : lequel ?"
    },
    {
      "id": "pyf-08",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "tri",
        "lambda"
      ],
      "code": "joueurs = [\n    {\"nom\": \"Alice\", \"temps\": 45.2},\n    {\"nom\": \"Bob\", \"temps\": 32.8},\n    {\"nom\": \"Charlie\", \"temps\": 51.0}\n]\n\nclassement = sorted(joueurs, key=lambda j: j['temps'])\nprint(classement[0]['nom'])",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Bob",
        "Alice",
        "Charlie",
        "Erreur : sorted() trie en place et retourne None"
      ],
      "answer": 0,
      "explanation": "sorted() trie la liste. key=lambda j: j['temps'] dit de trier par le champ 'temps'. Par défaut c'est croissant. Bob (32.8) < Alice (45.2) < Charlie (51.0). classement[0] = Bob (le plus rapide). Alice ne serait première que si la liste gardait son ordre initial ou si le tri portait sur le nom. Charlie sortirait en tête avec reverse=True (tri décroissant). Et sorted() ne trie pas en place : c'est list.sort() qui modifie la liste et retourne None, sorted() renvoie bien une nouvelle liste que l'on peut indexer.",
      "hint": "sorted() par défaut = croissant. Le premier élément est celui avec le plus petit 'temps'."
    },
    {
      "id": "pyf-09",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "CSV",
        "split",
        "module csv"
      ],
      "code": "ligne = 'Alice,\"Paris, France\",32'\nprint(ligne.split(','))",
      "question": "Qu'affiche ce code ?",
      "options": [
        "['Alice', '\"Paris', ' France\"', '32']",
        "['Alice', 'Paris, France', '32']",
        "['Alice', '\"Paris, France\"', '32']",
        "['Alice,\"Paris, France\",32']"
      ],
      "answer": 0,
      "explanation": "split(',') coupe à chaque virgule, sans rien savoir des guillemets du format CSV : la virgule de « Paris, France » coupe aussi, d'où 4 morceaux, guillemets compris. C'est pourquoi on lit un CSV avec le module csv : next(csv.reader([ligne])) donne bien ['Alice', 'Paris, France', '32']. Le résultat d'un seul élément correspondrait à un séparateur absent de la ligne.",
      "hint": "split() connaît-il les guillemets du format CSV ? Comptez les virgules."
    }
  ]
};
