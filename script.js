// Mobile menu toggle
function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
 
    if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none";
    } else {
    mobileMenu.style.display = "block";
    }
}
 
  // Close mobile menu on link click
function closeMenu() {
    document.getElementById("mobile-menu").style.display = "none";
}
 
// ======================
// COOKIE CONSENT LOGIC
// ======================
const cookieBanner = document.getElementById('cookie-banner');
const managePreferencesButton = document.getElementById('customise');
const acceptAllButton = document.getElementById('accept-all');
const acceptAllButtonInModal = document.getElementById("preference-accept-all");
const savePreferencesButton = document.getElementById('save-preferences');
const preferenceModal = document.getElementById('preference-modal');

function applyConsent(consent) {
  gtag('consent', 'update', consent);
  localStorage.setItem('consentMode', JSON.stringify(consent));

  if (consent.analytics_storage === 'granted') {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-CN32FTXPEP';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
          gtag('js', new Date());
          gtag('config', 'G-CN32FTXPEP');
      };
  }
}

function acceptAllCookies() {
  const consent = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      personalization_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted'
  };
  applyConsent(consent);
  localStorage.setItem('cookieConsentGiven', 'true');
  cookieBanner.style.display = 'none';
  preferenceModal.style.display = 'none';
}

function saveCustomPreferences() {
  const consent = {
      ad_storage: document.getElementById('targeting').checked ? 'granted' : 'denied',
      analytics_storage: document.getElementById('performance').checked ? 'granted' : 'denied',
      personalization_storage: 'denied',
      functionality_storage: document.getElementById('functional').checked ? 'granted' : 'denied',
      security_storage: 'granted'
  };
  applyConsent(consent);
  localStorage.setItem('cookieConsentGiven', 'true');
  preferenceModal.style.display = 'none';
  cookieBanner.style.display = 'none';
}

function showCookieBanner() {
  cookieBanner.style.display = 'flex';
}

function showPreferenceModal() {
  preferenceModal.style.display = 'flex';
  cookieBanner.style.display = 'none';
}

function hidePreferenceModal() {
  preferenceModal.style.display = 'none';
}

// ✅ Load preferences and control banner after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const savedConsent = localStorage.getItem('consentMode');
  const consentGiven = localStorage.getItem('cookieConsentGiven') === 'true';

  if (savedConsent && consentGiven) {
      applyConsent(JSON.parse(savedConsent));
      cookieBanner.style.display = 'none';
  } else {
      showCookieBanner();
  }
});

// Event Listeners
managePreferencesButton.addEventListener('click', showPreferenceModal);
acceptAllButton.addEventListener('click', acceptAllCookies);
acceptAllButtonInModal.addEventListener("click", acceptAllCookies);
savePreferencesButton.addEventListener('click', saveCustomPreferences);
 
// Carousel
// Selecting all the image elements inside the carousel
const slides = document.querySelectorAll(".carousel-slide img");
// Selecting all the bullet elements inside the carousel
const bullets = document.querySelectorAll(".carousel-bullets .bullet");
// Variable to keep track of the current slide index
let currentSlide = 0;
 
// Function to show a particular slide
function showSlide(n) {
  // Removing 'active' class from all slides and bullets
  slides.forEach((slide) => slide.classList.remove("active"));
  bullets.forEach((bullet) => bullet.classList.remove("active"));
 
  // Handling overflow or underflow conditions for the slide index
  if (n >= slides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = n;
  }
 
  // Adding 'active' class to the current slide and bullet
  slides[currentSlide].classList.add("active");
  bullets[currentSlide].classList.add("active");
}
 
// Function to show the next slide
function nextSlide() {
  showSlide(currentSlide + 1);
}
 
// Function to show the previous slide
function prevSlide() {
  showSlide(currentSlide - 1);
}
 
// Adding click event listeners to the next and previous buttons
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);
 
// Adding click event listeners to the bullets for direct slide navigation
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    showSlide(index);
  });
});
 
// Function to automatically slide to the next image every 2 seconds
function autoSlide() {
  nextSlide();
}
 
// Setting up an interval to call autoSlide function every 2 seconds
setInterval(autoSlide, 2000);
