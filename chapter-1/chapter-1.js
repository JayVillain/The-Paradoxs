// Ambil elemen-elemen dari HTML
const backgroundImage = document.getElementById('background-image');
const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');

// Definisikan cerita untuk Bab 1
const story = [
    {
        id: 'awal',
        background: '../images/backgrounds/rumah_gelap.png',
        character: null,
        name: 'Narator',
        dialogue: 'Zain tidak pernah percaya pada hal-hal supranatural, sihir, atau takdir. Namun, malam itu, semua keyakinan ilmiahnya runtuh, digantikan oleh sebuah kekosongan yang dingin dan hampa.',
        next: 'pulang'
    },
    {
        id: 'pulang',
        background: '../images/backgrounds/rumah_gelap.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Mungkin dia sedang ada pameran. Ya, dia pasti sedang ada pameran.',
        next: 'pencarian'
    },
    {
        id: 'pencarian',
        background: '../images/backgrounds/rumah_gelap.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Satu hari berganti, seminggu berlalu. Panggilan teleponnya tak terjawab. Kekhawatiran itu berubah menjadi kecemasan yang membakar. Zain harus mencarinya.',
        choices: [
            { text: 'Pergi ke galeri seni tempat Gracia memamerkan karyanya.', nextScene: 'galeri_pilihan' },
            { text: 'Mencoba menghubungi keluarga Gracia terlebih dahulu.', nextScene: 'keluarga_pilihan' }
        ]
    },
    {
        id: 'galeri_pilihan',
        background: '../images/backgrounds/galeri_seni.png',
        character: null,
        name: 'Narator',
        dialogue: 'Zain bergegas ke galeri seni. Ia menahan nada paniknya saat menyapa sang pemilik galeri.',
        next: 'dialog_pemilik_galeri'
    },
    {
        id: 'keluarga_pilihan',
        background: '../images/backgrounds/rumah_gelap.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain mencoba menelepon keluarga Gracia. Saat suara ayah Gracia menyambutnya, ia disambut dengan nada kebingungan.',
        next: 'dialog_pemilik_galeri' // Arahkan ke adegan yang sama setelah dialog ini
    },
    {
        id: 'dialog_pemilik_galeri',
        background: '../images/backgrounds/galeri_seni.png',
        character: null,
        name: 'Pemilik Galeri',
        dialogue: 'Saya rasa kamu salah orang, Zain. Saya kenal semua pelukis di sini, dan tidak ada yang namanya Gracia.',
        next: 'dialog_telepon'
    },
    {
        id: 'dialog_telepon',
        background: '../images/backgrounds/rumah_gelap.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Zain menolak percaya. Ia mencoba menelepon keluarga Gracia, namun disambut dengan kebingungan. Semua orang telah melupakan Gracia. Hanya ia satu-satunya yang mengingatnya.',
        next: 'temuan_jam'
    },
    {
        id: 'temuan_jam',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Ia kembali ke labnya, merasa hancur. Hingga matanya tertuju pada sebuah kotak kado kecil di mejanya. Di dalamnya, sebuah jam tangan sederhana.',
        next: 'teks_jam'
    },
    {
        id: 'teks_jam',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Narator',
        dialogue: 'Ia membalik jam tangan itu. Di baliknya, terukir kalimat yang ia kenali: "Kau tahu kenapa aku masih \'simpan\' kado ulang tahun darimu, bukan karena bagus, tapi karena isinya dulu adalah \'kamu\'."',
        next: 'akhir_bab1'
    },
    {
        id: 'akhir_bab1',
        background: '../images/backgrounds/lab_siang.png',
        character: '../images/characters/zain.png',
        name: 'Zain',
        dialogue: 'Itu dia! Kenangan itu. Aku ingat sekarang. Jam tangan ini adalah petunjuknya!',
        next: 'lanjut_bab2'
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
        if (scene.id === 'akhir_bab1') {
            nextButton.textContent = 'Lanjut ke Bab 2';
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
let currentScene = findScene('awal');
showScene(currentScene);

nextButton.addEventListener('click', () => {
    const nextSceneId = currentScene.next;
    if (nextSceneId === 'lanjut_bab2') {
        window.location.href = '../chapter-2/index.html';
    } else {
        currentScene = findScene(nextSceneId);
        showScene(currentScene);
    }
});