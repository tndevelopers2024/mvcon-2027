import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image with Unique Offset Style */}
          <ScrollReveal className="w-full lg:w-1/2 relative group" direction="left">
            {/* The offset decorative block */}
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
            
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <Image
                src="/images/about.JPG"
                alt="About MVCON"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Right: Text Content */}
          <ScrollReveal className="w-full lg:w-1/2 flex flex-col justify-center" direction="right" delay={200}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              About <span className="text-primary">MVCON</span>
            </h2>
            
            {/* Accent Line */}
            <div className="w-16 h-1.5 bg-secondary rounded-full mb-8" />

            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
              <p className="font-medium text-foreground">
                MVCON 2027 marks the second edition of MV's annual scientific update bringing together leading diabetologists, surgeons, researchers, academicians and paramedical experts.
              </p>
              <p>
                We invite clinicians, researchers, and healthcare professionals to join us for an intensive scientific exchange designed to bridge the gap between clinical research and daily practice.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/scientific-program"
                className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-secondary transition-colors duration-300 group"
              >
                Know Program Details
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
