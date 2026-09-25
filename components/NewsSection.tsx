import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHeading, { accent } from '@/components/SectionHeading'
import { BlurFade } from '@/components/ui/blur-fade'

const updates = [
  {
    agency: 'COA',
    kind: 'Circular',
    title: 'COA Circular 2019-001 — Barangay Accounting',
    desc: 'Guidelines on proper accounting procedures for barangay funds and assets.',
    date: '2019',
  },
  {
    agency: 'DILG',
    kind: 'Policy',
    title: 'Mandanas Ruling Update',
    desc: 'Implementation guidelines and implications of the Mandanas-Garcia ruling for LGU budget allocations.',
    date: 'August 2023',
  },
  {
    agency: 'OP',
    kind: 'Advisory',
    title: 'Executive Order 77 — Local Finance',
    desc: 'Fiscal and financial administration guidelines for local government units.',
    date: 'March 2019',
  },
]

export default function NewsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Regulatory updates"
            title={['Circulars &', accent('advisories')]}
            lede="Key issuances from COA, DILG and national agencies that shape how LGU accountants work."
          />
          <BlurFade delay={0.2}>
            <Link href="/circulars" className="btn-outline group shrink-0">
              All circulars
              <ArrowRight className="arrow-nudge h-4 w-4" />
            </Link>
          </BlurFade>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {updates.map((u, i) => (
            <BlurFade key={u.title} delay={i * 0.08}>
              <Link
                href="/circulars"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ph-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ph-navy/20 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ph-navy font-display text-[13px] font-semibold tracking-wide text-ph-gold-light">
                    {u.agency}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ph-muted">{u.kind}</span>
                </div>
                <h3 className="mt-8 font-display text-[21px] font-semibold leading-snug text-ph-ink">{u.title}</h3>
                <p className="mb-8 mt-3 text-[14.5px] leading-relaxed text-ph-muted">{u.desc}</p>
                <div className="mt-auto flex items-center justify-between border-t border-ph-line pt-5 text-[13px]">
                  <span className="text-ph-muted">{u.date}</span>
                  <ArrowUpRight className="h-4 w-4 text-ph-navy transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                {/* Gold rule that grows along the bottom edge on hover */}
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ph-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
