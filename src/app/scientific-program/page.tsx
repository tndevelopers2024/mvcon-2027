import React from 'react';
import ScientificProgramTabs from '@/components/ScientificProgramTabs';

export const metadata = {
  title: 'Scientific Program | MVCON 2027',
  description: 'Explore the complete schedule, sessions, and topics for MVCON 2027.',
};

export default function ScientificProgramPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-4 md:pt-12">
      {/* Clean Title Area instead of huge Hero Image */}
      <div className="text-center px-4 max-w-4xl mx-auto mb-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Scientific <span className="text-[#1F83C6]">Program</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          A comprehensive multidisciplinary update on diabetes and diabetic foot care.
        </p>
      </div>

      {/* Main Tabs Interface */}
      <main className="flex-grow relative z-20">
        <ScientificProgramTabs />
      </main>
    </div>
  );
}
