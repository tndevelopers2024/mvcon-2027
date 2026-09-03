"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Trophy, X } from 'lucide-react';

export default function ImageCollage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = Array.from({ length: 9 }).map((_, i) => `/images/abstract/img${i + 1}.jpg`);

  return (
    <>
      <section className="space-y-8 mt-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center border border-yellow-200 shrink-0 shadow-sm">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">
              Previous Year Award Winners
            </h2>
            <p className="text-slate-600 mt-1 font-medium">Glimpses of excellence from past conferences.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div 
              key={i} 
              className="relative rounded-2xl overflow-hidden group shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(i)}
            >
              <Image
                src={src}
                alt={`Previous Year Award Winner ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-bold text-lg drop-shadow-md">View Image</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm mb-0"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-[60]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-6xl max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]}
              alt={`Award Winner ${selectedImage + 1}`}
              width={1600}
              height={1200}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
