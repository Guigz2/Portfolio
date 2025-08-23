'use client'

import { useEffect, useRef, useState } from 'react'

type Phase = 'loading' | 'reveal' | 'done'

export default function SplashScreen({ minDuration = 1000 }: { minDuration?: number }) {
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const start = performance.now()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tick = () => {
      const elapsed = performance.now() - start
      const target = Math.min(99, (elapsed / minDuration) * 100)
      setProgress(p => (target > p ? target : p))
      rafRef.current = requestAnimationFrame(tick)
    }
    if (!reducedMotionRef.current) rafRef.current = requestAnimationFrame(tick)

    const domReady = new Promise<void>(res => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') res()
      else document.addEventListener('DOMContentLoaded', () => res(), { once: true })
    })
    const fontsReady = 'fonts' in document ? (document as any).fonts.ready : Promise.resolve()
    const twoFrames = new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))

    Promise.all([domReady, fontsReady, twoFrames]).then(() => {
      const elapsed = performance.now() - start
      const remaining = Math.max(0, minDuration - elapsed)
      setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        const t0 = performance.now()
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
        const step = () => {
          const d = (performance.now() - t0) / 300
          const k = Math.min(1, d)
          setProgress(100 * easeOut(k))
          if (k < 1) requestAnimationFrame(step)
          else {
            window.scrollTo({ top: 0, behavior: 'auto' })
            document.body.style.overflow = prevOverflow
            setPhase(reducedMotionRef.current ? 'done' : 'reveal')
          }
        }
        requestAnimationFrame(step)
      }, remaining)
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = prevOverflow
    }
  }, [minDuration])

  // ✅ calcule un booléen avant de "narrow"
  const isDone = phase === 'done'
  if (isDone) return null

  return (
    <div
      aria-busy={!isDone}              // ✅ plus d’erreur ts(2367)
      className="fixed inset-0 z-[100] pointer-events-auto"
    >
      <div
        className={`absolute inset-0 bg-black origin-top transform transition-transform duration-[1400ms] ease-[cubic-bezier(0.83,0,0.17,1)] z-10
          ${phase === 'reveal' ? 'scale-y-0' : 'scale-y-100'}`}
        onTransitionEnd={() => { if (phase === 'reveal') setPhase('done') }}
      />
      <div
        className={`absolute inset-0 bg-black origin-bottom transform transition-transform duration-[1400ms] ease-[cubic-bezier(0.83,0,0.17,1)] z-10
          ${phase === 'reveal' ? 'scale-y-0' : 'scale-y-100'}`}
      />

      <div
        className={`absolute inset-0 z-20 grid place-items-center transition-opacity duration-300
          ${phase === 'reveal' ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="text-6xl md:text-7xl font-medium tracking-widest text-white tabular-nums">
          {Math.floor(progress)}%
        </span>
      </div>
    </div>
  )
}
