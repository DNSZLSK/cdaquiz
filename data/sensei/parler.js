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
          code: { js: `let total = 0;
function ajouter(prix) {
  total = total + prix;   // effet de bord : modifie total
}` },
          phrase: "Cette fonction a un effet de bord : elle modifie une variable globale."
        },
        {
          type: "explain",
          q: "Décrivez ce code en 3 temps (quoi, comment, pourquoi/limite). Essayez d'utiliser : paramètre, effet de bord.",
          code: { js: `let total = 0;

function ajouter(prix) {
  total = total + prix;
  console.log("Total : " + total);
}` },
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
            "« Le login ne marche plus depuis ce matin, pour tout le monde ou presque, je ne sais pas pourquoi. »",
            "« Il y a sûrement un problème dans l'API de connexion, il faudrait que quelqu'un regarde. »",
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
            "« La fonction a un comportement bizarre avec le tableau qu'on lui passe en paramètre. »",
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
            "« SQL est la technologie la plus utilisée en entreprise, donc c'est forcément le meilleur choix pour nous. »",
            "« Nos données sont très liées entre elles : les jointures SQL sont adaptées. En revanche, le schéma est moins souple. »",
            "« On a toujours utilisé SQL dans l'équipe, tout le monde le connaît, donc on continue avec. »"
          ],
          correct: 1,
          explain: "Elle donne une **raison** (données liées), une **conséquence** (SQL adapté) et un **compromis** (moins souple)."
        },
        {
          type: "explain",
          q: "Expliquez à un collègue pourquoi ce code est mieux que la concaténation. Utilisez au moins « parce que » et « donc ».",
          code: { js: "db.query(\"SELECT * FROM users WHERE name = ?\", [name]);" },
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
          def: "« Truc », « chose », « machin » : nommez **ce que c'est vraiment**. En code : élément, valeur, composant, fichier, fonction, paramètre…",
          code: `Le truc en haut        → Le bandeau de navigation.
Ce truc-là dans le code → Cette fonction / ce paramètre.`,
          phrase: "Le composant de navigation ne s'affiche pas."
        },
        {
          type: "qcm",
          q: "« J'ai fait un projet sur la sécurité. » Quelle version est la plus précise ?",
          options: [
            "« J'ai travaillé sur un gros projet autour de la sécurité informatique. »",
            "« J'ai fait plein de choses sur la sécurité, surtout côté technique. »",
            "« J'ai conçu un outil qui analyse la sécurité des dépendances. »"
          ],
          correct: 2,
          explain: "**Conçu** (verbe précis), **un outil** (nom précis), **qui analyse la sécurité des dépendances** (ce que ça fait exactement)."
        },
        {
          type: "qcm",
          q: "« Il m'a dit que mon code avait un problème. » Quel verbe est le plus précis ?",
          options: ["Il m'a signalé", "Il m'a parlé", "Il m'a fait"],
          correct: 0,
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
          options: ["« Je ne connais pas ce terme, vous pouvez le définir ? »", "Hocher la tête, puis chercher le mot discrètement plus tard", "Attendre la pause pour demander à un camarade de classe"],
          correct: 0,
          explain: "Poser la question calmement montre que vous êtes **sûr de vous**. Et souvent, d'autres personnes ne le savaient pas non plus."
        }
      ]
    },
    {
      id: "incident",
      title: "Analyser un problème",
      sub: "Cause racine, contournement, repro minimale, escalader",
      steps: [
        {
          type: "concept",
          term: "Cause racine",
          def: "La **vraie raison** d'un problème, pas son symptôme. Symptôme : « la page plante ». Cause racine : « la date arrive au format américain, et le parsing échoue ».",
          beginner: "J'ai relancé, ça remarche.",
          phrase: "On a trouvé la cause racine : le fuseau horaire du serveur."
        },
        {
          type: "concept",
          term: "Contournement",
          def: "Une **solution provisoire** qui évite le problème sans le corriger. En anglais : workaround. On le dit clairement, et on planifie la vraie correction.",
          phrase: "En attendant le correctif, j'ai mis un contournement."
        },
        {
          type: "concept",
          term: "Repro minimale",
          def: "Le **plus petit code** possible qui reproduit le bug : 10 lignes au lieu de toute l'application. Elle isole la cause, et elle se partage facilement (ticket, forum).",
          beginner: "Ça plante quand je lance tout le projet.",
          phrase: "Voici une repro minimale du bug, en douze lignes."
        },
        {
          type: "concept",
          term: "Escalader",
          def: "**Faire remonter** un problème à la bonne personne (lead, équipe responsable, astreinte) quand il dépasse ce qu'on peut régler seul, ou qu'il est urgent. Ce n'est pas un échec : c'est savoir à qui s'adresser.",
          phrase: "Le paiement est bloqué en production : il faut escalader au lead."
        },
        {
          type: "cloze",
          sentence: "Relancer le serveur a fait disparaître le bug, mais on ne connaît toujours pas sa ___.",
          options: ["repro minimale", "régression", "cause racine"],
          correct: 2,
          why: [
            "La repro minimale, c'est le petit code qui reproduit le bug, pas son origine.",
            "Une régression, c'est quelque chose qui marchait et qui ne marche plus. Ici, on cherche l'origine du problème.",
            ""
          ]
        },
        {
          type: "qcm",
          q: "Le client ne peut plus payer, et la vraie correction prendra deux jours. Que dit un senior ?",
          options: [
            "« Je corrige tout proprement d'ici deux jours, pour ne pas bricoler une solution provisoire. »",
            "« Je mets un contournement aujourd'hui pour débloquer les paiements, puis la vraie correction. »",
            "« J'ai relancé le serveur, ça a l'air de remarcher, je referme le ticket tout de suite. »"
          ],
          correct: 1,
          explain: "Il **débloque** les clients tout de suite (contournement), **annonce** que c'est provisoire et **planifie** la vraie correction. Attendre deux jours bloque les paiements ; relancer sans comprendre laisse la cause racine en place."
        }
      ]
    }
  ]
};
