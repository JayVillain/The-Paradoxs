// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Bab 6
const story = [
    {
        id: 'awal_bab6',
        background: '../images/backgrounds/koridor_kampus.jpg',
        character: '../images/characters/zain_muda.png',
        name: 'Narator',
        dialogue: 'Dalam sekejap mata, Zain berada di koridor universitas. Ia adalah hantu di masa lalunya sendiri. Ia melihat Gracia, dan dirinya yang lebih muda.',
        next: 'pilihan_terakhir'
    },
    {
        id: 'pilihan_terakhir',
        background: '../images/backgrounds/koridor_kampus.jpg',
        character: '../images/characters/zain_muda.png',
        name: 'Zain Muda',
        dialogue: 'Siapa kau?',
        choices: [
            { text: 'Berikan bukti (jam tangan).', nextScene: 'good_ending_path' },
            { text: 'Mencoba menjelaskan secara verbal.', nextScene: 'sad_ending_path' }
        ]
    },
    // Jalur Good Ending
    {
        id: 'good_ending_path',
        background: '../images/backgrounds/koridor_kampus.jpg',
        character: '../images/characters/gracia.png',
        name: 'Narator',
        dialogue: 'Zain muda berhasil diyakinkan dan menarik tangan Gracia. Mereka berdua berjalan keluar lab, tangan bergandengan. Misi selesai. Zain dari masa depan tersenyum.',
        next: 'redirect_good_ending'
    },
    // Jalur Sad Ending
    {
        id: 'sad_ending_path',
        background: '../images/backgrounds/koridor_kampus.jpg',
        character: '../images/characters/gracia.png',
        name: 'Narator',
        dialogue: 'Zain muda menolak percaya. Gracia menyentuh mesin, dan ia menghilang. Zain dari masa depan gagal. Ia terperangkap dalam kehampaan, sendirian selamanya.',
        next: 'redirect_sad_ending'
    }
];

// Fungsi untuk menemukan adegan
function findScene(id) {
    return story.find(scene => scene.id === id);
}

// Fungsi untuk menampilkan adegan
function showScene(scene) {
    backgroundImage.src = scene.background;
    if (scene.character) {
        characterImage.src = scene.character;
        characterImage.style.display = 'block';
    } else {
        characterImage.style.display = 'none';
    }
    characterName.textContent = scene.name;
    dialogueText.textContent = scene.dialogue;

    // Menampilkan tombol Pilihan atau tombol Lanjut
    if (scene.choices) {
        nextButton.style.display = 'none';
        choicesContainer.style.display = 'flex';
        choicesContainer.innerHTML = '';
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('choice-button');
            button.textContent = choice.text;
            button.addEventListener('click', () => handleChoice(choice.nextScene));
            choicesContainer.appendChild(button);
        });
    } else {
        nextButton.style.display = 'block';
        choicesContainer.style.display = 'none';
    }
}

// Fungsi untuk menangani pilihan pemain
function handleChoice(nextSceneId) {
    const nextScene = findScene(nextSceneId);
    if (nextSceneId === 'redirect_good_ending') {
        window.location.href = '../endings/good-ending.html';
    } else if (nextSceneId === 'redirect_sad_ending') {
        window.location.href = '../endings/sad-ending.html';
    } else if (nextScene) {
        currentScene = nextScene;
        showScene(currentScene);
    }
}

// Event listener untuk tombol Lanjut
let currentScene = findScene('awal_bab6');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    const nextScene = findScene(currentScene.next);
    if (nextScene && !nextScene.choices) {
        currentScene = nextScene;
        showScene(currentScene);
    }
});