import { NextResponse } from 'next/server'

const simulations = [
  {
    id: 1,
    title: 'Quantum Particle Simulation',
    category: 'Quantum',
    description: 'Interactive visualization of quantum particle behavior',
  },
  {
    id: 2,
    title: 'Neural Network Visualization',
    category: 'AI/ML',
    description: 'Real-time neural network training visualization',
  },
  {
    id: 3,
    title: 'Physics Engine Demo',
    category: 'Physics',
    description: 'Advanced physics simulation with multiple bodies',
  },
]

export async function GET() {
  return NextResponse.json(simulations)
}

