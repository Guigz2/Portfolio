import './globals.css'
import type { Metadata } from 'next'
import { Footer } from '@/components/HBF/Footer'
import BottomNav from '@/components/HBF/BottomNav'
import HeaderSwitch from '@/components/HBF/HeaderSwitch'

export const metadata: Metadata = {
  title: 'Mon Portfolio',
  description: 'Portfolio inspiré OFF ESCAC – Next.js + GSAP',
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