'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsapClient'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
    }

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: 300, // la valeur du "décalage" pendant le scroll
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top bottom', // quand l’élément entre dans la vue
          scrub: true, // synchro avec le scroll
        },
      })
    }
  }, [])

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* 
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Illu_HomePage_2.png')" }}
      />
      */}

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
        className="text-6xl md:text-8xl font-bold uppercase text-white drop-shadow-lg"
      >
        Data Scientist
      </h1>
      <p className="mt-4 text-lg max-w-lg text-white drop-shadow">
        Développer et implémenter des modèles statistiques et des algorithmes de
        machine learning pour faire ressortir des insights et prendre des
        décisions data-driven.
      </p>
    </section>
  )
}
