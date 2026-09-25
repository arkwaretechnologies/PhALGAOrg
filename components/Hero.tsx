'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpenText, FileText, Landmark } from 'lucide-react'

/** Intrinsic size of `officer2025-2026 main bg.jpg` — used for aspect ratio only. */
const HERO_WIDTH = 1920
const HERO_HEIGHT = 667

const notices = [
  {
    icon: BookOpenText,
    tag: 'New',
    title: '20th Annual National Conference',
    desc: 'Lectures and resources are now available to download.',
    href: '/downloads',
  },
  {
    icon: FileText,
    tag: 'Circulars',
    title: 'Latest COA Circulars',
    desc: 'Commission on Audit updates and guidelines for LGUs.',
    href: '/circulars',
  },
  {
    icon: Landmark,
    tag: 'Materials',
    title: '17th Geographical Conferences',
    desc: 'Presentation decks from Luzon, Visayas and Mindanao.',
    href: '/downloads',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="relative bg-ph-paper">
      {/* The photograph: always shown in full, never cropped */}
      <div className="relative overflow-hidden bg-[#57524e]">
        <motion.div
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease }}
          className="relative leading-none"
        >
          <Image
            src="/officer2025-2026 main bg.jpg"
            alt="The 2025–2026 PhALGA National Officers in formal Filipiniana attire, beneath the words Welcome to PhALGA"
            width={HERO_WIDTH}
            height={HERO_HEIGHT}
            className="block h-auto w-full"
            priority
            quality={90}
            sizes="100vw"
          />
        </motion.div>

        {/* One slow champagne light sweep as the page settles */}
        <motion.div
          aria-hidden
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{ duration: 2.4, delay: 0.5, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,transparent_35%,rgba(255,236,200,0.18)_50%,transparent_65%)]"
        />
      </div>

      {/* Intro — the photo's own caption is too small to read on phones */}
      <div className="container-site pt-10 md:hidden">
        <p className="eyebrow">Established 2004</p>
        <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ph-ink">
          Welcome to <span className="italic text-ph-gold-deep">PhALGA</span>
        </h1>
        <p className="lede mt-4">
          Empowering LGU accounting professionals across the archipelago through education, fellowship, and advocacy.
        </p>
      </div>
      {/* On wider screens the photo carries the headline; keep one h1 for assistive tech */}
      <h1 className="sr-only hidden md:block">
        Welcome to PhALGA — Philippine Association of Local Government Accountants, Inc.
      </h1>

      {/* Notice board */}
      <div className="container-site relative z-10 pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="grid overflow-hidden rounded-3xl border border-ph-line bg-white shadow-lift md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]"
        >
          <div className="relative flex flex-col justify-between overflow-hidden bg-ph-navy p-7 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              src="/assets/rosette-light.svg"
              alt=""
              className="pointer-events-none absolute -bottom-24 -right-24 w-72 max-w-none opacity-[0.14]"
            />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ph-gold-light">Notice Board</p>
              <p className="mt-3 font-display text-[22px] font-medium leading-snug">From the Secretariat</p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-2 text-[12px] text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ph-sun opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ph-sun" />
              </span>
              Recently updated
            </span>
          </div>

          <ul className="grid divide-y divide-ph-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {notices.map((n, i) => (
              <motion.li
                key={n.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease }}
              >
                <Link href={n.href} className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-ph-mist lg:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ph-mist text-ph-navy transition-colors duration-300 group-hover:bg-ph-navy group-hover:text-white">
                      <n.icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                    </span>
                    <span className="rounded-full border border-ph-gold/40 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ph-gold-deep">
                      {n.tag}
                    </span>
                  </div>
                  <h2 className="mt-5 text-[15.5px] font-semibold leading-snug text-ph-ink">{n.title}</h2>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ph-muted">{n.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-ph-navy">
                    View
                    <ArrowRight className="arrow-nudge h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
