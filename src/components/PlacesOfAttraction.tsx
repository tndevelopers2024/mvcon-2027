"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const attractions = [
  {
    id: 1,
    name: 'Marina Beach',
    image: '/images/place1.webp',
  },
  {
    id: 2,
    name: 'Mahabalipuram',
    image: '/images/place2.webp',
  },
  {
    id: 3,
    name: 'Dakshinachitra',
    image: '/images/place3.webp',
  },
  {
    id: 4,
    name: 'Parthasarathy Temple',
    image: '/images/place4.webp',
  },
  {
    id: 5,
    name: 'Kapaleeshwarar Temple',
    image: '/images/place5.webp',
  },
  {
    id: 6,
    name: 'Santhome Church',
    image: '/images/place6.webp',
  },
];

export default function PlacesOfAttraction() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  if (!isClient) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header matches screenshot perfectly */}
        <ScrollReveal className="text-center mb-16" direction="up">
          <div className="flex items-center justify-center gap-2 text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            <MapPin className="w-4 h-4" />
            <span>Explore</span>
          </div>
          <h2 className="text-4xl md:text-[40px] font-extrabold text-slate-900 mb-6 tracking-tight">
            Places of Attraction in <span className="text-[#1F83C6]">Chennai</span>
          </h2>
          {/* Half blue half orange line */}
          <div className="flex justify-center w-24 mx-auto">
            <div className="h-[3px] w-1/2 bg-[#1F83C6]" />
            <div className="h-[3px] w-1/2 bg-[#F26522]" />
          </div>
        </ScrollReveal>

        {/* Expandable Accordion Slider Layout */}
        <div className="flex w-full max-w-7xl h-[400px] md:h-[500px] lg:h-[600px] gap-2 md:gap-4 px-2 md:px-4 items-stretch justify-center mx-auto mt-12">
          {attractions.map((place, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={place.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${
                  isActive 
                    ? 'w-[75%] md:w-[60%] lg:flex-[4] shadow-2xl' 
                    : 'w-[10%] md:w-[15%] lg:flex-[0.5] shadow-md opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay for active item */}
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Content (Title) for active item */}
                <div className={`absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-10 opacity-0'}`}>
                  <div className="w-12 h-1 bg-[#F26522] rounded-full mb-4 shadow-lg shadow-orange-500/50"></div>
                  <h3 className="text-white text-2xl md:text-3xl lg:text-5xl font-extrabold drop-shadow-lg mb-2 leading-tight">
                    {place.name}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-md drop-shadow-md hidden md:block">
                    Experience the vibrant culture and rich heritage of Chennai.
                  </p>
                </div>

                {/* Vertical Text for Inactive Items */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="w-full h-full bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-slate-900/30 transition-colors duration-500">
                    <span className="text-white font-bold tracking-[0.2em] uppercase transform -rotate-90 whitespace-nowrap text-[10px] md:text-sm drop-shadow-md">
                      {place.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {attractions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-[#1F83C6] w-8' : 'bg-[#e2e8f0] hover:bg-slate-300 w-2.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
