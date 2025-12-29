'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap,
  UserCircle2,
  Briefcase,
  BookOpen,
  Image,
  Terminal,
  Gamepad2,
  Send,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { id: 'home', label: 'Home', icon: Zap, href: '/' },
  { id: 'about', label: 'About Me', icon: UserCircle2, href: '/about' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '/projects' },
  { id: 'research', label: 'Research', icon: FileText, href: '/research-papers' },
  { id: 'resources', label: 'Certificates', icon: BookOpen, href: '/resources' },
  { id: 'gallery', label: 'Gallery', icon: Image, href: '/gallery' },
  { id: 'simulations', label: 'Simulations', icon: Terminal, href: '/simulations' },
  { id: 'games', label: 'Game', icon: Gamepad2, href: '/games' },
  { id: 'contact', label: 'Contact Me', icon: Send, href: '/contact' },
]

export function RightNavbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only handle scroll-based section detection on home page
    if (pathname !== '/') {
      return
    }

    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    // Set active section based on pathname
    // Only set based on pathname if not on home page (where scroll takes precedence)
    if (pathname !== '/') {
      // Map pathname to nav item id
      const pathToId: Record<string, string> = {
        '/about': 'about',
        '/projects': 'projects',
        '/research-papers': 'research',
        '/resources': 'resources',
        '/gallery': 'gallery',
        '/simulations': 'simulations',
        '/games': 'games',
        '/contact': 'contact',
      }
      const currentId = pathToId[pathname] || pathname.slice(1).split('/')[0]
      setActiveSection(currentId)
    } else {
      // On home page, start with 'home' but let scroll handler update it
      setActiveSection('home')
    }
  }, [pathname])

  // Container animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      x: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  // Item animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
      scale: 0.5,
      rotate: -180,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: i * 0.05,
      },
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
        {/* Main Container */}
        <motion.div 
          className="glass-strong rounded-full p-2 backdrop-blur-xl border border-cyber-blue/30 relative overflow-visible"
        >

          <div className="flex flex-col gap-2.5 relative z-10 overflow-visible">
            {navItems.map((item, index) => {
              const Icon = item.icon
              // Only use pathname matching on non-home pages, otherwise use scroll-based activeSection
              const isActive = pathname === '/' 
                ? activeSection === item.id 
                : pathname === item.href || pathname.startsWith(item.href + '/')
              
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
                    {/* Icon */}
                    <Icon 
                      className={cn(
                        'w-[18px] h-[18px] transition-all duration-300 relative z-10',
                        isActive 
                          ? 'text-cyber-blue' 
                          : 'text-foreground/60 group-hover:text-cyber-blue'
                      )} 
                    />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        className="absolute -left-1 w-1 h-4 bg-cyber-blue rounded-full"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ 
                          scaleY: 1,
                          opacity: 1,
                        }}
                        transition={{
                          scaleY: { duration: 0.3 },
                          opacity: { duration: 0.3 },
                        }}
                      />
                    )}

                    {/* Hover Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyber-blue/50"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{
                        scale: 1.3,
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                      }}
                    />
                  </Link>
                  
                  {/* Tooltip - positioned on the left side, straight with counter-rotation */}
                  <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-rotate-[5deg] transition-all duration-200">
                    {/* Simple connecting line */}
                    <div className="h-[1px] w-0 group-hover:w-2.5 bg-cyber-blue mr-2 transition-all duration-200" />
                    
                    {/* Simple tooltip */}
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
