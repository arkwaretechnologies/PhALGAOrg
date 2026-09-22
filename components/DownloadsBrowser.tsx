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
import '../app/downloads/downloads.css'

export type DownloadItem = {
  title: string
  description: string
}

export type DownloadCategory = {
  title: string
  shortTitle: string
  kicker: string
  description: string
  items: DownloadItem[]
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v12" />
      <path d="M6 13l6 6 6-6" />
    </svg>
  )
}

export default function DownloadsBrowser({ categories }: { categories: DownloadCategory[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const totalItems = useMemo(
    () => categories.reduce((sum, category) => sum + category.items.length, 0),
    [categories]
  )

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase()

    return categories
      .filter((category) => activeCategory === null || category.title === activeCategory)
      .map((category) => ({
        ...category,
        items: q
          ? category.items.filter(
              (item) =>
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                category.title.toLowerCase().includes(q)
            )
          : category.items,
      }))
      .filter((category) => category.items.length > 0)
  }, [categories, query, activeCategory])

  const visibleCount = visibleCategories.reduce((sum, category) => sum + category.items.length, 0)
  const isFiltered = query.trim() !== '' || activeCategory !== null

  function resetFilters() {
    setQuery('')
    setActiveCategory(null)
  }

  return (
    <div className="pg-page">
      <FilterToolbar
        total={totalItems}
        visibleCount={visibleCount}
        isFiltered={isFiltered}
        unit="materials"
        groupUnit="collections"
        groupCount={categories.length}
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search lectures, circulars, topics…"
        searchLabel="Search downloadable materials"
        chips={categories.map((category) => ({
          id: category.title,
          label: category.shortTitle,
          count: category.items.length,
        }))}
        activeChip={activeCategory}
        onChipToggle={(id) => setActiveCategory((current) => (!id || current === id ? null : id))}
        chipGroupLabel="Filter by collection"
      />

      <div className="pg-body">
        {visibleCategories.length === 0 ? (
          <EmptyState
            query={query}
            onReset={resetFilters}
            hint="Try a shorter keyword such as “COA”, “budgeting”, or “tax”."
          />
        ) : (
          visibleCategories.map((category) => (
            <section key={category.title} className="pg-group" aria-labelledby={`dl-${slugify(category.title)}`}>
              <GroupHeader
                id={`dl-${slugify(category.title)}`}
                kicker={category.kicker}
                title={category.title}
                description={category.description}
                query={query}
              />

              <div className="dl-grid">
                {category.items.map((item) => (
                  <article key={item.title} className="dl-card">
                    <div className="dl-card-top">
                      <span className="dl-icon">
                        <DocIcon />
                      </span>
                      <h3 className="dl-card-title">
                        <Highlight text={item.title} query={query} />
                      </h3>
                    </div>
                    <p className="dl-card-desc">
                      <Highlight text={item.description} query={query} />
                    </p>
                    <div className="dl-card-foot">
                      <span className="dl-tag">{category.shortTitle}</span>
                      <button type="button" className="dl-dl-btn" aria-label={`Download ${item.title}`}>
                        Download
                        <ArrowDownIcon />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}

        <div className="pg-notes">
          <div className="pg-note">
            <span className="pg-note-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <path d="M12 15v2" />
              </svg>
            </span>
            <div className="pg-note-body">
              <h3 className="pg-note-title">Member access</h3>
              <p className="pg-note-text">
                Downloads are available to registered members. Some materials may require you to log in before the file
                becomes available.
              </p>
              <Link href="/login" className="pg-note-link">
                Member login
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <div className="pg-note">
            <span className="pg-note-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <div className="pg-note-body">
              <h3 className="pg-note-title">Can&rsquo;t find a file?</h3>
              <p className="pg-note-text">
                If you hit an access issue or need a specific lecture, circular, or presentation that is not listed here,
                send us a request and we will follow up.
              </p>
              <Link href="/contact" className="pg-note-link">
                Contact PhALGA
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
