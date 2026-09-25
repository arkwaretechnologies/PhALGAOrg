import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import SectionHeading, { accent } from '@/components/SectionHeading'
import { BlurFade } from '@/components/ui/blur-fade'
import { eventSeries } from '@/lib/content'

export default function EventsSection() {
  // Most recent national conference, then the current round of regional ones
  const national = eventSeries[0].events[0]
  const regional = eventSeries[1].events
  const rows = [{ ...national, series: 'National' }, ...regional.map((e) => ({ ...e, series: 'Geographical' }))]

  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Conferences"
              title={['Where members', accent('gather.')]}
              lede="Each year PhALGA convenes a national conference and four regional Geographical Conferences, bringing regulators and practitioners into the same room."
            />
            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/events" className="btn-primary group">
                  View all events
                  <ArrowRight className="arrow-nudge h-4 w-4" />
                </Link>
                <Link href="/downloads" className="btn-outline">
                  Conference materials
                </Link>
              </div>
            </BlurFade>
          </div>

          <ol className="border-t border-ph-line">
            {rows.map((e, i) => (
              <BlurFade as="li" key={e.title} delay={i * 0.06} className="border-b border-ph-line">
                <Link
                  href={`/downloads?event=${encodeURIComponent(e.title)}`}
                  className="group relative grid grid-cols-[64px_1fr_auto] items-center gap-5 py-7 sm:grid-cols-[88px_1fr_auto] sm:gap-8"
                >
                  {/* Hover wash that slides in from the left */}
                  <span className="absolute inset-y-0 -left-4 -right-4 origin-left scale-x-0 rounded-2xl bg-white shadow-card transition-transform duration-500 ease-out group-hover:scale-x-100 sm:-left-6 sm:-right-6" />
                  <span className="relative font-display text-[3rem] font-medium leading-none tracking-[-0.04em] text-ph-navy/15 transition-colors duration-500 group-hover:text-ph-gold sm:text-[3.75rem]">
                    {e.edition}
                  </span>
                  <span className="relative min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ph-gold-deep">
                      {e.series} · {e.badge}
                    </span>
                    <span className="mt-1.5 block font-display text-[19px] font-semibold leading-snug text-ph-ink sm:text-[21px]">
                      {e.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-ph-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                        {e.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} />
                        {e.date}
                      </span>
                    </span>
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ph-line text-ph-navy transition-all duration-500 group-hover:border-ph-navy group-hover:bg-ph-navy group-hover:text-white">
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-45" />
                    <span className="sr-only">Materials</span>
                  </span>
                </Link>
              </BlurFade>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
