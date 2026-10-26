/* ================= MOBILE SIDEBAR LOGIC ================= */
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}
hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

/* ================= BACKGROUND PARTICLES ================= */
const canvas = document.getElementById('particle-canvas');
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

/* ============================================================
   DYNAMIC TYPING, TEXT & SINGLE IMAGE
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

// Initial Image load
dynamicImage.src = data[0].image;

function updateImage(imageUrl) {
    dynamicImage.style.opacity = '0';
    dynamicImage.style.transform = 'scale(0.95)';

    setTimeout(() => {
        dynamicImage.src = imageUrl;
        dynamicImage.onload = () => {
            dynamicImage.style.opacity = '1';
            dynamicImage.style.transform = 'scale(1)';
        };
    }, 300);
}

function typeEffect() {
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
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % data.length;

        descElement.style.opacity = 0;

        setTimeout(() => {
            descElement.textContent = data[phraseIndex].desc;
            descElement.style.opacity = 1;

            btnStart.href = data[phraseIndex].link;
            btnStartText.textContent = data[phraseIndex].btnText;

            updateImage(data[phraseIndex].image);

        }, 200);

        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

/* ============================================================
   PERFORMANCE SECTION
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Scroll Animation (Circles & Numbers)
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

    // 2. Interactive Spotlight Effect (Mouse Tracking)
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

