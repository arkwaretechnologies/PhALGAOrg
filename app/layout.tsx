import type { Metadata, Viewport } from 'next'
import { Source_Serif_4, Public_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://phalga.org'),
  title: {
    default: 'PhALGA (Philippine Association of Local Government Accountants), Inc.',
    template: '%s | PhALGA',
  },
  description:
    'PhALGA (Philippine Association of Local Government Accountants), Inc. — empowering LGU accounting professionals across the archipelago through education, fellowship, and advocacy.',
  keywords: ['Philippines', 'Local Government', 'Accountants', 'PhALGA', 'Government Accounting', 'LGU'],
  authors: [{ name: 'PhALGA' }],
  icons: { icon: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://phalga.org',
    siteName: 'PhALGA',
    title: 'PhALGA (Philippine Association of Local Government Accountants), Inc.',
    description:
      'The Philippine Association of Local Government Accountants — empowering LGU accounting professionals across the archipelago.',
    images: ['/officer2025-2026 main bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0B2A5B',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-ph-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
