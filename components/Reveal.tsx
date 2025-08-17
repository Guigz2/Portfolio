'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsapClient'

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" }
      })
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
