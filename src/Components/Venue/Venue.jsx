import React, { useEffect, useState } from 'react';
import PixelArtBackground from '../Background/PixelArtbg';
import './Venue.css';

export const Venue = () => {
  const [backgroundError, setBackgroundError] = useState(false);

  useEffect(() => {
    try {
      console.log('Attempting to load PixelArtBackground in Venue');
      if (!PixelArtBackground) {
        throw new Error('PixelArtBackground component is undefined');
      }
    } catch (error) {
      console.error('Error with PixelArtBackground:', error);
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
              console.error('PixelArtBackground failed to render in Venue');
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
        <h1 className="event-title">
          Hackathon 2025 Venue
        </h1>

        {/* Venue Details Section */}
        <section className="venue-details">
          <h2 className="section-title">Event Details</h2>
          <div className="details-grid">
            <div>
              <p className="detail-item">
                <span className="detail-label">Venue:</span> Conference Hall, KV Institute of Management and Information Studies
              </p>
              <p className="detail-item">
                <span className="detail-label">Address:</span> 545 Sathy Main Road, Kurumbapalayam-PO, Coimbatore, Tamil Nadu - 641107, India
              </p>
              <p className="detail-item">
                <span className="detail-label">Date:</span> May 23, 2025
              </p>
              <p className="detail-item">
                <span className="detail-label">Time:</span> 9:00 AM - 6:00 PM IST
              </p>
              <p className="detail-item">
                <span className="detail-label">Contact:</span>{' '}
                <a href="mailto:events@kvimis.ac.in" className="link">
                  events@kvimis.ac.in
                </a>
              </p>
            </div>
            <div>
              <p className="detail-item">
                <span className="detail-label">Organizers:</span> KVIM in collaboration with StartupTN
              </p>
              <p className="detail-item">
                <span className="detail-label">Capacity:</span> 300 participants
              </p>
              <p className="detail-item">
                <span className="detail-label">Registration:</span>{' '}
                <a
                  href="https://example.com/register"
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2 className="section-title text-center">Location</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.765047136255!2d77.02887631480175!3d11.104614692087832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7b7a7b7a7b7%3A0x7b7b7b7b7b7b7b7b!2sKV%20Institute%20of%20Management%20and%20Information%20Studies!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
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
        

        {/* Call to Action */}
        
      </div>
    </div>
  );
};