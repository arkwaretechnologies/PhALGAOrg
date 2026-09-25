import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { site } from '@/lib/site'
import BackToTop from '@/components/BackToTop'

const columns = [
  {
    title: 'Association',
    links: [
      { href: '/about', label: 'About PhALGA' },
      { href: '/about/officers', label: 'National Officers' },
      { href: '/about/past-presidents', label: 'Past Presidents' },
      { href: '/about/archives', label: 'Archives' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { href: '/events', label: 'Annual National Conference' },
      { href: '/events', label: 'Geographical Conferences' },
      { href: '/downloads', label: 'Conference Materials' },
      { href: '/login', label: 'Member Login' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/circulars', label: 'COA Circulars' },
      { href: '/circulars', label: 'DILG Memoranda' },
      { href: '/circulars', label: 'DBM & BIR Updates' },
      { href: '/contact', label: 'Contact the Secretariat' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ph-navy-deep text-white/65">
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden
        src="/assets/rosette-light.svg"
        alt=""
        className="pointer-events-none absolute -right-64 -top-40 w-[900px] max-w-none opacity-[0.07]"
      />

      <div className="container-site relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.3fr_2fr] lg:gap-20 lg:py-20">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <span className="flex h-14 w-16 items-center justify-center rounded-xl bg-white p-1.5">
                <Image src="/logo.png" alt="" width={56} height={46} className="object-contain" />
              </span>
              <span>
                <span className="block font-display text-2xl font-semibold text-white">PhALGA</span>
                <span className="mt-0.5 block text-[12px] text-white/50">Established {site.founded}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/60">
              The {site.legalName} — advancing professionalism, transparency and accountability in local financial
              governance across the Philippines.
            </p>
            <ul className="mt-8 space-y-3 text-[14px]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ph-gold-light" strokeWidth={1.8} />
                <span>{site.office.join(', ')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ph-gold-light" strokeWidth={1.8} />
                <a href={`mailto:${site.email}`} className="link-underline text-white/80 hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ph-gold-light">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[14px] text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 py-7 text-[12.5px] text-white/45 sm:flex-row sm:items-center">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.legalName} · SEC Reg. No. {site.secRegistration}
          </p>
          <div className="flex items-center gap-5">
            <span aria-hidden className="flex h-1.5 w-14 overflow-hidden rounded-full">
              <span className="flex-1 bg-ph-brand" />
              <span className="flex-1 bg-ph-crimson" />
              <span className="w-3 bg-ph-sun" />
            </span>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
