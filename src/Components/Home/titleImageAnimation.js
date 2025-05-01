document.addEventListener('DOMContentLoaded', () => {
    const titleImage = document.querySelector('.title-image');
    if (!titleImage) {
      console.error('title-image element not found');
      return;
    }
  
    // Determine upward distance based on viewport width
    const isMobile = window.innerWidth <= 768;
    const distance = isMobile ? 50 : 100; // 100px desktop, 50px mobile
  
    // Animate Y-axis translation
    const animation = titleImage.animate(
      [
        { top: '50%' }, // Start at center (matches CSS)
        { top: `calc(50% - ${distance}px)` } // Move upward
      ],
      {
        duration: 2000, // 2s, matching CSS
        easing: 'ease-out', // Smooth deceleration
        fill: 'forwards' // Keep final state
      }
    );
  
    // Use .then to handle animation completion
    animation.finished.then(() => {
      console.log('Title image animation completed');
      // Add further actions here if needed (e.g., trigger another animation)
    }).catch(error => {
      console.error('Animation error:', error);
    });
  });