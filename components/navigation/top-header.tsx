'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { Cpu, HardDrive, Wifi, Monitor } from 'lucide-react'

export function TopHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [systemMetrics, setSystemMetrics] = useState({
    net: { speed: '1.6', latency: '100' },
    cpu: '8',
    mem: { used: '45', total: '4096' },
    fps: '59',
  })

  // Simulate system metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics({
        net: {
          speed: (Math.random() * 0.5 + 1.4).toFixed(1),
          latency: (Math.random() * 20 + 90).toFixed(0),
        },
        cpu: '8',
        mem: {
          used: (Math.random() * 10 + 40).toFixed(0),
          total: '4096',
        },
        fps: (Math.random() * 2 + 58).toFixed(0),
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.location.reload()
    } else {
      router.push('/')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 relative">
          {/* Left Side - Logo with Mr. Rosul */}
          <motion.button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 md:gap-3 group relative z-10 ml-10 md:ml-12"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Avatar/Logo */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Subtle Glow on Hover */}
              <motion.div
                className="absolute -inset-1 rounded-full bg-cyber-blue/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"
              />

              <Avatar
                src="/avatars/IMG_9796.PNG"
                alt="Mr. Rosul"
                size="sm"
                variant="circle"
                glow={false}
                className="!border-0 relative z-10 transition-opacity duration-200 group-hover:opacity-90"
              />
            </motion.div>

            {/* Mr. Rosul Text */}
            <motion.div
              className="relative"
            >
              {/* Main Button */}
              <div className="relative glass-strong rounded-full px-3 py-1 md:px-3.5 md:py-1.5 border border-cyber-blue/30 group-hover:border-cyber-blue transition-all duration-200 group-hover:bg-cyber-blue/5">
                <span className="text-[10px] md:text-xs font-heading font-semibold text-foreground/90 group-hover:text-cyber-blue transition-colors duration-200 tracking-wide">
                  MR. ROSUL
                </span>
              </div>
            </motion.div>
          </motion.button>

          {/* Center - System Metrics */}
          <div className="hidden md:flex items-center gap-3 md:gap-5 text-xs md:text-sm absolute left-1/2 -translate-x-1/2">
            {/* Network */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-foreground/30 text-[10px]">•</span>
              <span className="text-foreground/80 font-mono tracking-tight">
                Net {systemMetrics.net.speed} Mbps / {systemMetrics.net.latency} ms
              </span>
            </motion.div>

            {/* CPU */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-foreground/30 text-[10px]">•</span>
              <span className="text-foreground/80 font-mono tracking-tight">
                CPU {systemMetrics.cpu} cores
              </span>
            </motion.div>

            {/* Memory */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-foreground/30 text-[10px]">•</span>
              <span className="text-foreground/80 font-mono tracking-tight">
                Mem {systemMetrics.mem.used} / {systemMetrics.mem.total} MB
              </span>
            </motion.div>

            {/* FPS */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-foreground/30 text-[10px]">•</span>
              <span className="text-foreground/80 font-mono tracking-tight">
                FPS {systemMetrics.fps} fps
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
