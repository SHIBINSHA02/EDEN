import React from 'react'
import PixelArtBackground from '../Background/PixelArtbg'
import './About.css'

export const About = ({ description, buttonText }) => {
  return (
    <div className="about-container">
      <PixelArtBackground className="about-background" pixelSize={2} density={1} fadeDuration={3000} />
      <div className="about-content">
        <div className='description'>
        <p>{description}</p>
        </div>
        <button>{buttonText}</button>
      </div>
    </div>
  )
}
