'use client'

import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import formations from '@/content/formations'
import FormationCard from '@/components/Formation/FormationCard'

gsap.registerPlugin(ScrollTrigger)

/** -------- Wrapper -------- */
export default function FormationsSectionSwitch() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop ? <FormationsSectionDesktop /> : <FormationsSectionMobile />
}

/** -------- Version Mobile (simple & lisible) -------- */
function FormationsSectionMobile() {
  return (
    <section
      id="formations" // unique (pas de doublon)
      className="px-6 py-10 grid grid-cols-1 gap-6"
    >
      <h2 className="text-3xl font-bold uppercase leading-tight">Formations</h2>

      <div className="grid grid-cols-1 gap-6">
        {formations.map((f) => (
          <div key={f.slug} data-exp-card className="will-change-transform">
            <FormationCard formation={f} />
          </div>
        ))}
      </div>
    </section>
  )
}

/** -------- Version Desktop (titre coulissant à droite) -------- */
function FormationsSectionDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    const list = listRef.current
    const title = titleRef.current
    if (!section || !rail || !list || !title) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const calcTravel = () => {
      const railH = rail.clientHeight || section.clientHeight
      return Math.max(0, railH - title.offsetHeight)
    }
    const calcEnd = () => `+=${calcTravel()}`

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        title,
        { y: 0 },
        {
          y: calcTravel,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: () => {
              const h = document.querySelector<HTMLElement>('header.sticky')
              const off = h ? h.getBoundingClientRect().height : 0
              return `top top+=${off}`
            },
            end: calcEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )

      // Fade-in des cards
      const cards = gsap.utils.toArray<HTMLElement>('[data-exp-card]')
      gsap.set(cards, { autoAlpha: 0, y: 24 })
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              delay: i * 0.05,
            })
          },
        })
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="formations" // même ancre, mais une seule version rendue grâce au wrapper
      ref={sectionRef}
      className="px-6 md:px-10 lg:px-16 py-12 grid gap-8 mt-8 grid-cols-3 items-start"
    >
      {/* Colonne gauche : liste */}
      <div
        ref={listRef}
        className="col-span-2 grid gap-8 mt-8 grid-cols-1 pl-6"
      >
        {formations.map((f) => (
          <div key={f.slug} data-exp-card className="will-change-transform">
            <FormationCard formation={f} />
          </div>
        ))}
      </div>

      {/* Colonne droite : titre coulissant, aligné bord droit */}
      <div ref={railRef} className="col-span-1 relative flex justify-end">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold uppercase will-change-transform w-fit text-right leading-tight
                     [text-shadow:0_0_2px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {/* Blur confiné si tu veux un effet verre (évite le panneau géant) */}
          {/* <span className="inline-flex items-center rounded-xl bg-white/5 backdrop-blur-sm px-3 py-1">
            Formations
          </span> */}
          Formations
        </h2>
      </div>
    </section>
  )
}
