// components/FormationCard.tsx
import Link from 'next/link'
import type { Formation } from '@/content/formations'
import clsx from 'clsx'

/**
 * Arrow-shaped card pointing to the right using CSS clip-path (Tailwind arbitrary value).
 * Works great inside a horizontal scrolling timeline.
 */
export default function FormationCard({
  formation,
  className,
}: {
  formation: Formation
  className?: string
}) {
  const { school, degree, period, location, details, description, link } = formation

  return (
    <article
      className={clsx(
        // layout & sizing
        'relative min-w-[280px] md:min-w-[360px] p-5 pl-12 pr-12',
        // arrow look: background + blur + border + clip-path tip
        'backdrop-blur ',
        // make it a right-pointing arrow with a chevron tip (1.5rem deep)
        '[clip-path:polygon(0_0,calc(100%_-_1.5rem)_0,100%_50%,calc(100%_-_1.5rem)_100%,0_100%,1.5rem_50%)]',
        // optional snapping for timelines
        'snap-start',
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to left top, var(--tw-gradient-stops))`,
      }}
      aria-label={`${degree} — ${school}`}
    >
    <span
    aria-hidden
    className={clsx(
      "absolute inset-0 pointer-events-none [clip-path:inherit] bg-gradient-to-r",
      formation.gradient // 👈 applique ton gradient ici
    )}
  />
      {/* subtle gradient sheen to accent the direction */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl [clip-path:inherit] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <h3 className="text-lg font-semibold leading-tight">{degree}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
        {school} · {period}
        {location ? ` · ${location}` : ''}
      </p>

      {description && (
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{description}</p>
      )}

      {details?.length ? (
        <ul className="mt-3 space-y-1 text-sm text-zinc-800 dark:text-zinc-200 list-disc list-inside">
          {details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ) : null}

      {link ? (
        <Link
          href={link}
          className="mt-4 inline-block text-sm underline underline-offset-4"
        >
          Voir le programme
        </Link>
      ) : null}
    </article>
  )
}


/*
Notes
-----
1) Le coeur est la classe Tailwind arbitraire :
   [clip-path:polygon(0_0,calc(100%_-_1.5rem)_0,100%_50%,calc(100%_-_1.5rem)_100%,0_100%,1.5rem_50%)]
   - Remplacez 1.5rem par 1rem/2rem pour une flèche plus ou moins pointue.
   - Tailwind JIT accepte les valeurs arbitraires : utilisez des underscores pour les espaces.

2) Placez plusieurs <FormationCard /> dans un conteneur horizontal (flex + overflow-x-auto + snap) pour
   former une frise chronologique cliquable allant de gauche à droite.

3) Compatibilité : fonctionne sans pseudo-éléments ::after, donc pas besoin d'activer before/after/content
   dans la config Tailwind. */
