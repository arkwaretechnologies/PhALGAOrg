import Section from '@/components/Section'
import Card from '@/components/Card'
import Button from '@/components/Button'
import SubpageLayout from '@/components/SubpageLayout'

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
    <SubpageLayout
      title="Events"
      subtitle="Join us for conferences, training, and networking opportunities."
      eyebrow="Philippine Association of Local Government Accountants"
    >
      {/* Events Sections — about-page style, centered */}
      <Section className="bg-white py-20 px-6 sm:px-8">
        <div className="max-w-[1100px] mx-auto space-y-20">
          {eventTypes.map((eventType, typeIndex) => (
            <div key={typeIndex} className="flex flex-col items-center text-center">
              <div className="section-label justify-center mb-2">
                <span>Conferences &amp; Events</span>
              </div>
              <h2 className="section-title text-center mb-4">
                {eventType.title}
              </h2>
              <p className="section-sub mx-auto text-center mb-10">
                {eventType.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 w-full">
                {eventType.events.map((event, index) => (
                  <div key={index} className="w-full min-w-[280px] max-w-[400px]">
                    <Card
                      title={event.title}
                      description={`Location: ${event.location}`}
                      date={event.date}
                      href={`/downloads?event=${encodeURIComponent(event.title)}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Photo Gallery — about-page style, centered */}
      <Section className="bg-[#F0F3FA] py-20 px-6 sm:px-8">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="section-label justify-center mb-2">
            <span>Gallery</span>
          </div>
          <h2 className="section-title text-center mb-2">
            Photo <span className="accent">Gallery</span>
          </h2>
          <p className="section-sub mx-auto mb-10">
            View photos from our recent events and conferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square w-[160px] sm:w-[180px] bg-gradient-to-br from-ph-blue to-ph-blue-dark rounded-xl flex items-center justify-center text-white font-semibold shadow-lg"
              >
                Photo {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA — about-page style, centered */}
      <Section className="bg-white py-20 px-6 sm:px-8">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="section-label justify-center mb-2">
            <span>Stay in Touch</span>
          </div>
          <h2 className="section-title text-center mb-4">
            Stay <span className="accent">Updated</span>
          </h2>
          <p className="section-sub mx-auto mb-8">
            Check back regularly for upcoming events and conference announcements.
          </p>
          <Button href="/contact" variant="primary" size="large">
            Contact Us for More Information
          </Button>
        </div>
      </Section>
    </SubpageLayout>
  )
}
