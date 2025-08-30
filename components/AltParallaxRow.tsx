'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsapClient'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

type Row = {
  side: 'image-left' | 'image-right'
  image: { src: string; alt: string }
  title: string
  text: string
}

type Props = Row & {
  /** amplitude relative de l’image (↑ = plus de mouvement) */
  depthImg?: number
  /** amplitude relative du texte */
  depthText?: number
  /** compacter la mise en page (espaces plus serrés) */
  compact?: boolean
  /** aspect-ratio CSS, ex '4 / 5', '16 / 10' */
  aspect?: string
  /** ajouter un léger chevauchement vertical entre les lignes (px, ex:  -16) */
  overlapY?: number
}

export default function AltParallaxRow({
  side,
  image,
  title,
  text,
  depthImg = 1.6,   // ↑ par défaut pour plus de mouvement
  depthText = 0.8,
  compact = true,   // serré par défaut
  aspect = '4 / 5',
  overlapY = -12,   // léger chevauchement (raccroche visuellement)
}: Props) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const imgWrapRef = useRef<HTMLDivElement | null>(null) 
  const copyRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const row = rowRef.current
    const imgWrap = imgWrapRef.current
    const copy = copyRef.current
    if (!row || !imgWrap || !copy) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      // états init
      gsap.set(imgWrap, { yPercent: -10, scale: 1.02 }) // image démarre un peu “au-dessus” + min zoom
      gsap.set(copy, { yPercent: 6, opacity: 0.001 })

      // Parallaxe + zoom progressif de l’image
      gsap.to(imgWrap, {
        yPercent: 24 * depthImg,      // ⬅️ plus d’amplitude
        scale: 1.12,                  // ⬅️ petit zoom le long du scroll
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Parallaxe + fade du texte
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
        },
      })
      tl.to(copy, { yPercent: -10 * depthText, opacity: 1, duration: 0.6, ease: 'power2.out' })
    }, row)

    return () => ctx.revert()
  }, [depthImg, depthText])

  const gaps = compact ? 'gap-6 md:gap-10' : 'gap-10 md:gap-16'
  const pads = compact ? 'py-12 md:py-16' : 'py-16 md:py-28'

  return (
    <div
      ref={rowRef}
      className={clsx(
        'grid items-center md:grid-cols-12',
        gaps,
        pads,
      )}
      style={{ marginTop: overlapY }} // ⬅️ serre verticalement les blocs
    >
      {/* IMAGE */}
      <div
        className={clsx(
          side === 'image-left' ? 'md:col-span-7 order-1' : 'md:col-span-7 md:col-start-6 order-2',
          'relative'
        )}
      >
        <div
          ref={imgWrapRef}
          className="relative w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 will-change-transform"
          style={{ aspectRatio: aspect }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover select-none pointer-events-none"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 100vw"
            priority={false}
          />
        </div>
      </div>

      {/* TEXTE */}
      <div
        ref={copyRef}
        className={clsx(
          side === 'image-left' ? 'md:col-span-5 md:col-start-9 order-2' : 'md:col-span-5 order-1',
          'will-change-transform'
        )}
      >
        <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
        <p className="mt-3 text-neutral-700 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
