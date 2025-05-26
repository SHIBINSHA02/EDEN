import React, { useState, useEffect } from 'react';
import PixelArtBackground from '../Background/PixelArtbg';
import './About.css';

export const About = ({ description, buttonText }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < description.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + description[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50); // Adjust the speed of typing here (milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, description]);

  const handleClick = () => {
    window.location.href = "https://www.youtube.com/";
  };

  const handleDownload = () => {
    const pdfUrl = "./MODULE.pdf"; // Assumes schedule.pdf is in the public directory
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'MODULE.pdf'; // Corrected file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="about-container relative w-screen h-screen">
      <PixelArtBackground className="about-background" pixelSize={2} density={1} fadeDuration={3000} />
      <div className="about-content absolute inset-0 flex justify-center items-center">
        <div className="description">
          <p className="typing-animation">{displayText}</p>
        </div>
        <div className="button-container">
          <div className="button-wrapper">
            <button className="primary-button" onClick={handleClick}>{buttonText}</button>
          </div>
          <div className="button-wrapper">
            <button className="secondary-button" onClick={handleDownload}>See Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};