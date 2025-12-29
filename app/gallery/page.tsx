import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { GalleryContent } from '@/components/gallery/gallery-content'

export const metadata = {
  title: 'Gallery | Mehtab Aftabur Rosul',
  description: 'Certificates, awards, and work samples from Mehtab Aftabur Rosul',
}

export default function GalleryPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <GalleryContent />
      </main>
    </>
  )
}

