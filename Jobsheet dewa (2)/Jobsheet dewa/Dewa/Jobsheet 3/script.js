const btnToggle = document.getElementById('themeToggleBtn');
const body = document.body;

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
    btnToggle.textContent = "Switch to Light Mode";
}

btnToggle.addEventListener('click', () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            btnToggle.textContent = "Switch to Dark Mode";
        } else {
            btnToggle.textContent = "Switch to Light Mode";
        }
    } else {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            btnToggle.textContent = "Switch to Light Mode";
        } else {
            btnToggle.textContent = "Switch to Dark Mode"
        }
    }
});