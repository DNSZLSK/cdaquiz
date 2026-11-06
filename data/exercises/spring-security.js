export default {
  "domain": "spring-security",
  "title": "Spring Security",
  "exercises": [
    {
      "id": "sec-01",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "authentification vs autorisation"
      ],
      "code": "1. L'utilisateur envoie son email et mot de passe\n2. Le serveur vérifie que le couple email/mdp est correct\n3. Le serveur vérifie que cet utilisateur a le rôle ADMIN\n4. Le serveur autorise l'accès à la page d'administration",
      "question": "Quelle est l'étape d'authentification et quelle est l'étape d'autorisation ?",
      "options": [
        "Étape 2 = authentification (qui êtes-vous ?), Étape 3 = autorisation (avez-vous le droit ?)",
        "Étape 2 = autorisation (contrôle des accès), Étape 3 = authentification (contrôle du compte)",
        "Étape 1 = authentification (l'utilisateur s'identifie), Étape 2 = autorisation (le serveur valide)",
        "Étape 3 = authentification (on vérifie le compte ADMIN), Étape 4 = autorisation (l'accès est accordé)"
      ],
      "answer": 0,
      "explanation": "Authentification = vérifier l'IDENTITÉ (est-ce bien vous ?). Autorisation = vérifier les DROITS (avez-vous le droit de faire ça ?). L'authentification vient toujours en premier. Dans Spring Security, c'est un AuthenticationProvider (DaoAuthenticationProvider par défaut) qui authentifie : il charge l'utilisateur via le UserDetailsService, puis compare le mot de passe avec le PasswordEncoder. Les rôles (authorities) servent ensuite à autoriser. L'inversion 2/3 confond les deux notions : vérifier un couple email/mdp est un contrôle d'identité, pas de droits. L'étape 1 n'est qu'un envoi d'informations, rien n'est encore vérifié à ce stade. Et l'étape 4 est la conséquence de l'autorisation (l'accès accordé), pas la vérification elle-même : c'est bien l'étape 3 qui contrôle le rôle.",
      "hint": "Authentification = QUI. Autorisation = QUOI (quels droits)."
    },
    {
      "id": "sec-02",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "hachage mot de passe"
      ],
      "code": "// Dans le service d'inscription\nprivate final PasswordEncoder passwordEncoder; // injecté par le constructeur\n\npublic void inscrire(String email, String motDePasse) {\n    String hash = passwordEncoder.encode(motDePasse);\n    Utilisateur u = new Utilisateur(email, hash);\n    utilisateurRepository.save(u);\n}",
      "question": "Pourquoi hacher le mot de passe avant de le sauvegarder ?",
      "options": [
        "Pour qu'aucun mot de passe en clair ne soit stocké en BDD, même en cas de fuite de données",
        "Pour pouvoir renvoyer le mot de passe à l'utilisateur qui l'a oublié, en le déchiffrant avec la clé du serveur",
        "Pour accélérer la vérification à la connexion : comparer deux hash est plus rapide que comparer deux chaînes",
        "Pour protéger le mot de passe pendant son transit entre le navigateur et le serveur"
      ],
      "answer": 0,
      "explanation": "Si la BDD est compromise (hack, fuite), les mots de passe hachés ne peuvent pas être inversés. BCrypt (l'encoder par défaut de Spring Security) ajoute un sel aléatoire à chaque mot de passe, ce qui rend inutiles les tables précalculées, et il est volontairement lent pour freiner le bruteforce. JAMAIS de mot de passe en clair en BDD. Un hash n'est pas un chiffrement : il est à sens unique, aucune clé ne permet de retrouver le mot de passe oublié (d'où les liens de réinitialisation). BCrypt est volontairement lent, la vérification n'est donc pas accélérée, c'est même l'inverse. Et la protection du transit est le rôle de HTTPS/TLS, pas du hachage en base.",
      "hint": "Imaginez que quelqu'un vole toute votre base de données. Que voit-il ?"
    },
    {
      "id": "sec-03",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "rôles",
        "autorisation endpoint"
      ],
      "code": "@Configuration\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http.authorizeHttpRequests(auth -> auth\n            .requestMatchers(\"/api/public/**\").permitAll()\n            .requestMatchers(\"/api/admin/**\")._______(\"ADMIN\")\n            .anyRequest().authenticated()\n        );\n        return http.build();\n    }\n}",
      "question": "Quelle méthode restreint l'accès aux utilisateurs avec le rôle ADMIN ?",
      "options": [
        "hasRole",
        "hasAuthority",
        "access",
        "hasPermission"
      ],
      "answer": 0,
      "explanation": "hasRole(\"ADMIN\") autorise uniquement les utilisateurs ayant le rôle ADMIN, en ajoutant automatiquement le préfixe ROLE_. hasAuthority existe mais compare l'authority brute : il faudrait écrire hasAuthority(\"ROLE_ADMIN\") pour obtenir le même effet, hasAuthority(\"ADMIN\") ne matcherait pas. access existe aussi mais attend un AuthorizationManager (ou une expression), pas un simple nom de rôle. hasPermission relève de la sécurité par objet (ACL) dans les expressions @PreAuthorize, pas de la configuration des URL. C'est la chaîne de filtres de Spring Security qui applique ces règles.",
      "hint": "Spring distingue un rôle, auquel il ajoute lui-même le préfixe ROLE_, d'une authority, comparée telle quelle. Quelle méthode raisonne en rôles ?"
    },
    {
      "id": "sec-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "JWT",
        "stateless"
      ],
      "code": "// Flux JWT :\n// 1. POST /api/login (email + mdp) → le serveur retourne un token JWT\n// 2. GET /api/profil avec header: Authorization: Bearer eyJhbG...\n// 3. Le serveur vérifie le token et retourne les données",
      "question": "Pourquoi utiliser un token JWT plutôt qu'une session serveur classique ?",
      "options": [
        "Le serveur n'a pas à stocker d'état de session : le token contient les informations utiles",
        "Le contenu du token est chiffré, donc illisible par le client, alors qu'une session expose ses données",
        "Le token est conservé côté serveur et le client ne reçoit qu'un identifiant, ce qui limite les fuites",
        "Le JWT expire automatiquement, alors qu'une session reste valide tant que l'utilisateur ne se déconnecte pas"
      ],
      "answer": 0,
      "explanation": "JWT est stateless : le token contient l'identité de l'utilisateur (claims), signé par le serveur. Le serveur n'a rien à stocker en mémoire. C'est idéal pour les API REST consommées par Angular/React, et pour le scaling horizontal (plusieurs serveurs). Un JWT standard est signé, pas chiffré : son payload est lisible par quiconque le décode depuis le Base64. C'est la session qui garde les données côté serveur et ne donne au client qu'un identifiant (JSESSIONID) : le JWT fait exactement l'inverse. Enfin les sessions expirent aussi (timeout d'inactivité), l'expiration n'est pas propre au JWT. Revers du stateless : un JWT ne se révoque pas facilement avant son expiration (on garde donc des durées courtes), et s'il est stocké dans le localStorage, une faille XSS permet de le voler.",
      "hint": "Stateless = le serveur ne garde rien en mémoire entre les requêtes. Toute l'info est dans le token."
    },
    {
      "id": "sec-05",
      "type": "debug",
      "difficulty": "intermediate",
      "concepts": [
        "CORS"
      ],
      "code": "// Angular (port 4200) appelle l'API Spring Boot (port 8080)\n// Erreur dans la console du navigateur :\n// \"Access to XMLHttpRequest at 'http://localhost:8080/api/produits'\n//  from origin 'http://localhost:4200' has been blocked by CORS policy\"",
      "question": "Pourquoi cette erreur et comment la résoudre ?",
      "options": [
        "Le navigateur bloque les requêtes cross-origin : le serveur doit autoriser l'origine (CORS) dans Spring Security",
        "Spring Security rejette la requête faute de jeton CSRF : désactiver csrf() dans la SecurityFilterChain",
        "Les deux origines doivent être identiques : servir Angular et l'API depuis le même port est la seule solution",
        "Le préflight OPTIONS échoue parce que la connexion n'est pas sécurisée : passer les deux applications en HTTPS"
      ],
      "answer": 0,
      "explanation": "CORS (Cross-Origin Resource Sharing) : le navigateur bloque par défaut les requêtes vers un domaine/port différent. localhost:4200 ≠ localhost:8080. C'est une sécurité du navigateur : la requête part bien, mais le navigateur refuse de donner la réponse au JavaScript. Avec Spring Security, il faut activer CORS dans la chaîne de filtres (http.cors(Customizer.withDefaults()) plus une configuration des origines autorisées) : sinon la requête preflight OPTIONS, envoyée sans authentification, est rejetée avant d'atteindre le controller, et un simple @CrossOrigin ne suffit pas. Le CSRF est une protection différente (jeton anti-falsification) et un rejet CSRF produirait un 403 renvoyé par le serveur, pas ce blocage côté navigateur. Servir les deux applications sur la même origine n'est pas la seule issue : il suffit que le serveur autorise l'origine (ou un proxy en développement). Et HTTPS ne change rien : https://localhost:4200 resterait une origine différente de l'API.",
      "hint": "4200 ≠ 8080 = origines différentes. Le navigateur bloque par sécurité. Le serveur doit autoriser explicitement."
    },
    {
      "id": "sec-06",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "UserDetailsService"
      ],
      "code": "@Service\npublic class CustomUserDetailsService implements UserDetailsService {\n    private final UtilisateurRepository repo;\n\n    public CustomUserDetailsService(UtilisateurRepository repo) {\n        this.repo = repo;\n    }\n    \n    @Override\n    public UserDetails loadUserByUsername(String email) \n            throws UsernameNotFoundException {\n        Utilisateur u = repo.findByEmail(email)\n            .orElseThrow(() -> new UsernameNotFoundException(\"Utilisateur non trouvé\"));\n        return new User(u.getEmail(), u.getMotDePasse(), \n            List.of(new SimpleGrantedAuthority(\"ROLE_\" + u.getRole())));\n    }\n}",
      "question": "Quel est le rôle de cette classe dans Spring Security ?",
      "options": [
        "Charger les infos d'un utilisateur depuis la BDD pour que Spring Security puisse l'authentifier",
        "Comparer le mot de passe saisi avec le hash stocké et rejeter la connexion s'ils ne correspondent pas",
        "Intercepter chaque requête HTTP pour vérifier les rôles de l'utilisateur avant d'atteindre le controller",
        "Créer la session de l'utilisateur après la connexion et y stocker ses rôles pour les requêtes suivantes"
      ],
      "answer": 0,
      "explanation": "UserDetailsService est l'interface que Spring Security appelle pour trouver un utilisateur par son identifiant. loadUserByUsername() cherche en BDD et retourne un UserDetails (email, mdp hashé, rôles). La comparaison du mot de passe n'est pas son rôle : c'est le DaoAuthenticationProvider qui la fait ensuite via le PasswordEncoder. L'interception des requêtes et le contrôle des rôles reviennent à la chaîne de filtres et aux règles d'autorisation, pas à cette classe. Et la gestion de la session ou du SecurityContext intervient après l'authentification, ailleurs dans le framework.",
      "hint": "Spring Security ne sait pas où sont stockés vos utilisateurs. Cette classe fait le pont avec votre BDD."
    },
    {
      "id": "sec-07",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "IDOR",
        "contrôle d'accès",
        "OWASP A01"
      ],
      "code": "@GetMapping(\"/api/factures/{id}\")\npublic FactureDTO getFacture(@PathVariable Long id) {\n    // l'utilisateur est authentifié (JWT valide)\n    Facture f = factureRepository.findById(id).orElseThrow();\n    return FactureMapper.toDto(f);\n}",
      "question": "Un client connecté appelle /api/factures/124 au lieu de sa facture 123. Quelle faille ce code laisse-t-il passer ?",
      "options": [
        "Une injection SQL, parce que l'id vient directement de l'URL",
        "Un IDOR : rien ne vérifie que la facture 124 appartient au client",
        "Une faille XSS, parce que la facture est renvoyée sans échappement",
        "Une faille CSRF, parce que la requête GET n'a pas de jeton anti-CSRF"
      ],
      "answer": 1,
      "explanation": "Le code vérifie que l'utilisateur est authentifié, mais pas qu'il a le droit de voir CETTE facture : en changeant l'id, n'importe quel client lit les factures des autres. C'est un IDOR (Insecure Direct Object Reference), une forme de contrôle d'accès défaillant, A01 de l'OWASP Top 10:2025. Correction : chercher la facture du client connecté (findByIdAndClientId(id, clientConnecte)) ou vérifier son propriétaire, et renvoyer 404 sinon. Ce n'est pas une injection : findById passe l'id en paramètre. Le JSON renvoyé n'exécute rien, et le CSRF concerne les requêtes qui modifient des données avec un cookie de session.",
      "hint": "L'utilisateur est bien authentifié. Mais qui vérifie que cette facture est la sienne ?"
    }
  ]
};
