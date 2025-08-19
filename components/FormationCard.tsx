// components/FormationCard.tsx
import Link from 'next/link'
import type { Formation } from '@/content/formations'

export default function FormationCard({ formation }: { formation: Formation }) {
  const { school, degree, period, location, details, description, link } = formation

  return (
    <article className="rounded-2xl border border-black p-5 shadow-sm hover:shadow-md transition-shadow bg-transparent backdrop-blur">
      <h3 className="text-lg font-semibold">{degree}</h3>
      <p className="text-sm text-zinc-600 mt-1">
        {school} · {period}{location ? ` · ${location}` : ''}
      </p>

      {description && <p className="mt-3 text-sm text-zinc-700">{description}</p>}

      {details?.length ? (
        <ul className="mt-3 space-y-1 text-sm text-zinc-800 list-disc list-inside">
          {details.map((d, i) => (<li key={i}>{d}</li>))}
        </ul>
      ) : null}

      {link ? (
        <Link href={link} className="mt-4 inline-block text-sm underline underline-offset-4">
          Voir le programme
        </Link>
      ) : null}
    </article>
  )
}
