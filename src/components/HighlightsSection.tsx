import Image from 'next/image';
import { Microscope, MonitorPlay, MessageSquare, Users } from 'lucide-react';

const highlights = [
  {
    id: '01',
    title: 'Wide Range of Sessions',
    icon: Microscope,
    imageSrc: '/images/hero-banner1.JPG',
  },
  {
    id: '02',
    title: 'Live Workshops',
    icon: MonitorPlay,
    imageSrc: '/images/hero-banner2.JPG',
  },
  {
    id: '03',
    title: 'Scientific Exchanges',
    icon: MessageSquare,
    imageSrc: '/images/hero-banner3.JPG',
  },
  {
    id: '04',
    title: 'Networking Opportunity',
    icon: Users,
    imageSrc: '/images/about.JPG',
  },
];

import ScrollReveal from './ScrollReveal';

export default function HighlightsSection() {
  return (
    <section id="highlights" className="py-24 bg-white dark:bg-slate-900 border-y border-border-color overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16" direction="up">
          <h2 className="text-4xl font-extrabold text-foreground mb-4">
            Conference Highlights
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </ScrollReveal>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id} direction="up" delay={index * 150}>
                <div className="group relative h-64 overflow-hidden rounded-2xl border border-border-color shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-slate-50 dark:bg-slate-800">
                  {/* Background Image (Revealed on Hover) */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Dark overlay to ensure text is readable against the background image */}
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-700" />
                  </div>

                  {/* Card Content (z-10 ensures it sits above the background) */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 transition-colors duration-500">
                    <Icon className="w-8 h-8 mb-auto text-primary group-hover:text-white transition-colors duration-500" />
                    
                    <div>
                      <span className="text-sm font-bold text-text-muted group-hover:text-white/70 transition-colors duration-500 mb-2 block">
                        {item.id}
                      </span>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors duration-500">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
