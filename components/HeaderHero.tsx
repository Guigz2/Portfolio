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

    const hero = document.querySelector('section.relative.h-screen')
    if (!hero) return

    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',      
      end: 'bottom top',     
      onEnter: () => setIsOnHero(true),     
      onLeave: () => setIsOnHero(false),     
      onEnterBack: () => setIsOnHero(true),  
      onLeaveBack: () => setIsOnHero(false), 
    })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([left, right], { fontSize: 18, lineHeight: 1 })
      gsap.set(inner, { paddingTop: 12, paddingBottom: 12, paddingLeft: 0, paddingRight: 0 })
      return
    }

    gsap.set([left, right], { fontSize: 75, letterSpacing: 2, lineHeight: 1, display: 'inline-block' })
    
    const calcPadXStart = () => {
      const vw = window.innerWidth
      const gap0 = 32 
      const lw = left.getBoundingClientRect().width
      const rw = right.getBoundingClientRect().width
      const total = lw + rw + gap0
      const pad = Math.max(0, (vw - total) / 2)
      return pad
    }

    gsap.set(inner, {
      paddingTop: 28,
      paddingBottom: 28,
      paddingLeft: calcPadXStart(),
      paddingRight: calcPadXStart(),
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top top',
          end: '+=550',
          scrub: 0.8,
          onRefresh: () => {
            gsap.set(inner, { paddingLeft: calcPadXStart(), paddingRight: calcPadXStart() })
          },
        },
        defaults: { ease: 'power2.out' },
      })

      tl.to([left, right], { fontSize: 18, letterSpacing: 0.5 }, 0)
        .to(inner, { paddingTop: 12, paddingBottom: 12 }, 0)
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
      className="sticky top-0 z-50 bg-transparent" 
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
