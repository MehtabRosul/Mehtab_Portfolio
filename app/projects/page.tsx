import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ProjectsContent } from '@/components/projects/projects-content'

export const metadata = {
  title: 'Mehtab Rosul',
  description: 'Explore my portfolio of AI/ML projects, web applications, games, and more',
}

export default function ProjectsPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <ProjectsContent />
      </main>
    </>
  )
}

