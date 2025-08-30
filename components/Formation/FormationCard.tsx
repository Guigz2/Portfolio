import Link from 'next/link'
import type { Formation } from '@/content/formations'

export default function FormationCard({ formation }: { formation: Formation }) {
  const { school, degree, period, location, details, description, link, tech } = formation

  return (
    <article className="border rounded-lg border-black shadow-sm hover:shadow-md transition-shadow bg-black backdrop-blur overflow-hidden">
      <div className="p-4 md:p-5 grid grid-cols-[1fr,auto] gap-3 md:gap-4 items-start">
        {/* Colonne gauche : infos principales */}
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-white">
            {degree} <span className="text-gray-400">· {school}</span>
          </h3>
          <p className="text-xs md:text-sm text-gray-200 mt-1">
            {period}{location ? ` · ${location}` : ''}
          </p>

          {description && (
            <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-200">
              {description}
            </p>
          )}

          {details?.length ? (
            <ul className="mt-2 md:mt-3 space-y-0.5 md:space-y-1 text-xs md:text-sm text-gray-200 list-disc list-inside">
              {details.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          ) : null}

          {link ? (
            <Link
              href={link}
              className="mt-3 md:mt-4 text-white inline-block text-xs md:text-sm underline underline-offset-4"
            >
              Voir plus
            </Link>
          ) : null}
        </div>

        {/* Colonne droite : techs */}
        {tech?.length ? (
          <aside className="mt-4 md:mt-0 md:pl-6 md:border-l md:border-white/10 md:w-fit">
            <ul className="flex flex-col gap-1.5 md:gap-2">
              {tech.map((t) => (
                <li key={t}>
                  <span className="text-[10px] md:text-xs text-white px-1.5 md:px-2 py-0.5 rounded-full border border-white">
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
