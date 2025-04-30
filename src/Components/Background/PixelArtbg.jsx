import React, { useEffect, useRef, useState } from 'react';

const PixelArtBackground = ({ 
  pixelSize = 5, 
  density = 0.3, 
  fadeDuration = 3000,
  maxPlusSigns = 100,
  initialPlusSigns = 40,
  scatterCount = 15,  // Number of plus signs to scatter on touch
  scatterSpeed = 2    // Base speed for scattering animation
}) => {
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);
  const [plusSigns, setPlusSigns] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Set up dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        const width = parent ? parent.clientWidth : window.innerWidth;
        const height = parent ? parent.clientHeight : window.innerHeight;
        setDimensions({ width, height });
      }
    };

    // Initial update and resize handler
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create initial plus signs
  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    
    const initialSigns = [];
    const maxX = Math.floor(dimensions.width / pixelSize);
    const maxY = Math.floor(dimensions.height / pixelSize);
    
    for (let i = 0; i < initialPlusSigns; i++) {
      initialSigns.push({
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
        type: Math.random() < 0.5 ? 'primary' : 'fade',
        startTime: performance.now() - Math.random() * fadeDuration,
        velocityX: 0,
        velocityY: 0,
      });
    }
    
    setPlusSigns(initialSigns);
  }, [dimensions, pixelSize, initialPlusSigns, fadeDuration]);

  // Handle rendering and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width <= 0 || dimensions.height <= 0) return;

    // Set up canvas
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Drawing functions
    const drawPixel = (x, y, color, alpha = 1) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(Math.round(x * pixelSize), Math.round(y * pixelSize), pixelSize, pixelSize);
      ctx.globalAlpha = 1;
    };

    const drawBackground = () => {
      ctx.fillStyle = '#1d0a24';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawPlusSign = (x, y, type, alpha) => {
      if (type === 'primary') {
        drawPixel(x, y, '#7f4877', alpha);     // Center
        drawPixel(x - 1, y, '#74426e', alpha); // Left
        drawPixel(x + 1, y, '#61365d', alpha); // Right
        drawPixel(x, y - 1, '#74426e', alpha); // Top
        drawPixel(x, y + 1, '#61365d', alpha); // Bottom
      } else {
        drawPixel(x, y, '#b77ec6', alpha);     // Center
        drawPixel(x - 1, y, '#c471b5', alpha); // Left
        drawPixel(x + 1, y, '#a05c95', alpha); // Right
        drawPixel(x, y - 1, '#a05c95', alpha); // Top
        drawPixel(x, y + 1, '#c471b5', alpha); // Bottom
      }
    };

    // Animation loop
    let animationId;
    let lastFrameTime = performance.now();
    
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastFrameTime) / 16; // Normalize to ~60fps
      lastFrameTime = currentTime;
      
      // Update positions based on velocity and filter out expired plus signs
      const updatedSigns = plusSigns.map(sign => {
        // Update position based on velocity
        return {
          ...sign,
          x: sign.x + sign.velocityX * deltaTime,
          y: sign.y + sign.velocityY * deltaTime,
          // Gradually slow down
          velocityX: sign.velocityX * 0.98,
          velocityY: sign.velocityY * 0.98
        };
      }).filter(sign => 
        currentTime - sign.startTime < fadeDuration &&
        sign.x >= 0 && 
        sign.x < dimensions.width / pixelSize && 
        sign.y >= 0 && 
        sign.y < dimensions.height / pixelSize
      );
      
      // Update the state if signs have changed
      if (updatedSigns.length !== plusSigns.length || 
          updatedSigns.some((sign, i) => sign.x !== plusSigns[i].x || sign.y !== plusSigns[i].y)) {
        setPlusSigns(updatedSigns);
      }
      
      // Draw the scene
      drawBackground();
      updatedSigns.forEach(sign => {
        const elapsed = currentTime - sign.startTime;
        const fadeProgress = Math.min(elapsed / fadeDuration, 1);
        const alpha = 1 - fadeProgress;
        
        if (alpha > 0) {
          drawPlusSign(sign.x, sign.y, sign.type, alpha);
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Handle user interactions
    const handleInteraction = (event) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
      const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;
      
      const touchX = Math.floor((clientX - rect.left) / pixelSize);
      const touchY = Math.floor((clientY - rect.top) / pixelSize);
      
      // Create scattering plus signs
      const newSigns = [];
      
      for (let i = 0; i < scatterCount; i++) {
        // Calculate random direction and speed
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const speed = scatterSpeed * (0.5 + Math.random()); // Random speed variation
        
        newSigns.push({
          x: touchX,
          y: touchY,
          type: Math.random() < 0.5 ? 'primary' : 'fade',
          startTime: performance.now(),
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
        });
      }
      
      setPlusSigns(prev => {
        const combined = [...prev, ...newSigns];
        if (combined.length > maxPlusSigns) {
          return combined.slice(combined.length - maxPlusSigns);
        }
        return combined;
      });
    };
    
    canvas.addEventListener('click', handleInteraction);
    canvas.addEventListener('touchstart', handleInteraction);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleInteraction);
      canvas.removeEventListener('touchstart', handleInteraction);
    };
  }, [dimensions, pixelSize, fadeDuration, plusSigns, scatterSpeed]);

  // Generate random plus signs periodically
  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    
    const generateRandomSign = () => {
      // Only generate if we're below maximum
      if (plusSigns.length < maxPlusSigns && Math.random() < density) {
        const maxX = Math.floor(dimensions.width / pixelSize);
        const maxY = Math.floor(dimensions.height / pixelSize);
        
        const newSign = {
          x: Math.floor(Math.random() * maxX),
          y: Math.floor(Math.random() * maxY),
          type: Math.random() < 0.5 ? 'primary' : 'fade',
          startTime: performance.now(),
          velocityX: 0,
          velocityY: 0,
        };
        
        setPlusSigns(prev => [...prev, newSign]);
      }
      
      // Schedule next generation with random interval
      const nextInterval = 500 + Math.random() * 1500;
      timeoutRef.current = setTimeout(generateRandomSign, nextInterval);
    };
    
    // Start generation
    generateRandomSign();
    
    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dimensions, pixelSize, plusSigns.length, maxPlusSigns, density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        touchAction: 'none',
        pointerEvents: 'auto',
        backgroundColor: '#1d0a24',
      }}
    />
  );
};

export default PixelArtBackground;