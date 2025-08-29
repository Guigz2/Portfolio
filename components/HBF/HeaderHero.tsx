'use client'

import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function HeaderHero() {
  const headerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const titleLeftRef = useRef<HTMLSpanElement>(null)
  const titleRightRef = useRef<HTMLSpanElement>(null)
  const [isOnHero, setIsOnHero] = useState(false)

  useLayoutEffect(() => {
    const header = headerRef.current
    const inner = innerRef.current
    const left = titleLeftRef.current
    const right = titleRightRef.current
    const hero = document.querySelector<HTMLElement>('[data-hero]')
    if (!header || !inner || !left || !right || !hero) return

    let tl: gsap.core.Timeline | null = null
    let heroTrigger: ScrollTrigger | null = null

    const headerOffset = () => header.getBoundingClientRect().height

    const calcPadXStart = () => {
      const vw = window.innerWidth
      const gap0 = 32
      const lw = left.getBoundingClientRect().width
      const rw = right.getBoundingClientRect().width
      const total = lw + rw + gap0
      return Math.max(0, (vw - total) / 2)
    }

    const setup = async () => {
      // attend 2 frames + polices pour des mesures fiables
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      if ('fonts' in document) { try { await (document as any).fonts.ready } catch {} }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([left, right], { fontSize: 18, lineHeight: 1 })
        gsap.set(inner, { paddingTop: 12, paddingBottom: 12, paddingLeft: 0, paddingRight: 0 })
      } else {
        gsap.set([left, right], { fontSize: 75, letterSpacing: 2, lineHeight: 1, display: 'inline-block' })
        gsap.set(inner, {
          paddingTop: 28,
          paddingBottom: 28,
          paddingLeft: calcPadXStart(),
          paddingRight: calcPadXStart(),
        })

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: 'top top',
            end: '+=550',
            scrub: 0.8,
            onRefreshInit: () => gsap.set(inner, { paddingLeft: calcPadXStart(), paddingRight: calcPadXStart() }),
            onRefresh: () => gsap.set(inner, { paddingLeft: calcPadXStart(), paddingRight: calcPadXStart() }),
          },
          defaults: { ease: 'power2.out' },
        })
        tl.to([left, right], { fontSize: 18, letterSpacing: 0.5 }, 0)
          .to(inner, { paddingTop: 12, paddingBottom: 12 }, 0)
          .to(inner, { paddingLeft: 12, paddingRight: 12 }, 0)
      }

      // ✅ Couleur fiable avec offsets dynamiques + état initial forcé
      heroTrigger = ScrollTrigger.create({
        trigger: hero,
        start: () => `top top+=${headerOffset()}`,
        end: () => `bottom top+=${headerOffset()}`,
        onToggle: self => setIsOnHero(self.isActive),
        onRefresh: self => setIsOnHero(self.isActive),
        invalidateOnRefresh: true,
        // markers: true, // debug si besoin
      })
      // force l'état initial (utile si reload au milieu de la page)
      setIsOnHero(heroTrigger.isActive)

      // dernier coup de balai une fois tout mesuré
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    setup()

    return () => {
      tl?.scrollTrigger?.kill()
      tl?.kill()
      heroTrigger?.kill()
    }
  }, [])

  return (
    <header ref={headerRef} className="header--hero hidden md:block sticky top-0 z-50 bg-transparent">
      <div ref={innerRef} className="w-full flex items-center justify-between gap-x-3">
        <Link href="/" className="font-bold uppercase tracking-wide">
          <span
            ref={titleLeftRef}
            className={`transition-colors duration-300 ${!isOnHero ? 'text-black' : 'text-white'}`}
            style={{ willChange: 'color' }}
          >
            Guillaume EGU
          </span>
        </Link>

        <Link href="/" className="font-bold uppercase tracking-wide">
          <span
            ref={titleRightRef}
            className={`transition-colors duration-300 ${!isOnHero ? 'text-black' : 'text-white'}`}
            style={{ willChange: 'color' }}
          >
            Portfolio
          </span>
        </Link>
      </div>
    </header>
  )
}
