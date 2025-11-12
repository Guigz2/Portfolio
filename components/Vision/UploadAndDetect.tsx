"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'

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

  const drawBoxes = useCallback(() => {
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    if (!boxes || !origSize || boxes.length === 0) return
    const rect = img.getBoundingClientRect()
    const displayW = rect.width
    const displayH = rect.height
    // Handle high DPI for mobile (crisp drawing)
    const dpr = window.devicePixelRatio || 1
    canvas.style.width = displayW + 'px'
    canvas.style.height = displayH + 'px'
    canvas.width = Math.round(displayW * dpr)
    canvas.height = Math.round(displayH * dpr)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, displayW, displayH)
    const scaleX = displayW / origSize.w
    const scaleY = displayH / origSize.h
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
      const textW = ctx.measureText(label).width + 8
      const textX = x
      const textY = Math.max(0, y - 16)
      ctx.fillStyle = '#22c55e'
      ctx.fillRect(textX, textY, textW, 16)
      ctx.fillStyle = '#0a0a0a'
      ctx.fillText(label, textX + 4, textY + 12)
    })
  }, [boxes, origSize])

  // Redraw on boxes update
  useEffect(() => { drawBoxes() }, [drawBoxes])

  // Redraw when image loads (mobile sometimes had 0 size during first effect)
  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const handleLoad = () => drawBoxes()
    img.addEventListener('load', handleLoad)
    return () => img.removeEventListener('load', handleLoad)
  }, [drawBoxes])

  // Redraw on resize (orientation change, viewport resize on mobile)
  useEffect(() => {
    const onResize = () => drawBoxes()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [drawBoxes])

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
        {boxes && boxes.length > 0 && !error && (
          <p className="text-xs text-neutral-500">{boxes.length} objet(s) détecté(s).</p>
        )}
      </div>
    </section>
  )
}
