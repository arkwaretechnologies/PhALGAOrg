'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, FileText, LockKeyhole, MessageSquareText } from 'lucide-react'
import { EmptyState, FilterToolbar, GroupHeader, Highlight, slugify } from './SubpageFilter'
import { BlurFade } from '@/components/ui/blur-fade'
import type { DownloadCategory } from '@/lib/content'

export type { DownloadCategory, DownloadItem } from '@/lib/content'

export default function DownloadsBrowser({ categories }: { categories: DownloadCategory[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const totalItems = useMemo(() => categories.reduce((sum, category) => sum + category.items.length, 0), [categories])

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
    <>
      <FilterToolbar
        layoutKey="downloads"
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
        chips={categories.map((c) => ({ id: c.title, label: c.shortTitle, count: c.items.length }))}
        activeChip={activeCategory}
        onChipToggle={(id) => setActiveCategory((current) => (!id || current === id ? null : id))}
        chipGroupLabel="Filter by collection"
      />

      <div className="container-site py-16 lg:py-24">
        <div className="space-y-16">
          {visibleCategories.length === 0 ? (
            <EmptyState query={query} onReset={resetFilters} hint="Try a shorter keyword such as “COA”, “budgeting”, or “tax”." />
          ) : (
            visibleCategories.map((category) => (
              <section key={category.title} aria-labelledby={`dl-${slugify(category.title)}`}>
                <BlurFade>
                  <GroupHeader
                    id={`dl-${slugify(category.title)}`}
                    kicker={category.kicker}
                    title={category.title}
                    description={category.description}
                    query={query}
                    count={category.items.length}
                  />
                </BlurFade>

                <motion.ul layout className="mt-6 grid gap-3 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {category.items.map((item, i) => (
                      <motion.li
                        layout
                        key={item.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex items-center gap-5 rounded-2xl border border-ph-line bg-white p-5 transition-all duration-300 hover:border-ph-navy/25 hover:shadow-card"
                      >
                        <span className="relative flex h-12 w-10 shrink-0 items-center justify-center rounded-md border border-ph-line bg-ph-paper text-ph-navy transition-colors duration-300 group-hover:border-ph-navy group-hover:bg-ph-navy group-hover:text-white">
                          <FileText className="h-5 w-5" strokeWidth={1.5} />
                          {/* folded corner */}
                          <span className="absolute -right-px -top-px h-3 w-3 rounded-bl-[4px] border-b border-l border-ph-line bg-ph-mist transition-colors group-hover:border-ph-navy-soft group-hover:bg-ph-navy-soft" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[15px] font-semibold leading-snug text-ph-ink">
                            <Highlight text={item.title} query={query} />
                          </h3>
                          <p className="mt-0.5 text-[13.5px] leading-relaxed text-ph-muted">
                            <Highlight text={item.description} query={query} />
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Download ${item.title}`}
                          className="group/dl relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ph-line text-ph-navy transition-all duration-300 hover:border-ph-navy hover:bg-ph-navy hover:text-white sm:w-auto sm:gap-2 sm:px-4"
                        >
                          <span className="hidden text-[13px] font-semibold sm:inline">Download</span>
                          <span className="relative h-4 w-4 overflow-hidden">
                            <ArrowDown className="absolute inset-0 h-4 w-4 transition-transform duration-300 group-hover/dl:translate-y-4" />
                            <ArrowDown className="absolute inset-0 h-4 w-4 -translate-y-4 transition-transform duration-300 group-hover/dl:translate-y-0" />
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </section>
            ))
          )}
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {[
            {
              icon: LockKeyhole,
              title: 'Member access',
              text: 'Downloads are available to registered members. Some materials may require you to log in before the file becomes available.',
              href: '/login',
              link: 'Member login',
            },
            {
              icon: MessageSquareText,
              title: 'Can’t find a file?',
              text: 'If you need a specific lecture, circular, or presentation that is not listed here, send us a request and we will follow up.',
              href: '/contact',
              link: 'Contact PhALGA',
            },
          ].map((note, i) => (
            <BlurFade key={note.title} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-3xl bg-ph-mist p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ph-navy">
                  <note.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-semibold text-ph-ink">{note.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ph-muted">{note.text}</p>
                  <Link href={note.href} className="group mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ph-navy">
                    {note.link}
                    <ArrowRight className="arrow-nudge h-4 w-4" />
                  </Link>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </>
  )
}
