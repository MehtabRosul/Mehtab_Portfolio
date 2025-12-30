
import { GalleryContent } from '@/components/gallery/gallery-content';

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="relative z-10">
        <GalleryContent />
      </div>
    </div>
  );
}
