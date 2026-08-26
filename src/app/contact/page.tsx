import { MapPin, Phone, Mail, Building2, BookOpen } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Contact Us | MVCON 2027',
  description: 'Get in touch with the MVCON 2027 Conference Secretariat and Abstract Submission teams.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden bg-[#0A3D73]">
        {/* Subtle background pattern/gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F83C6] via-[#0A3D73] to-[#041E42] opacity-90" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-4 transform translate-y-[-20px]">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium uppercase tracking-widest">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Contact Us
          </h1>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 -mt-24 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Conference Secretariat Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-500 group">
            <div className="w-16 h-16 bg-[#1F83C6]/10 text-[#1F83C6] rounded-2xl flex items-center justify-center mb-8 border border-[#1F83C6]/20 group-hover:scale-110 group-hover:bg-[#1F83C6] group-hover:text-white transition-all duration-500">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-8 pb-6 border-b border-slate-100">
              Conference Secretariat
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="mt-1 bg-slate-50 p-2.5 rounded-xl text-[#1F83C6] shadow-sm border border-slate-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 leading-snug">M.V. Hospital for Diabetes & Prof. M. Viswanathan Diabetes Research Centre</h4>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                    No.4, West Madha Church Street, Royapuram,<br />
                    Chennai - 600 013, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-slate-50 p-2.5 rounded-xl text-[#1F83C6] shadow-sm border border-slate-100">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+918925955818" className="text-slate-600 font-semibold hover:text-[#1F83C6] transition-colors text-base md:text-lg">
                  +91 8925955818
                </a>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-slate-50 p-2.5 rounded-xl text-[#1F83C6] shadow-sm border border-slate-100">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:mvconofficial@gmail.com" className="text-slate-600 font-semibold hover:text-[#1F83C6] transition-colors text-base md:text-lg break-all">
                  mvconofficial@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Abstract Submission Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-500 group">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8 border border-orange-100 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-8 pb-6 border-b border-slate-100">
              Abstract Submission Queries
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="bg-slate-50 p-2.5 rounded-xl text-orange-500 shadow-sm border border-slate-100">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+918925955818" className="text-slate-600 font-semibold hover:text-orange-500 transition-colors text-base md:text-lg">
                  +91 8925955818
                </a>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-slate-50 p-2.5 rounded-xl text-orange-500 shadow-sm border border-slate-100">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:mvconabstract@gmail.com" className="text-slate-600 font-semibold hover:text-orange-500 transition-colors text-base md:text-lg break-all">
                  mvconabstract@gmail.com
                </a>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8 rounded-2xl border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium relative z-10">
                Our support team is available to assist you with any questions regarding your abstract submissions or general conference details. Reach out to us via email or phone.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
