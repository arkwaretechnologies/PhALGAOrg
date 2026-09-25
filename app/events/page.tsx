import SubpageLayout from '@/components/SubpageLayout'
import EventsBrowser from '@/components/EventsBrowser'
import { eventSeries } from '@/lib/content'

export const metadata = {
  title: 'Events',
  description: 'View upcoming and past events of PhALGA including Annual National Conferences and Geographical Conferences.',
}

export default function EventsPage() {
  return (
    <SubpageLayout
      eyebrow="Programs & conferences"
      title="Events"
      subtitle="Join us for conferences, training, and networking opportunities across the Philippines."
    >
      <EventsBrowser series={eventSeries} />
    </SubpageLayout>
  )
}
