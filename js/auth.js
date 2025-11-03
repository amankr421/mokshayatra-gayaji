// Authentication functionality
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('mokshayatra_users')) || [];
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.attachEventListeners();
        this.initPasswordToggles();
        this.initPasswordStrength();
    }

    loadCurrentUser() {
        const userData = localStorage.getItem('mokshayatra_current_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    attachEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            this.initPasswordValidation();
        }

        // Forgot password
        const forgotPassword = document.querySelector('.forgot-password');
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
        }

        // Social login buttons
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
        });
    }

    initPasswordToggles() {
        const toggleButtons = document.querySelectorAll('.toggle-password');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.target.closest('.input-icon').querySelector('input');
                const icon = e.target.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    initPasswordStrength() {
        const passwordInput = document.getElementById('registerPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => this.updatePasswordStrength(e.target.value));
        }

        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', (e) => this.validatePasswordMatch());
        }
    }

    initPasswordValidation() {
        const passwordInput = document.getElementById('registerPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (passwordInput && confirmPasswordInput) {
            passwordInput.addEventListener('input', () => {
                this.validatePasswordMatch();
            });

            confirmPasswordInput.addEventListener('input', () => {
                this.validatePasswordMatch();
            });
        }
    }

    updatePasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        const strengthText = document.getElementById('passwordText');
        const passwordStrength = document.querySelector('.password-strength');

        if (!password) {
            passwordStrength.style.display = 'none';
            return;
        }

        passwordStrength.style.display = 'block';

        let strength = 0;
        let text = 'Weak';
        let className = 'weak';

        // Length check
        if (password.length >= 8) strength++;
        // Lowercase check
        if (/[a-z]/.test(password)) strength++;
        // Uppercase check
        if (/[A-Z]/.test(password)) strength++;
        // Number check
        if (/[0-9]/.test(password)) strength++;
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength >= 4) {
            text = 'Strong';
            className = 'strong';
        } else if (strength >= 2) {
            text = 'Medium';
            className = 'medium';
        }

        strengthBar.className = `strength-fill ${className}`;
        strengthText.textContent = text;
    }

    validatePasswordMatch() {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorElement = document.getElementById('confirmPasswordError');

        if (confirmPassword && password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.auth-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const user = this.authenticateUser(email, password);
            
            if (user) {
                this.currentUser = user;
                localStorage.setItem('mokshayatra_current_user', JSON.stringify(user));
                
                if (rememberMe) {
                    localStorage.setItem('mokshayatra_remember_me', 'true');
                }

                showToast('Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            // Reset loading state
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.auth-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Validation
        if (!this.validatePasswordMatch()) {
            showToast('Please make sure passwords match', 'error');
            return;
        }

        if (!agreeTerms) {
            showToast('Please agree to the terms and conditions', 'error');
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (this.userExists(email)) {
                throw new Error('User with this email already exists');
            }

            const user = this.createUser({
                firstName,
                lastName,
                email,
                phone,
                password
            });

            this.currentUser = user;
            localStorage.setItem('mokshayatra_current_user', JSON.stringify(user));

            showToast('Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            // Reset loading state
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    authenticateUser(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        return user ? { ...user, password: undefined } : null;
    }

    userExists(email) {
        return this.users.some(u => u.email === email);
    }

    createUser(userData) {
        const user = {
            id: this.generateId(),
            ...userData,
            createdAt: new Date().toISOString(),
            bookings: []
        };

        this.users.push(user);
        localStorage.setItem('mokshayatra_users', JSON.stringify(this.users));

        return { ...user, password: undefined };
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    handleForgotPassword(e) {
        e.preventDefault();
        const email = prompt('Please enter your email address:');
        
        if (email && this.validateEmail(email)) {
            // Simulate password reset email
            showToast('Password reset instructions sent to your email', 'success');
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    }

    handleSocialLogin(e) {
        e.preventDefault();
        const provider = e.target.classList.contains('google-btn') ? 'Google' : 'Facebook';
        showToast(`${provider} login integration coming soon`, 'info');
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('mokshayatra_current_user');
        window.location.href = 'index.html';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
    
    // Redirect to dashboard if already logged in and on auth pages
    const authPages = ['login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (authPages.includes(currentPage) && window.authManager.isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
});