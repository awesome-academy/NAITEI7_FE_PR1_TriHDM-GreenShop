document.addEventListener("DOMContentLoaded", function() {
    let translations = {};

    // Hàm để tải dữ liệu từ db.json
    function loadData() {
        fetch('/asset/locales/db.json')
            .then(response => response.json())
            .then(data => {
                const language = getCurrentLanguage();
                loadTranslations(language)
                .then(() => {
                    displayProducts(data.productFeature);
                    displayProductsBestSale(data.productFeature);
                    displayProductsDeal(data.productDeal);
                    displayProductsNew(data.productDeal);
                    displayNewHome(data.news);
                });
            });
    }

    function getCurrentLanguage() {
        return localStorage.getItem('language');
    }

    function setLanguage(language) {
        localStorage.setItem('language', language);
        loadData();
    }

    // Hàm để tải dữ liệu dịch thuật từ file JSON
    function loadTranslations(language) {
        return fetch(`/asset/locales/${language}.json`)
            .then(response => response.json())
            .then(data => {
                translations = data.productFeature.common;
            });
    }

    function getTagHtml(tag, translations) {
        let tagHtml = '';
        switch (tag) {
            case 'newTag':
                tagHtml = `<div class="new-tag bg-green d-flex text-white position-absolute left-30 padding-5">${translations.newTag}</div>`;
                break;
            case 'discountTag-25':
                tagHtml = `<div class="discount-tag d-flex text-white position-absolute left-30 padding-5">${translations['discountTag-25']}</div>`;
                break;
            case 'discountTag-50':
                tagHtml = `<div class="discount-tag d-flex text-white position-absolute left-30 padding-5">${translations['discountTag-50']}</div>`;
                break;
            default:
                tagHtml = '';
        }
        return tagHtml;
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

    // Hàm để hiển thị sản phẩm
    function displayProducts(products) {
        const productContainer = document.querySelector('.product-feature .module-content.d-flex');
        let productHTML = '';
    
        // Create HTML structure for the first column
        productHTML += `
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="product-box product-item-compare">
                    <div class="product-thumbnail">
                        <a class="image_thumb p_img image_grande" href="${createHref(products[0])}" title="${products[0].title}">
                            <img class="lazyload loaded" src="${products[0].image}" alt="${products[0].name}" data-was-processed="true">
                        </a>
                        ${getTagHtml(products[0].tag, translations)}
                        <a class="product-overlay" href="${createHref(products[0])}" title="${products[0].title}"></a>
                        <div class="product-action clearfix">
                            <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${products[0].id}" enctype="multipart/form-data">
                                <div class="group_action">
                                    <input type="hidden" name="variantId" value="${products[0].id}">
                                    <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                    <a title="Xem nhanh" href="${createHref(products[0])}" data-handle="${products[0].name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                        <i class="fas fa-search"></i>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">
                            <a href="${createHref(products[0])}" title="${products[0].title}">${products[0].name}</a>
                        </h3>
                        <div class="product-rating">
                            ${generateRatingStars(products[0].rating)}
                        </div>
                        <div class="price-box">
                            <span class="price">${products[0].price}</span>
                            <span class="compare-price">${products[0].comparePrice}</span>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-box">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(products[1])}" title="${products[1].title}">
                                    <img class="lazyload loaded" src="${products[1].image}" alt="${products[1].name}" data-was-processed="true">
                                </a>
                                ${getTagHtml(products[1].tag, translations)}
                                <a class="product-overlay" href="${createHref(products[1])}" title="${products[1].title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${products[1].id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${products[1].id}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(products[1])}" data-handle="${products[1].name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(products[1])}" title="${products[1].title}">${products[1].name}</a>
                                </h3>
                                <div class="product-rating">
                                    ${generateRatingStars(products[1].rating)}
                                </div>
                                <div class="price-box">
                                    <span class="price">${products[1].price}</span>
                                    <span class="compare-price">${products[1].comparePrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-box">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(products[2])}" title="${products[2].title}">
                                    <img class="lazyload loaded" src="${products[2].image}" alt="${products[2].name}" data-was-processed="true">
                                </a>
                                ${getTagHtml(products[2].tag, translations)}
                                <a class="product-overlay" href="${createHref(products[2])}" title="${products[2].title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${products[2].id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${products[2].id}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(products[2])}" data-handle="${products[2].name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(products[2])}" title="${products[2].title}">${products[2].name}</a>
                                </h3>
                                <div class="product-rating">
                                    ${generateRatingStars(products[2].rating)}
                                </div>
                                <div class="price-box">
                                    <span class="price">${products[2].price}</span>
                                    <span class="compare-price">${products[2].comparePrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // Create HTML structure for the second column
        productHTML += `
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-box product-item-compare">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(products[3])}" title="${products[3].title}">
                                    <img class="lazyload loaded" src="${products[3].image}" alt="${products[3].name}" data-was-processed="true">
                                </a>
                                ${getTagHtml(products[3].tag, translations)}
                                <a class="product-overlay" href="${createHref(products[3])}" title="${products[3].title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${products[3].id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${products[3].id}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(products[3])}" data-handle="${products[3].name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(products[3])}" title="${products[3].title}">${products[3].name}</a>
                                </h3>
                                <div class="product-rating">
                                    ${generateRatingStars(products[3].rating)}
                                </div>
                                <div class="price-box">
                                    <span class="price">${products[3].price}</span>
                                    <span class="compare-price">${products[3].comparePrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div class="product-box">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(products[4])}" title="${products[4].title}">
                                    <img class="lazyload loaded" src="${products[4].image}" alt="${products[4].name}" data-was-processed="true">
                                </a>
                                ${getTagHtml(products[4].tag, translations)}
                                <a class="product-overlay" href="${createHref(products[4])}" title="${products[4].title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${products[4].id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${products[4].id}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(products[4])}" data-handle="${products[4].name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(products[4])}" title="${products[4].title}">${products[4].name}</a>
                                </h3>
                                <div class="product-rating">
                                    ${generateRatingStars(products[4].rating)}
                                </div>
                                <div class="price-box">
                                    <span class="price">${products[4].price}</span>
                                    <span class="compare-price">${products[4].comparePrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                        <div class="product-box">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(products[5])}" title="${products[5].title}">
                                    <img class="lazyload loaded" src="${products[5].image}" alt="${products[5].name}" data-was-processed="true">
                                </a>
                                ${getTagHtml(products[5].tag, translations)}
                                <a class="product-overlay" href="${createHref(products[5])}" title="${products[5].title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${products[5].id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${products[5].id}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(products[5])}" data-handle="${products[5].name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(products[5])}" title="${products[5].title}">${products[5].name}</a>
                                </h3>
                                <div class="product-rating">
                                    ${generateRatingStars(products[5].rating)}
                                </div>
                                <div class="price-box">
                                    <span class="price">${products[5].price}</span>
                                    <span class="compare-price">${products[5].comparePrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        productContainer.innerHTML = productHTML;
    }

    function displayProductsBestSale(products) {
        const bestSaleContainer = document.querySelector('.product-bestsale .row');
    
        let bestSaleHTML = '';
    
        // Tạo HTML cho các sản phẩm
        products.forEach(product => {
            bestSaleHTML += `
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="item-product">
                        <div class="product-box-mini d-flex">
                            <div class="product-image">
                                <a class="image_thumb p_img image_grande" href="${createHref(product)}" title="${product.title}">
                                    <img class="lazyload loaded" src="${product.image}" alt="${product.alt}" data-was-processed="true">
                                </a>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    
        // Chèn HTML vào container
        bestSaleContainer.innerHTML = bestSaleHTML;
    }

    function displayProductsDeal(products) {
        const dealContainer = document.querySelector('#swiper-wrapper-1');
    
        let dealHTML = '';
    
        // Tạo HTML cho các sản phẩm
        products.forEach(product => {
            dealHTML += `
                <div class="item swiper-slide mt-5">
                    <div class="item_product_main itemcustome best_sale margin-bottom-0">
                        <div class="product-box">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(product)}" title="${product.title}">
                                    <img class="lazyload loaded" src="${product.image}" alt="${product.alt}" data-was-processed="true">
                                </a>
                                ${getTagHtml(product.tag, translations)}
                                <a class="product-overlay" href="${createHref(product)}" title="${product.title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${product.id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${product.variantId}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(product)}" data-handle="${product.name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(product)}" title="${product.title}">${product.name}</a>
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
            `;
        });
    
        // Chèn HTML vào container
        dealContainer.innerHTML = dealHTML;
    }

    function displayProductsNew(products) {
        const newContainer = document.querySelector('#swiper-wrapper-2');
    
        let newHTML = '';
    
        // Tạo HTML cho các sản phẩm
        products.forEach(product => {
            newHTML += `
                <div class="item swiper-slide mt-5">
                    <div class="item_product_main itemcustome best_sale margin-bottom-0">
                        <div class="product-box">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(product)}" title="${product.title}">
                                    <img class="lazyload loaded" src="${product.image}" alt="${product.alt}" data-was-processed="true">
                                </a>
                                <div class="new-tag d-flex text-white position-absolute left-30 padding-5" data-translate="productFeature.common.newTag"></div>
                                <a class="product-overlay" href="${createHref(product)}" title="${product.title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" data-cart-form="" class="variants form-nut-grid" data-id="product-actions-${product.id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${product.variantId}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="mua ngay" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(product)}" data-handle="${product.name.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
                                                <i class="fas fa-search"></i>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">
                                    <a href="${createHref(product)}" title="${product.title}">${product.name}</a>
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
            `;
        });
    
        // Chèn HTML vào container
        newContainer.innerHTML = newHTML;
    }

    function displayNewHome(news) {
        const newsCarouselInner = document.querySelector('#newsCarouselInner');
        const newsCarouselIndicators = document.querySelector('#newsCarouselIndicators');
        
        // Chia dữ liệu thành các phần tử carousel-item
        const chunkSize = 3;
        const chunks = [];
        
        for (let i = 0; i < news.length; i += chunkSize) {
            chunks.push(news.slice(i, i + chunkSize));
        }
    
        let carouselHTML = '';
        let indicatorsHTML = '';
        
        chunks.forEach((chunk, index) => {
            const isActive = index === 0 ? 'active' : '';
            indicatorsHTML += `<li data-target="#newsCarousel" data-slide-to="${index}" class="${isActive}"></li>`;
            
            carouselHTML += `
                <div class="carousel-item ${isActive}">
                    <div class="row">
            `;
            
            chunk.forEach(item => {
                carouselHTML += `
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 p-0">
                        <div class="news-tag">
                            <div class="news-image">
                                <a href="newsDetail.html?id=${item.id}" title="${item.title}">
                                    <img class="img-reponsive lazyload loaded" src="${item.image}" alt="${item.title}">
                                </a>
                            </div>
                        <div class="news-time mt-2">
                            <time>${item.date}, ${item.time}</time>
                        </div>
                        <div class="news-title mt-2">
                            <a href="newsDetail.html?id=${item.id}" title="${item.title}">${item.title}</a>
                        </div>
                        <div class="news-description mt-2">
                            <p>${item.description}</p>
                        </div>
                        <div class="read-more">
                            <a href="newsDetail.html?id=${item.id}" data-translate="homeNew.common">Đọc thêm</a>
                        </div>
                    </div>
                </div>
            `;

            });
    
            carouselHTML += `
                    </div>
                </div>
            `;
        });
    
        // Chèn HTML vào carousel-inner và carousel-indicators
        newsCarouselInner.innerHTML = carouselHTML;
        newsCarouselIndicators.innerHTML = indicatorsHTML;
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

    // Xử lý sự kiện thay đổi ngôn ngữ
    document.querySelectorAll('.language-switcher').forEach(button => {
        button.addEventListener('click', function() {
            const language = this.dataset.language;
            setLanguage(language);
        });
    });

    loadData();
});