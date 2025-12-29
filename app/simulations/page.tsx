import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { SimulationsContent } from '@/components/simulations/simulations-content'

export const metadata = {
  title: 'Simulations | Mehtab Aftabur Rosul',
  description: 'Interactive simulations and computational models',
}

export default function SimulationsPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <SimulationsContent />
      </main>
    </>
  )
}

