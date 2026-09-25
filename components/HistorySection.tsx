'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { milestones } from '@/lib/content'
import { BlurFade } from '@/components/ui/blur-fade'
import { RevealHeading } from '@/components/ui/reveal-heading'

// The four 2004 milestones, from the first meeting to SEC registration
const founding = milestones.slice(2)

export default function HistorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 90, damping: 24 })

  return (
    <section className="relative overflow-hidden bg-ph-mist py-24 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden
        src="/assets/rosette-gold.svg"
        alt=""
        className="pointer-events-none absolute -right-48 top-1/2 w-[640px] max-w-none -translate-y-1/2 opacity-[0.18]"
      />
      <div className="container-site relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <BlurFade>
              <p className="eyebrow">Our history</p>
            </BlurFade>
            <RevealHeading
              className="display-title mt-5"
              parts={[
                'Born in Calamba,',
                { text: 'August 21, 2004.', className: 'italic font-medium text-ph-gold-deep' },
              ]}
            />
            <BlurFade delay={0.15}>
              <p className="lede mt-5">
                Provincial associations in Batangas, Laguna and Cavite led the way. Within three months, a long-envisioned
                national association of local government accountants was organised, elected and registered.
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={0.2}>
            <Link href="/about" className="btn-outline group shrink-0">
              The full story
              <ArrowRight className="arrow-nudge h-4 w-4" />
            </Link>
          </BlurFade>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Rail — horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-[7px] top-2 h-full w-px bg-ph-ink/10 lg:left-0 lg:top-[7px] lg:h-px lg:w-full" />
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-ph-gold lg:block"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-ph-gold lg:hidden"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {founding.map((m, i) => (
              <BlurFade as="li" key={m.date} delay={0.1 + i * 0.12} className="relative pl-10 lg:pl-0 lg:pt-12">
                <span className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-ph-gold bg-ph-mist lg:top-0">
                  <span className="h-[5px] w-[5px] rounded-full bg-ph-gold" />
                </span>
                <p className="font-display text-[15px] italic text-ph-gold-deep">{m.date}</p>
                <h3 className="mt-2 font-display text-[20px] font-semibold leading-snug text-ph-ink">{m.title}</h3>
                <p className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-ph-muted">{m.text}</p>
              </BlurFade>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
