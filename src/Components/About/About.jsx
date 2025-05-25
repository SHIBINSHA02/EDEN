import PixelArtBackground from "../Background/PixelArtbg";
import "./About.css";

export const About = ({ description, buttonText }) => {
  const handleClick = () => {
    window.location.href = "https://www.youtube.com/";
  };
  return (
    <div className="about-container">
      <PixelArtBackground
        className="about-background"
        pixelSize={2}
        density={1}
        fadeDuration={3000}
      />
      <div className="about-content">
        <div className="description">
          <p>{description}</p>
        </div>
        <button onClick={handleClick}>{buttonText}</button>
      </div>
    </div>
  );
};
