/* ===============================
   1. DATA GALERI STATIS
================================= */
const galleryData = [
    { type: 'img', src: 'img/Image_n.webp', title: 'Jalan-jalan', date: '12 Jan 2024', desc: 'Momen gabut saat matahari terbenam di kota sukabumi.' },
    { type: 'img', src: 'img/IMG-20230228-WA0006.webp', title: 'Hitam Putih', date: '28 Feb 2023', desc: 'Foto Ini Di Ambil Pada Saat Kita Berdua Sama-sama Beres Ngampus Waktu Itu, Kita Berdua Masih Semester 3. Dia Adalah Tipe Orang Yang Sangat Perhatian, Pengertian Dan Support Terbaik Buat Aku.' },
    { type: 'video', src: 'img/lv_7425462859796073736_20241018103007.mp4', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Sebuah Foto Dengan Tema Hitam Berlatar Abu-abu, Ku buatkan Menjadi Video Pendek Dengan Musik. Kita Berdua Emang Jarang Banget Untuk Foto Bersama Karena Aku Sangat Tidak Percaya Diri, Padahal Foto Adalah Kenangan Yang Menjadi Bukti Kebersamaan Itu Tercipta.' },
    { type: 'video', src: 'img/lv_7166658654740040962_20241018104707.mp4', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Foto Studio Dengan Jas Almamater Kampus Universitas Nusa Putra, Sukabumi.' },
    { type: 'img', src: 'img/4117 (9).webp', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Akhirnya Kita Berdua Foto Studio Dengan Jas Almamater Kampus Universitas Nusa Putra. Karena Ini adalah Momen Yang Kita Berdua Sudah Rencanakan Beberapa Bulan Lalu Akhirnya Terwujud Juga.' },
    { type: 'img', src: 'img/IMG-20230817-WA0036.webp', title: 'Momen 17 Agustus', date: '18 Agu 2023', desc: 'Aku Pakai Jas Almamater Sedangkan Dia Pakai PDH Lengkap Dari Organisai MENWA, Di Karenakan Dia dan Teman-teman Organisasinya Yang Bertugas Pada Saat Pelaksanaan Upcara 17 Agustus, Kalo Aku Hanya Sekedar Mengikuti Upacara Saja.' },
    { type: 'img', src: 'img/home_20230204.webp', title: 'Bumble Bee & Buterfly', date: '20 Nov 2023', desc: 'Kenapa? (Bumble Bee) Karena Aku Suka Dengan Tulisannya dan Filosfinya Bee/ Lebah Dan Nama Itu Di Sematkan Oleh Dia. Sedangkan Dia (Buterfly) Kenapa? Alasanya Karena Aku Anggap Dia Seperti Buterfly/ Kupu-kupu dan Ada Hal Lainya lagi Sehinggah Ku Sematkan Nama Itu Padanya.' },
    { type: 'video', src: 'img/lv_0_20231116012951.mp4', title: 'Happy Brithday', date: '21 Des 2023', desc: 'Special Day. ia pada hari itu dia ulang tahun yang ke-20 th dan aku sangat bersemangat hinggah kubuatkan deh video ucapan bahagiaku, walaupun sangat sederhana tapi syukurlah dia sangat suka.' },
    { type: 'video', src: 'img/lv_Aquarius_20241018_.mp4', title: 'AQUARIUS', date: '18 Okt 2024', desc: 'sering membayangkan sesuatu, kadang mereka membayangkan apa yang terjadi apa yang tidak bisa terjadi apa yang harus terjadi dan apa yang tidak boleh terjadi dan banyak lagi hal yang ada dikepala mereka.' },
    { type: 'img', src: 'img/IMG-20251009-WA0253.webp', title: 'Interenship Nasional', date: '10 Okt 2025', desc: 'SCP 1 Program Studi Teknik Informatika. Pelaksanaan Magang di PT Lambu Raya Utama - Jl. Nanas SP 2, Kab. Mimika, Papua Tengah. Aku Di Tempatkan Sebagai Web Devlopment dan Diberikan Tugas Untuk Membuat Website Company Profile Sederhana.' },
    { type: 'img', src: 'img/IMG-20260101-WA0050.webp', title: 'Interenship Internasional', date: '05 Jan 2026', desc: 'SCP 2 Program Studi Pendidikan Guru Sekolah Dasar. Pelaksanaan Magang di Sekolah Dasar - Malaisya. Dia di Tempatkan Sebagai Guru Ajar dan Diberikan Tugas Untuk Mengajar Anak-anak SD.' }
];


/* ===============================
   2. RENDER GALERI
================================= */
function renderGallery(filterType = 'all') {
    const container = document.getElementById('gallery-container');
    container.innerHTML = '';

    const filtered = filterType === 'all'
        ? galleryData
        : galleryData.filter(item => item.type === filterType);

    if (filtered.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; width:100%; opacity:0.5; padding:20px;">
                Tidak ada konten.
            </p>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.addEventListener('click', () => openLightbox(item.type, item.src));

        card.innerHTML = `
        <div class="media-wrapper">
            ${item.type === 'img' ? 
                `<img src="${item.src}" alt="${item.title}" loading="lazy">` : 
                `<video 
                    src="${item.src}" 
                    loop 
                    autoplay 
                    muted 
                    playsinline 
                    preload="metadata"
                    controlslist="nodownload noremoteplayback"
                    disablepictureinpicture>
                </video>`}
            <div class="date-badge">${item.date}</div>
        </div>
        <div class="info">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `;
        container.appendChild(card);
    });

    container.scrollLeft = 0;
}


/* ===============================
   3. FILTER MEDIA
================================= */
function filterMedia(type, event) {
    document.querySelectorAll('.filter-btn')
        .forEach(btn => btn.classList.remove('active'));

    if (event) event.target.classList.add('active');

    renderGallery(type);
}


/* ===============================
   DARK MODE SYSTEM (FULL)
================================= */

// Jalankan saat halaman selesai load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        const icon = document.getElementById("theme-icon");
        if (icon) icon.innerText = "light_mode";
    }
});

