'use client'

import { useEffect, useRef } from 'react'

interface WaveParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  angle: number
  speed: number
  color: string
}

export function WaveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: WaveParticle[] = []
    const particleCount = window.innerWidth < 768 ? 40 : 60

    // Color palette matching cyber theme
    const colors = [
      'rgba(0, 240, 255, 0.6)', // cyber-blue
      'rgba(139, 92, 246, 0.5)', // cyber-purple
      'rgba(0, 255, 136, 0.5)',  // cyber-green
      'rgba(236, 72, 153, 0.4)',  // magenta
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles with wave-like properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      particles.forEach((particle) => {
        // Wave motion - particles move in sine wave patterns
        particle.angle += particle.speed
        const waveX = Math.sin(particle.angle) * 2
        const waveY = Math.cos(particle.angle * 0.7) * 2

        // Update velocity with wave motion
        particle.vx += waveX * 0.01
        particle.vy += waveY * 0.01

        // Mouse interaction - particles flow away from cursor (fluid-like)
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          const angle = Math.atan2(dy, dx)
          // Flow away from cursor
          particle.vx -= Math.cos(angle) * force * 0.05
          particle.vy -= Math.sin(angle) * force * 0.05
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) {
          particle.x = canvas.width
        } else if (particle.x > canvas.width) {
          particle.x = 0
        }
        if (particle.y < 0) {
          particle.y = canvas.height
        } else if (particle.y > canvas.height) {
          particle.y = 0
        }

        // Damping for smooth motion
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Limit velocity
        const maxVel = 1.5
        const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (vel > maxVel) {
          particle.vx = (particle.vx / vel) * maxVel
          particle.vy = (particle.vy / vel) * maxVel
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(0.5, particle.color.replace('0.6', '0.3').replace('0.5', '0.2').replace('0.4', '0.15'))
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw fluid connections between nearby particles (subtle)
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Connect particles within range for fluid effect
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              other.x,
              other.y
            )
            gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${opacity})`))
            gradient.addColorStop(1, other.color.replace(/[\d.]+\)$/, `${opacity})`))

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

