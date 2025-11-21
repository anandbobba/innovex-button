document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('pressButton');
  const buttonText = document.getElementById('buttonText');
  const statusMessage = document.getElementById('statusMessage');
  const successCheck = document.getElementById('successCheck');

  // Create ripple effect on button click
  function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
  }

  // Create particle explosion effect
  function createParticles() {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const particleCount = 16;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 70 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1200);
    }
  }

  // Add floating animation to logos
  const logos = document.querySelectorAll('.logo');
  logos.forEach((logo, index) => {
    logo.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
  });

  // Main button click handler
  button.addEventListener('click', function(e) {
    // Prevent multiple rapid clicks
    if (this.classList.contains('pressed')) return;
    
    // Add pressed animation
    this.classList.add('pressed');
    setTimeout(() => this.classList.remove('pressed'), 600);
    
    // Hide button text with fade
    buttonText.style.transition = 'opacity 0.3s ease';
    buttonText.style.opacity = '0';
    
    // Show success checkmark
    setTimeout(() => {
      successCheck.classList.add('show');
    }, 150);
    
    // Show status message
    setTimeout(() => {
      statusMessage.classList.add('show');
    }, 200);
    
    // Create visual effects
    createRipple(e);
    setTimeout(() => createParticles(), 100);
    
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
    
    // Reset everything after delay
    setTimeout(() => {
      successCheck.classList.remove('show');
      setTimeout(() => {
        buttonText.style.opacity = '1';
      }, 300);
      statusMessage.classList.remove('show');
    }, 2500);
  });

  // Add keyboard support (Enter or Space to press button)
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });

  // Console message for developers
  console.log('%c🚀 INNOVEX 2025 🚀', 'font-size: 20px; font-weight: bold; color: #8B2500;');
  console.log('%cCode for Innovation - "Not Me But You"', 'font-size: 14px; color: #5C2E0F;');
});