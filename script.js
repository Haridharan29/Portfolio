
/* =========================================
   PORTFOLIO MASTER SCRIPT – HARIDHARAN K
   Parallax • GSAP 3D • Floating Card
   Dark / Light Theme • Page Transitions
========================================= */

/* ----------------------------
   AOS (Scroll Animation)
----------------------------- */
if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 800,
        once: true
    });
}

/* ----------------------------
   Mobile Menu Auto Close
----------------------------- */
const navLinks = document.querySelectorAll(".nav-link");
const navBar = document.querySelector(".navbar-collapse");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navBar && navBar.classList.contains("show")) {
            new bootstrap.Collapse(navBar).toggle();
        }
    });
});

/* ----------------------------
   Smooth Scroll for #anchors
----------------------------- */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});

/* ----------------------------
   Scroll-to-Top Button
----------------------------- */
(function () {
    const scrollBtn = document.createElement("div");
    scrollBtn.classList.add("scroll-top-btn");
    scrollBtn.innerHTML = "⬆";
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();

/* ----------------------------
   Neon Hover Glow Effect
----------------------------- */
document.querySelectorAll(".project-card, .service-card, .blog-card").forEach(card => {
    card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty("--x", `${x}px`);
        this.style.setProperty("--y", `${y}px`);
        this.classList.add("neon-hover");
    });

    card.addEventListener("mouseleave", function () {
        this.classList.remove("neon-hover");
    });
});

/* ----------------------------
   Typed Text Animation
   (Use span.typed-text wherever needed)
----------------------------- */
const typedTarget = document.querySelector(".typed-text");

if (typedTarget) {
    const words = [
        "Python Full Stack Developer",
        "Web Developer",
        "Machine Learning Enthusiast",
        "Tech Explorer"
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = words[index];

        if (!isDeleting) {
            typedTarget.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            typedTarget.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % words.length;
            }
        }
        setTimeout(typeEffect, isDeleting ? 60 : 95);
    }

    typeEffect();
}

/* ----------------------------
   Preloader Fade-Out (optional)
   HTML: <div class="preloader"></div>
----------------------------- */
window.addEventListener("load", () => {
    const loader = document.querySelector(".preloader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 300);
    }
});

/* ----------------------------
   Active Navbar Highlight on Scroll
----------------------------- */
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    const scrollPos = document.documentElement.scrollTop + 100;

    sections.forEach(section => {
        if (
            scrollPos > section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            document.querySelector(".nav-link.active")?.classList.remove("active");
            document
                .querySelector(`.nav-link[href*="${section.id}"]`)
                ?.classList.add("active");
        }
    });
});

/* ============================
   PARALLAX EFFECTS
   Use data-parallax="y" and data-speed="0.2"
============================ */
function parallaxScroll() {
    // disable parallax on very small devices for stability
    if (window.innerWidth < 768) return;

    const elements = document.querySelectorAll("[data-parallax]");
    const centerY = window.innerHeight / 2;

    elements.forEach(el => {
        // don't apply general parallax to profile elements (they have their own GSAP animation)
        if (el.classList.contains('profile-rect-wrapper') || el.classList.contains('profile-wrapper')) return;

        const rect = el.getBoundingClientRect();
        const distance = (rect.top + rect.height / 2) - centerY; // distance from center of viewport
        const speed = parseFloat(el.getAttribute("data-speed")) || 0.2;
        const type = el.getAttribute("data-parallax") || "y";
        const maxShift = Math.abs(parseFloat(el.getAttribute('data-parallax-max')) || 60); // px max

        // scale down the shift so values remain small and won't overlap
        const rawShift = distance * (speed * 0.06);
        const shift = Math.max(Math.min(rawShift, maxShift), -maxShift);

        if (type === "y") {
            el.style.transform = `translate3d(0, ${shift}px, 0)`;
        } else if (type === "x") {
            el.style.transform = `translate3d(${shift}px, 0, 0)`;
        }
    });
}

window.addEventListener("scroll", parallaxScroll);

/* Parallax on mouse move for hero BG */
(function () {
    const hero = document.querySelector(".hero-section");
    if (!hero) return;

    // Don't attach heavy mouse parallax/tilt logic on touch devices or small screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 768) return;

    hero.addEventListener("mousemove", e => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        hero.style.setProperty("--tiltX", y * -6 + "deg");
        hero.style.setProperty("--tiltY", x * 6 + "deg");
    });
})();

/* ============================
   GSAP 3D ANIMATIONS + FLOATING
============================ */
function initGSAPAnimations() {
    if (typeof gsap === "undefined") return;

    // register ScrollTrigger if available
    if (typeof ScrollTrigger !== "undefined" && gsap.registerPlugin) {
        try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}
    }

    // Hero text / buttons
    const heroText = document.querySelector("#home .col-md-7");
    if (heroText) {
        gsap.from(heroText.children, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out"
        });
    }

    // Floating profile card (full-size image wrapper)
    const profileCard = document.querySelector(".profile-rect-wrapper");
    if (profileCard) {
        // subtle floating motion handled by GSAP
        // Floating animation only on desktop
if (window.innerWidth > 768) {
    gsap.to(profileCard, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

        }

        // 3D tilt with mouse - only on non-touch devices and wider screens
        const isTouchP = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!isTouchP && window.innerWidth >= 768) {
            profileCard.addEventListener("mousemove", e => {
                const rect = profileCard.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(profileCard, {
                    rotationY: x * 10,
                    rotationX: -y * 8,
                    transformPerspective: 900,
                    transformOrigin: "center",
                    duration: 0.3
                });
            });

            profileCard.addEventListener("mouseleave", () => {
                gsap.to(profileCard, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        }
    }

    // Projects cards subtle pop-in
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".project-card",
            start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
    });


document.addEventListener("DOMContentLoaded", initGSAPAnimations);

/* ----------------------------
   Education circular meters
----------------------------- */
function initEduCircles() {
    document.querySelectorAll('.edu-circle').forEach(circle => {
        const percent = Number(circle.getAttribute('data-percent')) || 0;
        circle.style.setProperty('--p', `${percent * 3.6}deg`);
    });
}

// initialize the edu circles on DOM ready
document.addEventListener('DOMContentLoaded', initEduCircles);

/* Theme toggle removed — single dark theme maintained */

/* ============================
   SMOOTH PAGE TRANSITIONS
   Overlay: #page-transition
============================ */
const transitionEl = document.getElementById("page-transition");

// Fade-in on load
window.addEventListener("DOMContentLoaded", () => {
    if (transitionEl) {
        transitionEl.classList.add("is-loaded");
    }
    // If there is a hash target in the URL, smooth-scroll to it on load
    if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }
});

// Intercept internal links for smooth leaving animation
document.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link || !transitionEl) return;

    const href = link.getAttribute("href");

    // Ignore external, mailto, tel, hash-only
    if (
        !href ||
        href.startsWith("http") && !href.includes(location.host) ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        link.target === "_blank"
    ) {
        return;
    }

    e.preventDefault();
    transitionEl.classList.remove("is-loaded"); // show overlay

    setTimeout(() => {
        window.location.href = href;
    }, 350); // must match CSS transition duration
});
