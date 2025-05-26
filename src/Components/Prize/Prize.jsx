import { useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./Prize.css";

export const Prize = () => {
  // State to track the currently hovered prize pool
  const [activePrize, setActivePrize] = useState("hot_ballon");

  // Map prize pool sections to their respective SVGs
  const prizeImages = {
    hot_ballon: "/hot_ballon.svg",
    winner: "/1Price.svg",
    runner1: "/2Price.svg",
    runner2: "/3Price.svg",
  };

  return (
    <div className="prize-container">
      {/* Background */}
      <PixelArtBackground 
        pixelSize={2} 
        density={1} 
        fadeDuration={3000}
        className="pixel-art-background" 
      />
      
      {/* Main Content */}
      <div className="prize-content">
        <div className="prize-card">
          {/* Left SVG */}
          <div className="prize-left-image">
            <img 
              src={prizeImages[activePrize]} 
              alt="Prize Icon" 
              className="prize-image"
            />
          </div>

          {/* Card Content */}
          <div className="prize-card-content">

            {/* Winners Section */}
            <div
              className="prize-section"
              onMouseEnter={() => setActivePrize("winner")}
              onMouseLeave={() => setActivePrize("hot_ballon")}
            >
              <h2 className="prize-title text-gold">WINNERS</h2>
              <p className="prize-amount">25,000RS</p>
            </div>

            <div className="separator-line"></div>

            {/* 1st Runner Up */}
            <div
              className="prize-section"
              onMouseEnter={() => setActivePrize("runner1")}
              onMouseLeave={() => setActivePrize("hot_ballon")}
            >
              <h3 className="prize-title text-silver">1ST RUNNER UP</h3>
              <p className="prize-amount">15,000RS</p>
            </div>

            <div className="separator-line"></div>

            {/* 2nd Runner Up */}
            <div
              className="prize-section"
              onMouseEnter={() => setActivePrize("runner2")}
              onMouseLeave={() => setActivePrize("hot_ballon")}
            >
              <h3 className="prize-title text-bronze">2ND RUNNER UP</h3>
              <p className="prize-amount">10,000RS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};