'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Timeline, type TimelineEntry } from '@/components/ui/timeline'
import type { PastPresident } from '@/lib/pastPresidents'

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0 text-ph-blue"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function SocialLinks({ socials }: { socials: PastPresident['socials'] }) {
  const items = [
    { key: 'facebook' as const, label: 'Facebook', href: socials.facebook },
    { key: 'linkedin' as const, label: 'LinkedIn', href: socials.linkedin },
    { key: 'twitter' as const, label: 'Twitter', href: socials.twitter },
    { key: 'instagram' as const, label: 'Instagram', href: socials.instagram },
  ].filter((item) => item.href)

  if (items.length === 0) return null

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href!}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-ph-blue/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ph-blue no-underline transition-colors hover:bg-ph-blue hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function PresidentCard({ president }: { president: PastPresident }) {
  return (
    <article className="flex max-w-2xl gap-4 rounded-2xl border border-ph-border bg-white p-3 shadow-ph transition-all duration-300 hover:-translate-y-1 hover:border-ph-blue/30 hover:shadow-ph-lg sm:gap-5 sm:p-4">
      <div className="relative aspect-[3/4] w-[104px] shrink-0 overflow-hidden rounded-xl bg-ph-off-white sm:w-[136px]">
        <Image
          src={president.image}
          alt={president.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 104px, 136px"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-center py-1 pr-1 sm:py-2">
        <span className="mb-2 inline-block w-fit rounded-md bg-ph-blue/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ph-blue sm:text-[11px]">
          {president.fiscalYear}
        </span>
        <h4 className="font-display text-base font-bold leading-snug text-ph-text sm:text-lg">
          {president.name}
        </h4>
        <p className="mt-2 flex items-start gap-1.5 text-[13px] leading-relaxed text-ph-text-muted sm:text-sm">
          <span className="mt-0.5">
            <PinIcon />
          </span>
          {president.location}
        </p>
        <SocialLinks socials={president.socials} />
      </div>
    </article>
  )
}

/** "FY 2004-2006" → "2004–2006" */
function formatTerm(fiscalYear: string) {
  return fiscalYear.replace(/^FY\s*/i, '').replace(/\s*-\s*/, '–')
}

export default function PastPresidentsTimeline({ presidents }: { presidents: PastPresident[] }) {
  // Most recent term first, so the timeline reads backwards from today.
  const ordered = [...presidents].sort((a, b) => b.sortOrder - a.sortOrder)

  const data: TimelineEntry[] = ordered.map((president) => ({
    title: formatTerm(president.fiscalYear),
    content: <PresidentCard president={president} />,
  }))

  const years = presidents.flatMap((p) => p.fiscalYear.match(/\d{4}/g)?.map(Number) ?? [])
  const span = years.length > 0 ? `${Math.min(...years)} – ${Math.max(...years)}` : null

  return (
    <div className="w-full bg-ph-white px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <div className="mx-auto mb-10 max-w-5xl md:mb-14">
        <div className="section-label">
          <span>Leadership Legacy</span>
        </div>
        <h2 className="section-title">
          Past National <span className="accent">Presidents</span>
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-ph-text-muted md:text-[17px]">
          The leaders who have served as National President of PhALGA since the association was founded in 2004. Scroll
          to follow the timeline of service across the Philippines.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ph-border pt-5">
          <p className="text-sm text-ph-text-muted">
            <strong className="font-semibold text-ph-text">{presidents.length}</strong> past presidents
          </p>
          {span && (
            <p className="text-sm text-ph-text-muted">
              <strong className="font-semibold text-ph-text">{span}</strong> of service
            </p>
          )}
          <Link
            href="/about/officers"
            className="text-sm font-semibold text-ph-blue no-underline transition-colors hover:text-ph-blue-dark"
          >
            Current National Officers →
          </Link>
        </div>
      </div>

      <Timeline data={data} />
    </div>
  )
}
