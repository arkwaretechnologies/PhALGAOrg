'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, ChevronDown, LockKeyhole, Mail, Menu, X } from 'lucide-react'
import { aboutLinks, mainLinks, site } from '@/lib/site'
import { cn } from '@/lib/utils'

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="PhALGA home">
      <span className="relative flex h-10 w-12 shrink-0 items-center justify-center transition-transform duration-500 group-hover:rotate-[-4deg]">
        <Image src="/logo.png" alt="" width={48} height={40} className="object-contain" priority />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-[21px] font-semibold tracking-[-0.01em] text-ph-navy">PhALGA</span>
        {!compact && (
          <span className="mt-1 hidden truncate text-[10.5px] font-medium tracking-[0.02em] text-ph-muted sm:block">
            Philippine Association of Local Government Accountants
          </span>
        )}
      </span>
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 48))

  // Close menus on navigation
  useEffect(() => {
    setOpen(false)
    setAboutOpen(false)
  }, [pathname])

  // Lock page scroll behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const aboutActive = pathname.startsWith('/about')

  const openAbout = () => {
    clearTimeout(closeTimer.current)
    setAboutOpen(true)
  }
  const closeAbout = () => {
    closeTimer.current = setTimeout(() => setAboutOpen(false), 120)
  }

  const linkBase =
    'relative z-[1] flex items-center gap-1 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-200'

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ph-navy-deep text-white/70 md:block">
        <div className="container-site flex h-9 items-center justify-between text-[12px]">
          <p className="tracking-[0.02em]">
            <span className="text-ph-gold-light">Est. 2004</span>
            <span className="mx-3 text-white/25">|</span>
            SEC Reg. No. {site.secRegistration}
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
              {site.email}
            </a>
            <Link href="/login" className="flex items-center gap-2 transition-colors hover:text-white">
              <LockKeyhole className="h-3.5 w-3.5" strokeWidth={1.8} />
              Member Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={cn(
          'sticky top-0 z-[900] border-b transition-[background-color,border-color,box-shadow] duration-300',
          scrolled
            ? 'border-ph-line bg-ph-paper/85 shadow-[0_8px_30px_-18px_rgba(14,26,43,0.35)] backdrop-blur-xl'
            : 'border-transparent bg-ph-paper'
        )}
      >
        {/* Flag hairline */}
        <div aria-hidden className="flex h-[3px]">
          <span className="flex-1 bg-ph-brand" />
          <span className="flex-1 bg-ph-crimson" />
          <span className="w-16 bg-ph-sun" />
        </div>

        <nav
          className={cn(
            'container-site flex items-center justify-between transition-[height] duration-300',
            scrolled ? 'h-[64px]' : 'h-[76px]'
          )}
          aria-label="Main"
        >
          <Wordmark />

          <ul className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            <li className="relative" onMouseEnter={() => setHovered('/')}>
              <Link href="/" className={cn(linkBase, isActive('/') ? 'text-ph-navy' : 'text-ph-ink/75 hover:text-ph-ink')}>
                Home
              </Link>
              <NavPill show={hovered === '/'} />
              <ActiveMark show={isActive('/')} />
            </li>

            <li
              className="relative"
              onMouseEnter={() => {
                setHovered('about')
                openAbout()
              }}
              onMouseLeave={closeAbout}
            >
              <button
                type="button"
                className={cn(linkBase, aboutActive ? 'text-ph-navy' : 'text-ph-ink/75 hover:text-ph-ink')}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                onClick={() => setAboutOpen((v) => !v)}
                onKeyDown={(e) => e.key === 'Escape' && setAboutOpen(false)}
              >
                About
                <ChevronDown
                  className={cn('h-3.5 w-3.5 transition-transform duration-300', aboutOpen && 'rotate-180')}
                  strokeWidth={2}
                />
              </button>
              <NavPill show={hovered === 'about'} />
              <ActiveMark show={aboutActive} />

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full z-10 w-[340px] -translate-x-1/2 pt-3"
                    onFocus={openAbout}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setAboutOpen(false)
                    }}
                  >
                    <div className="overflow-hidden rounded-2xl border border-ph-line bg-white p-2 shadow-lift">
                      {aboutLinks.map((link, i) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * i + 0.04 }}
                        >
                          <Link
                            href={link.href}
                            className={cn(
                              'group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-ph-mist',
                              pathname === link.href && 'bg-ph-mist'
                            )}
                          >
                            <span>
                              <span className="block text-[14px] font-semibold text-ph-ink">{link.label}</span>
                              <span className="mt-0.5 block text-[12.5px] text-ph-muted">{link.description}</span>
                            </span>
                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ph-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {mainLinks.map((link) => (
              <li key={link.href} className="relative" onMouseEnter={() => setHovered(link.href)}>
                <Link
                  href={link.href}
                  className={cn(linkBase, isActive(link.href) ? 'text-ph-navy' : 'text-ph-ink/75 hover:text-ph-ink')}
                >
                  {link.label}
                </Link>
                <NavPill show={hovered === link.href} />
                <ActiveMark show={isActive(link.href)} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-primary group hidden !py-2.5 !text-[13.5px] lg:inline-flex">
              Contact Us
              <ArrowRight className="arrow-nudge h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ph-line bg-white text-ph-ink transition-colors hover:border-ph-navy lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'calc(100dvh - 67px)' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-y-auto border-t border-ph-line bg-ph-paper lg:hidden"
            >
              <motion.ul
                className="container-site flex flex-col py-6"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
              >
                {[{ href: '/', label: 'Home' }, ...aboutLinks, ...mainLinks, { href: '/contact', label: 'Contact Us' }].map(
                  (link) => (
                    <motion.li
                      key={link.href}
                      variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                      className="border-b border-ph-line"
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between py-4 font-display text-[22px] font-medium',
                          pathname === link.href ? 'text-ph-navy' : 'text-ph-ink'
                        )}
                      >
                        {link.label}
                        <ArrowRight className="h-5 w-5 text-ph-gold" />
                      </Link>
                    </motion.li>
                  )
                )}
                <motion.li variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="pt-6">
                  <Link href="/login" className="btn-primary w-full">
                    <LockKeyhole className="h-4 w-4" />
                    Member Login
                  </Link>
                  <p className="mt-6 text-center text-[12px] text-ph-muted">
                    SEC Reg. No. {site.secRegistration} · {site.email}
                  </p>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

/** Soft background that glides between nav items on hover (shared layout animation). */
function NavPill({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <motion.span
      layoutId="nav-hover"
      className="absolute inset-0 -z-0 rounded-full bg-ph-mist"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      style={{ position: 'absolute' }}
    />
  )
}

/** Small gold bar under the section the visitor is in. */
function ActiveMark({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <motion.span
      layoutId="nav-active"
      className="absolute -bottom-[10px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-ph-gold"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  )
}
