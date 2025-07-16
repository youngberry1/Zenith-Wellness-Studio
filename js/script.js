// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // === Grab Elements ===
    const slidesWrapper = document.querySelector('.slides-wrapper'); // Container for all slides
    const slides = document.querySelectorAll('.slide');              // Each individual slide
    const prevButton = document.querySelector('.prev-slide');        // Left arrow button
    const nextButton = document.querySelector('.next-slide');        // Right arrow button
    const indicatorsContainer = document.querySelector('.slide-indicators'); // Dots container
    const dots = indicatorsContainer.querySelectorAll('.dot');       // All dot elements

    // === State Management ===
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // === Auto-slide Timer ===
    let autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // === Update Slide Position Function ===
    function updateSlidePosition() {
        const offset = -currentSlideIndex * 100;
        slidesWrapper.style.transform = `translateX(${offset}%)`;

        // Highlight active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }

    // === Slide Navigation Functions ===
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateSlidePosition();
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // === Reset Auto-Slide Timer ===
    function resetAutoSlideTimer() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // === Event Listeners ===
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlideTimer();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlideTimer();
    });

    // === Dots (Indicators) Click Handling ===
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSlidePosition();
            resetAutoSlideTimer();
        });
    });

    // === Initial Setup ===
    updateSlidePosition();
});

// Dark Mode Toggle
const toggleBtn = document.querySelector('.theme-toggle');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Optionally store preference
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Apply theme on page load based on preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
})


//Mobile Nav Toggle

const navToggle = document.querySelector(".nav-toggle");
const header = document.querySelector(".header-container");
const navLinks = document.querySelectorAll(".main-nav a");
const backdrop = document.querySelector(".nav-backdrop");

function toggleMenu(forceOpen = null) {
    const isOpen = forceOpen !== null ? forceOpen : !header.classList.contains("menu-open");
    header.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
}

navToggle.addEventListener("click", () => {
    toggleMenu();
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        toggleMenu(false);
    });
});

backdrop.addEventListener("click", () => {
    toggleMenu(false);
});
