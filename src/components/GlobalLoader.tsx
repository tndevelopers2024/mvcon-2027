'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after a short delay to allow the page to mount and give a stylish entry effect.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#F26522] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <div className="relative w-64 h-32 sm:w-80 sm:h-40 mb-10 bg-white/5 rounded-3xl p-6 backdrop-blur-sm border border-white/10 shadow-2xl">
              <img 
                src="/images/logo.png" 
                alt="MVCON Logo" 
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>
            
            {/* Custom loader animation */}
            <div className="flex flex-col items-center gap-5">
              <div className="flex gap-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full bg-[#1F83C6]"
                    animate={{
                      y: ["0%", "-100%", "0%"],
                      backgroundColor: ["#1F83C6", "#F26522", "#1F83C6"],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-white/60 text-sm font-bold tracking-[0.2em] uppercase"
              >
                Loading MVCON 2027
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
