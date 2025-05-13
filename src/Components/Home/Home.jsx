"use client"

import { useEffect, useRef } from "react"
import "./Home.css"
import PixelArtBackground from "../Background/PixelArtbg"

export const Home = ({ heroData }) => {
  const { image } = heroData
  const { heroImage, titleImage, cloud1, cloud2, cloud3 } = image
  const titleRef = useRef(null)

  // Title animation
  useEffect(() => {
    const titleImageElement = titleRef.current
    
    if (titleImageElement) {
      console.log("Title element found:", !!titleImageElement)
      
      titleImageElement.style.visibility = 'visible'
      titleImageElement.style.transform = 'translateY(0)'
      
      setTimeout(() => {
        const isMobile = window.innerWidth <= 768
        const titleDistance = isMobile ? 40 : 100
        
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
            titleImageElement.style.transform = `translateY(-${titleDistance}px)`
            console.log("Title image animation completed")
          })
          .catch((error) => {
            console.error("Title animation error:", error)
          })
      }, 600)
    }
  }, [])

  // Cloud animations
  useEffect(() => {
    const elements = {
      cloud1: document.querySelector(".cloud-image1"),
      cloud2: document.querySelector(".cloud-image2"),
      cloud3: document.querySelector(".cloud-image3"),
      titleBgCloud: document.querySelector(".title-background-cloud")
    }
    
    const missingElements = Object.entries(elements)
      .filter(([_, el]) => !el)
      .map(([name]) => name)
    
    if (missingElements.length > 0) {
      console.error(`Missing elements: ${missingElements.join(', ')}`)
      return
    }

    // MODIFIED: Apply .loaded-final at 2000ms for cloud position transition parallel with title animation
    setTimeout(() => {
      elements.cloud1.classList.add("loaded-final")
      elements.cloud2.classList.add("loaded-final")
      elements.cloud3.classList.add("loaded-final")
    }, 600)

    const isMobile = window.innerWidth <= 768

    // Cloud Animation Definitions (Responsive)
    const cloudAnimations = [
      {
        element: elements.cloud1,
        keyframes: isMobile
          ? [{ transform: "translate(+100, 220) scale(0.5)" }, { transform: "translate(-100px, -115px) scale(0.6)" }]
          : [{ transform: "translate(0, 0) scale(0.6)" }, { transform: "translate(-20px, -10px) scale(0.7)" }],
        options: {
          duration: 4000,
          easing: "ease-in-out",
          delay: 4500, // UNCHANGED: Start after position transition (2000ms + 1500ms)
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.cloud2,
        keyframes: isMobile
          ? [{ transform: "translate(0, 0) scale(0.5)" }, { transform: "translate(5px, 10px) scale(0.7)" }]
          : [{ transform: "translate(0, 0) scale(0.5)" }, { transform: "translate(15px, 20px) scale(0.7)" }],
        options: {
          duration: 4500,
          easing: "ease-out",
          delay: 1500, // UNCHANGED: Start after position transition
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.cloud3,
        keyframes: isMobile
          ? [{ transform: "translate(0, 0) scale(0.5)" }, { transform: "translate(-8px, 3px) scale(0.6)" }]
          : [{ transform: "translate(0, 0) scale(0.5)" }, { transform: "translate(-25px, 15px) scale(0.6)" }],
        options: {
          duration: 4800,
          easing: "ease-out",
          delay: 1500, // UNCHANGED: Start after position transition
          fill: "forwards",
          iterations: Infinity,
          direction: "alternate",
        },
      },
      {
        element: elements.titleBgCloud,
        keyframes: isMobile
          ? [{ transform: "scale(0.4)" }, { transform: "scale(0.45)" }]
          : [{ transform: "scale(0.3)" }, { transform: "scale(0.35)" }],
        options: {
          duration: 3000,
          easing: "ease-in-out",
          delay: 1500, // UNCHANGED: Start after title animation
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
  }, [])

  return (
    <div className="home-container">
      <PixelArtBackground pixelSize={2} density={1.9} fadeDuration={3000} maxPlusSigns={70} initialPlusSigns={40} />
      <div className="gridding">
        <div className="hero-section">
          <div className="center-title">
            <img 
              ref={titleRef}
              src={titleImage.src || "/placeholder.svg"} 
              alt={titleImage.alt} 
              className="title-image"
              style={{ visibility: 'hidden', width: '50%', height: 'auto' }}
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