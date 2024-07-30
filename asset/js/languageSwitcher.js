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
            console.log('Translations loaded:', translations);

            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                const keys = key.split('.');
                let text = translations;

                for (const k of keys) {
                    text = text ? text[k] : undefined;
                    if (text === undefined) break;
                }

                if (text !== undefined) {
                    if (element.tagName.toLowerCase() === 'input' && element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', text);
                        console.log(`Translated placeholder for ${key}: ${text}`);
                    } else {
                        element.textContent = text;
                        console.log(`Translated text for ${key}: ${text}`);
                    }
                } else {
                    console.warn(`Translation key '${key}' not found`);
                    if (element.tagName.toLowerCase() === 'input' && element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', '');
                    } else {
                        element.textContent = '';
                    }
                }
            });
        })
        .catch(error => console.error('Error loading translations:', error));
}
