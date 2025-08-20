'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/content/projects'

type Props = { projects: Project[]; speed?: number } // px/s

export default function ProjectsMarqueeDrag({ projects, speed = 40 }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [repeat, setRepeat] = useState(2)

  const loop = useMemo(() => {
    const out: Project[] = []
    for (let r = 0; r < repeat; r++) out.push(...projects)
    return out
  }, [projects, repeat])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    const track = trackRef.current
    if (!el || !track) return

    const children = Array.from(track.children) as HTMLElement[]
    if (children.length === 0) return

    const total = track.scrollWidth
    const unitWidth = total / repeat

    const containerW = el.clientWidth
    const needed = Math.ceil((containerW * 2) / Math.max(1, unitWidth))

    const nextRepeat = Math.min(12, Math.max(2, needed))
    if (nextRepeat !== repeat) setRepeat(nextRepeat)
  }, [projects, repeat])

  const [isDown, setIsDown] = useState(false)
  const posRef = useRef({ startX: 0, startScrollLeft: 0 })
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    lastTsRef.current = null

    const tick = (ts: number) => {
      const track = trackRef.current
      if (track) {
        const half = track.scrollWidth / repeat 
        if (!pausedRef.current && !isDown && half > 0) {
          const last = lastTsRef.current ?? ts
          const dt = (ts - last) / 1000
          el.scrollLeft += speed * dt
          while (el.scrollLeft >= half) el.scrollLeft -= half
          while (el.scrollLeft < 0) el.scrollLeft += half
          lastTsRef.current = ts
        } else {
          lastTsRef.current = ts
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [speed, isDown, repeat])

  useEffect(() => {
    const el = scrollerRef.current
    const track = trackRef.current
    if (!el || !track) return

    const down = (x: number) => {
      setIsDown(true)
      el.classList.add('cursor-grabbing')
      el.classList.remove('cursor-grab')
      posRef.current.startX = x
      posRef.current.startScrollLeft = el.scrollLeft
    }
    const move = (x: number) => {
      if (!isDown) return
      const dx = x - posRef.current.startX
      el.scrollLeft = posRef.current.startScrollLeft - dx
      const half = track.scrollWidth / repeat
      while (el.scrollLeft >= half) el.scrollLeft -= half
      while (el.scrollLeft < 0) el.scrollLeft += half
    }
    const up = () => {
      setIsDown(false)
      el.classList.remove('cursor-grabbing')
      el.classList.add('cursor-grab')
    }

    const onMouseDown = (e: MouseEvent) => { e.preventDefault(); down(e.clientX) }
    const onMouseMove = (e: MouseEvent) => move(e.clientX)
    const onMouseUp = () => up()
    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX)
    const onTouchEnd = () => up()
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDown, repeat])

  return (
    <div className="relative">
      <div className="edge-fade-left" />
      <div className="edge-fade-right" />

      <div
        ref={scrollerRef}
        className="relative overflow-hidden select-none cursor-grab scrollbar-none"
        onPointerEnter={() => { pausedRef.current = true }}
        onPointerLeave={() => { pausedRef.current = false }}
        onTouchStart={() => { pausedRef.current = true }}
        onTouchEnd={() => { pausedRef.current = false }}
      >
        <div ref={trackRef} className="flex">
          {loop.map((p, i) => (
            <div
              key={`${p.slug}-${i}`}
              className="shrink-0 w-[280px] md:w-[340px] lg:w-[380px]"
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
