import './globals.css'
import type { Metadata } from 'next'
import { Footer } from '@/components/HBF/Footer'
import BottomNav from '@/components/HBF/BottomNav'
import HeaderSwitch from '@/components/HBF/HeaderSwitch'

export const metadata: Metadata = {
  title: 'Guillaume EGU',
  description: 'Portfolio de Guillaume EGU a but de présentation professionnelle',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-black transition-colors duration-300">
        <HeaderSwitch />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}