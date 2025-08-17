'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsapClient'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
    }
  }, [])

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center">
      <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold uppercase">Mon Portfolio</h1>
      <p className="mt-4 text-lg max-w-lg">
        Développeur front-end & motion design — sites animés et immersifs.
      </p>
    </section>
  )
}
