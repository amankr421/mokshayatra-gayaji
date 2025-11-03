// Celebrity Carousel - Simple Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const cards = document.querySelectorAll('.celebrity-card');
    
    if (!carouselContainer || !prevBtn || !nextBtn) return;
    
    let currentScroll = 0;
    const cardWidth = 300; // Match your CSS card width (300px + gap)
    const gap = 40; // Match your CSS gap
    const scrollAmount = cardWidth + gap;
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
        currentScroll = Math.min(currentScroll + scrollAmount, maxScroll);
        carouselContainer.scrollTo({
            left: currentScroll,
            behavior: 'smooth'
        });
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        currentScroll = Math.max(currentScroll - scrollAmount, 0);
        carouselContainer.scrollTo({
            left: currentScroll,
            behavior: 'smooth'
        });
    });
    
    // Update button states based on scroll position
    function updateButtonStates() {
        const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
        
        // Disable prev button at start
        prevBtn.style.opacity = currentScroll <= 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentScroll <= 0 ? 'not-allowed' : 'pointer';
        
        // Disable next button at end
        nextBtn.style.opacity = currentScroll >= maxScroll ? '0.5' : '1';
        nextBtn.style.cursor = currentScroll >= maxScroll ? 'not-allowed' : 'pointer';
    }
    
    // Listen to scroll events to update button states
    carouselContainer.addEventListener('scroll', function() {
        currentScroll = carouselContainer.scrollLeft;
        updateButtonStates();
    });
    
    // Initial button state update
    updateButtonStates();
    
    // Optional: Auto-scroll every 5 seconds
    let autoScrollInterval = setInterval(() => {
        const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
        if (currentScroll >= maxScroll) {
            currentScroll = 0;
            carouselContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            nextBtn.click();
        }
    }, 5000);
    
    // Pause auto-scroll on hover
    carouselContainer.addEventListener('mouseenter', function() {
        clearInterval(autoScrollInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        autoScrollInterval = setInterval(() => {
            const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
            if (currentScroll >= maxScroll) {
                currentScroll = 0;
                carouselContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                nextBtn.click();
            }
        }, 5000);
    });
});