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
      // Délai global (équivalent de minDuration={900} -> 900ms)
      const delaySeconds = 2.5

      if (prefersReduced) {
        if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, x: 0 })
        if (descRef.current) gsap.set(descRef.current, { opacity: 1, x: 0 })
      } else {
        // Timeline avec délai initial
        const tl = gsap.timeline({
          delay: delaySeconds,
          defaults: { ease: 'power3.out', duration: 1 }
        })

        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1 }
          )
        }

        if (descRef.current) {
          // Démarre 0.5s après le titre comme avant
          tl.fromTo(
            descRef.current,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1 },
            '+=0.5'
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
      className="relative h-[70vh] md:h-screen flex flex-col justify-center items-center text-center overflow-hidden"
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
        Junior Data Scientist
      </h1>

      <p
        ref={descRef}
        className=" p-4 mt-4 text-lg max-w-lg text-white drop-shadow will-change-transform"
      >
        Jeune diplomé d'une école d'ingénieur, spécialisé en Data Science. 
        Je cherche à Développer et implémenter des modèles statistiques et 
        des algorithmes de machine learning pour faire ressortir des 
        insights et prendre des décisions data-driven.
      </p>
    </section>
  )
}
