"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, ArrowRight, Loader2, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-redirect if already signed in
  useEffect(() => {
    const savedUser = localStorage.getItem('mvcon_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } catch (e) {
        // ignore
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Save token and user details to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('mvcon_token', data.token);
        localStorage.setItem('mvcon_user', JSON.stringify(data.user));
      }

      // Redirect based on role
      if (data.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 flex justify-center items-center">
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
          <p className="text-slate-400 font-medium relative z-10">Sign in to MVCON 2027 Portal</p>
        </div>

        <div className="p-8 sm:p-10 -mt-6 bg-white relative z-20 rounded-t-3xl">

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

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
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F83C6]/20 focus:border-[#1F83C6] focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="group relative w-full flex justify-center items-center gap-3 py-4 rounded-xl text-white font-extrabold text-lg bg-gradient-to-r from-[#1F83C6] to-[#0e4b75] overflow-hidden shadow-[0_10px_30px_-10px_rgba(31,131,198,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(31,131,198,0.6)] transition-all hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-500 font-medium">
                New attendee?{' '}
                <Link href="/register" className="text-[#F26522] font-bold hover:underline transition-all">
                  Register for MVCON 2027
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
