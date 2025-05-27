import { useEffect, useState } from "react";
import "./countdown.css";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger loaded-final class after component mounts
    setTimeout(() => setIsLoaded(true), 100);

    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(targetDate) - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={`countdown-container ${isLoaded ? "loaded-final" : ""}`}>
      <div className="countdown-title">Be Ready for the challenge</div>
      <div className="timer">
        <div className="time-units">
          <div className="time-unit">
            <div className="time-value">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="time-label">DAYS</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-unit">
            <div className="time-value">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="time-label">HOURS</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-unit">
            <div className="time-value">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="time-label">MINS</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-unit">
            <div className="time-value">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="time-label">SECS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
