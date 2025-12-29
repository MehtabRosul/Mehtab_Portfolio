import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ResourcesContent } from '@/components/resources/resources-content'

export const metadata = {
  title: 'Resources | Mehtab Aftabur Rosul',
  description: 'Research papers, articles, and case studies by Mehtab Aftabur Rosul',
}

export default function ResourcesPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <ResourcesContent />
      </main>
    </>
  )
}

