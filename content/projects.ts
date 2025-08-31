export type Project = {
  slug: string
  title: string
  role: string
  year?: number
  tags?: string[]
  image: string
  gallery?: string[]
  summary?: string
  client?: string
  link?: string
  repo?: string
  notebookHtml?: string 
}

const projects: Project[] = [
  {
    slug: 'projet-sncf-eda',
    title: 'Analyse exploratoire des données de la SNCF',
    role: 'EDA & Data Viz',
    year: 2025,
    tags: ['Python', 'Pandas', 'Plotly', 'Numpy', 'matplotlib','Seaborn','Sklearn'],
    image: '/images/logo_SNCF.png',
    summary: "Ce projet se concentre sur une analyse exploratoire des données (EDA) et une modélisation prédictive simple à partir des données de fréquentation des passagers du réseau Transilien (SNCF). Le jeu de données contient des enregistrements quotidiens du trafic de passagers à travers différentes gares, lignes et plages horaires.L’objectif est de mettre en évidence des schémas temporels clairs et de comprendre ce jeu de données le plus en profondeur possible.",
    client: 'Projet académique',
    repo:"https://github.com/Guigz2/EDA_SNCF",
    notebookHtml: '/notebooks/EDA_SNCF.html',
  },
  {
    slug: 'projet-2',
    title: 'Projet 2',
    role: 'Motion Design',
    year: 2024,
    tags: ['Animation', 'Video'],
    image: '/images/projet2.jpg',
    gallery: ['/images/projet2.jpg'],
    summary: 'Animations vectorielles et micro-interactions.',
    link: '#',
  },
]

export default projects