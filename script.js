// --- DOM Elements ---
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const typingTextElement = document.querySelector('.typing-text');
const reveals = document.querySelectorAll('.reveal');

// --- Text to type out --- 
const words = ["Data Science Enthusiast", "BI Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

// --- Scroll Effects (Sticky Navbar) ---
window.addEventListener('scroll', () => {
    // Navbar appearance
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// --- Mobile Navigation Toggle ---
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger icon (bars to X - basic implementation)
    if(navLinks.classList.contains('active')){
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// --- Typing Effect ---
function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove char
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50; // Faster deleting
    } else {
        // Add char
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 100; // Normal typing speed
    }
    
    // If word is completely typed
    if (!isDeleting && charIndex === currentWord.length) {
        typeDelay = 2000; // Pause at the end of word
        isDeleting = true;
    } 
    // If word is completely deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Move to next word
        typeDelay = 500; // Pause before typing new word
    }
    
    setTimeout(typeEffect, typeDelay);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    if(typingTextElement) {
        setTimeout(typeEffect, 1000);
    }
});

// --- Scroll Reveal Animation ---
function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // Adjust for when animation triggers
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Initial check and event listener for scroll reveals
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Prompt execution on load
