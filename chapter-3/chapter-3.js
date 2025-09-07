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
        next: 'zain_menemukan'
    },
    {
        id: 'zain_menemukan',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Saat Adam sibuk, Zain menemukan sebuah folder tersembunyi. Folder bernama "Proyek Chronos".',
        next: 'teori_disintegrasi'
    },
    {
        id: 'teori_disintegrasi',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Ini adalah hipotesis yang saya tinggalkan karena terlalu gila untuk menjadi kenyataan. Teori disintegrasi waktu.',
        next: 'rekaman_video'
    },
    {
        id: 'rekaman_video',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain_muda.png',
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
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Aku... aku pelakunya. Kesalahan fatal yang kuperbuat telah menghapus Gracia dari dunia.',
        next: 'lanjut_bab4'
    }
];

// Fungsi utama untuk mengontrol alur cerita
let currentScene = story[0];

function findScene(id) {
    return story.find(scene => scene.id === id);
}

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
    choicesContainer.style.display = 'none';
    nextButton.style.display = 'block';
    if (scene.id === 'akhir_bab3') {
        nextButton.textContent = 'Lanjut ke Bab 4';
    }
}

nextButton.addEventListener('click', () => {
    const nextSceneId = currentScene.next;
    if (nextSceneId === 'lanjut_bab4') {
        window.location.href = '../chapter-4/index.html';
    } else {
        currentScene = findScene(nextSceneId);
        showScene(currentScene);
    }
});

showScene(currentScene);