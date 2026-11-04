// Vocabulaire Sensei - chapitre "Sécurité" : 5 lecons, 22 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "secu",
  title: "Sécurité",
  goal: "Penser comme un attaquant pour coder comme un défenseur.",
  lessons: [
    {
      id: "entree",
      title: "Ne jamais faire confiance",
      sub: "Entrée utilisateur, validation, liste blanche",
      steps: [
        {
          type: "concept",
          term: "Entrée utilisateur",
          def: "Toute donnée qui **vient de l'extérieur** : formulaire, URL, fichier envoyé, en-tête HTTP. Règle n°1 : elle peut être **piégée**.",
          phrase: "Il ne faut jamais faire confiance à une entrée utilisateur."
        },
        {
          type: "concept",
          term: "Validation",
          def: "**Vérifier** qu'une donnée a la forme attendue **avant** de l'utiliser. Sinon, on la refuse.",
          code: `if (typeof age !== "number" || age < 0 || age > 130) {
  throw new Error("Âge invalide");
}`,
          phrase: "On valide l'âge côté serveur."
        },
        {
          type: "concept",
          term: "Validation côté serveur",
          def: "La validation dans le navigateur (le front) est **confortable** pour l'utilisateur, mais n'importe qui peut la contourner. La vraie protection est **côté serveur**.",
          phrase: "La validation front ne suffit pas, il faut valider côté serveur."
        },
        {
          type: "concept",
          term: "Liste blanche",
          def: "Accepter **seulement** ce qui est connu et autorisé, et refuser tout le reste. Plus sûr qu'une liste noire (essayer d'interdire tout ce qui est dangereux). En anglais : allowlist.",
          code: `const tris = ["prix", "nom", "date"];
if (!tris.includes(choix)) throw new Error("Tri invalide");`,
          phrase: "On utilise une liste blanche des valeurs autorisées."
        },
        {
          type: "qcm",
          q: "Le formulaire empêche de saisir un prix négatif (côté navigateur). Est-ce suffisant ?",
          options: [
            "Oui, l'utilisateur ne peut pas le contourner",
            "Non, un attaquant peut envoyer la requête directement au serveur"
          ],
          correct: 1,
          explain: "Un attaquant peut envoyer une requête HTTP **sans passer par votre formulaire**. Il faut **aussi** valider côté serveur."
        },
        {
          type: "cloze",
          sentence: "Accepter seulement les valeurs connues et refuser tout le reste, c'est une liste ___.",
          options: ["blanche", "noire", "chaînée"],
          correct: 0,
          why: [
            "",
            "La liste noire essaie d'interdire ce qui est dangereux : on en oublie toujours.",
            "Une liste chaînée est une structure de données, sans rapport."
          ]
        }
      ]
    },
    {
      id: "injection",
      title: "Les injections",
      sub: "Injection SQL, XSS, requête paramétrée",
      steps: [
        {
          type: "concept",
          term: "Injection SQL",
          def: "L'attaquant écrit du **code SQL dans un champ** de formulaire. Si le serveur colle ce texte directement dans sa requête, le code de l'attaquant s'exécute.",
          code: "const query = \"SELECT * FROM users WHERE name = '\" + name + \"'\";",
          phrase: "Cette concaténation expose l'application à une injection SQL."
        },
        {
          type: "qcm",
          q: "Si `name` vaut `' OR '1'='1`, que devient la requête ?",
          code: "const query = \"SELECT * FROM users WHERE name = '\" + name + \"'\";",
          options: [
            "SELECT * FROM users WHERE name = '' OR '1'='1'",
            "Une erreur, la requête est refusée",
            "SELECT * FROM users WHERE name = 'OR 1=1'"
          ],
          correct: 0,
          explain: "Le texte est collé tel quel. `'1'='1'` est toujours vrai → la requête retourne **tous** les utilisateurs."
        },
        {
          type: "concept",
          term: "Requête paramétrée",
          def: "On envoie la requête et les données **séparément**. La base sait que `name` est une donnée, jamais du code. C'est **la** protection contre l'injection SQL.",
          code: "db.query(\"SELECT * FROM users WHERE name = ?\", [name]);",
          phrase: "On utilise une requête paramétrée pour éviter l'injection."
        },
        {
          type: "concept",
          term: "XSS",
          def: "Cross-Site Scripting : l'attaquant fait **exécuter son JavaScript** dans le navigateur des autres, par exemple via un commentaire affiché tel quel.",
          code: `// ❌ dangereux : le HTML du commentaire est interprété
div.innerHTML = commentaire;
// ✅ sûr : affiché comme du texte
div.textContent = commentaire;`,
          phrase: "Afficher ce commentaire avec innerHTML crée une faille XSS."
        },
        {
          type: "qcm",
          q: "Un commentaire contient `<img src=x onerror=alert(1)>`. Laquelle de ces lignes est sûre ?",
          options: [
            "`div.innerHTML = commentaire;`",
            "`div.textContent = commentaire;`"
          ],
          correct: 1,
          explain: "`textContent` affiche le texte **tel quel**, sans l'interpréter comme du HTML. Aucun script ne s'exécute."
        },
        {
          type: "concept",
          term: "Échappement",
          def: "Transformer les caractères spéciaux (`<`, `>`, `'`…) pour qu'ils soient **affichés** au lieu d'être **interprétés**. En anglais : escaping, ou sanitization quand on nettoie.",
          code: "\"<b>\"  →  \"&lt;b&gt;\"   // s'affiche <b>, ne met pas en gras",
          phrase: "Il faut échapper les données avant de les insérer dans la page."
        },
        {
          type: "cloze",
          sentence: "Pour se protéger de l'injection SQL, on utilise une requête ___.",
          options: ["paramétrée", "concaténée", "rapide"],
          correct: 0,
          why: [
            "",
            "Concaténer la donnée dans la requête, c'est justement ce qui crée la faille.",
            "La vitesse n'a rien à voir avec l'injection."
          ]
        }
      ]
    },
    {
      id: "auth",
      title: "Qui a le droit ?",
      sub: "Authentification, autorisation, secrets",
      steps: [
        {
          type: "concept",
          term: "Authentification",
          def: "Vérifier **qui vous êtes**. Login + mot de passe, empreinte digitale… C'est la question « Êtes-vous bien Alice ? ».",
          phrase: "L'utilisateur s'authentifie avec son mot de passe."
        },
        {
          type: "concept",
          term: "Autorisation",
          def: "Vérifier **ce que vous avez le droit de faire**, une fois qu'on sait qui vous êtes. C'est la question « Alice a-t-elle le droit de supprimer ce compte ? ».",
          rule: "**Authentification** = qui êtes-vous ? (401 si raté). **Autorisation** = avez-vous le droit ? (403 si refusé).",
          phrase: "Il est authentifié, mais pas autorisé à accéder à cette page."
        },
        {
          type: "qcm",
          q: "Bob est connecté mais essaie d'ouvrir la page d'administration. Il reçoit un 403. Quel contrôle l'a bloqué ?",
          options: ["L'authentification", "L'autorisation"],
          correct: 1,
          explain: "On sait qui il est (il est connecté). Mais il n'a pas **le droit** : c'est l'**autorisation**."
        },
        {
          type: "concept",
          term: "Moindre privilège",
          def: "Donner à chaque utilisateur ou programme **seulement les droits dont il a besoin**, pas plus. Si un compte est piraté, les dégâts sont limités.",
          phrase: "On applique le principe du moindre privilège."
        },
        {
          type: "concept",
          term: "Hachage",
          def: "Transformer un mot de passe en une **empreinte** impossible à inverser. On stocke l'empreinte, jamais le mot de passe en clair. À la connexion, on compare les empreintes.",
          code: "\"monMotDePasse\"  →  \"$2b$12$Kx9...\"   // bcrypt",
          phrase: "Les mots de passe sont hachés avec bcrypt."
        },
        {
          type: "cloze",
          sentence: "Vérifier qui vous êtes, c'est l'___. Vérifier ce que vous avez le droit de faire, c'est l'autorisation.",
          options: ["authentification", "encapsulation", "abstraction"],
          correct: 0,
          why: ["", "L'encapsulation protège les données d'un objet.", "L'abstraction cache des détails."]
        },
        {
          type: "concept",
          term: "Secret",
          def: "Une information qui donne un accès : mot de passe, clé API, token. **Jamais** dans le code ni dans Git. On la met dans une variable d'environnement (fichier `.env`, ignoré par Git).",
          code: `// ❌
const API_KEY = "sk_test_123abc";
// ✅
const API_KEY = process.env.API_KEY;`,
          phrase: "Cette clé API est un secret, elle ne doit pas être commitée."
        }
      ]
    },
    {
      id: "owasp",
      title: "Vulnérabilités et OWASP",
      sub: "Surface d'attaque, CVE, OWASP Top 10",
      steps: [
        {
          type: "concept",
          term: "Vulnérabilité",
          def: "Une **faiblesse** dans un logiciel qu'un attaquant peut utiliser. Une **faille**, en langage courant.",
          phrase: "Cette version contient une vulnérabilité connue."
        },
        {
          type: "concept",
          term: "Exploit",
          def: "Le **code ou la technique** qui utilise une vulnérabilité pour attaquer.",
          phrase: "Un exploit public existe pour cette faille."
        },
        {
          type: "concept",
          term: "Surface d'attaque",
          def: "**Tous les points d'entrée** par lesquels un attaquant pourrait essayer d'entrer : formulaires, API, ports ouverts, dépendances… Moins il y en a, mieux c'est.",
          phrase: "Supprimer cette route inutile réduit la surface d'attaque."
        },
        {
          type: "concept",
          term: "OWASP Top 10",
          def: "La **liste des 10 risques** de sécurité web les plus fréquents, publiée par l'OWASP (une organisation). Injection, contrôle d'accès défaillant, composants vulnérables…",
          phrase: "L'injection fait partie de l'OWASP Top 10."
        },
        {
          type: "concept",
          term: "CVE",
          def: "Un **numéro d'identité** unique donné à une vulnérabilité connue publiquement. Format : CVE-année-numéro.",
          code: "CVE-2021-44228   // Log4Shell, une faille célèbre",
          phrase: "Cette dépendance est touchée par une CVE critique."
        },
        {
          type: "qcm",
          q: "Votre API a 40 routes, dont 15 ne servent plus. Que dirait un dev sécurité ?",
          options: [
            "« Ça ne pose aucun problème. »",
            "« Supprimons-les pour réduire la surface d'attaque. »",
            "« Il faut en ajouter d'autres. »"
          ],
          correct: 1,
          explain: "Chaque route inutile est une porte de plus pour un attaquant. Les supprimer **réduit la surface d'attaque**."
        },
        {
          type: "cloze",
          sentence: "Tous les points d'entrée possibles pour un attaquant forment la surface ___.",
          options: ["d'attaque", "de test", "de code"],
          correct: 0,
          why: ["", "On parle de sécurité, pas de tests.", "Ce n'est pas le bon terme."]
        }
      ]
    },
    {
      id: "bdd-secu",
      title: "Sécuriser la base de données",
      sub: "Moindre privilège, index, sauvegardes, chiffrement",
      steps: [
        {
          type: "concept",
          term: "Compte applicatif limité",
          def: "L'application se connecte à la base avec un compte qui a **seulement les droits nécessaires** (lire et écrire certaines tables), jamais le compte administrateur.",
          code: `GRANT SELECT, INSERT, UPDATE ON shop.orders TO app_user;
-- pas de DROP, pas d'accès aux autres bases`,
          phrase: "L'application utilise un compte à privilèges limités."
        },
        {
          type: "concept",
          term: "Index de base de données",
          def: "Comme l'**index d'un livre** : la base trouve une ligne sans tout lire. Les recherches sont plus rapides, les écritures un peu plus lentes.",
          code: "CREATE INDEX idx_users_email ON users(email);",
          phrase: "On ajoute un index sur email pour accélérer la connexion."
        },
        {
          type: "concept",
          term: "Sauvegarde",
          def: "Une **copie régulière** des données, stockée ailleurs. Une sauvegarde n'est fiable que si on a **testé la restauration**.",
          phrase: "On teste la restauration des sauvegardes chaque mois."
        },
        {
          type: "concept",
          term: "Chiffrement",
          def: "Rendre les données illisibles sans la clé. **En transit** : pendant le voyage sur le réseau (TLS, HTTPS). **Au repos** : quand elles sont stockées sur le disque.",
          phrase: "Les données sont chiffrées en transit et au repos."
        },
        {
          type: "qcm",
          q: "Votre application se connecte à la base avec le compte `root`. Quel principe est violé ?",
          options: ["Moindre privilège", "Ouvert / fermé", "Idempotence"],
          correct: 0,
          explain: "Le compte a beaucoup plus de droits que nécessaire. Si l'appli est piratée, l'attaquant a tout : le **moindre privilège** n'est pas respecté."
        },
        {
          type: "cloze",
          sentence: "HTTPS protège les données ___.",
          options: ["en transit", "au repos", "en cache"],
          correct: 0,
          why: [
            "",
            "Au repos, c'est sur le disque. HTTPS protège le voyage sur le réseau.",
            "Le cache n'est pas le bon terme ici."
          ]
        }
      ]
    }
  ]
};
