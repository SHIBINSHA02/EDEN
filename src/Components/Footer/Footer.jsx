import { useState, useEffect } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./Footer.css";
import { FaLinkedinIn, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const data = {
    email: "marianiedc@gmail.com",
    linkedIn: "https://www.linkedin.com/company/inspira-marian-iedc/",
    instagram: "https://www.instagram.com/marianiedc",
    twitter: "https://twitter.com",
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="minimal-footer" >
      <PixelArtBackground pixelSize={2} density={0.8} fadeDuration={3000} />

      {/* Floating Plus Signs */}
      <div className="footer-plus-signs">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`footer-plus plus-${i % 3}`}
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            +
          </div>
        ))}
      </div>

      <div className="footer-content">
        {/* Main Brand Section */}
        <div className="footer-brand-minimal">
          <div className="brand-logo-minimal">
            <div className="logo-text-minimal">EDEN 4.0</div>
            <div className="logo-tagline">
              Innovate • Collaborate • Transform
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-social-minimal">
          <a
            href={data.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="social-minimal linkedin"
            aria-label="LinkedIn"
          >
            <div className="social-icon-minimal">
              <FaLinkedinIn />
            </div>
          </a>
          <a
            href={data.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-minimal instagram"
            aria-label="Instagram"
          >
            <div className="social-icon-minimal">
              <FaInstagram />
            </div>
          </a>
          <a
            href={data.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="social-minimal twitter"
            aria-label="Twitter"
          >
            <div className="social-icon-minimal">
              <FaTwitter />
            </div>
          </a>
          <a
            href={`mailto:${data.email}`}
            className="social-minimal email"
            aria-label="Email"
          >
            <div className="social-icon-minimal">
              <FaEnvelope />
            </div>
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-copyright-minimal">
          <p>© {currentYear} EDEN 4.0 • Powered by Inspira Marian IEDC</p>
          <div className="footer-badge-minimal">
            <span>BUILT FOR INNOVATORS</span>
          </div>
        </div>
      </div>

      {/* Pixel Border */}
      <div className="footer-pixel-border"></div>
    </footer>
  );
};