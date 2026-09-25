'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { OfficerFromFile, OfficerGroup } from '@/lib/officers'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'

const groups: { id: OfficerGroup; title: string; kicker: string }[] = [
  { id: 'president', title: 'National President', kicker: 'Leadership' },
  { id: 'vice-presidents', title: 'Vice Presidents', kicker: 'Executive & regional' },
  { id: 'secretariat', title: 'Executive Officers', kicker: 'Secretariat' },
  { id: 'trustees', title: 'Board of Trustees', kicker: 'Governance' },
  { id: 'advisers', title: 'Council of Advisers', kicker: 'Counsel' },
]

const src = (o: OfficerFromFile) => `/Officers/${o.year}/${o.filename}`

export default function OfficersChart({ officers }: { officers: OfficerFromFile[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const open = openIndex === null ? null : officers[openIndex]

  const close = useCallback(() => {
    setOpenIndex(null)
    lastTrigger.current?.focus()
  }, [])
  const step = useCallback(
    (d: number) => setOpenIndex((i) => (i === null ? i : (i + d + officers.length) % officers.length)),
    [officers.length]
  )

  useEffect(() => {
    if (openIndex === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIndex, close, step])

  return (
    <>
      <div className="space-y-20 lg:space-y-24">
        {groups.map((g) => {
          const members = officers.filter((o) => o.group === g.id)
          if (members.length === 0) return null
          const isLead = g.id === 'president'
          return (
            <section key={g.id} aria-labelledby={`tier-${g.id}`}>
              <BlurFade className="mb-10 flex flex-col items-center text-center">
                <p className="eyebrow">{g.kicker}</p>
                <h2 id={`tier-${g.id}`} className="mt-4 font-display text-[1.9rem] font-semibold tracking-[-0.01em] text-ph-ink sm:text-[2.2rem]">
                  {g.title}
                </h2>
              </BlurFade>

              <ul className="flex flex-wrap justify-center gap-6">
                {members.map((o, i) => (
                  <BlurFade
                    as="li"
                    key={o.filename}
                    delay={i * 0.06}
                    className={cn(
                      'w-full',
                      isLead ? 'max-w-3xl' : 'sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                    )}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTrigger.current = e.currentTarget
                        setOpenIndex(officers.indexOf(o))
                      }}
                      className="group block w-full text-left"
                      aria-label={`Enlarge portrait of ${o.name}, ${o.position}`}
                    >
                      <motion.div
                        layoutId={`officer-${o.filename}`}
                        className={cn(
                          'relative overflow-hidden rounded-2xl bg-ph-navy shadow-card ring-1 ring-ph-ink/5 transition-shadow duration-500 group-hover:shadow-lift',
                          isLead && 'rounded-3xl'
                        )}
                      >
                        <Image
                          src={src(o)}
                          alt=""
                          width={1920}
                          height={1080}
                          sizes={isLead ? '(max-width: 768px) 100vw, 768px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'}
                          priority={isLead}
                          className="aspect-video h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <span className="absolute right-3 top-3 flex h-8 w-8 scale-90 items-center justify-center rounded-full bg-white/90 text-ph-navy opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </span>
                      </motion.div>
                      <div className={cn('mt-4 px-1', isLead && 'text-center')}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ph-gold-deep">{o.position}</p>
                        <p className={cn('mt-1 font-display font-semibold text-ph-ink', isLead ? 'text-[24px]' : 'text-[17px]')}>
                          {o.name}
                        </p>
                        {o.lgu && <p className="mt-0.5 text-[13.5px] text-ph-muted">{o.lgu}</p>}
                      </div>
                    </button>
                  </BlurFade>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${open.name}, ${open.position}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-ph-navy-deep/85 backdrop-blur-md"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="relative w-full max-w-5xl">
              <motion.div layoutId={`officer-${open.filename}`} className="overflow-hidden rounded-3xl shadow-2xl">
                <Image src={src(open)} alt={`${open.name}, ${open.position}`} width={1920} height={1080} sizes="(max-width: 1024px) 100vw, 1024px" className="h-auto w-full" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-5 flex items-center justify-between gap-4 text-white"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ph-gold-light">{open.position}</p>
                  <p className="mt-1 truncate font-display text-[20px] font-semibold">{open.name}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous officer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next officer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ph-navy transition-transform hover:scale-105">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
