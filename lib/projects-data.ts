export type ProjectCategory =
    | 'All'
    | 'AI/ML'
    | 'Quantum Computing'
    | 'Game Dev'
    | 'Web Dev'
    | 'Mobile App'
    | 'Cybersecurity'
    | 'Tools & Utility'
    | 'Other'

export interface Project {
    id: string
    title: string
    description: string
    category: ProjectCategory
    tech: string[]
    lastUpdated: string
    featured: boolean
    stars: number
    liveUrl?: string // Optional live project URL
}

// Helper to determine category based on name/description/tech
// This mimics the "tagging" logic we discussed
function inferCategory(title: string, desc: string, tech: string[]): ProjectCategory {
    const t = title.toLowerCase()
    const d = desc.toLowerCase()
    const techStr = tech.join(' ').toLowerCase()

    if (t.includes('quantum') || t.includes('qiskit') || t.includes('circuit') || t.includes('insightcompare')) return 'Quantum Computing'
    if (t.includes('neuro') || t.includes('prediction') || t.includes('detection') || t.includes('classification') || techStr.includes('tensorflow') || techStr.includes('pytorch') || techStr.includes('cnn') || techStr.includes('ml')) return 'AI/ML'
    if (t.includes('game') || t.includes('pong') || t.includes('maze') || t.includes('dodger') || t.includes('tetromino') || t.includes('ball')) return 'Game Dev'
    if (t.includes('weather') || t.includes('quiz') || t.includes('mobile') || techStr.includes('react native') || techStr.includes('android')) return 'Mobile App'
    if (t.includes('portfolio') || t.includes('resolutioneer') || t.includes('coin') || t.includes('ecx') || t.includes('fynixflux') || techStr.includes('next.js') || techStr.includes('react') || techStr.includes('node')) return 'Web Dev'
    if (t.includes('calculator') || t.includes('stopwatch') || t.includes('exchange') || t.includes('config')) return 'Tools & Utility'

    return 'Other'
}

