import PixelArtBackground from "../Background/PixelArtbg";
// import RedBullCan from "./RedBullCan"; 
import "./Sponsors.css";
import PropTypes from "prop-types";

export const Sponsors = ({ sponsorsData }) => {
  const titleSponsors = sponsorsData?.titleSponsors || [];
  // const communityPartners = sponsorsData?.communityPartners || []; 

  // Helper function to get sponsor-specific CSS class
  const getSponsorClass = (sponsorName) => {
    const nameMap = {
      "DCUBE AI": "dcube-box",
      iTRAITZ: "itraitz-box",
      KaiSemi: "kaisemi-box",
      CareStack: "carestack-box",
      SEMentor: "sementor-box",
      Seqato: "seqato-box",
      MuLearn: "mulearn-box",
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
        className="max-w-full max-h-full object-contain"
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
        {/* Title Sponsors Section */}
        <div className="mb-12 sm:mb-16 w-full max-w-6xl">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
            OUR PARTNERS
          </h2>

          {/* Responsive grid for all sponsors */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {titleSponsors.map((sponsor, index) =>
              renderSponsorBox(sponsor, index)
            )}
          </div>
        </div>

        {/* Community Partner Section */}
        {/* <div className="mb-12 sm:mb-16 w-full max-w-3xl">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 frisky-font tracking-wider">
            COMMUNITY PARTNERS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 justify-center">
            {communityPartners.map((partner, index) => 
              renderSponsorBox(partner, index)
            )}
          </div>
        </div> */}

        {/* Energy Partner Section - Red Bull Special */}
        {/* <div className="w-full max-w-2xl relative">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 firsky-font tracking-wider">
            ENERGY PARTNER
          </h2>

          <div className="hidden lg:block">
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
                <div className="flex items-center space-x-4">
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
        </div> */}
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
