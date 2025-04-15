
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LimitedOffer = () => {
  // Set countdown for 7 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({
          ...timeLeft,
          seconds: timeLeft.seconds - 1
        });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59
        });
      } else if (timeLeft.days > 0) {
        setTimeLeft({
          ...timeLeft,
          days: timeLeft.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59
        });
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timeLeft]);

  return (
    <section className="py-16 bg-saree-light-gold">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-semibold mb-4">LIMITED TIME OFFER</h2>
          <p className="text-gray-700 mb-8">
            Exclusive discount on our premium designer collection. Don't miss out!
          </p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white w-16 h-16 rounded-lg flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-bold text-saree-maroon">{timeLeft.days}</span>
              <span className="text-xs text-gray-500">Days</span>
            </div>
            <div className="bg-white w-16 h-16 rounded-lg flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-bold text-saree-maroon">{timeLeft.hours}</span>
              <span className="text-xs text-gray-500">Hours</span>
            </div>
            <div className="bg-white w-16 h-16 rounded-lg flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-bold text-saree-maroon">{timeLeft.minutes}</span>
              <span className="text-xs text-gray-500">Mins</span>
            </div>
            <div className="bg-white w-16 h-16 rounded-lg flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-bold text-saree-maroon">{timeLeft.seconds}</span>
              <span className="text-xs text-gray-500">Secs</span>
            </div>
          </div>
          
          <Link
            to="/limited-offer"
            className="inline-block bg-saree-gold text-white px-8 py-3 rounded hover:bg-opacity-90 transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LimitedOffer;
