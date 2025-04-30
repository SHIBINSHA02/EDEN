import React, { useEffect, useRef, useState } from 'react';

const PixelArtBackground = ({ 
  pixelSize = 5, 
  density = 0.3, 
  fadeDuration = 3000,
  maxPlusSigns = 100,
  initialPlusSigns = 40
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
      });
    }
    
    setPlusSigns(initialSigns);
    console.log(`Added ${initialSigns.length} initial plus signs`);
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
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      ctx.globalAlpha = 1;
    };

    const drawBackground = () => {
      ctx.fillStyle = '#1d0a24';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawPlusSign = (x, y, type, alpha) => {
      if (type === 'primary') {
        drawPixel(x, y, '#a45f99', alpha);     // Center
        drawPixel(x - 1, y, '#a15d97', alpha); // Left
        drawPixel(x + 1, y, '#552e55', alpha); // Right
        drawPixel(x, y - 1, '#7c4675', alpha); // Top
        drawPixel(x, y + 1, '#1d0b23', alpha); // Bottom
      } else {
        drawPixel(x, y, '#442344', alpha);     // Center
        drawPixel(x - 1, y, '#1d0a24', alpha); // Left
        drawPixel(x + 1, y, '#1d0a24', alpha); // Right
        drawPixel(x, y - 1, '#1d0a24', alpha); // Top
        drawPixel(x, y + 1, '#1d0a24', alpha); // Bottom
      }
    };

    // Animation loop
    let animationId;
    const animate = () => {
      const currentTime = performance.now();
      
      // Filter out expired plus signs
      const activeSigns = plusSigns.filter(sign => 
        currentTime - sign.startTime < fadeDuration
      );
      
      // Update the state if signs have expired
      if (activeSigns.length < plusSigns.length) {
        setPlusSigns(activeSigns);
      }
      
      // Draw the scene
      drawBackground();
      plusSigns.forEach(sign => {
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
      
      const x = Math.floor((clientX - rect.left) / pixelSize);
      const y = Math.floor((clientY - rect.top) / pixelSize);
      
      const newSign = {
        x, 
        y,
        type: Math.random() < 0.5 ? 'primary' : 'fade',
        startTime: performance.now()
      };
      
      setPlusSigns(prev => {
        if (prev.length >= maxPlusSigns) {
          return [...prev.slice(1), newSign];
        }
        return [...prev, newSign];
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
  }, [dimensions, pixelSize, fadeDuration, plusSigns]);

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
          startTime: performance.now()
        };
        
        setPlusSigns(prev => [...prev, newSign]);
        console.log('Added random plus sign at', newSign.x, newSign.y);
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