// Toggle Theme
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    if (themeIcon) {
        themeIcon.innerText = isDark ? "light_mode" : "dark_mode";
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
}


/* ===============================
   5. LIGHTBOX
================================= */
function openLightbox(type, src) {
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightbox-content');

    content.innerHTML = type === 'img'
        ? `<img src="${src}">`
        : `<video 
                src="${src}" 
                controls 
                autoplay 
                loop 
                playsinline>
           </video>`;

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-content').innerHTML = '';
    document.body.style.overflow = 'auto';
}


/* ===============================
   6. MOBILE MENU
================================= */
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}


/* ===============================
   7. SMART AUTOPLAY (Pause jika tab tidak aktif)
================================= */
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');

    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        videos.forEach(video => {
            if (video.hasAttribute('loop')) {
                video.play();
            }
        });
    }
});


/* ===============================
   8. INIT SAAT LOAD
================================= */
document.addEventListener('DOMContentLoaded', () => {
    renderGallery('all');

    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.innerText = 'light_mode';
    }
});

// Logic Duplikat Gambar Pada Logo Infinite Scroll //
window.addEventListener("load", () => {
  const grup = document.querySelector(".grup");
  const track = document.querySelector(".track");
    
  // clone berkali-kali biar panjang
  for (let i = 0; i < 2; i++) {
        track.appendChild(grup.cloneNode(true));
      }
    
  // ambil lebar asli 1 grup
  const width = grup.offsetWidth;
    
// set ke CSS variable
track.style.setProperty("--width", width + "px");
    
// atur durasi berdasarkan lebar
  const speed = 30;
  const duration = width / speed;
    
  track.style.animationDuration = duration + "s";
  });
        
// Auto Gett Full Year //
  document.getElementById("year").textContent = new Date().getFullYear();
