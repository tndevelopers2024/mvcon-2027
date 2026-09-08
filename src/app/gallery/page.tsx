import Image from 'next/image';
import { Camera } from 'lucide-react';
import { GalleryImage } from '@/components/GalleryGrid';
import GalleryTabs from '@/components/GalleryTabs';

export const metadata = {
  title: 'Gallery | MVCON 2027',
  description: 'Explore the highlights and moments from previous MVCON events.',
};

// Day 1 Gallery Images
const day1Images: GalleryImage[] = [
  { id: 1, src: '/images/gallery/MP/1.jpg', alt: 'MVCON Day 1 Highlight 1', size: 'medium' },
  { id: 2, src: '/images/gallery/MP/2.jpg', alt: 'MVCON Day 1 Highlight 2', size: 'medium' },
  { id: 3, src: '/images/gallery/MP/3.jpg', alt: 'MVCON Day 1 Highlight 3', size: 'medium' },
  { id: 4, src: '/images/gallery/MP/4.jpg', alt: 'MVCON Day 1 Highlight 4', size: 'medium' },
  { id: 5, src: '/images/gallery/MP/5.jpg', alt: 'MVCON Day 1 Highlight 5', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/6.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/7.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/8.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/9.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/10.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/11.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/12.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/13.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/14.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/15.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/16.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/17.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/18.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/19.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/20.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/21.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
  { id: 6, src: '/images/gallery/MP/22.jpg', alt: 'MVCON Day 1 Highlight 6', size: 'medium' },
]

// Day 2 Gallery Images (gal1 to gal85)
const day2Images: GalleryImage[] = [
  { id: 102, src: '/images/gallery/others/2.jpg', alt: 'MVCON Day 2 Highlight 2', size: 'small' },
  { id: 103, src: '/images/gallery/others/3.jpg', alt: 'MVCON Day 2 Highlight 3', size: 'small' },
  { id: 104, src: '/images/gallery/others/4.jpg', alt: 'MVCON Day 2 Highlight 4', size: 'medium' },
  { id: 105, src: '/images/gallery/others/5.jpg', alt: 'MVCON Day 2 Highlight 5', size: 'small' },
  { id: 106, src: '/images/gallery/others/6.jpg', alt: 'MVCON Day 2 Highlight 6', size: 'small' },
  { id: 107, src: '/images/gallery/others/7.jpg', alt: 'MVCON Day 2 Highlight 7', size: 'large' },
  { id: 109, src: '/images/gallery/others/9.jpg', alt: 'MVCON Day 2 Highlight 9', size: 'small' },
  { id: 110, src: '/images/gallery/others/10.jpg', alt: 'MVCON Day 2 Highlight 10', size: 'medium' },
  { id: 111, src: '/images/gallery/others/11.jpg', alt: 'MVCON Day 2 Highlight 11', size: 'small' },
  { id: 112, src: '/images/gallery/others/12.jpg', alt: 'MVCON Day 2 Highlight 12', size: 'small' },
  { id: 113, src: '/images/gallery/others/13.jpg', alt: 'MVCON Day 2 Highlight 13', size: 'small' },
  { id: 114, src: '/images/gallery/others/14.jpg', alt: 'MVCON Day 2 Highlight 14', size: 'large' },
  { id: 115, src: '/images/gallery/others/15.jpg', alt: 'MVCON Day 2 Highlight 15', size: 'small' },
  { id: 116, src: '/images/gallery/others/16.jpg', alt: 'MVCON Day 2 Highlight 16', size: 'medium' },
  { id: 117, src: '/images/gallery/others/17.jpg', alt: 'MVCON Day 2 Highlight 17', size: 'small' },
  { id: 118, src: '/images/gallery/others/18.jpg', alt: 'MVCON Day 2 Highlight 18', size: 'small' },
  { id: 119, src: '/images/gallery/others/19.jpg', alt: 'MVCON Day 2 Highlight 19', size: 'small' },
  { id: 120, src: '/images/gallery/others/20.jpg', alt: 'MVCON Day 2 Highlight 20', size: 'medium' },
  { id: 121, src: '/images/gallery/others/21.jpg', alt: 'MVCON Day 2 Highlight 21', size: 'small' },
  { id: 122, src: '/images/gallery/others/22.jpg', alt: 'MVCON Day 2 Highlight 22', size: 'small' },
  { id: 123, src: '/images/gallery/others/23.jpg', alt: 'MVCON Day 2 Highlight 23', size: 'medium' },
  { id: 124, src: '/images/gallery/others/24.jpg', alt: 'MVCON Day 2 Highlight 24', size: 'small' },
  { id: 125, src: '/images/gallery/others/25.jpg', alt: 'MVCON Day 2 Highlight 25', size: 'medium' },
  { id: 126, src: '/images/gallery/others/26.jpg', alt: 'MVCON Day 2 Highlight 26', size: 'small' },
  { id: 127, src: '/images/gallery/others/27.jpg', alt: 'MVCON Day 2 Highlight 27', size: 'small' },
  { id: 128, src: '/images/gallery/others/28.jpg', alt: 'MVCON Day 2 Highlight 28', size: 'medium' },
  { id: 129, src: '/images/gallery/others/29.jpg', alt: 'MVCON Day 2 Highlight 29', size: 'medium' },
  { id: 130, src: '/images/gallery/others/30.jpg', alt: 'MVCON Day 2 Highlight 30', size: 'small' },
  { id: 131, src: '/images/gallery/others/31.jpg', alt: 'MVCON Day 2 Highlight 31', size: 'small' },
  { id: 132, src: '/images/gallery/others/32.jpg', alt: 'MVCON Day 2 Highlight 32', size: 'small' },
  { id: 133, src: '/images/gallery/others/33.jpg', alt: 'MVCON Day 2 Highlight 33', size: 'small' },
  { id: 134, src: '/images/gallery/others/34.jpg', alt: 'MVCON Day 2 Highlight 34', size: 'medium' },
  { id: 135, src: '/images/gallery/others/35.jpg', alt: 'MVCON Day 2 Highlight 35', size: 'small' },
  { id: 136, src: '/images/gallery/others/36.jpg', alt: 'MVCON Day 2 Highlight 36', size: 'large' },
  { id: 137, src: '/images/gallery/others/37.jpg', alt: 'MVCON Day 2 Highlight 37', size: 'small' },
  { id: 138, src: '/images/gallery/others/38.jpg', alt: 'MVCON Day 2 Highlight 38', size: 'small' },
  { id: 139, src: '/images/gallery/others/39.jpg', alt: 'MVCON Day 2 Highlight 39', size: 'small' },
  { id: 140, src: '/images/gallery/others/40.jpg', alt: 'MVCON Day 2 Highlight 40', size: 'large' },
  { id: 141, src: '/images/gallery/others/41.jpg', alt: 'MVCON Day 2 Highlight 41', size: 'large' },
  { id: 142, src: '/images/gallery/others/42.jpg', alt: 'MVCON Day 2 Highlight 42', size: 'small' },
  { id: 143, src: '/images/gallery/others/43.jpg', alt: 'MVCON Day 2 Highlight 43', size: 'small' },
  { id: 144, src: '/images/gallery/others/44.jpg', alt: 'MVCON Day 2 Highlight 44', size: 'small' },
  { id: 145, src: '/images/gallery/others/45.jpg', alt: 'MVCON Day 2 Highlight 45', size: 'small' },
  { id: 146, src: '/images/gallery/others/46.jpg', alt: 'MVCON Day 2 Highlight 46', size: 'medium' },
  { id: 147, src: '/images/gallery/others/47.jpg', alt: 'MVCON Day 2 Highlight 47', size: 'small' },
  { id: 148, src: '/images/gallery/others/48.jpg', alt: 'MVCON Day 2 Highlight 48', size: 'small' },
  { id: 149, src: '/images/gallery/others/49.jpg', alt: 'MVCON Day 2 Highlight 49', size: 'medium' },
  { id: 150, src: '/images/gallery/others/50.jpg', alt: 'MVCON Day 2 Highlight 50', size: 'large' },
  { id: 151, src: '/images/gallery/others/51.jpg', alt: 'MVCON Day 2 Highlight 51', size: 'small' },
  { id: 152, src: '/images/gallery/others/52.jpg', alt: 'MVCON Day 2 Highlight 52', size: 'large' },
  { id: 153, src: '/images/gallery/others/53.jpg', alt: 'MVCON Day 2 Highlight 53', size: 'small' },
  { id: 154, src: '/images/gallery/others/54.jpg', alt: 'MVCON Day 2 Highlight 54', size: 'small' },
  { id: 155, src: '/images/gallery/others/55.jpg', alt: 'MVCON Day 2 Highlight 55', size: 'small' },
  { id: 156, src: '/images/gallery/others/56.jpg', alt: 'MVCON Day 2 Highlight 56', size: 'small' },
  { id: 157, src: '/images/gallery/others/57.jpg', alt: 'MVCON Day 2 Highlight 57', size: 'small' },
  { id: 158, src: '/images/gallery/others/58.jpg', alt: 'MVCON Day 2 Highlight 58', size: 'medium' },
  { id: 159, src: '/images/gallery/others/59.jpg', alt: 'MVCON Day 2 Highlight 59', size: 'large' },
  { id: 160, src: '/images/gallery/others/60.jpg', alt: 'MVCON Day 2 Highlight 60', size: 'small' },
  { id: 161, src: '/images/gallery/others/61.jpg', alt: 'MVCON Day 2 Highlight 61', size: 'small' },
  { id: 162, src: '/images/gallery/others/62.jpg', alt: 'MVCON Day 2 Highlight 62', size: 'small' },
  { id: 163, src: '/images/gallery/others/63.jpg', alt: 'MVCON Day 2 Highlight 63', size: 'small' },
  { id: 164, src: '/images/gallery/others/64.jpg', alt: 'MVCON Day 2 Highlight 64', size: 'large' },
  { id: 165, src: '/images/gallery/others/65.jpg', alt: 'MVCON Day 2 Highlight 65', size: 'small' },
  { id: 166, src: '/images/gallery/others/66.jpg', alt: 'MVCON Day 2 Highlight 66', size: 'small' },
  { id: 167, src: '/images/gallery/others/67.jpg', alt: 'MVCON Day 2 Highlight 67', size: 'small' },
  { id: 168, src: '/images/gallery/others/68.jpg', alt: 'MVCON Day 2 Highlight 68', size: 'small' },
  { id: 169, src: '/images/gallery/others/69.jpg', alt: 'MVCON Day 2 Highlight 69', size: 'small' },
  { id: 170, src: '/images/gallery/others/70.jpg', alt: 'MVCON Day 2 Highlight 70', size: 'small' },
  { id: 171, src: '/images/gallery/others/71.jpg', alt: 'MVCON Day 2 Highlight 71', size: 'large' },
  { id: 172, src: '/images/gallery/others/72.jpg', alt: 'MVCON Day 2 Highlight 72', size: 'small' },
  { id: 173, src: '/images/gallery/others/73.jpg', alt: 'MVCON Day 2 Highlight 73', size: 'small' },
  { id: 174, src: '/images/gallery/others/74.jpg', alt: 'MVCON Day 2 Highlight 74', size: 'small' },
  { id: 175, src: '/images/gallery/others/75.jpg', alt: 'MVCON Day 2 Highlight 75', size: 'small' },
  { id: 176, src: '/images/gallery/others/76.jpg', alt: 'MVCON Day 2 Highlight 76', size: 'small' },
  { id: 177, src: '/images/gallery/others/77.jpg', alt: 'MVCON Day 2 Highlight 77', size: 'small' },
  { id: 178, src: '/images/gallery/others/78.jpg', alt: 'MVCON Day 2 Highlight 78', size: 'small' },
  { id: 179, src: '/images/gallery/others/79.jpg', alt: 'MVCON Day 2 Highlight 79', size: 'small' },
  { id: 180, src: '/images/gallery/others/80.jpg', alt: 'MVCON Day 2 Highlight 80', size: 'small' },
  { id: 181, src: '/images/gallery/others/81.jpg', alt: 'MVCON Day 2 Highlight 81', size: 'small' },
  { id: 182, src: '/images/gallery/others/82.jpg', alt: 'MVCON Day 2 Highlight 82', size: 'small' },
  { id: 183, src: '/images/gallery/others/83.jpg', alt: 'MVCON Day 2 Highlight 83', size: 'small' },
  { id: 184, src: '/images/gallery/others/84.jpg', alt: 'MVCON Day 2 Highlight 84', size: 'small' },
  { id: 185, src: '/images/gallery/others/85.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/86.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/87.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/88.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/89.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/90.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/91.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/92.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 185, src: '/images/gallery/others/93.jpg', alt: 'MVCON Day 2 Highlight 85', size: 'small' },
  { id: 186, src: '/images/gallery/others/94.jpg', alt: 'MVCON Day 2 Highlight 86', size: 'large' },
  { id: 187, src: '/images/gallery/others/95.jpg', alt: 'MVCON Day 2 Highlight 87', size: 'small' },
  { id: 188, src: '/images/gallery/others/96.jpg', alt: 'MVCON Day 2 Highlight 88', size: 'small' },
  { id: 189, src: '/images/gallery/others/97.jpg', alt: 'MVCON Day 2 Highlight 89', size: 'small' },
  { id: 190, src: '/images/gallery/others/98.jpg', alt: 'MVCON Day 2 Highlight 90', size: 'small' },
  { id: 191, src: '/images/gallery/others/99.jpg', alt: 'MVCON Day 2 Highlight 91', size: 'small' },
  { id: 192, src: '/images/gallery/others/100.jpg', alt: 'MVCON Day 2 Highlight 92', size: 'small' },
  { id: 193, src: '/images/gallery/others/101.jpg', alt: 'MVCON Day 2 Highlight 93', size: 'small' },
  { id: 194, src: '/images/gallery/others/102.jpg', alt: 'MVCON Day 2 Highlight 94', size: 'small' },
  { id: 195, src: '/images/gallery/others/103.jpg', alt: 'MVCON Day 2 Highlight 95', size: 'small' },
  { id: 196, src: '/images/gallery/others/104.jpg', alt: 'MVCON Day 2 Highlight 96', size: 'large' },
  { id: 197, src: '/images/gallery/others/105.jpg', alt: 'MVCON Day 2 Highlight 97', size: 'small' },
  { id: 198, src: '/images/gallery/others/106.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 198, src: '/images/gallery/others/107.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 198, src: '/images/gallery/others/108.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 199, src: '/images/gallery/others/109.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 200, src: '/images/gallery/others/110.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 201, src: '/images/gallery/others/111.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'large' },
  { id: 202, src: '/images/gallery/others/112.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 203, src: '/images/gallery/others/113.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 204, src: '/images/gallery/others/114.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 205, src: '/images/gallery/others/115.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 206, src: '/images/gallery/others/116.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 207, src: '/images/gallery/others/117.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 208, src: '/images/gallery/others/118.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 209, src: '/images/gallery/others/119.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 210, src: '/images/gallery/others/120.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 211, src: '/images/gallery/others/121.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 212, src: '/images/gallery/others/122.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 213, src: '/images/gallery/others/123.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/124.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/125.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/126.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/127.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/128.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/130.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/131.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/132.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/133.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/134.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/135.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/136.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
  { id: 214, src: '/images/gallery/others/137.jpg', alt: 'MVCON Day 2 Highlight 98', size: 'small' },
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

      {/* Gallery Section with Tabs */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-8 md:p-12">
          <GalleryTabs day1Images={day1Images} day2Images={day2Images} />
        </div>
      </section>
    </main>
  );
}
