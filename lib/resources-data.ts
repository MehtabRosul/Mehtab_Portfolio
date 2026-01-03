// Resources Data - Research Papers, Articles, and Case Studies
// Each resource is mapped to a unique avatar from public/avatars

export type ResourceType = 'research-paper' | 'article' | 'case-study'

export type ResourceCategory =
    | 'AI/ML'
    | 'BCI'
    | 'Cybersecurity'
    | 'Sustainability'
    | 'Edge Computing'
    | 'Governance'
    | 'Digital Twins'
    | 'Human-AI Collaboration'
    | 'LLM & Agentic AI'
    | 'Product Engineering'

export interface BaseResource {
    id: string
    type: ResourceType
    title: string
    category: ResourceCategory
    avatar: string // Path to avatar image from public/avatars
    url: string // ResearchGate URL
    tags: string[]
}

export interface ResearchPaper extends BaseResource {
    type: 'research-paper'
    authors: string[]
    year: number
    journal?: string
    abstract: string
    citations?: number
    doi?: string
    pdfUrl?: string
    readTime?: string
}

export interface Article extends BaseResource {
    type: 'article'
    publishedDate: string
    readTime: string
    summary: string
}

export interface CaseStudy extends BaseResource {
    type: 'case-study'
    organization?: string
    year: number
    description: string
    techStack: string[]
    outcomes: string[]
}

export type Resource = ResearchPaper | Article | CaseStudy

// ============================================================================
// RESEARCH PAPERS (3 Papers)
// ============================================================================

export const researchPapers: ResearchPaper[] = [
    {
        id: 'rp-001',
        type: 'research-paper',
        title: 'Integrating Advanced Dialogue Management, Natural Language Generation, and User Personalization in Conversational AI: A Comprehensive Framework',
        authors: ['Mehtab Aftabur Rosul'],
        year: 2024,
        category: 'AI/ML',
        abstract: 'This research presents a comprehensive framework for developing sophisticated conversational AI systems by integrating advanced dialogue management, natural language generation, and user personalization techniques. The proposed framework addresses key challenges in creating contextually aware, personalized, and engaging conversational experiences through novel approaches to dialogue state tracking, response generation, and adaptive user modeling.',
        tags: ['Conversational AI', 'NLG', 'Dialogue Management', 'Personalization', 'NLP'],
        avatar: '/avatars/IMG_9787.PNG',
        url: 'https://www.researchgate.net/publication/386341974_Integrating_Advanced_Dialogue_Management_Natural_Language_Generation_and_User_Personalization_in_Conversational_AI_A_Comprehensive_Framework',
        readTime: '15 min',
        citations: 0,
    },
    {
        id: 'rp-002',
        type: 'research-paper',
        title: 'Enhancing Cybersecurity through a Comprehensive Intelligent Framework: An Advanced Scalable Real-Time Threat Detection System',
        authors: ['Mehtab Aftabur Rosul'],
        year: 2024,
        category: 'Cybersecurity',
        abstract: 'This paper introduces an advanced, scalable, real-time threat detection system designed to enhance cybersecurity through a comprehensive intelligent framework. The proposed system leverages machine learning, deep learning, and behavioral analytics to identify and mitigate sophisticated cyber threats with high accuracy and minimal latency, suitable for enterprise-scale deployment.',
        tags: ['Cybersecurity', 'Threat Detection', 'Machine Learning', 'Real-time Systems', 'Security Analytics'],
        avatar: '/avatars/IMG_9788.PNG',
        url: 'https://www.researchgate.net/publication/386335978_Enhancing_Cybersecurity_through_a_Comprehensive_Intelligent_Framework_An_Advanced_Scalable_Real-Time_Threat_Detection_System',
        readTime: '18 min',
        citations: 0,
    },
    {
        id: 'rp-003',
        type: 'research-paper',
        title: 'Artificial Intelligence-Driven BCI for Restoring Mobility in Individuals with Paralysis',
        authors: ['Mehtab Aftabur Rosul'],
        year: 2025,
        category: 'BCI',
        abstract: 'This groundbreaking research explores the development and implementation of artificial intelligence-driven brain-computer interfaces (BCIs) specifically designed to restore mobility and motor function in individuals with paralysis. The study presents novel signal processing algorithms, real-time neural decoding methods, and adaptive control systems that enable precise translation of neural signals into actionable commands for assistive devices and prosthetics.',
        tags: ['Brain-Computer Interface', 'AI', 'Neural Engineering', 'Assistive Technology', 'Motor Restoration'],
        avatar: '/avatars/IMG_9789.PNG',
        url: 'https://www.researchgate.net/publication/398124177_Artificial_Intelligence-Driven_BCI_for_Restoring_Mobility_in_Individuals_with_Paralysis',
        readTime: '20 min',
        citations: 0,
    }
]

// ============================================================================
// CASE STUDIES (1 Study)
// ============================================================================

