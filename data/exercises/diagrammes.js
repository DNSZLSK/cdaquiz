// Banque du Labo « Lire un diagramme » : 30 diagrammes a reconnaitre (3 par type)
// et 4 fiches de 7 differences. Sujets et dessins inventes pour l'exercice,
// rien n'est repris d'un support de cours.
// Identifiants de progression : 'q-<cle DIAG>' (diagramme reconnu) et 'f-<key>' (fiche a 7/7).
// Ne jamais renommer une cle DIAG ni une key de fiche : la progression enregistree serait perdue.
import { Ci, L, R, T, action, actor, arrow, artifact, assembly, assemblyV, bar, c4box, cls, comp, cyl, decision, final, frm, head, initial, lolly, node, onArrow, port, selfLoop, selfMsg, socket, state, uc } from '../../js/labo/diagram-draw.js';

const DIAG = {
    seq() {
        let s = actor(70, 14, 'Conducteur');
        s += R(200, 34, 100, 28) + T(250, 52, 'Borne', 't tb', 'middle');
        s += R(360, 34, 130, 28) + T(425, 52, 'ServiceBadge', 't tb', 'middle');
        s += L(70, 80, 70, 285, 'l dash lt') + L(250, 62, 250, 285, 'l dash lt') + L(425, 62, 425, 285, 'l dash lt');
        s += R(245, 104, 10, 124) + R(420, 138, 10, 46);
        s += arrow(70, 110, 245, 110, 'fill') + T(80, 103, 'présenterBadge()', 'lbl');
        s += arrow(255, 144, 420, 144, 'fill') + T(265, 137, 'vérifier(idBadge)', 'lbl');
        s += arrow(420, 180, 255, 180, 'open', true) + T(410, 173, 'valide', 'lbl', 'end');
        s += arrow(245, 222, 70, 222, 'open', true) + T(235, 215, 'câble déverrouillé', 'lbl', 'end');
        return { vb: '0 0 520 295', svg: s };
    },
    act() {
        let s = R(10, 8, 500, 282, 'lane') + L(260, 8, 260, 290, 'lane') + L(10, 36, 510, 36, 'lane');
        s += T(135, 27, 'Élève', 't tb', 'middle') + T(385, 27, 'Cantine', 't tb', 'middle');
        s += initial(135, 56) + arrow(135, 63, 135, 80, 'open') + action(75, 80, 120, 28, "Badger à l'entrée");
        s += arrow(135, 108, 135, 124, 'open') + decision(135, 139);
        s += arrow(150, 139, 325, 139, 'open') + T(160, 132, '[badge reconnu]', 'lbl');
        s += action(325, 125, 125, 28, 'Débiter le compte') + arrow(387, 153, 387, 188, 'open');
        s += action(325, 188, 125, 28, 'Servir le plateau') + arrow(387, 216, 387, 244, 'open') + final(387, 254);
        s += arrow(135, 154, 135, 188, 'open') + T(143, 175, '[inconnu]', 'lbl');
        s += action(75, 188, 120, 28, "Aller à l'accueil") + arrow(135, 216, 135, 244, 'open') + final(135, 254);
        return { vb: '0 0 520 298', svg: s };
    },
    etat() {
        let s = initial(35, 60) + arrow(42, 60, 80, 60, 'open') + state(80, 44, 150, 32, 'En attente de dépôt');
        s += arrow(230, 60, 360, 60, 'open') + T(240, 41, 'colis déposé', 'lbl') + T(240, 53, '/ envoyer code', 'lbl');
        s += state(360, 44, 120, 32, 'Disponible');
        s += arrow(420, 76, 420, 180, 'open') + T(428, 132, 'code saisi [code valide]', 'lbl');
        s += state(360, 180, 120, 32, 'Retiré') + arrow(420, 212, 420, 242, 'open') + final(420, 252);
        s += arrow(372, 76, 240, 182, 'open') + T(300, 112, 'after(72 h)', 'lbl', 'end');
        s += state(80, 182, 170, 32, "Renvoyé à l'expéditeur") + arrow(165, 214, 165, 242, 'open') + final(165, 252);
        return { vb: '0 0 560 275', svg: s };
    },
    cls() {
        let s = cls(10, 30, 220, 'Abonne', ['- nom: String', '- email: String'], ['+ reserver(c: Creneau): Reservation']);
        s += cls(330, 30, 150, 'Reservation', ['- date: Date', '- statut: String']);
        s += cls(330, 180, 150, 'Creneau', ['- heure: Time', '- bassin: String', '- places: int']);
        s += L(230, 60, 330, 60) + T(280, 54, 'effectue', 'lbl', 'middle') + T(238, 74, '1', 'lbl') + T(322, 74, '0..*', 'lbl', 'end');
        s += L(405, 100, 405, 180) + T(412, 116, '0..*', 'lbl') + T(412, 174, '1', 'lbl') + T(412, 145, 'porte sur', 'lbl');
        return { vb: '0 0 520 280', svg: s };
    },
    comp() {
        let s = comp(20, 40, 160, 70, 'Prise de RDV') + comp(360, 40, 160, 70, 'Planning');
        s += comp(20, 175, 160, 70, 'Facturation') + comp(360, 175, 160, 70, 'Passerelle SMS');
        s += assembly(180, 360, 75, 'IPlanning') + assembly(180, 360, 210, 'IEnvoiSms');
        s += arrow(100, 175, 100, 110, 'open', true) + T(108, 147, '«use»', 'lbl');
        return { vb: '0 0 540 265', svg: s };
    },
    c4ctr() {
        let s = c4box(10, 112, 115, 52, ['Festivalier', '[Personne]'], 'person');
        s += R(160, 15, 255, 275, 'bnd', 6) + T(172, 33, 'Billetterie du festival', 't tb') + T(172, 47, '[Système logiciel]', 'ts');
        s += c4box(185, 66, 205, 50, ['Appli mobile', '[Conteneur : Flutter]'], 'int');
        s += c4box(185, 142, 205, 50, ['API billets', '[Conteneur : Node.js]'], 'int');
        s += cyl(185, 218, 205, 58, ['Base des billets', '[Conteneur : PostgreSQL]']);
        s += c4box(445, 135, 125, 62, ['Prestataire', 'de paiement', '[Système externe]'], 'ext');
        s += arrow(125, 132, 185, 98, 'open') + onArrow(125, 132, 185, 98, 'utilise');
        s += arrow(287, 116, 287, 142, 'open') + T(295, 133, 'HTTPS/JSON', 'lbl');
        s += arrow(287, 192, 287, 218, 'open') + T(295, 209, 'SQL', 'lbl');
        s += arrow(390, 167, 445, 167, 'open') + T(417, 160, 'paiement', 'lbl', 'middle');
        return { vb: '0 0 580 300', svg: s };
    },
    dep() {
        let s = node(20, 40, 220, 200, '«device»', 'Borne de recharge');
        s += node(40, 90, 170, 135, '«executionEnvironment»', 'Linux embarqué');
        s += artifact(55, 145, 140, 60, 'agent-borne.bin');
        s += node(320, 40, 220, 200, '«device»', 'Serveur de supervision');
        s += node(340, 90, 170, 135, '«executionEnvironment»', 'Docker');
        s += artifact(355, 145, 140, 60, 'supervision.jar');
        s += L(240, 170, 320, 170) + T(280, 162, '«4G»', 'lbl', 'middle') + T(280, 186, '{TLS}', 'lbl', 'middle');
        return { vb: '0 0 560 255', svg: s };
    },
    uc() {
        let s = R(130, 12, 300, 270) + T(140, 30, 'Logiciel de la piscine', 't tb');
        s += actor(60, 40, 'Nageur') + actor(60, 170, 'Maître-nageur') + actor(500, 105, 'Prestataire', 'de paiement');
        s += uc(280, 75, 88, 22, 'Réserver un créneau') + uc(280, 160, 70, 20, 'Payer en ligne') + uc(280, 240, 75, 20, 'Fermer un bassin');
        s += arrow(280, 97, 280, 140, 'open', true) + T(288, 122, '«include»', 'lbl');
        s += L(76, 62, 192, 74) + L(76, 192, 206, 236) + L(350, 158, 486, 132);
        return { vb: '0 0 560 290', svg: s };
    },
    c4ctx() {
        let s = c4box(10, 30, 135, 52, ['Destinataire', '[Personne]'], 'person') + c4box(10, 205, 135, 52, ['Livreur', '[Personne]'], 'person');
        s += c4box(225, 112, 160, 62, ['Consignes connectées', '[Système logiciel]'], 'int');
        s += c4box(455, 30, 135, 52, ['Transporteur', '[Système externe]'], 'ext') + c4box(455, 205, 135, 52, ['Opérateur SMS', '[Système externe]'], 'ext');
        s += arrow(145, 62, 245, 112, 'open') + onArrow(145, 62, 245, 112, 'retire son colis');
        s += arrow(145, 226, 245, 174, 'open') + onArrow(145, 226, 245, 174, 'dépose les colis');
        s += arrow(455, 62, 365, 112, 'open') + onArrow(455, 62, 365, 112, 'annonce les colis');
        s += arrow(365, 174, 455, 226, 'open') + onArrow(365, 174, 455, 226, 'envoie le code');
        return { vb: '0 0 600 285', svg: s };
    },
    c4cmp() {
        let s = c4box(10, 66, 125, 50, ['Appli mobile', '[Conteneur : Flutter]'], 'int');
        s += R(160, 15, 255, 275, 'bnd', 6) + T(172, 33, 'API billets', 't tb') + T(172, 47, '[Conteneur : Node.js]', 'ts');
        s += c4box(185, 66, 205, 50, ['Contrôleur Billets', '[Composant : routeur Express]'], 'int');
        s += c4box(185, 142, 205, 50, ['Service Réservation', '[Composant : TypeScript]'], 'int');
        s += c4box(185, 218, 205, 50, ['Dépôt Billets', '[Composant : TypeScript]'], 'int');
        s += cyl(448, 212, 132, 62, ['Base des billets', '[Conteneur :', 'PostgreSQL]']);
        s += arrow(135, 91, 185, 91, 'open') + T(160, 84, 'JSON', 'lbl', 'middle');
        s += arrow(287, 116, 287, 142, 'open') + T(295, 133, 'délègue', 'lbl');
        s += arrow(287, 192, 287, 218, 'open') + T(295, 209, 'persiste', 'lbl');
        s += arrow(390, 243, 448, 243, 'open') + T(419, 236, 'SQL', 'lbl', 'middle');
        return { vb: '0 0 590 300', svg: s };
    },

    /* --- Sequence : variantes --- */
    seq2() { // pret de livre a un automate, fragment alt
        let s = actor(60, 10, 'Lecteur');
        s += R(180, 30, 100, 28) + T(230, 48, ':Automate', 't tb', 'middle');
        s += R(360, 30, 120, 28) + T(420, 48, ':Catalogue', 't tb', 'middle');
        s += L(60, 76, 60, 340, 'l dash lt') + L(230, 58, 230, 340, 'l dash lt') + L(420, 58, 420, 340, 'l dash lt');
        s += R(225, 94, 10, 230) + R(415, 124, 10, 32) + R(415, 214, 10, 22);
        s += arrow(60, 100, 225, 100, 'fill') + T(70, 93, 'scannerLivre(code)', 'lbl');
        s += arrow(235, 130, 415, 130, 'fill') + T(245, 123, 'estReserve(code)', 'lbl');
        s += arrow(415, 156, 235, 156, 'open', true) + T(405, 149, 'réponse', 'lbl', 'end');
        s += frm(20, 172, 480, 150, 'alt') + T(28, 205, '[livre libre]', 'lbl');
        s += arrow(235, 220, 415, 220, 'fill') + T(245, 213, 'enregistrerPret(code)', 'lbl');
        s += arrow(225, 246, 60, 246, 'open', true) + T(215, 239, 'reçu de prêt', 'lbl', 'end');
        s += L(20, 262, 500, 262, 'l dash') + T(28, 280, '[réservé par un autre]', 'lbl');
        s += arrow(225, 302, 60, 302, 'open', true) + T(215, 295, 'refus', 'lbl', 'end');
        return { vb: '0 0 520 345', svg: s };
    },
    seq3() { // capteurs de parking, fragment loop, asynchrone, message a soi-meme
        let s = R(25, 14, 110, 28) + T(80, 32, ':Capteur', 't tb', 'middle');
        s += R(205, 14, 150, 28) + T(280, 32, ':ServeurParking', 't tb', 'middle');
        s += R(420, 14, 100, 28) + T(470, 32, ':Panneau', 't tb', 'middle');
        s += L(80, 42, 80, 262, 'l dash lt') + L(280, 42, 280, 262, 'l dash lt') + L(470, 42, 470, 262, 'l dash lt');
        s += frm(15, 62, 515, 175, 'loop') + T(66, 76, '[capteur en service]', 'lbl');
        s += R(275, 112, 10, 100);
        s += arrow(80, 118, 275, 118, 'open') + T(90, 111, 'signalerEtat(n°)', 'lbl');
        s += selfMsg(285, 145, 'majCompteur()');
        s += arrow(285, 198, 465, 198, 'open') + T(295, 191, 'afficher(places)', 'lbl');
        return { vb: '0 0 545 272', svg: s };
    },

    /* --- Activite : variantes --- */
    act2() { // inscription a un club : fourche et jonction
        let s = initial(260, 20) + arrow(260, 27, 260, 44, 'open') + action(190, 44, 140, 28, 'Recevoir le dossier');
        s += arrow(260, 72, 260, 90, 'open') + bar(140, 90, 240);
        s += arrow(180, 95, 180, 120, 'open') + arrow(340, 95, 340, 120, 'open');
        s += action(100, 120, 160, 28, 'Vérifier le certificat') + action(265, 120, 150, 28, 'Encaisser la cotisation');
        s += arrow(180, 148, 180, 170, 'open') + arrow(340, 148, 340, 170, 'open') + bar(140, 170, 240);
        s += arrow(260, 175, 260, 195, 'open') + decision(260, 210);
        s += arrow(260, 225, 260, 252, 'open') + T(268, 243, '[dossier complet]', 'lbl');
        s += action(190, 252, 140, 28, 'Délivrer la carte') + arrow(260, 280, 260, 298, 'open') + final(260, 308);
        s += L(245, 210, 90, 210) + arrow(90, 210, 90, 252, 'open') + T(168, 203, '[pièce manquante]', 'lbl', 'middle');
        s += action(25, 252, 130, 28, "Relancer l'adhérent") + arrow(90, 280, 90, 298, 'open') + final(90, 308);
        return { vb: '0 0 520 325', svg: s };
    },
    act3() { // arrosage automatique : fusion et boucles
        let s = initial(280, 18) + arrow(280, 25, 280, 45, 'open') + decision(280, 60);
        s += arrow(280, 75, 280, 95, 'open') + decision(280, 110);
        s += arrow(295, 110, 421, 110, 'open') + T(357, 103, '[fin de saison]', 'lbl', 'middle') + final(430, 110);
        s += arrow(280, 125, 280, 150, 'open') + T(288, 142, '[saison en cours]', 'lbl');
        s += action(205, 150, 150, 28, "Mesurer l'humidité") + arrow(280, 178, 280, 200, 'open') + decision(280, 215);
        s += L(265, 215, 130, 215) + arrow(130, 215, 130, 245, 'open') + T(197, 208, '[sol sec]', 'lbl', 'middle');
        s += action(60, 245, 140, 28, 'Arroser 10 min');
        s += L(295, 215, 430, 215) + arrow(430, 215, 430, 245, 'open') + T(362, 208, '[sol humide]', 'lbl', 'middle');
        s += action(365, 245, 130, 28, 'Attendre 1 h');
        s += L(60, 259, 30, 259) + L(30, 259, 30, 60) + arrow(30, 60, 265, 60, 'open');
        s += L(495, 259, 530, 259) + L(530, 259, 530, 60) + arrow(530, 60, 295, 60, 'open');
        return { vb: '0 0 560 290', svg: s };
    },

    /* --- Etats-transitions : variantes --- */
    etat2() { // trottinette en libre-service : activites internes
        const st = (x, y, name, act) => R(x, y, 160, 50, 'bx', 8) + T(x + 80, y + 18, name, 't tb', 'middle') + L(x, y + 26, x + 160, y + 26) + T(x + 10, y + 42, act, 'ts');
        let s = initial(25, 60) + arrow(32, 60, 70, 60, 'open');
        s += st(70, 35, 'Libre', 'entry / allumer LED verte') + st(360, 35, 'Réservée', 'do / clignoter');
        s += st(360, 175, 'En course', 'do / compter les minutes') + st(70, 175, 'En maintenance', 'entry / alerter l\'atelier');
        s += arrow(230, 52, 360, 52, 'open') + T(295, 45, 'réserver', 'lbl', 'middle');
        s += arrow(360, 74, 230, 74, 'open') + T(295, 90, 'after(15 min)', 'lbl', 'middle');
        s += arrow(440, 85, 440, 175, 'open') + T(448, 134, 'déverrouiller', 'lbl');
        s += arrow(375, 175, 215, 85, 'open') + T(300, 140, 'garer [zone autorisée]', 'lbl', 'middle');
        s += arrow(360, 205, 230, 205, 'open') + T(295, 198, 'when(batterie < 10 %)', 'lbl', 'middle');
        s += arrow(110, 175, 110, 85, 'open') + T(102, 134, 'réparée', 'lbl', 'end');
        return { vb: '0 0 540 240', svg: s };
    },
    etat3() { // ticket de support : boucle sur un etat, after, etat final
        let s = initial(25, 80) + arrow(32, 80, 60, 80, 'open') + state(60, 64, 100, 32, 'Ouvert');
        s += arrow(160, 80, 265, 80, 'open') + T(212, 73, 'prendre en charge', 'lbl', 'middle');
        s += state(265, 64, 120, 32, 'En cours') + state(460, 64, 140, 32, 'En attente client');
        s += arrow(385, 73, 460, 73, 'open') + T(422, 66, 'question', 'lbl', 'middle');
        s += arrow(460, 88, 385, 88, 'open') + T(422, 104, 'réponse reçue', 'lbl', 'middle');
        s += selfLoop(530, 64, 'after(3 j) / relancer');
        s += arrow(345, 96, 345, 170, 'open') + T(353, 138, 'solution envoyée', 'lbl');
        s += arrow(295, 170, 295, 96, 'open') + T(287, 138, 'client conteste', 'lbl', 'end');
        s += state(265, 170, 120, 32, 'Résolu');
        s += arrow(385, 186, 460, 186, 'open') + T(422, 179, 'after(7 j)', 'lbl', 'middle');
        s += state(460, 170, 140, 32, 'Fermé') + arrow(530, 202, 530, 228, 'open') + T(538, 220, 'archivé', 'lbl') + final(530, 238);
        return { vb: '0 0 620 260', svg: s };
    },

    /* --- Classes : variantes --- */
    cls2() { // club : classe abstraite et heritage
        let s = cls(190, 10, 200, 'Activite', ['# titre: String', '# placesMax: int'], ['+ estComplete(): boolean'], { italic: true, prop: '{abstract}' });
        s += cls(60, 190, 170, 'CoursCollectif', ['- jour: String', '- heure: Time']);
        s += cls(350, 190, 170, 'Stage', ['- debut: Date', '- fin: Date']);
        s += arrow(145, 190, 250, 105, 'tri') + arrow(435, 190, 330, 105, 'tri');
        s += cls(10, 20, 120, 'Animateur', ['- nom: String']);
        s += L(130, 45, 190, 45) + T(135, 38, '1', 'lbl') + T(186, 38, '0..*', 'lbl', 'end') + T(160, 62, 'anime', 'lbl', 'middle');
        s += cls(430, 20, 120, 'Adherent', ['- nom: String']);
        s += L(390, 45, 430, 45) + T(394, 38, '*', 'lbl') + T(426, 38, '*', 'lbl', 'end');
        return { vb: '0 0 560 270', svg: s };
    },
    cls3() { // projet : composition, interface, enumeration
        let s = cls(10, 30, 140, 'Projet', ['- nom: String']);
        s += cls(230, 20, 170, 'Tache', ['- titre: String', '- priorite: Priorite'], ['+ terminer()']);
        s += L(150, 50, 230, 50) + head('diaF', 150, 50, 230, 50) + T(172, 44, '1', 'lbl') + T(224, 44, '0..*', 'lbl', 'end');
        s += cls(460, 20, 120, 'Priorite', ['BASSE', 'NORMALE', 'HAUTE'], [], { stereo: '«enumeration»', noOps: true });
        s += cls(230, 170, 170, 'Notifiable', [], ['+ notifier(msg: String)'], { stereo: '«interface»' });
        s += arrow(315, 105, 315, 170, 'tri', true);
        return { vb: '0 0 590 250', svg: s };
    },

    /* --- Composants UML : variantes --- */
    comp2() { // velos partages : interfaces fournies et requises
        let s = comp(20, 40, 160, 70, 'Appli mobile') + comp(360, 40, 170, 70, 'Gestion des comptes');
        s += comp(20, 175, 160, 70, 'Cartographie') + comp(360, 175, 170, 70, 'Paiement');
        s += assembly(180, 360, 75, 'IComptes');
        s += assemblyV(100, 110, 175, 'ICarte') + assemblyV(445, 110, 175, 'IPaiement');
        s += lolly(530, 585, 210, 'IRemboursement');
        return { vb: '0 0 640 265', svg: s };
    },
    comp3() { // serveur de quiz : composant englobant, ports, delegation
        let s = R(120, 20, 330, 160) + T(285, 40, '«component»', 'ts', 'middle') + T(285, 55, 'Serveur de quiz', 't tb', 'middle');
        s += R(450 - 22, 28, 14, 18) + R(450 - 26, 31, 8, 4) + R(450 - 26, 39, 8, 4);
        s += comp(140, 90, 120, 60, 'Questions') + assembly(260, 310, 120, 'IScores') + comp(310, 90, 120, 60, 'Scores');
        s += port(120, 120) + port(450, 120);
        s += arrow(125, 120, 140, 120, 'open') + arrow(430, 120, 445, 120, 'open');
        s += L(76, 120, 115, 120) + Ci(70, 120, 6, 'bx') + T(70, 104, 'IJouer', 'ts', 'middle');
        s += socket(455, 500, 120, 'IStockage');
        return { vb: '0 0 560 200', svg: s };
    },

    /* --- Deploiement : variantes --- */
    dep2() { // trois machines
        let s = node(10, 40, 140, 120, '«device»', 'Smartphone') + artifact(22, 90, 116, 55, 'quiz.apk');
        s += node(220, 40, 170, 190, '«device»', "Serveur d'application");
        s += node(235, 90, 140, 125, '«executionEnvironment»', 'Tomcat') + artifact(248, 145, 114, 55, 'quiz.war');
        s += node(460, 40, 150, 190, '«device»', 'Serveur BDD');
        s += node(472, 90, 126, 125, '«executionEnvironment»', 'PostgreSQL') + artifact(482, 145, 106, 55, 'schema.sql');
        s += L(160, 100, 220, 100) + T(190, 92, '«HTTPS»', 'lbl', 'middle');
        s += L(400, 135, 460, 135) + T(430, 127, '«JDBC»', 'lbl', 'middle');
        return { vb: '0 0 630 245', svg: s };
    },
    dep3() { // serre connectee : multiplicites sur les liens
        let s = node(10, 50, 150, 120, '«device»', "Capteur d'humidité") + artifact(22, 100, 126, 55, 'capteur.hex');
        s += node(220, 50, 150, 120, '«device»', 'Passerelle') + artifact(232, 100, 126, 55, 'relais.py');
        s += node(430, 40, 170, 170, '«device»', 'Serveur') + node(445, 90, 140, 105, '«executionEnvironment»', 'JVM') + artifact(457, 135, 116, 50, 'serre.jar');
        s += L(170, 115, 220, 115) + T(195, 107, '«LoRa»', 'lbl', 'middle') + T(174, 131, '1..*', 'lbl') + T(214, 131, '1', 'lbl', 'end');
        s += L(380, 115, 430, 115) + T(405, 107, '«MQTT»', 'lbl', 'middle') + T(384, 131, '*', 'lbl') + T(424, 131, '1', 'lbl', 'end');
        return { vb: '0 0 620 225', svg: s };
    },

    /* --- Cas d'utilisation : variantes --- */
    uc2() { // covoiturage : heritage entre acteurs, extend
        let s = R(150, 12, 290, 300) + T(160, 30, 'Covoiturage', 't tb');
        s += actor(70, 20, 'Membre') + actor(35, 150, 'Conducteur') + actor(108, 150, 'Passager');
        s += arrow(35, 150, 62, 86, 'tri') + arrow(108, 150, 78, 86, 'tri');
        s += uc(295, 60, 100, 22, 'Consulter les trajets') + uc(295, 135, 88, 20, 'Réserver une place');
        s += uc(295, 210, 82, 20, 'Ajouter un bagage') + uc(295, 275, 85, 20, 'Proposer un trajet');
        s += arrow(295, 190, 295, 155, 'open', true) + T(303, 177, '«extend»', 'lbl');
        s += L(84, 45, 195, 58) + L(122, 172, 207, 137) + L(66, 214, 210, 272);
        return { vb: '0 0 470 320', svg: s };
    },
    uc3() { // camping : extend et acteur secondaire
        let s = R(140, 12, 290, 300) + T(150, 30, 'Logiciel du camping', 't tb');
        s += actor(60, 30, 'Campeur') + actor(60, 190, 'Gérant') + actor(510, 150, 'Banque');
        s += uc(285, 60, 100, 22, 'Enregistrer son arrivée') + uc(285, 140, 70, 20, 'Louer un vélo');
        s += uc(285, 210, 90, 20, 'Encaisser le séjour') + uc(285, 275, 105, 20, 'Bloquer un emplacement');
        s += arrow(285, 120, 285, 82, 'open', true) + T(293, 105, '«extend»', 'lbl');
        s += L(76, 52, 195, 60) + L(76, 212, 195, 210) + L(76, 222, 182, 270) + L(498, 172, 375, 208);
        return { vb: '0 0 560 320', svg: s };
    },

    /* --- C4 contexte : variantes --- */
    c4ctx2() { // plateforme de cours de musique
        let s = c4box(10, 30, 135, 52, ['Élève', '[Personne]'], 'person') + c4box(10, 205, 135, 52, ['Professeur', '[Personne]'], 'person');
        s += c4box(225, 112, 170, 62, ['Plateforme de cours', '[Système logiciel]'], 'int');
        s += c4box(455, 30, 135, 52, ['Service de visio', '[Système externe]'], 'ext') + c4box(455, 200, 135, 62, ['Prestataire', 'de paiement', '[Système externe]'], 'ext');
        s += c4box(225, 240, 170, 52, ['Messagerie e-mail', '[Système externe]'], 'ext');
        s += arrow(145, 62, 245, 112, 'open') + onArrow(145, 62, 245, 112, 'réserve un cours');
        s += arrow(145, 226, 245, 174, 'open') + onArrow(145, 226, 245, 174, 'publie ses créneaux');
        s += arrow(375, 112, 455, 62, 'open') + onArrow(375, 112, 455, 62, 'ouvre la salle');
        s += arrow(375, 174, 455, 222, 'open') + onArrow(375, 174, 455, 222, 'fait payer');
        s += arrow(310, 174, 310, 240, 'open') + T(318, 212, 'envoie les rappels', 'lbl');
        return { vb: '0 0 600 300', svg: s };
    },
    c4ctx3() { // info trafic des bus
        let s = c4box(10, 40, 135, 52, ['Voyageur', '[Personne]'], 'person') + c4box(10, 200, 135, 52, ['Régulateur', '[Personne]'], 'person');
        s += c4box(225, 115, 160, 62, ['Info trafic', '[Système logiciel]'], 'int');
        s += c4box(455, 35, 135, 62, ['Balises GPS', 'des bus', '[Système externe]'], 'ext') + c4box(455, 200, 135, 52, ['Écrans des arrêts', '[Système externe]'], 'ext');
        s += arrow(145, 70, 245, 115, 'open') + onArrow(145, 70, 245, 115, 'consulte les horaires');
        s += arrow(145, 222, 245, 177, 'open') + onArrow(145, 222, 245, 177, 'signale une panne');
        s += arrow(455, 70, 365, 115, 'open') + onArrow(455, 70, 365, 115, 'envoie les positions');
        s += arrow(365, 177, 455, 222, 'open') + onArrow(365, 177, 455, 222, 'affiche les attentes');
        return { vb: '0 0 600 270', svg: s };
    },

    /* --- C4 conteneurs : variantes --- */
    c4ctr2() { // plateforme de cours de musique, zoom niveau 2
        let s = c4box(10, 62, 115, 52, ['Élève', '[Personne]'], 'person');
        s += R(160, 15, 265, 280, 'bnd', 6) + T(172, 33, 'Plateforme de cours', 't tb') + T(172, 47, '[Système logiciel]', 'ts');
        s += c4box(180, 62, 225, 50, ['Site web', '[Conteneur : React]'], 'int');
        s += c4box(180, 138, 225, 50, ['API cours', '[Conteneur : Java Spring]'], 'int');
        s += cyl(180, 214, 225, 58, ['Base des cours', '[Conteneur : MySQL]']);
        s += c4box(455, 137, 125, 52, ['Service de visio', '[Système externe]'], 'ext');
        s += arrow(125, 88, 180, 88, 'open') + T(152, 81, 'utilise', 'lbl', 'middle');
        s += arrow(292, 112, 292, 138, 'open') + T(300, 129, 'HTTPS/JSON', 'lbl');
        s += arrow(292, 188, 292, 214, 'open') + T(300, 205, 'JDBC', 'lbl');
        s += arrow(405, 163, 455, 163, 'open') + T(430, 156, 'salles', 'lbl', 'middle');
        return { vb: '0 0 590 305', svg: s };
    },
    c4ctr3() { // info trafic, zoom niveau 2
        let s = c4box(10, 60, 115, 52, ['Voyageur', '[Personne]'], 'person');
        s += R(160, 15, 280, 280, 'bnd', 6) + T(172, 33, 'Info trafic', 't tb') + T(172, 47, '[Système logiciel]', 'ts');
        s += c4box(180, 60, 240, 50, ['Appli voyageur', '[Conteneur : Kotlin]'], 'int');
        s += c4box(180, 138, 240, 50, ['Service des positions', '[Conteneur : Go]'], 'int');
        s += cyl(180, 216, 240, 58, ['Cache des attentes', '[Conteneur : Redis]']);
        s += c4box(470, 132, 120, 62, ['Balises GPS', 'des bus', '[Système externe]'], 'ext');
        s += arrow(125, 86, 180, 86, 'open') + T(152, 79, 'consulte', 'lbl', 'middle');
        s += arrow(300, 110, 300, 138, 'open') + T(308, 128, 'HTTPS/JSON', 'lbl');
        s += arrow(300, 188, 300, 216, 'open') + T(308, 206, 'lit / écrit', 'lbl');
        s += arrow(470, 163, 420, 163, 'open') + T(445, 156, 'GPS', 'lbl', 'middle');
        return { vb: '0 0 600 305', svg: s };
    },

    /* --- C4 composants : variantes --- */
    c4cmp2() { // API cours, zoom niveau 3
        let s = c4box(10, 62, 125, 50, ['Site web', '[Conteneur : React]'], 'int');
        s += R(160, 15, 265, 275, 'bnd', 6) + T(172, 33, 'API cours', 't tb') + T(172, 47, '[Conteneur : Java Spring]', 'ts');
        s += c4box(180, 62, 225, 50, ['Contrôleur Cours', '[Composant : Spring MVC]'], 'int');
        s += c4box(180, 138, 225, 50, ['Service Planning', '[Composant : Spring Bean]'], 'int');
        s += c4box(180, 214, 225, 50, ['Client Visio', '[Composant : client HTTP]'], 'int');
        s += c4box(455, 213, 125, 52, ['Service de visio', '[Système externe]'], 'ext');
        s += arrow(135, 87, 180, 87, 'open') + T(157, 80, 'JSON', 'lbl', 'middle');
        s += arrow(292, 112, 292, 138, 'open') + T(300, 129, 'appelle', 'lbl');
        s += arrow(292, 188, 292, 214, 'open') + T(300, 205, 'demande une salle', 'lbl');
        s += arrow(405, 239, 455, 239, 'open') + T(430, 232, 'HTTPS', 'lbl', 'middle');
        return { vb: '0 0 590 300', svg: s };
    },
    c4cmp3() { // service des positions, zoom niveau 3
        let s = c4box(10, 60, 130, 62, ['Balises GPS', 'des bus', '[Système externe]'], 'ext');
        s += R(165, 15, 260, 275, 'bnd', 6) + T(177, 33, 'Service des positions', 't tb') + T(177, 47, '[Conteneur : Go]', 'ts');
        s += c4box(185, 66, 220, 50, ['Récepteur GPS', '[Composant : client MQTT]'], 'int');
        s += c4box(185, 142, 220, 50, ['Calcul des retards', '[Composant : package Go]'], 'int');
        s += c4box(185, 218, 220, 50, ['Publication', '[Composant : client Redis]'], 'int');
        s += cyl(455, 212, 130, 62, ['Cache des attentes', '[Conteneur :', 'Redis]']);
        s += arrow(140, 91, 185, 91, 'open') + T(162, 84, 'MQTT', 'lbl', 'middle');
        s += arrow(295, 116, 295, 142, 'open') + T(303, 133, 'transmet', 'lbl');
        s += arrow(295, 192, 295, 218, 'open') + T(303, 209, 'retards', 'lbl');
        s += arrow(405, 243, 455, 243, 'open') + T(430, 236, 'écrit', 'lbl', 'middle');
        return { vb: '0 0 595 300', svg: s };
    }
};

