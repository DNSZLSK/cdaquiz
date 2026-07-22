export default {
  "domain": "oop-java",
  "title": "POO Java",
  "icon": "☕",
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
        "Erreur de compilation",
        "null"
      ],
      "answer": 1,
      "explanation": "La variable i est déclarée de type Instrument mais instanciée avec new Guitare(). En Java, les méthodes sont résolues au runtime (liaison dynamique). C'est la méthode jouer() de Guitare qui est appelée. C'est le polymorphisme.",
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
        "Erreur de compilation",
        "Kouign-amann pour null"
      ],
      "answer": 0,
      "explanation": "Le constructeur reçoit les paramètres et les affecte aux attributs via this. L'appel afficher() concatène nom et nbPersonnes.",
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
        "Un enum",
        "Une classe concrète"
      ],
      "answer": 1,
      "explanation": "Le mot-clé interface définit un contrat : toute classe qui implémente IExportable devra fournir le corps de exporterCSV() et exporterJSON(). L'interface ne contient que des signatures de méthodes (pas de corps, pas d'attributs d'instance).",
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
        "inherits",
        "super"
      ],
      "answer": 1,
      "explanation": "En Java, une classe hérite d'une autre classe avec le mot-clé extends. Le mot-clé implements est réservé aux interfaces.",
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
        "inherits",
        "uses"
      ],
      "answer": 1,
      "explanation": "Une classe implémente une interface avec implements. Elle doit alors fournir le corps de toutes les méthodes déclarées dans l'interface.",
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
        "[EMAIL] Nouveau message\\n[SMS] Nouveau message",
        "[EMAIL] Nouveau message\\n[EMAIL] Nouveau message",
        "Erreur de compilation",
        "null\\nnull"
      ],
      "answer": 0,
      "explanation": "C'est du polymorphisme via interface. envoyer() accepte n'importe quel IMessage. Au runtime, c'est le type réel (Email ou SMS) qui détermine quelle version de formater() est appelée.",
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
        "Héritage",
        "Agrégation",
        "Composition",
        "Implémentation"
      ],
      "answer": 2,
      "explanation": "Le Moteur est créé À L'INTÉRIEUR du constructeur de Voiture (new Moteur(puissance)). Il n'existe pas indépendamment de la Voiture. Si la Voiture est supprimée, le Moteur disparaît aussi. C'est une composition. Si le Moteur était passé en paramètre et existait indépendamment, ce serait une agrégation.",
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
        "Héritage",
        "Agrégation",
        "Composition",
        "Implémentation"
      ],
      "answer": 1,
      "explanation": "Le Conducteur est créé à l'extérieur de la Voiture et passé via un setter. Il peut exister sans la Voiture. Si la Voiture est supprimée, le Conducteur existe toujours. C'est une agrégation.",
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
        "Erreur de compilation",
        "AUTOMNE commence en null"
      ],
      "answer": 0,
      "explanation": "Un enum en Java peut avoir des attributs et un constructeur. Chaque valeur est construite avec les paramètres entre parenthèses. toString() d'un enum retourne le nom de la constante (AUTOMNE).",
      "hint": "Les enums Java sont plus puissants que de simples constantes — ils peuvent avoir des attributs."
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
        "solde est private, on ne peut pas y accéder depuis Main",
        "Il manque un constructeur par défaut",
        "deposer() devrait retourner void",
        "Il manque le mot-clé static"
      ],
      "answer": 0,
      "explanation": "L'attribut solde est déclaré private. Il n'est accessible que depuis l'intérieur de la classe CompteBancaire. Pour y accéder depuis Main, il faudrait un getter public : public double getSolde() { return solde; }. C'est le principe d'encapsulation.",
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
        "Non, abstract et extends sont incompatibles",
        "Oui, mais il affiche 'rouge : 0.0'"
      ],
      "answer": 0,
      "explanation": "On instancie un Cercle (classe concrète), pas une Forme. Cercle fournit l'implémentation de aire(). afficher() appelle aire() qui est résolue dynamiquement vers Cercle.aire(). Le résultat est π × 1² ≈ 3.14159...",
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
        "parent",
        "Animal"
      ],
      "answer": 1,
      "explanation": "super() appelle le constructeur de la classe parente. C'est obligatoire quand le constructeur parent a des paramètres (pas de constructeur par défaut). L'appel à super() doit être la première instruction du constructeur enfant.",
      "hint": "En Java, pour appeler le constructeur du parent, on utilise un mot-clé spécial qui signifie 'au-dessus'."
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
        "Observer",
        "Singleton",
        "Strategy",
        "Factory"
      ],
      "answer": 2,
      "explanation": "C'est le pattern Strategy. Le comportement de calcul du prix est encapsulé dans des classes interchangeables (TarifNormal, TarifFidele, TarifGros) qui implémentent la même interface. Le Panier délègue le calcul à la stratégie injectée. On peut changer le comportement sans modifier le Panier.",
      "hint": "Regardez comment le Panier ne sait pas COMMENT le prix est calculé — il délègue à un objet interchangeable."
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
        "20.0",
        "12.0",
        "Erreur de compilation"
      ],
      "answer": 0,
      "explanation": "Carré : 4 × 5 = 20. Triangle : 3 + 4 + 5 = 12. Total : 20 + 12 = 32.0. La boucle for-each itère sur la liste et appelle perimetre() de manière polymorphique. Chaque objet utilise sa propre implémentation.",
      "hint": "Calculez le périmètre de chaque forme séparément, puis additionnez."
    },
    {
      "id": "oop-15",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "multiplicité"
      ],
      "code": "class Equipe {\n    String nom;\n    List<Joueur> joueurs; // Une équipe a plusieurs joueurs\n    \n    Equipe(String nom) {\n        this.nom = nom;\n        this.joueurs = new ArrayList<>();\n    }\n    \n    void recruter(Joueur j) {\n        joueurs.add(j);\n    }\n}\n\nclass Joueur {\n    String nom;\n    Equipe equipe; // Un joueur appartient à une seule équipe\n    \n    Joueur(String nom) {\n        this.nom = nom;\n    }\n}",
      "question": "Quelle est la multiplicité de la relation entre Equipe et Joueur ?",
      "options": [
        "1 - 1",
        "1 - N (une équipe a N joueurs)",
        "N - N",
        "0 - 1"
      ],
      "answer": 1,
      "explanation": "Une Equipe possède une List<Joueur> (plusieurs joueurs), et un Joueur a une seule Equipe. C'est une relation 1 vers N. La relation est bidirectionnelle car chaque côté a une référence vers l'autre.",
      "hint": "Regardez les types des attributs : List<> = plusieurs, simple référence = un seul."
    }
  ]
};
