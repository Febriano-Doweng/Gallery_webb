/* ===============================
   1. DATA GALERI STATIS
================================= */
const galleryData = [
    { type: 'img', src: 'img/Image_n.png', title: 'Jalan-jalan', date: '12 Jan 2024', desc: 'Momen gabut saat matahari terbenam di kota sukabumi.' },
    { type: 'img', src: 'img/IMG-20230228-WA0006.jpg', title: 'Hitam Putih', date: '28 Feb 2023', desc: 'Foto Ini Di Ambil Pada Saat Kita Berdua Sama-sama Beres Ngampus Waktu Itu, Kita Berdua Masih Semester lll. Dia Adalah Tipe Orang Yang Sangat Perhatian, Pengertian Dan Support Terbaik Buata Aku.' },
    { type: 'video', src: 'img/lv_7425462859796073736_20241018103007.mp4', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Sebuah Foto Dengan Tema Hitam Berlatar Abu-abu, Kubuatkan Menjadi Video Pendek Dengan Musik. Kita Berdua Emang Jarang Banget Untuk Foto Bersama Karena Aku Sangat Tidak Percaya Diri, Padahal Foto Adalah Kenangan Yang Menjadi Bukti Kebersamaan Itu Tercipta.' },
    { type: 'video', src: 'img/lv_7166658654740040962_20241018104707.mp4', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Foto Studio Dengan Jas Almamater Kampus Universitas Nusa Putra, Sukabumi.' },
    { type: 'img', src: 'img/4117 (9).JPG', title: 'Aku & Dia', date: '15 Des 2023', desc: 'Akhirnya Kita Berdua Foto Studio Dengan Jas Almamater Kampus Universitas Nusa Putra. Karena Ini adalah Momen Yang Kita Berdua Sudah Rencanakan Beberapa Bulan Lalu Akhirnya Terwujud Juga.' },
    { type: 'img', src: 'img/IMG-20230817-WA0036.jpg', title: 'Momen 17 Agustus', date: '18 Agu 2023', desc: 'Aku Pakai Jas Almamater Sedangkan Dia Pakai PDH Lengkap Dari Organisai MENWA, Di Karenakan Dia dan Teman-teman Organisasinya Yang Bertugas Pada Saat Pelaksanaan Upcara 17 Agustus, Kalo Aku Hanya Sekedar Mengikuti Upacara Saja.' },
    { type: 'img', src: 'img/home_20230204.jpg', title: 'Bumble Bee & Buterfly', date: '20 Nov 2023', desc: 'Kenapa? (Bumble Bee) Karena Aku Suka Dengan Tulisannya dan Filosfinya Bee/ Lebah Dan Nama Itu Di Sematkan Oleh Dia. Sedangkan Dia (Buterfly) Kenapa? Alasanya Karena Aku Anggap Dia Seperti Buterfly/ Kupu-kupu dan Ada Hal Lainya lagi Sehinggah Ku Sematkan Nama Itu Padanya.' },
    { type: 'video', src: 'img/lv_0_20231116012951.mp4', title: 'Happy Brithday', date: '21 Des 2023', desc: 'Special Day. ia pada hari itu dia ulang tahun yang ke-20 th dan aku sangat bersemangat hinggah kubuatkan deh video ucapan bahagiaku, walaupun sangat sederhana tapi syukurlah dia sangat suka.' },
    { type: 'video', src: 'img/lv_Aquarius_20241018_.mp4', title: 'AQUARIUS', date: '18 Okt 2024', desc: 'sering membayangkan sesuatu, kadang mereka membayangkan apa yang terjadi apa yang tidak bisa terjadi apa yang harus terjadi dan apa yang tidak boleh terjadi dan banyak lagi hal yang ada dikepala mereka.' },
    { type: 'img', src: 'img/IMG-20251009-WA0253.jpg', title: 'Interenship Nasional', date: '10 Okt 2025', desc: 'SCP 1 Program Studi Teknik Informatika. Pelaksanaan Magang di PT. Lambu Raya Utama - Jl. Nanas SP ll, Kab. Mimika, Papua Tengah. Aku Di Tempatkan Sebagai Web Devlopment dan Diberikan Tugas Untuk Membuat Website Company Profile Sederhana.' },
    { type: 'img', src: 'img/IMG-20260101-WA0050.jpg', title: 'Interenship Internasional', date: '05 Jan 2026', desc: 'SCP 2 Program Studi Pendidikan Guru Sekolah Dasar. Pelaksanaan Magang di Sekolah Dasar - Malaisya. Dia di Tempatkan Sebagai Guru Ajar dan Diberikan Tugas Untuk Mengajar Anak-anak SD.' }
];

/* ===============================
   2. RENDER GALERI
================================= */

function renderGallery(filterType='all'){

const container=document.getElementById('gallery-container');
container.innerHTML='';

filteredGallery = filterType==='all'
? galleryData
: galleryData.filter(item=>item.type===filterType);

if(filteredGallery.length===0){
container.innerHTML=`<p style="text-align:center;width:100%;opacity:.5;padding:20px;">Tidak ada konten.</p>`;
return;
}

filteredGallery.forEach((item,index)=>{

const card=document.createElement('div');
card.className='media-card';

card.addEventListener('click',()=>{
currentIndex=index;
openLightbox(item.type,item.src);
});

card.innerHTML=`

<div class="media-wrapper">

${item.type==='img'

? `<img 
data-src="${item.src}" 
alt="${item.title}"
class="lazy blur"
>` 

: `<video 
data-src="${item.src}"
muted
loop
playsinline
preload="metadata">
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

lazyLoadMedia();
}

function lazyLoadMedia(){

const lazyItems=document.querySelectorAll('.lazy, video[data-src]');

const observer=new IntersectionObserver((entries,obs)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const el=entry.target;

if(el.tagName==='IMG'){

el.src=el.dataset.src;

el.onload=()=>{
el.classList.remove('blur');
};

}

if(el.tagName==='VIDEO'){

el.src=el.dataset.src;

}

obs.unobserve(el);

}

});

},{
rootMargin:"200px"
});

lazyItems.forEach(el=>observer.observe(el));

}


