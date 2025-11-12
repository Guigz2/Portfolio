'use client'
import AltParallaxRow from '@/components/AltParallaxRow'
import Image from 'next/image'

const rows = [
  {
    side: 'image-right' as const,
    image: { src: '/images/portrait-1.jpg', alt: 'Guillaume — portrait' },
    title: 'Jeune diplômé en data',
    text: "Diplômé de l’IMT Nord Europe, après cinq années d’études comprenant deux années de CPGE et un semestre en Écosse, je suis à la recherche de mon premier poste en transformation numérique.",
  },
  {
    side: 'image-left' as const,
    image: { src: '/images/portrait-2.jpeg', alt: 'Guillaume — musique' },
    title: 'Passionné de musique',
    text: "Je compose et expérimente avec le son. J’aime l’alliance entre la création d’émotions et la rigueur de la composition musicale.",
  },
  {
    side: 'image-right' as const,
    image: { src: '/images/portrait-3.jpeg', alt: 'Guillaume — arts martiaux' },
    title: 'Randonnée',
    text: "Préparation, endurance et sens de l’orientation : j’aime avancer pas à pas, profiter du terrain et atteindre des lieux difficiles d’accès.",
  },
  {
    side: 'image-left' as const,
    image: { src: '/images/portrait-4.jpeg', alt: 'Guillaume — projets tech' },
    title: 'Créatif et développeur',
    text: "J’aime donner vie aux idées : sites web, applications, projets électroniques… Je suis curieux de tout ce qui touche à la tech.",
  },
]

export default function AlternatingShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-8">
      {/* --- Version MOBILE : cartes empilées, sans parallax --- */}
      <div className="md:hidden space-y-6">
        {rows.map((r, i) => (
          <article
            key={`m-${i}`}
            className="rounded-2xl overflow-hidden bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
          >
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={r.image.src}
                alt={r.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 0"
                className="object-cover"
                priority={i === 0}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold tracking-tight">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black">
                {r.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* --- Version DESKTOP : tes rangées parallax existantes --- */}
      <div className="hidden md:block">
        {rows.map((r, i) => (
          <AltParallaxRow
            key={`d-${i}`}
            side={r.side}
            image={r.image}
            title={r.title}
            text={r.text}
            depthImg={1.8}         // plus de mouvement image
            depthText={0.9}        // un peu plus aussi pour le texte
            compact
            aspect="4 / 5"
            overlapY={i === 0 ? 0 : -16} // chevauche à partir du 2e
          />
        ))}
      </div>
    </section>
  )
}
