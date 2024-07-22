function setupLanguageSwitcher() {
    const select = document.getElementById('language-select');
    select.addEventListener('change', () => {
        const lang = select.value;
        localStorage.setItem('language', lang);
        translatePage();
    });

    const savedLang = localStorage.getItem('language') || 'vi'; // Mặc định là 'vi'
    select.value = savedLang;
    translatePage();
}

function translatePage() {
    const lang = localStorage.getItem('language') || 'vi';
    fetch(`/asset/locales/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                const keys = key.split('.');
                let text = translations;

                // Tìm giá trị tương ứng với khóa
                for (const k of keys) {
                    text = text ? text[k] : undefined;
                    if (text === undefined) break;
                }

                if (text !== undefined) {
                    element.textContent = text;
                } else {
                    console.warn(`Translation key '${key}' not found`);
                    element.textContent = ''; // Hoặc một thông báo khác nếu cần
                }
            });
        })
        .catch(error => console.error('Error loading translations:', error));
}
