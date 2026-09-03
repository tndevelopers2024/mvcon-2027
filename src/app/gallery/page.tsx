import Image from 'next/image';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import GalleryGrid, { GalleryImage } from '@/components/GalleryGrid';

export const metadata = {
  title: 'Gallery | MVCON 2027',
  description: 'Explore the highlights and moments from previous MVCON events.',
};

// Gallery images from /images/gallery/1.jpg to 75.jpg
const galleryImages: GalleryImage[] = [
  { id: 76, src: '/images/gallery/76.jpg', alt: 'MVCON Moment 76', size: 'medium' },
  { id: 77, src: '/images/gallery/77.jpg', alt: 'MVCON Moment 77', size: 'medium' },
  { id: 78, src: '/images/gallery/78.jpg', alt: 'MVCON Moment 78', size: 'medium' },
  { id: 79, src: '/images/gallery/79.jpg', alt: 'MVCON Moment 79', size: 'medium' },
  { id: 80, src: '/images/gallery/80.jpg', alt: 'MVCON Moment 80', size: 'medium' },
  { id: 81, src: '/images/gallery/81.jpg', alt: 'MVCON Moment 81', size: 'medium' },
  { id: 82, src: '/images/gallery/82.jpg', alt: 'MVCON Moment 82', size: 'medium' },
  { id: 83, src: '/images/gallery/83.jpg', alt: 'MVCON Moment 83', size: 'medium' },
  { id: 84, src: '/images/gallery/84.jpg', alt: 'MVCON Moment 84', size: 'medium' },
  { id: 85, src: '/images/gallery/85.jpg', alt: 'MVCON Moment 85', size: 'medium' },
  { id: 1, src: '/images/gallery/1.jpg', alt: 'MVCON Moment 1', size: 'small' },
  { id: 2, src: '/images/gallery/2.jpg', alt: 'MVCON Moment 2', size: 'small' },
  { id: 4, src: '/images/gallery/4.jpg', alt: 'MVCON Moment 4', size: 'medium' },
  { id: 8, src: '/images/gallery/8.jpg', alt: 'MVCON Moment 8', size: 'large' },
  { id: 11, src: '/images/gallery/11.jpg', alt: 'MVCON Moment 11', size: 'small' },
  { id: 12, src: '/images/gallery/12.jpg', alt: 'MVCON Moment 12', size: 'large' },
  { id: 13, src: '/images/gallery/13.jpg', alt: 'MVCON Moment 13', size: 'small' },
  { id: 18, src: '/images/gallery/18.jpg', alt: 'MVCON Moment 18', size: 'medium' },
  { id: 19, src: '/images/gallery/19.jpg', alt: 'MVCON Moment 19', size: 'small' },
  { id: 20, src: '/images/gallery/20.jpg', alt: 'MVCON Moment 20', size: 'large' },
  { id: 21, src: '/images/gallery/21.jpg', alt: 'MVCON Moment 21', size: 'medium' },
  { id: 22, src: '/images/gallery/22.jpg', alt: 'MVCON Moment 22', size: 'small' },
  { id: 23, src: '/images/gallery/23.jpg', alt: 'MVCON Moment 23', size: 'small' },
  { id: 24, src: '/images/gallery/24.jpg', alt: 'MVCON Moment 24', size: 'large' },
  { id: 25, src: '/images/gallery/25.jpg', alt: 'MVCON Moment 25', size: 'small' },
  { id: 26, src: '/images/gallery/26.jpg', alt: 'MVCON Moment 26', size: 'small' },
  { id: 27, src: '/images/gallery/27.jpg', alt: 'MVCON Moment 27', size: 'medium' },
  { id: 28, src: '/images/gallery/28.jpg', alt: 'MVCON Moment 28', size: 'large' },
  { id: 29, src: '/images/gallery/29.jpg', alt: 'MVCON Moment 29', size: 'small' },
  { id: 30, src: '/images/gallery/30.jpg', alt: 'MVCON Moment 30', size: 'medium' },
  { id: 31, src: '/images/gallery/31.jpg', alt: 'MVCON Moment 31', size: 'small' },
  { id: 32, src: '/images/gallery/32.jpg', alt: 'MVCON Moment 32', size: 'large' },
  { id: 33, src: '/images/gallery/33.jpg', alt: 'MVCON Moment 33', size: 'medium' },
  { id: 34, src: '/images/gallery/34.jpg', alt: 'MVCON Moment 34', size: 'small' },
  { id: 35, src: '/images/gallery/35.jpg', alt: 'MVCON Moment 35', size: 'small' },
  { id: 36, src: '/images/gallery/36.jpg', alt: 'MVCON Moment 36', size: 'large' },
  { id: 37, src: '/images/gallery/37.jpg', alt: 'MVCON Moment 37', size: 'small' },
  { id: 38, src: '/images/gallery/38.jpg', alt: 'MVCON Moment 38', size: 'small' },
  { id: 39, src: '/images/gallery/39.jpg', alt: 'MVCON Moment 39', size: 'medium' },
  { id: 40, src: '/images/gallery/40.jpg', alt: 'MVCON Moment 40', size: 'large' },
  { id: 41, src: '/images/gallery/41.jpg', alt: 'MVCON Moment 41', size: 'small' },
  { id: 42, src: '/images/gallery/42.jpg', alt: 'MVCON Moment 42', size: 'medium' },
  { id: 43, src: '/images/gallery/43.jpg', alt: 'MVCON Moment 43', size: 'small' },
  { id: 44, src: '/images/gallery/44.jpg', alt: 'MVCON Moment 44', size: 'large' },
  { id: 45, src: '/images/gallery/45.jpg', alt: 'MVCON Moment 45', size: 'medium' },
  { id: 46, src: '/images/gallery/46.jpg', alt: 'MVCON Moment 46', size: 'small' },
  { id: 47, src: '/images/gallery/47.jpg', alt: 'MVCON Moment 47', size: 'small' },
  { id: 48, src: '/images/gallery/48.jpg', alt: 'MVCON Moment 48', size: 'large' },
  { id: 49, src: '/images/gallery/49.jpg', alt: 'MVCON Moment 49', size: 'small' },
  { id: 50, src: '/images/gallery/50.jpg', alt: 'MVCON Moment 50', size: 'small' },
  { id: 51, src: '/images/gallery/51.jpg', alt: 'MVCON Moment 51', size: 'medium' },
  { id: 52, src: '/images/gallery/52.jpg', alt: 'MVCON Moment 52', size: 'small' },
  { id: 53, src: '/images/gallery/53.jpg', alt: 'MVCON Moment 53', size: 'small' },
  { id: 54, src: '/images/gallery/54.jpg', alt: 'MVCON Moment 54', size: 'medium' },
  { id: 55, src: '/images/gallery/55.jpg', alt: 'MVCON Moment 55', size: 'small' },
  { id: 56, src: '/images/gallery/56.jpg', alt: 'MVCON Moment 56', size: 'large' },
  { id: 57, src: '/images/gallery/57.jpg', alt: 'MVCON Moment 57', size: 'medium' },
  { id: 58, src: '/images/gallery/58.jpg', alt: 'MVCON Moment 58', size: 'small' },
  { id: 59, src: '/images/gallery/59.jpg', alt: 'MVCON Moment 59', size: 'large' },
  { id: 60, src: '/images/gallery/60.jpg', alt: 'MVCON Moment 60', size: 'medium' },
  { id: 61, src: '/images/gallery/61.jpg', alt: 'MVCON Moment 61', size: 'small' },
  { id: 62, src: '/images/gallery/62.jpg', alt: 'MVCON Moment 62', size: 'small' },
  { id: 63, src: '/images/gallery/63.jpg', alt: 'MVCON Moment 63', size: 'medium' },
  { id: 64, src: '/images/gallery/64.jpg', alt: 'MVCON Moment 64', size: 'small' },
  { id: 65, src: '/images/gallery/65.jpg', alt: 'MVCON Moment 65', size: 'small' },
  { id: 66, src: '/images/gallery/66.jpg', alt: 'MVCON Moment 66', size: 'medium' },
  { id: 67, src: '/images/gallery/67.jpg', alt: 'MVCON Moment 67', size: 'small' },
  { id: 68, src: '/images/gallery/68.jpg', alt: 'MVCON Moment 68', size: 'small' },
  { id: 69, src: '/images/gallery/69.jpg', alt: 'MVCON Moment 69', size: 'medium' },
  { id: 70, src: '/images/gallery/70.jpg', alt: 'MVCON Moment 70', size: 'small' },
  { id: 71, src: '/images/gallery/71.jpg', alt: 'MVCON Moment 71', size: 'small' },
  { id: 72, src: '/images/gallery/72.jpg', alt: 'MVCON Moment 72', size: 'medium' },
  { id: 73, src: '/images/gallery/73.jpg', alt: 'MVCON Moment 73', size: 'small' },
  { id: 74, src: '/images/gallery/74.jpg', alt: 'MVCON Moment 74', size: 'small' },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/gallery-bg.jpg" 
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
              <span>MVCON 2026</span>
            </div>
          </div>

          {/* Masonry-style Grid */}
          <GalleryGrid images={galleryImages} />



        </div>
      </section>
    </main>
  );
}
