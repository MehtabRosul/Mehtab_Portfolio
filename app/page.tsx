import { HeroSection } from '@/components/home/hero-section'
import { TechStackSection } from '@/components/home/tech-stack-section'
import { ExpertiseSection } from '@/components/home/expertise-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { SkillsMatrix } from '@/components/home/skills-matrix'
import { ResearchPapersSection } from '@/components/home/research-papers-section'
import { ArticlesSection } from '@/components/home/articles-section'
import { GalleryBanner } from '@/components/home/gallery-banner'
import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'

export default function Home() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative overflow-x-hidden">
        <HeroSection />
        <TechStackSection />
        <ExpertiseSection />
        <FeaturedProjects />
        <SkillsMatrix />
        <ResearchPapersSection />
        <ArticlesSection />
        <GalleryBanner />
      </main>
    </>
  )
}
