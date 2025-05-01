// Features Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize health and mana animations
    animateResourceBars();
    
    // Feature node hover effects
    const featureNodes = document.querySelectorAll('.feature-node');
    
    featureNodes.forEach(node => {
        // Add hover sound effect
        node.addEventListener('mouseenter', function() {
            playHoverSound();
        });
        
        // Add click effect
        node.addEventListener('click', function() {
            playSelectSound();
            highlightNode(this);
        });
    });
    
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

// Highlight selected node
function highlightNode(node) {
    // Remove highlight from all nodes
    document.querySelectorAll('.feature-node').forEach(n => {
        n.style.boxShadow = '';
        n.style.transform = '';
    });
    
    // Add highlight to selected node
    node.style.boxShadow = `0 0 30px ${getNodeColor(node)}`;
    node.style.transform = 'translateY(-8px) scale(1.03)';
    
    // Show node details
    const details = node.querySelector('.node-details');
    if (details) {
        details.style.display = 'block';
    }
    
    // Reset after delay
    setTimeout(() => {
        node.style.boxShadow = '';
        node.style.transform = '';
    }, 3000);
}

// Get node color based on data-feature attribute
function getNodeColor(node) {
    const feature = node.getAttribute('data-feature');
    const colors = {
        'characters': 'rgba(255, 123, 37, 0.7)',
        'story': 'rgba(76, 175, 80, 0.7)',
        'levels': 'rgba(33, 150, 243, 0.7)',
        'art': 'rgba(156, 39, 176, 0.7)',
        'exploration': 'rgba(233, 30, 99, 0.7)',
        'progression': 'rgba(0, 188, 212, 0.7)'
    };
    
    return colors[feature] || 'rgba(249, 166, 2, 0.7)';
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