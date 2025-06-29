import PixelArtBackground from "../Background/PixelArtbg";
import RedBullCan from "./RedBullCan";
import "./Sponsors.css";
import PropTypes from "prop-types";

export const Sponsors = ({ sponsorsData }) => {
  const titleSponsors = sponsorsData?.titleSponsors || [];
  const communityPartners = sponsorsData?.communityPartners || [];

  // Helper function to get sponsor-specific CSS class
  const getSponsorClass = (sponsorName) => {
    const nameMap = {
      "DCUBE AI": "dcube-box",
      iTRAITZ: "itraitz-box",
      KaiSemi: "kaisemi-box",
      CareStack: "carestack-box",
      SEMentor: "sementor-box",
      Seqato: "seqato-box",
      MuLearn: "mulearn-box", // Community partner
      RevyrieGlobal: "revyrieglobal-box", // Title sponsor
    };
    return nameMap[sponsorName] || "";
  };

  // Render sponsor box component
  const renderSponsorBox = (sponsor, index, additionalClasses = "") => (
    <div
      key={`sponsor-${index}`}
      className={`sponsor-box w-full ${getSponsorClass(
        sponsor.name
      )} aspect-[3/2] rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center p-4 cursor-pointer ${additionalClasses}`}
      onClick={() => {
        if (sponsor.website && sponsor.website !== "#") {
          window.open(sponsor.website, "_blank", "noopener,noreferrer");
        }
      }}
      title={`Visit ${sponsor.name} website`}
    >
      <img
        src={sponsor.image}
        alt={sponsor.alt}
        className="sponsor-logo"
        style={{ filter: "brightness(1.1)" }}
      />
    </div>
  );

  return (
    <div
      className="relative w-screen overflow-hidden sponsors-section"
      id="sponsors"
    >
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />

      <div className="relative flex flex-col justify-center items-center z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        {/* Title Sponsor Section - Faith Infotech Academy */}
        <div className="mb-12 sm:mb-16 w-full max-w-2xl">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 frisky-font tracking-wider">
            TITLE SPONSOR
          </h2>

          <div className="flex justify-center w-full">
            <div
              className="titlesponsor relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => {
                window.open(
                  "https://faithinfotechacademy.com/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              title="Visit Faith Infotech Academy website"
            >
              {/* Animated moving gradient background */}
              <div
                className="absolute inset-0 rounded-xl blur-lg opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                style={{
                  transform: "scale(1.1)",
                  background:
                    "linear-gradient(45deg, #3b82f6, #ef4444, #1d4ed8, #dc2626, #2563eb)",
                  backgroundSize: "300% 300%",
                  animation: "gradientMove 4s ease infinite",
                }}
              ></div>

              <div
                className="relative p-4 sm:p-6 rounded-xl shadow-xl border border-blue-400/30 backdrop-blur-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1e40af, #dc2626, #3b82f6, #ef4444)",
                  backgroundSize: "400% 400%",
                  animation: "gradientShift 6s ease infinite",
                }}
              >
                {/* Animated overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                    backgroundSize: "200% 200%",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                ></div>

                <div className="relative flex flex-col items-center justify-center space-y-3 z-10">
                  <div className="w-full max-w-xs aspect-[3/2] flex items-center justify-center p-1">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/30 w-full h-full flex items-center justify-center">
                      <img
                        src="/sponsers/Faith Infotech Academy/Faith Infotech Academy.png"
                        alt="Faith Infotech Academy - Title Sponsor"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold frisky-font tracking-wide drop-shadow-lg">
                      FAITH INFOTECH ACADEMY
                    </h3>
                  </div>
                </div>

                {/* Animated corner dots with colors matching the theme */}
                <div className="absolute top-3 left-3 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-3 right-3 w-2 h-2 bg-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-12 sm:mb-16 w-full max-w-6xl">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
            OUR PARTNERS
          </h2>

          {/* Responsive grid for all sponsors */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {titleSponsors
              .slice(0, -1)
              .map((sponsor, index) => renderSponsorBox(sponsor, index))}
          </div>

          {/* Center the last sponsor (MuLearn) if it's alone in the last row */}
          {titleSponsors.length > 0 && titleSponsors.length % 3 === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-4 sm:mt-6 md:mt-8 lg:mt-12">
              <div className="col-span-2 flex justify-center md:col-span-1 md:col-start-2 md:block">
                <div className="w-full max-w-[calc(50%-0.5rem)] md:max-w-none">
                  {renderSponsorBox(
                    titleSponsors[titleSponsors.length - 1],
                    titleSponsors.length - 1
                  )}
                </div>
              </div>
            </div>
          )}

          {/* If the last row has 2 sponsors, display them normally in grid */}
          {titleSponsors.length > 0 && titleSponsors.length % 3 === 2 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-4 sm:mt-6 md:mt-8 lg:mt-12 justify-center max-w-2xl mx-auto">
              {titleSponsors
                .slice(-2)
                .map((sponsor, index) =>
                  renderSponsorBox(sponsor, titleSponsors.length - 2 + index)
                )}
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-8 w-full max-w-6xl mx-auto justify-center">
  {/* Community Partner Section */}
  <div className="mb-12 sm:mb-16 w-full max-w-md">
    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
      COMMUNITY PARTNERS
    </h2>
    <div className="flex justify-center w-full">
      <div className="w-full max-w-md">
        {communityPartners.map((partner, index) =>
          renderSponsorBox(partner, index)
        )}
      </div>
    </div>
  </div>

  {/* Energy Partner Section - Red Bull Special */}
  <div className="w-full max-w-md relative">
    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
      ENERGY PARTNER
    </h2>

    <div className="hidden lg:block py-5">
      <img
        src="/spacepatti.svg"
        alt="Space Patti Left"
        className="absolute left-[-150%] top-[50%] transform -translate-y-1/2 w-[30%] h-auto opacity-80 z-0 animate-float-left filter drop-shadow-lg"
        style={{
          animation:
            "floatLeft 6s ease-in-out infinite, glowPulse 4s ease-in-out infinite alternate",
        }}
      />
    </div>

    <div className="flex justify-center relative z-10">
      <div
        className="redbull-sponsor-box aspect-[3/2] w-full max-w-md relative overflow-hidden rounded-lg cursor-pointer group"
        onClick={() => {
          const redbullSection = document.querySelector("#redbull-section");
          if (redbullSection) {
            redbullSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        title="Click to see the full Red Bull experience"
      >
        <div className="absolute inset-0 opacity-90"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="energy-wave energy-wave-1"></div>
          <div className="energy-wave energy-wave-2"></div>
          <div className="energy-wave energy-wave-3"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-20 animate-pulse"></div>

        <div className="absolute top-2 left-2 opacity-60">
          <div className="wing-left"></div>
        </div>
        <div className="absolute top-2 right-2 opacity-60">
          <div className="wing-right"></div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="redbull flex items-center space-x-4">
            <div className="flex-shrink-0">
              <RedBullCan width={200} height={200} />
            </div>

            <div className="text-center">
              <div className="text-white font-bold text-xl md:text-2xl minecraft-font mb-1 drop-shadow-lg text-shadow-red">
                RED BULL
              </div>
              <div className="text-yellow-200 text-xs md:text-sm font-semibold tracking-wider animate-pulse">
                GIVES YOU WINGS
              </div>
              <div className="flex justify-center mt-2 space-x-1">
                <div className="energy-dot energy-dot-1"></div>
                <div className="energy-dot energy-dot-2"></div>
                <div className="energy-dot energy-dot-3"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      </div>
    </div>
  </div>
</div>//
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
