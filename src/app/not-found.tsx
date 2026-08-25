"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden text-center relative">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-[#F26522] rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none" />

        <div className="p-12 md:p-16 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
          >
            <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#1F83C6] to-[#0e4b75]">
              404
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-4 mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-10 text-lg">
              Oops! It seems you've wandered off the track. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl font-bold transition-all w-full sm:w-auto justify-center"
              >
                <ArrowLeft className="w-5 h-5" /> Go Back
              </button>
              
              <Link 
                href="/"
                className="flex items-center gap-2 px-8 py-3.5 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl font-bold shadow-md shadow-[#1F83C6]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center border-2 border-[#1F83C6]"
              >
                <Home className="w-5 h-5" /> Return Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
