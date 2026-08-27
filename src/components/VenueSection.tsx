"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { MapPin, Navigation } from 'lucide-react';

const venueImages = [
  '/images/location1.avif',
  '/images/location3.avif',
  '/images/location2.webp'
  
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

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[550px]">
          
          {/* Main Image Carousel (Left, spans 2 columns) */}
          <ScrollReveal className="col-span-1 lg:col-span-2 lg:row-span-2 h-[400px] lg:h-full rounded-[2rem] overflow-hidden shadow-2xl relative group" direction="right">
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
                  sizes="(max-width: 1024px) 66vw, 100vw"
                />
                {/* Bottom dark gradient for better dot visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
            ))}

            {/* Dots indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
              {venueImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === currentImageIndex ? 'bg-primary w-10' : 'bg-white/60 hover:bg-white w-2.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Stylish overlay badge */}
            <div className="absolute top-6 left-6 z-20 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Event Location
            </div>
          </ScrollReveal>

          {/* Info Card (Top Right) */}
          <ScrollReveal className="col-span-1 h-[300px] lg:h-auto rounded-[2rem] bg-gradient-to-br from-primary to-blue-700 p-8 text-white shadow-xl flex flex-col justify-center relative overflow-hidden group" direction="left" delay={100}>
            {/* Abstract Background Shapes */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-black/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 shadow-inner">
              <MapPin className="w-7 h-7 text-white drop-shadow-md" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold mb-3 leading-tight text-white drop-shadow-sm">Radisson Blu Hotel & Suites</h3>
            <p className="text-blue-100 mb-8 text-sm md:text-base opacity-90 leading-relaxed font-medium">
              531, Grand Southern Trunk Rd, Parangi Malai, Palavanthangal, Chennai, Tamil Nadu 600016
            </p>
            <a href="https://www.google.com/maps/search/Radisson+Blu+Hotel+%26+Suites+GRT+Chennai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all duration-300 mt-auto w-fit uppercase tracking-wider text-sm bg-white/10 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/20">
              Get Directions <Navigation className="w-4 h-4" />
            </a>
          </ScrollReveal>

          {/* Map (Bottom Right) */}
          <ScrollReveal className="col-span-1 h-[300px] lg:h-auto rounded-[2rem] overflow-hidden shadow-xl relative border-4 border-white dark:border-slate-800 group" direction="left" delay={200}>
            <iframe 
              src="https://maps.google.com/maps?q=Radisson+Blu+Hotel+%26+Suites+GRT+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 w-full h-full"
            ></iframe>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
