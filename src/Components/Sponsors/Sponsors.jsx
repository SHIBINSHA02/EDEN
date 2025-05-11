import React, { useState, useEffect } from 'react';
import PixelArtBackground from '../Background/PixelArtbg';
import './Sponsors.css';
import { useInView } from 'react-intersection-observer';

export const Sponsors = () => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [revealElements, setRevealElements] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Configurable parameters
  const [anim] = useState('custom1');
  const [shape] = useState('circle');
  const [shapeSize] = useState(50);
  const [animDuration] = useState(2);
  const [animDelay] = useState(0.5);
  const [randomColors] = useState(true);
  const [delayType] = useState('incremental');

  // Generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate reveal elements
  const generateRevealElements = () => {
    console.log('Generating reveal elements');
    const elements = [];
    const count = 30;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const delay =
        delayType === 'incremental'
          ? i * (animDelay / count)
          : Math.random() * animDelay;
      const x = Math.random() * vw;
      const y = Math.random() * vh;
      elements.push({
        anim,
        shape,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          width: `${shapeSize}px`,
          height: `${shapeSize}px`,
          backgroundColor: randomColors ? getRandomColor() : '#fff',
          animation: `${anim} ${animDuration}s ease-in ${delay}s forwards`,
        },
      });
    }
    console.log('Reveal elements generated:', elements.length);
    setRevealElements(elements);
  };

  // Handle animation end
  const handleAnimationEnd = () => {
    console.log('Last reveal animation ended');
    setRevealed(true);
    setAnimationPhase('final');
  };

  useEffect(() => {
    console.log('useEffect triggered, inView:', inView, 'animationPhase:', animationPhase);
    let timer1, timer2;

    if (inView && animationPhase === 'initial') {
      console.log('Starting joining phase');
      setAnimationPhase('joining');

      // Generate reveal elements and start reveal after 2s
      timer1 = setTimeout(() => {
        console.log('Starting revealing phase');
        generateRevealElements();
        setAnimationPhase('revealing');
      }, 2000);

      // Fallback to final phase after reveal duration (2s joining + max animation time)
      timer2 = setTimeout(() => {
        if (animationPhase !== 'final') {
          console.log('Fallback: Forcing final phase');
          setRevealed(true);
          setAnimationPhase('final');
        }
      }, 2000 + (animDuration + animDelay) * 1000 + 500);
    } else if (!inView && animationPhase !== 'initial') {
      console.log('Resetting to initial phase');
      setAnimationPhase('initial');
      setRevealElements([]);
      setRevealed(false);
    }

    return () => {
      console.log('Cleaning up timers');
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [inView, animationPhase, animDuration, animDelay]);

  return (
    <div
      ref={ref}
      className="relative w-screen h-screen overflow-hidden"
      id="app"
      data-loaded={animationPhase !== 'initial'}
      data-revealed={revealed}
    >
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />

      {/* Reveal effect */}
      <div
        id="reveal"
        className={`fixed top-0 left-0 w-full h-full pointer-events-none z-30 transition-opacity duration-500 ${
          animationPhase === 'revealing' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {revealElements.map((el, index) => (
          <div
            key={index}
            className={`${el.anim} ${el.shape}`}
            style={el.style}
            onAnimationEnd={index === revealElements.length - 1 ? handleAnimationEnd : undefined}
          />
        ))}
      </div>

      {/* Initial content */}
      <div
        className={`absolute inset-0 flex justify-center items-center text-white text-4xl sponsors-container z-10 transition-opacity duration-1000 ${
          animationPhase === 'joining' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="minecraft-font">Red Bull Gives You Wings</span>
      </div>

      {/* Hemicircles */}
      <div className="hemis-container">
        <img
          src="/hemis.svg"
          alt="Hemicircle"
          className={`hemis absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-2000 ease-in-out ${
            animationPhase === 'joining' || animationPhase === 'revealing' || animationPhase === 'final'
              ? 'left-[calc(50%-50px)] -translate-x-1/2 opacity-0'
              : 'left-0 opacity-100'
          }`}
        />
        <img
          src="/hemis-mirror.svg"
          alt="Mirrored Hemicircle"
          className={`hemis mirror absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-3000 ease-in-out ${
            animationPhase === 'joining' || animationPhase === 'revealing' || animationPhase === 'final'
              ? 'right-[calc(50%-50px)] translate-x-1/2 opacity-0'
              : 'right-0 opacity-100'
          }`}
        />
      </div>

      {/* Final content */}
      <div
        id="page"
        className={`absolute inset-0 flex justify-center items-center z-50 transition-opacity duration-1000 ${
          animationPhase === 'final' ? 'opacity-100 bg-white' : 'opacity-0'
        }`}
      >
        <div className="text-center text-black">
          <h1 className="text-5xl font-bold mb-4">Thank You, Sponsors!</h1>
          <p className="text-2xl">Your support makes it all possible.</p>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;