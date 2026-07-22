// Catalogue du mode LABO. Les counts sont figes ici pour afficher le hub
// sans charger les banques ; les banques se chargent en import() dynamique.
export const laboCatalog = [
    { domain: 'sql',         title: 'SQL Lab',            count: 35, kind: 'sql',  color: '#E74C3C', load: () => import('./sql.js') },
    { domain: 'oop-java',    title: 'POO Java',           count: 15, kind: 'code', color: '#E67E22', load: () => import('./oop-java.js') },
    { domain: 'tests-junit', title: 'Tests unitaires',    count: 8,  kind: 'code', color: '#27AE60', load: () => import('./tests-junit.js') },
    { domain: 'spring-boot', title: 'Spring Boot / JPA',  count: 10, kind: 'code', color: '#6DB33F', load: () => import('./spring-boot.js') },
    { domain: 'angular',     title: 'Angular',            count: 10, kind: 'code', color: '#DD0031', load: () => import('./angular.js') },
    { domain: 'python',      title: 'Python',             count: 10, kind: 'code', color: '#3572A5', load: () => import('./python.js') },
    { domain: 'html-css',    title: 'HTML / CSS',         count: 8,  kind: 'code', color: '#E34F26', load: () => import('./html-css.js') },
    { domain: 'docker',      title: 'Docker',             count: 7,  kind: 'code', color: '#2496ED', load: () => import('./docker.js') },
    { domain: 'uml-archi',   title: 'UML / Architecture', count: 8,  kind: 'code', color: '#3498DB', load: () => import('./uml-archi.js') }
];
