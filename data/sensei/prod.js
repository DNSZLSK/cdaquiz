// Vocabulaire Sensei - chapitre "Production et incidents" : 3 lecons, 9 mots.
// Un champ peut etre un texte, ou {js, py, rs} quand il depend du langage choisi.
export default {
  id: "prod",
  title: "Production et incidents",
  goal: "Parler de la production avec des chiffres, pas avec des impressions.",
  lessons: [
    {
      id: "mesures",
      title: "Mesurer la lenteur",
      sub: "Latence, débit, p95",
      steps: [
        {
          type: "concept",
          term: "Latence",
          def: "Le **temps d'attente** d'une requête : entre son envoi et l'arrivée de la réponse. On la mesure en millisecondes (ms). En anglais : latency.",
          beginner: "Le site rame depuis ce matin.",
          phrase: "La latence de la page panier est passée de 200 à 900 ms."
        },
        {
          type: "concept",
          term: "Débit",
          def: "Le **nombre de requêtes traitées par seconde** (req/s). Une API peut avoir un bon débit et une mauvaise latence : elle traite beaucoup de requêtes, mais chacune attend longtemps. En anglais : throughput.",
          phrase: "Le débit tient à 500 requêtes par seconde."
        },
        {
          type: "concept",
          term: "p95",
          def: "Le **95e percentile** : 95 % des requêtes sont plus rapides que cette valeur, 5 % plus lentes. La moyenne masque les requêtes lentes, le p95 les montre. Exemple : 18 requêtes à 100 ms et 2 à 2 000 ms donnent une moyenne de 290 ms, mais un p95 de 2 000 ms.",
          code: {
            js: `const ms = [...Array(18).fill(100), 2000, 2000];   // 20 requêtes
const moyenne = ms.reduce((a, b) => a + b) / ms.length;
const tri = [...ms].sort((a, b) => a - b);
const p95 = tri[Math.ceil(tri.length * 95 / 100) - 1];
console.log(moyenne, p95);   // 290 2000`,
            py: `import math
ms = [100] * 18 + [2000, 2000]   # 20 requêtes
moyenne = sum(ms) / len(ms)
tri = sorted(ms)
p95 = tri[math.ceil(len(tri) * 95 / 100) - 1]
print(moyenne, p95)   # 290.0 2000`,
            rs: `let mut ms = vec![100; 18];
ms.extend([2000, 2000]);   // 20 requêtes
let moyenne = ms.iter().sum::<u32>() / ms.len() as u32;
ms.sort();
let p95 = ms[(ms.len() * 95).div_ceil(100) - 1];
println!("{} {}", moyenne, p95);   // 290 2000`
          },
          phrase: "La moyenne est bonne, mais le p95 de la route /panier est à 2 secondes."
        },
        {
          type: "qcm",
          q: "Sur la route /recherche, la moyenne est de 250 ms et le p95 de 3 s. Que dit un dev senior ?",
          options: [
            "« Tout va bien : la moyenne reste sous les 300 ms, les utilisateurs ne voient rien. »",
            "« Le serveur est lent pour tout le monde : chaque recherche prend environ 3 s. »",
            "« La plupart des recherches sont rapides, mais 5 % prennent plus de 3 s. »"
          ],
          correct: 2,
          explain: "Le p95 dit que 95 % des requêtes ne dépassent pas 3 s : les 5 % restantes durent plus de 3 s. Sur 10 000 recherches par jour, ça fait **500 recherches lentes**. La moyenne de 250 ms les noie dans la masse."
        },
        {
          type: "cloze",
          sentence: "Le nombre de requêtes traitées par seconde, c'est le ___.",
          options: ["temps de réponse", "débit", "p95"],
          correct: 1,
          why: [
            "Le temps de réponse, c'est la latence : combien de temps attend une requête, pas combien on en traite.",
            "",
            "Le p95 est une mesure de latence : la durée sous laquelle passent 95 % des requêtes."
          ]
        }
      ]
    },
    {
      id: "fiabilite",
      title: "Promettre et surveiller",
      sub: "SLO, SLA, observabilité, post-mortem",
      steps: [
        {
          type: "concept",
          term: "SLO",
          def: "Service Level Objective : un **objectif interne** chiffré de qualité de service, que l'équipe se fixe. Exemple : 99,9 % des requêtes réussies sur 30 jours, et un p95 sous 300 ms.",
          rule: "99,9 % sur 30 jours = **43 minutes** de panne autorisées (30 × 24 × 60 min × 0,001 = 43,2 min).",
          phrase: "Notre SLO de disponibilité est de 99,9 % sur 30 jours."
        },
        {
          type: "concept",
          term: "SLA",
          def: "Service Level Agreement : un **engagement écrit dans le contrat** avec le client, avec des pénalités s'il n'est pas tenu (remboursement, avoir). Il est en général moins exigeant que le SLO, pour garder une marge.",
          rule: "**SLO** = l'objectif que l'équipe se fixe. **SLA** = la promesse faite au client, qui coûte de l'argent si on la rate.",
          phrase: "Le SLA garantit 99,5 % de disponibilité au client."
        },
        {
          type: "concept",
          term: "Observabilité",
          def: "La capacité à **comprendre ce qui se passe** dans un système en production à partir de ce qu'il émet : des **logs** (les événements), des **métriques** (les chiffres : latence, débit, taux d'erreur) et des **traces** (le parcours d'une requête d'un service à l'autre). En anglais : observability.",
          phrase: "Sans observabilité, on ne sait pas quel service ralentit la requête."
        },
        {
          type: "concept",
          term: "Post-mortem sans reproche",
          def: "Le **compte rendu écrit après un incident** : chronologie, impact, cause racine, actions pour que ça ne se reproduise pas. « Sans reproche » : on cherche ce qui, dans le système, a rendu l'erreur possible, pas un coupable. En anglais : blameless post-mortem.",
          phrase: "On rédige le post-mortem sans reproche de la panne de mardi."
        },
        {
          type: "qcm",
          q: "Le contrat promet 99,5 % de disponibilité au client. En interne, l'équipe vise 99,9 %. Comment s'appellent ces deux chiffres ?",
          options: [
            "99,5 % est le SLA, et 99,9 % est le SLO",
            "Ce sont deux SLA : l'un pour le client, l'autre pour l'équipe",
            "99,5 % est le SLO, et 99,9 % est le SLA"
          ],
          correct: 0,
          explain: "Le **SLA** est dans le contrat : c'est la promesse au client. Le **SLO** est l'objectif interne, plus exigeant. En visant 99,9 %, l'équipe garde une marge avant de rater les 99,5 % promis."
        },
        {
          type: "qcm",
          q: "Un développeur a vidé la table des commandes en production en lançant un script de test. Quelle phrase a sa place dans un post-mortem sans reproche ?",
          options: [
            "« Le développeur a été négligent : il devra vérifier sa cible avant chaque script. »",
            "« Le script pouvait viser la production sans confirmation : on ajoute une vérification. »",
            "« La cause racine est une erreur humaine : on rappellera les bonnes pratiques à l'équipe. »"
          ],
          correct: 1,
          explain: "Un post-mortem sans reproche cherche **ce qui a rendu l'erreur possible** : ici, un script qui pouvait toucher la production sans garde-fou. Conclure à une « erreur humaine » ou à la négligence ne change rien au système : la même erreur reviendra avec quelqu'un d'autre."
        },
        {
          type: "cloze",
          sentence: "Les logs, les métriques et les traces sont les trois piliers de l'___.",
          options: ["intégration continue", "abstraction", "observabilité"],
          correct: 2,
          why: [
            "L'intégration continue, c'est construire et tester le code à chaque push, pas surveiller la production.",
            "L'abstraction, c'est masquer les détails derrière une interface simple.",
            ""
          ]
        }
      ]
    },
    {
      id: "lenteurs",
      title: "Trouver ce qui ralentit",
      sub: "Cache, problème N+1",
      steps: [
        {
          type: "concept",
          term: "Cache",
          def: "Une **copie rapide** d'un résultat coûteux, gardée pour la réutiliser au lieu de le recalculer ou de le relire en base. Le piège : une copie peut être **périmée**. Il faut décider quand l'invalider (la jeter pour la recalculer).",
          code: {
            js: `const cache = new Map();
let lectures = 0;
function prix(id) {
  if (!cache.has(id)) { lectures++; cache.set(id, id * 10); }   // lecture en base simulée
  return cache.get(id);
}
prix(7); prix(7); prix(7);
console.log(lectures);   // 1 : une seule lecture en base`,
            py: `from functools import cache
lectures = 0
@cache
def prix(id):
    global lectures
    lectures += 1          # lecture en base simulée
    return id * 10
prix(7); prix(7); prix(7)
print(lectures)   # 1 : une seule lecture en base`,
            rs: `use std::collections::HashMap;
let mut cache: HashMap<u32, u32> = HashMap::new();
let mut lectures = 0;
for _ in 0..3 {
    cache.entry(7).or_insert_with(|| { lectures += 1; 7 * 10 });   // lecture en base simulée
}
println!("{}", lectures);   // 1 : une seule lecture en base`
          },
          phrase: "On garde le catalogue en cache pendant 5 minutes."
        },
        {
          type: "concept",
          term: "Problème N+1",
          def: "Pour afficher N éléments, le code fait **1 requête pour la liste, puis 1 requête par élément** : N+1 requêtes au lieu d'une seule. C'est typique d'un ORM qui charge les relations une par une, à la demande. Le remède : une jointure, ou un chargement groupé. En anglais : N+1 query problem.",
          code: `SELECT id_client FROM commande;           -- 1 requête : 50 commandes
SELECT nom FROM client WHERE id = 3;      -- puis 1 requête par commande
SELECT nom FROM client WHERE id = 8;
-- … 51 requêtes en tout

-- ✅ une seule requête :
SELECT commande.id, client.nom
FROM commande JOIN client ON client.id = commande.id_client;`,
          phrase: "Cette page envoie 51 requêtes : c'est un problème N+1."
        },
        {
          type: "qcm",
          q: "Pour afficher 200 livres, les logs montrent `SELECT * FROM auteur WHERE id = ?` répété 200 fois. Que se passe-t-il ?",
          options: [
            "Un problème N+1 : l'auteur de chaque livre est chargé un par un",
            "Un cache mal réglé, qui relit la base à chaque affichage de livre",
            "Une injection SQL : la même requête revient en boucle dans les logs"
          ],
          correct: 0,
          explain: "1 requête pour les livres, puis 1 par livre pour son auteur : **201 requêtes** au lieu d'une jointure. Une injection SQL modifierait le texte de la requête, pas le nombre d'appels. Un cache, s'il existait, éviterait justement ces relectures."
        },
        {
          type: "cloze",
          sentence: "La page reste rapide parce que le résultat est gardé en ___ pendant 5 minutes.",
          options: ["cache", "base", "transit"],
          correct: 0,
          why: [
            "",
            "Relire la base, c'est justement ce qui est lent et qu'on évite.",
            "En transit, c'est pendant le voyage sur le réseau : ça ne garde rien."
          ]
        }
      ]
    }
  ]
};
