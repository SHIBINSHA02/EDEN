import React, { useState, useEffect } from "react";
import "./Loading.css";

export const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [pixelBlocks, setPixelBlocks] = useState([]);

  const loadingTexts = [
    "INITIALIZING EDEN 4.0...",
    "LOADING PIXEL MODULES...",
    "CONNECTING TO INNOVATION HUB...",
    "PREPARING DIGITAL WORKSPACE...",
    "SYNCING HACKATHON MATRIX...",
    "ALMOST READY TO INNOVATE...",
  ];

  useEffect(() => {
    // Generate random pixel blocks
    const blocks = [];
    for (let i = 0; i < 30; i++) {
      blocks.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      });
    }
    setPixelBlocks(blocks);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 2.5;
      });
    }, 120);

    // Text typing animation
    let textIndex = 0;
    let charIndex = 0;
    const typeText = () => {
      if (textIndex < loadingTexts.length) {
        if (charIndex < loadingTexts[textIndex].length) {
          setCurrentText(loadingTexts[textIndex].substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, 80);
        } else {
          setTimeout(() => {
            textIndex++;
            charIndex = 0;
            if (textIndex < loadingTexts.length) {
              setCurrentText("");
              setTimeout(typeText, 400);
            }
          }, 1800);
        }
      }
    };

    setTimeout(typeText, 800);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="pixel-loading-container">
      {/* Animated Pixel Background */}
      <div className="pixel-background">
        {pixelBlocks.map((block) => (
          <div
            key={block.id}
            className="pixel-block"
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              width: `${block.size}px`,
              height: `${block.size}px`,
              animationDelay: `${block.delay}s`,
              animationDuration: `${block.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Plus Signs */}
      <div className="floating-plus-signs">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`plus-sign plus-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            +
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="loading-content">
        {/* Pixelated Logo */}
        <div className="pixel-logo">
          <div className="logo-text">EDEN 4.0</div>
          <div className="logo-subtitle">LOADING...</div>
        </div>

        {/* Retro Loading Bar */}
        <div className="retro-loading-container">
          <div className="loading-label">
            {currentText}
            <span className={`pixel-cursor ${showCursor ? "visible" : ""}`}>
              █
            </span>
          </div>

          {/* Pixelated Progress Bar */}
          <div className="pixel-progress-container">
            <div className="pixel-progress-bar">
              <div
                className="pixel-progress-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-pixels">
                  {[...Array(Math.floor(progress / 5))].map((_, i) => (
                    <div key={i} className="progress-pixel" />
                  ))}
                </div>
              </div>
            </div>
            <div className="progress-percentage">{Math.floor(progress)}%</div>
          </div>

          {/* Pixel Art Elements */}
          <div className="pixel-art-elements">
            <div className="pixel-computer">
              <div className="computer-screen"></div>
              <div className="computer-base"></div>
            </div>
            <div className="pixel-rocket">
              <div className="rocket-body"></div>
              <div className="rocket-flame"></div>
            </div>
          </div>
        </div>

        {/* Loading Stats */}
        <div className="loading-stats">
          <div className="stat-item">
            <span className="stat-label">MODULES:</span>
            <span className="stat-value">{Math.floor(progress / 10)}/10</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">STATUS:</span>
            <span className="stat-value">
              {progress < 30
                ? "INITIALIZING"
                : progress < 70
                ? "LOADING"
                : progress < 100
                ? "FINALIZING"
                : "READY"}
            </span>
          </div>
        </div>

        {/* Glitch Effect */}
        <div className="glitch-overlay"></div>
      </div>
    </div>
  );
};
