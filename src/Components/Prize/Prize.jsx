import { useState, useEffect } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./Prize.css";

export const Prize = () => {
  // State to track the currently displayed prize image
  const [activePrize, setActivePrize] = useState("winner");
  // State to track if animation should run
  const [isAnimating, setIsAnimating] = useState(true);

  // Map prize pool sections to their respective SVGs
  const prizeImages = {
    winner: "./1Price.svg",
    runner1: "./2Price.svg",
    runner2: "./3Price.svg",
  };

  // Array of prize keys for cycling
  const prizeOrder = ["winner", "runner1", "runner2"];

  // Animation loop with 2s per image (1s display + 1s delay)
  useEffect(() => {
    let timeout;
    const cyclePrize = () => {
      if (isAnimating) {
        setActivePrize((prev) => {
          const currentIndex = prizeOrder.indexOf(prev);
          const nextIndex = (currentIndex + 1) % prizeOrder.length;
          return prizeOrder[nextIndex];
        });
        // Schedule the next change: 2000ms per image
        timeout = setTimeout(cyclePrize, 2000);
      }
    };

    if (isAnimating) {
      timeout = setTimeout(cyclePrize, 2000); // Initial call
    }

    return () => clearTimeout(timeout); // Cleanup on unmount or when isAnimating changes
  }, [isAnimating]);

  // Handle hover to pause animation and set specific prize
  const handleMouseEnter = (prize) => {
    setIsAnimating(false);
    setActivePrize(prize);
  };

  // Handle mouse leave to resume animation
  const handleMouseLeave = () => {
    setIsAnimating(true);
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
          {/* Left SVG with boundary box */}
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
              onMouseEnter={() => handleMouseEnter("winner")}
              onMouseLeave={handleMouseLeave}
            >
              <h2 className={`prize-title text-gold ${activePrize === "winner" ? "active" : ""}`}>
                WINNERS
              </h2>
              <p className="prize-amount">25,000RS</p>
            </div>

            <div className="separator-line"></div>

            {/* 1st Runner Up */}
            <div
              className="prize-section"
              onMouseEnter={() => handleMouseEnter("runner1")}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className={`prize-title text-silver ${activePrize === "runner1" ? "active" : ""}`}>
                1ST RUNNER UP
              </h3>
              <p className="prize-amount">15,000RS</p>
            </div>

            <div className="separator-line"></div>

            {/* 2nd Runner Up */}
            <div
              className="prize-section"
              onMouseEnter={() => handleMouseEnter("runner2")}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className={`prize-title text-bronze ${activePrize === "runner2" ? "active" : ""}`}>
                2ND RUNNER UP
              </h3>
              <p className="prize-amount">10,000RS</p>
            </div>
            <div className="separator-line"></div>
          </div>
        </div>
      </div>
      <img src="./astroman.svg" alt="Astroman" className="astroman" />
    </div>
  );
};