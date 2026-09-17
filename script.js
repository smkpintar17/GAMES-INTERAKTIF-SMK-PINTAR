// DEFAULT WEB APP URL (Bisa diisi jika sudah deploy Apps Script)
let defaultScriptUrl = "https://script.google.com/macros/s/AKfycbyKfhrKQqSaVHMGc3D2v9Ag8owh1apSU4pTDMRZHP1-qzvPi7IU0QGvvOhvn_51_U5tVg/exec";

// STATE GAME
let currentUser = {
    noAbsen: '',
    nama: ''
};

let currentQuestionIndex = 0;
let userAnswersPG = {};
let userAnswersEssay = {};
let totalScorePG = 0;

// BANK SOAL
const questions = [
    // 35 SOAL PILIHAN GANDA (@2 Poin)
    {
        id: 1,
        type: "pg",
        question: " Perangkat lunak yang berfungsi untuk mengelola, menyimpan, dan mengambil data pada basis data dinamakan...",
        options: ["A. DBMS", "B. IDE", "C. Operating System", "D. Browser", "E. Compiler"],
        answer: "A"
    },
    {
        id: 2,
        type: "pg",
        question: "Perintah SQL yang digunakan untuk membuat struktur tabel baru pada basis data adalah...",
        options: ["A. INSERT INTO", "B. CREATE TABLE", "C. UPDATE TABLE", "D. ALTER TABLE", "E. DROP TABLE"],
        answer: "B"
    },
    {
        id: 3,
        type: "pg",
        question: "Untuk menambahkan baris data baru ke dalam tabel siswa, perintah DML yang tepat adalah...",
        options: ["A. ADD TO siswa", "B. UPDATE siswa SET", "C. INSERT INTO siswa", "D. CREATE RECORD siswa", "E. SELECT INTO siswa"],
        answer: "C"
    },
    {
        id: 4,
        type: "pg",
        question: "Atribut yang bernilai unik dan berfungsi sebagai pembeda utama antar baris data dalam satu tabel dinamakan...",
        options: ["A. Foreign Key", "B. Secondary Key", "C. Candidate Key", "D. Primary Key", "E. Super Key"],
        answer: "D"
    },
    {
        id: 5,
        type: "pg",
        question: "Perintah SQL yang digunakan untuk memperbarui data alamat siswa yang sudah ada di tabel adalah...",
        options: ["A. CHANGE", "B. MODIFY", "C. EDIT", "D. REPLACE", "E. UPDATE"],
        answer: "E"
    },
    {
        id: 6,
        type: "pg",
        question: "Perintah SQL yang tepat untuk menampilkan data siswa yang memiliki nilai lebih dari 80 adalah...",
        options: [
            "A. SELECT * FROM siswa HAVING nilai > 80;",
            "B. SELECT * FROM siswa WHERE nilai > 80;",
            "C. SELECT * FROM siswa GROUP BY nilai > 80;",
            "D. SELECT * FROM siswa ORDER BY nilai > 80;",
            "E. SELECT * FROM siswa FILTER nilai > 80;"
        ],
        answer: "B"
    },
    {
        id: 7,
        type: "pg",
        question: "Kolom pada suatu tabel yang merujuk pada Primary Key di tabel lain untuk membentuk relasi dinamakan...",
        options: ["A. Composite Key", "B. Primary Key", "C. Foreign Key", "D. Alternate Key", "E. Unique Key"],
        answer: "C"
    },
    {
        id: 8,
        type: "pg",
        question: "Untuk mengurutkan hasil query berdasarkan kolom nama dari Z ke A (terbesar ke terkecil), klausa yang digunakan adalah...",
        options: [
            "A. ORDER BY nama ASC",
            "B. GROUP BY nama DESC",
            "C. ORDER BY nama DESC",
            "D. SORT BY nama DESC",
            "E. ALIGN BY nama DESC"
        ],
        answer: "C"
    },
    {
        id: 9,
        type: "pg",
        question: "Perintah yang digunakan untuk menghapus seluruh tabel beserta strukturnya secara permanen dari basis data adalah...",
        options: ["A. DELETE TABLE", "B. REMOVE TABLE", "C. CLEAR TABLE", "D. DROP TABLE", "E. TRUNCATE TABLE"],
        answer: "D"
    },
    {
        id: 10,
        type: "pg",
        question: "Pada pemodelan ERD (Entity Relationship Diagram), simbol persegi panjang digunakan untuk menggambarkan...",
        options: ["A. Atribut", "B. Entitas", "C. Relasi", "D. Garis Penghubung", "E. Kunci Utama"],
        answer: "B"
    },
    {
        id: 11,
        type: "pg",
        question: "Lapisan pada model OSI Layer yang bertanggung jawab untuk pengalamatan logis (IP Address) dan penentuan rute (routing) data adalah...",
        options: ["A. Application Layer", "B. Transport Layer", "C. Network Layer", "D. Data Link Layer", "E. Physical Layer"],
        answer: "C"
    },
    {
        id: 12,
        type: "pg",
        question: "Sebuah komputer memiliki alamat IP 192.168.1.15 dengan Subnet Mask 255.255.255.0. Network ID dari alamat IP tersebut adalah...",
        options: ["A. 192.168.1.0", "B. 192.168.1.255", "C. 192.168.0.0", "D. 192.168.1.15", "E. 192.168.1.1"],
        answer: "A"
    },
    {
        id: 13,
        type: "pg",
        question: "Perangkat jaringan yang berfungsi untuk menghubungkan dua atau lebih jaringan yang memiliki segmentasi/subnet berbeda adalah...",
        options: ["A. Switch", "B. Hub", "C. Repeater", "D. Router", "E. Access Point"],
        answer: "D"
    },
    {
        id: 14,
        type: "pg",
        question: "Perintah pada Command Prompt (CMD) yang digunakan untuk menguji hubungan/konektivitas antarkomputer melalui protokol ICMP adalah...",
        options: ["A. ipconfig", "B. ping", "C. nslookup", "D. tracert", "E. netstat"],
        answer: "B"
    },
    {
        id: 15,
        type: "pg",
        question: "Layanan pada jaringan komputer yang berfungsi untuk memberikan alamat IP secara otomatis kepada komputer client dinamakan...",
        options: ["A. DNS", "B. FTP", "C. DHCP", "D. HTTP", "E. SMTP"],
        answer: "C"
    },
    {
        id: 16,
        type: "pg",
        question: "Tag HTML yang tepat untuk mendefinisikan heading atau judul tingkat tertinggi (paling utama) pada halaman web adalah...",
        options: ["A. <head>", "B. <h6>", "C. <h1>", "D. <header>", "E. <title>"],
        answer: "C"
    },
    {
        id: 17,
        type: "pg",
        question: "Tag yang digunakan untuk membuat kolom isian teks satu baris pada formulir HTML adalah...",
        options: [
            'A. <input type="text">',
            'B. <textarea>',
            'C. <input type="checkbox">',
            'D. <form text>',
            'E. <input type="button">'
        ],
        answer: "A"
    },
    {
        id: 18,
        type: "pg",
        question: "Karakter yang digunakan dalam CSS untuk memanggil atau menyeleksi elemen HTML berdasarkan id adalah...",
        options: ["A. Tanda titik (.)", "B. Tanda pagar (#)", "C. Tanda bintang (*)", "D. Tanda amprik (@)", "E. Tanda seru (!)"],
        answer: "B"
    },
    {
        id: 19,
        type: "pg",
        question: "Properti CSS yang digunakan untuk mengubah warna latar belakang sebuah elemen HTML adalah...",
        options: ["A. color", "B. background-color", "C. text-color", "D. bgcolor", "E. border-color"],
        answer: "B"
    },
    {
        id: 20,
        type: "pg",
        question: "Manakah di antara pilihan berikut yang merupakan metode yang sah dan benar untuk menyisipkan atau menghubungkan aturan CSS ke dalam dokumen HTML?",
        options: [
            'A. Inline CSS (menggunakan atribut style="" langsung)',
            'B. Internal CSS (menggunakan tag <style> di <head>)',
            'C. External CSS (menggunakan tag <link rel="stylesheet">)',
            'D. Mengimpor file CSS eksternal menggunakan @import',
            'E. Semua jawaban A, B, C, dan D benar'
        ],
        answer: "E"
    },
    {
        id: 21,
        type: "pg",
        question: "Properti CSS yang digunakan untuk mengatur jarak antara konten elemen dengan border (batas dalam elemen) dinamakan...",
        options: ["A. margin", "B. padding", "C. spacing", "D. border-width", "E. gap"],
        answer: "B"
    },
    {
        id: 22,
        type: "pg",
        question: "Perintah dalam JavaScript yang digunakan untuk menampilkan kotak dialog pesan peringatan (pop-up) kepada pengguna adalah...",
        options: ["A. console.log()", "B. document.write()", "C. alert()", "D. print()", "E. prompt()"],
        answer: "C"
    },
    {
        id: 23,
        type: "pg",
        question: "Fungsi dasar dalam pemrograman Arduino yang digunakan untuk membaca sinyal bernilai kontinu (rentang nilai 0–1023) dari sensor seperti potensiometer atau LDR adalah...",
        options: ["A. digitalRead()", "B. analogRead()", "C. digitalWrite()", "D. analogWrite()", "E. pinMode()"],
        answer: "B"
    },
    {
        id: 24,
        type: "pg",
        question: "Pada pemrograman robotik menggunakan driver motor L298N, untuk membuat motor DC berputar searah jarum jam (Forward), kombinasi status logika pin kontrol yang benar adalah...",
        options: [
            "A. IN1 = LOW, IN2 = LOW",
            "B. IN1 = HIGH, IN2 = HIGH",
            "C. IN1 = HIGH, IN2 = LOW",
            "D. IN1 = LOW, IN2 = HIGH dan EN = 0",
            "E. IN1 = PWM, IN2 = PWM"
        ],
        answer: "C"
    },
    {
        id: 25,
        type: "pg",
        question: "Sebuah robot obstacle avoider menggunakan sensor ultrasonik HC-SR04. Diinginkan logika: jika jarak ke halangan kurang dari 20 cm, robot akan berhenti dan berbelok; jika tidak, robot terus maju. Potongan logika program C++ yang tepat adalah...",
        options: [
            "A. if (jarak > 20) { maju(); } else { belok(); }",
            "B. if (jarak < 20) { belok(); } else { maju(); }",
            "C. while (jarak == 20) { maju(); }",
            "D. if (jarak == 20) { berhenti(); }",
            "E. for (int i=0; i<20; i++) { belok(); }"
        ],
        answer: "B"
    },
    {
        id: 26,
        type: "pg",
        question: "Setelah melakukan commit pada repositori lokal, perintah Git yang digunakan untuk mengunggah atau mengirim perubahan kode tersebut ke repositori remote di GitHub adalah...",
        options: ["A. git pull origin main", "B. git clone origin main", "C. git push origin main", "D. git add origin main", "E. git checkout main"],
        answer: "C"
    },
    {
        id: 27,
        type: "pg",
        question: "Salah satu keunggulan utama menghubungkan repositori GitHub ke platform hosting Vercel adalah adanya fitur Automated Deployment, yang artinya...",
        options: [
            "A. Vercel akan otomatis mengubah kode HTML menjadi file APK",
            "B. Vercel akan memperbarui deployment web secara otomatis setiap kali ada perubahaan kode (push) di GitHub",
            "C. Vercel akan menghapus repositori GitHub jika terjadi error",
            "D. Vercel otomatis memperbaiki kesalahan sintaks pada kode JavaScript",
            "E. Vercel secara otomatis membuatkan domain .com gratis"
        ],
        answer: "B"
    },
    {
        id: 28,
        type: "pg",
        question: "Framework open-source seperti Capacitor atau Cordova digunakan dalam pengembangan aplikasi mobile bertugas untuk...",
        options: [
            "A. Meng-host file HTML di server lokal secara gratis",
            "B. Membungkus (wrap) kode aplikasi web (HTML, CSS, JS) menjadi file installer aplikasi Android (.APK)",
            "C. Mengonversi kode JavaScript menjadi bahasa pemrograman Python",
            "D. Menghubungkan database MySQL langsung ke HP tanpa API",
            "E. Mengompres ukuran gambar pada web secara otomatis"
        ],
        answer: "B"
    },
    {
        id: 29,
        type: "pg",
        question: "Urutan alur kerja (workflow) yang benar untuk mengembangkan aplikasi web, melakukan publikasi ke internet, dan menjadikannya aplikasi Android adalah...",
        options: [
            "A. Build APK -> Simpan di GitHub -> Deploy ke Vercel",
            "B. Deploy ke Vercel -> Push ke GitHub -> Konversi WebView",
            "C. Push kode ke GitHub -> Deploy ke Vercel -> Bungkus URL Vercel ke WebView/Capacitor -> Build APK",
            "D. Build APK -> Deploy ke Vercel -> Clone ke GitHub",
            "E. Install Capacitor -> Push ke GitHub -> Deploy ke Vercel"
        ],
        answer: "C"
    },
    {
        id: 30,
        type: "pg",
        question: "Komponen pada sistem operasi Android yang berfungsi untuk menampilkan dan menjalankan halaman web di dalam aplikasi Android tanpa perlu membuka browser eksternal dinamakan...",
        options: ["A. WebServer", "B. WebService", "C. WebView", "D. WebSocket", "E. WebContainer"],
        answer: "C"
    },
    {
        id: 31,
        type: "pg",
        question: "Komponen perakitan PC yang berfungsi untuk mengonversi arus listrik AC dari stopkontak menjadi arus DC dan mendistribusikannya ke seluruh komponen adalah...",
        options: ["A. Motherboard", "B. Processor", "C. Power Supply (PSU)", "D. Heatsink Fan", "E. Graphic Card"],
        answer: "C"
    },
    {
        id: 32,
        type: "pg",
        question: "Saat merakit PC, komponen elektronik seperti RAM dan CPU sangat rentan terhadap kerusakan akibat Electrostatic Discharge (ESD). Alat K3 yang wajib digunakan pada pergelangan tangan perakit adalah...",
        options: [
            "A. Gelang anti-statis (Anti-static wrist strap)",
            "B. Sarung tangan kulit",
            "C. Gelang karet biasa",
            "D. Thermal paste",
            "E. Obeng magnetis"
        ],
        answer: "A"
    },
    {
        id: 33,
        type: "pg",
        question: "Saat memilih prosesor dan motherboard untuk merakit PC, hal utama yang harus dipastikan agar prosesor dapat terpasang dengan pas secara fisik adalah kesesuaian...",
        options: [
            "A. Ukuran form factor casing",
            "B. Tipe soket CPU (Socket Type)",
            "C. Kapasitas Watt PSU",
            "D. Versi BIOS saja",
            "E. Jumlah slot RAM"
        ],
        answer: "B"
    },
    {
        id: 34,
        type: "pg",
        question: "Jenis media penyimpanan data modern yang tidak menggunakan piringan cakram berputar sehingga memiliki kecepatan read/write jauh lebih cepat dari HDD adalah...",
        options: ["A. Floppy Disk", "B. SSD (Solid State Drive)", "C. CD-ROM", "D. RAM", "E. Optical Drive"],
        answer: "B"
    },
    {
        id: 35,
        type: "pg",
        question: "Setelah selesai merakit PC dan menekan tombol power, kipas menyala namun layar monitor tetap black screen (blank) disertai bunyi beep berulang kali. Langkah awal troubleshooting hardware yang paling tepat dilakukan adalah...",
        options: [
            "A. Mengganti power supply dengan kapasitas lebih besar",
            "B. Memeriksa dan membersihkan/memasang ulang modul RAM pada slotnya",
            "C. Menginstal ulang sistem operasi Windows",
            "D. Membongkar total kipas pendingin CPU",
            "E. Mengganti kabel monitor dengan yang baru"
        ],
        answer: "B"
    },

    // 2 SOAL ESAI (@15 Poin)
    {
        id: 36,
        type: "essay",
        question: "SOAL ESAI 1:\nSebuah toko online fashion ingin memperbarui sistem basis data mereka. Saat ini transaksi dicatat dalam satu tabel besar (ID_Transaksi, Nama_Pelanggan, Alamat, Nama_Barang, Harga_Barang, Jumlah, Total_Harga).\n\nPertanyaan:\na. Jelaskan mengapa struktur tabel tunggal di atas buruk (redundansi & anomali)!\nb. Lakukan normalisasi 3NF (tentukan tabel, Primary Key, Foreign Key)!\nc. Tuliskan perintah SQL DDL untuk salah satu tabel hasil normalisasi!"
    },
    {
        id: 37,
        type: "essay",
        question: "SOAL ESAI 2:\nDalam pembangunan aplikasi web modern, pemisahan peran antara Front-End (Client-Side) dan Back-End (Server-Side) sangat krusial.\n\nPertanyaan:\na. Jelaskan perbedaan peran dan cara kerja HTML/CSS/JS (Client-Side) vs PHP/Node.js (Server-Side)!\nb. Berikan contoh skenario fitur pemrosesan di Server-Side demi alasan keamanan beserta alasannya!"
    }
];

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-login').addEventListener('submit', handleLogin);
});

