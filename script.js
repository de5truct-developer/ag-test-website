// ==================== Scroll Animation Observer ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
});

// ==================== Color Selector ====================
const colorButtons = document.querySelectorAll('.color-btn');
const phoneShowcase = document.getElementById('phoneShowcase');

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        colorButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get selected color
        const selectedColor = button.dataset.color;

        // Update phone display with animation
        const phoneDevice = phoneShowcase.querySelector('.phone-device');

        // Add transition effect
        phoneDevice.style.opacity = '0';
        phoneDevice.style.transform = 'scale(0.9)';

        setTimeout(() => {
            // Remove all color classes
            phoneDevice.classList.remove('midnight', 'gold', 'silver', 'black');

            // Add new color class
            phoneDevice.classList.add(selectedColor);

            // Restore visibility
            phoneDevice.style.opacity = '1';
            phoneDevice.style.transform = 'scale(1)';
        }, 300);
    });
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Parallax Effect ====================
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const scrolled = window.scrollY;
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(calc(-50% + ${scrolled * parallaxSpeed}px))`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ==================== Navigation Background on Scroll ====================
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }

    lastScroll = currentScroll;
});

// ==================== Feature Cards Stagger Animation ====================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== Spec Cards Stagger Animation ====================
const specCards = document.querySelectorAll('.spec-card');

specCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== Camera Features Stagger Animation ====================
const cameraFeatures = document.querySelectorAll('.camera-feature');

cameraFeatures.forEach((feature, index) => {
    feature.style.transitionDelay = `${index * 0.15}s`;
});

// ==================== Mode Cards Stagger Animation ====================
const modeCards = document.querySelectorAll('.mode-card');

modeCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== Enhanced 3D Phone Rotation with Drag ====================
const phoneMockup = document.querySelector('.phone-mockup');

if (phoneMockup) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rotationX = 0;
    let rotationY = 0;

    // Mouse move for hover effect
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
        }
    });

    // Drag to rotate
    phoneMockup.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        phoneMockup.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;

            // Limit rotation angles
            rotationX = Math.max(-45, Math.min(45, rotationX));
            rotationY = Math.max(-45, Math.min(45, rotationY));

            startX = e.clientX;
            startY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        phoneMockup.style.cursor = 'grab';
    });

    // Touch support for mobile
    phoneMockup.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;

            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;

            rotationX = Math.max(-45, Math.min(45, rotationX));
            rotationY = Math.max(-45, Math.min(45, rotationY));

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    phoneMockup.style.cursor = 'grab';

    function animatePhone() {
        if (!isDragging) {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            phoneMockup.style.transform = `
                perspective(1000px)
                rotateY(${currentX + rotationY}deg) 
                rotateX(${-currentY + rotationX}deg)
                scale(1.05)
            `;
        } else {
            phoneMockup.style.transform = `
                perspective(1000px)
                rotateY(${rotationY}deg) 
                rotateX(${rotationX}deg)
                scale(1.1)
            `;
        }

        requestAnimationFrame(animatePhone);
    }

    animatePhone();
}

// ==================== Dynamic Gradient Background ====================
const heroGradient = document.querySelector('.hero-gradient');

if (heroGradient) {
    let gradientAngle = 0;

    function animateGradient() {
        gradientAngle += 0.2;

        const x1 = 30 + Math.sin(gradientAngle * 0.01) * 10;
        const y1 = 50 + Math.cos(gradientAngle * 0.01) * 10;
        const x2 = 70 + Math.sin(gradientAngle * 0.015) * 10;
        const y2 = 50 + Math.cos(gradientAngle * 0.015) * 10;

        heroGradient.style.background = `
            radial-gradient(circle at ${x1}% ${y1}%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${x2}% ${y2}%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)
        `;

        requestAnimationFrame(animateGradient);
    }

    animateGradient();
}

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== Performance Optimization ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== Easter Egg: Konami Code ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Activate special animation
        document.body.style.animation = 'rainbow 2s infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('%c🎨 NiHua - Инновации в каждом касании', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; color: transparent;');
console.log('%cСоздано с ❤️ и передовыми технологиями', 'font-size: 12px; color: #666;');