const NAMES = {
    SEQ: 'Diagramme de séquence', ACT: "Diagramme d'activité", ETAT: "Diagramme d'états-transitions",
    CLS: 'Diagramme de classes', COMP: 'Diagramme de composants (UML)', DEP: 'Diagramme de déploiement',
    UC: "Diagramme de cas d'utilisation", C1: 'C4 · niveau 1 : contexte', C2: 'C4 · niveau 2 : conteneurs', C3: 'C4 · niveau 3 : composants'
};

const QUESTIONS = [
    { d: 'seq', ok: 'SEQ', ds: ['ACT', 'ETAT', 'UC'],
        hint: "Les participants sont alignés en haut, chacun avec une ligne de vie en pointillé. Le temps descend : on lit les messages de haut en bas. Les rectangles fins posés sur les lignes de vie sont des activations." },
    { d: 'act', ok: 'ACT', ds: ['ETAT', 'SEQ', 'UC'],
        hint: "Un disque plein au départ, des actions nommées par un verbe (« Badger », « Servir »), un losange de décision avec des gardes entre crochets, et des couloirs par responsable. Un diagramme d'états aurait des états (« Disponible »), pas des actions." },
    { d: 'etat', ok: 'ETAT', ds: ['ACT', 'SEQ', 'CLS'],
        hint: "Les boîtes arrondies sont des états, nommés comme une situation (« Disponible », « Retiré »), pas comme une action. Les flèches portent un événement, une garde et une action : « code saisi [code valide] », « colis déposé / envoyer code ». « after(72 h) » est un événement temporel." },
    { d: 'cls', ok: 'CLS', ds: ['COMP', 'C3', 'DEP'],
        hint: "Des rectangles à trois compartiments (nom, attributs typés, opérations), des visibilités - et +, et des multiplicités au bout des associations (1, 0..*)." },
    { d: 'comp', ok: 'COMP', ds: ['C3', 'DEP', 'CLS'],
        hint: "L'icône de composant en haut à droite, le stéréotype «component», et surtout les interfaces : la sucette est une interface fournie, la douille une interface requise. En C4, on ne les utilise généralement pas : on écrit [Composant : techno]." },
    { d: 'c4ctr', ok: 'C2', ds: ['C1', 'DEP', 'C3'],
        hint: "Une frontière en pointillé autour du système, avec plusieurs boîtes dedans : l'appli, l'API et la base. Chaque boîte indique sa technologie ([Conteneur : Flutter]). Au niveau 1, le système serait une seule boîte noire." },
    { d: 'dep', ok: 'DEP', ds: ['C2', 'COMP', 'CLS'],
        hint: "Des nœuds dessinés en cubes et imbriqués : un «device» (le matériel) contient un «executionEnvironment» (le logiciel qui exécute), qui contient l'«artifact» déployé. Le trait entre les deux machines est un chemin de communication, avec son réseau et une contrainte." },
    { d: 'uc', ok: 'UC', ds: ['C1', 'ACT', 'SEQ'],
        hint: "Des ellipses nommées par un verbe à l'infinitif, des acteurs en bonhomme, un rectangle qui marque la frontière du système, et un «include» en pointillé. Par habitude, l'acteur qui déclenche est à gauche et l'acteur secondaire à droite." },
    { d: 'c4ctx', ok: 'C1', ds: ['UC', 'C2', 'DEP'],
        hint: "Le système étudié est une seule boîte, au centre ([Système logiciel]). Autour, des personnes et des systèmes externes reliés par des flèches légendées. Il n'y a pas d'ellipses : ce n'est pas un diagramme de cas d'utilisation." },
    { d: 'c4cmp', ok: 'C3', ds: ['COMP', 'C2', 'CLS'],
        hint: "La frontière est un conteneur ([Conteneur : Node.js]), et les boîtes à l'intérieur sont des [Composant : …] reliés par des flèches légendées. Pas de mot-clé «component» ni d'icône de composant : c'est la notation C4." },

    { d: 'seq2', ok: 'SEQ', ds: ['ACT', 'ETAT', 'C3'],
        hint: "Des participants en haut avec leurs lignes de vie en pointillé, des messages qu'on lit de haut en bas. Le cadre « alt » contient deux cas séparés par un pointillé, chacun avec sa garde entre crochets." },
    { d: 'seq3', ok: 'SEQ', ds: ['ACT', 'ETAT', 'COMP'],
        hint: "Des lignes de vie verticales et des messages horizontaux. Le cadre « loop » répète son contenu tant que sa garde est vraie. La pointe ouverte en trait plein est un message asynchrone : on n'attend pas de réponse. La flèche qui revient sur sa propre ligne de vie est un message à soi-même." },
    { d: 'act2', ok: 'ACT', ds: ['ETAT', 'SEQ', 'UC'],
        hint: "Des actions nommées par un verbe. La barre épaisse du haut sépare le flot en deux actions menées en parallèle ; celle du bas attend qu'elles soient toutes les deux finies. Le losange choisit la suite selon la garde entre crochets." },
    { d: 'act3', ok: 'ACT', ds: ['ETAT', 'UC', 'SEQ'],
        hint: "Un nœud initial, des actions et trois losanges : celui du haut fusionne les retours de boucle, les deux autres décident avec des gardes entre crochets. « Arroser 10 min » est quelque chose qu'on fait, pas une situation : ce n'est pas un état." },
    { d: 'etat2', ok: 'ETAT', ds: ['ACT', 'COMP', 'CLS'],
        hint: "Des états nommés comme des situations (« Libre », « En course »), avec leurs activités internes : entry / à l'entrée dans l'état, do / activité qui dure tant qu'on reste dans l'état (au plus tard jusqu'à la sortie). Chaque flèche est déclenchée par un événement, parfois avec une garde : « garer [zone autorisée] ». « when(…) » se déclenche quand la condition devient vraie." },
    { d: 'etat3', ok: 'ETAT', ds: ['ACT', 'SEQ', 'UC'],
        hint: "Des états (« Ouvert », « Résolu »), un point de départ, un point de fin, et des transitions légendées par l'événement déclencheur. La boucle sur « En attente client » revient sur le même état ; « after(3 j) » et « after(7 j) » sont des événements temporels ; « / relancer » est l'action faite pendant la transition." },
    { d: 'cls2', ok: 'CLS', ds: ['COMP', 'C2', 'DEP'],
        hint: "Des classes à compartiments. Le nom en italique avec {abstract} marque une classe abstraite. Les triangles creux montrent l'héritage, de la fille vers la mère. On voit aussi les visibilités (- privé, # protégé, + public) et les multiplicités." },
    { d: 'cls3', ok: 'CLS', ds: ['COMP', 'C3', 'DEP'],
        hint: "Des classes avec attributs et opérations. Le losange plein est une composition (un projet possède ses tâches). Le pointillé à triangle creux est la réalisation d'une «interface», et l'«enumeration» liste des valeurs." },
    { d: 'comp2', ok: 'COMP', ds: ['C3', 'CLS', 'ETAT'],
        hint: "Des boîtes «component» avec l'icône à deux languettes, branchées par leurs interfaces : la sucette (rond) est fournie, la douille (demi-cercle) est requise. Une sucette seule, comme IRemboursement, est offerte à qui veut l'utiliser." },
    { d: 'comp3', ok: 'COMP', ds: ['C3', 'DEP', 'C2'],
        hint: "Un grand composant qui en contient d'autres. Les petits carrés sur son bord sont des ports, et les flèches de délégation transmettent ce qui entre par un port au composant interne qui s'en charge. Sucette = fournie, douille = requise." },
    { d: 'dep2', ok: 'DEP', ds: ['C2', 'COMP', 'CLS'],
        hint: "Des cubes : des machines «device», les environnements d'exécution emboîtés dedans, et les fichiers déployés («artifact») au plus profond. Les traits entre machines sont des chemins de communication, avec leur protocole." },
    { d: 'dep3', ok: 'DEP', ds: ['C2', 'COMP', 'C1'],
        hint: "Chaque cube «device» est un matériel réel, avec ses «artifact» installés. Les multiplicités sur les liens (1..* capteurs pour 1 passerelle) disent combien d'exemplaires de chaque machine sont reliés." },
    { d: 'uc2', ok: 'UC', ds: ['C1', 'CLS', 'ACT'],
        hint: "Une frontière de système, des ellipses nommées par un verbe, des acteurs en bonhomme. Le triangle creux entre acteurs dit que passager et conducteur sont des membres : ils héritent de « Consulter les trajets ». «extend» part du cas facultatif vers le cas de base." },
    { d: 'uc3', ok: 'UC', ds: ['C1', 'ACT', 'COMP'],
        hint: "Des cas d'utilisation (ellipses, verbe à l'infinitif) dans la frontière du système, et les acteurs dehors. «extend» va du cas facultatif (« Louer un vélo ») vers le cas qu'il complète. La banque, à droite, est un acteur secondaire." },
    { d: 'c4ctx2', ok: 'C1', ds: ['UC', 'C2', 'COMP'],
        hint: "Le système étudié est une seule boîte au centre, sans détail ni technologie. Autour : les personnes qui l'utilisent et les systèmes externes (en gris), reliés par des flèches qui disent ce qu'ils échangent." },
    { d: 'c4ctx3', ok: 'C1', ds: ['UC', 'C2', 'DEP'],
        hint: "Une seule boîte [Système logiciel] pour tout le système, ses utilisateurs et les systèmes externes. Aucune technologie n'apparaît : à ce niveau, on ne regarde pas encore à l'intérieur." },
    { d: 'c4ctr2', ok: 'C2', ds: ['C1', 'C3', 'DEP'],
        hint: "La frontière du système en pointillé, et dedans plusieurs boîtes déployables séparément : le site, l'API, la base. Chacune annonce sa technologie ([Conteneur : React]). Le service de visio reste dehors, en gris." },
    { d: 'c4ctr3', ok: 'C2', ds: ['C1', 'DEP', 'COMP'],
        hint: "On voit l'intérieur du système : ses conteneurs (appli, service, cache), chacun avec sa technologie, dans une frontière en pointillé. Les balises GPS restent une boîte externe : on ne regarde pas dedans." },
    { d: 'c4cmp2', ok: 'C3', ds: ['COMP', 'C2', 'CLS'],
        hint: "La frontière est un seul conteneur (l'API) et, dedans, des [Composant : …] avec leur techno. Ce qui est dehors (le site, le service de visio) reste une boîte simple. Pas de «component» ni d'icône de composant : c'est du C4." },
    { d: 'c4cmp3', ok: 'C3', ds: ['COMP', 'C2', 'ACT'],
        hint: "On zoome dans un seul conteneur (le service des positions) pour voir ses composants internes, chacun avec sa techno. Le cache Redis est un autre conteneur, dessiné hors de la frontière." }
];

