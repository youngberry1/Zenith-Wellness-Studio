const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');

let currentSlideIndex = 0;
const totalSlides = slides.length;

function updateSlidePosition() {
    const offset = -currentSlideIndex * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;
}


nextButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlidePosition();
});

prevButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlidePosition();
}, 5000);

//Dot Indicators
const indicatorsContainer = document.querySelector('.slide-indicators');
const dots = indicatorsContainer.querySelectorAll('.dot');

function updateSlidePosition() {
    const offset = -currentSlideIndex * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    // Highlight the active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlideIndex = index;
        updateSlidePosition();
        resetAutoSlideTimer(); // Optional: resets the timer when user clicks
    });
});



