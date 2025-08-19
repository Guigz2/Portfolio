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
    slug: 'dp-intern-rg',
    role: '[STAGE] Digital Process Engineer',
    company: 'Renault Group - Procurement',
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
    slug: 'do-intern-rg',
    role: '[STAGE] Ingénieur développement d’outils digitaux',
    company: 'Renault Group - Industrial Strategy',
    period: '2024',
    location: 'Guyancourt, FR',
    description: '4 mois',
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
    slug: 'cl-intern-p',
    role: '[STAGE] Coordinateur déploiement cloud & Support IT',
    company: 'Groupe Pomona',
    period: '2023',
    description: '3 mois',
    location: 'Chanteloup-les-Vignes, FR',
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
