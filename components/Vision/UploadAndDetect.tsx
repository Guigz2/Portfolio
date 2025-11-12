"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'

type Box = { x1: number; y1: number; x2: number; y2: number; score?: number; cls?: number; label?: string }

export default function UploadAndDetect() {
  const [file, setFile] = useState<File | null>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [boxes, setBoxes] = useState<Box[] | null>(null)
  const [origSize, setOrigSize] = useState<{ w: number; h: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!file) {
      setImgUrl(null)
      setBoxes(null)
      setOrigSize(null)
      return
    }
    const url = URL.createObjectURL(file)
    setImgUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setBoxes(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/vision/detect', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erreur serveur')
      const b: Box[] = data.boxes || []
      setBoxes(b)
      setOrigSize({ w: data.width, h: data.height })
    } catch (e: any) {
      setError(e?.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  // Draw boxes when image and predictions are ready
  useEffect(() => {
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const w = img.clientWidth
      const h = img.clientHeight
      canvas.width = w
      canvas.height = h
      ctx.clearRect(0, 0, w, h)
      if (!boxes || !origSize) return
      const scaleX = w / origSize.w
      const scaleY = h / origSize.h
      ctx.lineWidth = 2
      ctx.font = '12px sans-serif'
      boxes.forEach((b) => {
        const x = b.x1 * scaleX
        const y = b.y1 * scaleY
        const bw = (b.x2 - b.x1) * scaleX
        const bh = (b.y2 - b.y1) * scaleY
        ctx.strokeStyle = '#22c55e'
        ctx.fillStyle = 'rgba(34,197,94,0.15)'
        ctx.strokeRect(x, y, bw, bh)
        ctx.fillRect(x, y, bw, bh)
        const label = `${b.label ?? 'obj'}${b.score != null ? ` ${(b.score * 100).toFixed(1)}%` : ''}`
        ctx.fillStyle = '#22c55e'
        ctx.fillRect(x, Math.max(0, y - 16), ctx.measureText(label).width + 8, 16)
        ctx.fillStyle = '#0a0a0a'
        ctx.fillText(label, x + 4, Math.max(10, y - 4))
      })
    }

    draw()
    const obs = new ResizeObserver(draw)
    obs.observe(img)
    return () => obs.disconnect()
  }, [boxes, origSize])

  return (
    <section className="mt-10">
      <h3 className="text-sm uppercase tracking-wide text-neutral-500 mb-3">Détection d'objets (YOLOv11)</h3>
      <div className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block"
        />
        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            disabled={!file || loading}
            className="border px-3 py-1 disabled:opacity-50"
          >
            {loading ? 'Analyse…' : 'Analyser la photo'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {imgUrl && (
          <div className="relative w-full max-w-2xl border border-neutral-200 dark:border-neutral-800">
            <img ref={imgRef} src={imgUrl} alt="entrée" className="w-full h-auto block" />
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
          </div>
        )}
      </div>
    </section>
  )
}
