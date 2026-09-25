import SubpageLayout from '@/components/SubpageLayout'
import PastPresidentsTimeline from '@/components/PastPresidentsTimeline'
import { getPastPresidents } from '@/lib/pastPresidents'

export const metadata = {
  title: 'Past Presidents',
  description:
    'Past National Presidents of the Philippine Association of Local Government Accountants (PhALGA), Inc.',
}

export default function PastPresidentsPage() {
  const presidents = getPastPresidents()

  return (
    <SubpageLayout
      title="Past"
      titleAccent="Presidents"
      subtitle="Honoring the leaders who have guided PhALGA through decades of service to local government accountants nationwide."
      eyebrow="Since 2004"
    >
      <PastPresidentsTimeline presidents={presidents} />
    </SubpageLayout>
  )
}
