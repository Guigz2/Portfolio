'use client'

import { usePathname } from 'next/navigation'
import { HeaderHero } from './HeaderHero'
import { HeaderDefault } from './HeaderDefault'

export default function HeaderSwitch() {
  const pathname = usePathname()
  return pathname === '/' ? <HeaderHero /> : <HeaderDefault />
}
