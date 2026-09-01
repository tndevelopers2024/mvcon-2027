"use client";

import React from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { MapPin, Navigation, Map } from 'lucide-react';

const venueImages = [
  '/images/location1.jpg',
  '/images/location2.jpg',
  '/images/location4.jpg',
  '/images/location5.jpg',
  '/images/location6.jpg',
  '/images/location7.jpg',
  '/images/location8.jpg',
  '/images/location3.jpg',
  '/images/location9.jpg',
];

export default function VenueSection() {
  return (
    <section className="py-24 bg-[#f8f9fa] dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10 mb-16">
        <ScrollReveal className="text-center" direction="up">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center gap-2">
            <Map className="w-4 h-4" /> Location
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Direction To The <span className="text-primary">Venue</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
        </ScrollReveal>
      </div>

      {/* Full-width Map and Info Card */}
      <div className="relative w-full h-[500px] md:h-[600px] z-10 shadow-lg">
        {/* Map */}
        <iframe 
          src="https://maps.google.com/maps?q=Radisson+Blu+Hotel+%26+Suites+GRT+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[10%] hover:grayscale-0 transition-all duration-700"
        ></iframe>

        {/* Info Card Overlay (floating) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 md:left-12 lg:left-24 max-w-sm pointer-events-none z-20">
          <ScrollReveal direction="right">
            <div className="bg-gradient-to-br from-primary/95 to-blue-700/95 backdrop-blur-md p-8 rounded-[2rem] text-white shadow-2xl pointer-events-auto border border-white/20 relative overflow-hidden group max-md:hidden">
              {/* Abstract Background Shapes */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700 pointer-events-none" />
              
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner">
                <MapPin className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <h3 className="text-2xl font-extrabold mb-3 leading-tight text-white drop-shadow-sm">Radisson Blu Hotel & Suites</h3>
              <p className="text-blue-50 mb-8 text-sm opacity-90 leading-relaxed font-medium">
                531, Grand Southern Trunk Rd, Parangi Malai, Palavanthangal, Chennai, Tamil Nadu 600016
              </p>
              <a href="https://www.google.com/maps/search/Radisson+Blu+Hotel+%26+Suites+GRT+Chennai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all duration-300 w-fit uppercase tracking-wider text-sm bg-white/15 px-5 py-3 rounded-xl hover:bg-white/25 shadow-lg">
                Get Directions <Navigation className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Collage Below the Map */}
      <div className="max-w-7xl mx-auto px-2 lg:px-4 relative z-10 mt-20 md:mt-28">
        <ScrollReveal direction="up" className="text-center mb-10">
           <h3 className="text-5xl md:text-4xl font-bold text-foreground">
             Glimpse of the <span className="text-primary">Venue</span>
           </h3>
           <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
             Experience the grandeur and comfort of our world-class event location.
           </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[220px] grid-flow-row-dense">
          {venueImages.map((src, index) => {
            let gridClass = "col-span-1 row-span-1";
            
            // Dynamic masonry-like layout pattern
            if (index === 0) gridClass = "col-span-2 md:col-span-2 row-span-2 md:row-span-2";
            else if (index === 7) gridClass = "col-span-2 md:col-span-2 row-span-2 md:row-span-2";
            else if (index === 8) gridClass = "col-span-2 md:col-span-1 row-span-1 md:row-span-1";

            return (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={(index % 4) * 100} 
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 group ${gridClass}`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-primary/5 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                <Image 
                  src={src} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  alt={`Venue view ${index + 1}`} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {index === 0 && (
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                    Event Location
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
