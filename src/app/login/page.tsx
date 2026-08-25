"use client";

import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", email);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
        
        {/* Header section with brand colors */}
        <div className="bg-[#0b1623] p-10 pb-12 text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[60px] opacity-40" />
          <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-[#F26522] rounded-full mix-blend-screen filter blur-[60px] opacity-30" />
          
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2 relative z-10 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 font-medium relative z-10">Sign in to your MVCON 2027 account</p>
        </div>

        <div className="p-8 sm:p-10 -mt-6 bg-white relative z-20 rounded-t-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                />
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#1F83C6] transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    required
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                  />
                </div>
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-bold text-[#1F83C6] hover:text-[#156ca5] transition-colors">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="group relative w-full flex justify-center items-center gap-3 py-4 rounded-xl text-white font-extrabold text-lg bg-gradient-to-r from-[#1F83C6] to-[#0e4b75] overflow-hidden shadow-[0_10px_30px_-10px_rgba(31,131,198,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(31,131,198,0.6)] transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">Sign In</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-500 font-medium">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#F26522] font-bold hover:underline transition-all">
                  Register here
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
