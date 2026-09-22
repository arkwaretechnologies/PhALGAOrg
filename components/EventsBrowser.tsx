'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRightIcon,
  EmptyState,
  FilterToolbar,
  GroupHeader,
  Highlight,
  slugify,
} from './SubpageFilter'
import '../app/events/events.css'

export type EventEntry = {
  title: string
  /** Conference edition, e.g. "20" — shown in the gold badge. */
  edition: string
  /** Short badge caption, e.g. "ANC 2024" or "MINDANAO". */
  badge: string
  date: string
  location: string
}

export type EventSeries = {
  title: string
  shortTitle: string
  kicker: string
  description: string
  events: EventEntry[]
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  )
}

function SunMotif() {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="28" fill="currentColor" />
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={100 + 34 * Math.cos(angle)}
            y1={100 + 34 * Math.sin(angle)}
            x2={100 + 84 * Math.cos(angle)}
            y2={100 + 84 * Math.sin(angle)}
            stroke="currentColor"
            strokeWidth="3"
          />
        )
      })}
    </svg>
  )
}

export default function EventsBrowser({ series }: { series: EventSeries[] }) {
  const [query, setQuery] = useState('')
  const [activeSeries, setActiveSeries] = useState<string | null>(null)

  const totalEvents = useMemo(
    () => series.reduce((sum, group) => sum + group.events.length, 0),
    [series]
  )

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
    <div className="pg-page">
      <FilterToolbar
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
        chips={series.map((group) => ({
          id: group.title,
          label: group.shortTitle,
          count: group.events.length,
        }))}
        activeChip={activeSeries}
        onChipToggle={(id) => setActiveSeries((current) => (!id || current === id ? null : id))}
        chipGroupLabel="Filter by conference series"
      />

      <div className="pg-body">
        {visibleSeries.length === 0 ? (
          <EmptyState
            query={query}
            onReset={resetFilters}
            hint="Try a city such as “Iloilo”, a region such as “Visayas”, or a year such as “2024”."
          />
        ) : (
          visibleSeries.map((group) => (
            <section key={group.title} className="pg-group" aria-labelledby={`ev-${slugify(group.title)}`}>
              <GroupHeader
                id={`ev-${slugify(group.title)}`}
                kicker={group.kicker}
                title={group.title}
                description={group.description}
                query={query}
              />

              <div className="ev-grid">
                {group.events.map((event) => {
                  const isTba = event.location.toLowerCase().includes('announce')

                  return (
                    <article key={event.title} className="ev-card">
                      <div className="ev-card-head">
                        <span className="ev-card-sun">
                          <SunMotif />
                        </span>
                        <span className="ev-badge">
                          <span className="ev-badge-edition">{event.edition}</span>
                          <span className="ev-badge-label">{event.badge}</span>
                        </span>
                        <h3 className="ev-card-title">
                          <Highlight text={event.title} query={query} />
                        </h3>
                      </div>

                      <div className="ev-card-body">
                        <ul className="ev-meta">
                          <li>
                            <PinIcon />
                            <span className={isTba ? 'ev-meta-tba' : undefined}>
                              <Highlight text={event.location} query={query} />
                            </span>
                          </li>
                          <li>
                            <CalendarIcon />
                            <span>
                              <Highlight text={event.date} query={query} />
                            </span>
                          </li>
                        </ul>

                        <Link
                          href={`/downloads?event=${encodeURIComponent(event.title)}`}
                          className="ev-card-link"
                          aria-label={`View materials from the ${event.title}`}
                        >
                          Conference materials
                          <ArrowRightIcon />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))
        )}

        <section className="pg-group" aria-labelledby="ev-gallery">
          <GroupHeader
            id="ev-gallery"
            kicker="Gallery"
            title="Photo Gallery"
            description="View photos from our recent events and conferences."
          />
          <div className="ev-gallery-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="ev-tile">
                <span className="ev-tile-sun">
                  <SunMotif />
                </span>
                <span className="ev-tile-label">Photo {item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ev-cta" aria-labelledby="ev-cta-title">
          <span className="ev-cta-kicker">Stay in touch</span>
          <h2 className="ev-cta-title" id="ev-cta-title">
            Stay Updated
          </h2>
          <p className="ev-cta-text">
            Check back regularly for upcoming events and conference announcements, or reach out and we will point you to
            the right programme.
          </p>
          <div className="ev-cta-actions">
            <Link href="/contact" className="ev-btn-gold">
              Contact us for more information
              <ArrowRightIcon />
            </Link>
            <Link href="/downloads" className="ev-btn-ghost">
              Browse conference materials
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
