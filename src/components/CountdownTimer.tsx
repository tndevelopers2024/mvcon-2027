'use client';

import { useState, useEffect } from 'react';
import { HeartPulse, Activity } from 'lucide-react';

import ScrollReveal from './ScrollReveal';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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

  return (
    <section className="py-8 bg-white dark:bg-slate-900 border-y border-border-color shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <ScrollReveal className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10" direction="up">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Title & Icon */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="bg-orange-50 dark:bg-orange-500/10 p-3 rounded-full relative">
              <HeartPulse className="text-secondary w-8 h-8 animate-[pulse_1.5s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">MVCON 2027</h3>
              <p className="text-text-muted font-medium text-sm uppercase tracking-wider">Countdown to the Event</p>
            </div>
          </div>

          {/* Middle: Timer */}
          <div className="flex items-center gap-3 sm:gap-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-inner">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                <span className="text-3xl sm:text-4xl font-extrabold text-primary tabular-nums tracking-tight">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-widest mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Register Button */}
          <div className="flex-shrink-0">
            <button className="bg-secondary hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(242,101,34,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(242,101,34,0.6)] hover:-translate-y-1 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Register Now
            </button>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
