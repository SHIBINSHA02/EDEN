import React, { useState, useEffect } from "react";
import "./Alerts.css";

const Alert = ({
  message,
  type = "info",
  dismissible = true,
  autoDismiss = 5000, // Auto-dismiss after 5 seconds (set to 0 to disable)
  backgroundColor,
  textColor,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss logic
  useEffect(() => {
    if (autoDismiss > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss]);

  if (!isVisible) return null;

  // Default styles based on type
  const alertStyles = {
    success: { backgroundColor: "#c786e5", color: "#fffeff", borderColor: "#c786e5" },
    error: { backgroundColor: "#c786e5", color: "#fffeff", borderColor: "#c786e5" },
    warning: { backgroundColor: "#c786e5", color: "#fffeff", borderColor: "#c786e5" },
    info: { backgroundColor: "#c786e5", color: "#fffeff", borderColor: "#c786e5" },
  };

  const style = {
    backgroundColor: backgroundColor || alertStyles[type]?.backgroundColor || "#d1ecf1",
    color: textColor || alertStyles[type]?.color || "#0c5460",
    border: `1px solid ${alertStyles[type]?.borderColor || "#bee5eb"}`,
    padding: "15px",
    borderRadius: "6px",
    minWidth: "250px",
    maxWidth: "350px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    animation: "slideIn 0.3s ease-out",
  };

  return (
    <div className={`alert-notification alert-${type}`} style={style}>
      <span
        style={{
          fontFamily:"Frisky",
          fontSize: "0.9rem", // Base font size
          fontWeight:"100",
          color:"#fffeff",
          "@media (min-width: 768px)": { // Medium devices (tablets, larger phones)
            fontSize: "1rem",
          },
          "@media (min-width: 1024px)": { // Large devices (desktops)
            fontSize: "1.1rem",
          },
        }}
      >{message}</span>
      {dismissible && (
        <button
        style={{
          fontFamily:"Frisky",
          fontSize: "1rem",
          "@media (min-width: 768px)": {
            fontSize: "1.2rem",
          },
          "@media (min-width: 1024px)": {
            fontSize: "1.4rem",
          },
        }}
          className="alert-close"
          onClick={() => setIsVisible(false)}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;