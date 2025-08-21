'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = pathname === href || (href !== '/' && pathname?.startsWith(href))
    return (
      <Link
        href={href}
        className={`px-3 py-2 text-sm md:text-base transition-colors border-b-2 border-t-2 ${
          active
            ? 'border-current'
            : 'border-transparent hover:border-neutral-400 dark:hover:border-neutral-600'
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center gap-1 rounded-full bg-black text-white px-6 py-1 backdrop-blur-md shadow-lg">
        <NavLink href="/">ACCUEIL</NavLink>
        <NavLink href="/projets">PROJETS</NavLink>
        <NavLink href="/a-propos">PORTRAIT</NavLink>
        <NavLink href="/contact">CONTACT</NavLink>
      </div>
    </nav>
  )
}
