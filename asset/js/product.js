document.addEventListener("DOMContentLoaded", function() {
    let translations = {};

    // Hàm để tải dữ liệu từ db.json
    function loadData() {
        fetch('/asset/locales/db.json')
            .then(response => response.json())
            .then(data => {
                const language = getCurrentLanguage();
                loadTranslations(language)
                    .then(() => displayProducts(data.product));
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
        displayProductsGrid(products);
        displayProductsList(products);
    }

    // Hàm để hiển thị sản phẩm dạng lưới
    function displayProductsGrid(products) {
        const productContainer = document.querySelector('.products-view-grid .row');
        productContainer.innerHTML = '';
        products.forEach(product => {
            let tagHtml = '';
            switch (product.tag) {
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

            const productHtml = `
                <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 product-col mt-4">
                    <div class="item_product_main itemcustome margin-bottom-0">
                        <div class="product-box position-relative text-center">
                            <div class="product-thumbnail">
                                <a class="image_thumb p_img image_grande" href="${createHref(product)}" title="${product.title}">
                                    <img class="lazyload loaded" src="${product.image}" alt="${product.alt}" data-was-processed="true">
                                </a>
                                ${tagHtml}
                                <a class="product-overlay" href="${createHref(product)}" title="${product.title}"></a>
                                <div class="product-action clearfix">
                                    <form action="/cart/add" method="post" class="variants form-nut-grid" data-id="product-actions-${product.id}" enctype="multipart/form-data">
                                        <div class="group_action">
                                            <input type="hidden" name="variantId" value="${product.id}">
                                            <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart" title="${translations.buyNow}" data-translate="productFeature.common.buyNow"></button>
                                            <a title="Xem nhanh" href="${createHref(product)}" data-handle="${product.title.replace(/\s+/g, '-').toLowerCase()}" class="bordedr-button-normal btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm">
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
                                    ${getRatingStars(product.rating)}
                                </div>
                                <div class="price-box">
                                    <span class="price">${product.price}</span>
                                    <span class="compare-price">${product['comparePrice']}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHtml;
        });
    }

    // Hàm để hiển thị sản phẩm dạng danh sách
    function displayProductsList(products) {
        const productContainer = document.querySelector('.products-view-list .row');
        productContainer.innerHTML = '';
        products.forEach(product => {
            let tagHtml = '';
            switch (product.tag) {
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

            const productHtml = `
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4">
                    <div class="item-product">
                        <div class="product-box-mini d-flex">
                            <div class="product-image">
                                <a class="image_thumb p_img image_grande" href="${createHref(product)}" title="${product.title}">
                                    <img class="lazyload loaded" src="${product.image}" alt="${product.alt}" data-was-processed="true">
                                </a>
                                ${tagHtml}
                            </div>
                            <div class="product-info padding-left-30">
                                <h3 class="product-name">
                                    <a href="${createHref(product)}" title="${product.title}" class="text-dark">${product.name}</a>
                                </h3>
                                <div class="product-rating">
                                    ${getRatingStars(product.rating)}
                                </div>
                                <div class="product-description mt-2">
                                    <span class="text-normal text-normal-size">${product.description}</span>
                                </div>
                                <div class="price-box">
                                    <span class="price">${product.price}</span>
                                </div>
                                <div class="product-button d-flex justify-content-start mt-2">
                                    <button class="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart mr-3" title="${translations.buyNow}" data-translate="productFeature.common.buyNow"></button>
                                    <a title="Xem nhanh" href="${createHref(product)}" data-handle="${product.title.replace(/\s+/g, '-').toLowerCase()}" class="quick-view btn-circle btn_view btn right-to hidden-xs hidden-sm border-button-normal mr-3">
                                        <i class="fas fa-search"></i>
                                    </a>
                                    <a title="Yêu thích" class="quick-view border-button-normal btn-circle btn_view btn right-to hidden-xs hidden-sm border-normal">
                                        <i class="fas fa-heart"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHtml;
        });
    }

    // Hàm để tạo sao đánh giá
    function getRatingStars(rating) {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push('<i class="fas fa-star"></i>');
        }
        if (halfStar) {
            stars.push('<i class="fas fa-star-half-alt"></i>');
        }
        for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
            stars.push('<i class="far fa-star"></i>');
        }
        return stars.join('');
    }

    // Xử lý sự kiện thay đổi ngôn ngữ
    document.querySelectorAll('.language-switcher').forEach(button => {
        button.addEventListener('click', function() {
            const language = this.dataset.language;
            setLanguage(language);
        });
    });

    // Tải dữ liệu khi trang được tải xong
    loadData();
});