const SHEETS = [
    {
        key: 'classes', kind: 'Diagramme de classes', title: 'Réseau de bornes de recharge', vb: '0 0 600 460',
        rules: [
            'Une station regroupe de 2 à 8 bornes. Démolir une station fait disparaître ses bornes.',
            'Une borne porte 1 ou 2 connecteurs. Un connecteur peut être démonté, remonté sur une autre borne, ou rester en stock.',
            "Un conducteur effectue autant de recharges qu'il veut, éventuellement aucune. Chaque recharge est faite par exactement un conducteur.",
            "Chaque recharge a lieu sur exactement une borne. Une borne peut n'avoir encore servi à aucune recharge.",
            "Un abonné est un conducteur qui bénéficie d'une remise.",
            'Pour calculer son prix, une recharge reçoit un service de tarif en paramètre, sans le garder.'
        ],
        draw(A) {
            let s = '';
            s += cls(10, 20, 130, 'Station', ['- nom: String', '- ville: String']);
            s += cls(225, 20, 150, 'Borne', ['- numero: String', '- puissance: int']);
            s += cls(445, 20, 145, 'Connecteur', ['- type: String']);
            s += cls(190, 170, 210, 'Recharge', ['- debut: DateTime', '- kWh: decimal'], ['+ prix(t: ServiceTarif): decimal']);
            s += cls(450, 192, 140, 'ServiceTarif', ['- tarifKwh: decimal']);
            s += cls(10, 330, 150, 'Conducteur', ['- nom: String']);
            s += cls(215, 390, 150, 'Abonne', ['- remise: decimal']);
            s += L(140, 50, 225, 50) + head(A ? 'diaO' : 'diaF', 140, 50, 225, 50);
            s += T(164, 64, '1', 'lbl') + T(219, 64, A ? '2..8' : '1..*', 'lbl', 'end');
            s += L(375, 45, 445, 45) + (A ? head('diaO', 445, 45, 375, 45) : head('diaO', 375, 45, 445, 45));
            s += T(381, 60, '0..1', 'lbl') + T(439, 60, '1..2', 'lbl', 'end');
            s += L(300, 90, 300, 170) + T(306, 104, '1', 'lbl') + T(306, 165, '0..*', 'lbl');
            s += L(190, 230, 85, 330) + T(178, 226, A ? '0..*' : '*', 'lbl', 'end') + T(104, 326, A ? '1' : '0..1', 'lbl') + T(140, 290, 'effectue', 'lbl');
            s += A ? arrow(400, 215, 450, 215, 'open', true) : L(400, 215, 450, 215);
            s += L(215, 417, 160, 357) + (A ? head('tri', 215, 417, 160, 357) : head('tri', 160, 357, 215, 417));
            return s;
        },
        diffs: [
            { id: 1, zone: [134, 38, 30, 24], ans: 'B',
                ok: "Démolir la station détruit ses bornes : c'est une composition, losange plein côté station.",
                bad: ["Une borne peut changer de station, donc c'est une agrégation : losange creux côté station.",
                            "Le losange plein veut dire que la station a plusieurs bornes, le creux qu'elle n'en a qu'une.",
                            "Losange creux ou plein, c'est la même relation : seul le dessin change selon l'outil utilisé."] },
            { id: 2, zone: [188, 52, 36, 16], ans: 'A',
                ok: "La règle fixe un minimum de 2 et un maximum de 8 bornes : on écrit 2..8 du côté de Borne.",
                bad: ["1..* reste juste : une station a au moins une borne, et le maximum n'a pas à figurer.",
                            "La multiplicité côté Borne compte les stations d'une borne, donc il faut écrire 1..*.",
                            "UML n'accepte que 1, 0..1, 1..* et * : une plage comme 2..8 ne peut pas s'écrire."] },
            { id: 3, zone: [154, 350, 68, 74], ans: 'B',
                ok: "La flèche part de la classe fille : un abonné est un conducteur, donc le triangle touche Conducteur.",
                bad: ["Le triangle se place côté classe fille, puisque c'est elle qui reçoit les attributs hérités.",
                            "En généralisation, le sens ne compte pas tant que le triangle est creux et non plein.",
                            "La flèche va de la mère vers la fille, car c'est la mère qui transmet ses attributs."] },
            { id: 4, zone: [398, 204, 54, 22], ans: 'A',
                ok: "La recharge reçoit le service en paramètre sans le garder : c'est une dépendance, en pointillé.",
                bad: ["La recharge se sert du service, donc elle en garde une référence : trait plein d'association.",
                            "Le pointillé marque une association facultative, c'est-à-dire de multiplicité 0..1.",
                            "Un trait plein suffit : UML ne fait aucune différence entre utiliser et posséder."] },
            { id: 5, zone: [150, 213, 34, 17], ans: 'both',
                ok: "* et 0..* veulent dire la même chose : zéro, une ou plusieurs recharges. Les deux se valent.",
                bad: ["* veut dire au moins une, donc seul 0..* permet un conducteur sans aucune recharge.",
                            "0..* est réservé aux compositions ; sur une association simple, on doit écrire *.",
                            "* veut dire un nombre illimité mais connu d'avance, et 0..* un nombre inconnu."] },
            { id: 6, zone: [98, 313, 32, 17], ans: 'A',
                ok: "Chaque recharge est faite par exactement un conducteur : on écrit 1, pas 0..1.",
                bad: ["0..1 est plus prudent : une recharge peut rester anonyme si on paie par carte bancaire.",
                            "Ce chiffre compte les recharges d'un conducteur, donc 0..1 en autorise une au plus.",
                            "1 et 0..1 se valent dès que l'association porte un nom, comme ici « effectue »."] },
            { id: 7, zone: [372, 34, 76, 18], ans: 'B',
                ok: "Le losange se dessine côté tout : c'est la borne qui assemble ses connecteurs, il touche Borne.",
                bad: ["Le losange se dessine côté partie, ici le connecteur, puisque c'est lui qui est agrégé.",
                            "Un connecteur démontable n'est lié à rien : il faudrait une simple dépendance en pointillé.",
                            "Le losange creux doit toucher Connecteur, car c'est le connecteur qui se démonte."] }
        ]
    },

    {
        key: 'sequence', kind: 'Diagramme de séquence', title: 'Prêt de vélo à une borne', vb: '0 0 600 450',
        rules: [
            "L'usager présente sa carte à la borne.",
            "La borne demande au serveur central si l'abonnement est valide, et attend sa réponse avant de continuer.",
            "Si l'abonnement est valide, la borne ordonne au verrou de libérer un vélo. Sinon, elle affiche « abonnement expiré ».",
            "Dans tous les cas, la borne envoie ensuite au serveur un journal de l'opération, sans attendre de réponse.",
            'Pour finir, la borne fait clignoter son écran trois fois.'
        ],
        draw(A) {
            let s = actor(50, 10, 'Usager');
            s += R(150, 30, 100, 28) + T(200, 48, ':Borne', 't tb', 'middle');
            s += R(295, 30, 160, 28) + T(375, 48, A ? ':ServeurCentral' : 'central : ServeurCentral', 't tb', 'middle');
            s += R(490, 30, 90, 28) + T(535, 48, ':Verrou', 't tb', 'middle');
            s += L(50, 76, 50, 445, 'l dash lt') + L(200, 58, 200, 445, 'l dash lt') + L(375, 58, 375, 445, 'l dash lt') + L(535, 58, 535, 445, 'l dash lt');
            s += R(195, 92, 10, 338) + R(370, 124, 10, 36) + R(530, 216, 10, 22);
            s += arrow(50, 98, 195, 98, 'fill') + T(60, 91, 'presenterCarte(id)', 'lbl');
            s += arrow(205, 130, 370, 130, A ? 'fill' : 'open') + T(215, 123, 'verifierAbonnement(id)', 'lbl');
            s += arrow(370, 156, 205, 156, 'open', !A) + T(360, 149, 'résultat', 'lbl', 'end');
            s += frm(20, 172, 560, 150, A ? 'opt' : 'alt') + T(30, 205, '[abonnement valide]', 'lbl');
            s += (A ? arrow(375, 222, 530, 222, 'fill') : arrow(205, 222, 530, 222, 'fill')) + T(455, 215, 'liberer()', 'lbl', 'middle');
            s += L(20, 252, 580, 252, 'l dash') + T(30, 270, '[else]', 'lbl');
            s += arrow(195, 292, 50, 292, 'open') + T(185, 285, '« abonnement expiré »', 'lbl', 'end');
            s += arrow(205, 345, 370, 345, A ? 'open' : 'fill') + T(215, 338, 'journaliser(op)', 'lbl');
            s += frm(20, 362, 560, 72, A ? 'loop(3)' : 'alt') + (A ? '' : T(72, 377, '[3 fois]', 'lbl'));
            s += selfMsg(205, 392, 'clignoter()');
            return s;
        },
        diffs: [
            { id: 1, zone: [330, 118, 45, 24], ans: 'A',
                ok: "La borne attend la réponse avant de continuer : c'est un appel synchrone, à pointe pleine.",
                bad: ["La pointe ouverte suffit : une réponse revient de toute façon juste en dessous.",
                            "La pointe pleine est réservée aux messages qu'on envoie à un acteur humain.",
                            "La forme de la pointe ne change rien : seul le pointillé distingue les messages."] },
            { id: 2, zone: [250, 146, 90, 20], ans: 'B',
                ok: "Un message de retour se dessine en pointillé, vers celui qui a appelé (pointe ouverte en général).",
                bad: ["Un retour se dessine en trait plein, comme l'appel, puisqu'il fait partie du même échange.",
                            "Le pointillé voudrait dire que la réponse peut ne jamais arriver : il faut un trait plein.",
                            "UML laisse choisir le trait du retour : plein ou pointillé, cela dépend de l'outil."] },
            { id: 3, zone: [20, 172, 46, 20], ans: 'B',
                ok: "Il y a deux cas, valide ou non, séparés par un pointillé : c'est un alt. Un opt n'a qu'un seul cas.",
                bad: ["opt convient puisque la libération du vélo est optionnelle : elle n'a lieu que si c'est valide.",
                            "alt sert à répéter un échange, et opt à choisir entre plusieurs cas qui s'excluent.",
                            "opt et alt sont synonymes ; alt est seulement l'ancienne abréviation, gardée par habitude."] },
            { id: 4, zone: [330, 333, 45, 24], ans: 'A',
                ok: "La borne n'attend pas de réponse : c'est un message asynchrone, pointe ouverte en trait plein.",
                bad: ["Il faut une pointe pleine : le serveur doit confirmer qu'il a bien reçu le journal.",
                            "Un message asynchrone se dessine en pointillé ; le trait plein est toujours synchrone.",
                            "Tout message envoyé à un serveur est synchrone, quelle que soit la règle de l'énoncé."] },
            { id: 5, zone: [295, 30, 160, 28], ans: 'both',
                ok: "« :ServeurCentral » est un objet anonyme, « central : ServeurCentral » un objet nommé. Les deux s'écrivent.",
                bad: ["Le nom avant les deux-points est obligatoire : « :ServeurCentral » n'est pas valide.",
                            "Le deux-points est réservé aux acteurs ; pour un objet, on écrit seulement le nom de la classe.",
                            "« central : ServeurCentral » désigne une classe, pas un objet : c'est interdit en séquence."] },
            { id: 6, zone: [200, 210, 330, 22], ans: 'B',
                ok: "La règle dit que c'est la borne qui commande le verrou : la flèche part de la ligne de vie de la borne.",
                bad: ["Le serveur vient de valider l'abonnement, c'est donc lui qui doit envoyer l'ordre au verrou.",
                            "Le point de départ d'une flèche ne compte pas : seul le message écrit dessus a un sens.",
                            "La flèche doit partir de l'usager, puisque c'est lui qui veut récupérer le vélo."] },
            { id: 7, zone: [20, 362, 46, 20], ans: 'A',
                ok: "L'écran clignote trois fois : c'est une répétition, donc un cadre loop, ici loop(3).",
                bad: ["alt est le cadre des répétitions ; loop sert aux cas qui s'excluent.",
                            "Un seul message ne peut pas aller dans un loop : il faudrait l'écrire trois fois.",
                            "Il faudrait un opt, puisque le clignotement n'a lieu que si la carte est valide."] }
        ]
    },

    {
        key: 'cas-utilisation', kind: "Diagramme de cas d'utilisation", title: 'Location de kayaks', vb: '0 0 600 420',
        rules: [
            'Le système étudié est le site de location de kayaks.',
            "Un client réserve un kayak. Toute réservation comprend obligatoirement le paiement d'un acompte.",
            "Pendant une réservation, le client peut, s'il le souhaite, ajouter une assurance.",
            "L'acompte est encaissé par la banque, un système externe.",
            'Un moniteur est un employé. Tout employé, moniteur compris, peut consulter le planning sur le site.',
            "Seul un moniteur peut annuler une sortie, par exemple à cause du vent."
        ],
        draw(A) {
            let s = R(140, 12, 320, A ? 323 : 400) + T(150, 30, 'Location de kayaks', 't tb');
            s += actor(60, 40, 'Client') + actor(60, 215, 'Moniteur') + actor(60, 320, 'Employé') + actor(540, 130, 'Banque');
            s += uc(300, 65, 85, 22, 'Réserver un kayak') + uc(225, 165, 78, 20, 'Ajouter une assurance');
            s += uc(385, 165, 66, 20, "Payer l'acompte") + uc(300, 265, 80, 20, 'Annuler une sortie') + uc(300, 375, 85, 20, 'Consulter le planning');
            s += (A ? arrow(325, 86, 370, 146, 'open', true) : arrow(370, 146, 325, 86, 'open', true)) + T(358, 112, '«include»', 'lbl');
            s += (A ? arrow(280, 86, 240, 146, 'open', true) : arrow(240, 146, 280, 86, 'open', true)) + T(248, 112, '«extend»', 'lbl', 'end');
            s += L(60, 280, 60, 320) + (A ? head('tri', 60, 320, 60, 280) : head('tri', 60, 280, 60, 320));
            s += A ? L(76, 62, 215, 65) : arrow(76, 62, 215, 65, 'open');
            s += A ? L(76, 240, 220, 263) : L(76, 335, 222, 268);
            s += L(76, 345, 215, 372);
            s += A ? L(528, 150, 385, 68) : L(528, 150, 451, 165);
            return s;
        },
        diffs: [
            { id: 1, zone: [320, 84, 82, 64], ans: 'A',
                ok: "Réserver comprend toujours le paiement : «include» part du cas de base et pointe vers Payer l'acompte.",
                bad: ["«include» pointe vers le cas principal, ici Réserver, puisque c'est lui qui est complété.",
                            "Le sens d'une flèche «include» est libre : seul le mot écrit dessus a de l'importance.",
                            "Payer l'acompte est facultatif, donc la flèche doit partir de lui, comme un «extend»."] },
            { id: 2, zone: [196, 84, 90, 64], ans: 'B',
                ok: "L'assurance est facultative : «extend» part du cas optionnel et pointe vers le cas qu'il complète.",
                bad: ["«extend» part du cas de base, Réserver, et pointe vers son extension, comme un héritage.",
                            "Pour un ajout facultatif, il faudrait «include» : c'est lui qui marque un ajout possible.",
                            "La flèche part de Réserver, car c'est pendant la réservation qu'on choisit l'assurance."] },
            { id: 3, zone: [212, 352, 176, 46], ans: 'B',
                ok: "Le planning se consulte sur le site : ce cas est dans le système, donc dans la frontière.",
                bad: ["Un cas qui ne modifie aucune donnée peut rester hors de la frontière : il ne fait que lire.",
                            "Les cas reliés à un acteur général comme Employé se placent toujours hors du système.",
                            "La frontière n'entoure que les cas qui ont un «include» ou un «extend»."] },
            { id: 4, zone: [44, 274, 32, 48], ans: 'A',
                ok: "Un moniteur est un employé : le triangle creux touche le parent, Employé, dont il hérite les cas.",
                bad: ["Le triangle touche Moniteur, car c'est lui qui reçoit les cas d'utilisation d'Employé.",
                            "Entre deux acteurs, on trace un «include» : le triangle est réservé aux classes.",
                            "Le triangle se met du côté de l'acteur le plus précis, pour montrer qu'il en sait plus."] },
            { id: 5, zone: [120, 52, 96, 22], ans: 'both',
                ok: "Un simple trait relie l'acteur à son cas ; une pointe vers le cas est tolérée. Les deux se valent.",
                bad: ["La pointe est obligatoire : sans elle, on ne sait pas qui déclenche le cas d'utilisation.",
                            "La pointe transforme le lien en «include» : seul le trait simple est correct ici.",
                            "Le trait simple veut dire que l'acteur subit le cas ; il faut une pointe pour qu'il le lance."] },
            { id: 6, zone: [176, 236, 50, 56], ans: 'A',
                ok: "Seul un moniteur annule : relié à Employé, le cas serait permis à tous les employés.",
                bad: ["Relier le cas à Employé suffit : le moniteur est un employé, il en hérite donc.",
                            "Un cas se relie toujours à l'acteur le plus général, pour ne pas répéter les liens.",
                            "N'importe quel acteur peut y être relié : ce diagramme ne dit pas qui a le droit de quoi."] },
            { id: 7, zone: [490, 128, 44, 44], ans: 'B',
                ok: "La banque encaisse l'acompte : c'est un acteur secondaire du cas Payer l'acompte, pas de Réserver.",
                bad: ["Un acteur externe se relie toujours au cas principal, jamais à un cas inclus.",
                            "La banque n'est pas une personne : elle ne devrait être reliée à aucun cas d'utilisation.",
                            "Le lien doit aller vers Réserver, puisque c'est la réservation qui déclenche le paiement."] }
        ]
    },

    {
        key: 'deploiement', kind: 'Diagramme de déploiement', title: 'Application de covoiturage', vb: '0 0 600 420',
        rules: [
            "L'appli mobile covoit.apk est installée sur le smartphone de chaque utilisateur.",
            "Le serveur d'application est une machine physique. Il fait tourner une JVM, dans laquelle on déploie le fichier api.jar.",
            'La base de données tourne dans PostgreSQL, sur une seconde machine.',
            "Les smartphones dialoguent avec le serveur d'application en HTTPS.",
            'Des milliers de smartphones se connectent au même serveur.',
            "L'API ouvre une connexion réseau vers la base, via JDBC."
        ],
        draw(A) {
            let s = node(10, 50, 170, 120, A ? '«device»' : '«executionEnvironment»', 'Smartphone') + artifact(25, 100, 140, 55, 'covoit.apk', !A);
            s += node(290, 50, 290, 180, '«device»', "Serveur d'application");
            s += node(310, 100, 250, 115, A ? '«device»' : '«executionEnvironment»', 'JVM');
            s += A ? artifact(325, 145, 220, 55, 'api.jar') : comp(325, 145, 220, 55, 'api.jar');
            s += node(290, 290, 290, 120, '«device»', 'Serveur BDD') + node(310, 340, 250, 60, '«executionEnvironment»', 'PostgreSQL');
            s += L(190, 110, 290, 110) + T(240, 102, A ? '«HTTP»' : '«HTTPS»', 'lbl', 'middle');
            s += T(196, 126, A ? '*' : '1', 'lbl') + T(284, 126, '1', 'lbl', 'end');
            s += (A ? arrow(435, 230, 435, 280, 'open', true) : L(435, 230, 435, 280)) + T(443, 260, '«JDBC»', 'lbl');
            return s;
        },
        diffs: [
            { id: 1, zone: [14, 52, 140, 18], ans: 'A',
                ok: "Le smartphone est un matériel physique : c'est un nœud «device».",
                bad: ["Un smartphone exécute des applis, c'est donc un «executionEnvironment».",
                            "«device» est réservé aux serveurs ; un appareil mobile n'en est pas un.",
                            "Le stéréotype d'un nœud est décoratif : on peut le choisir librement."] },
            { id: 2, zone: [314, 102, 150, 18], ans: 'B',
                ok: "La JVM est un logiciel qui exécute d'autres programmes : c'est un «executionEnvironment».",
                bad: ["La JVM tourne sur une machine, donc c'est un «device» imbriqué dans un autre «device».",
                            "Un nœud placé dans un autre nœud est forcément un «device» : c'est la règle d'imbrication.",
                            "«executionEnvironment» ne sert que pour Docker et les machines virtuelles complètes."] },
            { id: 3, zone: [325, 145, 220, 55], ans: 'A',
                ok: "On déploie un fichier concret, api.jar : dans un diagramme de déploiement, c'est un «artifact».",
                bad: ["Un .jar contient du code, donc il se dessine en «component» dans un diagramme de déploiement.",
                            "«artifact» est réservé aux fichiers de configuration ; un programme se dessine autrement.",
                            "Les deux dessins se valent : «component» et «artifact» désignent exactement la même chose."] },
            { id: 4, zone: [212, 92, 56, 16], ans: 'B',
                ok: "La règle impose HTTPS : le chemin de communication doit porter «HTTPS», pas «HTTP».",
                bad: ["HTTP et HTTPS sont le même protocole : le S n'a pas à figurer sur un diagramme.",
                            "Le chiffrement relève du code de l'appli : le diagramme indique seulement «HTTP».",
                            "On écrit toujours le protocole le plus bas, TCP, jamais HTTP ni HTTPS sur ce lien."] },
            { id: 5, zone: [190, 113, 20, 18], ans: 'A',
                ok: "Beaucoup de smartphones pour un seul serveur : on note * côté smartphone et 1 côté serveur.",
                bad: ["Chaque smartphone a son propre lien avec le serveur, donc 1 de chaque côté suffit.",
                            "Les multiplicités n'existent pas en déploiement : on ne les écrit qu'en diagramme de classes.",
                            "Le * se met côté serveur, puisque c'est le serveur qui reçoit toutes les connexions."] },
            { id: 6, zone: [138, 102, 28, 26], ans: 'both',
                ok: "L'icône de document et le mot «artifact» disent la même chose : l'un ou l'autre suffit.",
                bad: ["Sans l'icône de document, la boîte n'est plus un artefact mais un simple nœud.",
                            "L'icône est interdite quand «artifact» est déjà écrit : ce serait un doublon.",
                            "L'icône dit que le fichier est exécutable ; sans elle, c'est un fichier de données."] },
            { id: 7, zone: [425, 232, 64, 46], ans: 'B',
                ok: "Les deux machines échangent sur le réseau : c'est un chemin de communication, en trait plein.",
                bad: ["Une flèche en pointillé est obligatoire pour montrer qui ouvre la connexion vers la base.",
                            "Le pointillé marque une connexion chiffrée ; JDBC sans chiffrement s'écrit en trait plein.",
                            "Entre deux «device», UML impose une dépendance en pointillé plutôt qu'un simple trait."] }
        ]
    }
];

export default { domain: 'diagrammes', DIAG, NAMES, QUESTIONS, SHEETS };
