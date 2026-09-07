import Image from 'next/image';
import { Microscope, MonitorPlay, MessageSquare, Users } from 'lucide-react';

const highlights = [
  {
    id: '01',
    title: 'Wide Range of Sessions',
    icon: Microscope,
    imageSrc: '/images/highlight1.jpg',
    description: 'Explore a diverse array of topics presented by renowned experts across various medical disciplines.',
  },
  {
    id: '02',
    title: 'Live Workshops',
    icon: MonitorPlay,
    imageSrc: '/images/highlight2.jpg',
    description: 'Participate in hands-on sessions and interactive demonstrations to enhance your practical skills.',
  },
  {
    id: '03',
    title: 'Scientific Exchanges',
    icon: MessageSquare,
    imageSrc: '/images/highlight3.jpg',
    description: 'Engage in stimulating discussions and share groundbreaking research with peers and industry leaders.',
  },
  {
    id: '04',
    title: 'Networking Opportunity',
    icon: Users,
    imageSrc: '/images/highlight4.jpg',
    description: 'Connect with professionals globally, forge new partnerships, and expand your professional network.',
  },
];

import ScrollReveal from './ScrollReveal';

export default function HighlightsSection() {
  return (
    <section id="highlights" className="py-24 bg-white dark:bg-slate-900 border-y border-border-color overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20" direction="up">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6">
            Conference Highlights
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </ScrollReveal>

        {/* Highlights Grid - Changed to 2x2 for larger images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id} direction="up" delay={index * 150}>
                <div className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-border-color shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-slate-50 dark:bg-slate-800/50">
                  {/* Large Thumbnail Image */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon on Image */}
                    <div className="absolute bottom-6 right-6 bg-primary/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Number ID on Image */}
                    <div className="absolute top-6 left-6">
                       <span className="text-4xl font-black text-white/90 drop-shadow-md">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-8 lg:p-10 relative">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.description}
                    </p>
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
