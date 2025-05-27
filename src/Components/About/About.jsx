"use client"

import { useState, useEffect } from "react"
import PixelArtBackground from "../Background/PixelArtbg"
import "./About.css"

export const About = ({ description, buttonText }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < description.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + description[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 3) // Faster typing speed
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, description])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  const handleClick = () => {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs"
  }

  const handleDownload = () => {
    const pdfUrl = "./EDEN.pdf"
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "EDEN.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  
  return (
    <div className="about-container relative w-screen h-screen">
      <div className="pixelated-violet-top"></div>
      <PixelArtBackground className="about-background" pixelSize={2} density={1} fadeDuration={3000} />
      <div className="about-content">
        <div className="description">
          <p className="typing-text">
            {displayText}
            <span className={`typing-cursor ${showCursor ? "visible" : "hidden"}`}>|</span>
          </p>
        </div>
        <div className="button-container">
          <button className="primary-button" onClick={handleClick}>
            {buttonText}
          </button>
          <button className="secondary-button" onClick={handleDownload}>
            See Schedule
          </button>
        </div>
      </div>
    </div>
  )
}
