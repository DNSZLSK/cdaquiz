export default {
  "domain": "python",
  "title": "Python",
  "icon": "🐍",
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
        "Erreur — on ne peut pas concaténer str et int",
        "Kéwin a age ans",
        "nom a 34 ans"
      ],
      "answer": 0,
      "explanation": "str(age) convertit l'entier 34 en string \"34\". La concaténation avec + assemble tous les morceaux. Sans str(), on aurait une TypeError car on ne peut pas concaténer str + int directement.",
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
        "['rock', 'jazz', 'reggae'] puis techno",
        "['jazz', 'reggae', 'techno'] puis dub",
        "Erreur — index négatif invalide"
      ],
      "answer": 0,
      "explanation": "genres[1:3] prend les éléments d'index 1 (inclus) à 3 (exclu) → ['jazz', 'reggae']. genres[-1] prend le dernier élément → 'dub'. Le slicing en Python est toujours [début inclus : fin exclue].",
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
        "Erreur — on ne peut pas modifier un dictionnaire",
        "IPA Tempête -10"
      ],
      "answer": 0,
      "explanation": "Les dictionnaires sont mutables. biere[\"stock\"] -= 10 soustrait 10 à la valeur existante (45 - 10 = 35). print() affiche les deux valeurs séparées par un espace.",
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
        "True puis True",
        "Erreur — [::-1] n'existe pas"
      ],
      "answer": 0,
      "explanation": "mot.lower() → 'kayak'. mot[::-1] inverse la string → 'kayak'. 'kayak' == 'kayak' → True. Pour 'python' : 'python'[::-1] = 'nohtyp'. 'python' != 'nohtyp' → False.",
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
        "5",
        "15",
        "Erreur — récursion infinie"
      ],
      "answer": 0,
      "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120. La récursion : factorielle(5) = 5 × factorielle(4) = 5 × 4 × factorielle(3) = ... jusqu'à factorielle(1) qui retourne 1.",
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
        "clean()",
        "remove()"
      ],
      "answer": 1,
      "explanation": "strip() supprime les espaces et caractères de fin de ligne (\\n, \\r) au début et à la fin d'une string. En Python c'est strip(), pas trim() (qui est en JavaScript/Java).",
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
        "[1, 2, 3, 4, 5, 6, 7, 8]",
        "Erreur de syntaxe"
      ],
      "answer": 0,
      "explanation": "C'est une list comprehension avec filtre. Pour chaque n dans nombres, si n % 2 == 0 (pair), on garde n. Résultat : [2, 4, 6, 8].",
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
        "ZeroDivisionError n'est pas le bon type d'exception",
        "Il manque un finally",
        "try/except ne fonctionne pas avec la division"
      ],
      "answer": 0,
      "explanation": "Quand b = 0, l'exception est catchée et le message s'affiche. Mais resultat n'a jamais été assigné (l'assignation a été interrompue par l'exception). Le return resultat lève alors NameError car la variable n'existe pas. Il faudrait soit retourner dans le except, soit initialiser resultat avant le try.",
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
        "<class 'str'> puis Erreur",
        "<class 'list'> puis Alice"
      ],
      "answer": 0,
      "explanation": "json.dump() écrit la liste en JSON dans le fichier. json.load() la relit en Python : c'est toujours une liste de dictionnaires. type(loaded) = list. loaded[1] = le 2ème élément = {\"nom\": \"Bob\", \"score\": 92}. loaded[1][\"nom\"] = \"Bob\".",
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
        "6"
      ],
      "answer": 0,
      "explanation": "La suite de Fibonacci : fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8. Chaque valeur est la somme des deux précédentes.",
      "hint": "Construisez la suite : 0, 1, 1, 2, 3, 5, 8... Le 6ème terme (en partant de 0) est ?"
    }
  ]
};
