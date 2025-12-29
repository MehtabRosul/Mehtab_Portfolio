'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'research', label: 'Research', href: '/research-papers' },
  { id: 'resources', label: 'Resources', href: '/resources' },
  { id: 'gallery', label: 'Gallery', href: '/gallery' },
  { id: 'simulations', label: 'Simulations', href: '/simulations' },
  { id: 'games', label: 'Games', href: '/games' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden glass-strong p-3 rounded-full border border-cyber-blue/30 hover:bg-cyber-blue/20 transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-cyber-blue" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 glass-strong border-l border-cyber-blue/30 z-40 lg:hidden overflow-y-auto"
            >
              <nav className="p-8 pt-20">
                <ul className="space-y-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'block px-4 py-3 rounded-lg transition-all duration-200',
                            'hover:bg-cyber-blue/20 hover:translate-x-2',
                            isActive && 'bg-cyber-blue/30 text-cyber-blue cyber-glow'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

