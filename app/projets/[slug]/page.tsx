import Image from 'next/image'
import { notFound } from 'next/navigation'
import projects, { Project } from '@/content/projects'

export const dynamic = 'force-static'

type Params = { slug: string }

function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params
  const project = getProject(resolvedParams.slug)
  if (!project) return notFound()

  return (
    <article className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold uppercase">{project.title}</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{project.role}{project.client ? ` · ${project.client}` : ''}</p>
      </header>

      <div className="relative aspect-[16/9] w-full border border-neutral-200 dark:border-neutral-800">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      {project.summary && (
        <section className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Contexte & Objectifs</h2>
          <p>{project.summary}</p>
        </section>
      )}

      {project.tags && project.tags.length > 0 && (
        <section className="mt-6">
          <h3 className="text-sm uppercase tracking-wide text-neutral-500">Stack / Tags</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="border px-2 py-1 text-xs border-neutral-300 dark:border-neutral-700">{t}</li>
            ))}
          </ul>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <Image src={src} alt={`${project.title} visuel ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </section>
      )}

      <footer className="mt-10 flex gap-4">
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="underline">Voir le site</a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer" className="underline">Code source</a>
        )}
      </footer>
    </article>
  )
}