'use client'

import React, { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  // Primary immediate cursor and a lagging ring follower for a refined feel
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const followerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const visibleRef = useRef(false)
  const hoveringRef = useRef(false)

  useEffect(() => {
    let fx = -9999
    let fy = -9999

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      visibleRef.current = true

      // detect if the target or any ancestor is a cursor-interactive element
      const interactive = (e.target as Element)?.closest?.('.cursor-interactive')
      hoveringRef.current = !!interactive
    }

    const onOut = () => {
      visibleRef.current = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onOut)

    const animate = () => {
      // follower lags behind the real cursor for a smooth trailing ring
      const tx = pos.x
      const ty = pos.y
      fx += (tx - fx) * 0.12
      fy += (ty - fy) * 0.12
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${fx - 50}px, ${fy - 50}px, 0)`
        followerRef.current.style.opacity = visibleRef.current ? (hoveringRef.current ? '0.95' : '0.7') : '0'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pos.x, pos.y])

  // Position styles applied to primary dot via inline style to minimize reflows
  const primaryStyle: React.CSSProperties = {
    left: pos.x,
    top: pos.y,
    transform: 'translate(-50%, -50%)',
  }

  return (
    <>
      {/* Lagging ring follower */}
      <div
        ref={followerRef}
        aria-hidden
        className="fixed pointer-events-none z-[9998] w-[100px] h-[100px] rounded-full border border-cyber-blue/30"
        style={{
          transform: 'translate3d(-9999px, -9999px, 0)',
          transition: 'opacity 180ms linear, transform 120ms linear',
          mixBlendMode: 'screen',
          boxShadow: '0 12px 40px rgba(8, 12, 20, 0.6)',
        }}
      />

      {/* Immediate small dot */}
      <div
        aria-hidden
        className="fixed pointer-events-none z-[9999]"
        style={{
          position: 'fixed',
          left: primaryStyle.left,
          top: primaryStyle.top,
          transform: primaryStyle.transform,
          transition: 'width 120ms ease, height 120ms ease, transform 80ms linear',
        }}
      >
        <div
          className="rounded-full bg-cyber-green"
          style={{
            width: hoveringRef.current ? 22 : 7,
            height: hoveringRef.current ? 22 : 7,
            boxShadow: hoveringRef.current
              ? '0 0 18px rgba(139,92,246,0.18), 0 0 26px rgba(0,240,255,0.12)'
              : '0 0 8px rgba(0,240,255,0.12)'
          }}
        />
      </div>
    </>
  )
}
