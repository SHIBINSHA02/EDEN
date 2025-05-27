import React from 'react';
import './datev.css';
import PixelArtBackground from '../Background/PixelArtbg';

const DateVenue = () => {
  return (
    <div className="image-container">
      {/* Background */}
      <PixelArtBackground
        pixelSize={2}
        density={1}
        fadeDuration={3000}
        className="pixel-art-background"
      />
      <div className="image-wrapper">
        <img src="./Frame 208.svg" alt="Date" className="frame-image date-image" />
        <img src="./Frame 207.svg" alt="Venue" className="frame-image venue-image" />
      </div>
    </div>
  );
};

export default DateVenue;