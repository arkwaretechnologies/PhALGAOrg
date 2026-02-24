import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'PHALGA - Philippine Association of Local Government Accountants',
    template: '%s | PHALGA',
  },
  description: 'The Philippine Association of Local Government Accountants (PHALGA) - Supporting and empowering local government accountants across the Philippines.',
  keywords: ['Philippines', 'Local Government', 'Accountants', 'PHALGA', 'Government Accounting', 'LGU'],
  authors: [{ name: 'PHALGA' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://phalga.org',
    siteName: 'PHALGA',
    title: 'PHALGA - Philippine Association of Local Government Accountants',
    description: 'The Philippine Association of Local Government Accountants (PHALGA) - Supporting and empowering local government accountants across the Philippines.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHALGA - Philippine Association of Local Government Accountants',
    description: 'The Philippine Association of Local Government Accountants (PHALGA) - Supporting and empowering local government accountants across the Philippines.',
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
