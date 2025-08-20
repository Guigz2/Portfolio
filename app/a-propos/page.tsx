import AnalogClock from "@/components/AnalogClock"
import PixelBackground from "@/components/PixelBackground"

export const dynamic = 'force-static'

export default function AProposPage() {
  return (
    <>
      {/* Fond interactif */}
      <PixelBackground cellSize={56} radius={50} intensity={0.9} />

    <section className="mx-auto max-w-3xl px-4 py-16">
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
    </section>

    <AnalogClock />
    </>
  )
}