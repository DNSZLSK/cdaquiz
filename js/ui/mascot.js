// Unite d'evaluation 03 : l'IA de labo du Centre d'Enrichissement (dessin original).
// Console murale blanche, ecran sombre, deux yeux lumineux. L'expression ne change
// que par les yeux affiches a l'ecran : calme, content, pensif, fier.
// Partagee par l'accueil, le quiz et l'onglet Vocabulaire.
let svgId = 0;

export function unit(mood, size, extra) {
    mood = mood || 'calme'; size = size || 64; const id = 'u' + (++svgId);
    const B = '#0098FF';
    const arcs = `<path d="M38 58 q8 -12 16 0" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M66 58 q8 -12 16 0" stroke="${B}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    const eyes = mood === 'content' ? arcs
        : mood === 'fier' ? arcs + `<path d="M86 32 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#FF6700"/>`
        : mood === 'pensif' ? `<rect x="44" y="38" width="12" height="13" rx="3" fill="${B}"/><rect x="70" y="38" width="12" height="13" rx="3" fill="${B}"/>
            <g class="dots" fill="${B}"><circle cx="50" cy="64" r="2.6"/><circle cx="60" cy="64" r="2.6"/><circle cx="70" cy="64" r="2.6"/></g>`
        : `<rect x="39" y="40" width="13" height="18" rx="3" fill="${B}"/><rect x="68" y="40" width="13" height="18" rx="3" fill="${B}"/>`;
    return `<svg class="unit ${extra || ''}" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="Unité d'évaluation 03">
        <defs><pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="8" fill="#FF6700"/></pattern></defs>
        <path d="M60 17 V8" stroke="#959da5" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="7" r="3.6" fill="#FF6700"/>
        <path d="M47 95 H73 L79 106 H41 Z" fill="#e1e4e8"/><rect x="33" y="105" width="54" height="6" rx="3" fill="#d1d5da"/>
        <rect x="13" y="17" width="94" height="80" rx="14" fill="#ffffff" stroke="#d1d5da" stroke-width="3"/>
        <rect x="22" y="25" width="76" height="52" rx="8" fill="#24292e"/>
        ${eyes}
        <rect x="22" y="83" width="54" height="6" rx="1.5" fill="url(#${id})"/>
        <circle cx="91" cy="86" r="3.6" fill="#FF6700"/>
    </svg>`;
}
