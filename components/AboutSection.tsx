import Link from 'next/link'
import { ArrowRight, GraduationCap, Handshake, Scale } from 'lucide-react'
import SectionHeading, { accent } from '@/components/SectionHeading'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'

const pillars = [
  {
    icon: GraduationCap,
    title: 'Professional Development',
    desc: 'Continuous learning through national and regional conferences, seminars and technical updates.',
  },
  {
    icon: Handshake,
    title: 'Networking & Fellowship',
    desc: 'A nationwide community of LGU accountants who collaborate, mentor and support one another.',
  },
  {
    icon: Scale,
    title: 'Advocacy & Standards',
    desc: 'Promoting sound fiscal policy and best practice in public financial management.',
  },
]

const stats = [
  { value: 20, suffix: '', label: 'Annual National Conferences held' },
  { value: 17, suffix: '', label: 'Editions of the regional Geographical Conferences' },
  { value: 4, suffix: '', label: 'Regional clusters, from Northern Luzon to Mindanao' },
  { value: 22, suffix: '', label: 'National Officers leading the 2025–2026 term' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden
        src="/assets/sun-gold.svg"
        alt=""
        className="pointer-events-none absolute -left-40 top-16 w-[520px] max-w-none animate-spin-slow opacity-[0.14]"
      />

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <SectionHeading
            eyebrow="Who we are"
            title={['The national body for the accountants who keep', accent('local government'), 'accountable.']}
          />

          <div className="lg:pt-12">
            <BlurFade delay={0.1}>
              <p className="lede">
                PhALGA is the premier professional organization for accountants in local government units throughout the
                Philippines. Founded in 2004 and registered with the Securities and Exchange Commission, we champion
                excellence, transparency and accountability in public financial management — from barangay to province.
              </p>
            </BlurFade>
            <BlurFade delay={0.2}>
              <Link href="/about" className="btn-outline group mt-8">
                Read our story
                <ArrowRight className="arrow-nudge h-4 w-4" />
              </Link>
            </BlurFade>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-ph-line bg-ph-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <BlurFade key={p.title} delay={i * 0.08} className="group relative bg-ph-paper p-8 transition-colors duration-500 hover:bg-white lg:p-10">
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-ph-gold transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-center justify-between">
                <p.icon className="h-7 w-7 text-ph-navy transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.4} />
                <span className="font-display text-sm italic text-ph-gold-deep">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-[22px] font-semibold text-ph-ink">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ph-muted">{p.desc}</p>
            </BlurFade>
          ))}
        </div>

        {/* Figures */}
        <dl className="mt-16 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <BlurFade
              key={s.label}
              delay={i * 0.08}
              className="border-l border-ph-line pl-6 pr-4 lg:pl-8"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-[3.25rem] font-medium leading-none tracking-[-0.03em] text-ph-navy lg:text-[4rem]">
                  <NumberTicker value={s.value} delay={0.1 + i * 0.1} />
                  {s.suffix}
                </span>
                <span aria-hidden className="mt-3 block max-w-[200px] text-[13.5px] leading-snug text-ph-muted">
                  {s.label}
                </span>
              </dd>
            </BlurFade>
          ))}
        </dl>
      </div>
    </section>
  )
}
