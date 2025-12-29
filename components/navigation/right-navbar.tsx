'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap,
  UserCircle2,
  Briefcase,
  BookOpen,
  Image,
  Terminal,
  Gamepad2,
  Send,
  FileText,
  Newspaper
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { id: 'home', label: 'Home', icon: Zap, href: '/' },
  { id: 'about', label: 'About Me', icon: UserCircle2, href: '/about' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '/projects' },
  { id: 'research', label: 'Research', icon: FileText, href: '/research-papers' },
  { id: 'articles', label: 'Articles', icon: Newspaper, href: '/articles' },
  { id: 'resources', label: 'Certificates', icon: BookOpen, href: '/resources' },
  { id: 'gallery', label: 'Gallery', icon: Image, href: '/gallery' },
  { id: 'simulations', label: 'Simulations', icon: Terminal, href: '/simulations' },
  { id: 'games', label: 'Game', icon: Gamepad2, href: '/games' },
  { id: 'contact', label: 'Contact Me', icon: Send, href: '/contact' },
]

export function RightNavbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Find the most specific navigation item that matches the current URL path.
    // This ensures that nested routes correctly highlight their parent section.
    let bestMatch = 'home';
    let maxMatchLength = 0;

    for (const item of navItems) {
      if (pathname.startsWith(item.href)) {
        if (item.href.length > maxMatchLength) {
          maxMatchLength = item.href.length;
          bestMatch = item.id;
        }
      }
    }

    // Handle the exact home page case separately to ensure it has priority.
    if (pathname === '/') {
      bestMatch = 'home';
    }

    setActiveSection(bestMatch);
  }, [pathname]);

  const containerVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.5, rotate: -180 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15, delay: i * 0.05 },
    }),
  }

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <motion.div
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative overflow-visible"
      >
        <motion.div className="glass-strong rounded-full p-2 backdrop-blur-xl border border-cyber-blue/30 relative overflow-visible">
          <div className="flex flex-col gap-2.5 relative z-10 overflow-visible">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-visible group"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
                      'hover:bg-cyber-blue/20',
                      isActive && 'bg-cyber-blue/30 scale-108'
                    )}
                    aria-label={item.label}
                  >
                    <Icon 
                      className={cn(
                        'w-[18px] h-[18px] transition-all duration-300 relative z-10',
                        isActive ? 'text-cyber-blue' : 'text-foreground/60 group-hover:text-cyber-blue'
                      )} 
                    />
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute -left-1 w-1 h-4 bg-cyber-blue rounded-full"
                      />
                    )}
                  </Link>
                  <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-rotate-[5deg] transition-all duration-200">
                    <div className="h-[1px] w-0 group-hover:w-2.5 bg-cyber-blue mr-2 transition-all duration-200" />
                    <div className="px-3 py-1.5 rounded border border-cyber-blue/30 bg-black/95 backdrop-blur-sm whitespace-nowrap">
                      <span className="text-xs font-medium text-cyber-blue uppercase tracking-normal">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </nav>
  )
}
