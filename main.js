// DuolingoVibes - Main JavaScript File
// Handles all interactive functionality and animations

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeProductCards();
    initializeEmailForm();
    initializeTestimonialCarousel();
    initializeScrollAnimations();
});

// Animation initialization using Anime.js
function initializeAnimations() {
    // Hero text animation - stagger letters
    anime({
        targets: '.hero-title span',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Button hover animations
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });

        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Floating icons animation using p5.js concept
    initializeFloatingIcons();
}

// Floating background icons
function initializeFloatingIcons() {
    const icons = ['🌍', '📚', '✨', '🦉', '💡', '🎯'];
    const container = document.querySelector('.hero-section');
    
    if (container) {
        for (let i = 0; i < 8; i++) {
            const icon = document.createElement('div');
            icon.className = 'floating-icon';
            icon.textContent = icons[i % icons.length];
            icon.style.cssText = `
                position: absolute;
                font-size: 24px;
                opacity: 0.3;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(icon);
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation state
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
        
        // Add click animation
        item.addEventListener('click', () => {
            anime({
                targets: item,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Product card interactions
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add click handler for product details
        card.addEventListener('click', () => {
            showProductModal(card);
        });
        
        // Hover animation
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -8,
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Product modal functionality
function showProductModal(card) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${card.dataset.title || 'Language Learning Guide'}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${card.dataset.image || ''}" alt="Product Preview" class="modal-image">
                <p>${card.dataset.description || 'Comprehensive language learning guide with interactive exercises and cultural insights.'}</p>
                <div class="modal-features">
                    <h4>What's Included:</h4>
                    <ul>
                        <li>📱 Mobile-optimized PDF format</li>
                        <li>🎧 Audio pronunciation guides</li>
                        <li>💡 Interactive exercises</li>
                        <li>🌍 Cultural context tips</li>
                        <li>⭐ Progress tracking tools</li>
                    </ul>
                </div>
                <button class="btn-primary btn-full-width" onclick="purchaseProduct('${card.dataset.id || ''}')">
                    Get This Guide - $${card.dataset.price || '9.99'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal in
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: modal.querySelector('.modal-content'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
        delay: 100,
        easing: 'easeOutBack'
    });
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    anime({
        targets: modal,
        opacity: [1, 0],
        duration: 200,
        easing: 'easeOutQuad',
        complete: () => {
            modal.remove();
        }
    });
}

function purchaseProduct(productId) {
    // Simulate purchase action
    showNotification('Redirecting to secure checkout...', 'success');
    
    // In a real implementation, this would redirect to an external checkout page
    setTimeout(() => {
        showNotification('Thank you for your interest! This would redirect to the actual product page.', 'info');
    }, 1500);
}

// Email form functionality
function initializeEmailForm() {
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubmit);
    }
}

function handleEmailSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Welcome to DuolingoVibes! Check your email for your first free guide.', 'success');
        e.target.reset();
        submitBtn.textContent = 'Get Free Mini Guides';
        submitBtn.disabled = false;
        
        // Confetti animation
        createConfetti();
    }, 1500);
}

// Testimonial carousel
function initializeTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            if (i === index) {
                card.style.display = 'block';
                anime({
                    targets: card,
                    opacity: [0, 1],
                    translateX: [50, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Auto-rotate testimonials
    function rotateTestimonials() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Start auto-rotation
    setInterval(rotateTestimonials, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('fade-in-up')) {
                    anime({
                        targets: element,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutQuad'
                    });
                }
                
                if (element.classList.contains('stagger-children')) {
                    anime({
                        targets: element.children,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                        duration: 500,
                        easing: 'easeOutQuad'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in-up, .stagger-children').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#78C800',
        error: '#FF6B6B',
        info: '#4ECDC4',
        warning: '#FFE66D'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuad'
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => notification.remove()
        });
    }, 4000);
}

function createConfetti() {
    const colors = ['#78C800', '#A8E6CF', '#FF8C42', '#4ECDC4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 9999;
            pointer-events: none;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        anime({
            targets: confetti,
            translateY: '100vh',
            rotate: '360deg',
            duration: 3000 + Math.random() * 2000,
            easing: 'easeOutQuad',
            complete: () => confetti.remove()
        });
    }
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(5deg); }
        50% { transform: translateY(0px) rotate(-5deg); }
        75% { transform: translateY(5px) rotate(3deg); }
    }
    
    .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 400px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px 0 20px;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .modal-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 16px;
    }
    
    .modal-features ul {
        list-style: none;
        padding: 0;
        margin: 16px 0;
    }
    
    .modal-features li {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .btn-full-width {
        width: 100%;
        margin-top: 16px;
    }
`;
document.head.appendChild(style);