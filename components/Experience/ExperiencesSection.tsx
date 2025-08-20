'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experiences from '@/content/experiencepro'
import ExperienceCard from '@/components/Experience/ExperienceCard'

gsap.registerPlugin(ScrollTrigger)

export default function ExperiencesSection() {
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

    const headerEl = document.querySelector('header.sticky') as HTMLElement | null
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 0

    const calcTravel = () => {
      const railH = rail.clientHeight || section.clientHeight
      return Math.max(0, railH - title.offsetHeight)
    }
    const calcEnd = () => {
      const dist = section.scrollHeight - window.innerHeight + headerOffset
      return `+=${4.25 * Math.max(1, dist)}`
    }

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
            start: () => `top top+=${headerOffset}`,
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
      <div ref={railRef} className="col-span-1 relative">
        <h2
          ref={titleRef}
          className="bg-transparent backdrop-blur px-8 text-4xl md:text-5xl font-bold uppercase z-10 will-change-transform w-fit"
        >
          Expériences professionnelles
        </h2>
      </div>

      <div
        ref={listRef}
        className="col-span-2 grid gap-8 mt-8 grid-cols-1"
      >
        {experiences.map((e) => (
          <div
            key={e.slug}
            data-exp-card                         
            className="will-change-transform"     
          >
            <ExperienceCard experience={e} />
          </div>
        ))}
      </div>
    </section>
  )
}
