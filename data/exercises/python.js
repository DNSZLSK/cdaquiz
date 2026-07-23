export default {
  "domain": "python",
  "title": "Python",
  "exercises": [
    {
      "id": "py-01",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "types",
        "concaténation"
      ],
      "code": "age = 34\nnom = \"Kéwin\"\nprint(nom + \" a \" + str(age) + \" ans\")",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Kéwin a 34 ans",
        "TypeError : can only concatenate str (not \"int\") to str",
        "Kéwin a '34' ans",
        "34 a Kéwin ans"
      ],
      "answer": 0,
      "explanation": "str(age) convertit l'entier 34 en string \"34\" et la concaténation avec + assemble tous les morceaux : Kéwin a 34 ans. La TypeError ne se produirait que si age était concaténé sans conversion, or l'appel à str() est bien présent. '34' avec guillemets serait la représentation repr de la chaîne : print affiche son contenu sans guillemets. Et 34 a Kéwin ans supposerait d'avoir inversé nom et age dans la concaténation, ce que le code ne fait pas.",
      "hint": "str() convertit n'importe quoi en string. Sans cette conversion, + entre str et int lève une erreur."
    },
    {
      "id": "py-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "liste",
        "slicing"
      ],
      "code": "genres = [\"rock\", \"jazz\", \"reggae\", \"techno\", \"dub\"]\nprint(genres[1:3])\nprint(genres[-1])",
      "question": "Qu'affiche ce code ?",
      "options": [
        "['jazz', 'reggae'] puis dub",
        "['jazz', 'reggae', 'techno'] puis dub",
        "['rock', 'jazz'] puis dub",
        "['jazz', 'reggae'] puis techno"
      ],
      "answer": 0,
      "explanation": "genres[1:3] prend les éléments d'index 1 (inclus) à 3 (exclu), soit ['jazz', 'reggae'], et genres[-1] renvoie le dernier élément, 'dub'. ['jazz', 'reggae', 'techno'] supposerait une borne de fin incluse, or la fin d'un slice est toujours exclue. ['rock', 'jazz'] correspondrait à une numérotation commençant à 1, mais les index Python commencent à 0. Enfin techno serait genres[-2] : -1 désigne le dernier élément, pas l'avant-dernier.",
      "hint": "Le slicing [a:b] prend de l'index a (inclus) à b (exclu). Les index négatifs comptent depuis la fin."
    },
    {
      "id": "py-03",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "dictionnaire"
      ],
      "code": "biere = {\n    \"nom\": \"IPA Tempête\",\n    \"degre\": 7.2,\n    \"stock\": 45\n}\n\nbiere[\"stock\"] -= 10\nprint(biere[\"nom\"], biere[\"stock\"])",
      "question": "Qu'affiche ce code ?",
      "options": [
        "IPA Tempête 35",
        "IPA Tempête 45",
        "IPA Tempête 55",
        "Erreur : un dictionnaire est immuable après sa création"
      ],
      "answer": 0,
      "explanation": "Les dictionnaires sont mutables : biere[\"stock\"] -= 10 remplace la valeur existante par 45 - 10 = 35, et print affiche les deux valeurs séparées par un espace. 45 supposerait que -= travaille sur une copie sans toucher au dictionnaire, or l'opération modifie la valeur en place. 55 correspondrait à += : l'opérateur utilisé ici soustrait. Et l'immuabilité concerne les tuples ou les strings, pas les dictionnaires, qui acceptent l'affectation par clé.",
      "hint": "-= est un raccourci pour x = x - 10."
    },
    {
      "id": "py-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "fonction",
        "return"
      ],
      "code": "def est_palindrome(mot):\n    mot = mot.lower()\n    return mot == mot[::-1]\n\nprint(est_palindrome(\"Kayak\"))\nprint(est_palindrome(\"Python\"))",
      "question": "Qu'affiche ce code ?",
      "options": [
        "True puis False",
        "False puis False",
        "kayak puis nohtyp",
        "False puis True"
      ],
      "answer": 0,
      "explanation": "mot.lower() donne 'kayak', mot[::-1] l'inverse en 'kayak', l'égalité vaut True. Pour 'python', l'inverse 'nohtyp' est différent, donc False. False puis False supposerait d'ignorer le lower() : sans lui, 'Kayak'[::-1] donnerait 'kayaK', différent de 'Kayak', mais la conversion en minuscules a bien lieu avant la comparaison. kayak puis nohtyp confond la valeur retournée avec la string inversée : la fonction retourne le booléen de la comparaison, pas la chaîne. False puis True inverse simplement les deux résultats.",
      "hint": "[::-1] inverse une string ou une liste en Python. C'est un slicing avec un pas de -1."
    },
    {
      "id": "py-05",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "récursivité"
      ],
      "code": "def factorielle(n):\n    if n <= 1:\n        return 1\n    return n * factorielle(n - 1)\n\nprint(factorielle(5))",
      "question": "Qu'affiche ce code ?",
      "options": [
        "120",
        "24",
        "15",
        "720"
      ],
      "answer": 0,
      "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120. La récursion : factorielle(5) = 5 × factorielle(4) = 5 × 4 × factorielle(3), et ainsi de suite jusqu'à factorielle(1) qui retourne 1. 24 est 4! : ce serait le résultat si la récursion démarrait à n - 1 au lieu de n. 15 est la somme 5 + 4 + 3 + 2 + 1 : la fonction multiplie, elle n'additionne pas. 720 est 6! : ce serait le résultat d'un appel factorielle(6), pas factorielle(5).",
      "hint": "Déroulez les appels : f(5) = 5 × f(4) = 5 × 4 × f(3) = ..."
    },
    {
      "id": "py-06",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "fichier",
        "lecture"
      ],
      "code": "# Lire un fichier CSV et afficher chaque ligne\nwith open('data.csv', 'r') as f:\n    for ligne in f:\n        colonnes = ligne.______().split(',')\n        print(colonnes)",
      "question": "Quelle méthode nettoie chaque ligne des caractères de retour à la ligne ?",
      "options": [
        "trim()",
        "strip()",
        "lstrip()",
        "splitlines()"
      ],
      "answer": 1,
      "explanation": "strip() supprime les espaces et caractères de fin de ligne (\\n, \\r) au début et à la fin d'une string. trim() est le nom de cette opération en Java et en JavaScript, mais la méthode n'existe pas sur les strings Python. lstrip() ne nettoie que le début (left) de la chaîne, or le \\n se trouve à la fin de chaque ligne. splitlines() découpe une string en liste de lignes : elle renverrait une liste, sur laquelle l'appel suivant à split(',') échouerait.",
      "hint": "En Python, ce n'est pas trim() comme dans d'autres langages."
    },
    {
      "id": "py-07",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "compréhension de liste"
      ],
      "code": "nombres = [1, 2, 3, 4, 5, 6, 7, 8]\npairs = [n for n in nombres if n % 2 == 0]\nprint(pairs)",
      "question": "Qu'affiche ce code ?",
      "options": [
        "[2, 4, 6, 8]",
        "[1, 3, 5, 7]",
        "[False, True, False, True, False, True, False, True]",
        "[0, 0, 0, 0]"
      ],
      "answer": 0,
      "explanation": "La compréhension garde chaque n de nombres pour lequel n % 2 == 0 est vrai, c'est à dire les pairs : [2, 4, 6, 8]. [1, 3, 5, 7] inverserait la condition : n % 2 == 0 sélectionne les pairs, pas les impairs. La liste de booléens correspondrait à [n % 2 == 0 for n in nombres], sans clause if : ici le test sert de filtre, il n'est pas collecté. Et [0, 0, 0, 0] supposerait qu'on collecte n % 2 au lieu de n, or c'est bien n qui est placé avant le for.",
      "hint": "n % 2 == 0 est vrai quand n est pair. La compréhension filtre et collecte ces valeurs."
    },
    {
      "id": "py-08",
      "type": "debug",
      "difficulty": "intermediate",
      "concepts": [
        "exception",
        "try/except"
      ],
      "code": "def diviser(a, b):\n    try:\n        resultat = a / b\n    except ZeroDivisionError:\n        print(\"Erreur : division par zéro\")\n    return resultat\n\nprint(diviser(10, 0))",
      "question": "Ce code affiche 'Erreur : division par zéro' puis plante. Pourquoi ?",
      "options": [
        "resultat n'est jamais assigné quand b vaut 0, donc return resultat lève NameError",
        "L'except aurait dû capturer ArithmeticError : ZeroDivisionError ne couvre que la division entière avec //",
        "Le return placé hors du bloc try relance automatiquement l'exception qui vient d'être capturée",
        "Il manque un bloc finally : sans lui, une fonction contenant un try ne peut pas retourner de valeur"
      ],
      "answer": 0,
      "explanation": "Quand b vaut 0, l'exception est capturée et le message s'affiche, mais l'assignation de resultat a été interrompue : au moment du return, la variable n'existe pas et Python lève NameError. Il faudrait retourner une valeur dans le except ou initialiser resultat avant le try. ZeroDivisionError couvre la division / comme la division entière //, inutile de remonter à ArithmeticError. Un return après un except ne relance jamais l'exception capturée : elle a été traitée et absorbée. Et finally sert à exécuter du code de nettoyage dans tous les cas, il n'est en rien nécessaire pour qu'une fonction retourne une valeur.",
      "hint": "Si l'erreur survient AVANT l'assignation de resultat, que vaut resultat au moment du return ?"
    },
    {
      "id": "py-09",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "json",
        "fichier"
      ],
      "code": "import json\n\ndata = [\n    {\"nom\": \"Alice\", \"score\": 85},\n    {\"nom\": \"Bob\", \"score\": 92}\n]\n\nwith open('scores.json', 'w') as f:\n    json.dump(data, f)\n\nwith open('scores.json', 'r') as f:\n    loaded = json.load(f)\n\nprint(type(loaded))\nprint(loaded[1][\"nom\"])",
      "question": "Qu'affiche ce code ?",
      "options": [
        "<class 'list'> puis Bob",
        "<class 'dict'> puis Bob",
        "<class 'list'> puis Alice",
        "<class 'str'> puis TypeError sur loaded[1][\"nom\"]"
      ],
      "answer": 0,
      "explanation": "json.dump() écrit la liste en JSON dans le fichier et json.load() reconstruit la structure Python d'origine : une liste de dictionnaires, donc type(loaded) est <class 'list'>. loaded[1] est le deuxième élément, {\"nom\": \"Bob\", \"score\": 92}, d'où Bob. dict serait le type si la racine du JSON était un objet, or ici la racine est un tableau. Alice est loaded[0] : l'index 1 désigne le deuxième élément, pas le premier. Et str serait le résultat de f.read() : json.load() parse le texte et rend des objets Python, pas une chaîne.",
      "hint": "json.load() reconstruit la structure Python d'origine : une liste de dicts."
    },
    {
      "id": "py-10",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "récursivité",
        "fibonacci"
      ],
      "code": "def fib(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fib(n-1) + fib(n-2)\n\nprint(fib(6))",
      "question": "Qu'affiche ce code ?",
      "options": [
        "8",
        "13",
        "5",
        "12"
      ],
      "answer": 0,
      "explanation": "La suite de Fibonacci : fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8. Chaque valeur est la somme des deux précédentes. 13 est fib(7) : le terme suivant, obtenu en comptant une étape de trop. 5 est fib(5) : une étape de moins, typique d'un décompte commencé à 1 au lieu de 0. 12 serait la somme cumulée des termes fib(0) à fib(5) : la définition additionne seulement les deux termes précédents, pas toute la suite.",
      "hint": "Construisez la suite : 0, 1, 1, 2, 3, 5, 8... Le 6ème terme (en partant de 0) est ?"
    }
  ]
};
