'use client';

import { useState, useEffect } from 'react';
import { HeartPulse, Activity } from 'lucide-react';



export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('March 19, 2027 00:00:00').getTime();

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

  return (
    <section className="py-3 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 shadow-xl relative overflow-hidden -mt-22 mx-4 md:mx-auto md:max-w-4xl lg:max-w-5xl rounded-2xl z-30 border border-slate-200">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left: Title & Icon */}
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="bg-orange-50 dark:bg-orange-500/10 p-2 rounded-full relative">
              <HeartPulse className="text-secondary w-6 h-6 animate-[pulse_1.5s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground leading-tight">MVCON 2027</h3>
              <p className="text-text-muted font-medium text-[10px] uppercase tracking-wider">Countdown to the Event</p>
            </div>
          </div>

          {/* Middle: Timer */}
          <div className="flex items-center gap-2 sm:gap-4 bg-slate-50/50 dark:bg-slate-800/30 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-inner">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[50px]">
                <span className="text-2xl font-extrabold text-primary tabular-nums tracking-tight leading-none">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Register Button */}
          <div className="flex-shrink-0">
            <button className="bg-secondary hover:bg-orange-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-[0_4px_10px_-2px_rgba(242,101,34,0.5)] hover:shadow-[0_6px_15px_-2px_rgba(242,101,34,0.6)] hover:-translate-y-0.5 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Register Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
