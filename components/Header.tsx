'use client'

import Link from 'next/link'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const titleLeftRef = useRef<HTMLSpanElement>(null)
  const titleRightRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const header = headerRef.current
    const inner = innerRef.current
    const left = titleLeftRef.current
    const right = titleRightRef.current
    if (!header || !inner || !left || !right) return

    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([left, right], { fontSize: 18, lineHeight: 1 })
      gsap.set(inner, { paddingTop: 12, paddingBottom: 12 })
      return
    }

    // État initial (gros titres, donc header haut, sans forcer la hauteur)
    gsap.set([left, right], { fontSize: 75, letterSpacing: 2, lineHeight: 1, display: 'inline-block' })
    gsap.set(inner, { paddingTop: 28, paddingBottom: 28, paddingLeft: 16, paddingRight: 16 })

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top top',
          end: '+=550',       // plus petit = diminution plus rapide
          scrub: 0.8,
        },
        defaults: { ease: 'power2.out' },
      })
        // On ne touche PAS à la hauteur : elle suit le texte
        .to([left, right], { fontSize: 18, letterSpacing: 0.5 }, 0)
        .to(inner, { paddingTop: 12, paddingBottom: 12 }, 0)
      // AUCUN backgroundColor ici → vraiment transparent
    }, header)

    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-transparent"  // pas de border, pas de backdrop-blur, pas de dark:bg-*
    >
      <div ref={innerRef} className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="/" className="font-bold uppercase tracking-wide">
          <span ref={titleLeftRef}>Guillaume EGU</span>
        </Link>

        <Link href="/" className="font-bold uppercase tracking-wide">
          <span ref={titleRightRef}>Portfolio</span>
        </Link>
      </div>
    </header>
  )
}
