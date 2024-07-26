document.addEventListener('DOMContentLoaded', () => {
    loadHTML('/src/layouts/header.html', 'header-placeholder', '/asset/css/header.css');
    loadHTML('/src/layouts/footer.html', 'footer-placeholder', '/asset/css/footer.css');
    
    // Initialize the carousel after HTML has been loaded
    initializeCarousel();
});

function loadHTML(filename, elementId, cssFile = null) {
    fetch(filename)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (cssFile) {
                loadCSS(cssFile);
            }

            // Add languageSwitcher script
            setupLanguageSwitcher();
        })
        .catch(error => console.error('Error loading file:', error));
}

function loadCSS(filename) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filename;
    document.head.appendChild(link);
}

function initializeCarousel() {
    const $carousel = $('#newsCarousel');
    const itemsPerSlide = 3; // Number of items to display at a time
    const autoSlideInterval = 3000; // Auto-slide interval in milliseconds

    function moveToNextSlide() {
        const $items = $carousel.find('.carousel-item');
        const totalItems = $items.length;
        const activeIndex = $items.index($items.filter('.active'));
        let nextIndex = (activeIndex + 1) % (totalItems);

        // Update active classes
        $items.removeClass('active');
        $items.eq(nextIndex).addClass('active');
    }

    function moveToPreviousSlide() {
        const $items = $carousel.find('.carousel-item');
        const totalItems = $items.length;
        const activeIndex = $items.index($items.filter('.active'));
        let prevIndex = (activeIndex - 1 + totalItems) % (totalItems);

        // Update active classes
        $items.removeClass('active');
        $items.eq(prevIndex).addClass('active');
    }

    // Initialize carousel with custom behavior
    $carousel.carousel({
        interval: false // Disable Bootstrap's auto sliding
    });

    // Set up auto-slide
    setInterval(moveToNextSlide, autoSlideInterval);

    // Add event listeners for controls
    $carousel.find('.carousel-control-next').on('click', moveToNextSlide);
    $carousel.find('.carousel-control-prev').on('click', moveToPreviousSlide);
}

function switchView(view) {
    var gridSection = document.querySelector('.products-view-grid');
    var listSection = document.querySelector('.products-view-list');
    var gridButton = document.querySelector('.view-mode-grid');
    var listButton = document.querySelector('.view-mode-list');
    
    if (view === 'grid') {
        gridSection.style.display = 'block';
        listSection.style.display = 'none';
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    } else if (view === 'list') {
        gridSection.style.display = 'none';
        listSection.style.display = 'block';
        gridButton.classList.remove('active');
        listButton.classList.add('active');
    }
}
