'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { RevealHeading } from '@/components/ui/reveal-heading'

export type SubpageLayoutProps = {
  title: string
  titleAccent?: string
  subtitle?: string
  eyebrow?: string
  children: React.ReactNode
}

const labels: Record<string, string> = {
  about: 'About',
  officers: 'National Officers',
  'past-presidents': 'Past Presidents',
  archives: 'Archives',
  events: 'Events',
  downloads: 'Downloads',
  circulars: 'Circulars',
  contact: 'Contact',
  login: 'Member Login',
}

const ease = [0.22, 1, 0.36, 1] as const

export default function SubpageLayout({ title, titleAccent, subtitle, eyebrow, children }: SubpageLayoutProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => ({
    href: '/' + segments.slice(0, i + 1).join('/'),
    label: labels[seg] ?? seg,
  }))

  return (
    <div className="bg-ph-paper">
      <section className="relative overflow-hidden bg-ph-navy-deep text-white">
        <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/waves-light.svg')] bg-[length:1600px_600px] bg-bottom bg-repeat-x opacity-[0.07]" />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[700px] rounded-full bg-ph-brand/35 blur-[140px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          aria-hidden
          src="/assets/rosette-light.svg"
          alt=""
          initial={{ opacity: 0, rotate: -20, scale: 0.9 }}
          animate={{ opacity: 0.13, rotate: 0, scale: 1 }}
          transition={{ duration: 1.8, ease }}
          className="pointer-events-none absolute -right-48 top-1/2 w-[720px] max-w-none -translate-y-1/2"
        />

        <div className="container-site relative pb-20 pt-10 lg:pb-28 lg:pt-12">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-white/55">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ph-gold-light">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="mt-14 max-w-3xl lg:mt-20">
            {eyebrow && (
              <motion.p
                className="eyebrow eyebrow-light"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                {eyebrow}
              </motion.p>
            )}
            <RevealHeading
              as="h1"
              immediate
              delay={0.15}
              className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[3.4rem] lg:text-[4.25rem]"
              parts={[title, ...(titleAccent ? [{ text: titleAccent, className: 'italic font-medium text-ph-gold-light' }] : [])]}
            />
            {subtitle && (
              <motion.p
                className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70"
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.4, ease }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* Flag hairline closing the header */}
        <motion.div
          aria-hidden
          className="relative flex h-[3px] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          <span className="flex-1 bg-ph-brand" />
          <span className="flex-1 bg-ph-crimson" />
          <span className="w-24 bg-ph-sun" />
        </motion.div>
      </section>
      {children}
    </div>
  )
}
