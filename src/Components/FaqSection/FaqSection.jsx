import { useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";

const faqData = [
  {
    question: "What is EDEN Hackathon?",
    answer: "EDEN Hackathon is a 24-hour coding competition where participants collaborate to build innovative solutions. With a prize pool of 50K and 100 participants, it's one of the most exciting hackathons of the year!"
  },
  {
    question: "How can I participate in the hackathon?",
    answer: "You can participate by registering through our website. Form a team of 2-4 members or join as an individual. Make sure to register before the deadline to secure your spot!"
  },
  {
    question: "What are the prizes and judging criteria?",
    answer: "The total prize pool is 50K, distributed across different categories including Best Overall, Most Innovative, and Best Technical Implementation. Projects are judged based on innovation, technical complexity, completeness, and presentation."
  }
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-screen min-h-screen flex justify-center items-start py-20">
      {/* Pixel Art Background */}
      <div className="absolute inset-0 z-0">
        <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      </div>
      
      <div className="relative flex w-full max-w-screen-lg z-10 px-8 items-start">
        {/* Left side: FAQ heading */}
        <div className="w-1/3 flex justify-start items-start text-white text-6xl font-bold minecraft-font -ml-8">
          FAQ
        </div>
        
        {/* Right side: FAQ items */}
        <div className="w-2/3 flex flex-col items-start space-y-8 pl-8">
          {faqData.map((faq, index) => (
            <div key={index} className="w-full text-white minecraft-font">
              <div 
                className="flex justify-between items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleAnswer(index)}
              >
                <span className="text-xl pr-8">{faq.question}</span>
                <span className="text-2xl transform transition-transform duration-300" style={{
                  transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                }}>
                  +
                </span>
              </div>
              {openIndex === index && (
                <div className="mt-4 text-gray-300 text-lg pl-2 pr-8 pb-4 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
              <div className="border-b border-purple-400 mt-3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 