// Character Selection Screen Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Character selection functionality
    const characterSlots = document.querySelectorAll('.character-slot');
    const characterInfos = document.querySelectorAll('.character-info');
    const selectButton = document.querySelector('.game-button');
    
    // Initialize health and mana animations
    animateResourceBars();
    
    // Character selection
    characterSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove active class from all slots
            characterSlots.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked slot
            this.classList.add('active');
            
            // Show corresponding character info
            const character = this.getAttribute('data-character');
            characterInfos.forEach(info => {
                info.classList.add('hidden');
            });
            
            document.getElementById(`${character}-info`).classList.remove('hidden');
            
            // Play selection sound
            playSelectSound();
            
            // Update button text
            selectButton.textContent = `Select ${character.charAt(0).toUpperCase() + character.slice(1)}`;
        });
        
        // Hover sound effect
        slot.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
    
    // Select button interaction
    selectButton.addEventListener('click', function() {
        const activeCharacter = document.querySelector('.character-slot.active').getAttribute('data-character');
        
        // Show selection notification
        showGameNotification(`You have selected ${activeCharacter.charAt(0).toUpperCase() + activeCharacter.slice(1)}!`);
        
        // Add visual feedback
        this.textContent = "Character Selected!";
        this.style.backgroundColor = "#3aff6e";
        
        // Disable button temporarily
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
            this.textContent = `Select ${activeCharacter.charAt(0).toUpperCase() + activeCharacter.slice(1)}`;
            this.style.backgroundColor = "";
        }, 2000);
    });
    
    // Animate stat bars on page load
    animateStatBars();
    
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

// Animate stat bars with a delay
function animateStatBars() {
    const statFills = document.querySelectorAll('.stat-fill');
    
    statFills.forEach((fill, index) => {
        const originalWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = originalWidth;
        }, 300 + (index * 100));
    });
}

// Show game notification
function showGameNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'game-notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    notification.style.color = '#f9a602';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.border = '2px solid #f9a602';
    notification.style.fontFamily = "'MedievalSharp', cursive";
    notification.style.fontSize = '18px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 0 20px rgba(249, 166, 2, 0.5)';
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
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