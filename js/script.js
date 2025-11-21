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
  function addLogoAnimation() {
    const logos = document.querySelectorAll('.logo');
    logos.forEach((logo, index) => {
      const delay = index * 0.5;
      logo.style.animation = `float 3s ease-in-out ${delay}s infinite`;
    });
  }

  // Create floating keyframe animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);

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
    
    // Play subtle sound if available (optional)
    playClickSound();
    
    // Reset everything after delay
    setTimeout(() => {
      successCheck.classList.remove('show');
      setTimeout(() => {
        buttonText.style.opacity = '1';
      }, 300);
      statusMessage.classList.remove('show');
    }, 2500);
  });

  // Optional: Add sound effect
  function playClickSound() {
    // Create a subtle click sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not supported or blocked
      console.log('Audio not available');
    }
  }

  // Add hover effect sound (very subtle)
  button.addEventListener('mouseenter', function() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 600;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
      // Silently fail if audio not available
    }
  });

  // Initialize logo animations
  addLogoAnimation();

  // Add keyboard support (Enter or Space to press button)
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });

  // Easter egg: Konami code for special effect
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      activateEasterEgg();
    }
  });

  function activateEasterEgg() {
    // Special rainbow effect
    button.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
    button.style.backgroundSize = '400% 400%';
    button.style.animation = 'rainbow 3s ease infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
      @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show special message
    statusMessage.textContent = '🎉 Easter Egg Activated! 🎉';
    statusMessage.classList.add('show');
    
    setTimeout(() => {
      button.style.background = 'linear-gradient(135deg, var(--accent-red) 0%, var(--accent-red-dark) 100%)';
      button.style.animation = '';
      statusMessage.classList.remove('show');
      statusMessage.textContent = '✓ Button Pressed Successfully!';
    }, 5000);
  }

  // Console message for developers
  console.log('%c🚀 INNOVEX 2025 🚀', 'font-size: 20px; font-weight: bold; color: #8B2500;');
  console.log('%cCode for Innovation - "Not Me But You"', 'font-size: 14px; color: #5C2E0F;');
  console.log('%cTry the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #8B7355;');
});