function handleLogin(e) {
    e.preventDefault();
    
    const noAbsen = document.getElementById('no-absen').value.trim();
    const nama = document.getElementById('nama-lengkap').value.trim();
    const customUrl = document.getElementById('script-url').value.trim();

    if (!noAbsen || !nama) {
        alert("Silakan isi nomor absen dan nama lengkap!");
        return;
    }

    currentUser.noAbsen = noAbsen;
    currentUser.nama = nama;

    if (customUrl) {
        defaultScriptUrl = customUrl;
    }

    // Switch Screen
    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('screen-quiz').classList.remove('hidden');

    document.getElementById('display-user-info').innerText = `Absen ${currentUser.noAbsen} | ${currentUser.nama}`;
    
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const totalQ = questions.length;

    // Update Progress Bar
    const progressPct = ((currentQuestionIndex + 1) / totalQ) * 100;
    document.getElementById('progress-fill').style.width = `${progressPct}%`;
    document.getElementById('progress-text').innerText = `Soal ${currentQuestionIndex + 1} dari ${totalQ}`;

    // Update Question Content
    document.getElementById('question-type').innerText = q.type === 'pg' ? 'Pilihan Ganda (2 Poin)' : 'Soal Esai (15 Poin)';
    document.getElementById('question-text').innerText = q.question;

    const optionsBox = document.getElementById('options-container');
    const essayBox = document.getElementById('essay-container');

    if (q.type === 'pg') {
        optionsBox.classList.remove('hidden');
        essayBox.classList.add('hidden');

        optionsBox.innerHTML = '';
        q.options.forEach(opt => {
            const char = opt.charAt(0); // A, B, C, D, E
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;

            if (userAnswersPG[q.id] === char) {
                btn.classList.add('selected');
            }

            btn.onclick = () => selectPGAnswer(q.id, char, btn);
            optionsBox.appendChild(btn);
        });
    } else {
        optionsBox.classList.add('hidden');
        essayBox.classList.remove('hidden');

        const essayInput = document.getElementById('essay-answer');
        essayInput.value = userAnswersEssay[q.id] || '';
        essayInput.oninput = (e) => {
            userAnswersEssay[q.id] = e.target.value;
        };
    }

    // Nav Buttons
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');

    if (currentQuestionIndex === totalQ - 1) {
        btnNext.classList.add('hidden');
        btnSubmit.classList.remove('hidden');
    } else {
        btnNext.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
    }
}

