/* ================= MOBILE SIDEBAR LOGIC ================= */
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    if (sidebar && sidebarOverlay) {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeSidebar() {
    if (sidebar && sidebarOverlay) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (hamburger && sidebar && sidebarOverlay && sidebarClose) {
    hamburger.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
}

/* ================= BACKGROUND PARTICLES ================= */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [], W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.r = Math.random() * 1.8 + 0.5;
            this.c = Math.random() > 0.5 ? '70,183,123' : '97,206,112';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.c}, 0.55)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    let mouseX = -1000, mouseY = -1000;
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateParticles() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);

            if (dist < 180 && dist > 0) {
                p.x += (dx / dist) * 0.6;
                p.y += (dy / dist) * 0.6;
            }
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(70, 183, 123, ${0.18 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ============================================================
   HOME PAGE DYNAMIC HERO (TEXT, IMAGE & DESCRIPTION CHANGE)
============================================================ */
const data = [
    {
        title: "Plastic Packaging",
        desc: "Plastic packaging is a versatile, durable, and cost-effective solution for preserving and protecting products. Customizable in design and size, plastic packaging enhances brand visibility.",
        btnText: "Plastic Packaging",
        link: "#plastic-packaging",
        image: "images/plastic-packing.png"
    },
    {
        title: "Tissue Conversion",
        desc: "Tissue conversion transforms raw tissue paper into finished products like napkins, facial tissues, and paper towels.",
        btnText: "Tissue Conversion",
        link: "#tissue-conversion",
        image: "images/tissue-conversion.png"
    },
    {
        title: "Flexible Printing",
        desc: "Flexible printing offers versatile, efficient solutions for packaging and custom designs. It adapts to different materials and shapes, ensuring high-quality, durable prints that enhance product appeal and branding.",
        btnText: "Flexible Printing",
        link: "#flexible-printing",
        image: "images/flexible-printing.png"
    },
    {
        title: "Roll to Roll Labels",
        desc: "Roll-to-roll label printing is an efficient, high-speed solution for producing custom labels in bulk. Ideal for industries.",
        btnText: "Roll to Roll Labels",
        link: "#roll-to-roll",
        image: "images/roll-to-roll.png"
    },
    {
        title: "Laminated Tubes",
        desc: "Laminated tubes are durable, lightweight packaging solutions ideal for cosmetics, pharmaceuticals, and food products.",
        btnText: "Laminated Tubes",
        link: "#laminated-tubes",
        image: "images/laminated-tubes.png"
    },
    {
        title: "Offset Printing",
        desc: "Offset printing is a high-quality, cost-effective method ideal for large volumes. It ensures vibrant colors, sharp images, and professional results on various materials.",
        btnText: "Offset Printing",
        link: "#offset-printing",
        image: "images/offset-printing.jpg"
    }
];

const typedElement = document.getElementById('typedText');
const descElement = document.getElementById('dynamicDesc');
const btnStart = document.getElementById('dynamicBtnStart');
const btnStartText = document.getElementById('btnStartText');
const dynamicImage = document.getElementById('dynamicImage');

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

if (dynamicImage) {
    dynamicImage.src = data[0].image;
}

// Background Image Change Function (With Fade Effect)
function updateImage(imageUrl) {
    if (!dynamicImage) return;
    dynamicImage.style.opacity = '0';
    dynamicImage.style.transform = 'scale(1.1)';
    setTimeout(() => {
        dynamicImage.src = imageUrl;
        dynamicImage.onload = () => {
            dynamicImage.style.opacity = '1';
            dynamicImage.style.transform = 'scale(1.05)';
        };
    }, 300);
}

function typeHomeEffect() {
    if (!typedElement) return;
    const currentItem = data[phraseIndex];

    if (isDeleting) {
        typedElement.textContent = currentItem.title.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentItem.title.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentItem.title.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % data.length;
        
        if (descElement) descElement.style.opacity = 0;
        
        setTimeout(() => {
            if (descElement) {
                descElement.textContent = data[phraseIndex].desc;
                descElement.style.opacity = 1;
            }
            if (btnStart) btnStart.href = data[phraseIndex].link;
            if (btnStartText) btnStartText.textContent = data[phraseIndex].btnText;
            updateImage(data[phraseIndex].image);
        }, 200);
        speed = 500;
    }
    setTimeout(typeHomeEffect, speed);
}

/* ============================================================
   INNER PAGES TYPING EFFECT (SMART DETECTION)
============================================================ */
const offsetTypedText = document.getElementById('offsetTypedText');

function typeInnerPagesEffect() {
    let phrase = "& Folding Cartons"; // Default
    const currentUrl = window.location.href.toLowerCase();
    const pageTitle = document.title.toLowerCase();

    if (currentUrl.includes("laminated") || pageTitle.includes("laminated")) {
        phrase = "& Barrier Protection"; 
    } else if (currentUrl.includes("plastic") || pageTitle.includes("plastic")) {
        phrase = "& Durable Solutions"; 
    } else if (currentUrl.includes("tissue") || pageTitle.includes("tissue")) {
        phrase = "& Premium Comfort";
    } else if (currentUrl.includes("flexible") || pageTitle.includes("flexible")) {
        phrase = "& Sustainability"; 
    } else if (currentUrl.includes("roll-to-roll") || currentUrl.includes("roll") || pageTitle.includes("roll to roll")) {
        phrase = "& Special Finishes";
    }

    let idx = 0;
    let deleting = false;

    function type() {
        if (deleting) {
            offsetTypedText.textContent = phrase.substring(0, idx - 1);
            idx--;
        } else {
            offsetTypedText.textContent = phrase.substring(0, idx + 1);
            idx++;
        }

        let speed = deleting ? 40 : 100; 

        if (!deleting && idx === phrase.length) {
            speed = 2500; 
            deleting = true;
        } else if (deleting && idx === 0) {
            deleting = false;
            speed = 500; 
        }

        setTimeout(type, speed);
    }
    
    setTimeout(type, 500);
}

/* ============================================================
   INITIALIZE EFFECTS ON PAGE LOAD
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    // 1. Sidebar Links Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const closeSidebarBtn = document.getElementById('sidebarClose');
    if (closeSidebarBtn) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                const sb = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');
                if (sb) sb.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Mobile Accordion
    const toggle = document.getElementById('mobileServicesToggle');
    const list = document.getElementById('mobileServicesList');
    const chevron = document.getElementById('mobileServicesChevron');
    if (toggle && list && chevron) {
        toggle.addEventListener('click', function () {
            list.classList.toggle('hidden');
            list.classList.toggle('flex');
            chevron.classList.toggle('rotate-180');
        });
    }

    // 3. Start Typing Effects
    // Agar Home page hai (dynamicImage mojood hai) toh Home wala chalao
    if (dynamicImage) {
        typeHomeEffect();
    } 
    // Agar Inner page hai (offsetTypedText mojood hai) toh Inner page wala chalao
    else if (offsetTypedText) {
        typeInnerPagesEffect();
    }
});


/* ============================================================
   PERFORMANCE SECTION ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    const performanceSection = document.getElementById('performance-grid');
    const counters = document.querySelectorAll('.counter');
    const perfCircles = document.querySelectorAll('.perf-circle');
    const CIRCUMFERENCE = 2 * Math.PI * 52;
    let perfAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !perfAnimated) {
                perfAnimated = true;

                perfCircles.forEach(circle => {
                    const target = +circle.getAttribute('data-target');
                    const offset = CIRCUMFERENCE - (target / 100) * CIRCUMFERENCE;
                    circle.style.strokeDashoffset = offset;
                });

                counters.forEach((counter) => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2500;
                    let startTimestamp = null;

                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 4);
                        counter.innerText = Math.floor(easeOut * target);
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    window.requestAnimationFrame(step);
                });
            }
        });
    }, { threshold: 0.3 });

    if (performanceSection) {
        observer.observe(performanceSection);
    }

    // Interactive Spotlight Effect (Mouse Tracking)
    const panels = document.querySelectorAll('.spotlight-panel');
    panels.forEach(panel => {
        panel.addEventListener('mousemove', e => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

/* ============================================================
   CLEAN BRANDS MARQUEE INJECTION
============================================================ */
const partnerLogos = [
    "images/brand1.png", "images/brand2.png", "images/brand3.png", "images/brand4.png",
    "images/brand5.png", "images/brand6.png", "images/brand7.png", "images/brand8.png",
    "images/brand9.png", "images/brand10.png", "images/brand11.png", "images/brand12.png",
    "images/brand13.png", "images/brand14.png", "images/brand15.png", "images/brand16.png",
    "images/brand17.png", "images/brand18.png", "images/brand19.png", "images/brand20.png",
    "images/brand21.png", "images/brand22.png", "images/brand23.png", "images/brand24.png",
    "images/brand25.png", "images/brand26.png", "images/brand27.png", "images/brand28.png",
    "images/brand29.png", "images/brand30.png", "images/brand31.png", "images/brand32.png",
    "images/brand33.png", "images/brand34.png", "images/brand35.png", "images/brand36.png",
    "images/brand37.png", "images/brand38.png", "images/brand39.png"
];

const brandMarquee = document.getElementById('brand-marquee');

if (brandMarquee && partnerLogos.length > 0) {
    const imagesHTML = partnerLogos.map(src => `
        <img src="${src}" alt="Partner Logo" class="marquee-logo" loading="lazy">
    `).join('');
    brandMarquee.innerHTML = imagesHTML + imagesHTML;
}

/* ============================================================
   BACK TO TOP BUTTON & SCROLL ANIMATIONS
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-8');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-8');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        scrollObserver.observe(section);
    });
});

/* ============================================================
   INTERACTIVE TABS LOGIC (WHY CHOOSE US)
============================================================ */
function openTab(tabName) {
    var i, tabcontent, tabbuttons;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabbuttons = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active-tab");
        tabbuttons[i].style.backgroundColor = "transparent";
        tabbuttons[i].style.borderLeft = "none";
        tabbuttons[i].style.borderBottom = "none";

        var icon = tabbuttons[i].querySelector('.tab-icon');
        if (icon) {
            icon.style.backgroundColor = "#f3f4f6"; // Gray 100
            icon.style.color = "#9ca3af"; // Gray 400
        }

        var text = tabbuttons[i].querySelector('.tab-text');
        if (text) {
            text.style.color = "#1f2937"; // Gray 800
        }
    }

    var activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.style.display = "block";
    }

    var activeBtn = document.getElementById("btn-" + tabName);
    if (activeBtn) {
        activeBtn.classList.add("active-tab");
        activeBtn.style.backgroundColor = "#FAFBF9";
        if (window.innerWidth < 768) {
            activeBtn.style.borderLeft = "none";
            activeBtn.style.borderBottom = "4px solid #46B77B";
        } else {
            activeBtn.style.borderLeft = "4px solid #46B77B";
            activeBtn.style.borderBottom = "none";
        }

        var activeIcon = activeBtn.querySelector('.tab-icon');
        if (activeIcon) {
            activeIcon.style.backgroundColor = "#46B77B";
            activeIcon.style.color = "#ffffff";
        }

        var activeText = activeBtn.querySelector('.tab-text');
        if (activeText) {
            activeText.style.color = "#46B77B";
        }
    }
}

