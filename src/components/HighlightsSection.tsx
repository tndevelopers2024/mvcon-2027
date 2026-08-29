import Image from 'next/image';
import { Microscope, MonitorPlay, MessageSquare, Users } from 'lucide-react';

const highlights = [
  {
    id: '01',
    title: 'Wide Range of Sessions',
    icon: Microscope,
    imageSrc: '/images/highlight1.jpg',
  },
  {
    id: '02',
    title: 'Live Workshops',
    icon: MonitorPlay,
    imageSrc: '/images/highlight2.jpg',
  },
  {
    id: '03',
    title: 'Scientific Exchanges',
    icon: MessageSquare,
    imageSrc: '/images/highlight3.jpg',
  },
  {
    id: '04',
    title: 'Networking Opportunity',
    icon: Users,
    imageSrc: '/images/highlight4.JPG',
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
                <div className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border-color shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-white dark:bg-slate-800">
                  {/* Thumbnail Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-6 relative bg-slate-50 dark:bg-slate-800">
                    <div className="absolute -top-8 right-6 bg-white dark:bg-slate-700 p-3 rounded-xl shadow-md border border-slate-100 dark:border-slate-600 transition-transform duration-500 group-hover:-translate-y-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <span className="text-sm font-bold text-primary mb-2 block">
                      {item.id}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
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
