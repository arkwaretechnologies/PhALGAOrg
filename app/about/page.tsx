import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Archive, Mail, ShieldCheck, Users } from 'lucide-react'
import SubpageLayout from '@/components/SubpageLayout'
import SectionHeading, { accent } from '@/components/SectionHeading'
import HistoryVideo from '@/components/HistoryVideo'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Timeline } from '@/components/ui/timeline'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { milestones } from '@/lib/content'
import { site } from '@/lib/site'

export const metadata = {
  title: 'About',
  description:
    'The mission, vision, values and founding history of the Philippine Association of Local Government Accountants (PhALGA), Inc.',
}

const values = [
  {
    title: 'Professional Excellence',
    description:
      'We are committed to promoting excellence in local government accounting through continuous learning and professional development.',
  },
  {
    title: 'Knowledge Sharing',
    description:
      'We foster a culture of knowledge sharing, ensuring that best practices and updates reach all local government accountants across the Philippines.',
  },
  {
    title: 'Advocacy & Support',
    description:
      'We advocate for the interests of local government accountants and provide support in navigating complex regulations and standards.',
  },
  {
    title: 'Networking & Collaboration',
    description:
      'We create opportunities for local government accountants to connect, collaborate, and learn through conferences and events.',
  },
]

// The Officers and Board of Directors elected on August 21, 2004
const foundingExecutives = [
  { name: 'Carina S. Padua', role: 'President', lead: true },
  { name: 'Evangeline P. Cruz', role: 'Vice-President', lead: true },
  { name: 'Joan Mila L. Montegrande', role: 'Secretary' },
  { name: 'Rosemarie V. Lerio', role: 'Treasurer' },
  { name: 'Emmanuel D. Magsino', role: 'Auditor' },
  { name: 'Romeo T. Del Mundo', role: 'PRO' },
  { name: 'Roselie A. Pangilinan', role: 'PRO' },
]

const foundingDirectors = [
  'Nelia F. Carvajal',
  'Carmina V. Esperidion',
  'Magnerecio D. Pascua',
  'Cecilia C. Principio',
  'Merlinda P. Santiago',
  'Leonisa T. Santos',
  'Bernadette B. Valenzuela',
]

const links = [
  { icon: Users, title: 'National Officers', desc: 'Meet the 2025–2026 leadership team', href: '/about/officers' },
  { icon: Archive, title: 'Archives', desc: 'Browse historical records and documents', href: '/about/archives' },
  { icon: Mail, title: 'Contact Us', desc: 'Reach out to the PhALGA secretariat', href: '/contact' },
]

/** "Carina S. Padua" → "CP" */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

