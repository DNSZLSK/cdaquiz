// Pictogrammes monochromes facon signaletique de chambre de test (dessins originaux).
// Partages par l'accueil (modules du quiz) et le hub du labo.
const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const PICTO = {
    all: svg('<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>'),
    python: svg('<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14"/>'),
    git: svg('<circle cx="6" cy="5.5" r="2"/><circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="9" r="2"/><path d="M6 7.5v9M18 11c0 4-6 3-12 5.5"/>'),
    recursivite: svg('<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4.5h-4.5"/><circle cx="12" cy="12" r="2.5"/>'),
    debogage: svg('<rect x="7" y="8" width="10" height="12" rx="5"/><path d="M12 8v12M9 5.5l1.5 2.5M15 5.5L13.5 8M3.5 12H7M17 12h3.5M4.5 17.5L7.5 16M19.5 17.5L16.5 16"/>'),
    memoire: svg('<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>'),
    tests: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 12.5l2.8 2.8L16.5 9"/>'),
    poo: svg('<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>'),
    documentation: svg('<path d="M6 3h8.5L19 7.5V21H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/>'),
    uml: svg('<rect x="3" y="3.5" width="8" height="6" rx="1"/><rect x="13" y="14.5" width="8" height="6" rx="1"/><path d="M7 9.5v4.5h10v.5"/>'),
    web: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>'),
    conception: svg('<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><path d="M3.5 9h17M9 9v10.5"/>'),
    agile: svg('<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5"/><path d="M4 20v-4.5h4.5"/>'),
    architecture: svg('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>'),
    docker: svg('<rect x="3" y="11" width="18" height="8" rx="1"/><path d="M6 11V8h4v3M10 11V8h4v3M14 11V8h4v3M8 8V5h4v3"/>'),
    // bouclier coche (module Securite du quiz)
    securite: svg('<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>'),
    // requete et reponse : deux fleches opposees (module HTTP du quiz)
    http: svg('<path d="M4 8h14M14 4l4 4-4 4"/><path d="M20 16H6M10 12l-4 4 4 4"/>'),
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2"/>'),
    // composant : un bloc decoupe en trois zones (Angular)
    component: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 9h17M10 9v11.5"/><path d="M13 13h4.5M13 16.5h4.5"/>'),
    // page balisee : une page avec des chevrons (HTML / CSS)
    markup: svg('<path d="M6 3h8.5L19 7.5V21H6z"/><path d="M14 3v5h5"/><path d="M10 12l-2.2 2.5L10 17M14 12l2.2 2.5L14 17"/>'),
    bdd: svg('<ellipse cx="12" cy="5.5" rx="7.5" ry="2.5"/><path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5"/>')
};
