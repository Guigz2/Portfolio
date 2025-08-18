// components/ExperienceCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Experience } from '@/content/experiencepro'

export default function ExperienceCard({ experience }: { experience: Experience }) {
  const { role, company, period, location, description, achievements, tech, link, logo } = experience

  return (
    <article className="border border-black shadow-sm hover:shadow-md transition-shadow bg-black backdrop-blur overflow-hidden">
      {/* Grid: 1re colonne = carré (largeur = hauteur de la card) */}
      <div className="grid grid-cols-[auto,1fr] items-stretch">
        {/* Colonne image */}
        <div className="relative overflow-hidden">
          {/* Sizer en flux normal : impose une largeur = hauteur */}
          <div aria-hidden className="h-full aspect-square"></div>

          {/* Contenu visuel par-dessus, ne change PAS la largeur de colonne */}
          {logo ? (
            <Image
              src={logo}
              alt={`Logo ${company}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 40vw, 20vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-neutral-900">
              <span className="text-xl sm:text-3xl text-neutral-300">
                {company?.[0] ?? '•'}
              </span>
            </div>
          )}
        </div>

        {/* Contenu (padding ici => espace à droite de l'image) */}
        <div className="p-5 min-w-0">
          <h3 className="text-lg font-semibold text-white">
            {role} <span className="text-gray-400">· {company}</span>
          </h3>
          <p className="text-sm text-gray-200 mt-1">
            {period}{location ? ` · ${location}` : ''}
          </p>

          {description && <p className="mt-3 text-sm text-gray-200">{description}</p>}

          {achievements?.length ? (
            <ul className="mt-3 space-y-1 text-sm text-gray-200 list-disc list-inside">
              {achievements.map((a, i) => (<li key={i}>{a}</li>))}
            </ul>
          ) : null}

          {tech?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tech.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-black">
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {link ? (
            <Link href={link} className="mt-4 inline-block text-sm underline underline-offset-4">
              Voir plus
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}
