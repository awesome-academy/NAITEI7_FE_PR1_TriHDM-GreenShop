document.addEventListener('DOMContentLoaded', function() {
    async function loadData() {
        try {
            const response = await fetch('/asset/locales/db.json');
            const data = await response.json();
            const language = getCurrentLanguage();
            await loadTranslations(language);
            displayProductDetail(data.product);
            displayProductSimilar(data.product)
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    function getCurrentLanguage() {
        return localStorage.getItem('language') || 'vi';
    }

    async function loadTranslations(language) {
        try {
            const response = await fetch(`/asset/locales/${language}.json`);
            const data = await response.json();
            translations = data.productFeature.common;
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    function generateRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    function createHref(product) {
        // Chuyển đổi title thành định dạng slug
        const slug = product.title.replace(/\s+/g, '-').toLowerCase();
        
        // Lấy số cuối cùng từ tên hình ảnh
        const imageName = product.image.split('/').pop(); // 'spx2-6.png'
        const number = imageName.match(/-(\d+)\.png$/)[1]; // '6'
        
        // Tạo href
        return `/src/pages/productDetail.html?id=${number}`;
    }

    function displayProductDetail(products) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'), 10);

        const productItem = products.find(p => p.id === productId);
        if (productItem) {
            document.querySelector('.page-title').innerHTML = `${productItem.name}`;

            document.querySelector('.current-address').innerHTML = `<strong><span class="text-green text-normal-size">${productItem.title.replace(/\s+/g, '-').toLowerCase()}</span></strong>`;

            document.querySelector('.main-img').innerHTML = `<img src="${productItem.image}" alt="${productItem.alt}" class="img-main">`;

            const productSubImages = document.querySelectorAll('.sub-img-container');
            productSubImages.forEach(img => {
                img.innerHTML = `<img src="${productItem.image}" alt="${productItem.title}" title="${productItem.title}" class="img-sub">`;
            });

            document.querySelector('.product-info.border-normal').innerHTML = `
                <div class="product-name text-dark">
                    <h3 class="f-16 font-weight-bold">${productItem.name}</h3>
                </div>
                 <div class="product-rating">
                    ${generateRatingStars(productItem.rating)}
                </div>
                <div class="price-box mt-1 mr-2">
                    <span class="price text-red-price mr-2 f-16">${productItem.price}</span>
                    <span class="compare-price f-14 text-normal">${productItem.comparePrice}</span>
                </div>
            `;

            document.querySelector('.product-description').innerHTML = `
                <span class="f-13">${productItem.description}</span>
            `;

            const productInfo = document.querySelectorAll('.content.text-normal.text-normal-size');
            productInfo.forEach(tab => {
                tab.innerHTML = `<p>${productItem.info}</p>`;
            });

            const productDetailContainer = document.querySelector('#product-detail-container');
            if (productDetailContainer) {
                productDetailContainer.innerHTML = productDetailHTML;
            }
        } else {
            console.error('Product not found.');
        }
    }

    function displayProductSimilar(products) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'), 10);

        // Get products with ids from id+1 to id+6
        const similarProducts = products.filter(p => p.id >= productId + 1 && p.id <= productId + 8);

        const carouselInner = document.querySelector('#newsCarousel .carousel-inner');
        if (carouselInner) {
            // Clear existing carousel items
            carouselInner.innerHTML = '';

            // Split products into chunks for carousel slides
            const chunks = chunkArray(similarProducts, 4);
            
            chunks.forEach((chunk, index) => {
                const isActive = index === 0 ? 'active' : '';
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${isActive}`;
                carouselItem.innerHTML = `
                    <div class="row">
                        ${chunk.map(product => `
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <div class="item_product_main itemcustome margin-bottom-0 border-button-normal">
                                    <div class="product-box position-relative text-center bg-white">
                                        <div class="product-thumbnail">
                                            <a class="image_thumb p_img image_grande" href="${createHref(product)}" title="${product.alt}">
                                                <img class="lazyload loaded" src="${product.image}" alt="${product.alt}" data-was-processed="true">
                                            </a>
                                            <div class="discount-tag d-flex text-white position-absolute left-30 padding-5" data-translate="productFeature.common.discountTag-25"></div>
                                            <a class="product-overlay" href="${createHref(product)}" title="${product.name}"></a>
                                            <div class="product-action clearfix">
                                                <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${product.id}" enctype="multipart/form-data">
                                                    <div class="group_action">
                                                        <input type="hidden" name="variantId" value="${product.id}">
                                                        <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                                        <a title="Xem nhanh" href="${createHref(product)}" data-handle="${product.name.toLowerCase().replace(/\s+/g, '-')}" class="xem_nhanh btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                            <i class="fas fa-search"></i>
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="product-info">
                                            <h3 class="product-name">
                                                <a href="${createHref(product)}" title="${product.name}">${product.name}</a>
                                            </h3>
                                            <div class="product-rating">
                                                ${generateRatingStars(product.rating)}
                                            </div>
                                            <div class="price-box">
                                                <span class="price">${product.price}</span>
                                                <span class="compare-price">${product.comparePrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                carouselInner.appendChild(carouselItem);
            });
        } else {
            console.error('Carousel inner container not found.');
        }
    }

    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    // Load data on page load
    loadData();
});
