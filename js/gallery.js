// Gallery functionality
function initGallery() {
    const gallerySlider = document.querySelector('.gallery-slider');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    // Sample gallery images (in production, these would come from a server)
    const galleryImages = [
        'assets/images/temple.jpeg',
        'assets/images/charan 2.jpeg',
        'assets/images/temple 2.jpg',
        'assets/images/temple 3.webp',
        'assets/images/temple 4.webp',
        'assets/images/temple 5.webp',
        'assets/images/inside temple.jpg',
        'assets/images/charan.jpg',
        'assets/images/ss3.png',
        'assets/images/3.webp',
        'assets/images/4.webp',
        'assets/images/5.jpg',
        'assets/images/ss1.png',
        'assets/images/7.jpeg',
        'assets/images/8.jpeg',
        'assets/images/33.avif',
        'assets/images/ss2.png',
        'assets/images/ss4.png',
        'assets/images/ss5.png',
        'assets/images/11.jpg',
    ];
    
    // Populate gallery with images
    if (gallerySlider) {
        galleryImages.forEach((imageSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${imageSrc}" alt="Gaya Ji Gallery ${index + 1}" loading="lazy">
            `;
            gallerySlider.appendChild(galleryItem);
        });
    }
    
    // Gallery navigation
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            gallerySlider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', function() {
            gallerySlider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
    
    // Auto-slide gallery
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (gallerySlider) {
                gallerySlider.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
                
                // Reset to start if at end
                if (gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth) {
                    setTimeout(() => {
                        gallerySlider.scrollTo({
                            left: 0,
                            behavior: 'smooth'
                        });
                    }, 3000);
                }
            }
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    if (gallerySlider) {
        gallerySlider.addEventListener('mouseenter', stopAutoSlide);
        gallerySlider.addEventListener('mouseleave', startAutoSlide);
    }
}