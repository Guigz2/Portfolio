'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import formations from '@/content/formations'
import FormationCard from '@/components/Formation/FormationCard'

gsap.registerPlugin(ScrollTrigger)

export default function FormationsSection() {
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

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const headerEl = document.querySelector<HTMLElement>(
      isDesktop ? 'header.sticky.header--hero' : 'header.sticky.header--mobile'
    )
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height*3 : 0

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
              return `top top+=${headerOffset}`
            },
            end: calcEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
      
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
      id="experiences"
      ref={sectionRef}
      className="px-6 md:px-40 py-12 grid gap-8 mt-8 grid-cols-3 items-stretch"
    >
      {/* Liste des formations à gauche */}
      <div
        ref={listRef}
        className="col-span-2 grid gap-8 mt-8 grid-cols-1 pl-6"
      >
        {formations.map((e) => (
          <div
            key={e.slug}
            data-exp-card                         
            className="will-change-transform"     
          >
            <FormationCard formation={e} />
          </div>
        ))}
      </div>

      {/* Titre coulissant à droite */}
      <div ref={railRef} className="col-span-1 relative">
        <h2
          ref={titleRef}
          className="bg-transparent pl-20 text-4xl md:text-5xl font-bold uppercase z-10 will-change-transform w-fit"
        >
          Formations
        </h2>
      </div>
    </section>
  )
}
