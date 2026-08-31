import Image from 'next/image';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Gallery | MVCON 2027',
  description: 'Explore the highlights and moments from previous MVCON events.',
};

// Gallery images from /images/gallery/1.jpg to 75.jpg
const galleryImages = Array.from({ length: 75 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.jpg`,
  alt: `MVCON Moment ${i + 1}`,
  size: (i + 1) % 4 === 0 ? 'large' : (i + 1) % 3 === 0 ? 'medium' : 'small'
}));

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
            alt="Gallery Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041E42]/90 via-[#0A3D73]/80 to-[#1F83C6]/60 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-widest shadow-xl">
            <Camera className="w-4 h-4" /> MVCON Moments
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            MVCON 2026 Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            A visual journey through MVCON 2026. Discover the memories, learning, and networking moments from our previous conference.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-[#1F83C6] rounded-2xl flex items-center justify-center border border-blue-100 shrink-0 shadow-sm">
                <ImageIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800">
                  Featured Highlights
                </h2>
                <p className="text-slate-500 font-medium mt-1">Glimpses from our scientific sessions and events</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-orange-500 bg-orange-50 px-4 py-2 rounded-full font-bold border border-orange-100">
              <Sparkles className="w-4 h-4" /> 
              <span>{galleryImages.length} Photos</span>
            </div>
          </div>

          {/* Masonry-style Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={image.size === 'large' ? 1200 : image.size === 'medium' ? 800 : 600}
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                </div>
              </div>
            ))}
          </div>



        </div>
      </section>
    </main>
  );
}
