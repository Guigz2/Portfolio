import Hero from '@/components/Hero'
import projects from '@/content/projects'
import formations from '@/content/formations'
import FormationsSection from '@/components/Formation/FormationsSection'
import ExperiencesSection from '@/components/Experience/ExperiencesSection'
import ProjectsSection from '@/components/Projet/ProjectsSection'
import AnalogClock from '@/components/AnalogClock'
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
          <h2 className="px-48 text-4xl md:text-5xl font-bold uppercase">Projets</h2>

          <div className="mt-8">
            <ProjectsSection projects={projects} speed={75} />
          </div>
        </section>

        {/* Download CV*/}
        <section className="px-48 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase">Télécharger mon CV</h2>
            <p className="mt-4 text-lg">
              Vous pouvez télécharger mon CV au format PDF en cliquant sur le lien ci-dessous.
            </p>
            <a
              href="/CV%20Guillaume%20EGU.pdf"
              download
              className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Télécharger le CV
            </a>
          </div>
        </section>

        {/* ⬇️ HORLOGE */}
        <AnalogClock />
      </div>   
    </>
  )
}
