// src/Components/Schedule/Schedule.jsx
import PixelArtBackground from "../Background/PixelArtbg"; // Adjust the import path as necessary

export const Schedule = () => {
  return (
    <div className="relative w-screen h-screen">
      <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      <div className="absolute inset-0 flex justify-center items-center text-white text-2xl">
        Schedule
      </div>
    </div>
  );
};
