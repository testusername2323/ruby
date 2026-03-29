// GSAP & ScrollTrigger Setup
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1000);
});

// Custom Cursor
const cursor = document.getElementById('customCursor');
const cursorText = cursor.querySelector('.cursor-text');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .artist-card, .release-card, .slide-content');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        if (el.classList.contains('play-btn') || el.classList.contains('slide-content')) {
            cursorText.textContent = 'PLAY';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorText.textContent = '';
    });
});

// Show announcement slider on scroll
window.addEventListener('scroll', () => {
    const announcementSlider = document.querySelector('.announcement-slider');
    const body = document.body;
    
    if (window.scrollY > 100) {
        announcementSlider.classList.add('visible');
        body.classList.add('slider-visible');
    } else {
        announcementSlider.classList.remove('visible');
        body.classList.remove('slider-visible');
    }
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Parallax Effect
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

hero.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    
    gsap.to(heroContent, {
        x: xAxis,
        y: yAxis,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Premium Carousel System
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.getElementById('carouselIndicators');
const releaseCards = Array.from(document.querySelectorAll('.release-card'));

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Initialize carousel
function initCarousel() {
    // Create indicators
    releaseCards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        carouselIndicators.appendChild(indicator);
    });
    
    updateCarousel();
}

function updateCarousel() {
    const cardWidth = carouselTrack.offsetWidth;
    const offset = cardWidth * currentIndex;
    
    gsap.to(carouselTrack, {
        x: -offset,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Update active card
    releaseCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
            card.classList.add('active');
        }
    });
    
    // Update indicators
    const indicators = carouselIndicators.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentIndex) {
            indicator.classList.add('active');
        }
    });
}

function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, releaseCards.length - 1));
    updateCarousel();
}

function nextSlide() {
    if (currentIndex < releaseCards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

carouselNext.addEventListener('click', nextSlide);
carouselPrev.addEventListener('click', prevSlide);

// Drag functionality
carouselTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.clientX;
    animationID = requestAnimationFrame(animation);
    carouselTrack.style.cursor = 'grabbing';
});

carouselTrack.addEventListener('touchstart', (e) => {
    isDragging = true;
    startPos = e.touches[0].clientX;
    animationID = requestAnimationFrame(animation);
});

carouselTrack.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
});

carouselTrack.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
});

carouselTrack.addEventListener('mouseup', () => {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -100 && currentIndex < releaseCards.length - 1) {
        currentIndex++;
    }
    
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }
    
    updateCarousel();
    prevTranslate = currentTranslate;
    carouselTrack.style.cursor = 'grab';
});

carouselTrack.addEventListener('touchend', () => {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -100 && currentIndex < releaseCards.length - 1) {
        currentIndex++;
    }
    
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }
    
    updateCarousel();
    prevTranslate = currentTranslate;
});

carouselTrack.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        cancelAnimationFrame(animationID);
        updateCarousel();
        carouselTrack.style.cursor = 'grab';
    }
});

function animation() {
    if (isDragging) requestAnimationFrame(animation);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// 3D Tilt effect on hover
releaseCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('active')) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(card, {
            rotationX: -rotateX,
            rotationY: rotateY,
            duration: 0.3,
            transformPerspective: 1000,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

initCarousel();

// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable text selection on double click
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

// Disable drag on images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
});

// Audio Preview System
const audioPlayer = document.getElementById('audioPlayer');
let currentAudio = null;


// 3D Tilt Effect for Cards
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(el, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Scroll Animations
gsap.utils.toArray('[data-aos="fade-up"]').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Staggered Animation for Spotify Embeds
gsap.utils.toArray('.spotify-embed-wrapper').forEach((embed, i) => {
    gsap.from(embed, {
        scrollTrigger: {
            trigger: embed,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out'
    });
});

// Staggered Animation for Grid Items
gsap.utils.toArray('.artists-grid .artist-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.releases-grid .release-card-simple').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out'
    });
});

// Ripple Effect on Buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Effect on Scroll
gsap.to('.hero-video', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 200,
    ease: 'none'
});

// Logo Scale on Scroll
gsap.to('.main-logo', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    scale: 0.8,
    opacity: 0.5,
    ease: 'none'
});

// Animated Page Title
let titleText = "Ruby Music Services - RMS";
let titleIndex = 0;

function animateTitle() {
    titleIndex = (titleIndex + 1) % (titleText.length + 1);
    document.title = titleText.substring(0, titleIndex) + "|";
    
    if (titleIndex === titleText.length) {
        setTimeout(() => {
            titleIndex = 0;
        }, 2000);
    }
}

setInterval(animateTitle, 200);

// Console Welcome Message
console.log('%c🎵 Welcome to Ruby Music Services', 'font-size: 20px; font-weight: bold; color: #fff; background: #000; padding: 10px;');
console.log('%cExperience premium music like never before', 'font-size: 14px; color: #999;');
