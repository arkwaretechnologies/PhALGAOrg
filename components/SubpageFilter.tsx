'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FilterChip = {
  id: string
  label: string
  count: number
}

export { slugify } from '@/lib/utils'

/** Wraps the matched part of a string so search hits are visible. */
export function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>

  const index = text.toLowerCase().indexOf(q.toLowerCase())
  if (index === -1) return <>{text}</>

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-[3px] bg-ph-gold-light/70 px-0.5 text-inherit">{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  )
}

export type FilterToolbarProps = {
  /** Total number of items before filtering. */
  total: number
  /** Number of items currently shown. */
  visibleCount: number
  isFiltered: boolean
  /** Plural noun for an item, e.g. "materials". */
  unit: string
  /** Plural noun for a group, e.g. "collections". */
  groupUnit: string
  groupCount: number
  query: string
  onQueryChange: (value: string) => void
  searchPlaceholder: string
  searchLabel: string
  chips: FilterChip[]
  activeChip: string | null
  onChipToggle: (id: string) => void
  chipGroupLabel: string
  /** Distinguishes shared-layout animations when two toolbars exist. */
  layoutKey?: string
}

export function FilterToolbar({
  total,
  visibleCount,
  isFiltered,
  unit,
  groupUnit,
  groupCount,
  query,
  onQueryChange,
  searchPlaceholder,
  searchLabel,
  chips,
  activeChip,
  onChipToggle,
  chipGroupLabel,
  layoutKey = 'filter',
}: FilterToolbarProps) {
  const allChips = [{ id: '', label: 'All', count: total }, ...chips]

  return (
    <div className="sticky top-[67px] z-30 border-b border-ph-line bg-ph-paper/90 backdrop-blur-xl">
      <div className="container-site flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="scrollbar-hide -mx-5 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:[mask-image:linear-gradient(to_right,black_90%,transparent)] lg:pr-8"
          role="group"
          aria-label={chipGroupLabel}
        >
          {allChips.map((chip) => {
            const active = (activeChip ?? '') === chip.id
            return (
              <button
                key={chip.id || 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => onChipToggle(chip.id)}
                className={cn(
                  'relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200',
                  active ? 'text-white' : 'text-ph-ink/70 hover:bg-ph-mist hover:text-ph-ink'
                )}
              >
                {active && (
                  <motion.span
                    layoutId={`${layoutKey}-chip`}
                    className="absolute inset-0 rounded-full bg-ph-navy"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{chip.label}</span>
                <span
                  className={cn(
                    'relative rounded-full px-1.5 text-[11px] tabular-nums',
                    active ? 'bg-white/15 text-white' : 'bg-ph-mist text-ph-muted'
                  )}
                >
                  {chip.count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <p className="hidden shrink-0 text-[13px] text-ph-muted xl:block" role="status" aria-live="polite">
            {isFiltered ? (
              <>
                <strong className="font-semibold text-ph-ink">{visibleCount}</strong> of {total} {unit}
              </>
            ) : (
              <>
                <strong className="font-semibold text-ph-ink">{total}</strong> {unit} · {groupCount} {groupUnit}
              </>
            )}
          </p>
          <div className="group relative w-full lg:w-[320px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ph-muted transition-colors group-focus-within:text-ph-navy" />
            <input
              type="search"
              className="field !rounded-full !py-2.5 !pl-11 !pr-10 !text-[14px] [&::-webkit-search-cancel-button]:hidden"
              placeholder={searchPlaceholder}
              aria-label={searchLabel}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-ph-mist text-ph-muted hover:bg-ph-navy hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmptyState({ query, onReset, hint }: { query: string; onReset: () => void; hint: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-3xl border border-dashed border-ph-line bg-white px-8 py-14 text-center"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ph-mist text-ph-navy">
        <SearchX className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <p className="mt-5 font-display text-[22px] font-semibold text-ph-ink">No results found</p>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ph-muted">
        {query.trim() ? <>Nothing matches &ldquo;{query.trim()}&rdquo;. </> : null}
        {hint}
      </p>
      <button type="button" className="btn-primary mt-6" onClick={onReset}>
        Clear filters
      </button>
    </motion.div>
  )
}

export function GroupHeader({
  kicker,
  title,
  description,
  query = '',
  id,
  count,
  className,
}: {
  kicker: string
  title: string
  description: string
  query?: string
  id: string
  count?: number
  className?: string
}) {
  return (
    <header className={cn('flex flex-col justify-between gap-4 border-b border-ph-line pb-6 sm:flex-row sm:items-end', className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{kicker}</p>
        <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.01em] text-ph-ink sm:text-[2rem]" id={id}>
          <Highlight text={title} query={query} />
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ph-muted">{description}</p>
      </div>
      {count !== undefined && (
        <span className="shrink-0 font-display text-[15px] italic text-ph-gold-deep">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      )}
    </header>
  )
}
