'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsapClient'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        if (prefersReduced) {
          gsap.set(titleRef.current, { opacity: 1, x: 0 })
        } else {
          gsap.fromTo(
            titleRef.current,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
          )
        }
      }

      if (descRef.current) {
        if (prefersReduced) {
          gsap.set(descRef.current, { opacity: 1, x: 0 })
        } else {
          gsap.fromTo(
            descRef.current,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.5 }
          )
        }
      }

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current || bgRef.current,
            start: 'top bottom',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/Illu_V_HomePage_1.mp4" type="video/mp4" />
      </video>

      <h1
        ref={titleRef}
        className="text-6xl md:text-8xl font-bold uppercase text-white drop-shadow-lg will-change-transform"
      >
        Data Scientist
      </h1>

      <p
        ref={descRef}
        className="mt-4 text-lg max-w-lg text-white drop-shadow will-change-transform"
      >
        Développer et implémenter des modèles statistiques et des algorithmes de
        machine learning pour faire ressortir des insights et prendre des
        décisions data-driven.
      </p>
    </section>
  )
}
