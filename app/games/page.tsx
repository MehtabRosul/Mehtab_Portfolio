import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { GamesContent } from '@/components/games/games-content'

export const metadata = {
  title: 'Mehtab Rosul',
  description: 'Playable 2D games built with Python',
}

export default function GamesPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <GamesContent />
      </main>
    </>
  )
}

