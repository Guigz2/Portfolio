import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-black bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 items-start">
        <div>
          <h3 className="text-lg font-semibold">Disponible pour missions</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Front + Motion avec Next.js & GSAP</p>
        </div>
        <div>
          <p className="text-sm">Écris-moi :</p>
          <Link href="mailto:guillaume.egu@gmail.com" className="underline">guillaume.egu@gmail.com</Link>
        </div>
        <div>
          <p className="text-sm">Connectons-nous :</p>
          <div className="flex gap-4 text-sm">
            <Link href="https://www.linkedin.com/in/guillaume-egu-970461256/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</Link>
            <Link href="https://github.com/Guigz2" target="_blank" rel="noopener noreferrer" className="underline">GitHub</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-neutral-500">© {new Date().getFullYear()} — Tous droits réservés.</div>
    </footer>
  )
}