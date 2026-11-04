// Vocabulaire Sensei - chapitre "Parler comme un dev" : 4 lecons, 10 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "parler",
  title: "Parler comme un dev",
  goal: "Expliquer, argumenter, signaler un problème et choisir le mot juste, au travail comme au quotidien.",
  lessons: [
    {
      id: "decrire",
      title: "Décrire du code en 3 temps",
      sub: "Quoi, comment, pourquoi",
      steps: [
        {
          type: "concept",
          term: "Quoi, comment, pourquoi",
          def: "Pour décrire n'importe quel code : **1. Quoi** : ce qu'il fait. **2. Comment** : le mécanisme. **3. Pourquoi / limites** : l'intérêt ou le risque.",
          code: `// 1. Quoi : getAdults retourne les utilisateurs majeurs.
// 2. Comment : elle filtre le tableau avec un callback sur age.
// 3. Limite : si users est undefined, elle plante.`,
          phrase: "Cette fonction retourne… Pour ça, elle… Attention, si…"
        },
        {
          type: "concept",
          term: "Effet de bord",
          def: "Quand une fonction **modifie quelque chose en dehors d'elle** : une variable extérieure, l'affichage, un fichier, la base de données.",
          code: `let total = 0;
function ajouter(prix) {
  total = total + prix;   // effet de bord : modifie total
}`,
          phrase: "Cette fonction a un effet de bord : elle modifie une variable globale."
        },
        {
          type: "explain",
          q: "Décrivez ce code en 3 temps (quoi, comment, pourquoi/limite). Essayez d'utiliser : paramètre, effet de bord.",
          code: `let total = 0;

function ajouter(prix) {
  total = total + prix;
  console.log("Total : " + total);
}`,
          keywords: ["fonction", "paramètre", "variable", "effet de bord", "affiche"],
          model: "Quoi : ajouter ajoute un prix au total et affiche le nouveau total. Comment : elle prend un paramètre prix, l'additionne à la variable total déclarée en dehors de la fonction, puis affiche le résultat avec console.log. Limite : elle a deux effets de bord (elle modifie une variable globale et elle affiche), donc ce n'est pas une fonction pure et elle est plus difficile à tester."
        }
      ]
    },
    {
      id: "precis",
      title: "Être précis",
      sub: "Signaler un problème clairement",
      steps: [
        {
          type: "concept",
          term: "Attendu / observé",
          def: "Pour signaler un bug : dire **ce qui devrait se passer** (le comportement attendu) et **ce qui se passe vraiment** (le comportement observé).",
          code: `Attendu : sum([5, 1, 2]) retourne 8.
Observé : sum([5, 1, 2]) retourne 3.`,
          phrase: "Le comportement observé ne correspond pas au comportement attendu."
        },
        {
          type: "concept",
          term: "Reproduire un bug",
          def: "Donner **les étapes exactes** pour faire apparaître le bug à coup sûr. Un bug qu'on sait reproduire est à moitié corrigé.",
          code: `1. Ouvrir /panier
2. Ajouter 2 produits
3. Cliquer sur « Payer »
→ erreur 500`,
          phrase: "J'arrive à reproduire le bug en trois étapes."
        },
        {
          type: "qcm",
          q: "Quelle phrase aide le plus un collègue ?",
          options: [
            "« Ça marche pas. »",
            "« Le login bug. »",
            "« Quand je me connecte avec un email en majuscules, l'API renvoie un 401 au lieu d'un 200. »"
          ],
          correct: 2,
          explain: "Elle donne **les étapes** (email en majuscules), **l'observé** (401) et **l'attendu** (200). Le collègue peut agir tout de suite."
        },
        {
          type: "cloze",
          sentence: "Donner les étapes exactes pour faire apparaître un bug, c'est le ___.",
          options: ["reproduire", "refactoriser", "déployer"],
          correct: 0,
          why: ["", "Refactoriser, c'est ranger le code sans changer son comportement.", "Déployer, c'est mettre en ligne."]
        },
        {
          type: "qcm",
          q: "Quelle formulation est la plus précise ?",
          options: [
            "« La fonction fait un truc bizarre avec le tableau. »",
            "« La fonction modifie le tableau d'origine au lieu d'en retourner un nouveau. »"
          ],
          correct: 1,
          explain: "« Modifie le tableau d'origine » et « retourner un nouveau » décrivent **exactement** le mécanisme. « Un truc bizarre » ne dit rien."
        }
      ]
    },
    {
      id: "argumenter",
      title: "Argumenter un choix",
      sub: "Connecteurs, compromis",
      steps: [
        {
          type: "concept",
          term: "Connecteurs logiques",
          def: "Les petits mots qui **relient** vos idées et montrent votre raisonnement : **parce que** (cause), **donc** (conséquence), **en revanche** (opposition), **par exemple** (illustration).",
          code: `J'ai utilisé une requête paramétrée PARCE QUE le nom vient de l'utilisateur.
DONC aucune injection SQL n'est possible.`,
          phrase: "J'ai choisi X parce que…, donc…"
        },
        {
          type: "concept",
          term: "Compromis",
          def: "Un choix qui **gagne quelque chose et en perd une autre**. Un senior dit toujours ce qu'il gagne ET ce qu'il perd. En anglais : trade-off.",
          code: `Les microservices nous rendent plus indépendants,
EN REVANCHE ils sont plus complexes à déployer.`,
          phrase: "C'est un compromis entre simplicité et performance."
        },
        {
          type: "qcm",
          q: "Complétez : « J'ai extrait ce calcul dans une fonction ___ il était copié à trois endroits. »",
          options: ["donc", "parce qu'", "en revanche"],
          correct: 1,
          explain: "Vous donnez la **cause** de votre choix : **parce qu'**il était copié à trois endroits."
        },
        {
          type: "qcm",
          q: "Quelle réponse sonne le plus « senior » quand on vous demande pourquoi vous avez choisi SQL ?",
          options: [
            "« Parce que c'est bien. »",
            "« Nos données sont très liées entre elles, donc les tables et les jointures SQL sont adaptées. En revanche, le schéma est moins souple. »",
            "« Je sais pas, c'était déjà comme ça. »"
          ],
          correct: 1,
          explain: "Elle donne une **raison** (données liées), une **conséquence** (SQL adapté) et un **compromis** (moins souple)."
        },
        {
          type: "explain",
          q: "Expliquez à un collègue pourquoi ce code est mieux que la concaténation. Utilisez au moins « parce que » et « donc ».",
          code: "db.query(\"SELECT * FROM users WHERE name = ?\", [name]);",
          keywords: ["parce que", "donc", "injection", "requête paramétrée", "entrée"],
          model: "On utilise une requête paramétrée parce que name vient de l'utilisateur : c'est une entrée non fiable. La base reçoit la requête et la donnée séparément, donc le contenu de name ne peut jamais être exécuté comme du SQL. On se protège ainsi contre l'injection SQL."
        }
      ]
    },
    {
      id: "quotidien",
      title: "Le mot juste au quotidien",
      sub: "Remplacer les mots vagues",
      steps: [
        {
          type: "concept",
          term: "Remplacer « faire »",
          def: "« Faire » est un mot vague. Choisissez le verbe qui dit **exactement** l'action : **réaliser**, **développer**, **préparer**, **effectuer**, **organiser**, **corriger**…",
          code: `J'ai fait un site       → J'ai développé un site.
J'ai fait les courses   → J'ai acheté de quoi manger pour la semaine.
J'ai fait une erreur    → Je me suis trompé.`,
          phrase: "J'ai développé une application de suivi des dépendances."
        },
        {
          type: "concept",
          term: "Remplacer « dire »",
          def: "« Dire » peut presque toujours être précisé : **expliquer**, **affirmer**, **préciser**, **proposer**, **demander**, **répondre**, **signaler**, **reconnaître**.",
          code: `Il m'a dit que c'était faux  → Il m'a fait remarquer que c'était faux.
Je lui ai dit mon idée       → Je lui ai proposé mon idée.`,
          phrase: "Je voudrais préciser un point."
        },
        {
          type: "concept",
          term: "Remplacer « truc »",
          def: "« Truc », « chose », « machin » : nomme **ce que c'est vraiment**. En code : élément, valeur, composant, fichier, fonction, paramètre…",
          code: `Le truc en haut        → Le bandeau de navigation.
Ce truc-là dans le code → Cette fonction / ce paramètre.`,
          phrase: "Le composant de navigation ne s'affiche pas."
        },
        {
          type: "qcm",
          q: "« J'ai fait un projet sur la sécurité. » Quelle version est la plus précise ?",
          options: [
            "« J'ai fait un truc sur la sécurité. »",
            "« J'ai conçu un outil qui analyse la sécurité des dépendances. »",
            "« J'ai fait un projet sécurité. »"
          ],
          correct: 1,
          explain: "**Conçu** (verbe précis), **un outil** (nom précis), **qui analyse la sécurité des dépendances** (ce que ça fait exactement)."
        },
        {
          type: "qcm",
          q: "« Il m'a dit que mon code avait un problème. » Quel verbe est le plus précis ?",
          options: ["Il m'a parlé", "Il m'a signalé", "Il m'a fait"],
          correct: 1,
          explain: "**Signaler**, c'est attirer l'attention sur un problème. C'est exactement ce qui s'est passé."
        },
        {
          type: "concept",
          term: "Dire « je ne sais pas »",
          def: "Les seniors disent souvent « je ne sais pas ». C'est une **preuve de confiance**, pas de faiblesse. La différence : ils ajoutent ce qu'ils vont faire.",
          code: `« Je ne sais pas encore. Je vérifie et je reviens vers toi. »
« Je ne connais pas cet outil. Tu peux m'expliquer à quoi il sert ? »`,
          phrase: "Je ne sais pas encore, je vérifie et je reviens vers toi."
        },
        {
          type: "qcm",
          q: "En cours, le prof utilise un mot que vous ne connaissez pas. Quelle réaction montre le plus d'assurance ?",
          options: ["Ne rien dire et faire semblant", "« Je ne connais pas ce terme, vous pouvez le définir ? »", "Partir"],
          correct: 1,
          explain: "Poser la question calmement montre que vous êtes **sûr de vous**. Et souvent, d'autres personnes ne le savaient pas non plus."
        }
      ]
    }
  ]
};
