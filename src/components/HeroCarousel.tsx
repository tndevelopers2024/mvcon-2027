'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'MVCON 2027',
    badge: '2ND EDITION',
    subtitle: 'Annual Scientific Update on Diabetes & Diabetic Foot Care',
    quote:
      '"Bringing together leading diabetologists, surgeons and paramedical experts for scientific learning, clinical innovation and collaboration."',
    date: 'Jan 1, 2027',
    location: 'Chennai, India',
    imageSrc: '/images/hero-banner1.JPG',
  },
  {
    id: 2,
    title: 'MVCON 2027',
    subtitle: 'Global Conference on Metabolic Health & Research',
    quote:
      '"Join us as we explore the future of metabolic health, advanced research, and innovative treatments."',
    date: 'Jan 1, 2027',
    location: 'Chennai, India',
    imageSrc: '/images/hero-banner2.JPG',
  },
  {
    id: 3,
    title: 'MVCON 2027',
    subtitle: 'Interactive Workshops & Case Studies',
    quote:
      '"Participate in hands-on workshops with renowned experts from across the globe."',
    date: 'Jan 1, 2027',
    location: 'Chennai, India',
    imageSrc: '/images/hero-banner3.JPG',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-[80vh] bg-background flex items-center z-10">
      <style>{`
        @keyframes flipIn {
          0% { transform: perspective(1000px) rotateY(-90deg) scale(0.9); opacity: 0; }
          100% { transform: perspective(1000px) rotateY(0deg) scale(1); opacity: 1; }
        }
        .animate-flip-in {
          animation: flipIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex justify-center transition-opacity duration-1000 ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={slide.imageSrc}
                alt="Background"
                fill
                className="object-cover opacity-15 dark:opacity-20"
                priority={slide.id === 1}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-10" />
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-16 gap-10 relative z-20 h-full">
              <div
                className={`flex-1 max-w-2xl text-left transition-all duration-1000 ${
                  isActive ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-12 opacity-0'
                }`}
              >
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-black/30 border border-border-color rounded-full text-sm font-semibold text-text-muted mb-6">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                    {slide.badge}
                  </div>
                )}
                <h1 className="text-primary text-5xl lg:text-6xl font-bold mb-2">{slide.title}</h1>
                <h2 className="text-foreground text-4xl lg:text-5xl font-bold leading-tight mb-6">{slide.subtitle}</h2>
                <p className="text-lg italic text-text-muted lg:border-l-4 lg:border-primary lg:pl-4 mb-8 lg:border-t-0 border-t-4 pt-4 lg:pt-0">
                  {slide.quote}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-start gap-6 mb-10 text-text-muted font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    <span>{slide.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    <span>{slide.location}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  <button className="btn-primary">Register Now</button>
                  <button className="btn-secondary">View Program</button>
                </div>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end w-full mt-10 lg:mt-0">
                <div
                  className={`w-full max-w-lg bg-white dark:bg-slate-800 p-3 rounded-xl shadow-2xl relative ${
                    isActive ? 'animate-flip-in rotate-1 hover:rotate-0 hover:scale-[1.02] transition-transform duration-500' : 'opacity-0'
                  }`}
                >
                  <div className="w-full h-[300px] lg:h-[400px] relative rounded-lg overflow-hidden border border-border-color/50 bg-slate-100 dark:bg-slate-700">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.subtitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={slide.id === 1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide ? 'bg-primary scale-125' : 'bg-black/20 dark:bg-white/20'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
