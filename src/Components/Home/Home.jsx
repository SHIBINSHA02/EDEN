import { useEffect, useRef } from "react";
import "./Home.css";
import PixelArtBackground from "../Background/PixelArtbg";
import Countdown from "./countdown";

export const Home = ({ heroData }) => {
  const { image } = heroData;
  const { heroImage, titleImage, cloud1, cloud2, cloud3 } = image;
  const titleRef = useRef(null);

  // Define the target date for the countdown
  const targetDate = new Date("2025-06-27T03:01:00Z");//time 24:00  15th june

  // Title animation
  useEffect(() => {
    const titleImageElement = titleRef.current;

    if (titleImageElement) {
      titleImageElement.style.visibility = "visible";
      titleImageElement.style.transform = "translateY(0)";

      const isMobile = window.innerWidth <= 768;
      const titleDistance = isMobile ? 40 : 100;

      setTimeout(() => {
        titleImageElement
          .animate(
            [
              { transform: "translateY(0)" },
              { transform: `translateY(-${titleDistance}px)` },
            ],
            {
              duration: 1500,
              easing: "ease-in-out",
              fill: "forwards",
            }
          )
          .finished.then(() => {
            titleImageElement.style.transform = `translateY(-${titleDistance}px)`;
          })
          .catch(() => {});
      }, 600);
    }
  }, []);

  // Cloud animations
  useEffect(() => {
    const elements = {
      cloud1: document.querySelector(".cloud-image1"),
      cloud2: document.querySelector(".cloud-image2"),
      cloud3: document.querySelector(".cloud-image3"),
    };

    // Check for missing elements
    const missingElements = Object.entries(elements)
      .filter(([, el]) => !el)
      .map(([name]) => name);

    if (missingElements.length > 0) {
      console.warn(`Missing elements: ${missingElements.join(", ")}`);
      return;
    }

    // Add loaded-final class for initial CSS transitions
    setTimeout(() => {
      Object.values(elements).forEach((el) => el.classList.add("loaded-final"));
    }, 600);

    // Define looping animations after initial transition
    const isMobile = window.innerWidth <= 768;

    const cloudAnimations = [
      {
        element: elements.cloud1,
        keyframes: isMobile
          ? [
              { transform: "translate(-5px, -8px) scale(0.6)" },
              { transform: "translate(5px, 8px) scale(0.6)" },
            ]
          : [
              { transform: "translate(-20px, -10px) scale(0.7)" },
              { transform: "translate(20px, 10px) scale(0.7)" },
            ],
        options: {
          duration: 4000,
          easing: "ease-in-out",
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.cloud2,
        keyframes: isMobile
          ? [
              { transform: "translate(5px, 10px) scale(0.6)" },
              { transform: "translate(-5px, -10px) scale(0.6)" },
            ]
          : [
              { transform: "translate(15px, 20px) scale(0.7)" },
              { transform: "translate(-15px, -20px) scale(0.7)" },
            ],
        options: {
          duration: 4500,
          easing: "ease-out",
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.cloud3,
        keyframes: isMobile
          ? [
              { transform: "translate(-8px, 3px) scale(0.6)" },
              { transform: "translate(8px, -3px) scale(0.6)" },
            ]
          : [
              { transform: "translate(-25px, 15px) scale(0.6)" },
              { transform: "translate(25px, -15px) scale(0.6)" },
            ],
        options: {
          duration: 4800,
          easing: "ease-out",
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
    ];

    // Start looping animations after initial transition
    const animations = cloudAnimations.map(
      ({ element, keyframes, options }) =>
        element.animate(keyframes, { ...options, delay: 2100 }) // Delay to wait for CSS transition
    );

    // Cleanup animations on unmount
    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div className="home-container" id="home">
      <PixelArtBackground
        pixelSize={2}
        density={1.9}
        fadeDuration={3000}
        maxPlusSigns={70}
        initialPlusSigns={40}
      />

      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${(i % 3) + 1}`}></div>
        ))}
      </div>

      <div className="gridding">
        <div className="hero-section">
          <div className="center-title">
            <img
              ref={titleRef}
              src={titleImage.src || "/placeholder.svg"}
              alt={titleImage.alt}
              className="title-image"
              style={{
                visibility: "hidden",
                width: "50%",
                height: "auto",
                marginTop: "40px",
              }}
            />
            <div className="countdown-container close-to-title">
              <Countdown targetDate={targetDate} />
            </div>
          </div>
          <img
            src={cloud1.src || "/placeholder.svg"}
            alt={cloud1.alt}
            className="cloud-image1"
          />
          <img
            src={cloud2.src || "/placeholder.svg"}
            alt={cloud2.alt}
            className="cloud-image2"
          />
          <img
            src={cloud3.src || "/placeholder.svg"}
            alt={cloud3.alt}
            className="cloud-image3"
          />
        </div>
        <div className="hero-image-container">
          <img
            src={heroImage.src || "/placeholder.svg"}
            alt={heroImage.alt}
            className="hero-image hero-image-original"
          />
          <img
            src={heroImage.src || "/placeholder.svg"}
            alt={`${heroImage.alt} mirrored`}
            className="hero-image hero-image-mirrored"
          />
          <img
            src={heroImage.src || "/placeholder.svg"}
            alt={heroImage.alt}
            className="hero-image hero-image-original"
          />
        </div>
      </div>
    </div>
  );
};
