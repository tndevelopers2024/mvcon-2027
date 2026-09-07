import React from 'react';
import ScientificProgramTabs from '@/components/ScientificProgramTabs';

export const metadata = {
  title: 'Scientific Program | MVCON 2027',
  description: 'Explore the complete schedule, sessions, and topics for MVCON 2027.',
};

export default function ScientificProgramPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Stylish Hero Banner */}
      <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden bg-slate-900 mt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/highlight3.jpg" 
            alt="Scientific Program" 
            className="w-full h-full object-cover opacity-30" 
          />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-900/20 to-slate-900/80" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-8">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#1F83C6]/30 bg-[#1F83C6]/10 backdrop-blur-md">
            <span className="text-[#FDE047] text-sm font-bold tracking-widest uppercase">March 19 - 21, 2027</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            Scientific <span className="text-[#1F83C6] drop-shadow-lg">Program</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            A comprehensive multidisciplinary update on diabetes and diabetic foot care. Explore our carefully curated schedule.
          </p>
        </div>
      </div>

      {/* Main Tabs Interface */}
      <main className="flex-grow relative z-20 -mt-16">
        <div className="bg-white/50 backdrop-blur-3xl mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-t-[3rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] border-t border-x border-white/60">
          <ScientificProgramTabs />
        </div>
      </main>
    </div>
  );
}
