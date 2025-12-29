'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin (safe to call multiple times)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Fade in from bottom
export function useFadeInUp(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [ref, delay])
}

// Fade in from left
export function useFadeInLeft(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [ref, delay])
}

// Fade in from right
export function useFadeInRight(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [ref, delay])
}

// Scale in
export function useScaleIn(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [ref, delay])
}

// Rotate in
export function useRotateIn(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        rotation: -180,
        scale: 0.5,
      },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        delay,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [ref, delay])
}

// Text reveal (split text)
export function useTextReveal(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    const text = ref.current.textContent || ''
    ref.current.innerHTML = text
      .split('')
      .map((char, i) => `<span style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

    const spans = ref.current.querySelectorAll('span')
    
    gsap.fromTo(
      spans,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        delay,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [ref, delay])
}

// Parallax effect
export function useParallax(ref: RefObject<HTMLElement>, speed = 0.5) {
  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [ref, speed])
}

// Stagger children animation
export function useStaggerChildren(
  parentRef: RefObject<HTMLElement>,
  childSelector: string,
  delay = 0
) {
  useEffect(() => {
    if (!parentRef.current || typeof window === 'undefined') return
    
    try {
      const children = parentRef.current.querySelectorAll(childSelector)
      if (children.length === 0) return
      
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    } catch (error) {
      console.warn('Scroll animation error:', error)
    }
  }, [parentRef, childSelector, delay])
}

