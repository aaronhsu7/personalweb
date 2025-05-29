/* CSS Changes */

/* Add this to your main CSS file */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
}

body.dark-mode {
    --bg-color: #333333;
    --text-color: #ffffff;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}


/* JavaScript Changes */

// Add this to your main JavaScript file
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('darkModeToggle');
    
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    localStorage.setItem('darkMode', isDarkMode);
    
    icon.textContent = isDarkMode ? '🌙' : '☀️';
}

function initDarkMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedDarkMode = localStorage.getItem('darkMode');
    
    if (storedDarkMode === 'true' || (storedDarkMode === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '🌙';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    initDarkMode();
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
});


<!-- HTML Changes -->

<!-- Add this to your navigation bar HTML -->
<button id="darkModeToggle" aria-label="Toggle dark mode">☀️</button>
