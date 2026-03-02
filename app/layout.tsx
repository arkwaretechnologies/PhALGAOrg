import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeUpObserver from '@/components/FadeUpObserver'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'PhALGA (Philippine Association of Local Government Accountants), Inc.',
    template: '%s | PhALGA',
  },
  description: 'PhALGA (Philippine Association of Local Government Accountants), Inc. — empowering LGU accounting professionals across the archipelago through education, fellowship, and advocacy.',
  keywords: ['Philippines', 'Local Government', 'Accountants', 'PhALGA', 'Government Accounting', 'LGU'],
  authors: [{ name: 'PhALGA' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://phalga.org',
    siteName: 'PhALGA',
    title: 'PhALGA (Philippine Association of Local Government Accountants), Inc.',
    description: 'The Philippine Association of Local Government Accountants — empowering LGU accounting professionals across the archipelago.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans">
        <Navbar />
        <FadeUpObserver />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
