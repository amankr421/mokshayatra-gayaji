// Main initialization file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initAOS();
    initSmoothScroll();
    initBackToTop();
    
    // Initialize modules
    if (typeof initNavbar === 'function') initNavbar();
    if (typeof initPackages === 'function') initPackages();
    if (typeof initGallery === 'function') initGallery();
    if (typeof initContact === 'function') initContact();
    if (typeof initAudio === 'function') initAudio();
});

// Loader
function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
}

// AOS Initialization
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Back to Top
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility function for showing toast messages
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}




// Add to main.js in the init function
function checkAuthentication() {
    if (window.authManager?.isAuthenticated() && 
        window.location.pathname.endsWith('index.html')) {
        // User is logged in and on homepage - could redirect to dashboard
        // or show logged-in state in navbar
        updateNavbarForLoggedInUser();
    }
}

function updateNavbarForLoggedInUser() {
    const user = window.authManager.getCurrentUser();
    const navAuth = document.querySelector('.nav-auth');
    
    if (navAuth && user) {
        navAuth.innerHTML = `
            <div class="user-greeting">
                Welcome, ${user.firstName}
            </div>
            <a href="dashboard.html" class="nav-link auth-link">
                Dashboard
            </a>
            <a href="#" class="nav-link auth-link primary logout-btn">
                Logout
            </a>
        `;
        
        // Add logout functionality
        const logoutBtn = navAuth.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.authManager.logout();
            });
        }
    }
}