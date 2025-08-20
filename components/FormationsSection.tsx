'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FormationCard from '@/components/FormationCard'
import type { Formation } from '@/content/formations'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  formations: Formation[]
  className?: string
}

export default function FormationsSection({ formations, className }: Props) {
  const root = useRef<HTMLDivElement | null>(null)
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>('[data-formation-card]')
      gsap.set(cards, { autoAlpha: 0, y: 16, scale: 0.98 })

      ScrollTrigger.batch(cards, {
        start: 'top 85%', 
        once: true,       
        onEnter: (batch) => {
          if (prefersReduced) {
            gsap.set(batch, { autoAlpha: 1, y: 0, scale: 1 })
          } else {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              stagger: { each: 0.5 },
            })
          }
        },
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 75%',
        once: true,
      })
    }, root)

    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <div ref={root} className={className}>
      <div className="flex items-strech overflow-x-auto snap px-3 gap-3 will-change-transform">
        {formations.map((f) => (
          <div key={f.slug} data-formation-card className="snap-start self-strech">
            <FormationCard formation={f} className='h-full flex flex-col'/>
          </div>
        ))}
      </div>
    </div>
  )
}
