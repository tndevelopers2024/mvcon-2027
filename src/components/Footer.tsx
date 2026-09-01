"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 pt-32 max-md:pt-40 pb-12 mt-24 z-10 border-t border-slate-800">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Floating CTA Section */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-5xl z-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-1 shadow-2xl overflow-hidden group">
          <div className="bg-slate-900 rounded-[22px] px-8 py-10 md:py-14 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Inner background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Ready to join MVCON?</h3>
              <p className="text-slate-400 font-medium text-lg">Secure your spot for the premier diabetes update.</p>
            </div>
            
            <Link href="/register" className="relative z-10 flex-shrink-0 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3">
              Register Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6 inline-block">
              <img 
                src="/images/logo.png" 
                alt="MVCON Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-none">MVCON 2027</div>';
                  }
                }}
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              The inaugural annual scientific update by MV Diabetes, Chennai. Dedicated to advancing the field of diabetes care and management with a special focus on the diabetic foot.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full !bg-slate-800 flex items-center justify-center !text-slate-400 hover:!bg-primary hover:!text-white transition-all duration-300 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full !bg-slate-800 flex items-center justify-center !text-slate-400 hover:!bg-pink-600 hover:!text-white transition-all duration-300 hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full !bg-slate-800 flex items-center justify-center !text-slate-400 hover:!bg-white hover:!text-slate-900 transition-all duration-300 hover:-translate-y-1">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Scientific Program', 'Faculties'].map((item) => (
                <li key={item}>
                  <Link href="#" className="!text-slate-400 hover:!text-secondary transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-secondary transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Venue Column */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-lg mb-6">Contact & Venue</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-slate-400 group">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <strong className="block text-white font-medium mb-1">Radisson Blu Hotel & Suites GRT Chennai</strong>
                  (near airport), Chennai
                </div>
              </li>
              <li className="flex items-center gap-4 text-slate-400 group">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="group-hover:text-white transition-colors"><Link href="mailto:mvconofficial@gmail.com">mvconofficial@gmail.com</Link></span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 group">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <Link href="tel:+918925955818"><span className="group-hover:text-white transition-colors">+91 8925955818</span></Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MVCON. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
