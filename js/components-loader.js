/* ============================================================
   COMPONENTS LOADER (Header, Footer, Back to Top)
   Loads external HTML components into every page
============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Load Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Re-initialize sidebar logic after header is loaded
                initSidebar();
                initMobileServicesAccordion();
            })
            .catch(error => console.error('Header load error:', error));
    }

    // Load Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Footer load error:', error));
    }

    // Load Back to Top
    const backToTopPlaceholder = document.getElementById('back-to-top-placeholder');
    if (backToTopPlaceholder) {
        fetch('components/back-to-top.html')
            .then(response => response.text())
            .then(data => {
                backToTopPlaceholder.innerHTML = data;
                initBackToTop();
            })
            .catch(error => console.error('Back to top load error:', error));
    }
});

/* ============================================================
   SIDEBAR LOGIC (Re-initialized after header load)
============================================================ */
function initSidebar() {
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

    if (hamburger && sidebar && sidebarOverlay && sidebarClose) {
        // Remove old listeners by cloning (optional, for safety)
        hamburger.addEventListener('click', openSidebar);
        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Sidebar link click -> close sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeSidebar();
        });
    });
}

/* ============================================================
   MOBILE SERVICES ACCORDION
============================================================ */
function initMobileServicesAccordion() {
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
}

/* ============================================================
   BACK TO TOP BUTTON LOGIC
============================================================ */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

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