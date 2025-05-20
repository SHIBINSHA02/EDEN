import React, { useEffect, useState } from 'react';
import './countdown.css';
const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const distance = new Date(targetDate) - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div>
            <h1>Countdown</h1>
            <p>{timeLeft.days} Days</p>
            <p>{timeLeft.hours} Hours</p>
            <p>{timeLeft.minutes} Minutes</p>
            <p>{timeLeft.seconds} Seconds</p>
        </div>
    );
};

export default Countdown;
