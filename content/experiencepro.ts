// content/experiencepro.ts
export type Experience = {
  slug: string
  role: string
  company: string
  period: string          // ex: "2024 – Présent"
  location?: string
  description?: string
  achievements?: string[] // puces
  tech?: string[]         // tags techno
  link?: string           // lien (portfolio / entreprise / article)
  logo?: string
}

const experiences: Experience[] = [
  {
    slug: 'de-rg',
    role: '[STAGE] Digital Process Engineer',
    company: 'Renault Group',
    period: '2025',
    location: 'Guyancourt, FR',
    description: '6 mois',
    achievements: [
      "Analyse des processus métiers afin d’identifier les opportunités d’amélioration et de digitalisation.",
      "Cadrage d’un projet de transformation numérique transversal et interconnecté : conduite d’interviews utilisateurs, animation de workshops, formalisation de cas d’usage, coordination vers une vision commune.",
      "Élaboration de roadmaps projet en lien avec les parties prenantes.",
      "Montée en compétences sur les méthodes agiles (Kanban, Scrum et Safe) à travers la participation à un projet en production et un projet en développement.",
      "Définition d’indicateurs de performance, analyse des données associées et contrôle de leur fiabilité."
    ],
    tech: ['Python', 'FastAPI', 'MLflow', 'GCP', 'BigQuery'],
    logo: '/logo_entreprise/renault_logo.png'
  },
  {
    slug: 'ml-intern-y',
    role: 'Stagiaire ML',
    company: 'Entreprise Y',
    period: '2023',
    location: 'Lyon, FR',
    description: 'R&D NLP pour la classification de documents.',
    achievements: [
      "Conception de tableaux de bord et d’outils de pilotage pour le suivi des indicateurs clés.",
      "Automatisation de tâches récurrentes et développement de pipelines de données en Python pour optimiser les processus internes.",
      "Intégration de données multi-sources dans un Data Lake afin de permettre des analyses approfondies et centralisées.",
      "Développement d’interfaces graphiques sous PowerApps, avec une attention particulière portée à la sécurité et à la fiabilité des données manipulées.",
    ],
    tech: ['PyTorch', 'Transformers', 'DVC'],
    logo: '/logo_entreprise/renault_logo.png'
  },
  {
    slug: 'bi-analyst-z',
    role: 'Data/BI Analyst',
    company: 'Groupe Z',
    period: '2022 – 2023',
    description: 'Tableaux de bord décisionnels et analyse ad hoc.',
    achievements: [
      "Pilotage du management du changement lors de l’introduction du cloud au sein des équipes métiers.",
      "Support informatique et formation des utilisateurs sur les outils internes.",
      "Administration des réseaux, gestion du parc informatique et sécurité des systèmes.",
    ],
    tech: ['SQL', 'dbt', 'Power BI'],
    logo: '/logo_entreprise/PomonaD&C_logo.png'
  },
]

export default experiences
