document.addEventListener('DOMContentLoaded', () => {
    loadHTML('/src/layouts/header.html', 'header-placeholder', '/asset/css/header.css');
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
