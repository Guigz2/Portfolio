'use client'

import { usePathname } from 'next/navigation'
import { HeaderHero } from './HeaderHero'
import { HeaderDefault } from './HeaderDefault'
import { HeaderMobile } from './HeaderMobile'

export default function HeaderSwitch() {
  const pathname = usePathname()
  if (pathname === '/') {
    return (
      <>
        <HeaderMobile /> 
        <HeaderHero />    
    </>
    )
  }
  return <HeaderDefault />
}

