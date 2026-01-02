'use client'

import { useEffect, useRef } from 'react'

interface AboutParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  opacity: number
  baseOpacity: number
  color: string
  pulseSpeed: number
  pulsePhase: number
}

export function AboutParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: AboutParticle[] = []
    const particleCount = window.innerWidth < 768 ? 30 : 50

    

    // Gradient colors matching the deep blue to reddish-purple theme
    const colors = [
      'rgba(59, 130, 246, 0.4)', // Deep blue
      'rgba(99, 102, 241, 0.35)', // Indigo
      'rgba(139, 92, 246, 0.4)', // Purple
      'rgba(168, 85, 247, 0.35)', // Light purple
      'rgba(192, 38, 211, 0.3)', // Magenta
      'rgba(236, 72, 153, 0.35)', // Pink
    ]

    // Nebula blobs (large, soft gradients) to add a distinct 'cosmic' backdrop
    const nebulas: Array<{ x: number; y: number; radius: number; color: string; speed: number; phase: number }> = []
    const nebulaCount = Math.max(2, Math.floor(window.innerWidth / 1000))
    for (let i = 0; i < nebulaCount; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 240 + 180,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: (Math.random() - 0.5) * 0.002,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Orbiters - small points that orbit invisible centers to add a unique motion
    const orbitCenters: Array<{ x: number; y: number; angle: number; radius: number; speed: number }> = []
    const orbitCount = 6
    for (let i = 0; i < orbitCount; i++) {
      orbitCenters.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 60 + 40,
        speed: (Math.random() * 0.6 + 0.2) * (Math.random() > 0.5 ? 1 : -1) * 0.02,
      })
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create floating orb particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        baseRadius: Math.random() * 3 + 2,
        radius: 0,
        baseOpacity: Math.random() * 0.3 + 0.2,
        opacity: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
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

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      particles.forEach((particle) => {
        // Pulsing animation
        particle.pulsePhase += particle.pulseSpeed
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 1
        particle.radius = particle.baseRadius * pulse
        particle.opacity = particle.baseOpacity * (0.7 + pulse * 0.3)

        // Gentle floating motion
        particle.vx += Math.sin(time + particle.x * 0.01) * 0.005
        particle.vy += Math.cos(time + particle.y * 0.01) * 0.005

        // Mouse interaction - particles gently move away from cursor
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 0.03
          particle.vy -= Math.sin(angle) * force * 0.03
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < -particle.radius) {
          particle.x = canvas.width + particle.radius
        } else if (particle.x > canvas.width + particle.radius) {
          particle.x = -particle.radius
        }
        if (particle.y < -particle.radius) {
          particle.y = canvas.height + particle.radius
        } else if (particle.y > canvas.height + particle.radius) {
          particle.y = -particle.radius
        }

        // Damping for smooth motion
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Limit velocity
        const maxVel = 1.2
        const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (vel > maxVel) {
          particle.vx = (particle.vx / vel) * maxVel
          particle.vy = (particle.vy / vel) * maxVel
        }

        // Draw particle with gradient glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 2.5
        )
        const colorWithOpacity = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`)
        gradient.addColorStop(0, colorWithOpacity)
        gradient.addColorStop(0.5, colorWithOpacity.replace(/[\d.]+\)$/, `${particle.opacity * 0.5})`))
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = colorWithOpacity
        ctx.shadowBlur = 20
        ctx.shadowColor = colorWithOpacity
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Nebula blobs layer (soft, moving gradients)
      nebulas.forEach((n) => {
        n.phase += n.speed
        const nx = n.x + Math.sin(time + n.phase) * 30
        const ny = n.y + Math.cos(time + n.phase) * 20

        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius)
        const solid = n.color.replace(/rgba?\(([^)]+)\)/, (_m, inner) => `rgba(${inner.split(',').slice(0,3).join(',')},`)
        g.addColorStop(0, `${solid}0.22)`)
        g.addColorStop(0.4, `${solid}0.12)`)
        g.addColorStop(1, 'transparent')
        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(nx, ny, n.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
      })

      // Orbiters layer (small dots orbiting centers)
      orbitCenters.forEach((c, ci) => {
        c.angle += c.speed
        const ox = c.x + Math.cos(c.angle) * c.radius
        const oy = c.y + Math.sin(c.angle) * c.radius
        const orbColor = colors[ci % colors.length].replace(/\)$/, ',0.95)')
        ctx.beginPath()
        ctx.arc(ox, oy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = orbColor
        ctx.shadowBlur = 12
        ctx.shadowColor = orbColor
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw subtle connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.1
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              other.x,
              other.y
            )
            const particleColor = particle.color.replace(/[\d.]+\)$/, `${opacity})`)
            const otherColor = other.color.replace(/[\d.]+\)$/, `${opacity})`)
            gradient.addColorStop(0, particleColor)
            gradient.addColorStop(1, otherColor)

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

