import React from 'react';
import PixelArtBackground from '../Background/PixelArtbg';
import './About.css';

export const About = ({ description, buttonText }) => {
  const handleClick = () => {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs";
  };

  const handleDownload = () => {
    const pdfUrl = "./MODULE.pdf"; // Assumes schedule.pdf is in the public directory
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = './MODULE.pdf'; // Corrected file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="about-container">
      <PixelArtBackground className="about-background" pixelSize={2} density={1} fadeDuration={3000} />
      <div className="about-content">
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="button-container">
          <button className="primary-button" onClick={handleClick}>{buttonText}</button>
          <button className="secondary-button" onClick={handleDownload}>See Schedule</button>
        </div>
      </div>
    </div>
  );
};
