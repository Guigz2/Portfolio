import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import projects from '@/content/projects'
import formations from '@/content/formations'
import experiences from '@/content/experiencepro'
import FormationCard from '@/components/FormationCard'
import ExperiencesSection from '@/components/ExperiencesSection'
import "../styles/globals.css"


export default function Home() {
  return (
    <>
      <Hero />

      <div className="w-full pt-24 pb-0 bg-gradient-to-b from-white via-rose-200 via-sky-200 via-emerald-200 to-white">

        {/* Formations */}
        <section id="formations" className="px-6 md:px-8 py-12">
          <h2 className="px-40 text-4xl md:text-5xl font-bold uppercase">Formations</h2>
          <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {formations.map((f) => (
              <FormationCard key={f.slug} formation={f} />
            ))}
          </div>
        </section>

        {/* Expériences professionnelles */}
        
        <ExperiencesSection />
      

        {/* Projets */}
        <section id="projects" className="px-6 md:px-8 py-12">
          <h2 className="px-40 text-4xl md:text-5xl font-bold uppercase">Projets</h2>
          <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((e) => (
              <ProjectCard key={e.slug} project={e} />
            ))}
          </div>
        </section>
      </div>   
    </>
  )
}
