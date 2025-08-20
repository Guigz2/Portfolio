import Hero from '@/components/Hero'
import projects from '@/content/projects'
import formations from '@/content/formations'
import FormationsSection from '@/components/FormationsSection'
import ExperiencesSection from '@/components/ExperiencesSection'
import ProjectsSection from '@/components/ProjectsSection'
import "../styles/globals.css"


export default function Home() {
  return (
    <>
      <Hero />

      <div className="w-full pt-24 pb-0 bg-gradient-to-b from-white via-rose-200 via-sky-200 via-emerald-200 to-white">

        {/* Formations */}
        <section id="formations" className="pb-12">
          <h2 className="px-48 text-4xl md:text-5xl font-bold uppercase py-4">Formations</h2>
          <FormationsSection formations={formations} className="bg-black" />
        </section>

        {/* Expériences professionnelles */}
        
        <ExperiencesSection />
      

        {/* Projets */}
        <section id="projects" className="px-0 md:px-0 py-12">
          <h2 className="px-6 md:px-40 text-4xl md:text-5xl font-bold uppercase">Projets</h2>

          <div className="mt-8">
            <ProjectsSection projects={projects} speed={75} />
          </div>
        </section>
      </div>   
    </>
  )
}