/* ===============================
   3. FILTER MEDIA
================================= */

function filterMedia(type,event){

    document.querySelectorAll('.filter-btn')
    .forEach(btn=>btn.classList.remove('active'));

    if(event) event.target.classList.add('active');

    renderGallery(type);
}


/* ===============================
   4. DARK MODE
================================= */

function toggleTheme(){

    const body=document.body;

    body.classList.toggle("dark-mode");

    const isDark=body.classList.contains("dark-mode");

    localStorage.setItem("theme",isDark?"dark":"light");
}


/* ===============================
   5. LIGHTBOX
================================= */

function openLightbox(type,src){

    const lightbox=document.getElementById('lightbox');
    const content=document.getElementById('lightbox-content');

    content.innerHTML = type==='img'

    ? `<img src="${src}">`

    : `<video src="${src}" controls autoplay playsinline></video>`;

    lightbox.classList.add('show');

    document.body.style.overflow='hidden';
}


function closeLightbox(){

    const lightbox=document.getElementById('lightbox');

    lightbox.classList.remove('show');

    document.getElementById('lightbox-content').innerHTML='';

    document.body.style.overflow='auto';
}


/* ESC untuk menutup lightbox */

document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape") closeLightbox();
});


/* ===============================
   6. MOBILE MENU
================================= */

function toggleMenu(){
    document.getElementById('navLinks').classList.toggle('active');
}


/* ===============================
   7. SMART AUTOPLAY
================================= */

document.addEventListener('visibilitychange',()=>{

    const videos=document.querySelectorAll('video');

    if(document.hidden){

        videos.forEach(v=>v.pause());

    }else{

        videos.forEach(v=>{
            if(v.hasAttribute('loop')) v.play();
        });

    }

});


/* ===============================
   8. INIT SAAT LOAD
================================= */

document.addEventListener('DOMContentLoaded',()=>{

    renderGallery('all');

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){
        document.body.classList.add("dark-mode");
    }

});
