import { useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./FaqSection.css";

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
    <div className="faq-section">
      <div className="faq-background">
        <PixelArtBackground pixelSize={2} density={1} fadeDuration={3000} />
      </div>
      
      <div className="faq-container">
        {/* FAQ heading with Frisky font */}
        <div className="faq-heading frisky-font">
          FAQ
        </div>
        
        {/* FAQ items */}
        <div className="faq-items">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item minecraft-font">
              <div 
                className="faq-question"
                onClick={() => toggleAnswer(index)}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className={`plus-icon ${openIndex === index ? 'open' : ''}`}>
                  +
                </span>
              </div>
              {openIndex === index && (
                <div className="faq-answer animate-fadeIn">
                  {faq.answer}
                </div>
              )}
              <div className="faq-divider"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};