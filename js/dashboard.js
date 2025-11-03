// Dashboard functionality
class DashboardManager {
    constructor() {
        this.currentSection = 'overview';
        this.init();
    }

    init() {
        this.loadUserData();
        this.attachEventListeners();
        this.loadDashboardData();
        this.initNavigation();
    }

    loadUserData() {
        const user = window.authManager?.getCurrentUser();
        
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        // Update user info in UI
        this.updateUserInfo(user);
    }

    updateUserInfo(user) {
        // Update navbar
        const userNameElements = document.querySelectorAll('#userName, #sidebarUserName');
        const userEmailElements = document.querySelectorAll('#sidebarUserEmail');
        const userAvatarElements = document.querySelectorAll('.user-avatar, .user-avatar-large');

        userNameElements.forEach(el => {
            el.textContent = `${user.firstName} ${user.lastName}`;
        });

        userEmailElements.forEach(el => {
            el.textContent = user.email;
        });

        // In a real app, you'd set actual avatar images
        userAvatarElements.forEach(el => {
            el.src = el.src || 'assets/images/user-avatar.jpg';
        });
    }

    attachEventListeners() {
        // Logout functionality
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.authManager.logout();
            });
        }

        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }

        // Quick actions
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (card.getAttribute('href')?.startsWith('#')) {
                    e.preventDefault();
                    this.showSection(card.getAttribute('href').substring(1));
                }
            });
        });
    }

    initNavigation() {
        // Sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('href').substring(1);
                this.showSection(section);
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Show initial section
        this.showSection(this.currentSection);
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }
    }

    loadDashboardData() {
        this.loadStats();
        this.loadRecentBookings();
        this.loadAllBookings();
    }

    loadStats() {
        const user = window.authManager?.getCurrentUser();
        if (!user) return;

        const bookings = user.bookings || [];
        const totalBookings = bookings.length;
        const upcomingBookings = bookings.filter(booking => 
            new Date(booking.date) > new Date()
        ).length;
        const completedBookings = bookings.filter(booking => 
            new Date(booking.date) <= new Date()
        ).length;

        // Update stats
        document.getElementById('totalBookings').textContent = totalBookings;
        document.getElementById('upcomingBookings').textContent = upcomingBookings;
        document.getElementById('completedBookings').textContent = completedBookings;
        document.getElementById('bookingsCount').textContent = totalBookings;
    }

    loadRecentBookings() {
        const user = window.authManager?.getCurrentUser();
        if (!user) return;

        const bookings = user.bookings || [];
        const recentBookings = bookings.slice(-3).reverse(); // Get last 3 bookings

        const container = document.getElementById('recentBookings');
        
        if (recentBookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>No bookings yet</p>
                    <a href="index.html#packages" class="btn-primary">Book Your First Journey</a>
                </div>
            `;
            return;
        }

        container.innerHTML = recentBookings.map(booking => `
            <div class="booking-card">
                <div class="booking-header">
                    <h4>${booking.package} Package</h4>
                    <span class="booking-status ${booking.status}">${booking.status}</span>
                </div>
                <div class="booking-details">
                    <div class="detail">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-users"></i>
                        <span>${booking.people} People</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-rupee-sign"></i>
                        <span>₹${this.formatPrice(booking.price)}</span>
                    </div>
                </div>
                <div class="booking-actions">
                    <button class="btn-outline" onclick="dashboardManager.viewBooking('${booking.id}')">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadAllBookings() {
        const user = window.authManager?.getCurrentUser();
        if (!user) return;

        const bookings = user.bookings || [];
        const container = document.getElementById('bookingsContainer');
        
        if (bookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>No bookings yet</p>
                    <a href="index.html#packages" class="btn-primary">Book Your First Journey</a>
                </div>
            `;
            return;
        }

        container.innerHTML = bookings.map(booking => `
            <div class="booking-card large">
                <div class="booking-header">
                    <div>
                        <h4>${booking.package} Package</h4>
                        <p>Booking ID: ${booking.id}</p>
                    </div>
                    <span class="booking-status ${booking.status}">${booking.status}</span>
                </div>
                <div class="booking-details">
                    <div class="detail-group">
                        <div class="detail">
                            <i class="fas fa-calendar"></i>
                            <span><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-users"></i>
                            <span><strong>People:</strong> ${booking.people}</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-rupee-sign"></i>
                            <span><strong>Amount:</strong> ₹${this.formatPrice(booking.price)}</span>
                        </div>
                    </div>
                    <div class="detail-group">
                        <div class="detail">
                            <i class="fas fa-hotel"></i>
                            <span><strong>Accommodation:</strong> ${booking.accommodation || 'Included'}</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-user-tie"></i>
                            <span><strong>Panda Ji:</strong> ${booking.panda || 'Assigned'}</span>
                        </div>
                    </div>
                </div>
                <div class="booking-actions">
                    <button class="btn-outline" onclick="dashboardManager.viewBooking('${booking.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn-primary" onclick="dashboardManager.downloadReceipt('${booking.id}')">
                        <i class="fas fa-download"></i> Download Receipt
                    </button>
                </div>
            </div>
        `).join('');
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        
        const form = e.target;
        const user = window.authManager?.getCurrentUser();
        
        if (!user) return;

        const formData = new FormData(form);
        const updates = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update user in localStorage
            const users = JSON.parse(localStorage.getItem('mokshayatra_users')) || [];
            const userIndex = users.findIndex(u => u.id === user.id);
            
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updates };
                localStorage.setItem('mokshayatra_users', JSON.stringify(users));
                
                // Update current user
                const updatedUser = { ...user, ...updates };
                localStorage.setItem('mokshayatra_current_user', JSON.stringify(updatedUser));
                window.authManager.currentUser = updatedUser;
                
                this.updateUserInfo(updatedUser);
                showToast('Profile updated successfully!', 'success');
            }
        } catch (error) {
            showToast('Error updating profile', 'error');
        }
    }

    viewBooking(bookingId) {
        // In a real app, this would show a detailed modal
        showToast(`Viewing booking ${bookingId}`, 'info');
    }

    downloadReceipt(bookingId) {
        // In a real app, this would generate and download a PDF receipt
        showToast(`Downloading receipt for booking ${bookingId}`, 'info');
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!window.authManager?.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    window.dashboardManager = new DashboardManager();
});

// Add some sample booking data for demonstration
function addSampleBookings() {
    const user = window.authManager?.getCurrentUser();
    if (!user || user.bookings?.length > 0) return;

    const sampleBookings = [
        {
            id: 'BK001',
            package: 'Gold',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            people: 2,
            price: 30000,
            status: 'confirmed',
            accommodation: 'Premium Room',
            panda: 'Senior Pandit Sharma'
        },
        {
            id: 'BK002',
            package: 'Silver',
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            people: 1,
            price: 10000,
            status: 'completed',
            accommodation: 'Standard Room',
            panda: 'Pandit Verma'
        }
    ];

    // Update user with sample bookings
    const users = JSON.parse(localStorage.getItem('mokshayatra_users')) || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
        users[userIndex].bookings = sampleBookings;
        localStorage.setItem('mokshayatra_users', JSON.stringify(users));
        
        // Update current user
        const updatedUser = { ...user, bookings: sampleBookings };
        localStorage.setItem('mokshayatra_current_user', JSON.stringify(updatedUser));
        window.authManager.currentUser = updatedUser;
    }
}

// Uncomment the line below to add sample bookings for demonstration
// document.addEventListener('DOMContentLoaded', addSampleBookings);