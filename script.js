// Game-themed portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate health bar
    animateHealthBar();
    
    // Quest accept button interaction
    const questAccept = document.querySelector('.quest-accept');
    if (questAccept) {
        questAccept.addEventListener('click', function() {
            this.textContent = 'Accepted!';
            this.style.backgroundColor = '#3aff6e';
            
            // Show a notification
            showGameNotification('Quest accepted! Your adventure begins!');
            
            // Increase XP
            increaseXP(20);
        });
    }
    
    // Dialog next button
    const dialogNext = document.querySelector('.dialog-next');
    if (dialogNext) {
        dialogNext.addEventListener('click', function() {
            const dialogText = document.querySelector('.dialog-text');
            dialogText.textContent = 'Select an item from your inventory to learn more about Arcane Conquest. Each choice will lead you on a different path!';
        });
    }
    
    // Inventory item hover effects
    const inventoryItems = document.querySelectorAll('.inventory-item');
    inventoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            playHoverSound();
        });
        
        item.addEventListener('click', function() {
            playSelectSound();
        });
    });
    
    // Create particle effects
    createParticles();
});

// Animate the health bar to simulate game-like behavior
function animateHealthBar() {
    const healthFill = document.querySelector('.health-fill');
    if (!healthFill) return;
    
    let health = 100;
    let direction = -1;
    
    setInterval(() => {
        if (health <= 70) direction = 1;
        if (health >= 100) direction = -1;
        
        health += direction;
        healthFill.style.width = `${health}%`;
        
        const healthText = document.querySelector('.health-text');
        if (healthText) {
            healthText.textContent = `${health}/100`;
        }
    }, 200);
}

// Increase XP bar
function increaseXP(amount) {
    const xpFill = document.querySelector('.xp-fill');
    if (!xpFill) return;
    
    const currentWidth = parseInt(xpFill.style.width || '30');
    const newWidth = Math.min(currentWidth + amount, 100);
    xpFill.style.width = `${newWidth}%`;
    
    // Update level text if XP is full
    if (newWidth >= 100) {
        const xpText = document.querySelector('.xp-text');
        if (xpText) {
            xpText.textContent = 'Level 2';
        }
    }
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
    // In a real implementation, you would use the Audio API
    // For now, we'll just console log
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