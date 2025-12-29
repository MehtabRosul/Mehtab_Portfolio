import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Extract plain text from a ReactNode-like value for simple content inspection
export function extractText(node: any): string {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(n => extractText(n)).join(' ')
  if (typeof node === 'object' && 'props' in node) {
    return extractText(node.props.children)
  }
  return ''
}

export function isQuantumContent(node: any): boolean {
  const text = extractText(node).toLowerCase()
  return text.includes('quantum')
}

// Deterministic golden palette selector based on a key
const GOLD_PALETTES: Array<{ border: string; bg: string; glow: string; text: string }> = [
  { border: '#D4AF37', bg: 'rgba(212,175,55,0.06)', glow: '#D4AF37', text: '#D4AF37' },
  { border: '#C99700', bg: 'rgba(201,151,0,0.06)', glow: '#C99700', text: '#C99700' },
  { border: '#E6C17A', bg: 'rgba(230,193,122,0.06)', glow: '#E6C17A', text: '#E6C17A' },
  { border: '#B8860B', bg: 'rgba(184,134,11,0.06)', glow: '#B8860B', text: '#B8860B' },
  { border: '#FFD700', bg: 'rgba(255,215,0,0.06)', glow: '#FFD700', text: '#FFD700' },
]

function hashStringToIndex(s: string, mod = GOLD_PALETTES.length) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % mod
}

export function getGoldPaletteFor(key: string | undefined | null) {
  const k = (key || 'quantum').toString()
  return GOLD_PALETTES[hashStringToIndex(k)]
}

