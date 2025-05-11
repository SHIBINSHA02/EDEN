import React, { useState, useEffect } from 'react';
import PixelArtBackground from '../Background/PixelArtbg';
import './Sponsors.css';
import { useInView } from 'react-intersection-observer';

export const Sponsors = () => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [activeLayer, setActiveLayer] = useState(0); // Tracks current layer (0 = none, 1-5 = layers)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    let timer1, timer2, timer3, timer4, interval;

    if (inView && animationPhase === 'initial') {
      // Start joining animation after 2 seconds
      timer1 = setTimeout(() => {
        console.log('Joining animation started at', Date.now());
        setAnimationPhase('joining');
      }, 2000);

      // Start white screen layers after joining completes (2s duration)
      timer2 = setTimeout(() => {
        console.log('White screen animation started at', Date.now());
        setAnimationPhase('whiteExpanding');
        let layerIndex = 1;
        interval = setInterval(() => {
          console.log(`Layer ${layerIndex} triggered at`, Date.now());
          setActiveLayer(layerIndex);
          layerIndex++;
          if (layerIndex > 5) {
            clearInterval(interval);
          }
        }, 2000);
      }, 2000);

      // Start gradient animation after white layers (10s: 2s joining + 8s layers)
      timer3 = setTimeout(() => {
        console.log('Gradient animation started at', Date.now());
        setAnimationPhase('gradient');
      }, 10000);

      // Show final content after gradient finishes (5s gradient duration)
      timer4 = setTimeout(() => {
        console.log('Final content triggered at', Date.now());
        setAnimationPhase('final');
      }, 15000);
    } else if (!inView && animationPhase !== 'initial') {
      console.log('Resetting animation at', Date.now());
      setAnimationPhase('initial');
      setActiveLayer(0);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
    };
  }, [inView, animationPhase]);

  return (
    <div ref={ref} className="relative w-screen h-screen overflow-hidden">
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      <div
        className={`absolute inset-0 flex justify-center items-center text-white text-4xl sponsors-container z-10 transition-opacity duration-1000 ${
          animationPhase === 'joining' || animationPhase === 'whiteExpanding' || animationPhase === 'gradient' || animationPhase === 'final' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="minecraft-font">Red Bull Gives You Wings</span>
      </div>

      <div className="hemis-container">
        <img
          src="/hemis.svg"
          alt="Hemicircle"
          className={`hemis absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-2000 ease-in-out ${
            animationPhase === 'joining' || animationPhase === 'whiteExpanding' || animationPhase === 'gradient' || animationPhase === 'final'
              ? 'left-[calc(50%-50px)] -translate-x-1/2 opacity-0'
              : 'left-0'
          }`}
        />
        <img
          src="/hemis-mirror.svg"
          alt="Mirrored Hemicircle"
          className={`hemis mirror absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-3000 ease-in-out ${
            animationPhase === 'joining' || animationPhase === 'whiteExpanding' || animationPhase === 'gradient' || animationPhase === 'final'
              ? 'right-[calc(50%-50px)] translate-x-1/2 opacity-0'
              : 'right-0'
          }`}
        />
      </div>

      {animationPhase === 'whiteExpanding' && (
        <div className="absolute inset-0 z-30 flex justify-center items-center">
          <div
            className={`absolute inset-0 white-layer ${activeLayer >= 1 ? 'layer-animate' : ''}`}
            style={{ opacity: 0.2, transformOrigin: 'center', zIndex: 1 }}
          />
          <div
            className={`absolute inset-0 white-layer ${activeLayer >= 2 ? 'layer-animate' : ''}`}
            style={{ opacity: 0.4, transformOrigin: 'center', zIndex: 2 }}
          />
          <div
            className={`absolute inset-0 white-layer ${activeLayer >= 3 ? 'layer-animate' : ''}`}
            style={{ opacity: 0.6, transformOrigin: 'center', zIndex: 3 }}
          />
          <div
            className={`absolute inset-0 white-layer ${activeLayer >= 4 ? 'layer-animate' : ''}`}
            style={{ opacity: 0.8, transformOrigin: 'center', zIndex: 4 }}
          />
          <div
            className={`absolute inset-0 white-layer ${activeLayer >= 5 ? 'layer-animate' : ''}`}
            style={{ opacity: 1.0, transformOrigin: 'center', zIndex: 5 }}
          />
        </div>
      )}

      {animationPhase === 'gradient' && (
        <div className="absolute inset-0 z-40 gradient-layer gradient-animate" />
      )}

      {animationPhase === 'final' && (
        <div className="absolute inset-0 bg-white flex justify-center items-center z-50 transition-opacity duration-1000 opacity-100">
          <div className="text-center text-black">
            <h1 className="text-5xl font-bold mb-4">Thank You, Sponsors!</h1>
            <p className="text-2xl">Your support makes it all possible.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;