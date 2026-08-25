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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % attractions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + attractions.length) % attractions.length);
  };

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

        {/* 3D Coverflow Slider */}
        <div className="relative w-full h-[350px] md:h-[400px] flex justify-center items-center mt-12 group">
          
          <div className="relative w-full max-w-6xl h-full flex justify-center items-center">
            {attractions.map((place, index) => {
              let offset = index - currentIndex;
              const total = attractions.length;
              
              // Wrap around logic
              if (offset > Math.floor(total / 2)) offset -= total;
              if (offset < -Math.floor(total / 2)) offset += total;

              let positionClass = '';
              let zIndexClass = '';
              let scaleClass = '';
              let opacityClass = 'opacity-100'; // Default is 100, we use a white overlay for inactive items

              if (offset === 0) {
                positionClass = 'translate-x-0';
                zIndexClass = 'z-30';
                scaleClass = 'scale-100';
              } else if (offset === -1) {
                positionClass = '-translate-x-[45%] md:-translate-x-[55%]';
                zIndexClass = 'z-20';
                scaleClass = 'scale-[0.8]';
              } else if (offset === 1) {
                positionClass = 'translate-x-[45%] md:translate-x-[55%]';
                zIndexClass = 'z-20';
                scaleClass = 'scale-[0.8]';
              } else if (offset === -2) {
                positionClass = '-translate-x-[85%] md:-translate-x-[105%]';
                zIndexClass = 'z-10';
                scaleClass = 'scale-[0.6]';
              } else if (offset === 2) {
                positionClass = 'translate-x-[85%] md:translate-x-[105%]';
                zIndexClass = 'z-10';
                scaleClass = 'scale-[0.6]';
              } else {
                positionClass = 'translate-x-0';
                zIndexClass = '-z-10';
                scaleClass = 'scale-0';
                opacityClass = 'opacity-0';
              }

              const isActive = offset === 0;

              return (
                <div
                  key={place.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`absolute w-[300px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[300px] md:h-[380px] rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl ${positionClass} ${zIndexClass} ${scaleClass} ${opacityClass} cursor-pointer`}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(place.name.split(' ')[0])}&background=1F83C6&color=fff&size=512`;
                    }}
                  />
                  
                  {/* White overlay for inactive items (matches screenshot's faded look) */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/60 transition-opacity duration-700" />
                  )}

                  {/* Dark Pill Text for active item */}
                  <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-black/60 backdrop-blur-sm text-white text-sm font-semibold px-6 py-2.5 rounded-full whitespace-nowrap shadow-lg">
                      {place.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows positioned exactly over the adjacent inactive items */}
          <button 
            onClick={prevSlide}
            className="absolute left-[10%] md:left-[22%] lg:left-[25%] z-40 bg-white text-slate-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-[10%] md:right-[22%] lg:right-[25%] z-40 bg-white text-slate-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

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
