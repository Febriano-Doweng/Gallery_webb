/* ===============================
   1. GLOBAL SELECTOR
================================= */
const body = document.body;
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("theme-toggle");
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");

/* ===============================
   2. FILTER MEDIA
================================= */
function filterMedia(type = "all", event = null) {
    const items = document.querySelectorAll(".media-card");
    const buttons = document.querySelectorAll(".filter-btn");

    // reset active button
    buttons.forEach(btn => btn.classList.remove("active"));

    if (event && event.target) {
        event.target.classList.add("active");
    }

    items.forEach(item => {
        const itemType = item.getAttribute("data-type");

        if (type === "all" || itemType === type) {
            item.style.display = "block";
            item.style.opacity = "1";
        } else {
            item.style.display = "none";
        }
    });
}

/* ===============================
   3. LIGHTBOX SYSTEM
================================= */
function openLightbox(type, src) {
    if (!lightbox || !lightboxContent) return;

    let contentHTML = "";

    if (type === "img") {
        contentHTML = `<img src="${src}" alt="preview">`;
    } else if (type === "video") {
        contentHTML = `
            <video 
                src="${src}" 
                controls 
                autoplay 
                loop 
                playsinline>
            </video>`;
    }

    lightboxContent.innerHTML = contentHTML;
    lightbox.style.display = "flex";
    body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lightbox || !lightboxContent) return;

    lightbox.style.display = "none";
    lightboxContent.innerHTML = "";
    body.style.overflow = "auto";
}

// Klik luar untuk close
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

/* ===============================
   4. DARK MODE SYSTEM
================================= */
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}

function toggleTheme() {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Event toggle
if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}

/* ===============================
   5. MOBILE MENU
================================= */
function toggleMenu() {
    if (!navLinks) return;
    navLinks.classList.toggle("active");
}

/* ===============================
   6. SMART VIDEO CONTROL
   (Pause saat tab tidak aktif)
================================= */
document.addEventListener("visibilitychange", () => {
    const videos = document.querySelectorAll("video");

    if (document.hidden) {
        videos.forEach(video => {
            if (!video.paused) video.pause();
        });
    } else {
        videos.forEach(video => {
            if (video.hasAttribute("loop")) {
                video.play().catch(() => {});
            }
        });
    }
});

/* ===============================
   7. HOVER EFFECT (OPTIONAL HOOK)
================================= */
// Bisa dipakai nanti untuk animasi tambahan
const mediaCards = document.querySelectorAll(".media-card");

mediaCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});

/* ===============================
   8. INFINITE LOGO SCROLL
================================= */
function initInfiniteScroll() {
    const grup = document.querySelector(".grup");
    const track = document.querySelector(".track");

    if (!grup || !track) return;

    // clone beberapa kali agar panjang
    for (let i = 0; i < 2; i++) {
        const clone = grup.cloneNode(true);
        track.appendChild(clone);
    }

    const width = grup.offsetWidth;
    track.style.setProperty("--width", width + "px");

    const speed = 30;
    const duration = width / speed;

    track.style.animationDuration = duration + "s";
}

/* ===============================
   9. AUTO YEAR (FOOTER)
================================= */
function setCurrentYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* ===============================
   10. SMOOTH SCROLL NAV
================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");

        if (targetId.length > 1) {
            e.preventDefault();
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});

/* ===============================
   11. INIT SYSTEM (ON LOAD)
================================= */
document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
    setCurrentYear();
    initInfiniteScroll();
});