function selectPGAnswer(qId, choice, elem) {
    userAnswersPG[qId] = choice;

    // Highlight active option
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.classList.remove('selected'));
    elem.classList.add('selected');

    // Calculate score dynamically
    calculatePGScore();
}

function calculatePGScore() {
    totalScorePG = 0;
    questions.forEach(q => {
        if (q.type === 'pg' && userAnswersPG[q.id] === q.answer) {
            totalScorePG += 2;
        }
    });
    document.getElementById('current-score').innerText = totalScorePG;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function submitQuiz() {
    if (confirm("Apakah Anda yakin ingin menyelesaikan dan mengirimkan kuis ini?")) {
        calculatePGScore();

        // Switch to Result Screen
        document.getElementById('screen-quiz').classList.add('hidden');
        document.getElementById('screen-result').classList.remove('hidden');

        document.getElementById('final-pg-score').innerText = totalScorePG;

        // Trigger Confetti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Send Data to Google Sheets
        sendDataToGoogleSheets();
    }
}

function sendDataToGoogleSheets() {
    const syncStatus = document.getElementById('sync-status');

    if (!defaultScriptUrl || defaultScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) {
        syncStatus.className = "alert alert-info";
        syncStatus.innerHTML = "ℹ️ Mode Demo (Tanpa Web App URL Apps Script). Menampilkan simulasi leaderboard local.";
        renderSimulatedLeaderboard();
        return;
    }

    const payload = {
        action: 'submitQuiz',
        noAbsen: currentUser.noAbsen,
        nama: currentUser.nama,
        nilaiPG: totalScorePG,
        essay1: userAnswersEssay[36] || '',
        essay2: userAnswersEssay[37] || ''
    };

    fetch(defaultScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Avoid CORS issues with Apps Script
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        syncStatus.className = "alert alert-success";
        syncStatus.innerHTML = "✅ Data nilai & jawaban esai berhasil tersimpan di Google Sheets Dashboard!";
        fetchLeaderboardData();
    })
    .catch(err => {
        console.error(err);
        syncStatus.className = "alert alert-info";
        syncStatus.innerHTML = "⚠️ Gagal terhubung ke Google Sheets API. Menampilkan papan peringkat simulasi.";
        renderSimulatedLeaderboard();
    });
}

