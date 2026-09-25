'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { EmptyState, FilterToolbar, GroupHeader, Highlight, slugify } from './SubpageFilter'
import { BlurFade } from '@/components/ui/blur-fade'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import type { EventSeries } from '@/lib/content'
import { cn } from '@/lib/utils'

export type { EventEntry, EventSeries } from '@/lib/content'

export default function EventsBrowser({ series }: { series: EventSeries[] }) {
  const [query, setQuery] = useState('')
  const [activeSeries, setActiveSeries] = useState<string | null>(null)

  const totalEvents = useMemo(() => series.reduce((sum, group) => sum + group.events.length, 0), [series])

  const visibleSeries = useMemo(() => {
    const q = query.trim().toLowerCase()

    return series
      .filter((group) => activeSeries === null || group.title === activeSeries)
      .map((group) => ({
        ...group,
        events: q
          ? group.events.filter(
              (event) =>
                event.title.toLowerCase().includes(q) ||
                event.location.toLowerCase().includes(q) ||
                event.date.toLowerCase().includes(q) ||
                event.badge.toLowerCase().includes(q) ||
                group.title.toLowerCase().includes(q)
            )
          : group.events,
      }))
      .filter((group) => group.events.length > 0)
  }, [series, query, activeSeries])

  const visibleCount = visibleSeries.reduce((sum, group) => sum + group.events.length, 0)
  const isFiltered = query.trim() !== '' || activeSeries !== null

  function resetFilters() {
    setQuery('')
    setActiveSeries(null)
  }

  return (
    <>
      <FilterToolbar
        layoutKey="events"
        total={totalEvents}
        visibleCount={visibleCount}
        isFiltered={isFiltered}
        unit="conferences"
        groupUnit="series"
        groupCount={series.length}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search by conference, city, or year…"
        searchLabel="Search events by conference, city, or year"
        chips={series.map((group) => ({ id: group.title, label: group.shortTitle, count: group.events.length }))}
        activeChip={activeSeries}
        onChipToggle={(id) => setActiveSeries((current) => (!id || current === id ? null : id))}
        chipGroupLabel="Filter by conference series"
      />

      <div className="container-site space-y-20 py-16 lg:py-24">
        {visibleSeries.length === 0 ? (
          <EmptyState
            query={query}
            onReset={resetFilters}
            hint="Try a city such as “Iloilo”, a region such as “Visayas”, or a year such as “2024”."
          />
        ) : (
          visibleSeries.map((group, gi) => (
            <section key={group.title} aria-labelledby={`ev-${slugify(group.title)}`}>
              <BlurFade>
                <GroupHeader
                  id={`ev-${slugify(group.title)}`}
                  kicker={group.kicker}
                  title={group.title}
                  description={group.description}
                  query={query}
                  count={group.events.length}
                />
              </BlurFade>

              <motion.div
                layout
                className={cn(
                  'mt-8 grid gap-5 sm:grid-cols-2',
                  group.events.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                )}
              >
                <AnimatePresence mode="popLayout">
                  {group.events.map((event, i) => {
                    const isTba = event.location.toLowerCase().includes('announce')
                    const featured = gi === 0 && i === 0 && !isFiltered && group.events.length > 1
                    return (
                      <motion.article
                        layout
                        key={event.title}
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(featured && 'lg:col-span-2')}
                      >
                        <Link
                          href={`/downloads?event=${encodeURIComponent(event.title)}`}
                          aria-label={`View materials from the ${event.title}`}
                          className="group block h-full"
                        >
                          <SpotlightCard className="flex h-full flex-col rounded-3xl border border-ph-line bg-white shadow-card transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lift">
                            <div className="relative overflow-hidden rounded-t-3xl bg-ph-navy px-7 pb-7 pt-6 text-white">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                aria-hidden
                                src="/assets/rosette-light.svg"
                                alt=""
                                className="pointer-events-none absolute -right-20 -top-24 w-72 max-w-none opacity-[0.14] transition-transform duration-[1.4s] ease-out group-hover:rotate-[20deg]"
                              />
                              <div className="relative flex items-start justify-between">
                                <span className="rounded-full border border-white/20 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ph-gold-light">
                                  {event.badge}
                                </span>
                                <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ph-gold-light" />
                              </div>
                              <span className="relative mt-6 block font-display text-[4.5rem] font-medium leading-[0.85] tracking-[-0.04em] text-ph-gold-light">
                                {event.edition}
                                <span className="ml-1 align-top text-[1.25rem] tracking-normal">th</span>
                              </span>
                            </div>
                            <div className="flex flex-1 flex-col p-7">
                              <h3 className="font-display text-[20px] font-semibold leading-snug text-ph-ink">
                                <Highlight text={event.title} query={query} />
                              </h3>
                              <ul className="mt-4 space-y-2 text-[14px] text-ph-muted">
                                <li className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-ph-gold-deep" strokeWidth={1.7} />
                                  <span className={cn(isTba && 'italic')}>
                                    <Highlight text={event.location} query={query} />
                                  </span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4 text-ph-gold-deep" strokeWidth={1.7} />
                                  <Highlight text={event.date} query={query} />
                                </li>
                              </ul>
                              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] font-semibold text-ph-navy">
                                Conference materials
                                <ArrowRight className="arrow-nudge h-4 w-4" />
                              </span>
                            </div>
                          </SpotlightCard>
                        </Link>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            </section>
          ))
        )}

        <BlurFade>
          <section
            aria-labelledby="ev-cta-title"
            className="relative overflow-hidden rounded-[2rem] bg-ph-navy px-8 py-14 text-white sm:px-12 lg:py-16"
          >
            <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              src="/assets/sun-light.svg"
              alt=""
              className="pointer-events-none absolute -right-20 -top-20 w-[420px] max-w-none animate-spin-slow opacity-[0.12]"
            />
            <div className="relative grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="eyebrow eyebrow-light">Stay in touch</p>
                <h2 id="ev-cta-title" className="mt-4 font-display text-[2rem] font-semibold leading-tight sm:text-[2.4rem]">
                  Planning to attend the next conference?
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">
                  Check back regularly for announcements, or reach out and we will point you to the right programme.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/contact" className="btn-gold group">
                  Contact the Secretariat
                  <ArrowRight className="arrow-nudge h-4 w-4" />
                </Link>
                <Link href="/downloads" className="btn-outline-light">
                  Browse materials
                </Link>
              </div>
            </div>
          </section>
        </BlurFade>
      </div>
    </>
  )
}
