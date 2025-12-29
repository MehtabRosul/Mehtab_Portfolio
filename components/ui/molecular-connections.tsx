'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

interface Connection {
  from: { x: number; y: number; id: string }
  to: { x: number; y: number; id: string }
  color: string
  strength: number
}

interface MolecularConnectionsProps {
  connections: Connection[]
  isVisible?: boolean
  activeConnection?: string | null
}

interface AnimatedLine {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  opacity: number
  delay: number
  duration: number
  path: { x: number; y: number }[]
}

export function MolecularConnections({
  connections,
  isVisible = true,
  activeConnection = null,
}: MolecularConnectionsProps) {
  const [animatedLines, setAnimatedLines] = useState<AnimatedLine[]>([])

  // Random lines removed - no particles or dazzling effects

  // Combine connection lines with random lines
  useEffect(() => {
    if (isVisible) {
      const allLines: AnimatedLine[] = []
      
      // Add connection lines
      connections.forEach((conn, index) => {
        const distance = Math.sqrt(
          Math.pow(conn.to.x - conn.from.x, 2) + Math.pow(conn.to.y - conn.from.y, 2)
        )
        
        // Create curved path for connection
        const midX = (conn.from.x + conn.to.x) / 2 + (Math.random() - 0.5) * 5
        const midY = (conn.from.y + conn.to.y) / 2 + (Math.random() - 0.5) * 5
        
        const path: { x: number; y: number }[] = []
        const steps = 30
        for (let j = 0; j <= steps; j++) {
          const t = j / steps
          const x = (1 - t) * (1 - t) * conn.from.x + 2 * (1 - t) * t * midX + t * t * conn.to.x
          const y = (1 - t) * (1 - t) * conn.from.y + 2 * (1 - t) * t * midY + t * t * conn.to.y
          path.push({ x, y })
        }
        
        allLines.push({
          id: `conn-${conn.from.id}-${conn.to.id}`,
          x1: conn.from.x,
          y1: conn.from.y,
          x2: conn.to.x,
          y2: conn.to.y,
          color: conn.color,
          opacity: 0.2,
          delay: index * 0.2,
          duration: 3,
          path,
        })
      })
      
      // Random lines removed
      
      setAnimatedLines(allLines)
    } else {
      setAnimatedLines([])
    }
  }, [connections, isVisible])

  return (
    <svg
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 0 }} // Behind cards
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {animatedLines.map((line) => {
        const isActive = activeConnection && line.id.includes(activeConnection.split('-')[0])
        const pathD = line.path
          .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x}% ${point.y}%`)
          .join(' ')
        
        return (
          <motion.g key={line.id}>
            {/* Animated path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={line.color}
              strokeWidth={isActive ? 2 : 1}
              opacity={isActive ? 0.6 : line.opacity}
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [
                  line.opacity * 0.3,
                  line.opacity,
                  line.opacity,
                  line.opacity * 0.3,
                ],
              }}
              transition={{
                pathLength: {
                  duration: line.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: line.delay,
                },
                opacity: {
                  duration: line.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: line.delay,
                },
              }}
            />
            
          </motion.g>
        )
      })}
    </svg>
  )
}
