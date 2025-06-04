// Theme implementation - Apply immediately
(function() {
    // Get saved theme (before DOM is ready)
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
        }
    } catch (e) {
        console.error('Error accessing localStorage:', e);
    }
})();

// Wait for DOM to be loaded and set up all interactions
document.addEventListener('DOMContentLoaded', function() {
    // Setup menu toggle
    const menuBtn = document.querySelector('#menu-btn');
    const menuBar = document.querySelector('.menu-bar');

    if (menuBtn && menuBar) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('bx-x');
            menuBar.classList.toggle('active');
        }

        // Remove menu-bar on scroll
        window.onscroll = () => {
            menuBtn.classList.remove('bx-x');
            menuBar.classList.remove('active');
        }
    }

    // Set up theme toggle functionality
    setupThemeToggle();
    
    // Set up scroll reveal animations
    setupScrollReveal();
    
    // Set up typing animation
    setupTypingAnimation();
    
    // Set up photography page interactions
    setupPhotoInteractions();
    
    // Set up photo modal/lightbox
    setupPhotoModal();
});

// Set up theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) return;
    
    // Update icon to match current theme
    const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    themeIcon.className = currentTheme === 'light' ? 'bx bx-sun' : 'bx bx-moon';
    
    // Add click handler
    themeToggle.addEventListener('click', function() {
        const isCurrentlyLight = document.body.getAttribute('data-theme') === 'light';
        const newTheme = isCurrentlyLight ? 'dark' : 'light';
        
        // Add animation
        themeIcon.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // Apply theme change
            if (newTheme === 'light') {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.className = 'bx bx-sun';
            } else {
                document.body.removeAttribute('data-theme');
                themeIcon.className = 'bx bx-moon';
            }
            
            // Save to localStorage
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                console.error('Error saving theme:', e);
            }
            
            themeIcon.style.transform = 'scale(1)';
        }, 150);
    });
}

// Empty functions to replace star-related code that was removed
// Just keeping these as placeholders in case they're referenced elsewhere

// Setup ScrollReveal animations
function setupScrollReveal() {
    if (typeof ScrollReveal !== 'function') return;
    
    ScrollReveal({
        reset: true,
        distance: '100px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-bio h1, .about-resume', {origin: 'left'});
    ScrollReveal().reveal('.home-bio p', {origin: 'right'});
    ScrollReveal().reveal('.home-bio, heading', {origin: 'top'});
    ScrollReveal().reveal('.profile-pic, .about-items, .skills-items, .projects-items, .form', {origin: 'bottom'});
}

// Setup typing animation
function setupTypingAnimation() {
    if (!document.querySelector('.animated-text') || typeof Typed !== 'function') return;
    
    new Typed('.animated-text', {
        strings: ['Student', 'Athlete', 'Leader'],
        backSpeed: 100,
        typeSpeed: 100,
        backDelay: 600,
        loop: true
    });
}

// Setup photo push-away interactions
function setupPhotoInteractions() {
    const photoItems = document.querySelectorAll('.photo-item');
    if (photoItems.length === 0) return;
    
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
}

// Set up image modal/lightbox for photography page
function setupPhotoModal() {
    const photoItems = document.querySelectorAll('.photo-item');
    const modal = document.getElementById('photoModal');
    
    // If we're not on the photography page, exit
    if (!photoItems.length || !modal) return;
    
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');
    
    // Add click handler to each photo
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const location = item.querySelector('.photoloc').textContent;
            
            // Show the modal
            modal.style.display = 'block';
            
            // Set the image source and alt text
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            
            // Set the caption
            modalCaption.textContent = location;
            
            // Add animation classes after a brief delay
            setTimeout(() => {
                modalImg.classList.add('show');
                modalCaption.classList.add('show');
            }, 50);
        });
    });
    
    // Close modal when clicking the X
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });
    
    // Function to close the modal with animation
    function closeModal() {
        modalImg.classList.remove('show');
        modalCaption.classList.remove('show');
        
        // Hide the modal after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}