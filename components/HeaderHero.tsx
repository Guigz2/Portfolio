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
    if (!header || !inner || !left || !right) return

    // Sélectionne le Hero (section) pour le trigger
    const hero = document.querySelector('section.relative.h-screen')
    if (!hero) return

    // Ajout du ScrollTrigger pour changer la couleur
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',      // quand le haut du Hero touche le haut du viewport
      end: 'bottom top',     // quand le bas du Hero touche le haut du viewport
      onEnter: () => setIsOnHero(true),      // Header sur le Hero → blanc
      onLeave: () => setIsOnHero(false),     // Header sort du Hero → noir
      onEnterBack: () => setIsOnHero(true),  // Scroll vers le haut → blanc
      onLeaveBack: () => setIsOnHero(false), // Scroll vers le haut → noir
    })

    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([left, right], { fontSize: 18, lineHeight: 1 })
      gsap.set(inner, { paddingTop: 12, paddingBottom: 12, paddingLeft: 0, paddingRight: 0 })
      return
    }

    // État initial (gros titres, donc header haut, sans forcer la hauteur)
    gsap.set([left, right], { fontSize: 75, letterSpacing: 2, lineHeight: 1, display: 'inline-block' })
    //gsap.set(inner, { paddingTop: 28, paddingBottom: 28, paddingLeft: 16, paddingRight: 16 })
    
    const calcPadXStart = () => {
      const vw = window.innerWidth
      const gap0 = 32 // écart souhaité entre les deux titres au centre (ajuste à ton goût)
      const lw = left.getBoundingClientRect().width
      const rw = right.getBoundingClientRect().width
      const total = lw + rw + gap0
      const pad = Math.max(0, (vw - total) / 2)
      return pad
    }

    // On applique le padding de départ (collés au centre)
    gsap.set(inner, {
      paddingTop: 28,
      paddingBottom: 28,
      paddingLeft: calcPadXStart(),
      paddingRight: calcPadXStart(),
    })

    // 5) Timeline scroll : réduction + les spans s’écartent jusqu’aux bords (padding → 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top top',
          end: '+=550',
          scrub: 0.8,
          // Si tu redimensionnes la fenêtre, on recalcule le padding de départ
          onRefresh: () => {
            gsap.set(inner, { paddingLeft: calcPadXStart(), paddingRight: calcPadXStart() })
          },
        },
        defaults: { ease: 'power2.out' },
      })

      tl.to([left, right], { fontSize: 18, letterSpacing: 0.5 }, 0)
        .to(inner, { paddingTop: 12, paddingBottom: 12 }, 0)
        // 👇 la magie : on fait “exploser” le groupe vers les bords
        .to(inner, { paddingLeft: 12, paddingRight: 12 }, 0)
    }, header)

    return () => {
      trigger.kill()
      ctx.revert()
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-transparent"  // pas de border, pas de backdrop-blur, pas de dark:bg-*
    >
      <div ref={innerRef} className="w-full flex items-center justify-between gap-x-3">
        <Link href="/" className="font-bold uppercase tracking-wide">
          <span ref={titleLeftRef}
          className={`transition-colors duration-300 ${!isOnHero ? "text-black" : "text-white"}`}>
            Guillaume EGU</span>
        </Link>

        <Link href="/" className="font-bold uppercase tracking-wide">
          <span ref={titleRightRef} 
          className={`transition-colors duration-300 ${!isOnHero ? "text-black" : "text-white"}`}>
            Portfolio</span>
        </Link>
      </div>
    </header>
  )
}
