import React from 'react';
import './Home.css';
import PixelArtBackground from '../Background/PixelArtbg';

export const Home = ({ heroData }) => {
  const { title, subtitle, image, buttonText } = heroData;
  const { heroImage, cloud } = image;

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
        <div>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
        {cloud.map((cloudItem, index) => (
          <img
            key={index}
            src={cloudItem.src}
            alt={cloudItem.alt}
            className={`cloud-image${index + 1}`}
          />
        ))}
      </div>
      <img src={heroImage.src} alt={heroImage.alt} className="hero-image" />
      {/* <button className="register-button">{buttonText}</button> */}
    </div>
  );
};