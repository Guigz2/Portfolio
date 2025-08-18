import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import projects from '@/content/projects'
import "../styles/globals.css"


export default function Home() {
  return (
    <>
      <Hero />
      <h1 className="text-6xl md:text-6xl font-bold uppercase">Projets</h1>
      <section className="grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
    </>
  )
}
