'use client'

import { useEffect, useRef } from 'react'

type Props = {
  cellSize?: number
  radius?: number
  intensity?: number
  /** 'multiply' (assombrit) | 'screen' (éclaircit) | 'overlay' (contraste) */
  blendMode?: 'multiply' | 'screen' | 'overlay'
  /** 0..1 quantité de teinte appliquée dans les zones actives */
  strength?: number
  className?: string
}

export default function PixelOverlayBlend({
  cellSize = 28,
  radius = 220,
  intensity = 0.9,
  blendMode = 'multiply', // par défaut on assombrit
  strength = 0.35,
  className = '',
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef<number | null>(null)

  const colsRef = useRef(0)
  const rowsRef = useRef(0)
  const heatRef = useRef<Float32Array | null>(null)
  const cxRef = useRef<Float32Array | null>(null)
  const cyRef = useRef<Float32Array | null>(null)
  const jxRef = useRef<Float32Array | null>(null)
  const jyRef = useRef<Float32Array | null>(null)

  const resize = () => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const rect = root.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctxRef.current = ctx

    const cols = Math.ceil(rect.width / cellSize)
    const rows = Math.ceil(rect.height / cellSize)
    colsRef.current = cols
    rowsRef.current = rows

    const n = cols * rows
    heatRef.current = new Float32Array(n)
    cxRef.current = new Float32Array(n)
    cyRef.current = new Float32Array(n)
    jxRef.current = new Float32Array(n)
    jyRef.current = new Float32Array(n)

    let k = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++, k++) {
        cxRef.current![k] = c * cellSize + cellSize / 2
        cyRef.current![k] = r * cellSize + cellSize / 2
        jxRef.current![k] = Math.random() * Math.PI * 2
        jyRef.current![k] = Math.random() * Math.PI * 2
      }
    }
  }

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    resize()
    const ro = new ResizeObserver(resize)
    if (rootRef.current) ro.observe(rootRef.current)
    window.addEventListener('resize', resize)

    let lastX = -1e6, lastY = -1e6, lastT = performance.now()
    const onMove = (e: PointerEvent) => {
      const root = rootRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const t = performance.now()
      const dt = Math.max(1, t - lastT) / 1000
      const dx = x - lastX, dy = y - lastY
      const speed = Math.hypot(dx, dy) / dt
      lastX = x; lastY = y; lastT = t

      injectHeat(x, y, speed)
    }
    const onLeave = () => {
      lastX = -1e6; lastY = -1e6
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    const loop = () => {
      step()
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellSize, radius, intensity, strength, blendMode])

  const injectHeat = (px: number, py: number, speed: number) => {
    const heat = heatRef.current, cx = cxRef.current, cy = cyRef.current
    if (!heat || !cx || !cy) return
    const rad2 = radius * radius
    const sK = Math.min(1, speed / 1500)
    for (let i = 0; i < heat.length; i++) {
      const dx = cx[i] - px, dy = cy[i] - py
      const d2 = dx*dx + dy*dy
      if (d2 < rad2) {
        const g = Math.exp(-d2 / (2 * rad2 * 0.35))
        heat[i] = Math.min(1, heat[i] + g * (0.4 + 0.6*sK) * intensity)
      }
    }
  }

  const step = () => {
    const heat = heatRef.current
    if (!heat) return
    for (let i = 0; i < heat.length; i++) {
      heat[i] *= 0.92
      if (heat[i] < 0.004) heat[i] = 0
    }
  }

  const draw = () => {
    const ctx = ctxRef.current
    const heat = heatRef.current
    const cx = cxRef.current, cy = cyRef.current
    const jx = jxRef.current, jy = jyRef.current
    const cols = colsRef.current
    if (!ctx || !heat || !cx || !cy || !jx || !jy) return

    const w = ctx.canvas.clientWidth
    const h = ctx.canvas.clientHeight
    ctx.clearRect(0, 0, w, h) // transparent → blend avec le fond

    const t = performance.now() / 1000

    // couleur selon le mode choisi
    // multiply: on dessine en noir semi-transparent (assombrit)
    // screen:   on dessine en blanc semi-transparent (éclaircit)
    // overlay:  on peut dessiner gris moyen, mais restons noir par défaut (contraste)
    const isLighten = blendMode === 'screen'
    const baseRGB = isLighten ? [255, 255, 255] : [0, 0, 0]

    const size = (a: number) => {
      // plus la chaleur est grande, plus le carré est gros (ou l’inverse, au choix)
      const margin = 0.35 * a * cellSize
      return Math.max(0, cellSize - margin * 2)
    }

    for (let i = 0; i < heat.length; i++) {
      const a = heat[i]
      if (a <= 0) continue

      const s = size(a)
      const ox = Math.sin(t * 2 + jx[i]) * a * 1.2
      const oy = Math.cos(t * 2 + jy[i]) * a * 1.2

      const alpha = Math.min(1, 0.08 + strength * a) // quantité de teinte
      const [r, g, b] = baseRGB
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
      ctx.fillRect(cx[i] - s / 2 + ox, cy[i] - s / 2 + oy, s, s)
    }
  }

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none ${className}`}
      // applique le blend mode au canvas via style héritée du wrapper
      style={{ mixBlendMode: blendMode }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
