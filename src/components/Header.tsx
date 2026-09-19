"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const [currentUser, setCurrentUser] = useState<{ fullName?: string; role?: string } | null>(null);

  useEffect(() => {
    const checkUser = () => {
      try {
        const u = localStorage.getItem('mvcon_user');
        if (u) setCurrentUser(JSON.parse(u));
        else setCurrentUser(null);
      } catch {
        setCurrentUser(null);
      }
    };
    checkUser();
  }, [pathname]);

  const isTransparent = !isScrolled && pathname !== '/register' && pathname !== '/login' && pathname !== '/dashboard' && pathname !== '/admin';

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
      (isVisible || isMobileMenuOpen) ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <header className={`w-full transition-all duration-300 ease-in-out border-b py-3 sm:py-4 bg-white/95 backdrop-blur-md shadow-sm border-slate-200 ${
        isTransparent 
          ? 'lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:border-transparent' 
          : 'lg:bg-white/95 lg:backdrop-blur-md lg:shadow-md lg:border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#1F83C6] uppercase tracking-wide">
          <Link href="/"><img className="w-24 sm:w-28 drop-shadow-sm" src="/images/logo.png" alt="MVCON Logo" /></Link>
        </div>
        <nav className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: isTransparent
                    ? '#ffffff'
                    : isActive
                      ? '#1F83C6'
                      : '#1e293b',
                }}
                className={`text-sm font-semibold transition-colors duration-200 relative pb-1 border-b-2 ${
                  isTransparent
                    ? isActive
                      ? '!text-white !border-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                      : '!text-white/95 !border-transparent hover:!text-white hover:!border-white/60 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                    : isActive
                      ? '!text-[#1F83C6] !border-[#1F83C6]'
                      : '!text-slate-800 !border-transparent hover:!text-[#1F83C6]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <Link 
              href={currentUser.role === 'admin' ? '/admin' : '/dashboard'} 
              className="px-4 py-2 bg-[#1F83C6] hover:bg-[#156ca5] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#1F83C6]/20 transition-all flex items-center gap-1.5"
            >
              {currentUser.role === 'admin' ? 'Admin Panel' : 'My Pass / Portal'}
            </Link>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link 
                href="/login" 
                className={`text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-colors ${
                  isTransparent 
                    ? 'text-slate-700 hover:text-[#1F83C6] lg:text-white lg:hover:text-sky-300 lg:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]' 
                    : 'text-slate-700 hover:text-[#1F83C6]'
                }`}
              >
                Sign In
              </Link>
              <Link href="/register" className="btn-primary hidden sm:inline-flex shadow-md">Register Now</Link>
            </div>
          )}

          <button 
            className="lg:hidden p-2 transition-colors text-slate-800 hover:text-[#1F83C6]" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white shadow-lg ${isMobileMenuOpen ? 'max-h-screen border-t border-slate-200 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium py-2 border-b border-slate-100 ${
                  pathname === link.href
                    ? 'text-[#1F83C6]'
                    : 'text-slate-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {currentUser ? (
              <Link 
                href={currentUser.role === 'admin' ? '/admin' : '/dashboard'} 
                className="btn-primary w-full text-center mt-2" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Open Attendee Portal'}
              </Link>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/login" className="w-full text-center py-2.5 font-bold text-slate-700 bg-slate-100 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link href="/register" className="btn-primary w-full text-center sm:hidden" onClick={() => setIsMobileMenuOpen(false)}>Register Now</Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
