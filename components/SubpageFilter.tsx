'use client'

import './subpage-ui.css'

export type FilterChip = {
  id: string
  label: string
  count: number
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Wraps the matched part of a string so search hits are visible. */
export function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>

  const index = text.toLowerCase().indexOf(q.toLowerCase())
  if (index === -1) return <>{text}</>

  return (
    <>
      {text.slice(0, index)}
      <mark className="pg-mark">{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  )
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

export function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
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
}: FilterToolbarProps) {
  return (
    <div className="pg-toolbar-outer">
      <div className="pg-toolbar">
        <div className="pg-toolbar-top">
          <p className="pg-count" role="status" aria-live="polite">
            {isFiltered ? (
              <>
                <strong>{visibleCount}</strong> of {total} {unit}
              </>
            ) : (
              <>
                <strong>{total}</strong> {unit} across {groupCount} {groupUnit}
              </>
            )}
          </p>

          <div className="pg-search">
            <SearchIcon className="pg-search-icon" />
            <input
              type="search"
              className="pg-search-input"
              placeholder={searchPlaceholder}
              aria-label={searchLabel}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
            {query && (
              <button type="button" className="pg-search-clear" onClick={() => onQueryChange('')} aria-label="Clear search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="pg-chips" role="group" aria-label={chipGroupLabel}>
          <button type="button" className="pg-chip" aria-pressed={activeChip === null} onClick={() => onChipToggle('')}>
            All
            <span className="pg-chip-count">{total}</span>
          </button>
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="pg-chip"
              aria-pressed={activeChip === chip.id}
              onClick={() => onChipToggle(chip.id)}
            >
              {chip.label}
              <span className="pg-chip-count">{chip.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function EmptyState({ query, onReset, hint }: { query: string; onReset: () => void; hint: string }) {
  return (
    <div className="pg-empty">
      <div className="pg-empty-icon">
        <SearchIcon />
      </div>
      <p className="pg-empty-title">No results found</p>
      <p className="pg-empty-text">
        {query.trim() ? <>Nothing matches &ldquo;{query.trim()}&rdquo;. </> : null}
        {hint}
      </p>
      <button type="button" className="pg-empty-btn" onClick={onReset}>
        Clear filters
      </button>
    </div>
  )
}

export function GroupHeader({
  kicker,
  title,
  description,
  query = '',
  id,
}: {
  kicker: string
  title: string
  description: string
  query?: string
  id: string
}) {
  return (
    <header className="pg-group-head">
      <span className="pg-kicker">{kicker}</span>
      <h2 className="pg-group-title" id={id}>
        <Highlight text={title} query={query} />
      </h2>
      <p className="pg-group-desc">{description}</p>
    </header>
  )
}
