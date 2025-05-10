import React, { useState, useEffect } from 'react';
import PixelArtBackground from '../Background/PixelArtbg';
import './Sponsors.css';
import { useInView } from 'react-intersection-observer';

export const Sponsors = () => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [expandWhiteScreen, setExpandWhiteScreen] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    let timer1, timer2, timer3;

    if (inView && animationPhase === 'initial') {
      // Start joining animation after 1 second
      timer1 = setTimeout(() => {
        setAnimationPhase('joining');
      }, 1000);

      // Trigger white screen to start expanding AFTER joining completes (2s duration)
      timer2 = setTimeout(() => {
        setExpandWhiteScreen(true);
        setAnimationPhase('whiteExpanding');
      }, 1000 + 2000); // 1s delay + 2s joining duration

      // Show final content after the white screen finishes expanding (2s animation)
      timer3 = setTimeout(() => {
        setAnimationPhase('final');
      }, 1000 + 2000 + 2000); // 1s delay + 2s joining + 2s white expand
    } else if (!inView && animationPhase !== 'initial') {
      setAnimationPhase('initial');
      setExpandWhiteScreen(false);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [inView, animationPhase]);

  return (
    <div ref={ref} className="relative w-screen h-screen overflow-hidden">
      {animationPhase === 'initial' && (
        <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      )}

      <div
        className={`absolute inset-0 flex justify-center items-center text-white text-4xl sponsors-container z-10 transition-opacity duration-1000 ${
          animationPhase === 'whiteExpanding' || animationPhase === 'final' || animationPhase === 'joining' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="minecraft-font">Red Bull Gives You Wings</span>
      </div>

      <div className="hemis-container">
        <img
          src="/hemis.svg"
          alt="Hemicircle"
          className={`hemis absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-2000 ease-in-out ${
            animationPhase === 'joining' || animationPhase === 'whiteExpanding' || animationPhase === 'final'
              ? 'left-[calc(50%-50px)] -translate-x-1/2 opacity-0'
              : 'left-0'
          }`}
        />
        <img
          src="/hemis-mirror.svg"
          alt="Mirrored Hemicircle"
          className={`hemis mirror absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-3000 ease-in-out ${
            animationPhase === 'joining' || animationPhase === 'whiteExpanding' || animationPhase === 'final'
              ? 'right-[calc(50%-50px)] translate-x-1/2 opacity-0'
              : 'right-0'
          }`}
        />
      </div>

      {animationPhase === 'whiteExpanding' && (
        <div
          className={`absolute inset-0 bg-white z-30 white-expand-initial ${
            expandWhiteScreen ? 'white-expand-animate' : ''
          } flex justify-center items-center`}
          style={{ transformOrigin: 'center' }}
        >
          {/* White screen expanding animation */}
        </div>
      )}

      {animationPhase === 'final' && (
        <div className="absolute inset-0 bg-white flex justify-center items-center z-30 transition-opacity duration-1000 opacity-100">
          <div className="text-center text-black">
            <h1 className="text-5xl font-bold mb-4">Thank You, Sponsors!</h1>
            <p className="text-2xl">Your support makes it all possible.</p>
          </div>
        </div>
      )}
    </div>
  );
};