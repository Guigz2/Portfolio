'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function HeaderMobile() {
  const headerRef = useRef<HTMLElement>(null)
  const [onHero, setOnHero] = useState(true)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-hero]')
    const header = headerRef.current
    if (!hero || !header) return

    const headerOffset = () => header.getBoundingClientRect().height

    const st = ScrollTrigger.create({
      trigger: hero,
      start: () => `top top+=${headerOffset()}`,
      end: () => `bottom top+=${headerOffset()}`,
      onToggle: self => setOnHero(self.isActive),
      onRefresh: self => setOnHero(self.isActive),
      invalidateOnRefresh: true,
    })
    setOnHero(st.isActive)

    return () => st.kill()
  }, [])

  return (
    <header
      ref={headerRef}
      className={[
        'header--mobile md:hidden sticky top-0 z-50' ,
        onHero ? 'bg-black/40 backdrop-blur-sm' : 'bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70',
        onHero ? 'border-b border-transparent' : 'border-b border-black/10 shadow-[0_1px_8px_rgba(0,0,0,0.06)]',
      ].join(' ')}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold uppercase tracking-wide">
          <span
            className={[
              'text-base leading-none',
              'transition-colors duration-300',
              onHero ? 'text-white' : 'text-black',
            ].join(' ')}
          >
            Guillaume EGU
          </span>
        </Link>

        <Link href="/" className="font-semibold uppercase tracking-wide">
          <span
            className={[
              'text-sm leading-none',
              'transition-colors duration-300',
              onHero ? 'text-white' : 'text-black',
            ].join(' ')}
          >
            Portfolio
          </span>
        </Link>
      </div>
    </header>
  )
}
