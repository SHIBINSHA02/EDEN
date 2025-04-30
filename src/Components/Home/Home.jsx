import React from 'react';
import './Home.css';
import PixelArtBackground from '../Background/PixelArtbg';

export const Home = ({ heroData }) => {
  const { title, subtitle, heroImage, buttonText } = heroData;
  
  return (
    <div className="home-container">
      <PixelArtBackground 
        pixelSize={2} 
        density={1.9} 
        fadeDuration={3000}
        maxPlusSigns={70}
        initialPlusSigns={40}
      />
      <div className="hero-section">
        <img src={heroImage.src} alt={heroImage.alt} className="hero-image" />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <button className="register-button">{buttonText}</button>
      </div>
    </div>
  );
};