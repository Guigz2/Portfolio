// components/ExperiencesSection.tsx
'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experiences from '@/content/experiencepro'
import ExperienceCard from '@/components/ExperienceCard'

gsap.registerPlugin(ScrollTrigger)

export default function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)     // colonne gauche (rail)
  const listRef = useRef<HTMLDivElement>(null)     // colonne droite (liste des cartes)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    const list = listRef.current
    const title = titleRef.current
    if (!section || !rail || !list || !title) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hauteur du header sticky (si tu en as un) pour éviter un décalage au start
    const headerEl = document.querySelector('header.sticky') as HTMLElement | null
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 0

    const calcTravel = () => {
      // distance disponible pour “couler” : hauteur colonne - hauteur du titre
      const railH = rail.clientHeight || section.clientHeight
      return Math.max(0, railH - title.offsetHeight)
    }

    const calcEnd = () => {
      // durée de scroll sur la section : hauteur section - hauteur viewport (+ offset header)
      const dist = section.scrollHeight - window.innerHeight + headerOffset
      // éviter une durée nulle/négative (qui provoquerait un jump)
      return `+=${4.25*Math.max(1, dist)}`
    }

    // On force l'état initial à y:0, et on scrub jusqu'à y:calcTravel()
    const tween = gsap.fromTo(
      title,
      { y: 0 },
      {
        y: calcTravel,
        ease: 'none',
        immediateRender: false,          // évite un "snap" au montage
        scrollTrigger: {
          trigger: section,
          start: () => `top top+=${headerOffset}`, // décale si header colle en haut
          end: calcEnd,                             // durée fiable même si contenu change
          scrub: true,
          invalidateOnRefresh: true,               // recalcule travel/end au resize/orientation
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="px-6 md:px-40 py-12 grid gap-8 mt-8 grid-cols-3 items-stretch"  // ⬅️ items-stretch pour égaliser les hauteurs de colonnes
    >
      {/* Colonne gauche : rail vertical */}
      <div ref={railRef} className="col-span-1 relative">
        <h2
          ref={titleRef}
          className="bg-transparent backdrop-blur px-8 text-4xl md:text-5xl font-bold uppercase z-10 will-change-transform w-fit"
        >
          Expériences professionnelles
        </h2>
      </div>

      {/* Colonne droite : liste mappée */}
      <div
        ref={listRef}
        className="
          col-span-2 grid gap-8 mt-8 items-stretch
          grid-cols-1
          [&>*]:h-full   /* <-- chaque card = hauteur de la ligne */
        "
      >
        {experiences.map((e) => (
          <ExperienceCard key={e.slug} experience={e} />
        ))}
      </div>
    </section>
  )
}
