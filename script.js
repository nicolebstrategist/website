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
    // COOKIE BANNER
    // ======================
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptAllButton = document.getElementById("accept-all");
    const declineAllButton = document.getElementById("decline-all");
    const customiseButton = document.getElementById("customise");
    const preferenceModal = document.getElementById("preference-modal");
    const savePreferencesButton = document.getElementById("save-preferences");
    const preferenceAcceptAllButton = document.getElementById("preference-accept-all");

    const performanceCheckbox = document.getElementById("performance");
    const functionalCheckbox = document.getElementById("functional");
    const targetingCheckbox = document.getElementById("targeting");

    const consentAccepted = {
        ad_storage: "granted",
        analytics_storage: "granted",
        personalization_storage: "granted",
        functionality_storage: "granted",
        security_storage: "granted"
    };

    const consentDeclined = {
        ad_storage: "denied",
        analytics_storage: "denied",
        personalization_storage: "denied",
        functionality_storage: "denied",
        security_storage: "granted"
    };

    function getSavedConsent() {
        const saved = localStorage.getItem("consentMode");
        if (!saved) return null;

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Invalid consentMode in localStorage:", error);
            localStorage.removeItem("consentMode");
            return null;
        }
    }

    function saveConsent(consentMode) {
        localStorage.setItem("consentMode", JSON.stringify(consentMode));

        if (typeof gtag === "function") {
            gtag("consent", "update", consentMode);
        }

        if (cookieBanner) cookieBanner.style.display = "none";
        if (preferenceModal) preferenceModal.style.display = "none";
    }

    function showBanner() {
        if (cookieBanner) cookieBanner.style.display = "flex";
    }

    function hideBanner() {
        if (cookieBanner) cookieBanner.style.display = "none";
    }

    function openPreferences() {
        if (preferenceModal) preferenceModal.style.display = "flex";
        hideBanner();

        const consent = getSavedConsent();
        if (!consent) return;

        if (performanceCheckbox) {
            performanceCheckbox.checked = consent.analytics_storage === "granted";
        }

        if (functionalCheckbox) {
            functionalCheckbox.checked = consent.functionality_storage === "granted";
        }

        if (targetingCheckbox) {
            targetingCheckbox.checked =
                consent.ad_storage === "granted" &&
                consent.personalization_storage === "granted";
        }
    }

    function closePreferences() {
        if (preferenceModal) preferenceModal.style.display = "none";

        if (!getSavedConsent()) {
            showBanner();
        }
    }

    function saveCustomPreferences() {
        const customConsent = {
            analytics_storage: performanceCheckbox && performanceCheckbox.checked ? "granted" : "denied",
            functionality_storage: functionalCheckbox && functionalCheckbox.checked ? "granted" : "denied",
            ad_storage: targetingCheckbox && targetingCheckbox.checked ? "granted" : "denied",
            personalization_storage: targetingCheckbox && targetingCheckbox.checked ? "granted" : "denied",
            security_storage: "granted"
        };

        saveConsent(customConsent);
    }

    // Initial state
    if (getSavedConsent()) {
        hideBanner();
    } else {
        showBanner();
    }

    if (acceptAllButton) {
        acceptAllButton.addEventListener("click", () => {
            saveConsent(consentAccepted);
        });
    }

    if (declineAllButton) {
        declineAllButton.addEventListener("click", () => {
            saveConsent(consentDeclined);
        });
    }

    if (customiseButton) {
        customiseButton.addEventListener("click", openPreferences);
    }

    if (savePreferencesButton) {
        savePreferencesButton.addEventListener("click", saveCustomPreferences);
    }

    if (preferenceAcceptAllButton) {
        preferenceAcceptAllButton.addEventListener("click", () => {
            saveConsent(consentAccepted);
        });
    }

    if (preferenceModal && !preferenceModal.querySelector(".preference-modal-close")) {
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.className = "preference-modal-close";
        closeBtn.setAttribute("aria-label", "Close preferences");
        closeBtn.addEventListener("click", closePreferences);
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
            interval = setInterval(nextSlide, 8000);
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