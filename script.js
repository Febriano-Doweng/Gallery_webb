/* ===============================
   1. DATA GALERI STATIS
================================= */
const galleryData = [
    { type: 'img', src: 'img/Image_n.png', title: 'Jalan-jalan', date: '12 Jan 2024', desc: 'Momen gabut saat matahari terbenam di kota sukabumi.' },
    { type: 'video', src: 'img/lv_7425462859796073736_20241018103007.mp4', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Foto studio dengan tema hitam.' },
    { type: 'video', src: 'img/lv_7166658654740040962_20241018104707.mp4', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Foto Studio Dengan Jas Almamater Kampus Universitas Nusa Putra, Sukabumi.' },
    { type: 'img', src: 'img/home_20230204.jpg', title: 'Waktu Itu', date: '20 Nov 2023', desc: 'Bumble Bee And Buterfly.' },
    { type: 'video', src: 'img/lv_Aquarius_20241018_.mp4', title: 'AQUARIUS', date: '18 Okt 2024', desc: 'sering membayangkan sesuatu, kadang mereka membayangkan apa yang terjadi apa yang tidak bisa terjadi apa yang harus terjadi dan apa yang tidak boleh terjadi dan banyak lagi hal yang ada dikepala mereka.' }
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