import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SubpageLayout from '@/components/SubpageLayout'
import OfficersChart from '@/components/OfficersChart'
import { getOfficersFromPublicFolder } from '@/lib/officers'

export const metadata = {
  title: 'PhALGA Officers',
  description:
    'Meet the National Officers, Board of Trustees and Council of Advisers of the Philippine Association of Local Government Accountants.',
}

export default function OfficersPage() {
  const officers = getOfficersFromPublicFolder()
  const year = officers.length > 0 ? officers[0].year.replace('-', '–') : null

  return (
    <SubpageLayout
      eyebrow={year ? `Term ${year}` : 'Leadership'}
      title="National"
      titleAccent="Officers"
      subtitle="Meet the dedicated leaders serving the Philippine Association of Local Government Accountants."
    >
      <div className="container-site py-16 lg:py-24">
        {officers.length > 0 ? (
          <OfficersChart officers={officers} />
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-ph-line bg-white p-10 text-center text-ph-muted">
            <p>
              No officer images found in <code className="rounded bg-ph-mist px-1">public/Officers</code>.
            </p>
            <p className="mt-2 text-sm">
              Add a year folder (e.g. 2025-2026) with images named like <code className="rounded bg-ph-mist px-1">01 name.jpg</code>,{' '}
              <code className="rounded bg-ph-mist px-1">02 name.jpg</code> to display them here, ordered by the number in the
              filename.
            </p>
          </div>
        )}

        <div className="mt-24 flex flex-col items-center gap-4 border-t border-ph-line pt-12 text-center">
          <p className="font-display text-[22px] text-ph-ink">
            Two decades of leadership, <span className="italic text-ph-gold-deep">one association.</span>
          </p>
          <Link href="/about/past-presidents" className="btn-outline group">
            Past National Presidents
            <ArrowRight className="arrow-nudge h-4 w-4" />
          </Link>
        </div>
      </div>
    </SubpageLayout>
  )
}
