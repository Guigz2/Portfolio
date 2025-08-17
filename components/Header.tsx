'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = pathname === href || (href !== '/' && pathname?.startsWith(href))
    return (
      <Link
        href={href}
        className={`px-3 py-2 text-sm md:text-base transition-colors border-b-2 ${
          active ? 'border-current' : 'border-transparent hover:border-neutral-400 dark:hover:border-neutral-600'
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/40 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold uppercase tracking-wide">Mon Portfolio</Link>
        <nav className="flex items-center gap-1 md:gap-2">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/projets">Projets</NavLink>
          <NavLink href="/a-propos">À propos</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}