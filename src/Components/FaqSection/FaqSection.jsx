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
  },
  {
    question: "Who can participate in Eden?",
    answer: "Eden is open to all students—whether you're from Marian Engineering College or any other institution across the state. If you’re passionate about solving real-world problems using tech, you’re welcome!"
  },
  {
    question: "Is Eden an online or offline event?",
    answer: "Eden is a 3-day in-person event hosted at Marian Engineering College. The 24-hour hackathon takes place on Day 2, with entrepreneurial and industry interaction sessions, networking, and cultural events on Day 1, followed by judging and winner announcements on Day 3."
  },
  {
    question: "Do I need to come with a team?",
    answer: "You can register either as a team (typically 3–5 members) or as an individual. We’ll help match individual participants with others to form teams, if needed."
  },
  {
    question: "What kind of problems will we be solving?",
    answer: "Participants will work on real-world industry problems provided by our partners. These challenges will test creativity, problem-solving, and technical skills."
  },
  {
    question: "Are there any themes or specific domains for the hackathon?",
    answer: "Yes, problem statements will be aligned with specific domains. More details will be released closer to the event."
  },
  {
    question: "Will there be mentorship during the event?",
    answer: "Yes! Eden features expert mentors from industry and academia who will guide you throughout the hackathon."
  },
  {
    question: "What should I bring with me?",
    answer: "Participants should bring their own laptops, chargers, valid ID cards, and any other essential hardware."
  },
  {
    question: "Are there any registration fees?",
    answer: "Details about registration fees will be announced soon. Please check our official website or social media for updates."
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
    question: "How can I register for Eden?",
    answer: "Registrations will open on a specified date. Keep an eye on our official website or social media handles for the form and deadlines."
  },
  {
    question: "I’ve never participated in a hackathon before. Can I still join?",
    answer: "Absolutely! Eden is beginner-friendly, and our mentors are here to support you. All you need is enthusiasm and a willingness to learn!"
  },
  {
    question: "Is there a selection process after registration?",
    answer: "Yes, teams will be shortlisted based on their submitted ideas, focusing on innovation, feasibility, and relevance. Selected teams will be notified via email by a specified date."
  },
  {
    question: "Are there any pre-event sessions or workshops?",
    answer: "Yes! Eden begins with entrepreneurship talks, industry interactions, and networking sessions on Day 1 to inspire and prepare participants before the 24-hour hackathon kicks off on Day 2."
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