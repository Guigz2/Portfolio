'use client'
import AltParallaxRow from '@/components/AltParallaxRow'

const rows = [
  {
    side: 'image-right' as const,
    image: { src: '/images/Portrait.jpg', alt: 'Portrait 1' },
    title: 'Design & Motion',
    text: 'J’explore l’interface comme un espace vivant : micro-interactions, rythme et lisibilité.',
  },
  {
    side: 'image-left' as const,
    image: { src: '/images/projet1.jpg', alt: 'Portrait 2' },
    title: 'Performance & Détail',
    text: 'Core Web Vitals, accessibilité, typographie et systèmes UI soignés.',
  },
  {
    side: 'image-right' as const,
    image: { src: '/images/projet2.jpg', alt: 'Portrait 3' },
    title: 'Technos',
    text: 'Next.js, TypeScript, GSAP/ScrollTrigger, un peu de WebGL, Tailwind CSS.',
  },
]

export default function AlternatingShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-8">
      {rows.map((r, i) => (
        <AltParallaxRow
          key={i}
          side={r.side}
          image={r.image}
          title={r.title}
          text={r.text}
          depthImg={1.8}     // ⬅️ plus de mouvement image
          depthText={0.9}    // ⬅️ un peu plus aussi pour le texte
          compact            // ⬅️ espaces serrés
          aspect="4 / 5"
          overlapY={i === 0 ? 0 : -16} // ⬅️ chevauche légèrement à partir du 2e
        />
      ))}
    </section>
  )
}
