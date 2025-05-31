import { useEffect, useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./Venue.css";

export const Venue = () => {
  const [backgroundError, setBackgroundError] = useState(false);

  useEffect(() => {
    try {
      console.log("Attempting to load PixelArtBackground in Venue");
      if (!PixelArtBackground) {
        throw new Error("PixelArtBackground component is undefined");
      }
    } catch (error) {
      console.error("Error with PixelArtBackground:", error);
      setBackgroundError(true);
    }
  }, []);

  return (
    <div className="venue-container">
      {/* Pixel Art Background with Fallback */}
      <div className="background-wrapper">
        {backgroundError ? (
          <div className="fallback-background">
            <p className="fallback-text">
              Background failed to load. Using fallback.
            </p>
          </div>
        ) : (
          <PixelArtBackground
            pixelSize={2}
            density={1.9}
            fadeDuration={3000}
            maxPlusSigns={70}
            initialPlusSigns={40}
            className="background-canvas"
            onError={() => {
              setBackgroundError(true);
            }}
          />
        )}
      </div>

      {/* Transparent Overlay */}
      <div className="overlay" />

      {/* Main Content */}
      <div className="content-container">
        {/* Event Title */}
        <h1 className="event-title">EDEN 2025</h1>

        {/* Venue Details Section */}
        <section className="venue-details">
          <div className="details-grid">
            <p className="detail-item">
              <span className="detail-label">Address:</span>{" "}
              <span className="detail-content">
              Marian Engineering College,Kazhakuttom, Thiruvananthapuram - 695582,Kerala,India
              </span>
            </p>
            <p className="detail-item">
              <span className="detail-label">Contact:</span>
              <br />
              <span className="detail-content">
                <a href="tel:+919496482580" className="link">
                  +91 9496482580
                </a>{" "}
                
                (Chief Operations Officer)
                <br />
                <a href="tel:+918617741675" className="link">
                  +91 8617741675
                </a>{" "}
                
                (Chief Finance Officer)
              </span>
            </p>
            <p className="detail-item">
              <span className="detail-label">Email:</span>{" "}
              <span className="detail-content">
                <a href="marianiedc@gmail.com" className="link">
                  marianiedc@gmail.com
                </a>
              </span>
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2 className="section-title text-center">Location</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.3762157324804!2d76.8584222854584!3d8.559774704159627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05be4db228e865%3A0x86e82fcb1e3e3ad0!2sMarian%20Engineering%20College!5e0!3m2!1sen!2sin!4v1748373637896!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Venue Location Map"
            />
          </div>
        </section>

        {/* Logistics Section */}
        {/* You can add more sections here */}

        {/* Call to Action */}
      </div>

      {/* Desktop Image */}
      <img
        src="./rocket.svg" // Replace with your image URL
        alt="Event Image"
        className="desktop-image"
      />
    </div>
  );
};