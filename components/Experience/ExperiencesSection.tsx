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

    const ctx = gsap.context(() => {
      // Animation d'apparition des cartes (mobile + desktop)
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

      // Titre : fixe en mobile, coulissant en desktop
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          const headerEl = document.querySelector<HTMLElement>('header.sticky.header--hero')
          const headerOffset = headerEl ? headerEl.getBoundingClientRect().height * 5 : 0

          const calcTravel = () => {
            const base = list.scrollHeight || section.scrollHeight || section.clientHeight
            return Math.max(0, base - title.offsetHeight)
          }
          const calcEnd = () => `+=${calcTravel()}`

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

          return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
          }
        },

        '(max-width: 1023.98px)': () => {
          // Titre fixe sur mobile
          gsap.set(title, { clearProps: 'y' })
        },
      })
    }, section)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="px-6 md:px-40 py-12 grid gap-8 mt-8 grid-cols-1 md:grid-cols-3 items-stretch"
    >
      {/* Titre : en haut en mobile, en colonne 1 en desktop */}
      <div ref={railRef} className="order-1 md:order-1 md:col-span-1 relative">
        <h2
          ref={titleRef}
          className="text-black bg-transparent px-8 md:px-8 text-4xl md:text-5xl font-bold uppercase z-10 will-change-transform w-fit"
        >
          Expériences
        </h2>
      </div>

      {/* Liste des expériences */}
      <div
        ref={listRef}
        className="order-2 md:order-2 md:col-span-2 grid gap-8 mt-2 md:mt-8 grid-cols-1"
      >
        {experiences.map((e) => (
          <div key={e.slug} data-exp-card className="will-change-transform">
            <ExperienceCard experience={e} />
          </div>
        ))}
      </div>
    </section>
  )
}
