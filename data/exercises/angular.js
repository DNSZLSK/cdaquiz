export default {
  "domain": "angular",
  "title": "Angular",
  "icon": "🅰️",
  "exercises": [
    {
      "id": "ng-01",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "@Component",
        "selector"
      ],
      "code": "@Component({\n  ______: 'app-produit-card',\n  imports: [],\n  templateUrl: './produit-card.component.html',\n  styleUrl: './produit-card.component.css'\n})\nexport class ProduitCardComponent {\n}",
      "question": "Quel mot-clé complète le décorateur pour définir la balise HTML du composant ?",
      "options": [
        "name",
        "selector",
        "tag",
        "element"
      ],
      "answer": 1,
      "explanation": "selector définit comment Angular référence ce composant dans les templates. Ici, on utilisera <app-produit-card></app-produit-card> dans le HTML parent.",
      "hint": "C'est le même mot qu'en CSS pour cibler un élément."
    },
    {
      "id": "ng-02",
      "type": "predict",
      "difficulty": "beginner",
      "concepts": [
        "interpolation"
      ],
      "code": "// composant\nexport class BonjourComponent {\n  nom = 'Kéwin';\n  metier = 'développeur';\n}\n\n// template\n<p>Salut {{ nom }}, tu es {{ metier }} !</p>",
      "question": "Que rend ce template ?",
      "options": [
        "Salut Kéwin, tu es développeur !",
        "Salut {{ nom }}, tu es {{ metier }} !",
        "Erreur — nom n'est pas défini",
        "Salut , tu es  !"
      ],
      "answer": 0,
      "explanation": "{{ expression }} est l'interpolation Angular. Les valeurs des propriétés du composant sont injectées dans le template. nom vaut 'Kéwin' et metier vaut 'développeur'.",
      "hint": "Les doubles accolades {{ }} injectent la valeur d'une propriété du composant."
    },
    {
      "id": "ng-03",
      "type": "complete",
      "difficulty": "beginner",
      "concepts": [
        "@for",
        "track"
      ],
      "code": "// composant\nexport class ListeComponent {\n  fruits = [\n    { id: 1, nom: 'Pomme' },\n    { id: 2, nom: 'Poire' },\n    { id: 3, nom: 'Banane' }\n  ];\n}\n\n// template\n<ul>\n  @for (fruit ______ fruits; track fruit.id) {\n    <li>{{ fruit.nom }}</li>\n  }\n</ul>",
      "question": "Quel mot complète la directive @for ?",
      "options": [
        "in",
        "of",
        "from",
        "each"
      ],
      "answer": 1,
      "explanation": "La syntaxe @for dans Angular utilise 'of' (comme le for...of JavaScript). track identifie chaque élément pour optimiser le rendu lors des changements.",
      "hint": "C'est la même syntaxe que la boucle for...of en JavaScript/TypeScript."
    },
    {
      "id": "ng-04",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "input",
        "signal",
        "property binding"
      ],
      "code": "// composant enfant\n@Component({ selector: 'app-badge' })\nexport class BadgeComponent {\n  niveau: InputSignal<string> = input.required<string>();\n}\n\n// template du badge\n<span class=\"badge\">{{ niveau() }}</span>\n\n// template parent\n<app-badge [niveau]=\"'Gold'\"></app-badge>",
      "question": "Que rend le badge ?",
      "options": [
        "Gold",
        "niveau",
        "undefined",
        "Erreur — input.required n'est pas valide"
      ],
      "answer": 0,
      "explanation": "[niveau]=\"'Gold'\" passe la string 'Gold' au signal input du composant enfant. niveau() (avec les parenthèses, car c'est un signal) retourne 'Gold' dans le template.",
      "hint": "Les crochets [attribut] indiquent du property binding. Les quotes simples dans les doubles quotes font que c'est une string."
    },
    {
      "id": "ng-05",
      "type": "identify",
      "difficulty": "intermediate",
      "concepts": [
        "service",
        "injection de dépendances"
      ],
      "code": "@Injectable({\n  providedIn: 'root'\n})\nexport class PanierService {\n  private articles = signal<Article[]>([]);\n  \n  ajouter(article: Article) {\n    this.articles.update(list => [...list, article]);\n  }\n  \n  getArticles() {\n    return this.articles;\n  }\n  \n  total() {\n    return this.articles().reduce((sum, a) => sum + a.prix, 0);\n  }\n}",
      "question": "Que signifie providedIn: 'root' ?",
      "options": [
        "Le service n'est disponible que dans le composant racine",
        "Le service est un singleton disponible dans toute l'application",
        "Le service est recréé pour chaque composant",
        "Le service nécessite un import dans app.module.ts"
      ],
      "answer": 1,
      "explanation": "providedIn: 'root' enregistre le service au niveau racine de l'application. Angular crée une seule instance (singleton) partagée par tous les composants. C'est le comportement recommandé pour les services partagés comme un panier.",
      "hint": "'root' = racine de l'application = disponible partout, une seule instance."
    },
    {
      "id": "ng-06",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "routing",
        "routerLink"
      ],
      "code": "// routes.ts\nexport const routes: Routes = [\n  { path: '', component: AccueilComponent },\n  { path: 'produit/:id', component: ProduitDetailComponent }\n];\n\n// template du composant liste\n@for (p of produits; track p.id) {\n  <a ______=\"['/produit', p.id]\">{{ p.nom }}</a>\n}",
      "question": "Quelle directive complète le lien de navigation ?",
      "options": [
        "href",
        "[routerLink]",
        "(click)",
        "[src]"
      ],
      "answer": 1,
      "explanation": "[routerLink] est la directive Angular pour la navigation. Elle construit l'URL dynamiquement : ['/produit', p.id] produit /produit/1, /produit/2, etc. Contrairement à href, routerLink ne recharge pas la page (navigation SPA).",
      "hint": "En Angular, on ne met pas de href classique pour naviguer entre les routes du SPA."
    },
    {
      "id": "ng-07",
      "type": "predict",
      "difficulty": "intermediate",
      "concepts": [
        "ActivatedRoute",
        "paramètre de route"
      ],
      "code": "// routes.ts\n{ path: 'article/:id', component: ArticleComponent }\n\n// article.component.ts\nexport class ArticleComponent {\n  route = inject(ActivatedRoute);\n  articleId: number;\n  \n  constructor() {\n    this.articleId = Number(this.route.snapshot.params['id']);\n  }\n}\n\n// URL accédée : /article/7",
      "question": "Quelle est la valeur de articleId ?",
      "options": [
        "7",
        "'7' (string)",
        "undefined",
        "NaN"
      ],
      "answer": 0,
      "explanation": "route.snapshot.params['id'] récupère la valeur '7' (string) depuis l'URL. Number() le convertit en nombre : 7. Le :id dans la route est un paramètre dynamique.",
      "hint": "Les params de route sont toujours des strings. Number() les convertit en nombre."
    },
    {
      "id": "ng-08",
      "type": "complete",
      "difficulty": "intermediate",
      "concepts": [
        "HttpClient",
        "Observable",
        "subscribe"
      ],
      "code": "export class RecetteService {\n  http = inject(HttpClient);\n  url = 'http://localhost:3000/recettes';\n  \n  getAll(): Observable<Recette[]> {\n    return this.http.______(this.url);\n  }\n}",
      "question": "Quelle méthode HTTP complète l'appel ?",
      "options": [
        "post",
        "get",
        "put",
        "fetch"
      ],
      "answer": 1,
      "explanation": "Pour récupérer des données, on utilise une requête GET via this.http.get(). Elle retourne un Observable qu'on subscribe dans le composant. post() crée, put() met à jour, delete() supprime.",
      "hint": "CRUD : Create = POST, Read = GET, Update = PUT, Delete = DELETE."
    },
    {
      "id": "ng-09",
      "type": "predict",
      "difficulty": "advanced",
      "concepts": [
        "FormGroup",
        "FormControl",
        "ReactiveFormsModule"
      ],
      "code": "// composant\napplyForm = new FormGroup({\n  nom: new FormControl(''),\n  email: new FormControl(''),\n});\n\nsubmitForm() {\n  console.log(this.applyForm.value.nom);\n  console.log(this.applyForm.value.email);\n}\n\n// template\n<form [formGroup]=\"applyForm\" (submit)=\"submitForm()\">\n  <input formControlName=\"nom\" value=\"Jean\" />\n  <input formControlName=\"email\" />\n  <button type=\"submit\">OK</button>\n</form>",
      "question": "Si l'utilisateur ne touche pas aux champs et clique OK, que log la console ?",
      "options": [
        "Jean puis une string vide",
        "Deux strings vides",
        "undefined deux fois",
        "Erreur — formGroup non reconnu"
      ],
      "answer": 1,
      "explanation": "Avec les Reactive Forms, la valeur vient du FormControl, pas de l'attribut HTML value. Les deux FormControl sont initialisés avec '' (string vide). L'attribut value=\"Jean\" sur l'input est ignoré car formControlName prend le contrôle. Résultat : deux strings vides.",
      "hint": "En Reactive Forms, c'est le FormControl qui gère la valeur, pas l'attribut HTML."
    },
    {
      "id": "ng-10",
      "type": "identify",
      "difficulty": "advanced",
      "concepts": [
        "signal",
        "state management"
      ],
      "code": "export class CompteurComponent {\n  compteur = signal(0);\n  \n  incrementer() {\n    this.compteur.update(v => v + 1);\n  }\n  \n  reset() {\n    this.compteur.set(0);\n  }\n}",
      "question": "Quelle est la différence entre .set() et .update() sur un signal ?",
      "options": [
        "Aucune, c'est la même chose",
        ".set() remplace la valeur directement, .update() la transforme en fonction de l'ancienne valeur",
        ".set() est synchrone, .update() est asynchrone",
        ".update() est déprécié"
      ],
      "answer": 1,
      "explanation": ".set(0) écrase la valeur par 0 sans considérer l'ancienne valeur. .update(v => v + 1) prend l'ancienne valeur (v) et retourne la nouvelle (v + 1). Utilisez .update() quand la nouvelle valeur dépend de l'ancienne.",
      "hint": "Pensez à la différence entre x = 0 (set) et x = x + 1 (update)."
    }
  ]
};
