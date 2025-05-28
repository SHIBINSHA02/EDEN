import React from 'react';
import './datev.css';
import PixelArtBackground from '../Background/PixelArtbg';
const DateVenue = () => {
  return (
    <div className="image-container">
      <PixelArtBackground
        pixelSize={2}
        density={1}
        fadeDuration={3000}
        className="pixel-art-background"
      />
      <img
        src={window.innerWidth < 768 ? './rocket2.svg':'./airship.svg'}
        alt={window.innerWidth < 768 ? "rocket" : "airship"}
        className="airship-image floating"
        style={{
          '--float-y-range': '10px',
          '--float-x-range': '30px',
          transform: 'scale(1.9)', // Keep inline scale
        }}
      />
      <div className="image-wrapper">
        <img src="./Frame 208.svg" alt="Date" className="frame-image date-image" />
        <img src="./Frame 207.svg" alt="Venue" className="frame-image venue-image" />
      </div>
    </div>
  );
};

export default DateVenue;