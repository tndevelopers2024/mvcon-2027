import { Calendar, FileText, Trophy, AlertCircle, CheckCircle2, FileEdit, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Abstract Submission | MVCON 2027',
  description: 'Submit your scientific abstracts for MVCON 2027. Review guidelines, timeline, and selection criteria.',
};

export default function AbstractPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/abstract/abstract-bg.jpg" 
            alt="Conference Hall" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041E42]/90 via-[#0A3D73]/80 to-[#1F83C6]/60 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-widest">
            <FileEdit className="w-4 h-4" /> Call for Abstracts
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Submit Your Abstract
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Join leading diabetologists, surgeons, and researchers by presenting your original scientific data at MVCON 2027.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 -mt-16 relative z-20 space-y-24">
        
        {/* Section 1: Timeline (Image Left, Text Right) */}
        <section className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col lg:flex-row group">
          <div className="w-full lg:w-5/12 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
              alt="Planning and Timeline" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
               <h2 className="text-3xl font-extrabold text-white">Submission Timeline</h2>
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 p-8 md:p-12 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="hidden lg:flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-100 shrink-0">
                <Calendar className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800">
                Submission Timeline
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-[#1F83C6] shrink-0 mt-1" />
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  MVCON 2027 Scientific Abstract Submission is open and will close on <strong className="text-slate-900 border-b-2 border-orange-300">31st December 2026</strong>.
                </p>
              </div>
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F83C6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <p className="text-slate-700 leading-relaxed text-lg relative z-10">
                  <strong className="text-[#1F83C6] font-extrabold block mb-2 uppercase tracking-wide text-sm">Mandatory Requirement</strong>
                  Registration for the conference is mandatory for abstract submission. Abstracts should be submitted through the online portal along with your MVCON 2027 Registration number.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Guidelines (Bento Grid) */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-blue-50 text-[#1F83C6] rounded-2xl flex items-center justify-center border border-blue-100 shrink-0 shadow-sm">
              <FileText className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">
              Guidelines for Submission
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Top Left: Checklist (col-span-2) */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-center">
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <span className="text-slate-700 text-lg leading-relaxed">Abstracts must contain original scientific data.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <span className="text-slate-700 text-lg leading-relaxed">
                    They should focus on diabetes and its complications, prevention, management, lifestyle interventions, clinical outcomes, innovative techniques, and emerging therapies. <strong>Case reports are also accepted.</strong>
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <span className="text-slate-700 text-lg leading-relaxed">
                    It is <strong>not permitted</strong> to submit work that has been published and/or is likely to be published before the MVCON 2027 Abstract submission deadline.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <span className="text-slate-700 text-lg leading-relaxed">
                    Each author can be listed <strong>ONLY ONCE</strong> as the PRESENTING author. The presenting author can be listed as a co-author in any number of abstracts. The same abstract cannot be submitted multiple times by listing different presenting authors.
                  </span>
                </li>
              </ul>
            </div>

            {/* Top Right: Image (col-span-1) */}
            <div className="lg:col-span-1 relative min-h-[350px] lg:min-h-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
              <Image 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                alt="Medical Research" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A3D73]/30 to-transparent mix-blend-multiply" />
            </div>

            {/* Bottom: Structure (col-span-3) */}
            <div className="lg:col-span-3 bg-gradient-to-br from-[#0A3D73] to-[#041E42] rounded-[2rem] p-8 md:p-10 shadow-xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F83C6]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              
              <h3 className="font-bold text-white text-2xl mb-8 flex items-center gap-3 relative z-10">
                <FileEdit className="w-7 h-7 text-orange-400" /> Abstract Structure
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center mb-5 font-bold text-lg">1</div>
                  <h4 className="font-bold text-lg mb-2 text-white">Maximum Length</h4>
                  <p className="text-white/80 leading-relaxed">400 words (excluding title and author affiliations).</p>
                </div>
                
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center mb-5 font-bold text-lg">2</div>
                  <h4 className="font-bold text-lg mb-2 text-white">Sub-headings</h4>
                  <p className="text-white/80 leading-relaxed">In bold: Background and Aims, Materials and Methods, Results, Conclusions.</p>
                </div>
                
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center mb-5 font-bold text-lg">3</div>
                  <h4 className="font-bold text-lg mb-2 text-white">Title</h4>
                  <p className="text-white/80 leading-relaxed">Should be short (10–15 words) with authors &amp; affiliations.</p>
                </div>
                
                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center mb-5 font-bold text-lg">4</div>
                  <h4 className="font-bold text-lg mb-2 text-white">Media</h4>
                  <p className="text-white/80 leading-relaxed">One table or one figure not exceeding 300 words in the abstract may be included.</p>
                </div>

                <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center mb-5 font-bold text-lg">5</div>
                  <h4 className="font-bold text-lg mb-2 text-white">Presentations</h4>
                  <p className="text-white/80 leading-relaxed">Presentations must avoid branding and use generic product names.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Selection & Awards (Image Left, Text Right) */}
        <section className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col lg:flex-row group">
          <div className="w-full lg:w-5/12 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <Image 
              src="/images/abstract/abstract-img1.jpg" 
              alt="Conference Stage" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D73]/90 via-[#0A3D73]/40 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white">
               <Trophy className="w-12 h-12 text-yellow-400 mb-4 drop-shadow-md" />
               <h2 className="text-3xl font-extrabold mb-2 drop-shadow-md">Selection & Awards</h2>
               <p className="text-white/90 font-medium">Rewarding excellence in clinical research.</p>
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-50/50">
            <div className="space-y-8">
              <p className="text-xl text-slate-700 leading-relaxed font-medium">
                The Scientific Committee reserves the right to decide the mode of abstract presentation (oral or poster).
              </p>
              
              <div className="bg-white rounded-2xl p-8 border border-yellow-100 shadow-xl shadow-yellow-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h4 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-3 relative z-10">
                  <span className="text-3xl">🏆</span> Best Oral and Poster Presentations
                </h4>
                <p className="text-slate-600 text-lg relative z-10">
                  Outstanding abstracts will be awarded at the valedictory function of MVCON 2027.
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
                <p className="text-slate-700 text-lg">
                  You will be notified of receipt of your abstract by email. For queries, contact{' '}
                  <a href="mailto:mvconabstract@gmail.com" className="font-bold text-[#1F83C6] hover:text-[#0A3D73] transition-colors underline underline-offset-4">
                    mvconabstract@gmail.com
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+918925955818" className="font-bold text-[#1F83C6] hover:text-[#0A3D73] transition-colors">
                    +91 8925955818
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="text-center pt-8 pb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-gradient-to-r from-[#1F83C6]/0 via-[#1F83C6]/20 to-[#1F83C6]/0 blur-3xl pointer-events-none" />
          
          <Link 
            href="#" 
            className="relative z-10 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-xl shadow-orange-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Submit Abstract Online <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-slate-500 font-medium mt-6 relative z-10">
            Ensure you have your <span className="font-bold text-slate-700">MVCON 2027 Registration number</span> ready before submitting.
          </p>
        </div>

      </div>
    </main>
  );
}
