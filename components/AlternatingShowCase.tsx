'use client'
import AltParallaxRow from '@/components/AltParallaxRow'

const rows = [
  {
    side: 'image-right' as const,
    image: { src: '/images/portrait-1.jpg', alt: 'Guillaume — portrait' },
    title: 'Jeune diplômé en data',
    text: "Diplômé de l’IMT Nord Europe, je transforme les données en décisions via modèles, analyses et dashboards. Je cherche mon premier poste en data science",
  },
  {
    side: 'image-left' as const,
    image: { src: '/images/portrait-2.jpeg', alt: 'Guillaume — musique' },
    title: 'Passionné de musique',
    text: "Je compose et bidouille du son. J’aime croiser musique et data : analyse de playlists, détection de tempo, petites applis de recommandation.",
  },
  {
    side: 'image-right' as const,
    image: { src: '/images/portrait-3.jpeg', alt: 'Guillaume — arts martiaux' },
    title: 'Randonnée',
    text: "Préparation, endurance et sens de l’itinéraire : j’aime avancer pas à pas, observer le terrain et atteindre le sommet.",
  },
  {
    side: 'image-left' as const,
    image: { src: '/images/portrait-4.jpg', alt: 'Guillaume — projets tech' },
    title: 'Créatif et développeur',
    text: "J’aime donner vie aux idées : Next.js, TypeScript, GSAP. Prototypes rapides, détails soignés, performance réelle.",
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
