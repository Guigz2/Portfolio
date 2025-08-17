import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import projects from '@/content/projects'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
    </>
  )
}
