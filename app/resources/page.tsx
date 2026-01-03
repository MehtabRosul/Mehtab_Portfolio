import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ResourcesContent } from '@/components/resources/resources-content'

export const metadata = {
  title: 'Research & Publications | Mehtab Rosul',
  description: 'Explore research papers, articles, and case studies on AI/ML, Brain-Computer Interfaces, Cybersecurity, Sustainability, and more by Mehtab Aftabur Rosul',
  keywords: ['AI research', 'ML papers', 'BCI', 'Brain-Computer Interface', 'Cybersecurity', 'ResearchGate', 'Publications', 'Case Studies', 'LLM', 'Agentic AI'],
  openGraph: {
    title: 'Research & Publications | Mehtab Rosul',
    description: 'Explore cutting-edge research in AI/ML, BCI, Cybersecurity, and emerging technologies',
    type: 'website',
  },
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

