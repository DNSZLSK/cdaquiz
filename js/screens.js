// Navigation par map d'ecrans : chaque ecran declare comment s'afficher/se masquer.
const screens = new Map();
let currentScreen = null;

export function registerScreen(name, { show, hide }) {
    screens.set(name, { show, hide });
}

export function showScreen(name, ...args) {
    const next = screens.get(name);
    if (!next) throw new Error(`Ecran inconnu : ${name}`);
    if (currentScreen && currentScreen !== name) {
        screens.get(currentScreen).hide?.();
    }
    currentScreen = name;
    next.show?.(...args);
}

export function getCurrentScreen() {
    return currentScreen;
}
