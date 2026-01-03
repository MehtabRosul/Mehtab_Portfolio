
export type CertificateType = 'Certification' | 'Internship' | 'Award' | 'Offer Letter';

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string; // Inferred or placeholder
    type: CertificateType;
    description: string;
    skills: string[];
    credentialId?: string;
    verified: boolean;
    color?: string; // For accent colors
}

export const CERTIFICATES_DATA: Certificate[] = [
    {
        id: 'nvidia-cert',
        title: 'NVIDIA Deep Learning',
        issuer: 'NVIDIA',
        date: '2023',
        type: 'Certification',
        description: 'Hardware-accelerated deep learning and neural network architecture optimization.',
        skills: ['CUDA', 'Deep Learning', 'GPU Computing'],
        verified: true,
        color: '#76b900' // Nvidia Green
    },
    {
        id: 'stanford-dl',
        title: 'Deep Learning Specialization',
        issuer: 'Stanford Online',
        date: '2023',
        type: 'Certification',
        description: 'Comprehensive study of deep learning foundations, CNNs, RNNs, and Transformers.',
        skills: ['Neural Networks', 'TensorFlow', 'Python'],
        verified: true,
        color: '#8c1515' // Stanford Cardinal
    },
    {
        id: 'ibm-cert',
        title: 'Professional Data Science',
        issuer: 'IBM',
        date: '2023',
        type: 'Certification',
        description: 'Professional data science methodology, tools, and real-world application.',
        skills: ['Data Science', 'Python', 'SQL'],
        verified: true,
        color: '#052FAD' // IBM Blue
    },
    {
        id: 'kodacy-intern',
        title: 'Web Development Internship',
        issuer: 'Kodacy',
        date: '2023',
        type: 'Internship',
        description: 'Full-stack web development internship focusing on modern React architectures.',
        skills: ['React', 'Web Development', 'Frontend'],
        verified: true,
        color: '#ff4d4d'
    },
    {
        id: 'oasis-intern-cert',
        title: 'Data Science Internship',
        issuer: 'Oasis Infobyte',
        date: '2023',
        type: 'Internship',
        description: 'Intensive internship involving data analysis, visualization, and predictive modeling tasks.',
        skills: ['Data Analysis', 'Pandas', 'Scikit-learn'],
        verified: true,
        color: '#2ecc71'
    },
    {
        id: 'vieh-intern',
        title: 'Cyber Security Internship',
        issuer: 'VIEH Group',
        date: '2023',
        type: 'Internship',
        description: 'Practical experience in vulnerability assessment and ethical hacking capabilities.',
        skills: ['Cyber Security', 'Network Security', 'Ethical Hacking'],
        verified: true,
        color: '#9b59b6'
    },
    {
        id: 'oasis-letter',
        title: 'Internship Offer Letter',
        issuer: 'Oasis Infobyte',
        date: '2023',
        type: 'Offer Letter',
        description: 'Official offer letter for Data Science Internship role.',
        skills: ['Career', 'Documentation'],
        verified: true,
        color: '#34495e'
    },
    {
        id: 'prodigy-letter',
        title: 'Internship Offer Letter',
        issuer: 'Prodigy InfoTech',
        date: '2023',
        type: 'Offer Letter',
        description: 'Official production engineering and development offer.',
        skills: ['Career', 'Software Development'],
        verified: true,
        color: '#34495e'
    },
    {
        id: 'ml-cert',
        title: 'Machine Learning Mastery',
        issuer: 'Online Platform',
        date: '2023',
        type: 'Certification',
        description: 'Advanced machine learning algorithms and model deployment strategies.',
        skills: ['Machine Learning', 'Algorithms', 'Model Deployment'],
        verified: true,
        color: '#f39c12'
    },
    {
        id: 'ai-cert',
        title: 'Artificial Intelligence Professional',
        issuer: 'Tech Certification',
        date: '2023',
        type: 'Certification',
        description: 'Foundational and advanced AI concepts including search algorithms and logic.',
        skills: ['Artificial Intelligence', 'Logic', 'Problem Solving'],
        verified: true,
        color: '#00cec9'
    },
    {
        id: 'llm-cert',
        title: 'Large Language Models',
        issuer: 'Advanced AI Course',
        date: '2024',
        type: 'Certification',
        description: 'Specialized training in LLM architecture, fine-tuning, and prompt engineering.',
        skills: ['LLMs', 'Transformers', 'NLP'],
        verified: true,
        color: '#6c5ce7'
    },
    {
        id: 'devfest',
        title: 'DevFest 2022 Attendee',
        issuer: 'Google Developer Groups',
        date: '2022',
        type: 'Award',
        description: 'Participation in local developer festival, networking and workshops.',
        skills: ['Networking', 'Community', 'Learning'],
        verified: true,
        color: '#4285F4'
    }
];
