'use client';

import { useState, useEffect } from 'react';

export default function TopbarCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const targetDate = new Date('January 1, 2027 00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="bg-orange-600 text-white py-2 text-center text-sm font-semibold tracking-wide shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2">
        <span>MVCON 2027 Countdown:</span>
        <span className="bg-orange-700 px-2 py-1 rounded">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    </div>
  );
}
