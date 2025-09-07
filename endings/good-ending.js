// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Good Ending
const story = [
    {
        id: 'epilog_awal',
        background: '../images/backgrounds/rumah_siang.png',
        character: '../images/characters/gracia.png',
        name: 'Gracia',
        dialogue: 'Kau tidur, Profesor. Pasti mimpi buruk, ya?',
        next: 'lanjut_1'
    },
    {
        id: 'lanjut_1',
        background: '../images/backgrounds/rumah_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain menatap Gracia, air matanya menetes. Ia teringat akan semua perjuangannya di alur waktu yang lama, semua rasa sakit yang ia rasakan. Tapi, kini semua itu sirna.',
        next: 'lanjut_2'
    },
    {
        id: 'lanjut_2',
        background: '../images/backgrounds/rumah_siang.png',
        character: '../images/characters/gracia.png',
        name: 'Gracia',
        dialogue: 'Ada apa?',
        next: 'lanjut_3'
    },
    {
        id: 'lanjut_3',
        background: '../images/backgrounds/rumah_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Tidak ada apa-apa. Aku hanya... bahagia kau di sini.',
        next: 'pergi_ke_lab'
    },
    {
        id: 'pergi_ke_lab',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Gracia tertawa. Mereka berdua bangun dari tempat tidur dan pergi ke lab. The Chronos berada di sana, tertutup kain tebal, tak tersentuh.',
        next: 'temuan_jam_tangan'
    },
    {
        id: 'temuan_jam_tangan',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain melangkah ke mejanya. Sebuah jam tangan tergeletak. Ia membaliknya, dan di sana, terukir kalimat yang sama.',
        next: 'teks_ukiran'
    },
    {
        id: 'teks_ukiran',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/gracia.png',
        name: 'Gracia',
        dialogue: '"Kau tahu kenapa aku masih \'simpan\' kado ulang tahun darimu, bukan karena bagus, tapi karena isinya dulu adalah \'kamu\'."',
        next: 'akhir'
    },
    {
        id: 'akhir',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain menatap Gracia, lalu menatap jam tangan itu. Ia tahu, ia telah berhasil. Ia telah memperbaiki kesalahan di masa lalunya.',
        next: 'janji'
    },
    {
        id: 'janji',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Kali ini, aku tidak akan pernah membiarkanmu pergi. Aku akan menjagamu, dan juga menjaga janji yang dibuat oleh diriku di masa lalu.',
        next: 'tamat'
    },
    {
        id: 'tamat',
        background: '../images/backgrounds/lab_siang.png',
        character: null,
        name: 'Tamat',
        dialogue: 'Terima kasih telah bermain!',
        next: 'restart'
    }
];

// Fungsi untuk menemukan adegan
function findScene(id) {
    return story.find(scene => scene.id === id);
}

// Fungsi untuk menampilkan adegan
function showScene(scene) {
    if (scene.id === 'tamat') {
        document.getElementById('dialogue-box').innerHTML = `<p id="dialogue-text">${scene.dialogue}</p>`;
        document.getElementById('dialogue-box').style.textAlign = 'center';
        nextButton.style.display = 'block';
        nextButton.textContent = 'Main Lagi';
        nextButton.onclick = () => {
            window.location.href = '../index.html';
        };
        return;
    }

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
    choicesContainer.style.display = 'none';
}

// Event listener untuk tombol Lanjut
let currentScene = findScene('epilog_awal');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    const nextScene = findScene(currentScene.next);
    if (nextScene) {
        currentScene = nextScene;
        showScene(currentScene);
    }
});