// Chargement lazy de sql.js (vendore) + creation/execution de bases SQLite.
// ATTENTION : sql-wasm.js est un UMD, pas un module ES. Un import() le chargerait
// en portee module et var initSqlJs n'atteindrait jamais window. On injecte donc
// un <script> classique.
let sqlJsPromise = null;

export function loadSqlJs() {
    if (!sqlJsPromise) {
        sqlJsPromise = new Promise((resolve, reject) => {
            if (window.initSqlJs) { resolve(); return; }
            const s = document.createElement('script');
            s.src = 'vendor/sqljs/sql-wasm.js';
            s.onload = resolve;
            s.onerror = () => reject(new Error('Impossible de charger le moteur SQL (vendor/sqljs/sql-wasm.js)'));
            document.head.appendChild(s);
        })
            .then(() => window.initSqlJs({ locateFile: f => `vendor/sqljs/${f}` }))
            .catch(err => {
                sqlJsPromise = null; // permet un "Reessayer"
                throw err;
            });
    }
    return sqlJsPromise; // Promise<SQL>
}

export function createDb(SQL, seedSql) {
    const db = new SQL.Database();
    db.run(seedSql);
    return db;
}

// Execute la requete utilisateur. Retourne { sets } ou { error }.
export function execUser(db, sql) {
    try {
        return { sets: db.exec(sql) };
    } catch (e) {
        return { error: e.message };
    }
}
