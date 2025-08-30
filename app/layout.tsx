import './globals.css'
import type { Metadata } from 'next'
import { Footer } from '@/components/HBF/Footer'
import BottomNav from '@/components/HBF/BottomNav'
import HeaderSwitch from '@/components/HBF/HeaderSwitch'

export const metadata: Metadata = {
  metadataBase: new URL('https://eguguillaume.com'),
  title: {
    default : 'Guillaume EGU',
    template : '%s | Guillaume EGU',
  },
  description: 'Portfolio de Guillaume EGU – Jeune diplomé en recherche d\'emploi dans le monde de la data science',
  applicationName: 'Guillaume EGU',
  authors: [{ name: 'Guillaume EGU', url: 'https://eguguillaume.com' }],
  generator: 'Next.js',
  keywords: [
    'Guillaume EGU', 
    'Portfolio', 
    'Data Scientist', 
    'Machine Learning', 
    'Python', 
    'SQL',  
    'Git', 
    'GitHub',
  ],
  creator: 'Guillaume EGU',
  publisher: 'Guillaume EGU',
  alternates: {
    canonical: "https://www.eguguillaume.com/",
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://eguguillaume.com',
    title: 'Guillaume EGU',
    siteName: "Guillaume EGU",
    description: 'Portfolio de Guillaume EGU – Jeune diplomé en recherche d\'emploi dans le monde de la data science',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Guillaume EGU',
      },
    ],
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview':  'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification: google0de347b8cf9d05b1.html',
  },
  category: 'portfolio',
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