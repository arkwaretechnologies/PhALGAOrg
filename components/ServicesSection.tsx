import Link from 'next/link'
import { ArrowRight, ArrowUpRight, FileStack, FolderDown, MapPinned, UserPlus } from 'lucide-react'
import SectionHeading, { accent } from '@/components/SectionHeading'
import { BlurFade } from '@/components/ui/blur-fade'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { cn } from '@/lib/utils'

const regions = ['Northern Luzon', 'Southern Luzon', 'Visayas', 'Mindanao']

const services = [
  {
    icon: FileStack,
    title: 'COA Circulars & Updates',
    desc: 'The latest Commission on Audit regulations, circulars and compliance guidelines for LGU accounting practice.',
    href: '/circulars',
  },
  {
    icon: FolderDown,
    title: 'Resource Library',
    desc: 'Lecture decks, presentations and reference documents from past national and regional conferences.',
    href: '/downloads',
  },
  {
    icon: UserPlus,
    title: 'Membership',
    desc: 'Join a growing community of LGU accounting professionals with access to events, materials and support.',
    href: '/contact',
  },
]

function CardLink({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        'mt-auto inline-flex items-center gap-1.5 pt-8 text-[13.5px] font-semibold',
        dark ? 'text-ph-gold-light' : 'text-ph-navy'
      )}
    >
      {label}
      <ArrowRight className="arrow-nudge h-4 w-4" />
    </span>
  )
}

export default function ServicesSection() {
  return (
    <section id="programs" className="relative bg-ph-mist py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/waves-gold.svg')] bg-[length:1600px_600px] bg-top bg-repeat-x opacity-40 mask-fade-b" />

      <div className="container-site relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Programs & services"
            title={['Learning that keeps pace with', accent('public finance.')]}
            lede="From the flagship national conference to regional sessions and a shared resource library, our programs keep members current and connected."
          />
          <BlurFade delay={0.2}>
            <Link href="/events" className="btn-primary group shrink-0">
              All programs
              <ArrowRight className="arrow-nudge h-4 w-4" />
            </Link>
          </BlurFade>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured: the national conference */}
          <BlurFade className="md:col-span-2 lg:row-span-1">
            <Link href="/events" className="group block h-full">
              <SpotlightCard
                tone="dark"
                className="flex h-full min-h-[340px] rounded-3xl bg-ph-navy text-white shadow-lift"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  aria-hidden
                  src="/assets/rosette-light.svg"
                  alt=""
                  className="pointer-events-none absolute -right-40 -top-40 w-[560px] max-w-none opacity-[0.12] transition-transform duration-[1.5s] ease-out group-hover:rotate-12"
                />
                <div className="relative flex h-full flex-col p-8 lg:p-10">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ph-gold-light">
                      Flagship
                    </span>
                    <ArrowUpRight className="h-6 w-6 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ph-gold-light" />
                  </div>
                  <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end">
                    <span className="flex shrink-0 items-start font-display text-[6.5rem] font-medium leading-[0.8] tracking-[-0.04em] text-ph-gold-light">
                      20
                      <span className="ml-1 text-[2rem] leading-none tracking-normal">th</span>
                    </span>
                    <div className="max-w-md pb-1">
                      <h3 className="font-display text-[26px] font-semibold leading-tight">Annual National Conference</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">
                        Our yearly national gathering of LGU accountants for learning, recognition and professional
                        networking, with keynote updates from COA, DBM, DILG and the Ombudsman.
                      </p>
                    </div>
                  </div>
                  <CardLink label="Explore the conference" dark />
                </div>
              </SpotlightCard>
            </Link>
          </BlurFade>

          {/* Geographical conferences */}
          <BlurFade delay={0.08}>
            <Link href="/events" className="group block h-full">
              <SpotlightCard className="flex h-full min-h-[340px] rounded-3xl border border-ph-line bg-white shadow-card transition-shadow duration-500 hover:shadow-lift">
                <div className="flex h-full flex-col p-8">
                  <MapPinned className="h-7 w-7 text-ph-navy" strokeWidth={1.4} />
                  <h3 className="mt-6 font-display text-[22px] font-semibold text-ph-ink">Geographical Conferences</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ph-muted">
                    Regional sessions tailored to the regulatory context of each area.
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {regions.map((r) => (
                      <li
                        key={r}
                        className="rounded-full bg-ph-mist px-3 py-1 text-[12px] font-medium text-ph-ink/80 transition-colors duration-300 group-hover:bg-ph-gold-light/50"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                  <CardLink label="See regional events" />
                </div>
              </SpotlightCard>
            </Link>
          </BlurFade>

          {services.map((s, i) => (
            <BlurFade key={s.title} delay={0.1 + i * 0.08}>
              <Link href={s.href} className="group block h-full">
                <SpotlightCard className="flex h-full min-h-[280px] rounded-3xl border border-ph-line bg-white shadow-card transition-shadow duration-500 hover:shadow-lift">
                  <div className="flex h-full flex-col p-8">
                    <div className="flex items-start justify-between">
                      <s.icon className="h-7 w-7 text-ph-navy" strokeWidth={1.4} />
                      <ArrowUpRight className="h-5 w-5 text-ph-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ph-gold-deep" />
                    </div>
                    <h3 className="mt-6 font-display text-[22px] font-semibold text-ph-ink">{s.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ph-muted">{s.desc}</p>
                  </div>
                </SpotlightCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
