export default {
  "domain": "oop-java",
  "title": "POO Java",
  "exercises": [
    {
      "id": "oop-01",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "héritage",
        "redéfinition"
      ],
      "code": "class Instrument {\n    String nom = \"Instrument\";\n    void jouer() {\n        System.out.println(\"...\");\n    }\n}\n\nclass Guitare extends Instrument {\n    String nom = \"Guitare\";\n    void jouer() {\n        System.out.println(\"🎸 Gratte gratte\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Instrument i = new Guitare();\n        i.jouer();\n    }\n}",
      "question": "Qu'affiche ce code ?",
      "options": [
        "...",
        "🎸 Gratte gratte",
        "... puis 🎸 Gratte gratte",
        "Erreur de compilation"
      ],
      "answer": 1,
      "explanation": "La variable i est déclarée de type Instrument mais instanciée avec new Guitare(). En Java, les méthodes d'instance sont résolues au runtime (liaison dynamique) : c'est jouer() de Guitare qui s'exécute, c'est le polymorphisme. '...' supposerait une liaison statique sur le type déclaré, ce que Java ne fait jamais pour une méthode redéfinie. Les deux lignes ne s'afficheraient que si Guitare.jouer() appelait super.jouer(), ce qui n'est pas le cas : la redéfinition remplace la version parente. Et le code compile bien : redéfinir jouer() et redéclarer un champ nom dans la sous-classe (masquage de champ) sont tous deux légaux.",
      "hint": "Le type déclaré détermine ce qu'on peut appeler, mais le type réel détermine ce qui s'exécute."
    },
    {
      "id": "oop-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "constructeur",
        "this"
      ],
      "code": "class Recette {\n    String nom;\n    int nbPersonnes;\n\n    Recette(String nom, int nbPersonnes) {\n        this.nom = nom;\n        this.nbPersonnes = nbPersonnes;\n    }\n\n    void afficher() {\n        System.out.println(nom + \" pour \" + nbPersonnes);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Recette r = new Recette(\"Kouign-amann\", 8);\n        r.afficher();\n    }\n}",
      "question": "Qu'affiche ce code ?",
      "options": [
        "Kouign-amann pour 8",
        "null pour 0",
        "Kouign-amann pour 0",
        "Erreur de compilation"
      ],
      "answer": 0,
      "explanation": "Le constructeur reçoit les paramètres et les affecte aux attributs via this. L'appel afficher() concatène nom et nbPersonnes. 'null pour 0' serait la sortie si les attributs restaient à leur valeur par défaut, par exemple avec une auto-affectation du paramètre (nom = nom sans this), mais ici this.nom désigne bien l'attribut. 'Kouign-amann pour 0' supposerait que seule la première affectation s'exécute, or les deux lignes du constructeur sont exécutées. Enfin donner le même nom au paramètre et à l'attribut est parfaitement légal, c'est justement le rôle de this de les distinguer : aucune erreur de compilation.",
      "hint": "this.nom fait référence à l'attribut de l'objet, nom seul fait référence au paramètre du constructeur."
    },
    {
      "id": "oop-03",
      "type": "identify",
      "difficulty": "beginner",
      "concepts": [
        "interface"
      ],
      "code": "public interface IExportable {\n    String exporterCSV();\n    String exporterJSON();\n}",
      "question": "Quel concept OOP est représenté ici ?",
      "options": [
        "Une classe abstraite",
        "Une interface",
        "Une annotation (@interface)",
        "Un record"
      ],
      "answer": 1,
      "explanation": "Le mot-clé interface définit un contrat : toute classe qui implémente IExportable devra fournir le corps de exporterCSV() et exporterJSON(). Une classe abstraite se déclarerait avec abstract class et pourrait contenir des attributs d'instance et des constructeurs, absents ici. Une annotation se déclare avec @interface (avec l'arobase), pas avec interface seul. Un record se déclare avec le mot-clé record et sert à transporter des données immuables, pas à définir un contrat de méthodes.",
      "hint": "Regardez le mot-clé utilisé à la place de 'class'."
    },
    {
      "id": "oop-04",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "héritage",
        "extends"
      ],
      "code": "class Vehicule {\n    int vitesseMax;\n    void demarrer() {\n        System.out.println(\"Vroooom\");\n    }\n}\n\nclass Moto ______ Vehicule {\n    int cylindree;\n}",
      "question": "Quel mot-clé remplace le blanc pour que Moto hérite de Vehicule ?",
      "options": [
        "implements",
        "extends",
        "super",
        "instanceof"
      ],
      "answer": 1,
      "explanation": "En Java, une classe hérite d'une autre classe avec le mot-clé extends. implements est réservé à l'implémentation d'une interface, or Vehicule est une classe. super existe bien mais s'utilise dans le corps d'une classe pour accéder au parent (super() ou super.methode()), jamais dans la déclaration d'héritage. instanceof est un opérateur qui teste le type réel d'un objet à l'exécution, il ne déclare aucune relation entre classes.",
      "hint": "On étend une classe, on implémente une interface."
    },
    {
      "id": "oop-05",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "interface",
        "implements"
      ],
      "code": "interface ICuisable {\n    void cuire(int minutes);\n    boolean estCuit();\n}\n\nclass Pizza ______ ICuisable {\n    private boolean cuite = false;\n    \n    public void cuire(int minutes) {\n        if (minutes >= 12) cuite = true;\n    }\n    \n    public boolean estCuit() {\n        return cuite;\n    }\n}",
      "question": "Quel mot-clé remplace le blanc ?",
      "options": [
        "extends",
        "implements",
        "abstract",
        "import"
      ],
      "answer": 1,
      "explanation": "Une classe implémente une interface avec implements. Elle doit alors fournir le corps de toutes les méthodes déclarées dans l'interface. extends servirait si ICuisable était une classe, ou pour une interface qui en étend une autre, mais une classe n'étend pas une interface. abstract est un modificateur qui se place avant class, pas entre le nom de la classe et l'interface. import sert à rendre visible un type d'un autre package en tête de fichier, il n'établit aucun lien d'implémentation.",
      "hint": "On extends une classe, on implements une interface."
    },
    {
      "id": "oop-06",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "polymorphisme",
        "interface"
      ],
      "code": "interface IMessage {\n    String formater();\n}\n\nclass Email implements IMessage {\n    public String formater() {\n        return \"[EMAIL] Nouveau message\";\n    }\n}\n\nclass SMS implements IMessage {\n    public String formater() {\n        return \"[SMS] Nouveau message\";\n    }\n}\n\npublic class Main {\n    static void envoyer(IMessage msg) {\n        System.out.println(msg.formater());\n    }\n    \n    public static void main(String[] args) {\n        IMessage m1 = new Email();\n        IMessage m2 = new SMS();\n        envoyer(m1);\n        envoyer(m2);\n    }\n}",
      "question": "Qu'affiche ce code ?",
      "options": [
        "[EMAIL] Nouveau message puis [SMS] Nouveau message",
        "[SMS] Nouveau message puis [EMAIL] Nouveau message",
        "[EMAIL] Nouveau message deux fois",
        "Erreur de compilation"
      ],
      "answer": 0,
      "explanation": "C'est du polymorphisme via interface. envoyer() accepte n'importe quel IMessage. Au runtime, c'est le type réel (Email ou SMS) qui détermine quelle version de formater() est appelée. L'ordre inverse supposerait que envoyer(m2) s'exécute avant envoyer(m1), or les appels sont séquentiels. Deux lignes [EMAIL] correspondraient à une résolution figée sur la première implémentation rencontrée, ce que Java ne fait pas : chaque objet garde son propre comportement. Et déclarer une variable de type interface (IMessage m1) est légal tant qu'on l'initialise avec une classe concrète : le code compile sans problème.",
      "hint": "Le type déclaré est IMessage pour les deux, mais le type réel est différent."
    },
    {
      "id": "oop-07",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "composition",
        "agrégation"
      ],
      "code": "class Moteur {\n    int puissance;\n    Moteur(int puissance) { this.puissance = puissance; }\n}\n\nclass Voiture {\n    String marque;\n    Moteur moteur;\n    \n    Voiture(String marque, int puissance) {\n        this.marque = marque;\n        this.moteur = new Moteur(puissance); // créé dans le constructeur\n    }\n}",
      "question": "Quelle est la relation entre Voiture et Moteur ?",
      "options": [
        "Agrégation",
        "Dépendance",
        "Composition",
        "Association simple"
      ],
      "answer": 2,
      "explanation": "Le Moteur est créé À L'INTÉRIEUR du constructeur de Voiture (new Moteur(puissance)). Il n'existe pas indépendamment de la Voiture : si la Voiture est supprimée, le Moteur disparaît aussi. C'est une composition. L'agrégation supposerait un Moteur créé à l'extérieur et passé en paramètre, avec un cycle de vie indépendant. La dépendance décrirait un Moteur utilisé ponctuellement (paramètre de méthode ou variable locale) sans être stocké en attribut. L'association simple désigne un lien sans possession du cycle de vie, or ici la Voiture crée et détient entièrement son Moteur.",
      "hint": "Regardez OÙ le moteur est créé. Est-il créé à l'intérieur de la voiture ou passé de l'extérieur ?"
    },
    {
      "id": "oop-08",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "composition",
        "agrégation"
      ],
      "code": "class Conducteur {\n    String nom;\n    Conducteur(String nom) { this.nom = nom; }\n}\n\nclass Voiture {\n    String marque;\n    Conducteur conducteur;\n    \n    Voiture(String marque) {\n        this.marque = marque;\n    }\n    \n    void setConducteur(Conducteur c) {\n        this.conducteur = c; // référence externe\n    }\n}",
      "question": "Quelle est la relation entre Voiture et Conducteur ?",
      "options": [
        "Composition",
        "Agrégation",
        "Dépendance",
        "Héritage"
      ],
      "answer": 1,
      "explanation": "Le Conducteur est créé à l'extérieur de la Voiture et passé via un setter. Il peut exister sans la Voiture : si la Voiture est supprimée, le Conducteur existe toujours. C'est une agrégation. La composition exigerait que le Conducteur soit créé dans le constructeur de la Voiture et disparaisse avec elle. La dépendance correspondrait à un Conducteur simplement utilisé le temps d'une méthode sans être conservé, or il est stocké durablement dans l'attribut conducteur. L'héritage impliquerait Voiture extends Conducteur, ce qui n'apparaît nulle part et n'aurait aucun sens ici.",
      "hint": "Comparez avec l'exercice précédent. Ici le Conducteur est passé de l'extérieur."
    },
    {
      "id": "oop-09",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "enum"
      ],
      "code": "enum Saison {\n    PRINTEMPS(\"Mars\"),\n    ETE(\"Juin\"),\n    AUTOMNE(\"Septembre\"),\n    HIVER(\"Décembre\");\n    \n    String premierMois;\n    \n    Saison(String premierMois) {\n        this.premierMois = premierMois;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Saison s = Saison.AUTOMNE;\n        System.out.println(s + \" commence en \" + s.premierMois);\n    }\n}",
      "question": "Qu'affiche ce code ?",
      "options": [
        "AUTOMNE commence en Septembre",
        "Saison.AUTOMNE commence en Septembre",
        "2 commence en Septembre",
        "AUTOMNE commence en null"
      ],
      "answer": 0,
      "explanation": "Un enum en Java peut avoir des attributs et un constructeur. Chaque valeur est construite avec les paramètres entre parenthèses, et toString() retourne le nom de la constante (AUTOMNE). 'Saison.AUTOMNE' est la notation utilisée dans le code pour y accéder, mais toString() ne préfixe pas le nom du type. '2' serait le résultat de s.ordinal(), la position de la constante, or ordinal() n'est pas appelé ici. Et premierMois ne vaut pas null : le constructeur de chaque constante est exécuté au chargement de l'enum avec la valeur fournie entre parenthèses.",
      "hint": "Les enums Java sont plus puissants que de simples constantes : ils peuvent avoir des attributs."
    },
    {
      "id": "oop-10",
      "type": "debug",
      "difficulty": "intermediate",
      "concepts": [
        "encapsulation",
        "private",
        "getter"
      ],
      "code": "class CompteBancaire {\n    private double solde;\n    \n    CompteBancaire(double soldeInitial) {\n        this.solde = soldeInitial;\n    }\n    \n    public void deposer(double montant) {\n        solde += montant;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        CompteBancaire cb = new CompteBancaire(1000);\n        cb.deposer(500);\n        System.out.println(cb.solde);\n    }\n}",
      "question": "Ce code ne compile pas. Pourquoi ?",
      "options": [
        "solde est private : Main ne peut pas y accéder directement",
        "Il manque un constructeur par défaut dans CompteBancaire",
        "CompteBancaire devrait être déclarée public pour être utilisée dans Main",
        "new CompteBancaire(1000) exige un cast car le constructeur attend un double"
      ],
      "answer": 0,
      "explanation": "L'attribut solde est déclaré private. Il n'est accessible que depuis l'intérieur de la classe CompteBancaire. Pour y accéder depuis Main, il faudrait un getter public : public double getSolde() { return solde; }. C'est le principe d'encapsulation. Aucun constructeur par défaut n'est requis : Main utilise bien le constructeur à un paramètre qui existe. Une classe sans modificateur est visible dans tout son package, Main peut donc l'utiliser sans qu'elle soit public. Et passer l'entier 1000 là où un double est attendu est une conversion élargissante implicite : aucun cast n'est nécessaire.",
      "hint": "Regardez le modificateur d'accès de l'attribut solde."
    },
    {
      "id": "oop-11",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "classe abstraite",
        "héritage"
      ],
      "code": "abstract class Forme {\n    String couleur;\n    \n    Forme(String couleur) {\n        this.couleur = couleur;\n    }\n    \n    abstract double aire();\n    \n    void afficher() {\n        System.out.println(couleur + \" : \" + aire());\n    }\n}\n\nclass Cercle extends Forme {\n    double rayon;\n    \n    Cercle(String couleur, double rayon) {\n        super(couleur);\n        this.rayon = rayon;\n    }\n    \n    double aire() {\n        return Math.PI * rayon * rayon;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Forme f = new Cercle(\"rouge\", 1);\n        f.afficher();\n    }\n}",
      "question": "Ce code compile-t-il et s'exécute-t-il ?",
      "options": [
        "Oui, il affiche 'rouge : 3.14...'",
        "Non, on ne peut pas instancier une Forme",
        "Non, afficher() ne peut pas appeler la méthode abstraite aire()",
        "Oui, mais il affiche 'rouge : 0.0' car aire() n'a pas de corps dans Forme"
      ],
      "answer": 0,
      "explanation": "On instancie un Cercle (classe concrète), pas une Forme : new porte sur Cercle, seule la référence est de type Forme, donc aucune instanciation illégale. afficher() a parfaitement le droit d'appeler aire() bien qu'elle soit abstraite : à l'exécution, l'objet est forcément d'une sous-classe concrète qui la définit, ici Cercle.aire(), résolue dynamiquement. Et le résultat n'est pas 0.0 : une méthode abstraite n'a aucun corps par défaut, c'est bien π × 1² ≈ 3.14159... qui est calculé et affiché.",
      "hint": "On ne peut pas faire new Forme(), mais on peut faire new Cercle() et le stocker dans une variable de type Forme."
    },
    {
      "id": "oop-12",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "super",
        "constructeur"
      ],
      "code": "class Animal {\n    String espece;\n    int age;\n    \n    Animal(String espece, int age) {\n        this.espece = espece;\n        this.age = age;\n    }\n}\n\nclass Chien extends Animal {\n    String race;\n    \n    Chien(String race, int age) {\n        ______(\"Chien\", age);\n        this.race = race;\n    }\n}",
      "question": "Quel mot-clé remplace le blanc pour appeler le constructeur parent ?",
      "options": [
        "this",
        "super",
        "new Animal",
        "Animal"
      ],
      "answer": 1,
      "explanation": "super() appelle le constructeur de la classe parente. C'est obligatoire quand le constructeur parent a des paramètres (pas de constructeur par défaut), et l'appel doit être la première instruction du constructeur enfant. this(\"Chien\", age) appellerait un autre constructeur de Chien lui-même, qui n'existe pas ici. new Animal(\"Chien\", age) créerait un second objet indépendant sans initialiser la partie Animal du Chien en cours de construction. Animal(\"Chien\", age) serait interprété comme l'appel d'une méthode nommée Animal, introuvable : en Java on n'appelle jamais le constructeur parent par son nom, contrairement au C++.",
      "hint": "L'appel doit être la première instruction du constructeur, et il vise la classe dont Chien hérite."
    },
    {
      "id": "oop-13",
      "type": "identify",
      "difficulty": "advanced",
      "concepts": [
        "pattern Strategy"
      ],
      "code": "interface ITarification {\n    double calculerPrix(double prixBase, int quantite);\n}\n\nclass TarifNormal implements ITarification {\n    public double calculerPrix(double prixBase, int quantite) {\n        return prixBase * quantite;\n    }\n}\n\nclass TarifFidele implements ITarification {\n    public double calculerPrix(double prixBase, int quantite) {\n        return prixBase * quantite * 0.9;\n    }\n}\n\nclass TarifGros implements ITarification {\n    public double calculerPrix(double prixBase, int quantite) {\n        return quantite > 100 ? prixBase * quantite * 0.7 : prixBase * quantite * 0.85;\n    }\n}\n\nclass Panier {\n    ITarification strategie;\n    \n    Panier(ITarification strategie) {\n        this.strategie = strategie;\n    }\n    \n    double total(double prixBase, int quantite) {\n        return strategie.calculerPrix(prixBase, quantite);\n    }\n}",
      "question": "Quel design pattern est utilisé ici ?",
      "options": [
        "State",
        "Template Method",
        "Strategy",
        "Factory Method"
      ],
      "answer": 2,
      "explanation": "C'est le pattern Strategy. Le comportement de calcul du prix est encapsulé dans des classes interchangeables (TarifNormal, TarifFidele, TarifGros) qui implémentent la même interface, et le Panier délègue le calcul à la stratégie injectée. State a une structure très proche mais modélise les états internes d'un objet qui change de comportement au fil de ses transitions, or ici rien ne transite d'un tarif à l'autre. Template Method fait varier des étapes d'algorithme via l'héritage d'une classe abstraite, pas via une interface injectée. Factory Method concerne la création d'objets, alors qu'ici on choisit un comportement, pas une fabrication.",
      "hint": "Regardez comment le Panier ne sait pas COMMENT le prix est calculé : il délègue à un objet interchangeable."
    },
    {
      "id": "oop-14",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "polymorphisme",
        "ArrayList"
      ],
      "code": "import java.util.ArrayList;\nimport java.util.List;\n\ninterface IForme {\n    double perimetre();\n}\n\nclass Carre implements IForme {\n    double cote;\n    Carre(double cote) { this.cote = cote; }\n    public double perimetre() { return 4 * cote; }\n}\n\nclass Triangle implements IForme {\n    double a, b, c;\n    Triangle(double a, double b, double c) { this.a=a; this.b=b; this.c=c; }\n    public double perimetre() { return a + b + c; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<IForme> formes = new ArrayList<>();\n        formes.add(new Carre(5));\n        formes.add(new Triangle(3, 4, 5));\n        \n        double total = 0;\n        for (IForme f : formes) {\n            total += f.perimetre();\n        }\n        System.out.println(total);\n    }\n}",
      "question": "Qu'affiche ce code ?",
      "options": [
        "32.0",
        "31.0",
        "20.0",
        "27.0"
      ],
      "answer": 0,
      "explanation": "Carré : 4 × 5 = 20. Triangle : 3 + 4 + 5 = 12. Total : 20 + 12 = 32.0. La boucle for-each appelle perimetre() de manière polymorphique, chaque objet utilisant sa propre implémentation. 31.0 correspondrait aux aires (25 pour le carré, 6 pour le triangle 3-4-5) alors que la méthode calcule bien des périmètres. 20.0 ne compte que le carré, comme si la boucle s'arrêtait après la première itération. 27.0 correspond à un triangle réduit à 3 + 4, en oubliant le troisième côté c dans l'addition.",
      "hint": "Calculez le périmètre de chaque forme séparément, puis additionnez."
    },
    {
      "id": "oop-15",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "multiplicité"
      ],
      "code": "class Equipe {\n    String nom;\n    List<Joueur> joueurs; // Une équipe a plusieurs joueurs\n    \n    Equipe(String nom) {\n        this.nom = nom;\n        this.joueurs = new ArrayList<>();\n    }\n    \n    void recruter(Joueur j) {\n        joueurs.add(j);\n        j.equipe = this; // les deux côtés restent cohérents\n    }\n}\n\nclass Joueur {\n    String nom;\n    Equipe equipe; // Un joueur appartient à une seule équipe\n    \n    Joueur(String nom) {\n        this.nom = nom;\n    }\n}",
      "question": "Quelle est la multiplicité de la relation entre Equipe et Joueur ?",
      "options": [
        "1 - 1 (chaque côté ne détient qu'une seule référence)",
        "1 - N (une équipe a N joueurs)",
        "N - N (la relation est navigable dans les deux sens)",
        "0 - 1 (un joueur peut ne pas avoir d'équipe)"
      ],
      "answer": 1,
      "explanation": "Une Equipe possède une List<Joueur> (plusieurs joueurs), et un Joueur a une seule Equipe : c'est une relation 1 vers N, bidirectionnelle car chaque côté référence l'autre. Le 1 - 1 ignorerait la List<Joueur>, qui porte justement le côté N. Le N - N exigerait que le Joueur détienne lui aussi une collection (List<Equipe>), or il n'a qu'une référence simple : la navigabilité dans les deux sens ne fait pas une relation N - N. Et le 0 - 1 ne décrit qu'un seul côté (un joueur sans équipe au départ), il ne qualifie pas la multiplicité globale de la relation.",
      "hint": "Regardez les types des attributs : List<> = plusieurs, simple référence = un seul."
    }
  ]
};