export const caseStudies: CaseStudy[] = [
    {
        id: 'carbon-coin',
        type: 'case-study',
        title: 'Carbon Coin - A Product Engineering Case Study',
        category: 'Product Engineering',
        avatar: '/avatars/IMG_9788.PNG',
        url: 'https://www.researchgate.net/publication/387542175_Carbon_Coin_-_A_Product_Engineering_Case_Study',
        tags: ['Blockchain', 'Smart Contracts', 'Product Engineering', 'Sustainability', 'DevOps'],
        organization: 'EncryptArx (ECX)',
        year: 2025,
        description: 'An in-depth product engineering case study examining the design, development, and implementation of Carbon Coin is an innovative implementation of carbon credit trading and environmental sustainability. This study explores the technical architecture, user experience design, smart contract development, and scalability challenges encountered during the product lifecycle. Developed at EncryptArx (ECX) with focus on product engineering, research, and DevOps practices.',
        techStack: ['Blockchain', 'Solidity', 'Smart Contracts', 'TypeScript', 'React', 'Web3.js'],
        outcomes: [
            'Developed scalable blockchain architecture for carbon credit tokenization',
            'Implemented secure smart contracts with comprehensive audit protocols',
            'Created intuitive UX for carbon trading marketplace',
            'Achieved 99.9% transaction reliability with low gas fees',
        ],
    }
]

// ============================================================================
// ARTICLES (8 Articles)
// ============================================================================

export const articles: Article[] = [
    {
        id: 'art-001',
        type: 'article',
        title: 'Human-AI Collaborative Creativity: Co-Creation Frameworks, Practical Shareable and Product-Ready Methods for Creators',
        category: 'Human-AI Collaboration',
        publishedDate: '2025',
        readTime: '12 min',
        summary: 'This article explores practical frameworks and methodologies for human-AI collaborative creativity, offering creators actionable strategies to leverage AI tools while maintaining creative control. Covers co-creation patterns, prompt engineering best practices, and real-world case studies of successful human-AI creative partnerships.',
        tags: ['Generative AI', 'Creative Tools', 'Human-AI Collaboration', 'Product Design', 'Best Practices'],
        avatar: '/avatars/IMG_9793.PNG',
        url: 'https://www.researchgate.net/publication/399156063_Human-AI_Collaborative_Creativity_Co-Creation_Frameworks_Practical_Shareable_and_Product-Ready_Methods_for_Creators',
    },
    {
        id: 'art-002',
        type: 'article',
        title: 'Agentic Responsible LLMs: Deployable, Auditable, User-Safe Agents',
        category: 'LLM & Agentic AI',
        publishedDate: '2025',
        readTime: '14 min',
        summary: 'A comprehensive guide to building responsible, deployable LLM agents with built-in safety mechanisms, auditability features, and user protection protocols. Discusses architecture patterns for production-grade agentic systems, monitoring strategies, and ethical considerations in autonomous AI deployment.',
        tags: ['LLM', 'AI Safety', 'Agentic AI', 'Responsible AI', 'Production Systems'],
        avatar: '/avatars/IMG_9795.PNG',
        url: 'https://www.researchgate.net/publication/399401186_Agentic_Responsible_LLMs_Deployable_Auditable_User-Safe_Agents',
    },
    {
        id: 'art-003',
        type: 'article',
        title: 'Sustainability & Green AI: Energy-Efficient Models, Sustainable Data Centers, Practical Roadmap',
        category: 'Sustainability',
        publishedDate: '2025',
        readTime: '10 min',
        summary: 'This article provides a practical roadmap for implementing sustainable AI practices, from model optimization techniques that reduce energy consumption to designing eco-friendly data center infrastructure. Includes benchmarking methodologies, carbon footprint calculation tools, and industry best practices for green AI development.',
        tags: ['Green AI', 'Sustainability', 'Energy Efficiency', 'Data Centers', 'Environmental Impact'],
        avatar: '/avatars/IMG_9796.PNG',
        url: 'https://www.researchgate.net/publication/398123802_Sustainability_Green_AI_Energy-Efficient_Models_Sustainable_Data_Centers_Practical_Roadmap',
    },
    {
        id: 'art-004',
        type: 'article',
        title: 'AI Safety & Governance Policy: Practical Audits, Forensics, Regulation-Ready Tools',
        category: 'Governance',
        publishedDate: '2025',
        readTime: '16 min',
        summary: 'An essential guide for AI practitioners and policymakers on implementing comprehensive safety and governance frameworks. Covers audit methodologies, forensic analysis techniques for AI systems, compliance tooling, and strategies for aligning AI development with emerging regulatory requirements.',
        tags: ['AI Governance', 'Policy', 'AI Safety', 'Compliance', 'Auditing'],
        avatar: '/avatars/IMG_9778.PNG',
        url: 'https://www.researchgate.net/publication/399401366_AI_Safety_Governance_Policy_Practical_Audits_Forensics_Regulation-Ready_Tools',
    },
    {
        id: 'art-005',
        type: 'article',
        title: 'Edge LLMs for Wearables and Smartwatch OS: Explainable, Product-Forward, Privacy-First, On-Device AI',
        category: 'Edge Computing',
        publishedDate: '2025',
        readTime: '11 min',
        summary: 'This article explores the challenges and solutions for deploying large language models on resource-constrained edge devices such as wearables and smartwatches. Discusses model compression techniques, on-device inference optimization, privacy-preserving architectures, and real-world implementation strategies for edge AI applications.',
        tags: ['Edge AI', 'LLM', 'Wearables', 'Privacy', 'On-Device ML'],
        avatar: '/avatars/IMG_9781.PNG',
        url: 'https://www.researchgate.net/publication/399156132_Edge_LLMs_for_Wearables_and_Smartwatch_OS_Explainable_product-forward_privacy-first_on-device_AI',
    },
    {
        id: 'art-006',
        type: 'article',
        title: 'Governance-Ready Data Sharing Infrastructure: Policy-Safe Marketplaces Powered by Privacy-Tech and Verifiable Contracts',
        category: 'Governance',
        publishedDate: '2025',
        readTime: '13 min',
        summary: 'A deep dive into building data sharing infrastructure that meets modern governance requirements through privacy-enhancing technologies, verifiable smart contracts, and policy-compliant marketplace designs. Covers technical implementations of differential privacy, federated learning, and blockchain-based data provenance systems.',
        tags: ['Data Governance', 'Privacy Tech', 'Smart Contracts', 'Data Sharing', 'Compliance'],
        avatar: '/avatars/IMG_9783.PNG',
        url: 'https://www.researchgate.net/publication/399155884_Governance-Ready_Data_Sharing_Infrastructure_Policy-Safe_Marketplaces_Powered_by_Privacy-Tech_and_Verifiable_Contracts',
    },
    {
        id: 'art-007',
        type: 'article',
        title: 'Cross-cutting Past, Present, Future Review Ideas: Historical Surveys with Future Roadmaps',
        category: 'AI/ML',
        publishedDate: '2025',
        readTime: '18 min',
        summary: 'A comprehensive long-form review that traces the evolution of AI/ML from historical foundations to current state-of-the-art, while projecting future research directions and technological trajectories. This meta-analysis synthesizes decades of research to provide actionable insights for researchers and practitioners.',
        tags: ['AI History', 'Future of AI', 'Research Review', 'Technology Roadmap', 'Meta-Analysis'],
        avatar: '/avatars/IMG_9784.PNG',
        url: 'https://www.researchgate.net/publication/399156071_Cross-cutting_Past_Present_Future_Review_Ideas_Historical_Surveys_with_Future_Roadmaps_-_A_Long-Form_Review_to_Attract_Citations_and_Shares',
    },
    {
        id: 'art-008',
        type: 'article',
        title: 'Digital Twins & Real-Time Control for Resilient Cities & Personalized Medicine: A Comprehensive Multidisciplinary Forward-Looking Scientific Review',
        category: 'Digital Twins',
        publishedDate: '2025',
        readTime: '22 min',
        summary: 'An extensive multidisciplinary review exploring the convergence of digital twin technology, real-time control systems, and their applications in building resilient smart cities and enabling personalized medicine. Examines IoT integration, simulation frameworks, predictive analytics, and the future of cyber-physical systems in critical infrastructure and healthcare.',
        tags: ['Digital Twins', 'Smart Cities', 'Healthcare', 'IoT', 'Cyber-Physical Systems'],
        avatar: '/avatars/IMG_9787.PNG',
        url: 'https://www.researchgate.net/publication/398423745_Digital_Twins_Real-Time_Control_for_Resilient_Cities_Personalized_Medicine_A_Comprehensive_Multidisciplinary_Forward-Looking_Scientific_Review',
    }
]

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

