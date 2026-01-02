import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { AboutContent } from '@/components/about/about-content'


export const metadata = {
  title: 'Mehtab Rosul',
  description: 'Learn about Mehtab Aftabur Rosul - AI/ML Engineer, LLM Specialist, and Quantum Computing Enthusiast',
}

export default function AboutPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <div className="absolute inset-0 -z-10">
          {/* Particles removed */}
        </div>
        {/* Content Layer */}
        <div className="relative z-10">
          <AboutContent />
        </div>
      </main>
    </>
  )
}

