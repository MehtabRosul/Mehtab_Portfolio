"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

type Item = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  link?: string
}

const SAMPLE_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Machine Learning Certificate',
    issuer: 'Coursera / Stanford',
    date: '2023-09',
    description: 'Completed advanced ML specialization with applied projects in CV and NLP.',
    link: '#',
  },
  {
    id: '2',
    title: 'IEEE Emerging Tech Award',
    issuer: 'IEEE',
    date: '2024-06',
    description: 'Recognized for contributions to simulation tools and reproducible research.',
    link: '#',
  },
  {
    id: '3',
    title: 'Outstanding Research Fellowship',
    issuer: 'University Research Council',
    date: '2022-11',
    description: 'Awarded for interdisciplinary research excellence and open-source tooling.',
    link: '#',
  },
]

const AVATAR_LIST = [
  'IMG_9778.PNG',
  'IMG_9781.PNG',
  'IMG_9783.PNG',
  'IMG_9784.PNG',
  'IMG_9787.PNG',
  'IMG_9788.PNG',
  'IMG_9789.PNG',
  'IMG_9792.PNG',
  'IMG_9793.PNG',
  'IMG_9795.PNG',
  'IMG_9796.PNG',
]

export function GalleryContent() {
  const [items] = useState<Item[]>(SAMPLE_ITEMS)
  const [active, setActive] = useState<Item | null>(null)

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">My Gallery</h1>
        <p className="mt-4 text-lg text-gray-300">A curated collection of professional achievements — certificates, awards and recognitions. Click any card to view details.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <article
            key={it.id}
            className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[linear-gradient(180deg,#ffffff06,transparent)] p-6 shadow-md transition-all duration-400 hover:scale-[1.016] hover:shadow-2xl"
          >
            {/* animated gradient accent */}
            <div className="absolute -inset-0.5 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-80">
              <div className="h-full w-full animate-gradient-move bg-[linear-gradient(90deg,rgba(0,240,255,0.06),rgba(139,92,246,0.06),rgba(255,122,182,0.04))]" />
            </div>

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img src={`/avatars/${AVATAR_LIST[idx % AVATAR_LIST.length]}`} alt="issuer avatar" className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[--accent]">{it.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{it.issuer} · {it.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white">✓</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-300 line-clamp-3">{it.description}</p>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-400">Verified</div>
              <div>
                <Button variant="outline" size="sm" onClick={() => setActive(it)} className="group-hover:brightness-110">Details</Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <style jsx global>{`
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-move { background-size: 300% 300%; animation: gradientMove 6s ease-in-out infinite; }
        :root { --accent: #00f0ff; }
      `}</style>

      {/* Modal for details */}
      {active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setActive(null)} />
          <div className="relative z-10 max-w-2xl rounded-2xl bg-[#071018] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-semibold text-white">{active.title}</h4>
                <p className="mt-1 text-sm text-gray-400">{active.issuer} · {active.date}</p>
              </div>
              <button aria-label="Close" onClick={() => setActive(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="mt-4 text-sm text-gray-300">{active.description}</div>

            <div className="mt-6 flex items-center gap-3">
              {active.link && (
                <a href={active.link} target="_blank" rel="noreferrer" className="inline-block">
                  <Button variant="neon">Open Certificate</Button>
                </a>
              )}
              <Button variant="glass" onClick={() => setActive(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