export const allResources: Resource[] = [
    ...researchPapers,
    ...caseStudies,
    ...articles
]

// Get unique categories for filtering
export const categories: ResourceCategory[] = Array.from(
    new Set(allResources.map(r => r.category))
).sort()

// Helper functions
export const getResourcesByType = (type: ResourceType): Resource[] => {
    return allResources.filter(r => r.type === type)
}

export const getResourcesByCategory = (category: ResourceCategory): Resource[] => {
    return allResources.filter(r => r.category === category)
}

export const searchResources = (query: string): Resource[] => {
    const lowerQuery = query.toLowerCase()
    return allResources.filter(resource => {
        const titleMatch = resource.title.toLowerCase().includes(lowerQuery)
        const tagsMatch = resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))

        if (resource.type === 'research-paper') {
            const abstractMatch = resource.abstract.toLowerCase().includes(lowerQuery)
            const authorsMatch = resource.authors.some(author => author.toLowerCase().includes(lowerQuery))
            return titleMatch || tagsMatch || abstractMatch || authorsMatch
        }

        if (resource.type === 'article') {
            const summaryMatch = resource.summary.toLowerCase().includes(lowerQuery)
            return titleMatch || tagsMatch || summaryMatch
        }

        if (resource.type === 'case-study') {
            const descriptionMatch = resource.description.toLowerCase().includes(lowerQuery)
            const techMatch = resource.techStack.some(tech => tech.toLowerCase().includes(lowerQuery))
            return titleMatch || tagsMatch || descriptionMatch || techMatch
        }

        return titleMatch || tagsMatch
    })
}
