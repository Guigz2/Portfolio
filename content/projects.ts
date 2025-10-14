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
     tags: ['Python', 'Pandas', 'Plotly', 'Numpy', 'matplotlib', 'Seaborn', 'Sklearn'],
     image: '/images/logo_TELCO.jpg',
     summary: "Ce projet vise à prédire la résiliation client (churn) à partir de données historiques d'abonnés d'un opérateur télécom. L'objectif est d'identifier les facteurs influençant la résiliation, d'explorer les schémas de comportement et de mettre en œuvre des modèles de classification supervisée pour anticiper le churn. Le jeu de données comprend des informations sur les clients, leur historique d'utilisation et des variables explicatives permettant d'analyser les tendances et d'améliorer la fidélisation.",
     repo:"https://github.com/Guigz2/SP_churn",
     notebookHtml:"/notebooks/SP_Churn.html",
  },
  {
    slug: 'projet-nlp',
    title: 'Détection de spam SMS par traitement du langage naturel (NLP)',
    role: 'NLP',
    year: 2025,
     tags: ['Python', 'Pandas', 'Numpy', 'NLTK', 'Scikit-learn', 'matplotlib', 'Seaborn'],
     image: '/images/logo_spam.png',
     summary: "Ce projet porte sur la détection de messages SMS indésirables (spam) à l'aide de techniques de traitement du langage naturel (NLP). L'objectif est d'explorer les caractéristiques textuelles, de prétraiter les données, d'extraire des features pertinentes et de mettre en œuvre des modèles de classification pour distinguer les spams des messages légitimes. Le jeu de données comprend des SMS annotés, permettant d'analyser les schémas linguistiques et d'améliorer la détection automatique.",
     repo:"https://github.com/Guigz2/NLP-Spam",
     notebookHtml:"/notebooks/NLP_Spam.html"
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