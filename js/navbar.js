// Navbar functionality with Auth
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navAuth = document.querySelector('.nav-auth');

    // Initialize auth state
    updateAuthUI();

    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Book Journey button scroll
    const bookButton = document.getElementById('book-journey');
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            document.querySelector('#packages').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Auth state change listener
    window.addEventListener('storage', function(e) {
        if (e.key === 'mokshayatra_current_user') {
            updateAuthUI();
        }
    });
}

// Update auth UI based on login state - ONLY SIGN IN BUTTON
function updateAuthUI() {
    const navAuth = document.querySelector('.nav-auth');
    if (!navAuth) return;

    const currentUser = JSON.parse(localStorage.getItem('mokshayatra_current_user'));
    
    if (currentUser) {
        // User is logged in - show user menu
        const userInitials = getInitials(currentUser.firstName + ' ' + currentUser.lastName);
        
        navAuth.innerHTML = `
            <div class="user-menu">
                <div class="user-avatar">${userInitials}</div>
                <span class="user-name">${currentUser.firstName}</span>
                <div class="user-dropdown">
                    <a href="dashboard.html" class="dropdown-item">
                        <i class="fas fa-tachometer-alt"></i>
                        Dashboard
                    </a>
                    <a href="profile.html" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        Profile
                    </a>
                    <a href="bookings.html" class="dropdown-item">
                        <i class="fas fa-calendar-check"></i>
                        My Bookings
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout-btn" id="logout-btn">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </a>
                </div>
            </div>
        `;

        // Add logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
    } else {
        // User is not logged in - show ONLY SIGN IN button with icon
        navAuth.innerHTML = `
            <a href="login.html" class="signin-btn">
                <i class="fas fa-sign-in-alt"></i>
                Sign In
            </a>
        `;
    }
}

// Get user initials for avatar
function getInitials(name) {
    return name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// Logout user
function logoutUser() {
    localStorage.removeItem('mokshayatra_current_user');
    showToast('Logged out successfully', 'success');
    
    // Redirect to home page after logout
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
});