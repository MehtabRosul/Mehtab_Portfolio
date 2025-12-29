import { RightNavbar } from '@/components/navigation/right-navbar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ProjectDetail } from '@/components/projects/project-detail'
import { notFound } from 'next/navigation'

// Project data - in a real app, this would come from a database or API
const projects = [
  {
    id: 1,
    slug: 'ml-prediction-system',
    title: 'ML Prediction System',
    category: 'AI/ML',
    description: 'Advanced machine learning system for predictive analytics with high accuracy and real-time processing capabilities',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    image: '/images/project1.jpg',
    link: '#',
    github: '#',
    featured: true,
    avatar: '/avatars/IMG_9787.PNG',
    colorScheme: ['#00f0ff', '#0066ff', '#4c00ff'],
    metrics: {
      accuracy: 95,
      users: 10000,
      performance: 98,
    },
    longDescription: 'A sophisticated machine learning system designed for predictive analytics with exceptional accuracy and real-time processing capabilities. This system leverages cutting-edge deep learning algorithms to provide accurate predictions across various domains.',
    features: [
      'Real-time prediction processing with sub-second latency',
      'High accuracy models achieving 95%+ precision',
      'Scalable architecture supporting millions of requests',
      'Interactive dashboard with comprehensive analytics',
      'Automated model retraining pipeline',
      'Multi-format data ingestion support',
    ],
    screenshots: ['/images/project1.jpg'],
    year: 2024,
    status: 'Active',
  },
  {
    id: 2,
    slug: 'bci-ai-ml',
    title: 'BCI with AI-ML',
    category: 'Brain-Computer Interface',
    description: 'Revolutionary brain-computer interface using AI and ML for neural signal processing and interpretation',
    tech: ['Python', 'PyTorch', 'React', 'EEG'],
    image: '/images/project2.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9788.PNG',
    colorScheme: ['#00ff88', '#00d4aa', '#7fffd4'],
    metrics: {
      accuracy: 92,
      users: 5000,
      performance: 94,
    },
    longDescription: 'A cutting-edge brain-computer interface system that leverages AI and machine learning for advanced neural signal processing. This revolutionary system enables direct communication between the human brain and computers.',
    features: [
      'Real-time EEG signal processing',
      'ML-based pattern recognition for neural signals',
      'Interactive visualization of brain activity',
      'Low-latency signal interpretation',
      'Multi-channel EEG support',
      'Customizable signal filtering',
    ],
    screenshots: ['/images/project2.jpg'],
    year: 2024,
    status: 'Active',
  },
  {
    id: 3,
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with modern architecture, seamless payment integration, and exceptional user experience',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: '/images/project3.jpg',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9789.PNG',
    colorScheme: ['#8b5cf6', '#a855f7', '#c084fc'],
    metrics: {
      users: 25000,
      performance: 96,
    },
    longDescription: 'A comprehensive e-commerce platform built with modern web technologies, featuring seamless payment processing and intuitive user interface. This platform handles thousands of transactions daily with high reliability.',
    features: [
      'Secure payment processing with Stripe integration',
      'Real-time inventory management system',
      'Advanced search and filtering capabilities',
      'Responsive design for all devices',
      'Admin dashboard for store management',
      'Order tracking and notification system',
    ],
    screenshots: ['/images/project3.jpg'],
    year: 2023,
    status: 'Completed',
  },
  {
    id: 4,
    slug: 'quantum-computing-simulator',
    title: 'Quantum Computing Simulator',
    category: 'Quantum Computing',
    description: 'Advanced quantum computing simulator with visualization tools and algorithm testing capabilities',
    tech: ['Python', 'Qiskit', 'React', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&auto=format',
    link: '#',
    github: '#',
    featured: false,
    avatar: '/avatars/IMG_9792.PNG',
    colorScheme: ['#ec4899', '#f472b6', '#f9a8d4'],
    metrics: {
      accuracy: 99,
      users: 3000,
      performance: 97,
    },
    longDescription: 'An innovative quantum computing simulator that enables researchers and developers to test quantum algorithms with high fidelity. This simulator provides a comprehensive environment for quantum computing research and education.',
    features: [
      'Quantum circuit visualization with WebGL',
      'Algorithm testing framework',
      'High-performance simulation engine',
      'Interactive quantum gates library',
      'Real-time state vector visualization',
      'Export capabilities for research papers',
    ],
    screenshots: ['/images/project4.jpg'],
    year: 2024,
    status: 'Active',
  },
]

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <RightNavbar />
      <MobileNav />
      <main className="relative min-h-screen pt-20">
        <ProjectDetail project={project} relatedProjects={projects.filter((p) => p.id !== project.id).slice(0, 3)} />
      </main>
    </>
  )
}