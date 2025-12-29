export interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  year: number
  abstract: string
  researchGateUrl: string
  citationCount?: number
  category: 'AI/ML' | 'Cybersecurity' | 'Healthcare' | 'Other'
  keywords: string[]
  featured: boolean // For home page display
}

export const researchPapers: ResearchPaper[] = [
  {
    id: 'dialogue-management-ai',
    title: 'Integrating Advanced Dialogue Management, Natural Language Generation and User Personalization in Conversational AI: A Comprehensive Framework',
    authors: ['Mehtab Rosul'], // Verify with ResearchGate
    year: 2024, // Verify with ResearchGate
    abstract: 'This paper presents a comprehensive framework for integrating advanced dialogue management, natural language generation, and user personalization in conversational AI systems. The framework addresses key challenges in creating intelligent, context-aware conversational interfaces that can adapt to individual user preferences and maintain coherent multi-turn dialogues. Through the integration of state-of-the-art techniques in dialogue management, natural language processing, and machine learning, we propose a unified approach that enhances user experience and system performance. The framework demonstrates significant improvements in dialogue coherence, personalization accuracy, and user satisfaction metrics across various application domains.', // Extract from ResearchGate
    researchGateUrl: 'https://www.researchgate.net/publication/386341974_Integrating_Advanced_Dialogue_Management_Natural_Language_Generation_and_User_Personalization_in_Conversational_AI_A_Comprehensive_Framework',
    citationCount: 0, // Update if available
    category: 'AI/ML',
    keywords: ['Conversational AI', 'Dialogue Management', 'Natural Language Generation', 'User Personalization', 'Machine Learning'],
    featured: true,
  },
  {
    id: 'cybersecurity-threat-detection',
    title: 'Enhancing Cybersecurity through a Comprehensive Intelligent Framework: An Advanced Scalable Real-Time Threat Detection System',
    authors: ['Mehtab Rosul'], // Verify with ResearchGate
    year: 2024, // Verify with ResearchGate
    abstract: 'This research introduces an advanced, scalable real-time threat detection system designed to enhance cybersecurity through a comprehensive intelligent framework. The system leverages cutting-edge machine learning algorithms and artificial intelligence techniques to identify, analyze, and respond to security threats in real-time. By integrating multiple detection mechanisms, including anomaly detection, behavioral analysis, and pattern recognition, the framework provides robust protection against evolving cyber threats. The proposed system demonstrates high accuracy in threat identification, minimal false positive rates, and the ability to scale effectively across diverse network environments. Experimental results validate the system\'s effectiveness in detecting both known and novel security threats with improved response times and reduced computational overhead.', // Extract from ResearchGate
    researchGateUrl: 'https://www.researchgate.net/publication/386335978_Enhancing_Cybersecurity_through_a_Comprehensive_Intelligent_Framework_An_Advanced_Scalable_Real-Time_Threat_Detection_System',
    citationCount: 0, // Update if available
    category: 'Cybersecurity',
    keywords: ['Cybersecurity', 'Threat Detection', 'Machine Learning', 'Real-Time Systems', 'Network Security'],
    featured: true,
  },
  {
    id: 'bci-paralysis-mobility',
    title: 'Artificial Intelligence-Driven BCI for Restoring Mobility in Individuals with Paralysis',
    authors: ['Mehtab Rosul'], // Verify with ResearchGate
    year: 2024, // Verify with ResearchGate
    abstract: 'This paper explores the application of artificial intelligence-driven brain-computer interface (BCI) systems for restoring mobility in individuals with paralysis. The research presents a novel approach that combines advanced AI algorithms with BCI technology to enable motor function restoration through neural signal interpretation and control. The system utilizes deep learning models to decode neural patterns and translate them into motor commands, facilitating movement in paralyzed individuals. Through comprehensive experimental validation, the framework demonstrates significant improvements in mobility restoration, user control accuracy, and system responsiveness. The research contributes to the growing field of neurorehabilitation and offers promising solutions for enhancing quality of life in individuals with motor impairments.', // Extract from ResearchGate
    researchGateUrl: 'https://www.researchgate.net/publication/398124177_Artificial_Intelligence-Driven_BCI_for_Restoring_Mobility_in_Individuals_with_Paralysis',
    citationCount: 0, // Update if available
    category: 'Healthcare',
    keywords: ['Brain-Computer Interface', 'Artificial Intelligence', 'Neurorehabilitation', 'Mobility Restoration', 'Neural Signal Processing'],
    featured: false,
  },
]

// Helper functions
export function getFeaturedPapers(): ResearchPaper[] {
  return researchPapers.filter(paper => paper.featured)
}

export function getPapersByCategory(category: ResearchPaper['category']): ResearchPaper[] {
  return researchPapers.filter(paper => paper.category === category)
}

export function getPapersByYear(year: number): ResearchPaper[] {
  return researchPapers.filter(paper => paper.year === year)
}

export function searchPapers(query: string): ResearchPaper[] {
  const lowerQuery = query.toLowerCase()
  return researchPapers.filter(paper =>
    paper.title.toLowerCase().includes(lowerQuery) ||
    paper.abstract.toLowerCase().includes(lowerQuery) ||
    paper.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
    paper.authors.some(author => author.toLowerCase().includes(lowerQuery))
  )
}

