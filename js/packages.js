// Packages and booking functionality
function initPackages() {
    const modal = document.getElementById('booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    const bookingForm = document.getElementById('booking-form');
    const planSelect = document.getElementById('plan');

    // Open modal when selecting a plan
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            if (planSelect) {
                planSelect.value = plan;
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically integrate with EmailJS
            // For now, we'll show a success message
            showToast('Your booking request has been submitted successfully! We will contact you soon.', 'success');
            
            // Reset form and close modal
            bookingForm.reset();
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Add hover effects to package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}