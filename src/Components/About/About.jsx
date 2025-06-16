"use client"
import { useState, useEffect } from "react"
import PixelArtBackground from "../Background/PixelArtbg"
import "./About.css"
import Alert from "./Alerts.jsx"; // Updated to match corrected file name

export const About = ({ description, buttonText }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [showAlert, setShowAlert] = useState(null);

  const currentDate = new Date();
  const registrationStartDate = new Date("2025-06-17T18:31:00Z");//time 12pm 17th
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


  const handleDownload = () => {
    const pdfUrl = "./Eden.pdf"
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "./Eden.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAlertClick = () => {
    if (currentDate > registrationStartDate) {
      setShowAlert(<Alert message="Registration not started" />);
      setTimeout(() => {
        setShowAlert(null);
      }, 3000); // Clear alert after 3 seconds
    } else {
      window.location.href = "https://makemypass.com/event/eden-4-0"; // Redirect URL
    }
  };


  return (
    <div className="about-container relative w-screen h-screen" id="about">
      {showAlert}
      <div className="pixelated-violet-top"></div> {/* New div for the top effect */}
      <PixelArtBackground className="about-background" pixelSize={2} density={1} fadeDuration={3000} />
      <div className="about-content">
        <div className="description">
          <p className="typing-text">
            {displayText}
            <span className={`typing-cursor ${showCursor ? "visible" : "hidden"}`}>|</span>
          </p>
        </div>
        <div className="button-container">
          <button className="primary-button" onClick={handleAlertClick}>
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
