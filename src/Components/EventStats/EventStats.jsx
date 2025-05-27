import PixelArtBackground from "../Background/PixelArtbg";
import "./EventStats.css";

const cloud1 = "/cloud1.svg";
const cloud2 = "/cloud2.svg";

const EventStats = () => {
  return (
    <div className="event-stats-section relative w-full h-96 flex items-start justify-center overflow-hidden">
      {/* Pixel Art Background */}
      <div className="absolute inset-0 z-0">
        <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      </div>

      {/* Left Cloud */}
      <img src={cloud1} alt="cloud" className="cloud cloud-left" />
      
      {/* Right Cloud */}
      <img src={cloud2} alt="cloud" className="cloud cloud-right" />

      {/* Stats Content */}
      <div className="relative z-10 flex w-full max-w-5xl justify-between items-start px-16">
        {/* 24 HOURS */}
        <div className="flex flex-col items-center stat-container">
          <span className="stat-value minecraft-font">24</span>
          <span className="stat-label minecraft-font">HOURS</span>
        </div>

        {/* 50K PRIZE POOL */}
        <div className="flex flex-col items-center stat-container">
          <span className="stat-value minecraft-font">50K</span>
          <span className="stat-label minecraft-font">PRIZE POOL</span>
        </div>

        {/* 100 PARTICIPANTS */}
        <div className="flex flex-col items-center stat-container">
          <span className="stat-value minecraft-font">100</span>
          <span className="stat-label minecraft-font">PARTICIPANTS</span>
        </div>
      </div>
    </div>
  );
};

export default EventStats; 