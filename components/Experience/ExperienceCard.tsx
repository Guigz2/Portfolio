import Link from 'next/link'
import type { Experience } from '@/content/experiencepro'

export default function ExperienceCard({ experience }: { experience: Experience }) {
  const { role, company, period, location, description, achievements, tech, link } = experience

  return (
    <article className="border rounded-lg border-black shadow-sm hover:shadow-md transition-shadow bg-black backdrop-blur overflow-hidden">
      <div className="p-5 grid grid-cols-[1fr,auto] gap-4 items-start">
        {/* Colonne gauche : infos principales */}
        <div className="min-w-0">
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

          {link ? (
            <Link href={link} className="mt-4 text-white inline-block text-sm underline underline-offset-4">
              Voir plus
            </Link>
          ) : null}
        </div>

        {/* Colonne droite : techs */}
        {tech?.length ? (
          <aside className="mt-6 md:mt-0 md:pl-6 md:border-l md:border-white/10 md:w-fit">
            <ul className="flex flex-col gap-2">
              {tech.map((t) => (
                <li key={t}>
                  <span className="text-xs text-white px-2 py-0.5 rounded-full border border-white">
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
