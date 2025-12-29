'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

export function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([])
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code]
      setSequence(newSequence.slice(-KONAMI_CODE.length))

      if (newSequence.length >= KONAMI_CODE.length) {
        const lastSequence = newSequence.slice(-KONAMI_CODE.length)
        if (lastSequence.every((key, index) => key === KONAMI_CODE[index])) {
          setActivated(true)
          setSequence([])
          setTimeout(() => setActivated(false), 5000)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sequence])

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl font-bold text-cyber-blue cyber-glow mb-4"
            >
              ⚡
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-cyber-purple cyber-glow"
            >
              Quantum Mode Activated!
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

