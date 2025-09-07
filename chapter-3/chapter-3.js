// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Bab 3
const story = [
    {
        id: 'awal_bab3',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Profesor, ini luar biasa. Jam tangan ini... bukan jam tangan biasa. Ini adalah prototipe kuantum.',
        next: 'enkripsi'
    },
    {
        id: 'enkripsi',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Ada enkripsi di dalamnya. Dan ini bukan enkripsi biasa. Ini seolah-olah dikodekan oleh alam semesta itu sendiri.',
        next: 'pilihan_pemulihan'
    },
    {
        id: 'pilihan_pemulihan',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain_masadepan.png',
        name: 'Zain',
        dialogue: 'Bisakah kamu membukanya? Kita harus memulihkan datanya.',
        choices: [
            { text: 'Coba gunakan protokol pemulihan data lama.', nextScene: 'zain_menemukan' },
            { text: 'Coba dengan cara baru yang lebih cepat.', nextScene: 'zain_menemukan' }
        ]
    },
    {
        id: 'zain_menemukan',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain_masadepan.png', // ZAIN TUA
        name: 'Narator',
        dialogue: 'Saat Adam sibuk, Zain menemukan sebuah folder tersembunyi. Folder bernama "Proyek Chronos".',
        next: 'teori_disintegrasi'
    },
    {
        id: 'teori_disintegrasi',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain_masadepan.png', // ZAIN TUA
        name: 'Zain',
        dialogue: 'Ini adalah hipotesis yang saya tinggalkan karena terlalu gila untuk menjadi kenyataan. Teori disintegrasi waktu.',
        next: 'rekaman_video'
    },
    {
        id: 'rekaman_video',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png', // ZAIN MUDA
        name: 'Narator',
        dialogue: 'Adam memutar rekaman video. Terlihat Zain yang lebih muda, menjelaskan tentang mesin yang dibuatnya. Sebuah prototipe yang bisa memanipulasi waktu.',
        next: 'rekaman_terakhir'
    },
    {
        id: 'rekaman_terakhir',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/gracia.png',
        name: 'Narator',
        dialogue: 'Rekaman itu menunjukkan Zain muda berjalan ke belakang kamera, lalu Gracia mengulurkan tangannya untuk menyentuh mesin. Tepat sebelum tangannya menyentuh mesin, rekaman itu terputus.',
        next: 'akhir_bab3'
    },
    {
        id: 'akhir_bab3',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain_masadepan.png', // ZAIN TUA
        name: 'Zain',
        dialogue: 'Aku... aku pelakunya. Kesalahan fatal yang kuperbuat telah menghapus Gracia dari dunia.',
        next: 'lanjut_bab4'
    }
];

// Fungsi untuk menemukan adegan berdasarkan ID
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
        nextButton.textContent = 'Lanjut';
        if (scene.id === 'akhir_bab3') {
            nextButton.textContent = 'Lanjut ke Bab 4';
        }
    }
}

// Fungsi untuk menangani pilihan
function handleChoice(nextSceneId) {
    const nextScene = findScene(nextSceneId);
    if (nextScene) {
        currentScene = nextScene;
        showScene(currentScene);
    }
}

// Event listener untuk tombol Lanjut
let currentScene = findScene('awal_bab3');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    const nextSceneId = currentScene.next;
    if (nextSceneId === 'lanjut_bab4') {
        window.location.href = '../chapter-4/index.html';
    } else {
        currentScene = findScene(nextSceneId);
        showScene(currentScene);
    }
});