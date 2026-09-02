"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TopbarCountdown from './TopbarCountdown';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/#about' },
  { name: 'Scientific Program', href: '/scientific-program' },
  { name: 'Faculties', href: '/faculties' },
  { name: 'Abstract Submission', href: '/abstract' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 30);
      
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down past threshold
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`transition-all duration-500 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'}`}>
        {/* <TopbarCountdown /> */}
      </div>
      <header className={`w-full transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200 py-3' 
          : 'bg-white border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#1F83C6] uppercase tracking-wide">
          <Link href="/"><img className={`transition-all duration-500 ease-in-out ${isScrolled ? 'w-24' : 'w-32'}`} src="/images/logo.png" alt="" /></Link>
        </div>
        <nav className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative pb-1 border-b-2 ${
                pathname === link.href
                  ? 'text-[#1F83C6] border-[#1F83C6]'
                  : 'text-slate-800 border-transparent hover:text-[#1F83C6]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Link href="/register" className="btn-primary">Register Now</Link>
        </div>
      </header>
      </div>
  );
}
