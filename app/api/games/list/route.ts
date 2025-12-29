import { NextResponse } from 'next/server'

const games = [
  {
    id: 1,
    title: 'Space Invaders',
    description: 'Classic space shooter game with modern twists',
  },
  {
    id: 2,
    title: 'Snake Game',
    description: 'Retro snake game with smooth controls',
  },
  {
    id: 3,
    title: 'Puzzle Solver',
    description: 'Challenging puzzle game with multiple levels',
  },
]

export async function GET() {
  return NextResponse.json(games)
}