function fetchLeaderboardData() {
    if (!defaultScriptUrl || defaultScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) return;

    fetch(`${defaultScriptUrl}?action=getLeaderboard`)
    .then(res => res.json())
    .then(data => {
        if (data && data.length > 0) {
            renderLeaderboardTable(data);
        } else {
            renderSimulatedLeaderboard();
        }
    })
    .catch(() => {
        renderSimulatedLeaderboard();
    });
}

function renderSimulatedLeaderboard() {
    const mockData = [
        { noAbsen: currentUser.noAbsen, nama: currentUser.nama + " (Anda)", nilaiPG: totalScorePG, timestamp: "Baru saja" },
        { noAbsen: "04", nama: "Bambang Wisata Banyuwangi", nilaiPG: 70, timestamp: "10:15" },
        { noAbsen: "12", nama: "Siti Kawah Ijen", nilaiPG: 68, timestamp: "10:20" },
        { noAbsen: "08", nama: "Dewi Pulau Merah", nilaiPG: 64, timestamp: "10:05" },
        { noAbsen: "19", nama: "Rahmat Baluran", nilaiPG: 60, timestamp: "09:45" }
    ];

    // Sort by Nilai PG Descending
    mockData.sort((a, b) => b.nilaiPG - a.nilaiPG);

    renderLeaderboardTable(mockData);
}

function renderLeaderboardTable(data) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';

    data.forEach((row, idx) => {
        const tr = document.createElement('tr');
        
        let rankBadge = `${idx + 1}`;
        if (idx === 0) rankBadge = "🥇 1st";
        else if (idx === 1) rankBadge = "🥈 2nd";
        else if (idx === 2) rankBadge = "🥉 3rd";

        tr.innerHTML = `
            <td>${rankBadge}</td>
            <td>${row.noAbsen}</td>
            <td>${row.nama}</td>
            <td><strong>${row.nilaiPG}</strong> / 70</td>
            <td>${row.timestamp || '-'}</td>
        `;

        tbody.appendChild(tr);
    });
}