// Page Load Hote Hi Default Tab (Tab 1) Show Karein
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('tab1') && document.getElementById('btn-tab1')) {
        openTab('tab1');
    }
});

function toggleProcessReveal(revealId, cardId) {
    const content = document.getElementById(revealId);
    const card = document.getElementById(cardId);
    const title = card.querySelector('.card-title');
    const icon = card.querySelector('.card-icon');
    const iconInner = card.querySelector('.card-icon i');
    const text = card.querySelector('.card-text');

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        card.classList.remove('bg-white/60', 'border-gray-200/80');
        card.classList.add('bg-[#050806]', 'border-white/10', 'shadow-2xl');
        title.classList.remove('text-[#0A0C12]');
        title.classList.add('text-white');
        icon.classList.remove('border-gray-300');
        icon.classList.add('border-[#46B77B]', 'bg-[#46B77B]');
        iconInner.classList.remove('text-gray-500', 'fa-plus');
        iconInner.classList.add('text-white', 'fa-times', 'rotate-90');
        text.classList.remove('text-gray-500');
        text.classList.add('text-gray-400');
    } else {
        content.classList.add('hidden');
        card.classList.add('bg-white/60', 'border-gray-200/80');
        card.classList.remove('bg-[#050806]', 'border-white/10', 'shadow-2xl');
        title.classList.add('text-[#0A0C12]');
        title.classList.remove('text-white');
        icon.classList.add('border-gray-300');
        icon.classList.remove('border-[#46B77B]', 'bg-[#46B77B]');
        iconInner.classList.add('text-gray-500', 'fa-plus');
        iconInner.classList.remove('text-white', 'fa-times', 'rotate-90');
        text.classList.add('text-gray-500');
        text.classList.remove('text-gray-400');
    }
}