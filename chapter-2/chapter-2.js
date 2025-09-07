// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Bab 2
const story = [
    {
        id: 'awal_bab2',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Jam tangan ini tidak mungkin satu-satunya petunjuk. Pasti ada sesuatu yang lain. Sesuatu yang pernah kuberikan padanya.',
        next: 'lanjut_lab'
    },
    {
        id: 'lanjut_lab',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain mencari di setiap sudut labnya. Berjam-jam ia membolak-balik jurnal, buku, dan laci-laci meja kerjanya. Hingga akhirnya ia menemukan sebuah kotak kayu kecil.',
        next: 'penemuan_kotak'
    },
    {
        id: 'penemuan_kotak',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Ini dia! Kotak yang ku berikan di hari ulang tahunnya. Di dalamnya, ada selembar kertas lusuh dan... liontin berbentuk atom.',
        next: 'teori_aneh'
    },
    {
        id: 'teori_aneh',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Kertas itu berisi coretan tentang sebuah teori yang ia anggap gila di masa lalu: **teori disintegrasi waktu**.',
        next: 'kedatangan_adam'
    },
    {
        id: 'kedatangan_adam',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Profesor? Ada apa? Anda terlihat tidak sehat. Apakah ada yang bisa saya bantu?',
        next: 'ajakan_kerjasama'
    },
    {
        id: 'ajakan_kerjasama',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Adam... Saya butuh bantuanmu. Saya butuh kamu memulihkan semua data yang berhubungan dengan Gracia. Semua yang ada di hard drive saya.',
        next: 'akhir_bab2'
    },
    {
        id: 'akhir_bab2',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Gracia? Nama yang asing. Saya tidak bisa menemukan apa pun di server Anda, Profesor. Ini seolah-olah data itu tidak pernah ada.',
        next: 'lanjut_bab3'
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
    if (scene.id === 'akhir_bab2') {
        nextButton.textContent = 'Lanjut ke Bab 3';
    }
}

nextButton.addEventListener('click', () => {
    const nextSceneId = currentScene.next;
    if (nextSceneId === 'lanjut_bab3') {
        window.location.href = '../chapter-3/index.html';
    } else {
        currentScene = findScene(nextSceneId);
        showScene(currentScene);
    }
});

showScene(currentScene);