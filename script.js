document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // MOBILE MENU
    // ======================
    const mobileMenu = document.getElementById("mobile-menu");
    const burgerMenu = document.querySelector(".burger-menu");

    function toggleMenu() {
        if (!mobileMenu) return;

        const isOpen =
            mobileMenu.style.display === "block" ||
            window.getComputedStyle(mobileMenu).display === "block";

        mobileMenu.style.display = isOpen ? "none" : "block";
    }

    function closeMenu() {
        if (!mobileMenu) return;
        mobileMenu.style.display = "none";
    }

    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;

    document.addEventListener("click", (e) => {
        if (!mobileMenu || !burgerMenu) return;

        if (!mobileMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // ======================
    // COOKIE BANNER (SIMPLE + STABLE)
    // ======================
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptAllButton = document.getElementById("accept-all");
    const customiseButton = document.getElementById("customise");
    const preferenceModal = document.getElementById("preference-modal");

    if (acceptAllButton) {
        acceptAllButton.addEventListener("click", () => {
            localStorage.setItem("cookieConsentGiven", "true");
            if (cookieBanner) cookieBanner.style.display = "none";
        });
    }

    if (customiseButton) {
        customiseButton.addEventListener("click", () => {
            if (preferenceModal) preferenceModal.style.display = "flex";
            if (cookieBanner) cookieBanner.style.display = "none";
        });
    }

    // Close modal (simple)
    if (preferenceModal) {
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.className = "preference-modal-close";

        closeBtn.addEventListener("click", () => {
            preferenceModal.style.display = "none";
        });

        preferenceModal.appendChild(closeBtn);
    }

    // ======================
    // TESTIMONIAL CAROUSEL (WORKING VERSION)
    // ======================
    const track = document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial-slide");
    const prev = document.querySelector(".testimonial-arrow-prev");
    const next = document.querySelector(".testimonial-arrow-next");

    let index = 0;
    let interval;

    if (track && slides.length > 0 && prev && next) {

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            update();
        }

        function prevSlide() {
            index = (index - 1 + slides.length) % slides.length;
            update();
        }

        function start() {
            clearInterval(interval);
            interval = setInterval(nextSlide, 4000);
        }

        next.addEventListener("click", () => {
            nextSlide();
            start();
        });

        prev.addEventListener("click", () => {
            prevSlide();
            start();
        });

        update();
        start();
    }

});