'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Timeline, type TimelineEntry } from '@/components/ui/timeline'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import type { PastPresident } from '@/lib/pastPresidents'

const CREDENTIALS = new Set(['CPA', 'MBA', 'DBA', 'JD', 'CSEE', 'CESE', 'RN', 'PHD', 'MPA'])

/** "DR. EMMANUEL D. MAGSINO, CPA" → "Dr. Emmanuel D. Magsino, CPA" */
function formatName(name: string) {
  return name
    .split(/(\s+|,)/)
    .map((token) => {
      const bare = token.replace(/[^A-Za-z]/g, '').toUpperCase()
      if (!bare || CREDENTIALS.has(bare)) return token
      return token
        .toLowerCase()
        .replace(/(^|[-'])([a-z])/g, (_, sep: string, c: string) => sep + c.toUpperCase())
    })
    .join('')
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
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href!}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ph-line px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ph-navy transition-colors hover:border-ph-navy hover:bg-ph-navy hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function PresidentCard({ president, order }: { president: PastPresident; order: number }) {
  return (
    <BlurFade>
      <article className="group flex max-w-2xl gap-5 rounded-3xl border border-ph-line bg-white p-3 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:gap-7 sm:p-4">
        <div className="relative aspect-[4/5] w-[108px] shrink-0 overflow-hidden rounded-2xl bg-ph-mist sm:w-[150px]">
          <Image
            src={president.image}
            alt={formatName(president.name)}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 108px, 150px"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center py-2 pr-2">
          <span className="font-display text-[13px] italic text-ph-gold-deep">
            {order}
            {ordinal(order)} National President · {president.fiscalYear}
          </span>
          <h4 className="mt-2 font-display text-[19px] font-semibold leading-snug text-ph-ink sm:text-[22px]">
            {formatName(president.name)}
          </h4>
          <p className="mt-2 flex items-start gap-1.5 text-[14px] leading-relaxed text-ph-muted">
            <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-ph-gold-deep" strokeWidth={1.8} />
            {president.location}
          </p>
          <SocialLinks socials={president.socials} />
        </div>
      </article>
    </BlurFade>
  )
}

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

/** "FY 2004-2006" → "2004–06" */
function formatTerm(fiscalYear: string) {
  const years = fiscalYear.match(/\d{4}/g) ?? []
  if (years.length === 2) return `${years[0]}–${years[1].slice(2)}`
  return fiscalYear.replace(/^FY\s*/i, '')
}

export default function PastPresidentsTimeline({ presidents }: { presidents: PastPresident[] }) {
  // Number each president chronologically, then show the most recent first
  const chronological = [...presidents].sort((a, b) => a.sortOrder - b.sortOrder)
  const ordered = [...chronological].reverse()

  const data: TimelineEntry[] = ordered.map((president) => ({
    title: formatTerm(president.fiscalYear),
    content: <PresidentCard president={president} order={chronological.indexOf(president) + 1} />,
  }))

  const years = presidents.flatMap((p) => p.fiscalYear.match(/\d{4}/g)?.map(Number) ?? [])
  const first = years.length ? Math.min(...years) : null
  const last = years.length ? Math.max(...years) : null

  return (
    <div className="container-site py-16 lg:py-24">
      <div className="mx-auto mb-6 grid max-w-5xl gap-10 border-b border-ph-line pb-12 md:grid-cols-[1.5fr_1fr] md:items-end">
        <BlurFade>
          <p className="eyebrow">Leadership legacy</p>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ph-muted">
            The leaders who have served as National President of PhALGA since the association was founded in 2004. Scroll
            to follow the timeline of service across the Philippines.
          </p>
          <Link href="/about/officers" className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ph-navy">
            Current National Officers
            <ArrowRight className="arrow-nudge h-4 w-4" />
          </Link>
        </BlurFade>
        <BlurFade delay={0.1}>
          <dl className="grid grid-cols-2 gap-6">
            <div className="border-l border-ph-line pl-5">
              <dd className="font-display text-[3rem] font-medium leading-none text-ph-navy">
                <NumberTicker value={presidents.length} />
              </dd>
              <dt className="mt-2 text-[13px] text-ph-muted">Past presidents</dt>
            </div>
            {first && last && (
              <div className="border-l border-ph-line pl-5">
                <dd className="font-display text-[3rem] font-medium leading-none text-ph-navy">
                  <NumberTicker value={last - first} />
                </dd>
                <dt className="mt-2 text-[13px] text-ph-muted">
                  Years, {first}–{last}
                </dt>
              </div>
            )}
          </dl>
        </BlurFade>
      </div>

      <Timeline data={data} />
    </div>
  )
}
