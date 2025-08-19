// content/formations.ts
export type Formation = {
  slug: string
  school: string
  degree: string       // ex: "Master Data Science"
  period: string       // ex: "2021 – 2023"
  location?: string
  description?: string
  details?: string[]   // puces
  link?: string
}

const formations: Formation[] = [
  {
    slug: 'master-ds',
    school: 'University of West Scotland',
    degree: 'Master Data Science',
    period: '2024',
    location: 'Glasgow, UK',
    description: "Etudes en anglais sur : Data Mining, Machine Learning, Deep Learning, IA générative et Business Intelligence",
    details: ['ML avancé, MLOps', 'Projet de fin d’études en NLP'],
    link: 'https://www.uws.ac.uk/'
  },
  {
    slug: 'ecole',
    school: 'IMT Nord Europe (école issue de la fusion des Mines de Douai et de Télécom Lille)',
    degree: 'Diplôme d’ingénieur généraliste',
    period: '2022-2025',
    description: "Spécialisation en analyses de données avancées, outils BI, base de données, Machine Learning",
    details: ['Statistiques, proba, optimisation'],
    link: "https://imt-nord-europe.fr/"
  },
  {
    slug: 'cpge',
    school: 'Lycée Jean-Baptiste SAY',
    degree: "Classe Préparatoire aux Grandes Ecoles - Physique Science de l'ingénieur (PSI*)",
    period: '2020-2022',
    details: ['Réseaux de neurones, deployment']
  },
]

export default formations
