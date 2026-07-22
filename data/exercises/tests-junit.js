export default {
  "domain": "tests-junit",
  "title": "Tests unitaires",
  "icon": "🧪",
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
        "Passe ✅",
        "Échoue ❌ — le résultat n'est pas 32.0",
        "Échoue ❌ — erreur de compilation",
        "Échoue ❌ — NullPointerException"
      ],
      "answer": 0,
      "explanation": "0 × 9/5 + 32 = 32.0. Le résultat correspond à la valeur attendue, le test passe.",
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
        "Passe ✅ — le résultat vaut exactement \"K. LE GOFF\"",
        "Échoue ❌ — substring(0, 1) sur \"kéwin\" renvoie \"ké\", pas \"k\"",
        "Échoue ❌ — le résultat est \"K. Le Goff\", le nom n'est pas mis en majuscules",
        "Échoue ❌ — toUpperCase() lève une exception sur le \"é\" accentué"
      ],
      "answer": 0,
      "explanation": "prenom.substring(0,1) = \"k\", .toUpperCase() = \"K\". nom.toUpperCase() = \"LE GOFF\". Résultat : \"K. LE GOFF\" qui correspond à l'attendu.",
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
        "Passe ✅ — l'exception est bien levée",
        "Échoue ❌ — l'exception n'est pas attrapée",
        "Échoue ❌ — il faut utiliser assertEquals",
        "Échoue ❌ — ArithmeticException n'est pas une RuntimeException"
      ],
      "answer": 0,
      "explanation": "assertThrows vérifie qu'une exception du type donné est bien levée par le code dans le lambda. Ici, diviser(10, 0) lève bien ArithmeticException, donc le test passe.",
      "hint": "assertThrows est SATISFAIT quand l'exception est levée. C'est le but du test."
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
        "assertTrue",
        "assertNotNull",
        "assertSame"
      ],
      "answer": 0,
      "explanation": "assertEquals avec 3 paramètres (attendu, réel, delta) est utilisé pour comparer des doubles. Le delta (0.01) tolère une petite différence due aux flottants. 9.99 + 5.50 + 3.00 = 18.49.",
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
        "Passe ✅",
        "Échoue ❌ — le mock retourne null",
        "Échoue ❌ — on ne peut pas mocker une interface",
        "Échoue ❌ — 7 n'est pas < 10"
      ],
      "answer": 0,
      "explanation": "Le mock simule IMeteoService. Quand on appelle getTemperature(\"Brest\"), il retourne 7 (grâce au when/thenReturn). 7 < 10 donc conseil() retourne \"Manteau\". Le assertEquals vérifie que c'est bien \"Manteau\". Le test passe. C'est le principe de Mockito : on isole la classe testée de ses dépendances.",
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
        "Timely (opportun)"
      ],
      "answer": 1,
      "explanation": "Les deux tests partagent un état mutable (compteur). testIncrementB dépend du fait que testIncrementA s'exécute en premier. Si l'ordre d'exécution change, testIncrementB échouera. Chaque test doit être indépendant des autres.",
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
        "assert",
        "mock"
      ],
      "answer": 1,
      "explanation": "Mockito.verify() vérifie qu'une méthode a bien été appelée sur le mock avec les bons paramètres. Ici on vérifie que envoyer() a été appelé avec le bon email et le bon sujet. C'est différent de when() qui configure le comportement du mock.",
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
        "testAdulte échoue",
        "testSenior échoue",
        "Les deux passent",
        "Les deux échouent"
      ],
      "answer": 1,
      "explanation": "testAdulte : 18 n'est PAS < 18, donc on passe au if suivant. 18 < 65 = true → \"adulte\". Le test passe. testSenior : 64 < 65 = true → \"adulte\" (pas \"senior\"). Le test échoue car il attend \"senior\" mais reçoit \"adulte\". La valeur limite est 65, pas 64.",
      "hint": "Attention aux bornes : < 65 signifie que 64 entre dans cette catégorie, pas dans la suivante."
    }
  ]
};
