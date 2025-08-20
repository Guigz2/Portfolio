import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/content/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projets/${project.slug}`} className="block group border border-black">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4 bg-black text-white">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-sm text-gray-400">{project.role}</p>
      </div>
    </Link>
  )
}