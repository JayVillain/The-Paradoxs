// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Bab 4
const story = [
    {
        id: 'awal_bab4',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain_masadepan.png',
        name: 'Zain',
        dialogue: 'Inilah dia, The Chronos. Aku menyembunyikannya di sini setelah Gracia... setelah dia menghilang.',
        next: 'penemuan_log'
    },
    {
        id: 'penemuan_log',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Profesor, ini luar biasa. Tapi... ada data log yang tersembunyi. Sebuah peringatan: "Jangan kembali. Ia adalah penjaga waktu."',
        next: 'konsekuensi'
    },
    {
        id: 'konsekuensi',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/adam.png',
        name: 'Adam',
        dialogue: 'Jika Anda kembali dan berhasil, versi diri Anda yang sekarang harus lenyap. Semua yang Anda kenal akan hilang.',
        next: 'pilihan_utama'
    },
    {
        id: 'pilihan_utama',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain_masadepan.png',
        name: 'Zain',
        dialogue: 'Aku tahu. Tapi ini bukan tentang fisika. Ini tentang sebuah janji. Apa yang harus aku lakukan?',
        choices: [
            { text: 'Aku akan kembali dan menghentikan diriku sendiri.', nextScene: 'pilihan_kembali' },
            { text: 'Konsekuensinya terlalu besar. Aku harus menemukan cara lain.', nextScene: 'pilihan_menyerah' }
        ]
    },
    // Jalur Good Ending
    {
        id: 'pilihan_kembali',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain_masadepan.png',
        name: 'Zain',
        dialogue: 'Aku tidak peduli. Aku tidak bisa hidup di dunia ini, dunia yang hampa tanpa dirinya.',
        next: 'lanjut_bab5'
    },
    // Jalur Sad Ending
    {
        id: 'pilihan_menyerah',
        background: '../images/backgrounds/lab_chrono.png',
        character: '../images/characters/zain_masadepan.png',
        name: 'Zain',
        dialogue: 'Aku tidak sanggup. Aku tidak bisa mengambil risiko menghapus realitas. Gracia... maafkan aku.',
        next: 'sad_ending'
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
        
        // Atur teks tombol "Lanjut"
        if (scene.next === 'lanjut_bab5') {
            nextButton.textContent = 'Lanjut ke Bab 5';
        } else {
            nextButton.textContent = 'Lanjut';
        }
    }
}

// Fungsi untuk menangani pilihan pemain
function handleChoice(nextSceneId) {
    if (nextSceneId === 'sad_ending') {
        window.location.href = '../endings/sad-ending.html';
    } else {
        currentScene = findScene(nextSceneId);
        showScene(currentScene);
    }
}

// Event listener untuk tombol Lanjut
let currentScene = findScene('awal_bab4');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    // Periksa apakah adegan berikutnya adalah halaman lain
    if (currentScene.next === 'lanjut_bab5') {
        window.location.href = '../chapter-5/index.html';
    } else if (currentScene.next === 'sad_ending') {
        window.location.href = '../endings/sad-ending.html';
    } else {
        // Jika tidak, lanjutkan ke adegan berikutnya di dalam bab yang sama
        const nextScene = findScene(currentScene.next);
        if (nextScene) {
            currentScene = nextScene;
            showScene(currentScene);
        }
    }
});