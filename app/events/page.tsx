import Section from '@/components/Section'
import Card from '@/components/Card'
import Button from '@/components/Button'

export const metadata = {
  title: 'Events',
  description: 'View upcoming and past events of PhALGA including Annual National Conferences and Geographical Conferences.',
}

export default function EventsPage() {
  const eventTypes = [
    {
      title: 'Annual National Conference',
      description: 'Our premier annual event bringing together local government accountants from across the country. Features updates on COA circulars, DILG memorandums, and best practices.',
      events: [
        { title: '20th Annual National Conference', date: '2024', location: 'Iloilo City' },
        { title: '19th Annual National Conference', date: '2023', location: 'Baguio City' },
      ],
    },
    {
      title: 'Geographical Conferences',
      description: 'Regional conferences covering Northern Luzon, Southern Luzon, Visayas, and Mindanao with comprehensive lectures and updates.',
      events: [
        { title: '17th Northern Luzon Geographical Conference', date: '2024', location: 'Laoag City' },
        { title: '17th Southern Luzon Geographical Conference', date: '2024', location: 'To be announced' },
        { title: '17th Visayas Geographical Conference', date: '2024', location: 'Dumaguete City' },
        { title: '17th Mindanao Geographical Conference', date: '2024', location: 'Zamboanga City' },
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-philippine-blue to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Events
          </h1>
          <p className="text-xl text-blue-100">
            Join us for conferences, training, and networking opportunities.
          </p>
        </div>
      </Section>

      {/* Events Sections */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          {eventTypes.map((eventType, typeIndex) => (
            <div key={typeIndex}>
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {eventType.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {eventType.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventType.events.map((event, index) => (
                  <Card
                    key={index}
                    title={event.title}
                    description={`Location: ${event.location}`}
                    date={event.date}
                    href={`/downloads?event=${encodeURIComponent(event.title)}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Photo Gallery Section */}
      <Section className="bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Photo Gallery</h2>
          <p className="section-subtitle text-center">
            View photos from our recent events and conferences.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gradient-to-br from-philippine-blue to-blue-900 rounded-lg flex items-center justify-center text-white font-semibold"
              >
                Photo {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Check back regularly for upcoming events and conference announcements.
          </p>
          <Button href="/contact" variant="primary" size="large">
            Contact Us for More Information
          </Button>
        </div>
      </Section>
    </>
  )
}
