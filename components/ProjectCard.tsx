import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/content/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projets/${project.slug}`} className="block group border border-neutral-200 dark:border-neutral-800">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{project.role}</p>
      </div>
    </Link>
  )
}