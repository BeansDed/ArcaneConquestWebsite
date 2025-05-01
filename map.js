// Map Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize health and mana animations
    animateResourceBars();
    
    // Map zoom controls
    initMapControls();
    
    // Location tabs
    initLocationTabs();
    
    // Map markers
    initMapMarkers();
    
    // Create particle effects
    createParticles();
});

// Animate health and mana bars
function animateResourceBars() {
    const healthFill = document.querySelector('.health-fill');
    const manaFill = document.querySelector('.mana-fill');
    
    if (!healthFill || !manaFill) return;
    
    // Health bar animation
    let health = 85;
    let healthDirection = -1;
    
    setInterval(() => {
        if (health <= 75) healthDirection = 1;
        if (health >= 85) healthDirection = -1;
        
        health += healthDirection;
        healthFill.style.width = `${health}%`;
        
        const healthText = document.querySelector('.health-bar .bar-value');
        if (healthText) {
            healthText.textContent = `${health}/100`;
        }
    }, 300);
    
    // Mana bar animation
    let mana = 75;
    let manaDirection = 1;
    
    setInterval(() => {
        if (mana <= 70) manaDirection = 1;
        if (mana >= 80) manaDirection = -1;
        
        mana += manaDirection;
        manaFill.style.width = `${mana}%`;
        
        const manaText = document.querySelector('.mana-bar .bar-value');
        if (manaText) {
            manaText.textContent = `${mana}/100`;
        }
    }, 400);
}

// Initialize map controls
function initMapControls() {
    const mapImage = document.querySelector('.map-image');
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const resetBtn = document.querySelector('.reset');
    
    if (!mapImage || !zoomInBtn || !zoomOutBtn || !resetBtn) return;
    
    let scale = 1;
    const maxScale = 2;
    const minScale = 0.8;
    
    zoomInBtn.addEventListener('click', () => {
        if (scale < maxScale) {
            scale += 0.1;
            mapImage.style.transform = `scale(${scale})`;
            playButtonSound();
        }
    });
    
    zoomOutBtn.addEventListener('click', () => {
        if (scale > minScale) {
            scale -= 0.1;
            mapImage.style.transform = `scale(${scale})`;
            playButtonSound();
        }
    });
    
    resetBtn.addEventListener('click', () => {
        scale = 1;
        mapImage.style.transform = `scale(${scale})`;
        playButtonSound();
    });
}

// Initialize location tabs
function initLocationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const locationTabs = document.querySelectorAll('.location-tab');
    
    if (!tabButtons.length || !locationTabs.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            locationTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const tab = document.getElementById(tabId);
            if (tab) {
                tab.classList.add('active');
            }
            
            playSelectSound();
        });
    });
}

// Initialize map markers
function initMapMarkers() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (!mapMarkers.length) return;
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            playHoverSound();
        });
        
        marker.addEventListener('click', () => {
            const location = marker.getAttribute('data-location');
            const tabButton = document.querySelector(`.tab-btn[data-tab="${location}"]`);
            
            if (tabButton) {
                // Scroll to location details
                const locationDetails = document.querySelector('.location-details');
                if (locationDetails) {
                    locationDetails.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Activate the tab
                setTimeout(() => {
                    tabButton.click();
                }, 500);
            }
            
            playSelectSound();
        });
    });
}

// Sound effects (simulated)
function playHoverSound() {
    console.log('Hover sound played');
    // Uncomment to add actual sound:
    // const hoverSound = new Audio('hover.mp3');
    // hoverSound.volume = 0.2;
    // hoverSound.play();
}

function playSelectSound() {
    console.log('Select sound played');
    // Uncomment to add actual sound:
    // const selectSound = new Audio('select.mp3');
    // selectSound.volume = 0.3;
    // selectSound.play();
}

function playButtonSound() {
    console.log('Button sound played');
    // Uncomment to add actual sound:
    // const buttonSound = new Audio('button.mp3');
    // buttonSound.volume = 0.2;
    // buttonSound.play();
}

// Create particle effects
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#f9a602';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.5';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random animation
        const duration = 5 + Math.random() * 10;
        particle.style.animation = `float ${duration}s infinite linear`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
@keyframes float {
    0% { transform: translate(0, 0); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translate(20px, -20px); opacity: 0; }
}
`;
document.head.appendChild(style);