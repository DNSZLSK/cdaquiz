export default {
  "domain": "angular",
  "title": "Angular",
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
        "exportAs",
        "selector",
        "host",
        "standalone"
      ],
      "answer": 1,
      "explanation": "selector définit comment Angular référence ce composant dans les templates. Ici, on utilisera <app-produit-card></app-produit-card> dans le HTML parent. exportAs existe bien mais donne un alias au composant pour les références de template (#ref), pas sa balise. host sert à lier des propriétés ou des écouteurs à l'élément hôte déjà créé. standalone est un booléen qui indique si le composant se passe de NgModule : aucun des trois ne nomme la balise.",
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
        "Salut 'Kéwin', tu es 'développeur' !",
        "Salut undefined, tu es undefined !"
      ],
      "answer": 0,
      "explanation": "{{ expression }} est l'interpolation Angular. Les valeurs des propriétés du composant sont injectées dans le template. Le texte avec les accolades ne s'afficherait tel quel que si la page était servie comme du HTML statique, hors compilation Angular. Les quotes simples délimitent les strings en TypeScript et ne font pas partie des valeurs affichées. Enfin, undefined supposerait des propriétés non initialisées, or nom et metier reçoivent leur valeur dès la déclaration de la classe.",
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
        "as",
        "from"
      ],
      "answer": 1,
      "explanation": "La syntaxe @for dans Angular utilise 'of' (comme le for...of JavaScript). track identifie chaque élément pour optimiser le rendu lors des changements. 'in' correspond au for...in de JavaScript, qui parcourt des clés et n'est pas accepté par @for. 'as' existe dans les templates Angular pour créer un alias (par exemple avec @if ou le pipe async), pas pour itérer. 'from' appartient à la syntaxe d'import des modules ES, pas aux boucles.",
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
        "'Gold'",
        "Rien",
        "Une erreur : un signal ne s'appelle pas dans un template"
      ],
      "answer": 0,
      "explanation": "[niveau]=\"'Gold'\" passe la chaîne Gold au signal input de l'enfant, et niveau() renvoie cette valeur dans le template : le badge affiche Gold. Les quotes simples délimitent la valeur dans l'expression : elles ne sont jamais affichées. Sans elles, Angular chercherait une propriété Gold dans le parent, et le badge resterait vide. Quant à l'appel niveau(), c'est justement la façon normale de lire un signal dans un template : aucune erreur.",
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
      "code": "@Injectable({\n  providedIn: 'root'\n})\nexport class PanierService {\n  private readonly _articles = signal<Article[]>([]);\n  readonly articles = this._articles.asReadonly();\n  readonly total = computed(() =>\n    this._articles().reduce((sum, a) => sum + a.prix, 0)\n  );\n\n  ajouter(article: Article) {\n    this._articles.update(list => [...list, article]);\n  }\n}",
      "question": "Que signifie providedIn: 'root' ?",
      "options": [
        "Le service ne peut être injecté que dans AppComponent, le composant racine",
        "Le service est un singleton disponible dans toute l'application",
        "Chaque composant qui l'injecte reçoit sa propre instance du service",
        "Le service doit aussi être listé dans les providers de chaque composant"
      ],
      "answer": 1,
      "explanation": "providedIn: 'root' enregistre le service au niveau racine de l'application. Angular crée une seule instance (singleton) partagée par tous les composants, comportement recommandé pour un panier. 'root' désigne l'injecteur racine, pas le seul AppComponent : tout composant, service ou directive peut l'injecter. Une instance par composant correspondrait à un provider déclaré dans le tableau providers d'un composant. Et providedIn: 'root' dispense justement de toute inscription manuelle dans des providers, tout en permettant le tree-shaking.",
      "hint": "À quel injecteur 'root' fait-il référence, et combien d'instances un injecteur crée-t-il pour un même service ?"
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
        "[routerLinkActive]",
        "[queryParams]"
      ],
      "answer": 1,
      "explanation": "[routerLink] est la directive Angular pour la navigation. Elle construit l'URL dynamiquement : ['/produit', p.id] produit /produit/1, /produit/2, etc., sans recharger la page (navigation SPA). href provoquerait un rechargement complet et ne sait pas construire une URL à partir d'un tableau. [routerLinkActive] existe mais sert à appliquer une classe CSS au lien de la route active, sans déclencher de navigation. [queryParams] complète un routerLink avec des paramètres de requête (?tri=prix), il ne le remplace pas.",
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
      "explanation": "route.snapshot.params['id'] récupère la valeur '7' (string) depuis l'URL et Number() la convertit en nombre : 7. La string '7' serait la réponse si l'on oubliait la conversion Number(). undefined supposerait que les paramètres ne sont pas encore résolus dans le constructeur, or snapshot est une photo synchrone disponible immédiatement. NaN se produirait avec une mauvaise clé, car Number(undefined) donne NaN, mais 'id' correspond bien au :id déclaré dans la route.",
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
      "code": "@Injectable({ providedIn: 'root' })\nexport class RecetteService {\n  private http = inject(HttpClient);\n  private url = 'http://localhost:3000/recettes';\n  \n  getAll(): Observable<Recette[]> {\n    return this.http.______(this.url);\n  }\n}",
      "question": "Quelle méthode HTTP complète l'appel ?",
      "options": [
        "post",
        "get",
        "request",
        "fetch"
      ],
      "answer": 1,
      "explanation": "Pour récupérer des données, on utilise une requête GET via this.http.get(), qui retourne un Observable qu'on subscribe dans le composant (HttpClient doit être fourni à l'application avec provideHttpClient() dans app.config.ts). post() envoie des données pour créer une ressource, pas pour lire. request() existe sur HttpClient mais exige la méthode HTTP en premier argument (this.http.request('GET', url)), la signature ne colle pas ici. fetch appartient à l'API native du navigateur et renvoie une Promise, pas un Observable : ce n'est pas une méthode de HttpClient.",
      "hint": "Quel verbe HTTP sert à lire une ressource sans la modifier ?"
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
      "code": "// composant\napplyForm = new FormGroup({\n  nom: new FormControl(''),\n  email: new FormControl(''),\n});\n\nsubmitForm() {\n  console.log(this.applyForm.value.nom);\n  console.log(this.applyForm.value.email);\n}\n\n// template\n<form [formGroup]=\"applyForm\" (ngSubmit)=\"submitForm()\">\n  <input formControlName=\"nom\" value=\"Jean\" />\n  <input formControlName=\"email\" />\n  <button type=\"submit\">OK</button>\n</form>",
      "question": "Si l'utilisateur ne touche pas aux champs et clique OK, que log la console ?",
      "options": [
        "Jean puis une string vide",
        "Deux strings vides",
        "null deux fois",
        "Erreur : value est incompatible avec formControlName"
      ],
      "answer": 1,
      "explanation": "Avec les Reactive Forms, la valeur vient du FormControl, pas de l'attribut HTML value. Les deux FormControl sont initialisés avec '' (string vide), d'où deux strings vides. Jean puis une string vide supposerait que l'attribut value alimente le contrôle, or formControlName l'écrase. null serait la valeur initiale si les contrôles avaient été créés sans argument (new FormControl()), ce qui n'est pas le cas ici. Et Angular ne lève aucune erreur quand value cohabite avec formControlName : l'attribut est simplement ignoré.",
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
        ".set() notifie les consommateurs du signal, .update() change la valeur sans les prévenir",
        ".set() remplace la valeur directement, .update() la transforme en fonction de l'ancienne valeur",
        ".set() n'accepte que des valeurs primitives, .update() est requis pour les objets et tableaux",
        ".update() modifie la valeur en place sans changer la référence, comme l'ancienne méthode .mutate()"
      ],
      "answer": 1,
      "explanation": ".set(0) écrase la valeur par 0 sans considérer l'ancienne valeur. .update(v => v + 1) prend l'ancienne valeur (v) et retourne la nouvelle (v + 1). Utilisez .update() quand la nouvelle valeur dépend de l'ancienne. Les deux méthodes notifient les consommateurs du signal exactement de la même façon. Le type de la valeur n'entre pas en jeu : .set() accepte aussi bien des objets et des tableaux que des primitives. Enfin .update() ne mute pas en place, il retourne une nouvelle valeur, et la méthode .mutate() a d'ailleurs été retirée de l'API des signals.",
      "hint": "Pensez à la différence entre x = 0 (set) et x = x + 1 (update)."
    }
  ]
};
