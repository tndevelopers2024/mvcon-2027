"use client";

import { useState } from 'react';
import { Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryGrid, { GalleryImage } from './GalleryGrid';

interface GalleryTabsProps {
  day1Images: GalleryImage[];
  day2Images: GalleryImage[];
}

export default function GalleryTabs({ day1Images, day2Images }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<'day1' | 'day2'>('day1');

  const currentImages = activeTab === 'day1' ? day1Images : day2Images;

  return (
    <div>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 text-[#1F83C6] rounded-2xl flex items-center justify-center border border-blue-100 shrink-0 shadow-sm">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">
              Featured Highlights
            </h2>
            <p className="text-slate-500 font-medium mt-1">
              Glimpses from our scientific sessions, workshops, and memorable events
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-orange-500 bg-orange-50 px-4 py-2 rounded-full font-bold border border-orange-100 text-sm shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>MVCON 2026</span>
        </div>
      </div>

      {/* Tabs directly on top of the images */}
      <div className="flex justify-center items-center my-8">
        <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 shadow-sm gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('day1')}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'day1'
                ? 'bg-[#1F83C6] text-white shadow-lg shadow-[#1F83C6]/30 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            <span>Dr.Jitendra Singh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('day2')}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'day2'
                ? 'bg-[#F26522] text-white shadow-lg shadow-[#F26522]/30 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            <span>Faculties Speaking</span>
          </button>
        </div>
      </div>

      {/* Grid Display with Animated Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <GalleryGrid images={currentImages} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
