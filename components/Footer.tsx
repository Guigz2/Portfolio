import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 items-start">
        <div>
          <h3 className="text-lg font-semibold">Disponible pour missions</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Front + Motion avec Next.js & GSAP</p>
        </div>
        <div>
          <p className="text-sm">Écris-moi :</p>
          <Link href="mailto:hello@example.com" className="underline">hello@example.com</Link>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="#" className="underline">LinkedIn</Link>
          <Link href="#" className="underline">GitHub</Link>
          <Link href="#" className="underline">Dribbble</Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-neutral-500">© {new Date().getFullYear()} — Tous droits réservés.</div>
    </footer>
  )
}