function initGallery() {
    const gallerySlider = document.querySelector('.gallery-slider');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');

    const galleryData = [
        { src: 'assets/images/temple.jpeg', title: 'Vishnupad Temple', desc: 'Holy Shrine of Lord Vishnu' },
        { src: 'assets/images/charan 2.jpeg', title: 'Charan Paduka', desc: 'Footprint of Lord Vishnu' },
        { src: 'assets/images/temple 2.jpg', title: 'Vishnupad Temple', desc: 'Upper View Of Vishnupad Temple' },
        { src: 'assets/images/temple 3.webp', title: 'VishnuPad Temple', desc: 'Side View Of Vishnupad Temple' },
        { src: 'assets/images/temple 4.webp', title: 'Piller', desc: 'Inside The Temple' },
        { src: 'assets/images/temple 5.webp', title: 'CharnaMitra', desc: '🙏' },
        { src: 'assets/images/inside temple.jpg', title: 'Inner Sanctum', desc: 'Spiritual core of the shrine' },
        { src: 'assets/images/charan.jpg', title: 'Bhagwan Vishnu Charan', desc: 'Holy footprints of divinity' },
        { src: 'assets/images/ss3.png', title: 'Sharad puja', desc: 'Sharad Puja' },
        { src: 'assets/images/3.webp', title: 'Sharad Puja', desc: 'River Puja' },
        { src: 'assets/images/4.webp', title: 'Sharad Puja Ritual', desc: 'Spiritual Ritual' },
        { src: 'assets/images/5.jpg', title: 'Sharad Ritual', desc: 'Ritual Puja' },
        { src: 'assets/images/ss1.png', title: 'Bhagwan Statue', desc: 'Bhagwan Vishnu Statue' },
        { src: 'assets/images/7.jpeg', title: 'Ritual', desc: 'Sharad Ritual' },
        { src: 'assets/images/8.jpeg', title: 'Ritual', desc: 'Sharad Ritual' },
        { src: 'assets/images/33.avif', title: 'River Ritual', desc: 'River Puja Ritual' },
        { src: 'assets/images/ss2.png', title: 'FootPrint', desc: 'Bhagwan Vishnu Footprint' },
        { src: 'assets/images/ss4.png', title: 'Bhagwan Darshan', desc: 'Bhagwan Vishnu Darshan' },
        { src: 'assets/images/ss5.png', title: 'Temple', desc: 'Full Temple View' },
        { src: 'assets/images/11.jpg', title: 'Public', desc: 'Public View' },
        { src: 'assets/images/manglaGauri.jpg', title: 'Mangla Gauri Temple', desc: 'Shakti Peetha of Maa Gauri' },
        { src: 'assets/images/bharayonihill.jpg', title: 'Brahmayoni Hill', desc: 'Sacred meditation site' },
        { src: 'assets/images/surya-kund.jpg', title: 'Surya Kund', desc: 'Dedicated to Sun God' },
        { src: 'assets/images/pretshila.jpg', title: 'Pretshila Hill', desc: 'Ritual site for peace of souls' },
        { src: 'assets/images/gaya-falgu-river.jpg', title: 'Falgu River', desc: 'Sacred river near Vishnupad' },
        { src: 'assets/images/aarti.jpg', title: 'Evening Aarti', desc: 'Devotional lamp ceremony' },
        { src: 'assets/images/mahabodhi.png', title: 'Gaya Mahabodhi View', desc: 'Peaceful Buddhist-Hindu harmony' },
        { src: 'assets/images/bhatt.jpg', title: 'Akshay Vat', desc: 'Indestructible Banyan Tree' },
        { src: 'assets/images/sitakund.jpeg', title: 'Sita Kund', desc: 'Sacred pond of Goddess Sita' },
    ];

    // Populate gallery
    galleryData.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="overlay">
                <h3>${item.title}</h3>
                <span>${item.desc}</span>
            </div>
        `;
        gallerySlider.appendChild(div);
    });

    // Button navigation
    prevButton.addEventListener('click', () => {
        gallerySlider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    nextButton.addEventListener('click', () => {
        gallerySlider.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Auto-slide
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            gallerySlider.scrollBy({ left: 300, behavior: 'smooth' });
            if (gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth) {
                setTimeout(() => gallerySlider.scrollTo({ left: 0, behavior: 'smooth' }), 1000);
            }
        }, 4000);
    }
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();
    gallerySlider.addEventListener('mouseenter', stopAutoSlide);
    gallerySlider.addEventListener('mouseleave', startAutoSlide);
}

document.addEventListener('DOMContentLoaded', initGallery);
