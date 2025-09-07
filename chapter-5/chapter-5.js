// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Bab 5
const story = [
    {
        id: 'awal_bab5',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Aku akan melakukannya, Adam. Kita akan mengaktifkan The Chronos.',
        next: 'pesan_masa_depan'
    },
    {
        id: 'pesan_masa_depan',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Tunggu, Profesor. Ada sebuah pesan terenkripsi lagi. Ini... dari diri Anda di masa depan.',
        next: 'isi_pesan'
    },
    {
        id: 'isi_pesan',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: '"Zain, jika kau mendengarkan ini, itu artinya kau berhasil. Jangan pernah menyentuh Gracia. Jangan."',
        next: 'alasan'
    },
    {
        id: 'alasan',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Pesan itu menjelaskan, ada musuh tersembunyi, para penjaga waktu, yang akan menghapus mereka berdua selamanya jika mereka saling bersentuhan di masa lalu. "Gracia tahu. Ia meninggalkan petunjuk."',
        next: 'akhir_bab5'
    },
    {
        id: 'akhir_bab5',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Aku tidak punya waktu. Aku harus segera bertindak!',
        next: 'lanjut_bab6'
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
    nextButton.style.display = 'block';
    if (scene.id === 'akhir_bab5') {
        nextButton.textContent = 'Lanjut ke Bab 6';
    }
}

// Event listener untuk tombol Lanjut
let currentScene = findScene('awal_bab5');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    const nextSceneId = currentScene.next;
    if (nextSceneId === 'lanjut_bab6') {
        window.location.href = '../chapter-6/index.html';
    } else {
        currentScene = findScene(nextSceneId);
        showScene(currentScene);
    }
});