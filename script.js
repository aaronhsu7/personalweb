// Activate Menu Button //
let menuBtn = document.querySelector('#menu-btn');
let menuBar = document.querySelector('.menu-bar');

menuBtn.onclick = () => {
    menuBtn.classList.toggle('bx-x');
    menuBar.classList.toggle('active');
}

// lets remove menu-bar on scroll //

window.onscroll = () => {
    menuBtn.classList.remove('bx-x');
    menuBar.classList.remove('active');
}

// Scroll Reveal //

ScrollReveal({
    reset: true,
    distance: '100px',
    duration: 2000,
    delay:200
});

ScrollReveal().reveal('.home-bio h1, .about-resume', {origin: 'left'});
ScrollReveal().reveal('.home-bio p', {origin: 'right'});
ScrollReveal().reveal('.home-bio, heading', {origin: 'top'});
ScrollReveal().reveal('.profile-pic, .about-items, .skills-items, .projects-items, .form ', {origin: 'bottom'});

// <!-- Typing Animation -->//

const animText = new Typed ('.animated-text', {
    strings: ['Student', 'Athlete', 'Leader'],
    backSpeed: 100,
    typeSpeed: 100,
    backDelay: 600,
    loop: true
});

// Theme Toggle Functionality //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check if theme toggle exists on this page
    if (!themeToggle) {
        console.log('Theme toggle not found on this page');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    if (!themeIcon) {
        console.log('Theme icon not found');
        return;
    }

    // Check for saved theme preference or default to 'dark'
    let currentTheme = 'dark';
    try {
        currentTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
        console.log('localStorage not available, using default theme');
    }

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'bx bx-sun';
        } else {
            body.removeAttribute('data-theme');
            themeIcon.className = 'bx bx-moon';
        }
    }

    // Set initial theme
    applyTheme(currentTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const isLight = body.getAttribute('data-theme') === 'light';
        
        // Add a subtle scale animation during transition
        themeIcon.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (isLight) {
                // Switch to dark mode
                applyTheme('dark');
                try {
                    localStorage.setItem('theme', 'dark');
                } catch (e) {
                    console.log('localStorage not available');
                }
            } else {
                // Switch to light mode
                applyTheme('light');
                try {
                    localStorage.setItem('theme', 'light');
                } catch (e) {
                    console.log('localStorage not available');
                }
            }
            themeIcon.style.transform = 'scale(1)';
        }, 150);
    });
});

// Also apply theme immediately (fallback for pages without DOMContentLoaded)
if (document.readyState === 'loading') {
    // Document still loading, wait for DOMContentLoaded
} else {
    // Document already loaded, apply theme immediately
    applyThemeImmediate();
}

function applyThemeImmediate() {
    const body = document.body;
    let currentTheme = 'dark';
    
    try {
        currentTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
        console.log('localStorage not available, using default theme');
    }
    
    // Apply theme to body immediately
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
    } else {
        body.removeAttribute('data-theme');
    }
}

// Photography Interactive Effects (Push Away Animation)
document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    if (photoItems.length === 0) {
        return; // Not on photography page
    }
    
    console.log(`Setting up push away effects for ${photoItems.length} photos`);
    
    // Add interaction effects to each photo item
    photoItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Apply push effects to adjacent images
            const itemsPerRow = 3;
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
            
            // Push left neighbor
            if (col > 0) {
                const leftNeighbor = photoItems[index - 1];
                if (leftNeighbor && !leftNeighbor.matches(':hover')) {
                    leftNeighbor.style.transform = 'translateX(-15px) scale(0.96)';
                    leftNeighbor.style.transition = 'transform 0.25s ease-out';
                }
            }
            
            // Push right neighbor
            if (col < itemsPerRow - 1 && photoItems[index + 1]) {
                const rightNeighbor = photoItems[index + 1];
                if (!rightNeighbor.matches(':hover')) {
                    rightNeighbor.style.transform = 'translateX(15px) scale(0.96)';
                    rightNeighbor.style.transition = 'transform 0.25s ease-out';
                }
            }
            
            // Push top neighbor
            if (row > 0) {
                const topNeighbor = photoItems[index - itemsPerRow];
                if (topNeighbor && !topNeighbor.matches(':hover')) {
                    topNeighbor.style.transform = 'translateY(-10px) scale(0.96)';
                    topNeighbor.style.transition = 'transform 0.25s ease-out';
                }
            }
            
            // Push bottom neighbor
            if (photoItems[index + itemsPerRow]) {
                const bottomNeighbor = photoItems[index + itemsPerRow];
                if (!bottomNeighbor.matches(':hover')) {
                    bottomNeighbor.style.transform = 'translateY(10px) scale(0.96)';
                    bottomNeighbor.style.transition = 'transform 0.25s ease-out';
                }
            }
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset transforms for adjacent items with a slight delay
            setTimeout(() => {
                const itemsPerRow = 3;
                const row = Math.floor(index / itemsPerRow);
                const col = index % itemsPerRow;
                
                // Reset neighbors if they're not being hovered
                const neighbors = [];
                if (col > 0) neighbors.push(photoItems[index - 1]);
                if (col < itemsPerRow - 1 && photoItems[index + 1]) neighbors.push(photoItems[index + 1]);
                if (row > 0) neighbors.push(photoItems[index - itemsPerRow]);
                if (photoItems[index + itemsPerRow]) neighbors.push(photoItems[index + itemsPerRow]);
                
                neighbors.forEach(neighbor => {
                    if (neighbor && !neighbor.matches(':hover')) {
                        neighbor.style.transform = '';
                        neighbor.style.transition = 'transform 0.2s ease-out';
                    }
                });
            }, 50); // Small delay to prevent flickering
        });
    });
    
    // Reset all on container mouse leave for better UX
    const photoContainer = document.querySelector('.photo-items');
    if (photoContainer) {
        photoContainer.addEventListener('mouseleave', () => {
            photoItems.forEach(photo => {
                photo.style.transform = '';
                photo.style.transition = 'transform 0.2s ease-out';
            });
        });
    }
});