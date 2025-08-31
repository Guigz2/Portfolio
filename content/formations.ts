export type Formation = {
  slug: string
  school: string
  degree: string       
  period: string       
  location?: string
  description?: string
  details?: string[]   
  link?: string
  gradient: string
  tech?: string[]
}

const formations: Formation[] = [
  {
    slug: 'cpge',
    school: 'Lycée Jean-Baptiste SAY',
    degree: "Classe Préparatoire aux Grandes Ecoles - Physique Science de l'ingénieur (PSI*)",
    period: '2020-2022',
    location: 'Paris, FR',
    details: [
      'Maths avancées : algèbre linéaire, probas/statistiques',
      'Physique & SI : modélisation, systèmes et méthodes numériques',
      'Algorithmique et résolution de problèmes (logique, complexité)',
      'Initiation à la programmation scientifique (Python/Matlab)',
    ],
    tech: [
      'Python', 'Matlab', 'Algorithmique', 'Statistiques'
    ],

    gradient: 'from-pink-200 to-yellow-200',
  },
  {
    slug: 'ecole',
    school: 'IMT Nord Europe (école issue de la fusion des Mines de Douai et de Télécom Lille)',
    degree: 'Diplôme d’ingénieur généraliste',
    location: 'Douai, FR',
    period: '2022-2025',
    description: "Spécialisation en analyses de données avancées, outils BI, base de données, Machine Learning",
    details: [
      'Bases data : Python, SQL, data viz',
      'Statistiques descriptives & probas',
      'Intro ML : régression, arbres, k-means',
      'Outils d’ingénieur : Git, Linux, gestion de projet',
    ],
    tech: [
      'Python', 'Java', 'Git', 'Linux', 'C','MatLab', 'SQL'
    ],
    link: "https://imt-nord-europe.fr/",
    gradient: "from-yellow-200 to-green-200",
  },
  {
    slug: 'master-ds',
    school: 'University of West Scotland',
    degree: 'Master Data Science',
    period: '2024',
    location: 'Glasgow, UK',
    description: "Etudes en anglais sur : Data Mining, Machine Learning, Deep Learning, IA générative et Business Intelligence",
    details: [
      'Deep Learning (PyTorch/TensorFlow) : CNN, RNN/Transformers',
      'NLP : embeddings, fine-tuning (BERT/DistilBERT), évaluation (F1, ROC-AUC)',
      'IA générative & LLMs (notions), éthique et biais',
      'Feature engineering, sélection de variables, Data Mining avancé',
      'Projet de fin d’études en NLP',
    ],
    tech: [                     
      'PyTorch', 'TensorFlow', 'Scikit-learn',
      'Tensorflow', 'Pytorch', 'Git'
    ],
    link: 'https://www.uws.ac.uk/',
    gradient: "from-green-200 to-blue-200",
  },
]

export default formations
