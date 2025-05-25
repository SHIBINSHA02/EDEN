import React, { useState, useEffect } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./Footer.css";
// import { Instagram, Twitter, LinkedIn } from './assets/svg';
// import data from '../../../data.json';

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const data = {
    email: "contact@mulearn.org",
    linkedIn: "https://www.linkedin.com/in/mulearn",
    instagram: "https://www.instagram.com/mulearn",
    twitter: "https://twitter.com/mulearn",
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="FooterWrapper">
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />

      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-logo">
            <div className="logo-text">EDEN 4.0</div>
            <div className="logo-subtitle">HACKATHON</div>
          </div>
          <p className="brand-description">
            Where innovation meets execution. Join the ultimate coding challenge
            and build the future.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href={`mailto:${data.email}`} className="contact-link">
                {data.email}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h3 className="link-title">Explore</h3>
            <div className="link-list">
              <a
                href="https://mulearn.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                µLearn
              </a>
              <a
                href="https://mulearn.org/announcements"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Events
              </a>
              <a
                href="https://mulearn.org/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Gallery
              </a>
              <a
                href="https://online.fliphtml5.com/egsqr/tlgc/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Branding
              </a>
            </div>
          </div>

          <div className="link-group">
            <h3 className="link-title">Connect</h3>
            <div className="social-grid">
              <a
                href={data.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <div className="social-icon">in</div>
                <span>LinkedIn</span>
              </a>
              <a
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <div className="social-icon">ig</div>
                <span>Instagram</span>
              </a>
              <a
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
              >
                <div className="social-icon">tw</div>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-stats">
          <div className="stat-item">
            <div className="stat-number">48</div>
            <div className="stat-label">Hours</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Participants</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Prize Pool</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="bottom-content">
          <div className="copyright">
            <p>© {currentYear} EDEN 4.0 Hackathon. All rights reserved.</p>
            <p>Powered by µLearn Foundation</p>
          </div>
          <div className="footer-badge">
            <div className="badge-text">BUILT FOR INNOVATORS</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
