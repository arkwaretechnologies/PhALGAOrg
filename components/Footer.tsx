import Link from 'next/link'
import Image from 'next/image'

const orgLinks = [
  { href: '/about', label: 'About PhALGA' },
  { href: '/about/officers', label: 'National Officers' },
  { href: '/about', label: 'Council of Advisers' },
  { href: '/about', label: 'Past Presidents' },
]

const programLinks = [
  { href: '/events', label: 'Annual Conference' },
  { href: '/events', label: 'Geo Conferences' },
  { href: '/events', label: 'Seminars' },
  { href: '/downloads', label: 'Downloads' },
]

const resourceLinks = [
  { href: '/circulars', label: 'COA Circulars' },
  { href: '/circulars', label: 'DILG Memoranda' },
  { href: '/circulars', label: 'DBM Updates' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Footer() {
  return (
    <footer className="bg-ph-text text-white/70">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 no-underline">
              <div className="relative w-11 h-11 flex-shrink-0 rounded-[10px] overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="PhALGA"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <strong className="font-display text-xl font-bold text-white leading-none tracking-wide">PhALGA</strong>
                <small className="text-[10px] font-medium text-white/50 tracking-[0.02em] leading-tight">(Philippine Association of Local Government Accountants), Inc.</small>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-[280px]">
              PhALGA (Philippine Association of Local Government Accountants), Inc. — advancing professionalism and accountability in local governance across the Philippines.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-ph-gold mb-5">Organization</h5>
            <ul className="list-none">
              {orgLinks.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link href={link.href} className="text-sm text-white/55 no-underline transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-ph-gold mb-5">Programs</h5>
            <ul className="list-none">
              {programLinks.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link href={link.href} className="text-sm text-white/55 no-underline transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-ph-gold mb-5">Resources</h5>
            <ul className="list-none">
              {resourceLinks.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link href={link.href} className="text-sm text-white/55 no-underline transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <p className="text-[13px] text-white/35" suppressHydrationWarning>
            © {new Date().getFullYear()} PhALGA (Philippine Association of Local Government Accountants), Inc. All rights reserved.
          </p>
          <div className="flex overflow-hidden rounded h-4 w-12">
            <div className="flex-1 bg-ph-blue" />
            <div className="flex-1 bg-ph-red" />
          </div>
        </div>
      </div>
    </footer>
  )
}
