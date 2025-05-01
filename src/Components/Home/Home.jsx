"use client"

import { useEffect, useState, useRef } from "react"
import "./Home.css"
import PixelArtBackground from "../Background/PixelArtbg"

export const Home = ({ heroData }) => {
  const { image } = heroData
  const { heroImage, titleImage, cloud1, cloud2, cloud3 } = image
  const [isLoaded, setIsLoaded] = useState(false)
  const titleRef = useRef(null)

  // Set loaded state when component mounts
  useEffect(() => {
    // Short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  // Title animation
  useEffect(() => {
    if (!isLoaded) return
    
    const titleImageElement = titleRef.current
    
    if (titleImageElement) {
      console.log("Title element found:", !!titleImageElement)
      
      // Make sure image is visible first in center position
      titleImageElement.style.visibility = 'visible'
      titleImageElement.style.opacity = '1'
      
      // Start with the image centered on screen (no transform)
      titleImageElement.style.transform = 'translateY(0)'
      
      // Delay before starting upward animation
      setTimeout(() => {
        const isMobile = window.innerWidth <= 768
        const titleDistance = isMobile ? 40 : 100
        
        // Animate upward
        const titleAnimation = titleImageElement.animate(
          [
            { transform: 'translateY(0)' },
            { transform: `translateY(-${titleDistance}px)` }
          ],
          {
            duration: 1500,
            easing: "ease-in-out",
            fill: "forwards"
          }
        )
        
        titleAnimation.finished
          .then(() => {
            // Apply final state with inline style to ensure it stays
            titleImageElement.style.transform = `translateY(-${titleDistance}px)`
            console.log("Title image animation completed")
          })
          .catch((error) => {
            console.error("Title animation error:", error)
          })
      }, 2000) // Delay before starting upward motion
    }
  }, [isLoaded])

  // Cloud animations
  useEffect(() => {
    if (!isLoaded) return

    const elements = {
      cloud1: document.querySelector(".cloud-image1"),
      cloud2: document.querySelector(".cloud-image2"),
      cloud3: document.querySelector(".cloud-image3"),
      titleBgCloud: document.querySelector(".title-background-cloud")
    }
    
    // Verify all elements exist
    const missingElements = Object.entries(elements)
      .filter(([_, el]) => !el)
      .map(([name]) => name)
    
    if (missingElements.length > 0) {
      console.error(`Missing elements: ${missingElements.join(', ')}`)
      return
    }

    const isMobile = window.innerWidth <= 768

    // Cloud Animation Definitions (Responsive)
    const cloudAnimations = [
      {
        element: elements.cloud1,
        keyframes: isMobile
          ? [{ transform: "translate(0, 0) scale(1)" }, { transform: "translate(-10px, -5px) scale(0.9)" }]
          : [{ transform: "translate(0, 0) scale(1)" }, { transform: "translate(-20px, -10px) scale(0.8)" }],
        options: {
          duration: 2000,
          easing: "ease-in-out",
          delay: 2500, // Start after title animation
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.cloud2,
        keyframes: isMobile
          ? [{ transform: "translate(0, 0) scale(1)" }, { transform: "translate(5px, 10px) scale(0.95)" }]
          : [{ transform: "translate(0, 0) scale(1)" }, { transform: "translate(15px, 20px) scale(0.85)" }],
        options: {
          duration: 2500,
          easing: "ease-out",
          delay: 2700, // Start after title animation
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.cloud3,
        keyframes: isMobile
          ? [{ transform: "translate(0, 0) scale(1)" }, { transform: "translate(-8px, 3px) scale(0.88)" }]
          : [{ transform: "translate(0, 0) scale(1)" }, { transform: "translate(-25px, 15px) scale(0.75)" }],
        options: {
          duration: 1800,
          easing: "ease-in",
          delay: 2600, // Start after title animation
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.titleBgCloud,
        keyframes: isMobile
          ? [{ transform: "translate(-50%, -50%) scale(0.4)" }, { transform: "translate(-45%, -53%) scale(0.45)" }]
          : [{ transform: "translate(-50%, -50%) scale(0.3)" }, { transform: "translate(-40%, -55%) scale(0.35)" }],
        options: {
          duration: 3000,
          easing: "ease-in-out",
          delay: 1000,
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
    ]

    // Apply animations to clouds
    cloudAnimations.forEach(({ element, keyframes, options }) => {
      element.animate(keyframes, options).finished.catch((error) => {
        console.error("Cloud animation error:", error)
      })
    })
  }, [isLoaded])

  return (
    <div className="home-container">
      <PixelArtBackground pixelSize={2} density={1.9} fadeDuration={3000} maxPlusSigns={70} initialPlusSigns={40} />
      <div className="gridding">
        <div className="hero-section">
          <div className={`center-title ${isLoaded ? 'loaded' : ''}`}>
            <img 
              ref={titleRef}
              src={titleImage.src || "/placeholder.svg"} 
              alt={titleImage.alt} 
              className="title-image"
              style={{ visibility: 'hidden', width: '50%', height: 'auto' }} // Start hidden, 50% width
              onLoad={(e) => {
                console.log("Title image loaded with dimensions:", e.target.width, "x", e.target.height);
              }}
            />
            <img 
              src={cloud1.src || "/placeholder.svg"} 
              alt="Background cloud" 
              className="title-background-cloud" 
            />
          </div>
          <img src={cloud1.src || "/placeholder.svg"} alt={cloud1.alt} className="cloud-image1" />
          <img src={cloud2.src || "/placeholder.svg"} alt={cloud2.alt} className="cloud-image2" />
          <img src={cloud3.src || "/placeholder.svg"} alt={cloud3.alt} className="cloud-image3" />
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
  )
}