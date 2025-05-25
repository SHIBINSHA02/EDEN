import React from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./Sponsors.css";

export const Sponsors = () => {
  return (
    <div
      className="relative w-screen overflow-hidden sponsors-section"
      id="sponsors"
    >
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />

      <div className="relative flex flex-col justify-center items-center z-10 px-8 py-16">
        {/* Title Sponsors Section */}
        <div className="mb-16 w-full max-w-6xl">
          <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-12 minecraft-font tracking-wider">
            TITLE SPONSORS
          </h2>
          <div className="grid grid-cols-3 gap-8 md:gap-12 mb-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="sponsor-box aspect-[3/2] bg-purple-600 rounded-lg shadow-lg hover:bg-purple-500 transition-colors duration-300"
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            {[...Array(3)].map((_, index) => (
              <div
                key={index + 3}
                className="sponsor-box aspect-[3/2] bg-purple-600 rounded-lg shadow-lg hover:bg-purple-500 transition-colors duration-300"
              />
            ))}
          </div>
        </div>

        {/* Community Partner Section */}
        <div className="mb-16 w-full max-w-4xl">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-12 minecraft-font tracking-wider">
            COMMUNITY PARTNER
          </h2>
          <div className="grid grid-cols-2 gap-8 md:gap-12 justify-center">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="sponsor-box aspect-[3/2] bg-purple-600 rounded-lg shadow-lg hover:bg-purple-500 transition-colors duration-300"
              />
            ))}
          </div>
        </div>

        {/* Energy Partner Section */}
        <div className="w-full max-w-2xl">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-12 minecraft-font tracking-wider">
            ENERGY PARTNER
          </h2>
          <div className="flex justify-center">
            <div className="sponsor-box aspect-[3/2] bg-purple-600 rounded-lg shadow-lg hover:bg-purple-500 transition-colors duration-300 w-full max-w-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
