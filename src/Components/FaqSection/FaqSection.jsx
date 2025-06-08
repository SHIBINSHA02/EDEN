import { useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./FaqSection.css";

const faqData = [
  {
    question: "What is EDEN?",
    answer: "EDEN is a 24-hour hackathon where participants build innovative solutions to real-word problems. Drawing participants from all over the state, it's one of the most exciting hackathons of the year!"
  },
  {
    question: "Who can participate in EDEN?",
    answer: "EDEN is open to all students—whether you're from Marian Engineering College or any other institution across the state."
  },
  {
    question: "How can I register for EDEN?",
    answer: "Registrations will open on June 6. Keep an eye on our official website or social media handles for the form and deadlines."
  },
  {
    question: "How many members are allowed in a team?",
    answer: "A team must have between 2 and 4 members. Make sure to register together with your team!"
  },
  {
    question: "Is EDEN an online or offline event?",
    answer: "EDEN is a 2-day in-person event hosted at Marian Engineering College. The 24-hour hackathon takes place on Day 1, followed by judging and winner announcements on Day 2."
  },
  {
    question: "Will food and accommodation be provided?",
    answer: "Yes, participants will be provided with meals and overnight accommodation at the venue to ensure a comfortable 24-hour hackathon experience."
  },
];
export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowMore = () => {
    setShowAll(!showAll);
  };

  // Determine how many FAQs to display
  const visibleFaqs = showAll ? faqData : faqData.slice(0, 7);

  return (
    <div className="faq-section" id="faq">
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
          {visibleFaqs.map((faq, index) => (
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
          {/* Show More/Show Less Button */}
          {faqData.length > 7 && (
            <div className="faq-show-more">
              <button
                className="show-more-button minecraft-font"
                onClick={toggleShowMore}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>

        {/* Planet image - desktop only */}
        <div className="hidden lg:block">
          <img
            src="/planet.svg"
            alt="Pink Planet"
            className="absolute left-[-15%] top-[200px] transform -translate-y-auto w-[500px] h-[500px] opacity-80 z-0 filter drop-shadow-lg"
            style={{
              animation:
                "ease-in-out infinite, glowPulse 2s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
};