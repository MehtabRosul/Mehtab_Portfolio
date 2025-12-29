'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface TopographicBackgroundProps {
  proficiency: number
  colorScheme: string[]
  isActive?: boolean
  position?: { x: number; y: number }
}

export function TopographicBackground({
  proficiency,
  colorScheme,
  isActive = false,
  position,
}: TopographicBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [paths, setPaths] = useState<string[]>([])
  
  // Generate contour paths based on proficiency (elevation)
  useEffect(() => {
    const elevation = proficiency / 100 // 0-1 scale
    const numContours = 5
    const contours: string[] = []
    
    for (let i = 0; i < numContours; i++) {
      const level = (i + 1) / numContours
      if (level <= elevation) {
        // Generate organic, flowing contour path
        const path = generateContourPath(level, elevation, i)
        contours.push(path)
      }
    }
    
    setPaths(contours)
  }, [proficiency])

  if (!position) return null

  return (
    <div 
      className="absolute overflow-hidden pointer-events-none opacity-30"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '50%',
        height: '40%',
        willChange: isActive ? 'transform, opacity' : 'auto',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`gradient-${proficiency}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorScheme[0]} stopOpacity="0.4" />
            <stop offset="50%" stopColor={colorScheme[1]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colorScheme[0]} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {paths.map((path, index) => {
          const opacity = 0.3 - (index * 0.05)
          const strokeWidth = 1.5 - (index * 0.2)
          
          return (
            <motion.path
              key={index}
              d={path}
              fill="none"
              stroke={`url(#gradient-${proficiency})`}
              strokeWidth={strokeWidth}
              opacity={opacity}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isActive
                  ? {
                      pathLength: 1,
                      opacity: opacity,
                      d: path, // Allow morphing
                    }
                  : {
                      pathLength: 0.8,
                      opacity: opacity * 0.5,
                    }
              }
              transition={{
                pathLength: { duration: 2, ease: 'easeInOut' },
                opacity: { duration: 0.5 },
                d: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Generate organic, flowing contour path
function generateContourPath(level: number, maxElevation: number, index: number): string {
  const width = 400
  const height = 300
  const points: { x: number; y: number }[] = []
  const numPoints = 20
  
  // Base Y position based on level (higher level = higher on screen)
  const baseY = height * (1 - level * 0.6)
  
  for (let i = 0; i <= numPoints; i++) {
    const x = (i / numPoints) * width
    // Add organic variation with sine waves
    const variation = Math.sin((i / numPoints) * Math.PI * 4 + index) * 15
    const wave = Math.sin((i / numPoints) * Math.PI * 2) * 10
    const y = baseY + variation + wave + (index * 5)
    
    points.push({ x, y })
  }
  
  // Create smooth bezier curve path
  let path = `M ${points[0].x} ${points[0].y}`
  
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const next = points[i + 1] || curr
    
    const cp1x = prev.x + (curr.x - prev.x) / 2
    const cp1y = prev.y
    const cp2x = curr.x - (next.x - curr.x) / 2
    const cp2y = curr.y
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
  }
  
  return path
}

