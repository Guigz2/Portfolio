
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
          "absolute inset-0 z-0 [clip-path:inherit] bg-gradient-to-r",
          formation.gradient 
        )}
      />

      <div className="relative z-10">
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
            className="mt-4 inline-block text-sm text-black underline underline-offset-4"
          >
            Voir le programme
          </Link>
        ) : null}
      </div>
    </article>
  )
}
