"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Search, Clock, Users, Microscope, MessageSquare, Network, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scheduleData } from '../data/schedule';

type Tab = 'overview' | 'day1' | 'day2' | 'day3' | 'register';
type Hall = 'A' | 'B';

const days = [
  { id: 'day1' as Tab, label: 'Day 01', dayName: 'Friday', date: '19th', monthYear: 'MAR 2027' },
  { id: 'day2' as Tab, label: 'Day 02', dayName: 'Saturday', date: '20th', monthYear: 'MAR 2027' },
  { id: 'day3' as Tab, label: 'Day 03', dayName: 'Sunday', date: '21st', monthYear: 'MAR 2027' },
];

const halls = [
  { id: 'A' as Hall, label: 'HALL - A', name: 'Prof. M. Viswanathan Hall' },
  { id: 'B' as Hall, label: 'HALL - B', name: 'Dr. M. Madhavi Amma Hall' },
];

export default function ScientificProgramTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeHall, setActiveHall] = useState<Hall>('A');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHint, setShowHint] = useState(true);

  const isDaySelected = activeTab.startsWith('day');
  const currentKey = activeTab + (isDaySelected ? activeHall : '');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 overflow-hidden">
      
      {/* Main Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        
        {/* Overview Tab */}
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center justify-center w-[160px] h-[100px] rounded-lg border-2 transition-all shadow-sm ${
            activeTab === 'overview' 
              ? 'bg-[#FDE047] border-[#FDE047] text-slate-900 font-bold' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 font-medium'
          }`}
        >
          Overview
        </button>

        {/* Day Tabs */}
        {days.map((day) => {
          const isActive = activeTab === day.id;
          return (
            <div key={day.id} className="relative">
              {day.id === 'day1' && showHint && (
                <motion.div
                  initial={{ opacity: 0, x: 80, y: 80 }}
                  animate={{
                    opacity: [0, 1, 1, 1, 0],
                    x: [80, 0, 0, 0, 0],
                    y: [80, 0, 0, 0, 0],
                    scale: [1, 1, 0.85, 1, 1]
                  }}
                  transition={{ duration: 6, times: [0, 0.3, 0.4, 0.6, 1], delay: 1, ease: "easeInOut" }}
                  onAnimationComplete={() => setShowHint(false)}
                  className="absolute top-1/2 left-1/2 z-50 pointer-events-none drop-shadow-xl"
                >
                  <MousePointer2 className="w-10 h-10 fill-white text-slate-800 -translate-x-2 -translate-y-2" />
                  
                  {/* Click ripple */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0, 0, 0.4, 0], scale: [0.5, 0.5, 0.5, 2, 3] }}
                    transition={{ duration: 3, times: [0, 0.3, 0.4, 0.5, 1], delay: 1 }}
                    className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-2 -translate-y-2"
                  />
                </motion.div>
              )}
              <button
                onClick={() => setActiveTab(day.id)}
                className={`flex flex-col w-[160px] h-[100px] rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                  isActive ? 'border-[#FDE047]' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="bg-black text-white text-xs font-bold py-1.5 w-full text-center">
                {day.label}
              </div>
              <div className={`flex-1 flex flex-col justify-center items-center w-full transition-colors ${isActive ? 'bg-[#FDE047]' : 'bg-white'}`}>
                <span className={`text-[10px] uppercase font-semibold mb-1 ${isActive ? 'text-slate-700' : 'text-slate-500'}`}>{day.dayName}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 leading-none">{day.date}</span>
                  <div className="flex flex-col items-start leading-none">
                    <span className={`text-[9px] font-bold ${isActive ? 'text-slate-700' : 'text-slate-500'}`}>{day.monthYear.split(' ')[0]}</span>
                    <span className={`text-[9px] font-bold ${isActive ? 'text-slate-700' : 'text-slate-500'}`}>{day.monthYear.split(' ')[1]}</span>
                  </div>
                </div>
              </div>
              </button>
            </div>
          );
        })}

        {/* Register Tab */}
        <button
          onClick={() => setActiveTab('register')}
          className={`flex items-center justify-center w-[160px] h-[100px] rounded-lg border-2 transition-all shadow-sm ${
            activeTab === 'register' 
              ? 'bg-[#FDE047] border-[#FDE047] text-slate-900 font-bold' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 font-medium'
          }`}
        >
          Register & Pay
        </button>
      </div>

      {/* Sub Tabs for Halls (Only show if a day is selected) */}
      <AnimatePresence>
        {isDaySelected && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex justify-center gap-4 mb-8 overflow-hidden"
          >
            {halls.map((hall) => {
              const isActive = activeHall === hall.id;
              return (
                <button
                  key={hall.id}
                  onClick={() => setActiveHall(hall.id)}
                  className={`flex flex-col w-[260px] h-[70px] rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                    isActive ? 'border-[#FDE047]' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`flex-1 flex items-center justify-center w-full px-4 transition-colors ${isActive ? 'bg-[#FDE047]' : 'bg-white'}`}>
                    <span className={`text-sm font-medium text-center ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                      {hall.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar (Only show if a day is selected) */}
      <AnimatePresence>
        {isDaySelected && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto relative mb-12"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F83C6] focus:border-transparent transition-all shadow-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area with Animation */}
      <div className="relative">
        <motion.div
          key={currentKey}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-8 md:p-12 relative overflow-hidden min-h-[400px] border border-slate-100"
        >
            {/* Faint background pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Elegant top right curves (decorative) */}
            <div className="absolute -top-40 -right-40 w-96 h-96 border-[40px] border-[#1F83C6]/5 rounded-full pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-96 h-96 border-[20px] border-[#F26522]/5 rounded-full pointer-events-none" />

            <div className="relative z-10 h-full">
              
              {/* Overview Content */}
              {activeTab === 'overview' && (
                <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24 mb-12 w-full max-w-5xl mx-auto">
                    <img src="/images/logo1.png" alt="Sponsor Logo Left" className="h-16 md:h-20 object-contain" />
                    <img src="/images/logo.png" alt="MVCON Logo" className="h-20 md:h-28 object-contain scale-110" />
                    <img src="/images/logo3.png" alt="Sponsor Logo Right" className="h-16 md:h-20 object-contain" />
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-extrabold text-[#1F83C6] mb-12 tracking-tight">
                    MVCON 2027
                  </h2>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20">
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm text-slate-700 font-semibold">
                      <div className="w-10 h-10 rounded-full bg-[#F26522] flex items-center justify-center text-white shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      19, 20, 21 March 2027
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm text-slate-700 font-semibold">
                      <div className="w-10 h-10 rounded-full bg-[#F26522] flex items-center justify-center text-white shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      GRT Hotels, T.Nagar, Chennai
                    </div>
                  </div>

                  {/* Chairman Profile */}
                  <div className="w-full max-w-sm mx-auto bg-slate-50/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 p-4 mb-24">
                    <div className="w-full aspect-[4/3] sm:h-[280px] rounded-xl overflow-hidden mb-4">
                      <img src="/images/chairman.jpg" alt="Dr. Vijay Viswanathan" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="bg-[#FDE047] rounded-xl py-4 px-6 text-center shadow-sm">
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Dr. Vijay Viswanathan</h3>
                      <p className="text-slate-800 text-sm font-semibold">Head &amp; Chief Diabetologist</p>
                      <p className="text-slate-800 text-sm">MV Hospital for Diabetes, Chennai</p>
                    </div>
                  </div>

                  {/* Conference Highlights */}
                  <div className="w-full max-w-6xl mx-auto mb-10">
                    <h3 className="text-3xl font-extrabold text-[#1F83C6] mb-12">Conference Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-full bg-[#F26522]/10 flex items-center justify-center mb-6 text-[#F26522]">
                          <Users className="w-7 h-7" />
                        </div>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">
                          <strong className="block text-slate-900 mb-1">Wide range of sessions:</strong>
                          Talks on diabetes and management of its complications such as kidney, eye, heart and dedicated sessions on diabetic foot
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-full bg-[#F26522]/10 flex items-center justify-center mb-6 text-[#F26522]">
                          <Microscope className="w-7 h-7" />
                        </div>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">
                          <strong className="block text-slate-900 mb-1">Live workshops:</strong>
                          Hands-on debridement practice and demonstrations of advanced techniques such as Negative Pressure Wound Therapy.
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-full bg-[#F26522]/10 flex items-center justify-center mb-6 text-[#F26522]">
                          <MessageSquare className="w-7 h-7" />
                        </div>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">
                          <strong className="block text-slate-900 mb-1">Scientific exchanges:</strong>
                          Symposiums, Panel discussions, Original research presentations (oral and poster), Quiz competition, and Debates
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 rounded-full bg-[#F26522]/10 flex items-center justify-center mb-6 text-[#F26522]">
                          <Network className="w-7 h-7" />
                        </div>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">
                          <strong className="block text-slate-900 mb-1">Networking opportunity:</strong>
                          A dedicated Delegate Lounge for interaction with peers and faculty
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Content */}
              {isDaySelected && (
                <div className="flex flex-col items-center text-left w-full h-full overflow-y-auto pr-2 custom-scrollbar">
                  <div className="w-full text-center mb-10 shrink-0">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                      MVCON - Day {activeTab.replace('day', '')} ({halls.find(h => h.id === activeHall)?.name})
                    </h3>
                    <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">
                      A multidisciplinary update on diabetes & diabetic foot care
                    </p>
                  </div>
                  
                  <div className="w-full max-w-5xl flex-1 pb-10">
                    {scheduleData[activeTab]?.[activeHall] ? (
                      <div className="relative">
                        {/* Global Timeline Line */}
                        <div className="absolute left-[140px] top-4 bottom-0 w-0.5 bg-slate-100 hidden md:block" />
                        
                        <div className="space-y-6">
                          {scheduleData[activeTab][activeHall].filter(item => {
                            if (!searchQuery) return true;
                            const searchStr = `${item.title} ${item.faculty || ''} ${item.chairpersons || ''}`.toLowerCase();
                            return searchStr.includes(searchQuery.toLowerCase());
                          }).map((item, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row gap-4 md:gap-8 w-full group">
                              
                              {/* Desktop Timeline */}
                              <div className="hidden md:flex flex-col items-center w-[120px] shrink-0 pt-3 relative">
                                <div className="absolute right-[-30px] top-[26px] w-4 h-4 rounded-full bg-white border-4 border-[#1F83C6] shadow-sm z-10 transition-transform group-hover:scale-125" />
                                <div className="flex flex-col items-center justify-center w-full min-h-[54px] bg-[#1F83C6]/5 border border-[#1F83C6]/10 px-2 py-1.5 rounded-xl shadow-sm text-center">
                                  {(() => {
                                    const parts = item.time.split(/\s*[-–]\s*/);
                                    if (parts.length > 1) {
                                      return (
                                        <>
                                          <span className="text-[12px] font-extrabold text-[#1F83C6] leading-tight">{parts[0]}</span>
                                          <span className="text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">{parts[1]}</span>
                                        </>
                                      );
                                    }
                                    return (
                                      <span className="text-[12px] font-extrabold text-[#1F83C6] leading-tight">{item.time}</span>
                                    );
                                  })()}
                                </div>
                              </div>
                              
                              {/* Content Card */}
                              <div className={`flex-1 rounded-2xl p-6 md:p-8 transition-all ${
                                item.isBreak 
                                  ? 'bg-amber-50 border border-amber-100/50 shadow-sm' 
                                  : 'bg-white border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-0.5'
                              }`}>
                                
                                {/* Mobile Time Badge */}
                                <div className="md:hidden flex items-center gap-2 mb-4 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                                  <Clock className="w-3.5 h-3.5 text-[#1F83C6]" />
                                  <span className="text-xs font-extrabold text-slate-700">{item.time}</span>
                                </div>

                                {item.isBreak ? (
                                  <div className="flex items-center gap-4 text-amber-700 font-extrabold uppercase tracking-widest text-sm md:text-base">
                                    <span className="text-2xl">{item.title.toLowerCase().includes('dinner') || item.title.toLowerCase().includes('lunch') ? '🍽️' : '☕'}</span>
                                    {item.title}
                                  </div>
                                ) : (
                                  <>
                                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-snug">{item.title}</h4>
                                    
                                    {item.subSessions ? (
                                      <div className="space-y-4 mt-6">
                                        {item.subSessions.map((sub, idx) => (
                                          <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                            <h5 className="font-bold text-slate-800 mb-3 leading-snug">{sub.title}</h5>
                                            <div className="flex flex-col gap-2">
                                              {sub.faculty && (
                                                <p className="text-sm text-slate-600 flex items-start gap-2">
                                                  <span className="font-semibold text-slate-400 w-24 shrink-0 uppercase tracking-wider text-[10px] mt-1">Faculty</span> 
                                                  <span className="text-[#F26522] font-bold">{sub.faculty}</span>
                                                </p>
                                              )}
                                              {sub.chairpersons && (
                                                <p className="text-sm text-slate-600 flex items-start gap-2">
                                                  <span className="font-semibold text-slate-400 w-24 shrink-0 uppercase tracking-wider text-[10px] mt-1">Chairpersons</span> 
                                                  <span className="font-medium text-slate-700">{sub.chairpersons.replace('Judges: ', '')}</span>
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 mt-4">
                                        {item.faculty && (
                                          <p className="text-sm text-slate-600 flex items-center gap-2">
                                            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Faculty</span>
                                            <span className="text-[#F26522] font-bold">{item.faculty}</span>
                                          </p>
                                        )}
                                        {item.chairpersons && (
                                          <p className="text-sm text-slate-600 flex items-center gap-2">
                                            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Chairpersons</span>
                                            <span className="font-medium text-slate-700">{item.chairpersons}</span>
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 bg-slate-50 h-64">
                        <Calendar className="w-10 h-10 mb-4 opacity-50" />
                        <p className="font-semibold text-lg text-center">Schedule for {days.find(d => d.id === activeTab)?.label} in {halls.find(h => h.id === activeHall)?.label} will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Register Content */}
              {activeTab === 'register' && (
                <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">Registration Details</h2>
                  <p className="text-slate-500 mb-8 max-w-lg">
                    Secure your spot at MVCON 2027. Early bird registration is now open with special rates for students and early career professionals.
                  </p>
                  <button className="bg-[#1F83C6] hover:bg-[#156ca5] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1">
                    Proceed to Payment
                  </button>
                </div>
              )}

            </div>
          </motion.div>
      </div>
    </div>
  );
}
