import Link from 'next/link'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { RevealHeading } from '@/components/ui/reveal-heading'

export default function DownloadsSection() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-site">
        <BlurFade>
          <div className="relative overflow-hidden rounded-[2rem] bg-ph-navy px-7 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
            <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              src="/assets/sun-light.svg"
              alt=""
              className="pointer-events-none absolute -right-24 -top-24 w-[520px] max-w-none animate-spin-slow opacity-[0.12]"
            />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-[600px] rounded-full bg-ph-gold/25 blur-[120px]" />

            <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="eyebrow eyebrow-light">Resource library</p>
                <RevealHeading
                  className="mt-5 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[2.6rem] lg:text-[3.1rem]"
                  parts={['Every lecture deck and circular,', { text: 'in one place.', className: 'italic font-medium text-ph-gold-light' }]}
                />
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
                  Download presentations from national and regional conferences, and reference materials from COA, DBM,
                  DILG and BIR.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/downloads" className="btn-gold group">
                  Browse downloads
                  <ArrowRight className="arrow-nudge h-4 w-4" />
                </Link>
                <Link href="/login" className="btn-outline-light">
                  <LockKeyhole className="h-4 w-4" />
                  Member login
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
