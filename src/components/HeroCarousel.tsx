'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: '2027',
    badge: '2ND EDITION',
    subtitle: 'Welcome to MVCON 2027 - Annual conference on diabetes and Foot care',
    quote:
      '"MVCON 2027 marks the second edition of MV\'s annual scientific update bringing together leading Physicians, surgeons, researchers, academicians and paramedical experts."',
    date: '19, 20, 21 March 2027',
    location: 'Radisson Blu Hotel & Suites GRT Chennai (near airport)',
    imageSrc: '/images/hero1.jpg',
  },
  {
    id: 2,
    title: '2027',
    badge: '2ND EDITION',
    subtitle: 'Conference on Diabetes and its complications with focus on diabetic foot',
    quote:
      '"Join us as we explore the future of advanced research, innovative treatments, case studies and interactive workshops."',
    date: '19, 20, 21 March 2027',
    location: 'Radisson Blu Hotel & Suites GRT Chennai (near airport)',
    imageSrc: '/images/hero2.jpg',
  },
  {
    id: 3,
    title: '2027',
    badge: '2ND EDITION',
    subtitle: 'Learn from renowned experts',
    quote:
      '"Join the community of experts dedicated to advancing the field of diabetes and diabetic foot."',
    date: '19, 20, 21 March 2027',
    location: 'Radisson Blu Hotel & Suites GRT Chennai (near airport)',
    imageSrc: '/images/hero3.jpg',
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

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-[720px] sm:h-[540px] md:h-[90vh] lg:h-[90vh] overflow-hidden bg-background flex flex-col justify-end pb-3 sm:pb-4">
      {/* Full-Height Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              isActive ? 'opacity-100 z-0 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.subtitle || 'MVCON Slide'}
              fill
              quality={90}
              className="object-cover object-center sm:object-[bottom_20%]"
              priority={slide.id === 1}
            />
          </div>
        );
      })}

      {/* Top subtle vignette for transparent header contrast */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Custom smooth gradient transition over full-height background */}
      <div
        className="absolute inset-x-0 bottom-0 h-[340px] sm:h-[380px] md:h-[420px] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 0.85) 55%, rgba(0, 212, 255, 0) 100%)',
        }}
      />

      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 md:left-6 top-[28%] sm:top-1/3 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-black/40 hover:bg-black/65 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 sm:right-4 md:right-6 top-[28%] sm:top-1/3 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-black/40 hover:bg-black/65 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Centered Content Section Over Background Image */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          if (!isActive) return null;

          return (
            <div
              key={slide.id}
              className="w-full flex flex-col items-center text-center transition-all duration-500"
            >
              {/* Badge */}
              {slide.badge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-full text-[11px] md:text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2 shadow-xs backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  {slide.badge}
                </div>
              )}

              {/* Logo + 2027 Title */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5">
                <img src="/images/logo.png" alt="MVCON Logo" className="h-7 sm:h-9 md:h-11 object-contain drop-shadow-xs" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F26522] tracking-tight leading-none">
                  {slide.title}
                </h1>
              </div>

              {/* Subtitle / Main Headline */}
              <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-foreground tracking-tight leading-snug mb-2 max-w-2xl px-2">
                {slide.subtitle}
              </h2>

              {/* Quote / Description */}
              <p className="text-[14px] sm:text-lg text-text-muted leading-relaxed mb-2 italic font-normal line-clamp-1 hidden sm:block">
                {slide.quote}
              </p>

              {/* Date & Location */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-5 mb-2.5 px-2 text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-sm md:text-base">
                <div className="inline-flex items-center gap-1.5 shrink-0">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span>{slide.date}</span>
                </div>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
                <div className="inline-flex items-center gap-1.5 text-center max-w-lg">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{slide.location}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              {/* <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="btn-primary inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Register Now
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/scientific-program"
                  className="btn-secondary inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all"
                >
                  View Program
                </Link>
              </div> */}
            </div>
          );
        })}

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-1 sm:mt-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

