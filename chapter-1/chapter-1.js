// 1. Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// 2. Definisikan cerita untuk Bab 1
const story = [
    {
        id: 'awal',
        background: '../images/backgrounds/rumah_gelap.jpg',
        character: null,
        name: 'Narator',
        dialogue: 'Zain tidak pernah percaya pada hal-hal supranatural, sihir, atau takdir. Namun, malam itu, semua keyakinan ilmiahnya runtuh, digantikan oleh sebuah kekosongan yang dingin dan hampa.',
        next: 'lanjut_pulang'
    },
    {
        id: 'lanjut_pulang',
        background: '../images/backgrounds/rumah_gelap.jpg',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Mungkin dia sedang ada pameran. Ya, dia pasti sedang ada pameran.',
        next: 'galeri'
    },
    {
        id: 'galeri',
        background: '../images/backgrounds/galeri_seni.jpg',
        character: null,
        name: 'Narator',
        dialogue: 'Satu hari berganti, seminggu berlalu. Panggilan telepon Zain tak pernah terjawab. Ia bergegas ke galeri seni tempat Gracia biasa memamerkan karyanya.',
        next: 'dialog_pemilik_galeri'
    },
    {
        id: 'dialog_pemilik_galeri',
        background: '../images/backgrounds/galeri_seni.jpg',
        character: null, // Ganti dengan gambar karakter pemilik galeri jika ada
        name: 'Pemilik Galeri',
        dialogue: 'Saya rasa kamu salah orang, Zain. Saya kenal semua pelukis di sini, dan tidak ada yang namanya Gracia.',
        next: 'dialog_telepon'
    },
    {
        id: 'dialog_telepon',
        background: '../images/backgrounds/rumah_gelap.jpg',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain menolak percaya. Ia mencoba menelepon keluarga Gracia, namun disambut dengan kebingungan. Semua orang telah melupakan Gracia. Hanya ia satu-satunya yang mengingatnya.',
        next: 'temuan_jam'
    },
    {
        id: 'temuan_jam',
        background: '../images/backgrounds/lab_siang.jpg',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Ia kembali ke labnya, merasa hancur. Hingga matanya tertuju pada sebuah kotak kado kecil di mejanya. Di dalamnya, sebuah jam tangan sederhana.',
        next: 'teks_jam'
    },
    {
        id: 'teks_jam',
        background: '../images/backgrounds/lab_siang.jpg',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Ia membalik jam tangan itu. Di baliknya, terukir kalimat yang ia kenali: "Kau tahu kenapa aku masih \'simpan\' kado ulang tahun darimu, bukan karena bagus, tapi karena isinya dulu adalah \'kamu\'."',
        next: 'akhir_bab1'
    },
    {
        id: 'akhir_bab1',
        background: '../images/backgrounds/lab_siang.jpg',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Itu dia! Kenangan itu. Aku ingat sekarang. Jam tangan ini adalah petunjuknya!',
        next: 'lanjut_bab2' // Ini akan menjadi penanda untuk pindah ke bab 2
    }
];

// 3. Fungsi untuk menemukan adegan berdasarkan ID
function findScene(id) {
    return story.find(scene => scene.id === id);
}

// 4. Fungsi untuk menampilkan adegan
function showScene(scene) {
    // Atur gambar latar belakang
    backgroundImage.src = scene.background;

    // Atur gambar karakter, tampilkan jika ada, sembunyikan jika null
    if (scene.character) {
        characterImage.src = scene.character;
        characterImage.style.display = 'block';
    } else {
        characterImage.style.display = 'none';
    }

    // Atur nama dan dialog
    characterName.textContent = scene.name;
    dialogueText.textContent = scene.dialogue;

    // Sembunyikan pilihan dan tampilkan tombol Lanjut secara default
    choicesContainer.style.display = 'none';
    nextButton.style.display = 'block';

    // Jika ini adegan akhir bab, ubah teks tombol
    if (scene.id === 'akhir_bab1') {
        nextButton.textContent = 'Lanjut ke Bab 2';
    }
}

// 5. Tambahkan event listener untuk tombol Lanjut
let currentScene = findScene('awal');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    // Temukan adegan berikutnya
    const nextSceneId = currentScene.next;
    const nextScene = findScene(nextSceneId);

    if (nextSceneId === 'lanjut_bab2') {
        // Alihkan ke halaman bab 2
        window.location.href = '../chapter-2/index.html';
    } else if (nextScene) {
        currentScene = nextScene;
        showScene(currentScene);
    }
});