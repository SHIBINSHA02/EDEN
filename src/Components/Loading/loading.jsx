import { useState, useEffect } from "react";
import "./Loading.css";

export const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simple progress animation over 3 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          return 100;
        }
        return prev + 100 / 30; // 100% over 3 seconds (30 intervals of 100ms each)
      });
    }, 100);

    // Auto-complete after 3 seconds regardless of progress
    const timeoutId = setTimeout(() => {
      setProgress(100);
      setIsComplete(true);
      clearInterval(progressInterval);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="minimal-loading-container">
      {/* Main Loading Content */}
      <div className="minimal-loading-content">
        {/* Simple Logo */}
        <div className="minimal-logo">
          <img src="/title.svg" alt="EDEN 4.0" className="logo-image" />
        </div>

        {/* Minimal Loading Bar */}
        <div className="minimal-progress-container">
          <div className="minimal-progress-bar">
            <div
              className="minimal-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">
            {isComplete ? "Ready!" : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
