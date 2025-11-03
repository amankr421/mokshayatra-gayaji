// Contact form functionality
function initContact() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showToast('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            
            // Here you would typically integrate with EmailJS
            // For now, we'll show a success message
            showToast('Your message has been sent successfully! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize EmailJS (you would replace with your actual credentials)
    emailjs.init("your_user_id_here");
}