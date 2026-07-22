// Onglets QUIZ | LABO affiches en tete des ecrans menu et hub labo.
let handlers = { quiz: null, labo: null };

export function initTabs({ onQuiz, onLabo }) {
    handlers = { quiz: onQuiz, labo: onLabo };
    document.getElementById('modeTabs').addEventListener('click', (e) => {
        const tab = e.target.closest('[data-tab]');
        if (!tab || tab.classList.contains('active')) return;
        handlers[tab.dataset.tab]?.();
    });
}

export function setTabsVisible(visible) {
    document.getElementById('modeTabs').style.display = visible ? '' : 'none';
}

export function setActiveTab(name) {
    document.querySelectorAll('#modeTabs [data-tab]').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === name);
    });
}
