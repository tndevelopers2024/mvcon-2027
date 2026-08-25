"use client";

import React from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

const committeeMembers = [
  {
    name: 'Dr. Viswanathan Vishnu Vijay',
    role: 'Organising Committee',
    image: '/images/person1.png',
  },
  {
    name: 'Dr. Prashanth Arun',
    role: 'Organising Committee',
    image: '/images/person2.png',
  },
  {
    name: 'Dr. Siva shankari S',
    role: 'Organising Committee',
    image: '/images/person3.png',
  },
  {
    name: 'Dr. Satyavani K',
    role: 'Organising Committee',
    image: '/images/person4.png',
  },
  {
    name: 'Ms. Nagajothi',
    role: 'Organising Committee',
    image: '/images/person5.png',
  },
];

export default function OrganisingCommittee() {
  return (
    <section className="py-24 bg-[#f8f9fa] dark:bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      {/* Decorative background pattern (removed missing svg) */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <ScrollReveal className="text-center mb-16" direction="up">
          <span className="text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase text-sm mb-3 block">
            Meet the Team
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Organising <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Committee</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mt-6 rounded-full" />
        </ScrollReveal>

        {/* Top Row: 2 Members */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
          {committeeMembers.slice(0, 2).map((member, index) => (
            <ScrollReveal key={member.name} direction="up" delay={index * 150} className="w-full max-w-[320px]">
              <CommitteeCard member={member} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Row: 3 Members */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {committeeMembers.slice(2, 5).map((member, index) => (
            <ScrollReveal key={member.name} direction="up" delay={index * 150 + 300} className="w-full max-w-[320px]">
              <CommitteeCard member={member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommitteeCard({ member }: { member: any }) {
  return (
    <div className="group flex flex-col items-center">
      
      {/* Avatar Container */}
      <div className="relative w-48 h-48 mb-8 flex justify-center items-end mt-6">
        
        {/* Arch Decoration */}
        <div className="absolute top-[-15%] left-[-15%] w-[130%] h-[130%] rounded-full border-[12px] border-primary/10 dark:border-primary/20 overflow-hidden z-0 transition-transform duration-700 group-hover:rotate-12">
           {/* Diagonal Stripes */}
           <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,var(--primary)_8px,var(--primary)_12px)]" />
           {/* Mask bottom half to blend with section background */}
           <div className="absolute bottom-0 left-[-10%] w-[120%] h-1/2 bg-[#f8f9fa] dark:bg-slate-900" />
        </div>

        {/* Circular Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg z-10 bg-slate-200 dark:bg-slate-800 transition-transform duration-500 group-hover:-translate-y-2">
          {/* Fallback skeleton */}
          <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-700" />
          
          <img
            src={member.image}
            alt={member.name}
            className="relative w-full h-full object-cover object-top z-10 transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1F83C6&color=fff&size=256`;
            }}
          />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="text-center z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-primary">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-text-muted">
          {member.role}
        </p>
      </div>
    </div>
  );
}
