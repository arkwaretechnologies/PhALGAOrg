import Link from 'next/link'
import { ArrowRight, BookMarked, FileClock, Images, Landmark, Newspaper, Presentation, ScrollText, FileSearch, NotebookPen } from 'lucide-react'
import SubpageLayout from '@/components/SubpageLayout'
import { GroupHeader } from '@/components/SubpageFilter'
import { slugify } from '@/lib/utils'
import { BlurFade } from '@/components/ui/blur-fade'

export const metadata = {
  title: 'PhALGA Archives',
  description:
    'Browse the archives of the Philippine Association of Local Government Accountants - historical documents, past conferences, and important records.',
}

const archiveCategories = [
  {
    title: 'Historical Documents',
    kicker: 'Foundations',
    description: 'Important documents and records from PhALGA’s history',
    items: [
      { icon: Landmark, title: 'Founding Documents', description: 'Original documents from the establishment of PhALGA' },
      { icon: ScrollText, title: 'Constitution & By-Laws', description: 'Governing documents of the association' },
      { icon: FileClock, title: 'Annual Reports', description: 'Historical annual reports and summaries' },
    ],
  },
  {
    title: 'Past Conferences',
    kicker: 'Proceedings',
    description: 'Records and materials from previous conferences',
    items: [
      { icon: BookMarked, title: 'Conference Proceedings', description: 'Documentation from past annual and geographical conferences' },
      { icon: Images, title: 'Conference Photos', description: 'Photo galleries from previous events' },
      { icon: Presentation, title: 'Presentations & Lectures', description: 'Archived presentations and lecture materials' },
    ],
  },
  {
    title: 'Publications',
    kicker: 'Communications',
    description: 'Newsletters, circulars, and publications',
    items: [
      { icon: Newspaper, title: 'Newsletters', description: 'Past newsletters and member communications' },
      { icon: NotebookPen, title: 'Circulars Archive', description: 'Historical circulars and announcements' },
      { icon: FileSearch, title: 'Research Papers', description: 'Research and studies conducted by PhALGA' },
    ],
  },
]

export default function ArchivesPage() {
  return (
    <SubpageLayout
      eyebrow="Records & history"
      title="Archives"
      subtitle="Explore our historical records, documents, and conference archives."
    >
      <div className="container-site space-y-20 py-16 lg:py-24">
        {archiveCategories.map((category) => (
          <section key={category.title} aria-labelledby={slugify(category.title)}>
            <BlurFade>
              <GroupHeader id={slugify(category.title)} kicker={category.kicker} title={category.title} description={category.description} />
            </BlurFade>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {category.items.map((item, i) => (
                <BlurFade key={item.title} delay={i * 0.06}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ph-line bg-white p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ph-mist text-ph-navy">
                        <item.icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="rounded-full border border-ph-line px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ph-muted">
                        Being digitised
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[20px] font-semibold text-ph-ink">{item.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ph-muted">{item.description}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </section>
        ))}

        <BlurFade>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ph-mist p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-ph-ink">Looking for a specific record?</h2>
              <p className="mt-1 text-[14.5px] text-ph-muted">
                Archives are being organised and digitised. For specific requests, contact the Secretariat.
              </p>
            </div>
            <Link href="/contact" className="btn-primary group shrink-0">
              Request a record
              <ArrowRight className="arrow-nudge h-4 w-4" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </SubpageLayout>
  )
}
