// Service worker CDA Quiz — strategie network-first : en ligne on sert
// toujours la version fraiche (les mises a jour arrivent toutes seules),
// le cache ne sert que de filet hors-ligne.
const CACHE = 'cdaquiz-v3'; // incremente quand ASSETS change : force le re-pre-cache complet

const ASSETS = [
    '.',
    'manifest.json',
    'assets/aperture.png',
    'assets/cake.png',
    'assets/icon-192.png',
    'assets/icon-512.png',
    'assets/icon-maskable-512.png',
    'css/labo.css',
    'css/main.css',
    'css/modules.css',
    'data/catalog.js',
    'data/modules.js',
    'data/questions.js',
    'data/exercises/angular.js',
    'data/exercises/bootstrap.js',
    'data/exercises/docker.js',
    'data/exercises/git.js',
    'data/exercises/html-css.js',
    'data/exercises/index.js',
    'data/exercises/javascript.js',
    'data/exercises/mcd-mld.js',
    'data/exercises/oop-java.js',
    'data/exercises/python-fichiers.js',
    'data/exercises/python.js',
    'data/exercises/spring-boot.js',
    'data/exercises/spring-security.js',
    'data/exercises/sql.js',
    'data/exercises/tests-junit.js',
    'data/exercises/uml-archi.js',
    'js/app.js',
    'js/audio.js',
    'js/quiz-session.js',
    'js/screens.js',
    'js/storage.js',
    'js/utils.js',
    'js/exercises/code-qcm.js',
    'js/exercises/qcm.js',
    'js/exercises/registry.js',
    'js/labo/code-lab.js',
    'js/labo/drafts.js',
    'js/labo/highlight.js',
    'js/labo/hub.js',
    'js/labo/progress.js',
    'js/labo/recap.js',
    'js/labo/selftest.js',
    'js/labo/sounds.js',
    'js/labo/sql-compare.js',
    'js/labo/sql-engine.js',
    'js/labo/sql-lab.js',
    'js/labo/cloud.js',
    'js/labo/cloud-config.js',
    'js/labo/merge.js',
    'js/ui/menu.js',
    'js/ui/quiz.js',
    'js/ui/results.js',
    'js/ui/tabs.js',
    'turretVocals/critical-error.mp3',
    'turretVocals/good-shot.mp3',
    'turretVocals/hello-friend.mp3',
    'turretVocals/hey-hey-hey.mp3',
    'turretVocals/i-dont-blame-you.mp3',
    'turretVocals/i-see-you.mp3',
    'turretVocals/illegal-operation.mp3',
    'turretVocals/is-anyone-there.mp3',
    'turretVocals/noooooo.mp3',
    'turretVocals/oh-dear.mp3',
    'turretVocals/please-stop.mp3',
    'turretVocals/sleep-mode-activated.mp3',
    'turretVocals/thank-you.mp3',
    'turretVocals/um-hello.mp3',
    'turretVocals/what-are-you-doing.mp3',
    'turretVocals/who-are-you.mp3',
    'vendor/sqljs/sql-wasm.js',
    'vendor/sqljs/sql-wasm.wasm'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

    event.respondWith(
        fetch(req)
            .then(res => {
                // reponse fraiche : on met le cache a jour au passage
                const copy = res.clone();
                caches.open(CACHE).then(cache => cache.put(req, copy));
                return res;
            })
            .catch(() =>
                caches.match(req, { ignoreSearch: true }).then(hit =>
                    hit || (req.mode === 'navigate' ? caches.match('.') : undefined)
                )
            )
    );
});
