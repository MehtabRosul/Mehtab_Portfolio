import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function GalleryBanner() {
  return (
    <div className="relative bg-gray-900/50 py-16 sm:py-24">
      <div className="absolute inset-0 opacity-50">
        {/* You can add a background image here if you want */}
      </div>
      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Explore My Professional Gallery
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Discover a curated collection of my certifications and awards.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
