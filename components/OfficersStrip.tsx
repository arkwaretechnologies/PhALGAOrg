import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading, { accent } from '@/components/SectionHeading'
import { BlurFade } from '@/components/ui/blur-fade'
import { Marquee } from '@/components/ui/marquee'
import { getOfficersFromPublicFolder, type OfficerFromFile } from '@/lib/officers'

function OfficerCard({ o }: { o: OfficerFromFile }) {
  return (
    <Link
      href="/about/officers"
      className="group relative block w-[300px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-500 hover:ring-ph-gold-light/60 sm:w-[400px]"
    >
      <Image
        src={`/Officers/${o.year}/${o.filename}`}
        alt={`${o.name}, ${o.position}`}
        width={800}
        height={450}
        sizes="400px"
        className="aspect-video h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <span className="pointer-events-none absolute inset-0 bg-ph-navy-deep/0 transition-colors duration-500 group-hover:bg-ph-navy-deep/10" />
    </Link>
  )
}

export default function OfficersStrip() {
  const officers = getOfficersFromPublicFolder()
  if (officers.length === 0) return null

  const year = officers[0].year.replace('-', '–')
  const half = Math.ceil(officers.length / 2)
  const rowA = officers.slice(0, half)
  const rowB = officers.slice(half)

  return (
    <section id="officers" className="relative overflow-hidden bg-ph-navy-deep py-24 text-white lg:py-32">
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[url('/assets/waves-light.svg')] bg-[length:1600px_600px] bg-bottom bg-repeat-x opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-ph-brand/30 blur-[140px]" />

      <div className="container-site relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          tone="dark"
          eyebrow={`Leadership ${year}`}
          title={['The', accent('National Officers', true)]}
          lede="Twenty-two elected leaders from LGUs across the country, steering the association's programs and advocacy this term."
        />
        <BlurFade delay={0.2}>
          <Link href="/about/officers" className="btn-gold group shrink-0">
            Meet the officers
            <ArrowRight className="arrow-nudge h-4 w-4" />
          </Link>
        </BlurFade>
      </div>

      <BlurFade delay={0.15} className="relative mt-16 space-y-5">
        <Marquee duration={70} className="mask-fade-x">
          {rowA.map((o) => (
            <OfficerCard key={o.filename} o={o} />
          ))}
        </Marquee>
        <Marquee duration={70} reverse className="mask-fade-x">
          {rowB.map((o) => (
            <OfficerCard key={o.filename} o={o} />
          ))}
        </Marquee>
      </BlurFade>
    </section>
  )
}
