const portalVoices = [
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
    'turretVocals/who-are-you.mp3'
];

let lastPlayedIndex = -1;

export function playRandomPortalVoice() {
    let randomIndex;
    if (portalVoices.length > 1) {
        do {
            randomIndex = Math.floor(Math.random() * portalVoices.length);
        } while (randomIndex === lastPlayedIndex);
    } else {
        randomIndex = 0;
    }
    lastPlayedIndex = randomIndex;

    const audio = new Audio(portalVoices[randomIndex]);
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Erreur lecture audio:', err));
}
