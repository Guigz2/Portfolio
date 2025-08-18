// content/formations.ts
export type Formation = {
  slug: string
  school: string
  degree: string       // ex: "Master Data Science"
  period: string       // ex: "2021 – 2023"
  location?: string
  details?: string[]   // puces
  link?: string
}

const formations: Formation[] = [
  {
    slug: 'master-ds',
    school: 'Université A',
    degree: 'Master Data Science',
    period: '2021 – 2023',
    location: 'Paris, FR',
    details: ['ML avancé, MLOps', 'Projet de fin d’études en NLP'],
    link: 'https://example.com'
  },
  {
    slug: 'licence-maths',
    school: 'Université B',
    degree: 'Licence Mathématiques',
    period: '2018 – 2021',
    details: ['Statistiques, proba, optimisation']
  },
  {
    slug: 'certif-ml',
    school: 'Plateforme C',
    degree: 'Certification Machine Learning',
    period: '2022',
    details: ['Réseaux de neurones, deployment']
  },
]

export default formations
