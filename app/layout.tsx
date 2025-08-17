import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Mon Portfolio',
  description: 'Portfolio inspiré OFF ESCAC – Next.js + GSAP',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}