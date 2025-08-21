import AnalogClock from "@/components/AnalogClock"
import PixelBackground from "@/components/PixelBackground"
import Image from "next/image"
import AlternatingShowcase from "@/components/AlternatingShowCase"

export const dynamic = "force-static"

export default function AProposPage() {
  return (
    <>
      <PixelBackground cellSize={56} radius={50} intensity={0.9} />

      <AlternatingShowcase />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          {/* Colonne image */}
          <figure className="md:col-span-5">
            {/* Boîte ratio pour permettre fill */}
            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-lg ring-1 ring-black/10">
              <Image
                src="/images/Portrait.jpg"
                alt="Portrait"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                priority
              />
            </div>
            <figcaption className="mt-3 text-sm text-neutral-500">
              Développeur front-end & motion — Paris.
            </figcaption>
          </figure>

          {/* Colonne texte */}
          <div className="md:col-span-7">
            <h1 className="text-4xl md:text-6xl font-bold uppercase">Portrait</h1>

            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              Développeur front-end & motion basé à Paris. J’aime concevoir des interfaces sobres et dynamiques,
              avec un focus performance, accessibilité et détail typographique.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500">Compétences clés</h2>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>Next.js (App Router), React, TypeScript</li>
                  <li>GSAP, ScrollTrigger, micro-interactions</li>
                  <li>UI/UX, design systèmes, prototypage</li>
                  <li>Performance (Core Web Vitals), SEO technique</li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500">Outils</h2>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>Figma, Framer Motion, WebGL (basics)</li>
                  <li>Tailwind CSS, Radix UI</li>
                  <li>Vite / Turbopack, PNPM/NPM</li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <a href="/cv.pdf" className="underline">Télécharger mon CV</a>
            </div>
          </div>
        </div>
      </section>

      <AnalogClock />
    </>
  )
}
