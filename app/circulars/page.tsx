import Link from 'next/link'
import { ArrowUpRight, Info } from 'lucide-react'
import SubpageLayout from '@/components/SubpageLayout'
import { GroupHeader } from '@/components/SubpageFilter'
import { slugify } from '@/lib/utils'
import { BlurFade } from '@/components/ui/blur-fade'
import { circularCategories } from '@/lib/content'

export const metadata = {
  title: 'Circulars',
  description:
    'Latest circulars, memorandums, and official communications from COA, DILG, and other government agencies relevant to local government accountants.',
}

export default function CircularsPage() {
  return (
    <SubpageLayout
      eyebrow="Regulatory updates"
      title="Circulars"
      titleAccent="& Memoranda"
      subtitle="Issuances from COA, DILG and national agencies that govern local government accounting."
    >
      <div className="container-site py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Jump list */}
          <aside className="hidden lg:block">
            <nav aria-label="Circular categories" className="sticky top-32">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ph-muted">On this page</p>
              <ul className="mt-4 space-y-1 border-l border-ph-line">
                {circularCategories.map((c) => (
                  <li key={c.title}>
                    <a
                      href={`#${slugify(c.title)}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[14px] text-ph-muted transition-colors hover:border-ph-gold hover:text-ph-ink"
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-16">
            {circularCategories.map((category) => (
              <section key={category.title} id={slugify(category.title)} className="scroll-mt-32">
                <BlurFade>
                  <GroupHeader
                    id={`${slugify(category.title)}-title`}
                    kicker={category.shortTitle}
                    title={category.title}
                    description={category.description}
                    count={category.circulars.length}
                  />
                </BlurFade>
                <ul className="divide-y divide-ph-line">
                  {category.circulars.map((c, i) => (
                    <BlurFade as="li" key={c.title} delay={i * 0.05}>
                      <Link
                        href={`/downloads?category=circulars&item=${encodeURIComponent(c.title)}`}
                        className="group relative grid grid-cols-[52px_1fr_auto] items-center gap-5 py-6"
                      >
                        <span className="absolute inset-y-1 -left-4 -right-4 origin-left scale-x-0 rounded-2xl bg-white shadow-card transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-ph-navy font-display text-[12.5px] font-semibold tracking-wide text-ph-gold-light">
                          {c.agency}
                        </span>
                        <span className="relative min-w-0">
                          <span className="block font-display text-[19px] font-semibold leading-snug text-ph-ink">{c.title}</span>
                          <span className="mt-1 block text-[14px] leading-relaxed text-ph-muted">{c.description}</span>
                        </span>
                        <span className="relative flex items-center gap-4">
                          <span className="hidden font-display text-[15px] italic text-ph-gold-deep sm:block">{c.date}</span>
                          <ArrowUpRight className="h-5 w-5 text-ph-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ph-navy" />
                        </span>
                      </Link>
                    </BlurFade>
                  ))}
                </ul>
              </section>
            ))}

            <BlurFade>
              <p className="flex gap-3 rounded-2xl bg-ph-mist p-5 text-[14px] leading-relaxed text-ph-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-ph-gold-deep" />
                Circulars are updated regularly. For the most current text, always refer to the official websites of COA,
                DILG and the other issuing agencies.
              </p>
            </BlurFade>
          </div>
        </div>
      </div>
    </SubpageLayout>
  )
}
