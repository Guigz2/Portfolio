'use client'

import { useEffect, useRef, useState } from 'react'
import { DotGothic16 } from 'next/font/google'

const dot = DotGothic16({ subsets: ['latin'], weight: '400' })

type Angles = { h: number; m: number; s: number }
type ClockState = { angles: Angles; timeText: string; tz: string; status: string }

export default function AnalogClock() {
  const rafRef = useRef<number | null>(null)
  const [state, setState] = useState<ClockState | null>(null) 

  useEffect(() => {
    // démarre uniquement côté client
    const loop = () => {
      setState(buildState())
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])
  // ⬅️ placeholder stable côté serveur (pas de Date ici)
  if (!state) {
    return (
      <section className="relative py-24">
        <div className="mx-auto w-[min(88vw,720px)] aspect-square rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/10" />
      </section>
    )
  }
  const R = 180 // rayon du cadran (SVG 400x400, centre (200,200))

  return (
    <section className="relative py-16 md:py-24">
      {/* en-tête textuel: empilé, centré, responsive */}
      <div className="mx-auto max-w-[820px] px-4">
        <div className="flex flex-col items-center text-center gap-1 mb-6 md:mb-10">
          <div className="tracking-[.2em] text-[clamp(12px,2.6vw,20px)] text-black">
            BASED IN PARIS
          </div>
          <div className="tracking-[.2em] text-[clamp(10px,1.8vw,12px)] text-zinc-400">
            MY CURRENT LOCAL TIME
          </div>
          <div className="tracking-[.15em] text-[clamp(11px,1.8vw,14px)] text-zinc-600">
            {state.status}
          </div>
        </div>
      </div>

      {/* time + tz en grand (déjà masqués en mobile) */}
      <div className={`hidden md:block absolute left-6 bottom-1/2 translate-y-1/2 text-6xl md:text-7xl ${dot.className}`}>
        {state.timeText}
      </div>
      <div className={`hidden md:block absolute right-6 bottom-1/2 translate-y-1/2 text-6xl md:text-7xl ${dot.className}`}>
        {state.tz}
      </div>

      {/* horloge */}
      <div className="mx-auto max-w-[820px] px-4">
        <div className="mx-auto w-[min(86vw,720px)] aspect-square rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/10 grid place-items-center">
          <svg viewBox="0 0 400 400" className="w-[92%] drop-shadow-sm">
            {/* fond + cercle */}
            <circle cx="200" cy="200" r={R} fill="#fff" stroke="#d4d4d8" strokeWidth="2" />

            {/* graduations (60) */}
            {Array.from({ length: 60 }).map((_, i) => {
              const a = (Math.PI / 30) * i
              const major = i % 5 === 0
              const r1 = R - (major ? 16 : 10)
              const r2 = R - 2
              const x1 = 200 + r1 * Math.cos(a - Math.PI / 2)
              const y1 = 200 + r1 * Math.sin(a - Math.PI / 2)
              const x2 = 200 + r2 * Math.cos(a - Math.PI / 2)
              const y2 = 200 + r2 * Math.sin(a - Math.PI / 2)
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#9ca3af"
                  strokeWidth={major ? 2 : 1}
                  opacity={major ? 0.8 : 0.45}
                  strokeLinecap="round"
                />
              )
            })}

            {/* chiffres 1..12 */}
            {Array.from({ length: 12 }).map((_, idx) => {
              const n = idx + 1
              const a = (Math.PI / 6) * n
              const r = R - 38
              const x = 200 + r * Math.cos(a - Math.PI / 2)
              const y = 200 + r * Math.sin(a - Math.PI / 2) + 5
              return (
                <text
                  key={n}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fontSize="18"
                  fill="#111827"
                  fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                >
                  {n}
                </text>
              )
            })}

            {/* aiguilles */}
            <g transform={`rotate(${state.angles.h} 200 200)`}>
              <line x1="200" y1="215" x2="200" y2="120" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
            </g>
            <g transform={`rotate(${state.angles.m} 200 200)`}>
              <line x1="200" y1="210" x2="200" y2="80" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g transform={`rotate(${state.angles.s} 200 200)`}>
              <line x1="200" y1="210" x2="200" y2="60" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* axe central */}
            <circle cx="200" cy="200" r="6" fill="#fff" stroke="#111827" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function buildState(): ClockState {
  const now = new Date()
  const ms = now.getMilliseconds()
  const s = now.getSeconds() + ms / 1000
  const m = now.getMinutes() + s / 60
  const h = (now.getHours() % 12) + m / 60

  const angles: Angles = {
    s: s * 6,        // 360/60
    m: m * 6,        // 360/60
    h: h * 30,       // 360/12
  }

  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const timeText = `${hh}:${mm}`

  // abréviation de fuseau (CET/CEST/GMT+1…)
  let tz = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .formatToParts(now)
    .find(p => p.type === 'timeZoneName')?.value || 'LOCAL'
  tz = tz.replace(/[^A-Z+\-0-9]/g, '') // nettoyer style 'GMT+2'

  // ⬇️ statut selon l'heure locale (8h ≤ heure < 22h)
  const hour = now.getHours()

  const status =
    hour >= 8 && hour < 22
      ? 'Je dois surement être réveillé. Contactez moi.'
      : 'Je dois surement dormir, mais envoyer moi un message et je vous répondrai dès que possible'

  return { angles, timeText, tz, status }
}
