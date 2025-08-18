'use client'

import Link from 'next/link'

export function HeaderDefault() {

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="/" className="font-bold uppercase tracking-wide">
          <span 
          className="transition-colors duration-300 text-black text-6xl">
            Guillaume EGU</span>
        </Link>

        <Link href="/" className="font-bold uppercase tracking-wide">
          <span className="transition-colors duration-300 text-black text-3xl">
            Portfolio</span>
        </Link>
      </div>
    </header>
  )
}