"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Trophy, X, Eye, Award } from 'lucide-react';

interface AwardGalleryItem {
  src: string;
  name?: string;
  prize?: string;
  presentationType?: 'Oral Presentation' | 'Poster Presentation';
  category?: string;
  badge?: {
    text: string;
    bg: string;
    textCol: string;
    border: string;
    icon: string;
  };
}

export default function ImageCollage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const awardItems: AwardGalleryItem[] = [
    // Oral Presentation Winners
    {
      src: '/images/abstract/img2.jpg',
      name: 'Dr. Kavya Shrikanth',
      prize: '1st Prize',
      presentationType: 'Oral Presentation',
      category: 'Oral Presentation • MVCON 2026',
      badge: {
        text: '1st Prize',
        bg: 'bg-gradient-to-r from-amber-400 to-yellow-500',
        textCol: 'text-slate-900',
        border: 'border-yellow-300',
        icon: '🥇',
      },
    },
    {
      src: '/images/abstract/img1.jpg',
      name: 'Dr. Dhivya Padma Kumar',
      prize: '2nd Prize',
      presentationType: 'Oral Presentation',
      category: 'Oral Presentation • MVCON 2026',
      badge: {
        text: '2nd Prize',
        bg: 'bg-gradient-to-r from-slate-200 to-slate-400',
        textCol: 'text-slate-900',
        border: 'border-slate-300',
        icon: '🥈',
      },
    },
    {
      src: '/images/abstract/img0.jpg',
      name: 'Dr. Jayasurya',
      prize: '3rd Prize',
      presentationType: 'Oral Presentation',
      category: 'Oral Presentation • MVCON 2026',
      badge: {
        text: '3rd Prize',
        bg: 'bg-gradient-to-r from-amber-600 to-orange-600',
        textCol: 'text-white',
        border: 'border-amber-400',
        icon: '🥉',
      },
    },

    // Poster Presentation Winners
    {
      src: '/images/abstract/img5.jpg',
      name: 'Dr. Hariharan',
      prize: '1st Prize',
      presentationType: 'Poster Presentation',
      category: 'Poster Presentation • MVCON 2026',
      badge: {
        text: '1st Prize',
        bg: 'bg-gradient-to-r from-amber-400 to-yellow-500',
        textCol: 'text-slate-900',
        border: 'border-yellow-300',
        icon: '🥇',
      },
    },
    {
      src: '/images/abstract/img4.jpg',
      name: 'Dr. Bidisha',
      prize: '2nd Prize',
      presentationType: 'Poster Presentation',
      category: 'Poster Presentation • MVCON 2026',
      badge: {
        text: '2nd Prize',
        bg: 'bg-gradient-to-r from-slate-200 to-slate-400',
        textCol: 'text-slate-900',
        border: 'border-slate-300',
        icon: '🥈',
      },
    },
    {
      src: '/images/abstract/img3.jpg',
      name: 'Dr. Akanksha Arun',
      prize: '3rd Prize',
      presentationType: 'Poster Presentation',
      category: 'Poster Presentation • MVCON 2026',
      badge: {
        text: '3rd Prize',
        bg: 'bg-gradient-to-r from-amber-600 to-orange-600',
        textCol: 'text-white',
        border: 'border-amber-400',
        icon: '🥉',
      },
    },

    // Conference Highlights
    {
      src: '/images/abstract/img7.jpg',
      category: 'Faculty & Delegates Interaction',
    },
    {
      src: '/images/abstract/img8.jpg',
      category: 'Scientific Excellence Awards',
    },
    {
      src: '/images/abstract/img9.jpg',
      category: 'MVCON Previous Edition Glimpses',
    },
  ];

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
            <p className="text-slate-600 mt-1 font-medium">
              Celebrating excellence in scientific research, oral presentations, and poster presentations from MVCON 2026.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardItems.map((item, i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl border transition-all duration-300 cursor-pointer flex flex-col bg-white ${
                item.prize ? 'border-amber-200/90 ring-1 ring-amber-100' : 'border-slate-200/80'
              }`}
              onClick={() => setSelectedImage(i)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.name ? `${item.name} - ${item.prize}` : `Previous Year Award Winner ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Prize Badge */}
                {item.badge && (
                  <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 border ${item.badge.bg} ${item.badge.textCol} ${item.badge.border}`}>
                    <span>{item.badge.icon}</span>
                    <span>{item.badge.text}</span>
                  </div>
                )}

                {/* Event Pill */}
                {item.prize && (
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
                    MVCON 2026
                  </div>
                )}

                {/* Hover overlay with Eye icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4" />
                    <span>Enlarge Photo</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Info Strip */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                {item.name ? (
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border inline-flex items-center gap-1 ${
                        item.presentationType === 'Poster Presentation'
                          ? 'text-sky-700 bg-sky-50 border-sky-200/80'
                          : 'text-orange-600 bg-orange-50 border-orange-200/70'
                      }`}>
                        <Award className={`w-3 h-3 ${item.presentationType === 'Poster Presentation' ? 'text-sky-600' : 'text-orange-500'}`} />
                        {item.prize} • {item.presentationType || 'Award'}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        MVCON 2026
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#1F83C6] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      Prize Winner in {item.presentationType || 'Scientific Research'}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Conference Glimpses
                    </span>
                    <h3 className="font-bold text-slate-700 text-sm mt-0.5">
                      {item.category || 'MVCON Highlights'}
                    </h3>
                  </div>
                )}
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
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-[60] cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl max-h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={awardItems[selectedImage].src}
                alt={awardItems[selectedImage].name || `Award Winner ${selectedImage + 1}`}
                width={1600}
                height={1200}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                priority
              />
            </div>

            {awardItems[selectedImage].name ? (
              <div className="mt-4 text-center text-white bg-slate-900/90 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/15 max-w-lg mx-auto shadow-2xl">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black mb-1.5 shadow-sm border ${
                  awardItems[selectedImage].presentationType === 'Poster Presentation'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                }`}>
                  <span>{awardItems[selectedImage].badge?.icon}</span>
                  <span>{awardItems[selectedImage].prize} in {awardItems[selectedImage].presentationType} • MVCON 2026</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white">
                  {awardItems[selectedImage].name}
                </h3>
              </div>
            ) : (
              <div className="mt-3 text-center text-slate-300 text-sm font-medium bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                {awardItems[selectedImage].category || 'MVCON Conference Glimpses'}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
