'use client'

import { useEffect, useRef } from 'react'

type Props = {
  cellSize?: number // taille d’une cellule (px)
  radius?: number   // rayon d’influence de la souris (px)
  intensity?: number // 0..1, force de l’effet
  className?: string
}

export default function PixelBackground({
  cellSize = 28,
  radius = 220,
  intensity = 0.9,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef<number | null>(null)

  // Grille / états
  const colsRef = useRef(0)
  const rowsRef = useRef(0)
  const heatRef = useRef<Float32Array | null>(null) // activation par cellule (0..1)
  const cxRef = useRef<Float32Array | null>(null)   // centre x de la cellule
  const cyRef = useRef<Float32Array | null>(null)   // centre y de la cellule
  const jxRef = useRef<Float32Array | null>(null)   // jitter seed x
  const jyRef = useRef<Float32Array | null>(null)   // jitter seed y

  // Pointeur
  const pointerRef = useRef({ x: -1e6, y: -1e6, t: 0, vx: 0, vy: 0, speed: 0 }) // en dehors de l’écran

  // dimensionne le canvas + (re)crée la grille
  const resize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctxRef.current = ctx

    // grille
    const cols = Math.ceil(w / cellSize)
    const rows = Math.ceil(h / cellSize)
    colsRef.current = cols
    rowsRef.current = rows

    const n = cols * rows
    heatRef.current = new Float32Array(n) // reset à 0
    cxRef.current = new Float32Array(n)
    cyRef.current = new Float32Array(n)
    jxRef.current = new Float32Array(n)
    jyRef.current = new Float32Array(n)

    let k = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++, k++) {
        cxRef.current![k] = c * cellSize + cellSize / 2
        cyRef.current![k] = r * cellSize + cellSize / 2
        // petites graines pour un léger tremblement
        jxRef.current![k] = Math.random() * 6.283 // [0..2π]
        jyRef.current![k] = Math.random() * 6.283
      }
    }
  }

  useEffect(() => {
    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    // écoute la souris (global, le canvas est pointer-events-none)
    let lastT = performance.now()
    const onMove = (e: PointerEvent) => {
      const t = performance.now()
      const dt = Math.max(1, t - lastT) / 1000
      lastT = t
      const px = e.clientX
      const py = e.clientY
      const dx = px - pointerRef.current.x
      const dy = py - pointerRef.current.y
      const speed = Math.hypot(dx, dy) / dt
      pointerRef.current = { x: px, y: py, t, vx: dx / dt, vy: dy / dt, speed }
      // boost immédiat des cellules proches
      injectHeat(px, py, speed)
    }
    const onLeave = () => {
      // éloigne le pointeur → l’effet disparaît progressivement
      pointerRef.current.x = -1e6
      pointerRef.current.y = -1e6
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    // boucle de rendu
    const loop = () => {
      step()
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellSize, radius, intensity])

  // Ajoute de la chaleur autour du pointeur
  const injectHeat = (px: number, py: number, speed: number) => {
    const cols = colsRef.current, rows = rowsRef.current
    const heat = heatRef.current, cx = cxRef.current, cy = cyRef.current
    if (!heat || !cx || !cy) return

    const rad2 = radius * radius
    const speedK = Math.min(1, speed / 1500) // normalise la vitesse
    const n = cols * rows
    for (let i = 0; i < n; i++) {
      const dx = cx[i] - px
      const dy = cy[i] - py
      const d2 = dx * dx + dy * dy
      if (d2 < rad2) {
        // gaussienne
        const g = Math.exp(-d2 / (2 * rad2 * 0.35)) // 0..1
        const add = g * (0.4 + 0.6 * speedK) * intensity
        // clamp
        heat[i] = Math.min(1, heat[i] + add)
      }
    }
  }

  // Fait décroitre la chaleur globalement
  const step = () => {
    const heat = heatRef.current
    if (!heat) return
    for (let i = 0; i < heat.length; i++) {
      // decay exponentiel : ~ 0.9 / s
      heat[i] *= 0.92
      if (heat[i] < 0.005) heat[i] = 0
    }
  }

  // Dessin : fond blanc + cellules actives
  const draw = () => {
    const ctx = ctxRef.current
    const heat = heatRef.current
    const cx = cxRef.current, cy = cyRef.current
    const jx = jxRef.current, jy = jyRef.current
    const cols = colsRef.current, rows = rowsRef.current
    if (!ctx || !heat || !cx || !cy || !jx || !jy) return

    const w = ctx.canvas.clientWidth
    const h = ctx.canvas.clientHeight

    // fond blanc pleine page
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    // time pour jitter léger
    const t = performance.now() / 1000

    // dessine UNIQUEMENT les cellules avec chaleur > 0
    const size = (val: number) => {
      // la marge augmente avec la chaleur → interstice visible
      // marge max ~ 30% de la cellule
      const margin = (0.3 * val) * cellSize
      return Math.max(0, cellSize - margin * 2)
    }

    const n = cols * rows
    for (let i = 0; i < n; i++) {
      const a = heat[i]
      if (a <= 0) continue

      const s = size(a)
      // offset subtil (respiration)
      const ox = Math.sin(t * 2 + jx[i]) * a * 1.4
      const oy = Math.cos(t * 2 + jy[i]) * a * 1.4

      // couleur gris très clair, un peu plus sombre avec la chaleur
      const c = Math.round(250 - a * 25) // 250→225
      ctx.fillStyle = `rgb(${c},${c},${c})`

      ctx.fillRect(
        cx[i] - s / 2 + ox,
        cy[i] - s / 2 + oy,
        s,
        s
      )
    }
  }

  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}
