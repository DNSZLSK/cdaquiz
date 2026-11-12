// Briques de dessin SVG des exercices « Lire un diagramme » (Labo).
// Dessins originaux : notation UML 2.5 et C4, aucun schema repris d'un cours.
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function svgWrap(vb, inner, label, extraClass = '') {
    return `<svg class="dg ${extraClass}" viewBox="${vb}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

export const T = (x, y, s, c = 't', a = 'start') => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${esc(s)}</text>`;
export const R = (x, y, w, h, c = 'bx', rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${c}"/>`;
export const L = (x1, y1, x2, y2, c = 'l') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
export const Ci = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" class="${c}"/>`;

export function head(kind, tx, ty, fx, fy) {
    const a = Math.atan2(ty - fy, tx - fx), co = Math.cos(a), si = Math.sin(a);
    const p = (dx, dy) => `${(tx + dx * co - dy * si).toFixed(1)},${(ty + dx * si + dy * co).toFixed(1)}`;
    switch (kind) {
        case 'open': return `<polyline points="${p(-10, -5)} ${p(0, 0)} ${p(-10, 5)}" class="l"/>`;
        case 'fill': return `<polygon points="${p(0, 0)} ${p(-10, -5)} ${p(-10, 5)}" class="fi"/>`;
        case 'tri': return `<polygon points="${p(0, 0)} ${p(-13, -7)} ${p(-13, 7)}" class="bx"/>`;
        case 'diaO': return `<polygon points="${p(0, 0)} ${p(-9, -5)} ${p(-18, 0)} ${p(-9, 5)}" class="bx"/>`;
        case 'diaF': return `<polygon points="${p(0, 0)} ${p(-9, -5)} ${p(-18, 0)} ${p(-9, 5)}" class="fi"/>`;
    }
    return '';
}
export const arrow = (x1, y1, x2, y2, kind = 'fill', dash = false) => L(x1, y1, x2, y2, dash ? 'l dash' : 'l') + head(kind, x2, y2, x1, y1);

// o.stereo : ligne au-dessus du nom (« «interface» ») ; o.prop : ligne sous le nom (« {abstract} ») ;
// o.italic : nom en italique ; o.noOps : pas de troisieme compartiment (enumeration).
export function cls(x, y, w, name, attrs = [], ops = [], o = {}) {
    const hh = (o.stereo || o.prop) ? 34 : 24;
    const ha = attrs.length * 15 + 8, ho = o.noOps ? 0 : (ops.length ? ops.length * 15 + 8 : 8), h = hh + ha + ho;
    let s = R(x, y, w, h) + L(x, y + hh, x + w, y + hh);
    if (!o.noOps) s += L(x, y + hh + ha, x + w, y + hh + ha);
    const nc = 't tb' + (o.italic ? ' ti' : '');
    if (o.stereo) s += T(x + w / 2, y + 14, o.stereo, 'ts', 'middle') + T(x + w / 2, y + 28, name, nc, 'middle');
    else if (o.prop) s += T(x + w / 2, y + 15, name, nc, 'middle') + T(x + w / 2, y + 28, o.prop, 'ts', 'middle');
    else s += T(x + w / 2, y + 16, name, nc, 'middle');
    attrs.forEach((a, i) => { s += T(x + 8, y + hh + 16 + i * 15, a); });
    ops.forEach((op, i) => { s += T(x + 8, y + hh + ha + 16 + i * 15, op); });
    return s;
}
export function actor(x, y, label, label2) {
    let s = Ci(x, y + 7, 7, 'bx') + L(x, y + 14, x, y + 30) + L(x - 11, y + 19, x + 11, y + 19) + L(x, y + 30, x - 9, y + 44) + L(x, y + 30, x + 9, y + 44);
    s += T(x, y + 58, label, 't', 'middle');
    if (label2) s += T(x, y + 71, label2, 't', 'middle');
    return s;
}
export const uc = (cx, cy, rx, ry, label) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="bx"/>` + T(cx, cy + 4, label, 't', 'middle');
export function comp(x, y, w, h, name) {
    return R(x, y, w, h) + T(x + w / 2, y + h / 2 - 3, '«component»', 'ts', 'middle') + T(x + w / 2, y + h / 2 + 13, name, 't tb', 'middle')
        + R(x + w - 22, y + 8, 14, 18) + R(x + w - 26, y + 11, 8, 4) + R(x + w - 26, y + 19, 8, 4);
}
export function assembly(x1, x2, y, label) {
    const cx = (x1 + x2) / 2;
    return L(x1, y, cx - 10, y) + `<path d="M ${cx},${y - 10} A 10 10 0 0 0 ${cx},${y + 10}" class="l"/>` + Ci(cx, y, 6, 'bx') + L(cx + 6, y, x2, y) + T(cx, y - 16, label, 'ts', 'middle');
}
export function node(x, y, w, h, ster, name) {
    const d = 10;
    return `<polygon points="${x},${y} ${x + d},${y - d} ${x + w + d},${y - d} ${x + w},${y}" class="bx"/>`
        + `<polygon points="${x + w},${y} ${x + w + d},${y - d} ${x + w + d},${y + h - d} ${x + w},${y + h}" class="bx"/>`
        + R(x, y, w, h) + T(x + 8, y + 16, ster, 'ts') + T(x + 8, y + 31, name, 't tb');
}
export function artifact(x, y, w, h, name, noIcon = false) {
    const ix = x + w - 20, iy = y + 7;
    const icon = noIcon ? '' : `<polygon points="${ix},${iy} ${ix + 8},${iy} ${ix + 12},${iy + 4} ${ix + 12},${iy + 15} ${ix},${iy + 15}" class="bx"/>`
        + L(ix + 8, iy, ix + 8, iy + 4) + L(ix + 8, iy + 4, ix + 12, iy + 4);
    return R(x, y, w, h) + icon + T(x + 8, y + 19, '«artifact»', 'ts') + T(x + 8, y + 37, name, 't');
}
// Interface fournie verticale (douille au-dessus, sucette au-dessous) entre y1 et y2.
export function assemblyV(x, y1, y2, label) {
    const cy = (y1 + y2) / 2;
    return L(x, y1, x, cy - 10) + `<path d="M ${x - 10},${cy} A 10 10 0 0 1 ${x + 10},${cy}" class="l"/>` + Ci(x, cy, 6, 'bx') + L(x, cy + 6, x, y2) + T(x + 18, cy + 4, label, 'ts');
}
export const lolly = (x1, x2, y, label) => L(x1, y, x2 - 6, y) + Ci(x2, y, 6, 'bx') + T(x2, y - 12, label, 'ts', 'middle');
export const socket = (x1, x2, y, label) => L(x1, y, x2 - 10, y) + `<path d="M ${x2},${y - 10} A 10 10 0 0 0 ${x2},${y + 10}" class="l"/>` + T(x2, y - 16, label, 'ts', 'middle');
export const port = (cx, cy) => R(cx - 5, cy - 5, 10, 10);
// Cadre de fragment combine (alt, opt, loop) avec son onglet.
export const frm = (x, y, w, h, op) => { const tw = Math.max(44, op.length * 7 + 12); return R(x, y, w, h, 'frm') + `<polygon points="${x},${y} ${x + tw},${y} ${x + tw},${y + 12} ${x + tw - 6},${y + 18} ${x},${y + 18}" class="bx"/>` + T(x + 6, y + 13, op, 't tb'); };
// Message a soi-meme sur une ligne de vie (x = bord droit de l'activation).
export const selfMsg = (x, y, label) => `<polyline points="${x},${y} ${x + 30},${y} ${x + 30},${y + 18} ${x + 2},${y + 18}" class="l"/>` + head('fill', x, y + 18, x + 30, y + 18) + T(x + 37, y + 13, label, 'lbl');
// Transition qui revient sur le meme etat (boucle au-dessus de la boite).
export const selfLoop = (cx, y, label) => `<path d="M ${cx - 12},${y} C ${cx - 22},${y - 34} ${cx + 22},${y - 34} ${cx + 12},${y}" class="l"/>` + head('open', cx + 12, y, cx + 15, y - 10) + T(cx, y - 32, label, 'lbl', 'middle');
export const bar = (x, y, w) => R(x, y, w, 5, 'fi');
export function c4box(x, y, w, h, lines, kind) {
    const c = kind === 'ext' ? 'bxe' : 'bx', rx = kind === 'person' ? 12 : 3;
    const n = lines.length, y0 = y + h / 2 - (n - 1) * 7 + 4;
    let s = R(x, y, w, h, c, rx);
    lines.forEach((t, i) => { s += T(x + w / 2, y0 + i * 14, t, i === 0 ? 't tb' : 'ts', 'middle'); });
    return s;
}
export function cyl(x, y, w, h, lines) {
    let s = `<path d="M ${x},${y + 7} V ${y + h - 7} A ${w / 2} 7 0 0 0 ${x + w},${y + h - 7} V ${y + 7}" class="bx"/>`
        + `<ellipse cx="${x + w / 2}" cy="${y + 7}" rx="${w / 2}" ry="7" class="bx"/>`;
    const n = lines.length, y0 = y + 7 + (h - 7) / 2 - (n - 1) * 7 + 4;
    lines.forEach((t, i) => { s += T(x + w / 2, y0 + i * 14, t, i === 0 ? 't tb' : 'ts', 'middle'); });
    return s;
}
export const action = (x, y, w, h, label) => R(x, y, w, h, 'bx', 13) + T(x + w / 2, y + h / 2 + 4, label, 't', 'middle');
export const state = (x, y, w, h, label) => R(x, y, w, h, 'bx', 8) + T(x + w / 2, y + h / 2 + 4, label, 't tb', 'middle');
export const initial = (cx, cy) => Ci(cx, cy, 7, 'fi');
export const final = (cx, cy) => Ci(cx, cy, 9, 'bx') + Ci(cx, cy, 5, 'fi');
export const decision = (cx, cy) => `<polygon points="${cx},${cy - 15} ${cx + 15},${cy} ${cx},${cy + 15} ${cx - 15},${cy}" class="bx"/>`;
export function onArrow(x1, y1, x2, y2, label) { return T((x1 + x2) / 2, (y1 + y2) / 2 - 4, label, 'lbl', 'middle'); }
