import { useState } from "react";
import PixelArtBackground from "../Background/PixelArtbg";
import "./FaqSection.css";

const faqData = [
  {
    question: "What is EDEN Hackathon?",
    answer: "EDEN Hackathon is a 24-hour coding competition where participants collaborate to build innovative solutions. With a prize pool of 50K and 100 participants, it's one of the most exciting hackathons of the year!"
  },
  {
    question: "Who can participate in EDEN?",
    answer: "EDEN is open to all students—whether you're from Marian Engineering College or any other institution across the state. If you’re passionate about solving real-world problems using tech, you’re welcome!"
  },
  {
    question: "I’ve never participated in a hackathon before. Can I still join?",
    answer: " Absolutely! EDEN welcomes beginners and experienced participants alike. It's a great opportunity to learn, collaborate, and grow."
  },
  {
    question: "How can I register for EDEN?",
    answer: "Registrations will open on June 1. Keep an eye on our official website or social media handles for the form and deadlines."
  },
  {
    question: "Do I need to come with a team?",
    answer: "Yes. A team must have between 3 and 5 members. Make sure to register together with your team!"
  },
  {
    question: "What are the prizes and judging criteria?",
    answer: "The total prize pool is 50K, distributed across different categories including Best Overall, Most Innovative, and Best Technical Implementation. Projects are judged based on innovation, technical complexity, completeness, and presentation."
  },
  {
    question: "Is EDEN an online or offline event?",
    answer: "EDEN is a 3-day in-person event hosted at Marian Engineering College. The 24-hour hackathon takes place on Day 2, with entrepreneurial and industry interaction sessions, networking, and cultural events on Day 1, followed by judging and winner announcements on Day 3."
  },
  {
    question: "What kind of problems will we be solving?",
    answer: "Participants will work on real-world industry problems provided by our partners. These challenges will test creativity, problem-solving, and technical skills."
  },
  {
    question: "Are there any themes or specific domains for the hackathon?",
    answer: "Participants can choose from multiple problem statements provided by partner companies. As an alternative, teams may also choose to work on their own problem statement."
  },
  {
    question: "What should I bring with me?",
    answer: " Participants should bring their own laptops, chargers, valid ID cards, and any other essential hardware. Additionally, have a soft copy of the registration."
  },
  {
    question: "Are there any registration fees?",
    answer: " Yes, a registration fee is required. This fee helps cover the cost of food and accommodation provided during the event. Detailed information about the fee will be provided in the registration form."
  },
  {
    question: "What are the prizes or incentives?",
    answer: "Prize details will be announced closer to the event. Stay tuned for updates on our official website and social media."
  },
  {
    question: "Will food and accommodation be provided?",
    answer: "Yes, participants will be provided with meals and overnight accommodation at the venue to ensure a comfortable 24-hour hackathon experience."
  },
  {
    question: "Is there a selection process after registration?",
    answer: "Yes, there is a selection process. Participants will be shortlisted based on their GitHub profiles or portfolios to ensure alignment with the event's expectations.Those who are not selected will receive a full refund of their registration fee. Selected teams will be notified via email."
  },
  {
    question: "Are there any pre-event sessions or workshops?",
    answer: "Yes! Eden begins with entrepreneurship talks, industry interactions and networking sessions on Day 1 to inspire the participants before the 24-hour hackathon kicks off on Day 2."
  },
  {
    question: "Can I join the hackathon starting from Day 2, skipping the sessions on Day 1?",
    answer: "Participants are required to attend the hackathon from Day 1 and must be present on campus on the first day. Any participant who skips the pre-event sessions without prior notification and a valid reason will be subject to disqualification."
  }
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