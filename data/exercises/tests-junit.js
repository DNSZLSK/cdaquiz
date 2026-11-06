export default {
  "domain": "tests-junit",
  "title": "Tests unitaires",
  "exercises": [
    {
      "id": "tu-01",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "assertEquals"
      ],
      "code": "class Convertisseur {\n    static double celsiusToFahrenheit(double celsius) {\n        return celsius * 9.0 / 5.0 + 32;\n    }\n}\n\n@Test\nvoid testConversion0Degre() {\n    assertEquals(32.0, Convertisseur.celsiusToFahrenheit(0));\n}",
      "question": "Ce test passe ou échoue ?",
      "options": [
        "Passe : 0 × 9 / 5 + 32 donne exactement 32.0, égal à l'attendu",
        "Échoue : la méthode renvoie l'entier 32, différent du double 32.0 attendu",
        "Échoue : assertEquals ne peut pas comparer deux doubles sans delta",
        "Échoue : erreur de compilation, on passe l'entier 0 à un paramètre double"
      ],
      "answer": 0,
      "explanation": "0 × 9/5 + 32 = 32.0. Le résultat correspond à la valeur attendue, le test passe. Le calcul s'effectue entièrement en double (9.0 / 5.0) et la méthode renvoie 32.0, jamais un entier. assertEquals accepte deux doubles sans delta et passe quand l'égalité est exacte : le delta ne sert qu'à tolérer des arrondis. Enfin, passer l'entier 0 à un paramètre double compile sans problème, Java élargit automatiquement int vers double.",
      "hint": "Faites le calcul à la main : 0 × 9 / 5 + 32 = ?"
    },
    {
      "id": "tu-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "assertEquals",
        "String"
      ],
      "code": "class Formateur {\n    static String initialiser(String prenom, String nom) {\n        return prenom.substring(0, 1).toUpperCase() + \". \" + nom.toUpperCase();\n    }\n}\n\n@Test\nvoid testInitiales() {\n    assertEquals(\"K. LE GOFF\", Formateur.initialiser(\"kéwin\", \"Le Goff\"));\n}",
      "question": "Ce test passe ou échoue ?",
      "options": [
        "Passe : le résultat vaut exactement \"K. LE GOFF\"",
        "Échoue : substring(0, 1) renvoie \"ké\" car les index 0 et 1 sont inclus",
        "Échoue : le résultat est \"K.LE GOFF\", il manque l'espace après le point",
        "Échoue : toUpperCase() ne modifie pas nom, qui reste \"Le Goff\""
      ],
      "answer": 0,
      "explanation": "prenom.substring(0,1) = \"k\", .toUpperCase() = \"K\". nom.toUpperCase() = \"LE GOFF\". Résultat : \"K. LE GOFF\" qui correspond à l'attendu. substring(0, 1) s'arrête AVANT l'index de fin : il renvoie \"k\", pas \"ké\". L'espace est bien présent, la chaîne concaténée est \". \" avec un espace. Et si toUpperCase() ne modifie effectivement pas la chaîne d'origine (les String sont immuables), c'est sa valeur de RETOUR qui est concaténée ici, donc le nom est bien en majuscules.",
      "hint": "Tracez chaque opération : substring → toUpperCase sur la première lettre, puis toUpperCase sur tout le nom."
    },
    {
      "id": "tu-03",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "assertThrows"
      ],
      "code": "class Diviseur {\n    static int diviser(int a, int b) {\n        if (b == 0) throw new ArithmeticException(\"Division par zéro\");\n        return a / b;\n    }\n}\n\n@Test\nvoid testDivisionParZero() {\n    assertThrows(ArithmeticException.class, () -> {\n        Diviseur.diviser(10, 0);\n    });\n}",
      "question": "Ce test passe ou échoue ?",
      "options": [
        "Passe : assertThrows attend justement une ArithmeticException, et elle est levée",
        "Échoue : l'exception levée dans le lambda interrompt le test avant la fin",
        "Échoue : il faudrait un try/catch autour de l'appel pour attraper l'exception",
        "Échoue : assertThrows attend une instance d'exception, pas ArithmeticException.class"
      ],
      "answer": 0,
      "explanation": "assertThrows vérifie qu'une exception du type donné est bien levée par le code dans le lambda. Ici, diviser(10, 0) lève bien ArithmeticException, donc le test passe. L'exception n'interrompt pas le test : assertThrows exécute le lambda et attrape lui-même l'exception. Aucun try/catch n'est nécessaire, c'est précisément ce que assertThrows remplace. Et la signature attend bien la CLASSE de l'exception (ArithmeticException.class), pas une instance.",
      "hint": "Que vérifie assertThrows : que le code s'exécute sans erreur, ou qu'il lève une exception précise ?"
    },
    {
      "id": "tu-04",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "assertEquals"
      ],
      "code": "class Panier {\n    private List<Double> articles = new ArrayList<>();\n    \n    void ajouter(double prix) {\n        articles.add(prix);\n    }\n    \n    double total() {\n        return articles.stream().mapToDouble(Double::doubleValue).sum();\n    }\n}\n\n@Test\nvoid testTotalPanier() {\n    Panier p = new Panier();\n    p.ajouter(9.99);\n    p.ajouter(5.50);\n    p.ajouter(3.00);\n    ______(18.49, p.total(), 0.01);\n}",
      "question": "Quelle assertion complète le test ?",
      "options": [
        "assertEquals",
        "assertSame",
        "assertThat",
        "assertArrayEquals"
      ],
      "answer": 0,
      "explanation": "assertEquals avec 3 paramètres (attendu, réel, delta) est utilisé pour comparer des doubles. Le delta (0.01) tolère une petite différence due aux flottants. 9.99 + 5.50 + 3.00 = 18.49. assertSame compare les références avec == et non les valeurs, et n'accepte pas de delta. assertThat (JUnit 4 / Hamcrest) s'utilise avec un matcher (is, closeTo...), pas avec trois valeurs numériques. assertArrayEquals compare deux tableaux élément par élément, or on compare ici deux doubles simples.",
      "hint": "Quand on compare des doubles, on ajoute un 3ème paramètre (delta) pour la tolérance des arrondis."
    },
    {
      "id": "tu-05",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "Mockito",
        "when",
        "thenReturn"
      ],
      "code": "// Interface\ninterface IMeteoService {\n    int getTemperature(String ville);\n}\n\n// Classe à tester\nclass ConseilVestimentaire {\n    IMeteoService meteo;\n    \n    ConseilVestimentaire(IMeteoService meteo) {\n        this.meteo = meteo;\n    }\n    \n    String conseil(String ville) {\n        int temp = meteo.getTemperature(ville);\n        if (temp < 10) return \"Manteau\";\n        if (temp < 20) return \"Veste\";\n        return \"T-shirt\";\n    }\n}\n\n// Test\n@Test\nvoid testConseilFroid() {\n    IMeteoService mockMeteo = Mockito.mock(IMeteoService.class);\n    Mockito.when(mockMeteo.getTemperature(\"Brest\")).thenReturn(7);\n    \n    ConseilVestimentaire cv = new ConseilVestimentaire(mockMeteo);\n    assertEquals(\"Manteau\", cv.conseil(\"Brest\"));\n}",
      "question": "Ce test passe ou échoue ?",
      "options": [
        "Passe : le mock renvoie 7, et le premier test 7 < 10 renvoie Manteau",
        "Échoue : conseil() retourne \"Veste\", car 7 < 20 est vrai aussi",
        "Échoue : sans @ExtendWith(MockitoExtension.class), le mock n'est pas initialisé",
        "Échoue : il manque un Mockito.verify() pour que le test soit validé"
      ],
      "answer": 0,
      "explanation": "Le mock simule IMeteoService. Quand on appelle getTemperature(\"Brest\"), il retourne 7 (grâce au when/thenReturn). 7 < 10 donc conseil() retourne \"Manteau\". Le assertEquals vérifie que c'est bien \"Manteau\". Le test passe. C'est le principe de Mockito : on isole la classe testée de ses dépendances. Le premier if fait un return immédiat : la condition 7 < 20 n'est donc jamais évaluée. @ExtendWith(MockitoExtension.class) n'est requis que pour l'annotation @Mock, l'appel explicite Mockito.mock() suffit ici. Et verify() est optionnel : il contrôle les interactions avec le mock, il ne conditionne pas la validité du test.",
      "hint": "Le mock remplace le vrai service météo. when().thenReturn() définit ce que le mock retourne."
    },
    {
      "id": "tu-06",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "FIRST",
        "indépendance"
      ],
      "code": "static int compteur = 0;\n\n@Test\nvoid testIncrementA() {\n    compteur++;\n    assertEquals(1, compteur);\n}\n\n@Test\nvoid testIncrementB() {\n    compteur++;\n    assertEquals(2, compteur);\n}",
      "question": "Quel principe FIRST est violé ici ?",
      "options": [
        "Fast (rapide)",
        "Independent (indépendant)",
        "Repeatable (reproductible)",
        "Self-validating (auto-validant)"
      ],
      "answer": 1,
      "explanation": "Les deux tests partagent un état mutable (compteur). testIncrementB dépend du fait que testIncrementA s'exécute en premier. Si l'ordre d'exécution change, testIncrementB échouera. Chaque test doit être indépendant des autres. Fast serait violé par des tests lents (réseau, base de données), pas par un état partagé. Repeatable est tentant, mais relancer la suite complète dans le même ordre redonne le même verdict : le vrai problème est la dépendance ENTRE les tests. Self-validating est respecté, chaque test rend un verdict pass/fail sans interprétation humaine.",
      "hint": "Que se passe-t-il si l'ordre d'exécution des tests change ?"
    },
    {
      "id": "tu-07",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "Mockito",
        "verify"
      ],
      "code": "interface IEmailService {\n    void envoyer(String destinataire, String sujet);\n}\n\nclass InscriptionService {\n    IEmailService emailService;\n    \n    InscriptionService(IEmailService emailService) {\n        this.emailService = emailService;\n    }\n    \n    void inscrire(String email) {\n        // ... logique d'inscription ...\n        emailService.envoyer(email, \"Bienvenue !\");\n    }\n}\n\n@Test\nvoid testEnvoiEmailAInscription() {\n    IEmailService mockEmail = Mockito.mock(IEmailService.class);\n    InscriptionService service = new InscriptionService(mockEmail);\n    \n    service.inscrire(\"test@mail.com\");\n    \n    Mockito.______(mockEmail).envoyer(\"test@mail.com\", \"Bienvenue !\");\n}",
      "question": "Quel mot complète l'assertion Mockito ?",
      "options": [
        "when",
        "verify",
        "spy",
        "times"
      ],
      "answer": 1,
      "explanation": "Mockito.verify() vérifie qu'une méthode a bien été appelée sur le mock avec les bons paramètres. Ici on vérifie que envoyer() a été appelé avec le bon email et le bon sujet. when() configure ce que le mock retourne AVANT l'action, il ne vérifie rien après coup, et envoyer() étant void il n'y aurait rien à stuber. spy() enveloppe un objet réel pour en observer les appels, ce n'est pas une assertion. times() existe bien, mais uniquement comme second argument de verify (verify(mock, times(1))), jamais seul.",
      "hint": "when() configure ce que le mock RETOURNE. Ce mot-clé vérifie ce que le mock a REÇU."
    },
    {
      "id": "tu-08",
      "type": "debug",
      "difficulty": "advanced",
      "concepts": [
        "assertEquals",
        "boundary"
      ],
      "code": "class Calculateur {\n    static String categorieAge(int age) {\n        if (age < 0) throw new IllegalArgumentException();\n        if (age < 18) return \"mineur\";\n        if (age < 65) return \"adulte\";\n        return \"senior\";\n    }\n}\n\n@Test\nvoid testAdulte() {\n    assertEquals(\"adulte\", Calculateur.categorieAge(18));\n}\n\n@Test\nvoid testSenior() {\n    assertEquals(\"senior\", Calculateur.categorieAge(64));\n}",
      "question": "Lequel de ces deux tests échoue ?",
      "options": [
        "Seul testAdulte échoue",
        "Seul testSenior échoue",
        "Les deux tests passent",
        "Les deux tests échouent"
      ],
      "answer": 1,
      "explanation": "testAdulte : 18 n'est PAS < 18, donc on passe au if suivant. 18 < 65 = true → \"adulte\". Le test passe. testSenior : 64 < 65 = true → \"adulte\" (pas \"senior\"). Le test échoue car il attend \"senior\" mais reçoit \"adulte\". La valeur limite est 65, pas 64. Croire que testAdulte échoue revient à lire la borne 18 < 18 comme vraie, or elle est stricte : 18 tombe bien dans \"adulte\". Croire que les deux passent revient à classer 64 en senior alors que 64 < 65 le classe adulte. Et les deux n'échouent pas : seul testSenior a mal choisi sa valeur limite.",
      "hint": "Pour chaque test, suivez les if dans l'ordre avec la valeur passée : où s'arrête 18 ? Où s'arrête 64 ?"
    },
    {
      "id": "tu-09",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "test paramétré",
        "valeurs limites"
      ],
      "code": "static boolean estMajeur(int age) {\n    return age > 18;\n}\n\n@ParameterizedTest\n@ValueSource(ints = {18, 30})\nvoid majeur(int age) {\n    assertTrue(estMajeur(age));\n}",
      "question": "Quel est le résultat des tests ?",
      "options": [
        "Les deux cas passent",
        "Les deux cas échouent",
        "Le cas 18 échoue, le cas 30 passe",
        "Le cas 30 échoue, le cas 18 passe"
      ],
      "answer": 2,
      "explanation": "@ParameterizedTest lance la même méthode une fois par valeur de @ValueSource : deux cas, 18 et 30. estMajeur(30) vaut true, ce cas passe. estMajeur(18) vaut false, car 18 > 18 est faux : ce cas échoue. Le bug est un > au lieu de >= : c'est exactement pour ça qu'on teste la valeur limite (18) et pas seulement une valeur confortable (30).",
      "hint": "Calculez estMajeur(18) et estMajeur(30) séparément : 18 > 18 est-il vrai ?"
    }
  ]
};
