import Link from 'next/link'
import Image from 'next/image'
import projects from '@/content/projects'

export const dynamic = 'force-static'

export default function ProjetsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <header className="mb-10">
        <h1 className="text-4xl md:text-6xl font-bold uppercase">Projets</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">Sélection de travaux récents.</p>
      </header>
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug} className="group">
            <Link href={`/projets/${p.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <span className="text-xs text-neutral-500">{p.year}</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{p.role}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}