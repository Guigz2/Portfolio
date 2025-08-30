'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HeaderHero } from './HeaderHero'
import { HeaderDefault } from './HeaderDefault'
import { HeaderMobile } from './HeaderMobile'

// petit hook pratique pour vérifier une media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export default function HeaderSwitch() {
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)') // breakpoint à ajuster

  if (isMobile) {
    // Sur mobile, toujours HeaderMobile
    return <HeaderMobile />
  }

  // Sur desktop
  if (pathname === '/') {
    return <HeaderHero />
  }

  return <HeaderDefault />
}
