import Link from 'next/link'
import type { Formation } from '@/content/formations'
import clsx from 'clsx'

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
        'relative min-w-[280px] md:min-w-[360px] p-5 pl-12 pr-12',
        'backdrop-blur',
        '[clip-path:polygon(0_0,calc(100%_-_1.5rem)_0,100%_50%,calc(100%_-_1.5rem)_100%,0_100%,1.5rem_50%)]',
        className,
      )}
      aria-label={`${degree} — ${school}`}
    >
      <span
        aria-hidden
        className={clsx(
          'absolute inset-0 z-0 [clip-path:inherit] bg-gradient-to-r',
          formation.gradient
        )}
      />

      {/* 2 colonnes (md+): gauche 1fr, droite largeur minimale */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_max-content] md:gap-6 items-start">
        {/* Colonne gauche : texte */}
        <div>
          <h3 className="text-lg text-black font-semibold leading-tight">{degree}</h3>
          <p className="text-sm text-zinc-800 mt-1">
            {school} · {period}
            {location ? ` · ${location}` : ''}
          </p>

          {description && (
            <p className="mt-3 text-sm text-black">{description}</p>
          )}

          {details?.length ? (
            <ul className="mt-3 space-y-1 text-sm text-black list-disc list-inside">
              {details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          ) : null}

          {link ? (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-black underline underline-offset-4"
            >
              Voir le programme
            </Link>
          ) : null}
        </div>

        {/* Colonne droite : compétences (sans titre), largeur = contenu */}
        {formation.tech?.length ? (
          <aside className="mt-6 md:mt-0 md:pl-6 md:border-l md:border-black/10 md:w-fit">
            <ul className="flex flex-col gap-2">
              {formation.tech.map((t) => (
                <li key={t}>
                  <span className="text-xs text-black px-2 py-0.5 rounded-full border border-black">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  )
}
