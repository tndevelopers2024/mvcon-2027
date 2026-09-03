"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedImageCard from './AnimatedImageCard';

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
};

function GalleryImageItem({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-100 h-full w-full"
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse z-10" />
        )}
        
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={image.size === 'large' ? 1200 : image.size === 'medium' ? 800 : 600}
          className={`w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-110 ${
            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm scale-105'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close lightbox on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex, images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-[250px] sm:auto-rows-[300px] grid-flow-row-dense">
        {images.map((image, index) => (
          <AnimatedImageCard 
            key={image.id} 
            index={index}
            className={image.size === 'large' ? 'row-span-2' : 'row-span-1'}
          >
            <GalleryImageItem image={image} onClick={() => setSelectedIndex(index)} />
          </AnimatedImageCard>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              className="absolute left-4 md:left-8 text-white/50 hover:text-white p-4 hidden sm:block transition-colors z-[110]"
              onClick={handlePrev}
              aria-label="Previous"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative w-full max-w-6xl h-[85vh] flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image area
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>
            
            <button 
              className="absolute right-4 md:right-8 text-white/50 hover:text-white p-4 hidden sm:block transition-colors z-[110]"
              onClick={handleNext}
              aria-label="Next"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
            
            {/* Mobile Swipe Indicators / Controls could go here if needed */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm sm:hidden font-medium">
              Swipe or tap edges to navigate
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm font-medium hidden sm:block">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
