import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ContactContent } from '@/components/contact/contact-content'

export const metadata = {
  title: 'Contact | Mehtab Aftabur Rosul',
  description: 'Get in touch with Mehtab Aftabur Rosul',
}

export default function ContactPage() {
  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <ContactContent />
      </main>
    </>
  )
}

