import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-neutral-100">
      <div className="mx-auto max-w-screen-xl px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start text-center md:text-left">
        {/* Bloc 1 */}
        <div>
          <h3 className="text-lg font-semibold">Disponible pour missions</h3>
          <p className="text-sm text-neutral-300 mt-2">
            Front + Motion avec Next.js &amp; GSAP
          </p>
        </div>

        {/* Bloc 2 */}
        <div>
          <p className="text-sm text-neutral-300">Écris-moi :</p>
          <Link
            href="mailto:guillaume.egu@gmail.com"
            className="mt-2 inline-flex items-center justify-center md:justify-start rounded-md px-3 py-2 text-sm ring-1 ring-white/20 hover:ring-white/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            guillaume.egu@gmail.com
          </Link>
        </div>

        {/* Bloc 3 */}
        <div>
          <p className="text-sm text-neutral-300">Connectons-nous :</p>
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <Link
              href="https://www.linkedin.com/in/guillaume-egu-970461256/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm ring-1 ring-white/20 hover:ring-white/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Ouvrir mon LinkedIn dans un nouvel onglet"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Guigz2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm ring-1 ring-white/20 hover:ring-white/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Ouvrir mon GitHub dans un nouvel onglet"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 pb-8 text-center md:text-left text-xs text-neutral-400">
        © {new Date().getFullYear()} — Tous droits réservés.
      </div>
    </footer>
  )
}
