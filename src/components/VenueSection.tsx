"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { MapPin, Navigation } from 'lucide-react';

const venueImages = [
  '/images/hero-banner1.JPG',
  '/images/hero-banner2.JPG',
  '/images/hero-banner3.JPG'
];

export default function VenueSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % venueImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f8f9fa] dark:bg-slate-900 border-t border-border-color relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16" direction="up">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> Location
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Direction To The <span className="text-primary">Venue</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Interactive Map */}
          <ScrollReveal className="w-full lg:w-1/2 flex flex-col" direction="right">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 group">
              <iframe 
                src="https://maps.google.com/maps?q=Radisson+Blu+Hotel+%26+Suites+GRT+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 w-full h-full"
              ></iframe>
              
              {/* Floating Overlay Card on the map */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-90 group-hover:opacity-100">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Radisson Blu Hotel & Suites GRT Chennai</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  (near airport), Chennai
                </p>
                <a href="https://www.google.com/maps/search/Radisson+Blu+Hotel+%26+Suites+GRT+Chennai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full gap-2 bg-primary hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-colors shadow-md">
                  <Navigation className="w-4 h-4" /> Open in Maps
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Venue Images (Animated Carousel) */}
          <ScrollReveal className="w-full lg:w-1/2 flex flex-col" direction="left" delay={200}>
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              {/* Decorative Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 mix-blend-overlay z-10 pointer-events-none" />
              
              {/* Images with crossfade and subtle zoom animation */}
              {venueImages.map((src, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100 z-0' 
                      : 'opacity-0 scale-110 -z-10'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Venue Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Bottom dark gradient for better dot visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              ))}

              {/* Dots indicator */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {venueImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentImageIndex ? 'bg-primary w-8' : 'bg-white/60 hover:bg-white w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
