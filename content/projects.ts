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
    slug: 'projet-regression-electrique',
    title: 'Prédiction supervisée de la consommation électrique',
    role: 'Régression & time series',
    year: 2025,
     tags: ['Python', 'Pandas', 'Plotly', 'Numpy', 'matplotlib', 'Seaborn', 'Sklearn'],
     image: '/images/logo_EDF.png',
     summary: "Ce projet porte sur la prédiction supervisée de la consommation électrique à partir de séries temporelles et de données de consommation. L'objectif est d'explorer les schémas de consommation, de réaliser une analyse exploratoire approfondie et de mettre en œuvre des modèles de régression pour anticiper la demande électrique. Le jeu de données comprend des mesures quotidiennes ou horaires, permettant d'étudier les tendances, les variations saisonnières et les facteurs influençant la consommation.",
     repo:"https://github.com/Guigz2/SP_Electrical_consumption",
     notebookHtml: "/notebooks/SP_electrical.html"
  },
  {
    slug: 'projet-regression-churn',
    title: 'Prédiction supervisée de la résiliation client',
    role: 'Classification',
    year: 2025,
    tags: ['WIP'],
    image: '/images/logo_TELCO.jpg',
    summary: 'Work in Progress',
  },
  {
    slug: 'projet-nlp',
    title: 'Détection de spam SMS par traitement du langage naturel (NLP)',
    role: 'NLP',
    year: 2025,
    tags: ['WIP'],
    image: '/images/logo_spam.png',
    summary: 'Work in Progress',
  },
  {
    slug: 'projet-vision',
    title: "Détection d'objets sur des photos de rue",
    role: 'Vison par ordinateur',
    year: 2025,
    tags: ['WIP'],
    image: '/images/logo_detection.png',
    summary: 'Work in Progress',
  },
  {
    slug: 'projet-reco',
    title: 'Système de recommandation musicale',
    role: 'Embeddings & similarité cosinus',
    year: 2025,
    tags: ['WIP'],
    image: '/images/logo_reco.jpg',
    summary: 'Work in Progress',
  },
  {
    slug: 'projet-IA',
    title: 'Génération de mélodies par IA générative',
    role: 'IA générative',
    year: 2025,
    tags: ['WIP'],
    image: '/images/logo_gen.png',
    summary: 'Work in Progress',
  },
]

export default projects