import PixelArtBackground from "../Background/PixelArtbg";
import RedBullCan from "./RedBullCan";
import "./Sponsors.css";
import PropTypes from "prop-types";

export const Sponsors = ({ sponsorsData }) => {
  // Use data from props - no fallback for title sponsors to ensure data.json is the single source of truth
  const titleSponsors = sponsorsData?.titleSponsors || [];
  const communityPartners = sponsorsData?.communityPartners || [];

  return (
    <div
      className="relative w-screen overflow-hidden sponsors-section"
      id="sponsors"
    >
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />

      <div className="relative flex flex-col justify-center items-center z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        {/* Title Sponsors Section */}
        <div className="mb-12 sm:mb-16 w-full max-w-6xl">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
            TITLE SPONSORS
          </h2>
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* First row - 3 sponsors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {titleSponsors.slice(0, 3).map((sponsor, index) => (
                <div
                  key={index}
                  className={`sponsor-box ${
                    sponsor.name === "DCUBE AI" ? "dcube-box" : ""
                  } ${sponsor.name === "iTRAITZ" ? "itraitz-box" : ""} ${
                    sponsor.name === "KaiSemi" ? "kaisemi-box" : ""
                  } aspect-[3/2] rounded-lg shadow-lg ${
                    sponsor.name !== "DCUBE AI" &&
                    sponsor.name !== "iTRAITZ" &&
                    sponsor.name !== "KaiSemi"
                      ? "hover:bg-purple-500"
                      : ""
                  } transition-all duration-300 flex items-center justify-center p-4 cursor-pointer`}
                  onClick={() => {
                    if (sponsor.website && sponsor.website !== "#") {
                      window.open(
                        sponsor.website,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  title={`Visit ${sponsor.name} website`}
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.alt}
                    className="max-w-full max-h-full object-contain"
                    style={{ filter: "brightness(1.1)" }}
                  />
                </div>
              ))}
            </div>

            {/* Second row - 2 sponsors */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {titleSponsors.slice(3, 5).map((sponsor, index) => (
                <div
                  key={index + 3}
                  className={`sponsor-box ${
                    sponsor.name === "SEMentor" ? "sementor-box" : ""
                  } ${
                    sponsor.name === "Seqato" ? "seqato-box" : ""
                  } aspect-[3/2] rounded-lg shadow-lg ${
                    sponsor.name !== "SEMentor" && sponsor.name !== "Seqato"
                      ? "hover:bg-purple-500"
                      : ""
                  } transition-all duration-300 flex items-center justify-center p-4 cursor-pointer w-full sm:w-auto lg:w-full lg:max-w-[calc(33.333%-1rem)]`}
                  onClick={() => {
                    if (sponsor.website && sponsor.website !== "#") {
                      window.open(
                        sponsor.website,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  title={`Visit ${sponsor.name} website`}
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.alt}
                    className="max-w-full max-h-full object-contain"
                    style={{ filter: "brightness(1.1)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Partner Section */}
        <div className="mb-12 sm:mb-16 w-full max-w-3xl">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
            COMMUNITY PARTNERS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 justify-center flex">
            {communityPartners.map((partner, index) => (
              <div
                key={index}
                className={`sponsor-box aspect-[3/2] rounded-lg shadow-lg hover:bg-purple-500 transition-all duration-300 flex items-center justify-center p-4 cursor-pointer ${
                  partner.name === "CareStack" ? "carestack-box" : ""
                } ${partner.name === "iTRAITZ" ? "itraitz-box" : ""} ${
                  partner.name === "KaiSemi" ? "kaisemi-box" : ""
                } ${partner.name === "SEMentor" ? "sementor-box" : ""} ${
                  partner.name === "Seqato" ? "seqato-box" : ""
                }`}
                onClick={() => {
                  if (partner.website && partner.website !== "#") {
                    window.open(
                      partner.website,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
                title={`Visit ${partner.name} website`}
              >
                <img
                  src={partner.image}
                  alt={partner.alt}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: "brightness(1.1)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Energy Partner Section - Red Bull Special */}
        <div className="w-full max-w-2xl relative">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 firsky-font tracking-wider">
            ENERGY PARTNER
          </h2>

          {/* Spacepatti images - desktop only */}
          <div className="hidden lg:block">
            {/* Left spacepatti - mirrored */}
            <img
              src="/spacepatti.svg"
              alt="Space Patti Left"
              className="absolute left-[-40%] top-[50%] transform -translate-y-1/2 w-[30%] h-auto opacity-80 z-0 animate-float-left filter drop-shadow-lg"
              style={{
                animation:
                  "floatLeft 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite alternate",
              }}
            />
          </div>

          <div className="flex justify-center relative z-10">
            <div
              className="redbull-sponsor-box aspect-[3/2] w-full max-w-sm relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => {
                // Scroll to the main Red Bull section
                const redbullSection =
                  document.querySelector("#redbull-section");
                if (redbullSection) {
                  redbullSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              title="Click to see the full Red Bull experience"
            >
              {/* Red Bull gradient background */}
              <div className="absolute inset-0  opacity-90"></div>

              {/* Animated energy waves */}
              <div className="absolute inset-0 opacity-30">
                <div className="energy-wave energy-wave-1"></div>
                <div className="energy-wave energy-wave-2"></div>
                <div className="energy-wave energy-wave-3"></div>
              </div>

              {/* Pulsing glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-20 animate-pulse"></div>

              {/* Wing elements */}
              <div className="absolute top-2 left-2 opacity-60">
                <div className="wing-left"></div>
              </div>
              <div className="absolute top-2 right-2 opacity-60">
                <div className="wing-right"></div>
              </div>

              {/* Content overlay with 3D can */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  {/* 3D Red Bull Can */}
                  <div className="flex-shrink-0">
                    <RedBullCan width={200} height={200} />
                  </div>

                  {/* Text content */}
                  <div className="text-center">
                    <div className="text-white font-bold text-xl md:text-2xl minecraft-font mb-1 drop-shadow-lg text-shadow-red">
                      RED BULL
                    </div>
                    <div className="text-yellow-200 text-xs md:text-sm font-semibold tracking-wider animate-pulse">
                      GIVES YOU WINGS
                    </div>
                    {/* Energy indicator */}
                    <div className="flex justify-center mt-2 space-x-1">
                      <div className="energy-dot energy-dot-1"></div>
                      <div className="energy-dot energy-dot-2"></div>
                      <div className="energy-dot energy-dot-3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Sponsors.propTypes = {
  sponsorsData: PropTypes.shape({
    titleSponsors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        website: PropTypes.string,
      })
    ),
    communityPartners: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        website: PropTypes.string,
      })
    ),
  }),
};

export default Sponsors;
