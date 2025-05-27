import PixelArtBackground from "../Background/PixelArtbg";

export const FaqSection = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center" id="faq">
      
      <div className="absolute inset-0 z-0">
         <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      </div>
      
      <div className="relative flex w-full max-w-screen-lg h-full z-10 px-8 py-16 items-start">
        {/* Left side: FAQ heading */}
        <div className="w-1/3 flex justify-start items-start text-white text-6xl font-bold minecraft-font mt-[-4rem] -ml-8">
          FAQ
        </div>
        
        <div className="w-2/3 flex flex-col items-start space-y-8 pl-8">
          {/* FAQ Item 1 */}
          <div className="w-full text-white text-xl minecraft-font">
            <div className="flex justify-between items-center">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              <span className="text-2xl">+</span>
            </div>
            <div className="border-b border-purple-400 mt-3"></div>
          </div>
          {/* FAQ Item 2 */}
          <div className="w-full text-white text-xl minecraft-font">
            <div className="flex justify-between items-center">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              <span className="text-2xl">+</span>
            </div>
            <div className="border-b border-purple-400 mt-3"></div>
          </div>
          {/* FAQ Item 3 */}
          <div className="w-full text-white text-xl minecraft-font">
            <div className="flex justify-between items-center">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              <span className="text-2xl">+</span>
            </div>
            <div className="border-b border-purple-400 mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 