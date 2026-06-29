// ==================== APP.JS - Main Application Script ====================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: window.innerWidth < 768 ? 'phone' : false
    });

    // ==================== NAVBAR ====================
    initNavbar();
    
    // ==================== MOBILE MENU ====================
    initMobileMenu();
    
    // ==================== COUNTER ANIMATION ====================
    initCounters();
    
    // ==================== BACK TO TOP ====================
    initBackToTop();
    
    // ==================== HERO SEARCH ====================
    initHeroSearch();
    
    // ==================== NEWSLETTER ====================
    initNewsletter();
    
    // ==================== LAZY IMAGES ====================
    initLazyImages();
    
    // ==================== FAVORITE BUTTONS ====================
    initFavorites();

    // Page enter animation
    document.body.classList.add('page-enter');
});

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('nav-transparent');
        } else {
            navbar.classList.remove('nav-scrolled');
            // Only add transparent class on homepage
            if (document.querySelector('.hero-section') || document.querySelector('[class*="min-h-screen"]')) {
                navbar.classList.add('nav-transparent');
            }
        }
    }

    // Initial state
    if (window.location.pathname === '/' || 
        window.location.pathname.includes('index.html') || 
        window.location.pathname === '') {
        navbar.classList.add('nav-transparent');
    }
    
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('menu-open');
        } else {
            mobileMenu.classList.remove('hidden');
            menuBtn.classList.add('menu-open');
        }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('menu-open');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('menu-open');
        }
    });
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function updateCounter() {
        current += step;
        if (current < target) {
            element.textContent = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    }

    requestAnimationFrame(updateCounter);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K+';
    }
    return num.toLocaleString();
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.remove('translate-y-20', 'opacity-0');
            backToTop.classList.add('translate-y-0', 'opacity-100');
        } else {
            backToTop.classList.add('translate-y-20', 'opacity-0');
            backToTop.classList.remove('translate-y-0', 'opacity-100');
        }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== HERO SEARCH ====================
function initHeroSearch() {
    const searchForm = document.getElementById('hero-search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const keyword = searchForm.querySelector('[name="keyword"]').value.trim();
        const location = searchForm.querySelector('[name="location"]').value.trim();
        
        let url = 'jobs.html?';
        const params = [];
        
        if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
        if (location) params.push(`location=${encodeURIComponent(location)}`);
        
        if (params.length > 0) {
            url += params.join('&');
        }
        
        window.location.href = url;
    });
}

// ==================== NEWSLETTER ====================
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        // Show success toast
        showToast('🎉 Successfully subscribed! Check your inbox for job alerts.', 'success');
        
        // Reset form
        form.reset();
    });
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const bgColor = type === 'success' ? 'bg-green-600' : 
                     type === 'error' ? 'bg-red-600' : 
                     type === 'warning' ? 'bg-amber-600' : 'bg-gray-800';
    
    toast.classList.add(bgColor);
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/70 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ==================== LAZY IMAGES ====================
function initLazyImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// ==================== FAVORITE BUTTONS ====================
function initFavorites() {
    document.querySelectorAll('.fa-heart').forEach(btn => {
        const parentBtn = btn.closest('button');
        if (!parentBtn) return;

        parentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-red-500');
                showToast('❤️ Job saved to favorites!', 'success');
            } else {
                icon.classList.remove('fas', 'text-red-500');
                icon.classList.add('far');
                showToast('Job removed from favorites.', 'info');
            }
        });
    });
}

// ==================== UTILITY FUNCTIONS ====================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Export functions for use in other files
window.JobHunt = {
    showToast,
    debounce,
    throttle,
    formatDate,
    truncateText,
    generateId
};