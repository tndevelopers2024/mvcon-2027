import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function ChairmanMessage() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#f8f9fa] to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden relative">
      {/* Decorative background blobs - Using logo colors: Yellow/Orange and Blue */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-yellow-400/20 dark:bg-yellow-500/10 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/20 dark:bg-blue-600/10 blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
          
          {/* Right/Top: Image */}
          <ScrollReveal className="w-full md:w-5/12 shrink-0" direction="right">
            <div className="relative mx-auto max-w-md mt-8 md:mt-0">
              {/* Decorative Frame Offset - Yellow to Orange gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-orange-500 transform translate-x-4 translate-y-4 rounded-2xl opacity-90" />
              
              {/* Main Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group">
                <Image
                  src="/images/chairman.jpg"
                  alt="Dr. Vijay Viswanathan"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-4 border border-orange-50 dark:border-slate-700 transition-transform duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">75+ Years of</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">Legacy</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Left/Bottom: Content */}
          <ScrollReveal className="w-full md:w-7/12 relative" direction="left" delay={200}>
            {/* Background Quote Icon - Blue */}
            <svg className="absolute -top-12 -left-8 md:-left-12 w-32 h-32 text-blue-500/10 dark:text-slate-700/30 transform -rotate-6 pointer-events-none" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <div className="relative z-10 pt-4">
              <div className="mb-10">
                <span className="text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase text-sm mb-3 block">
                  Welcome to MVCON
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Message From the <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                    Organising Chairman
                  </span>
                </h2>
              </div>

              <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-10 space-y-5">
                <p>
                  It gives me immense pleasure to welcome you to the inaugural edition of MVCON, a new forum for a plethora of scientific sessions from MV Diabetes. With over <span className="font-semibold text-slate-900 dark:text-white">75 years of legacy</span> in pioneering diabetes care, MV Diabetes has stood as a leader in both comprehensive diabetes management and advanced diabetic foot care.
                </p>
                <p>
                  MVCON builds on this legacy, creating a scientific platform where diabetologists, surgeons, and paramedics can come together to learn, exchange, and collaborate. With a special expertise on diabetic foot—an area where MV Diabetes has earned both national and international recognition—we aim to advance skills, share innovations, and improve clinical outcomes for patients across the globe.
                </p>
                <p>
                  As the National President of RSSDI, India’s largest organization for healthcare professionals and researchers in diabetes, and the Honorary President of D-Foot International, I have dedicated my mission to developing a multidisciplinary approach to reduce preventable amputations worldwide. MVCON reflects this strategic vision, &amp; I look forward to welcoming you to Chennai, to a prestigious event that promises learning, inspiration, and collaboration for the diabetes community.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-200 dark:border-slate-700/50">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Dr. Vijay Viswanathan</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider text-sm mt-1">
                    Organising Chairman
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
