import PixelArtBackground from "../Background/PixelArtbg";
import "./EventStats.css";

const cloud1 = "/cloud1.svg";
const cloud2 = "/cloud2.svg";

const EventStats = () => {
  return (
    <div className="event-stats-section">
      {/* Pixel Art Background */}
      <div className="background-container">
        <PixelArtBackground pixelSize={2} density={0.5} fadeDuration={3000} />
      </div>

      {/* Left Cloud */}
      <img src={cloud1} alt="cloud" className="cloud cloud-left" />

      {/* Right Cloud */}
      <img src={cloud2} alt="cloud" className="cloud cloud-right" />
      {window.innerWidth < 768 && (
  <img src="./spacepatti.svg" alt="spacedog" className="spacepatti" />
)}
      {/* Stats Content */}
      <div className="stats-content">
        {/* 24 HOURS */}
        <div className="stat-container">
          <span className="stat-value">24</span>
          <span className="stat-label">HOURS</span>
        </div>

        {/* 50K PRIZE POOL */}
        <div className="stat-container">
          <span className="stat-value">50K</span>
          <span className="stat-label">PRIZE POOL</span>
        </div>

        {/* 100 PARTICIPANTS */}
        <div className="stat-container">
          <span className="stat-value">100</span>
          <span className="stat-label">PARTICIPANTS</span>
        </div>
      </div>
    </div>
  );
};

export default EventStats;