export const projectsData: Project[] = [
    // --- Scraped Repositories ---


    {
        id: 'neuromobilis-frontend',
        title: 'NeuroMobilis Interface',
        description: 'Frontend dashboard for NeuroMobilis, visualizing real-time neural signals and model predictions.',
        tech: ['TypeScript', 'React', 'D3.js'],
        category: 'AI/ML',
        lastUpdated: 'Dec 23, 2025',
        featured: true,
        stars: 0
    },
    {
        id: 'resolutioneer',
        title: 'Resolutioneer',
        description: 'Advanced media processing platform for enhancing resolution and quality using AI upscaling models.',
        tech: ['TypeScript', 'Next.js', 'FFmpeg', 'AI'],
        category: 'Web Dev',
        lastUpdated: 'Nov 26, 2025',
        featured: true,
        stars: 0
    },
    {
        id: 'carbon-coin',
        title: 'Carbon-Coin',
        description: 'Eco-friendly cryptocurrency initiative designed to incentivize carbon footprint reduction.',
        tech: ['TypeScript', 'Blockchain', 'Solidity'],
        category: 'Web Dev',
        lastUpdated: 'Aug 4, 2025',
        featured: false,
        stars: 0
    },
    {
        id: 'circuits-operators-qiskit',
        title: 'Circuits & Operators',
        description: 'Quantum circuit simulations and operator implementations using IBM Qiskit framework.',
        tech: ['Jupyter Notebook', 'Qiskit', 'Python'],
        category: 'Quantum Computing',
        lastUpdated: 'Feb 2, 2025',
        featured: true,
        stars: 1
    },
    {
        id: 'mehtab-rosul-config',
        title: 'System Config',
        description: 'Personalized configuration files and dotfiles for optimizing development workflow.',
        tech: [],
        category: 'Tools & Utility',
        lastUpdated: 'Jan 17, 2025',
        featured: false,
        stars: 0
    },

    {
        id: 'weather-forecasting',
        title: 'WeatherForcasting',
        description: 'PowerShell-based weather forecasting tool fetching real-time data from meteorological APIs.',
        tech: ['PowerShell', 'API'],
        category: 'Tools & Utility',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'object-detection-rosul',
        title: 'ObjectDetection By Rosul',
        description: 'Custom object detection implementation capable of identifying multiple classes in real-time video feeds.',
        tech: ['PowerShell', 'OpenCV', 'Python'],
        category: 'AI/ML',
        lastUpdated: 'Sep 1, 2024',
        featured: true,
        stars: 1
    },
    {
        id: 'tetromino',
        title: 'Tetromino',
        description: 'Classic Tetris-style arcade game clone implemented with custom game loop mechanics.',
        tech: ['Python', 'Pygame'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'space-game',
        title: 'Space-game',
        description: 'Intergalactic space shooter game featuring enemy waves, power-ups, and score tracking.',
        tech: ['Python', 'Pygame'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'pong',
        title: 'Pong',
        description: 'The classic table tennis themed arcade game with single and multiplayer modes.',
        tech: ['Python', 'Pygame'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0,
        liveUrl: 'https://carbon-coin-gamma.vercel.app'
    },
    {
        id: 'maze',
        title: 'Maze',
        description: 'Maze generation and solver algorithms visualized as an interactive game.',
        tech: ['Python', 'Algorithms'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'dynamic-dodger',
        title: 'Dynamic-Dodger',
        description: 'Fast-paced reflex game where players must dodge incoming obstacles with increasing speed.',
        tech: ['Python', 'Pygame'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'catch-falling-balls',
        title: 'Catch the Falling Balls',
        description: 'Casual arcade game testing hand-eye coordination and reaction time.',
        tech: ['Python', 'Pygame'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'bar-ball',
        title: 'Bar-Ball',
        description: 'Physics-based casual game involving balancing mechanics and precise control.',
        tech: ['Python', 'Physics Engine'],
        category: 'Game Dev',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'exchange-rate',
        title: 'ExchangeRate',
        description: 'Currency conversion tool providing up-to-date exchange rates for major global currencies.',
        tech: ['PowerShell', 'Finance API'],
        category: 'Tools & Utility',
        lastUpdated: 'Sep 1, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'image-classification',
        title: 'Image-Classification',
        description: 'Deep learning model for classifying images into categories using Convolutional Neural Networks (CNNs).',
        tech: ['Jupyter Notebook', 'TensorFlow', 'Keras'],
        category: 'AI/ML',
        lastUpdated: 'Mar 26, 2024',
        featured: true,
        stars: 1
    },
    {
        id: 'calculator',
        title: 'Calculator',
        description: 'Full-featured scientific calculator application with GUI.',
        tech: ['Java', 'Swing'],
        category: 'Mobile App',
        lastUpdated: 'Mar 26, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'stopwatch',
        title: 'Stopwatch',
        description: 'Precise timing application with lap functionality and digital display.',
        tech: ['Java', 'Swing'],
        category: 'Mobile App',
        lastUpdated: 'Mar 26, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'my-quiz-app',
        title: 'MyQuizApp',
        description: 'Interactive quiz application with multiple categories, timers, and score tracking.',
        tech: ['Java', 'Swing'],
        category: 'Mobile App', // inferred loosely or change to Desktop app
        lastUpdated: 'Mar 26, 2024',
        featured: false,
        stars: 0
    },
    {
        id: 'employee-turnover',
        title: 'Employee-Turnover',
        description: 'Predictive analytics project to identify factors contributing to employee churn using ML.',
        tech: ['Jupyter Notebook', 'Scikit-learn', 'Pandas'],
        category: 'AI/ML',
        lastUpdated: 'Jul 15, 2023',
        featured: false,
        stars: 0
    },
    {
        id: 'weather-forecast-grad',
        title: 'WeatherForecast (Grad)',
        description: 'Web-based weather dashboard created as a graduation capstone project.',
        tech: ['JavaScript', 'HTML/CSS'],
        category: 'Web Dev',
        lastUpdated: 'Dec 8, 2022',
        featured: false,
        stars: 0
    },

    // --- Missing / Private Repositories (Manually Added) ---
    {
        id: 'ecx',
        title: 'ECX',
        description: 'Enterprise-grade e-commerce exchange platform designed for high-volume transaction processing.',
        tech: ['Next.js', 'Node.js', 'PostgreSQL'],
        category: 'Web Dev',
        lastUpdated: 'Private',
        featured: true,
        stars: 0,
        liveUrl: 'https://encryptarx.in'
    },
    {
        id: 'fynixflux',
        title: 'FynixFlux',
        description: 'Innovative workflow automation tool for streamlining complex business processes.',
        tech: ['React', 'Redux', 'Firebase'],
        category: 'Web Dev',
        lastUpdated: 'Private',
        featured: true,
        stars: 0,
        liveUrl: 'https://fynix-flux.vercel.app'
    },
    {
        id: 'insightcompare',
        title: 'InsightCompare',
        description: 'Quantum-inspired data comparison engine for high-dimensional dataset analysis.',
        tech: ['Python', 'Qiskit', 'React'],
        category: 'AI/ML',
        lastUpdated: 'Private',
        featured: true,
        stars: 0,
        liveUrl: 'https://insightcompare.com'
    }
]