export default function AboutPage() {
  return (
    <SubpageLayout
      eyebrow="Established 2004"
      title="About"
      titleAccent="PhALGA"
      subtitle="Supporting and empowering local government accountants across every island of the Philippines — from barangay to province."
    >
      {/* ── Mission ── */}
      <section className="py-24 lg:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our mission" title={['Dedicated to', accent('accountable'), 'local governance']} />
            <BlurFade delay={0.1}>
              <div className="lede mt-6 space-y-5">
                <p>
                  PhALGA is dedicated to supporting, empowering, and advancing the profession of local government
                  accounting in the Philippines. We work tirelessly to ensure accountants have access to the latest
                  information, training, and resources.
                </p>
                <p>
                  Our mission extends to all local government units — from barangays to cities and provinces. Through
                  conferences, training programs, and updates on government accounting standards, we help members stay
                  current with COA regulations, DILG memorandums, and best practices in public financial management.
                </p>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={0.15} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
              {/* Scaled from the bottom so the photo's printed caption stays out of frame */}
              <Image
                src="/newofficer.jpg"
                alt="PhALGA officers in formal Filipiniana attire"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="origin-bottom scale-[1.45] object-cover object-bottom"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 grid grid-cols-2 gap-3 sm:left-auto sm:right-[-1rem] sm:w-[340px]">
              <div className="rounded-2xl bg-ph-navy p-5 text-white shadow-lift">
                <p className="font-display text-[2.4rem] font-medium leading-none text-ph-gold-light">
                  2004
                </p>
                <p className="mt-2 text-[12.5px] leading-snug text-white/70">Founded in Calamba City, Laguna</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-lift">
                <p className="font-display text-[2.4rem] font-medium leading-none text-ph-navy">
                  <NumberTicker value={17} />
                </p>
                <p className="mt-2 text-[12.5px] leading-snug text-ph-muted">Editions of the regional geo-conferences</p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="relative overflow-hidden bg-ph-navy-deep py-24 text-white lg:py-32">
        <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden
          src="/assets/sun-light.svg"
          alt=""
          className="pointer-events-none absolute -left-32 top-1/2 w-[560px] max-w-none -translate-y-1/2 animate-spin-slow opacity-[0.08]"
        />
        <div className="container-site relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Our vision"
              title={['A Philippines where every', accent('LGU accountant', true), 'excels']}
            />
            <BlurFade delay={0.1}>
              <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-white/70">
                <p>
                  We envision a Philippines where every local government accountant is equipped with the knowledge,
                  skills, and support needed to ensure transparent, accountable, and efficient financial management in
                  their LGU.
                </p>
                <p>
                  Through our efforts, we aim to elevate the standards of local government accounting, promote
                  professional excellence, and contribute to good governance and public trust in local government
                  financial management.
                </p>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={0.2} className="flex items-center">
            <figure className="relative border-l-2 border-ph-gold pl-8 lg:pl-12">
              <span aria-hidden className="absolute -top-10 left-6 font-display text-[7rem] leading-none text-ph-gold/30 lg:left-10">
                “
              </span>
              <blockquote className="relative font-display text-[1.6rem] font-normal italic leading-[1.35] text-white sm:text-[2rem]">
                We envision local government accounting as the bedrock of transparent governance — building public trust,
                one audit at a time.
              </blockquote>
              <figcaption className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-ph-gold-light">
                PhALGA Vision Statement
              </figcaption>
            </figure>
          </BlurFade>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 lg:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="What we stand for" title={['Our core', accent('values')]} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <BlurFade key={v.title} delay={i * 0.08}>
                <SpotlightCard className="h-full rounded-3xl border border-ph-line bg-white transition-shadow duration-500 hover:shadow-lift">
                  <div className="flex h-full flex-col p-7">
                    <span className="font-display text-[3rem] font-medium italic leading-none text-ph-gold/60">0{i + 1}</span>
                    <h3 className="mt-8 font-display text-[21px] font-semibold text-ph-ink">{v.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ph-muted">{v.description}</p>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── History ── */}
      <section className="relative overflow-hidden bg-ph-mist py-24 lg:py-32">
        <div className="container-site relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
            <SectionHeading
              eyebrow="Our history"
              title={['How', accent('PhALGA'), 'began']}
              lede="Accountants play a major role in every government agency, which made a unified national organisation of accountants throughout the archipelago both vital and necessary. This is the story of how it came to be."
            />
            <BlurFade delay={0.1}>
              <HistoryVideo />
              <p className="mt-4 text-center text-[13px] italic text-ph-muted">
                PhALGA History — the founding of the association, in the members’ own words.
              </p>
            </BlurFade>
          </div>

          <div className="mt-10">
            <Timeline
              data={milestones.map((m) => ({
                title: m.date.replace(/^[A-Za-z]+ \d+, /, ''),
                content: (
                  <BlurFade>
                    <article className="max-w-2xl rounded-3xl border border-ph-line bg-white p-7 shadow-card">
                      <p className="font-display text-[14px] italic text-ph-gold-deep">{m.date}</p>
                      <h3 className="mt-2 font-display text-[22px] font-semibold text-ph-ink">{m.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ph-muted">{m.text}</p>
                    </article>
                  </BlurFade>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* ── Founding officers ── */}
      <section className="py-24 lg:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Charter leadership"
            title={['Founding', accent('officers'), '& Board of Directors']}
            lede="Elected at the One Day Joint Conference of Local Government Accountants on August 21, 2004 in Calamba City, Laguna — the first slate to lead PhALGA."
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foundingExecutives.map((o, i) => (
              <BlurFade
                as="li"
                key={`${o.name}-${o.role}`}
                delay={i * 0.05}
                className={o.lead ? 'sm:col-span-2 lg:col-span-2' : undefined}
              >
                <div
                  className={
                    o.lead
                      ? 'group flex h-full items-center gap-5 rounded-3xl bg-ph-navy p-6 text-white'
                      : 'group flex h-full items-center gap-4 rounded-3xl border border-ph-line bg-white p-5 transition-colors hover:border-ph-navy/25'
                  }
                >
                  <span
                    aria-hidden
                    className={
                      o.lead
                        ? 'flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ph-gold-light/50 font-display text-[20px] text-ph-gold-light transition-transform duration-500 group-hover:rotate-[-8deg]'
                        : 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ph-mist font-display text-[15px] text-ph-navy transition-colors duration-300 group-hover:bg-ph-navy group-hover:text-white'
                    }
                  >
                    {initials(o.name)}
                  </span>
                  <div>
                    <p className={o.lead ? 'font-display text-[21px] font-semibold' : 'text-[15px] font-semibold text-ph-ink'}>
                      {o.name}
                    </p>
                    <p className={o.lead ? 'mt-0.5 text-[13px] text-ph-gold-light' : 'mt-0.5 text-[13px] text-ph-muted'}>
                      {o.role}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </ul>

          <BlurFade className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ph-muted">Board of Directors</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {foundingDirectors.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 rounded-full border border-ph-line bg-white py-1.5 pl-1.5 pr-4 text-[14px] text-ph-ink"
                >
                  <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-ph-mist font-display text-[11px] text-ph-navy">
                    {initials(name)}
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </BlurFade>

          <BlurFade className="mt-12">
            <div className="flex flex-col gap-5 rounded-3xl bg-ph-mist p-7 sm:flex-row sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ph-navy text-ph-gold-light">
                <ShieldCheck className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-display text-[20px] font-semibold text-ph-ink">
                  Registered with the Securities and Exchange Commission
                </h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-ph-muted">
                  PhALGA, Inc. was registered on September 24, 2004 under SEC Registration No. {site.secRegistration}. For
                  the association’s present leadership, see the{' '}
                  <Link href="/about/officers" className="font-semibold text-ph-navy underline decoration-ph-gold underline-offset-4">
                    current National Officers
                  </Link>
                  .
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── Explore ── */}
      <section className="pb-24 lg:pb-32">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-3">
            {links.map((l, i) => (
              <BlurFade key={l.href} delay={i * 0.08}>
                <Link
                  href={l.href}
                  className="group flex h-full items-center gap-5 rounded-3xl border border-ph-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ph-navy hover:bg-ph-navy hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ph-mist text-ph-navy transition-colors duration-500 group-hover:bg-white/10 group-hover:text-ph-gold-light">
                    <l.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[19px] font-semibold text-ph-ink transition-colors duration-500 group-hover:text-white">
                      {l.title}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] text-ph-muted transition-colors duration-500 group-hover:text-white/60">
                      {l.desc}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ph-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ph-gold-light" />
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </SubpageLayout>
  )
}
