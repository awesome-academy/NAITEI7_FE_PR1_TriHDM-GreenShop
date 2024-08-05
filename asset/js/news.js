document.addEventListener('DOMContentLoaded', function() {
    let translations = {};

    // Function to load data from JSON file
    async function loadData() {
        try {
            const response = await fetch('/asset/locales/db.json');
            const data = await response.json();
            const language = getCurrentLanguage();
            await loadTranslations(language);
            displayNews(data.news);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    function getCurrentLanguage() {
        return localStorage.getItem('language') || 'vi';
    }

    function setLanguage(language) {
        localStorage.setItem('language', language);
        loadData();
    }

    // Function to load translation data from JSON file
    async function loadTranslations(language) {
        try {
            const response = await fetch(`/asset/locales/${language}.json`);
            const data = await response.json();
            translations = data.productFeature.common;
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Function to display news in both sidebar and main content
    function displayNews(newsArray) {
        displayNewsList(newsArray);
        displayNewsItem(newsArray);
    }

    // Function to display news list in the sidebar
    function displayNewsList(newsArray) {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ''; // Clear existing content
        newsArray.forEach(news => {
            const li = document.createElement('li');
            li.className = 'p-0 d-flex';
            li.innerHTML = `
                <div class="news-box align-items-center d-flex">
                    <div class="news-thumbnail">
                        <img src="${news.image}" alt="${news.title}" title="${news.title}">
                    </div>
                    <div class="news-content text-normal-size pl-2 d-flex justify-content-start">
                        <a href="/src/pages/newsDetail.html?id=${news.id}" class="text-normal text-normal-hover text-decoration-none">${news.title}</a>
                    </div>
                </div>
            `;
            newsList.appendChild(li);
        });
    }

    function displayNewsItem(newsArray) {
        const newsView = document.querySelector('.news-view .news-list');
        newsView.innerHTML = ''; // Clear existing content
        newsArray.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news mb-5';
            newsItem.innerHTML = `
                <div class="news-title ">
                    <h2><a href="/src/pages/newsDetail.html?id=${news.id}" class="f-30 text-decoration-none font-weight-bold text-normal-hover text-black">${news.title}</a></h2>
                </div>
                <div class="news-info d-flex mt-3">
                    <div>
                        <span class="text-green mr-1"><i class="far fa-calendar-minus" aria-hidden="true"></i></span>
                        <span class="text-normal text-normal-size">${news.date}</span>
                    </div>
                    <div class="ml-4">
                        <span class="text-green mr-1"><i class="far fa-clock" aria-hidden="true"></i></span>
                        <span class="text-normal text-normal-size">${news.time}</span>
                    </div>
                    <div class="ml-4">
                        <span class="text-green mr-1"><i class="far fa-commenting" aria-hidden="true"></i></span>
                        <span class="text-normal text-normal-size">${news.comment} Bình luận</span>
                    </div>
                </div>
                <div class="news-img mt-3">
                    <img src="${news.image}" alt="${news.title}" title="${news.title}">
                </div>
                <div class="new-demo-description mt-4">
                    <div class="text-normal text-normal-size">${news.description}</div>
                </div>
            `;
            newsView.appendChild(newsItem);
        });
    }

    // Event handler for language change
    document.querySelectorAll('.language-switcher').forEach(button => {
        button.addEventListener('click', function() {
            const language = this.dataset.language;
            setLanguage(language);
        });
    });

    // Load data on page load
    loadData();
});
