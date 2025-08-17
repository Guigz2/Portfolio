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
}

const projects: Project[] = [
  {
    slug: 'projet-1',
    title: 'Projet 1',
    role: 'UI/UX + Dev Front',
    year: 2025,
    tags: ['Next.js', 'GSAP'],
    image: '/images/projet1.jpg',
    gallery: ['/images/projet1.jpg'],
    summary: "Page d'accueil animée avec ScrollTrigger.",
    link: '#',
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