import { useEffect, useRef, useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";

const Redbull = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="redbull-section"
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : "70%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "transparent",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "0" : undefined,
          left: isMobile ? "50%" : undefined,
          transform: isMobile ? "translate(-50%, 0)" : undefined,
          zIndex: isMobile ? 10 : 2,
        }}
      >
        <img
          src="/energypartner.svg"
          alt="Energy Partner Logo"
          style={{
            width: isMobile ? "70%" : "50%",
            height: "auto",
            margin: "auto",
            zIndex: 10,
          }}
        />
      </div>
      <div
        style={{
          width: isMobile ? "100%" : "30%",
          height: isMobile ? "60vh" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 4,
        }}
      >
        <img
          src="/Red Bull.svg"
          alt="Red Bull"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#000",
          zIndex: 1,
        }}
      />
      <PixelArtBackground
        pixelSize={2}
        density={1}
        fadeDuration={3000}
        maxPlusSigns={100}
        initialPlusSigns={50}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Redbull;
