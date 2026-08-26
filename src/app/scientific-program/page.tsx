import React from 'react';
import ScientificProgramTabs from '@/components/ScientificProgramTabs';

export const metadata = {
  title: 'Scientific Program | MVCON 2027',
  description: 'Explore the complete schedule, sessions, and topics for MVCON 2027.',
};

export default function ScientificProgramPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Banner specific to Scientific Program */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900 mt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/scientific/scientific-bg.jpg" 
            alt="Scientific Program" 
            className="w-full h-full object-cover object-top opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Scientific <span className="text-[#1F83C6]">Program</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            A comprehensive multidisciplinary update on diabetes and diabetic foot care.
          </p>
        </div>
      </div>

      {/* Main Tabs Interface */}
      <main className="flex-grow relative z-20 mt-10">
        <ScientificProgramTabs />
      </main>
    </div>
  );
}
