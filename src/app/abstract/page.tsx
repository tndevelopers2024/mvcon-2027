import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function AbstractSubmissionPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden text-center relative">
        <div className="bg-[#0b1623] p-12 text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-[#1F83C6] rounded-full mix-blend-screen filter blur-[80px] opacity-40" />
          <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-[#F26522] rounded-full mix-blend-screen filter blur-[80px] opacity-30" />
          
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2 relative z-10 tracking-tight">Abstract Submission</h1>
          <p className="text-slate-400 font-medium relative z-10">Portal opening soon</p>
        </div>

        <div className="p-12 bg-white relative z-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            We are preparing the submission portal!
          </h2>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-10 text-lg">
            The abstract submission guidelines and portal for MVCON 2027 will be available here shortly. Please check back later.
          </p>

          <div className="flex justify-center">
            <Link 
              href="/"
              className="flex items-center gap-2 px-8 py-3.5 bg-[#1F83C6] hover:bg-[#156ca5] text-white rounded-xl font-bold shadow-md shadow-[#1F83C6]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
