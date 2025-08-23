import Hero from '@/components/Hero'
import projects from '@/content/projects'
import formations from '@/content/formations'
import FormationsSection from '@/components/Formation/FormationsSection'
import ExperiencesSection from '@/components/Experience/ExperiencesSection'
import ProjectsSection from '@/components/Projet/ProjectsSection'
import PixelOverlayBlend from '@/components/PixelOverlayBlend'
import SplashScreen from '@/components/SplashScreen'
import "../styles/globals.css"


export default function Home() {
  return (
    <>
      <SplashScreen minDuration={800} />

      <section data-hero className="relative h-screen">
        <Hero />
      </section>

      <div className="relative w-full pt-24 pb-0 bg-gradient-to-b from-white via-rose-200 via-sky-200 via-emerald-200 to-white">
        {/* ⬇️ Overlay pixels AU-DESSUS du gradient, SOUS le contenu */}
        <PixelOverlayBlend
          className="absolute inset-0 z-0"
          cellSize={25}
          radius={30}
          intensity={0.9}
          blendMode="multiply"   // 'screen' pour éclaircir, 'overlay' pour contraste
          strength={1}
        />

        {/* contenu au-dessus */}
        <div className="relative z-10">
          {/* Formations */}
          <section id="formations" className="pb-12">
            <h2 className="px-48 text-4xl md:text-5xl font-bold uppercase py-4">Formations</h2>
            <FormationsSection formations={formations} className="bg-black" />
          </section>

          {/* Expériences */}
          <ExperiencesSection />

          {/* Projets */}
          <section id="projects" className="px-0 md:px-0 py-12">
            <h2 className="px-48 text-4xl md:text-5xl font-bold uppercase">Projets</h2>
            <div className="mt-8">
              <ProjectsSection projects={projects} speed={75} />
            </div>
          </section>

          {/* CV */}
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
        </div>
      </div>
    </>
  )
}
