import React, { useEffect, useState } from 'react';
import PixelArtBackground from '../Background/PixelArtbg';

export const Venue = () => {
  const [backgroundError, setBackgroundError] = useState(false);

  useEffect(() => {
    // Log to check if PixelArtBackground is loaded
    try {
      console.log('Attempting to load PixelArtBackground');
      if (!PixelArtBackground) {
        throw new Error('PixelArtBackground component is undefined');
      }
    } catch (error) {
      console.error('Error with PixelArtBackground:', error);
      setBackgroundError(true);
    }
  }, []);

  // Example event handlers for PixelArtBackground
  const handleBackgroundClick = (event) => {
    console.log('PixelArtBackground clicked at:', event.clientX, event.clientY);
    // Add custom interaction logic (e.g., spawn particles, change animation)
  };

  const handleBackgroundMouseMove = (event) => {
    console.log('Mouse moved over PixelArtBackground:', event.clientX, event.clientY);
    // Add animation effects based on mouse position
  };

  return (
    <div className="relative w-screen h-screen overflow-auto">
      {/* Pixel Art Background with Fallback */}
      <div className="absolute inset-0 z-0">
        {backgroundError ? (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
            }}
          >
            {/* Fallback gradient background */}
            <p className="text-white text-center pt-4">
              Background failed to load. Using fallback.
            </p>
          </div>
        ) : (
          <PixelArtBackground
            pixelSize={2}
            density={1}
            fadeDuration={3000}
            maxPlusSigns={100}
            initialPlusSigns={50}
            className="absolute inset-0 z-0"
            onError={() => {
              console.error('PixelArtBackground failed to render');
              setBackgroundError(true);
            }}
            onClick={handleBackgroundClick}
            onMouseMove={handleBackgroundMouseMove}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen text-white px-4 py-8 sm:py-12">
        {/* Event Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 sm:mb-8 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
          Hackathon 2025 Venue
        </h1>

        {/* Venue Details Section */}
        <section className="w-full max-w-4xl bg-gray-900 bg-opacity-95 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 drop-shadow-lg">Event Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Venue:</span> Conference Hall, KV Institute of Management and Information Studies
              </p>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Address:</span> 545 Sathy Main Road, Kurumbapalayam-PO, Coimbatore, Tamil Nadu - 641107, India
              </p>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Date:</span> May 23, 2025
              </p>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Time:</span> 9:00 AM - 6:00 PM IST
              </p>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Contact:</span>{' '}
                <a href="mailto:events@kvimis.ac.in" className="underline hover:text-blue-400">
                  events@kvimis.ac.in
                </a>
              </p>
            </div>
            <div>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Organizers:</span> KVIM in collaboration with StartupTN
              </p>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Capacity:</span> 300 participants
              </p>
              <p className="text-lg drop-shadow-md">
                <span className="font-bold">Registration:</span>{' '}
                <a
                  href="https://example.com/register"
                  className="underline hover:text-blue-400"
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
        <section className="w-full max-w-4xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center drop-shadow-lg">Location</h2>
          <div className="w-full h-64 sm:h-96 bg-gray-800 rounded-lg overflow-hidden">
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
        <section className="w-full max-w-4xl bg-gray-900 bg-opacity-95 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 drop-shadow-lg">Logistics & Amenities</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li className="drop-shadow-md">
              <span className="font-bold">Wi-Fi:</span> High-speed Wi-Fi available, supporting up to 4 devices per participant. Contact organizers for access details.
            </li>
            <li className="drop-shadow-md">
              <span className="font-bold">Power:</span> Ample power outlets for laptops and devices. Extension cords provided.
            </li>
            <li className="drop-shadow-md">
              <span className="font-bold">Seating:</span> Banquet-style seating with circular tables for collaborative hacking (10 people per table).
            </li>
            <li className="drop-shadow-md">
              <span className="font-bold">Accessibility:</span> Wheelchair-accessible entrances, gender-neutral restrooms, and elevators available.
            </li>
            <li className="drop-shadow-md">
              <span className="font-bold">Food:</span> Vegetarian and dairy-free catering provided (breakfast, lunch, snacks). Coffee and water available throughout.
            </li>
            <li className="drop-shadow-md">
              <span className="font-bold">Transport:</span> Accessible via public transport (bus stop 500m away). Limited parking available.
            </li>
            <li className="drop-shadow-md">
              <span className="font-bold">Relaxation:</span> Quiet rooms and lounge areas for breaks. Outdoor space for fresh air.
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="w-full max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 drop-shadow-lg">Join Us!</h2>
          <p className="text-lg mb-6 drop-shadow-md">
            Don’t miss Hackathon 2025 at KV Institute! Collaborate, innovate, and compete for exciting prizes. Register now and be part of the tech future!
          </p>
          <a
            href="https://example.com/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors drop-shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </a>
        </section>
      </div>
    </div>
  );
};