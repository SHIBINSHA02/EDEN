import PixelArtBackground from "../Background/PixelArtbg";
import "./EventStats.css";

const cloud1 = "/cloud1.svg";
const cloud2 = "/cloud2.svg";

const EventStats = () => {
  return (
    <div className="event-stats-section relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Pixel Art Background */}
      <div className="absolute inset-0 z-0">
        <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      </div>
      {/* Stats Content */}
      <div className="relative z-10 flex w-full max-w-5xl justify-between items-center px-10">
        {/* 24 HOURS with left cloud to the left */}
        <div className="flex flex-col items-center mx-4">
          <div className="flex flex-row items-center">
            <img src={cloud1} alt="cloud" className="cloud cloud-left-side" />
            <span className="stat-value-large minecraft-font">24</span>
          </div>
          <span className="stat-label-large minecraft-font">HOURS</span>
        </div>
        {/* 50K PRIZE POOL */}
        <div className="flex flex-col items-center mx-4">
          <span className="stat-value-large minecraft-font">50K</span>
          <span className="stat-label-small minecraft-font">PRIZE POOL</span>
        </div>
        {/* 100 PARTICIPANTS with right cloud to the right */}
        <div className="flex flex-col items-center mx-4">
          <div className="flex flex-row items-center">
            <span className="stat-value-large minecraft-font">100</span>
            <img src={cloud2} alt="cloud" className="cloud cloud-right-side" />
          </div>
          <span className="stat-label-large minecraft-font">PARTICIPANTS</span>
        </div>
      </div>
    </div>
  );
};

export default EventStats; 