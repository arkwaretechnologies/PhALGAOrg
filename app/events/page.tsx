import SubpageLayout from '@/components/SubpageLayout'
import EventsBrowser, { type EventSeries } from '@/components/EventsBrowser'

export const metadata = {
  title: 'Events',
  description: 'View upcoming and past events of PhALGA including Annual National Conferences and Geographical Conferences.',
}

const eventSeries: EventSeries[] = [
  {
    title: 'Annual National Conference',
    shortTitle: 'National',
    kicker: 'Flagship Event',
    description:
      'Our premier annual event bringing together local government accountants from across the country. Features updates on COA circulars, DILG memorandums, and best practices.',
    events: [
      { title: '20th Annual National Conference', edition: '20', badge: 'ANC 2024', date: '2024', location: 'Iloilo City' },
      { title: '19th Annual National Conference', edition: '19', badge: 'ANC 2023', date: '2023', location: 'Baguio City' },
    ],
  },
  {
    title: 'Geographical Conferences',
    shortTitle: 'Geographical',
    kicker: 'Regional Programme',
    description:
      'Regional conferences covering Northern Luzon, Southern Luzon, Visayas, and Mindanao with comprehensive lectures and updates.',
    events: [
      {
        title: '17th Northern Luzon Geographical Conference',
        edition: '17',
        badge: 'N. Luzon',
        date: '2024',
        location: 'Laoag City',
      },
      {
        title: '17th Southern Luzon Geographical Conference',
        edition: '17',
        badge: 'S. Luzon',
        date: '2024',
        location: 'To be announced',
      },
      {
        title: '17th Visayas Geographical Conference',
        edition: '17',
        badge: 'Visayas',
        date: '2024',
        location: 'Dumaguete City',
      },
      {
        title: '17th Mindanao Geographical Conference',
        edition: '17',
        badge: 'Mindanao',
        date: '2024',
        location: 'Zamboanga City',
      },
    ],
  },
]

export default function EventsPage() {
  return (
    <SubpageLayout
      title="Events"
      subtitle="Join us for conferences, training, and networking opportunities."
      eyebrow="Philippine Association of Local Government Accountants"
    >
      <div className="subpage-center-ref">
        <div className="subpage-center-ref-inner w-full">
          <EventsBrowser series={eventSeries} />
        </div>
      </div>
    </SubpageLayout>
  )
}
