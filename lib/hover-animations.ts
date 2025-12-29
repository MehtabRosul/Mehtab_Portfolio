'use client'

import { gsap } from 'gsap'

// 3D tilt effect
export function apply3DTilt(element: HTMLElement) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    gsap.to(element, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Magnetic effect with debouncing
export function applyMagneticEffect(element: HTMLElement, strength = 0.3) {
  let rafId: number | null = null
  let lastX = 0
  let lastY = 0

  const handleMouseMove = (e: MouseEvent) => {
    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)

      // Only update if movement is significant (performance optimization)
      if (Math.abs(x - lastX) > 1 || Math.abs(y - lastY) > 1) {
        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out',
        })
        lastX = x
        lastY = y
      }

      rafId = null
    })
  }

  const handleMouseLeave = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
    lastX = 0
    lastY = 0
  }

  element.addEventListener('mousemove', handleMouseMove, { passive: true })
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Glow pulse on hover
export function applyGlowPulse(element: HTMLElement, color = '#00f0ff') {
  const handleMouseEnter = () => {
    gsap.to(element, {
      boxShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      boxShadow: 'none',
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Shine effect
export function applyShineEffect(element: HTMLElement) {
  const shine = document.createElement('div')
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
    pointer-events: none;
  `
  element.style.position = 'relative'
  element.style.overflow = 'hidden'
  element.appendChild(shine)

  const handleMouseEnter = () => {
    shine.style.left = '100%'
  }

  const handleMouseLeave = () => {
    shine.style.left = '-100%'
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    shine.remove()
  }
}

// Ripple effect
export function applyRippleEffect(element: HTMLElement, color = '#00f0ff') {
  const handleClick = (e: MouseEvent) => {
    const ripple = document.createElement('div')
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: ${color};
      opacity: 0.5;
      transform: scale(0);
      pointer-events: none;
    `

    element.style.position = 'relative'
    element.style.overflow = 'hidden'
    element.appendChild(ripple)

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    })
  }

  element.addEventListener('click', handleClick)

  return () => {
    element.removeEventListener('click', handleClick)
  }
}

// Float animation
export function applyFloatAnimation(element: HTMLElement) {
  gsap.to(element, {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  })
}

// Glitch effect
export function applyGlitchEffect(element: HTMLElement) {
  const handleMouseEnter = () => {
    const timeline = gsap.timeline({ repeat: 2 })
    
    timeline
      .to(element, {
        x: -2,
        duration: 0.05,
      })
      .to(element, {
        x: 2,
        duration: 0.05,
      })
      .to(element, {
        x: 0,
        duration: 0.05,
      })
  }

  element.addEventListener('mouseenter', handleMouseEnter)

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
  }
}

