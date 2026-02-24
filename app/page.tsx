import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Card from '@/components/Card'
import Button from '@/components/Button'
import NewsCard from '@/components/NewsCard'
import TestimonialCard from '@/components/TestimonialCard'
import OfficersGallery from '@/components/OfficersGallery'
import EventCard from '@/components/EventCard'
import SponsorSection from '@/components/SponsorSection'

export const metadata = {
  title: 'Home',
  description: 'Welcome to PhALGA - Philippine Association of Local Government Accountants. Supporting and empowering local government accountants across the Philippines.',
}

export default function HomePage() {
  const newsItems = [
    {
      headline: 'CONFERENCE NEWS',
      title: '20th Annual National Conference Updates',
      date: '12/15/2024',
      href: '/events',
      image: '/newofficer.jpg',
    },
    {
      headline: 'CIRCULAR NEWS',
      title: 'Latest COA Circular Updates and Guidelines',
      date: '12/10/2024',
      href: '/circulars',
      image: '/newofficer.jpg',
    },
  ]

  const testimonials = [
    {
      quote: 'My membership allows me to access educational content and talk to industry experts about what they\'re seeing in the marketplace that I can take back and help grow my program. I\'ve been a member of PhALGA for many years, and I can\'t say enough good things about being a part of this excellent association.',
      author: 'Maria Santos',
      position: 'City Accountant',
      organization: 'Manila City Government',
    },
    {
      quote: 'PhALGA membership brings two opportunities that I find most valuable: access to training and access to our industry\'s professional network. There you have access to your industry professional networks so you\'re able to engage in conversations, identify current trends, hot topics, and solutions that you maybe never thought of.',
      author: 'Juan Dela Cruz',
      position: 'Provincial Accountant',
      organization: 'Laguna Provincial Government',
    },
    {
      quote: 'In an industry as dynamic as local government accounting, my PhALGA membership provides numerous opportunities to stay abreast of current industry issues, as well as a valuable gateway to connect and build relationships with other industry professionals as I strive to best serve our local government units.',
      author: 'Ana Garcia',
      position: 'Municipal Accountant',
      organization: 'Quezon City Government',
    },
  ]

  const upcomingEvents = [
    {
      month: 'MAR',
      date: '8-10',
      type: 'Annual Conference',
      title: '20th Annual National Conference',
      location: 'Manila, Philippines',
      href: '/events',
    },
    {
      month: 'APR',
      date: '15-17',
      type: 'Geographical Conference',
      title: '17th Northern Luzon Conference',
      location: 'Baguio City, Philippines',
      href: '/events',
    },
    {
      month: 'MAY',
      date: '20-22',
      type: 'Geographical Conference',
      title: '17th Southern Luzon Conference',
      location: 'Tagaytay City, Philippines',
      href: '/events',
    },
  ]

  const sponsors = [
    { name: 'Commission on Audit', tier: 'platinum' as const },
    { name: 'Department of Budget and Management', tier: 'platinum' as const },
    { name: 'Department of the Interior and Local Government', tier: 'platinum' as const },
    { name: 'Bureau of Internal Revenue', tier: 'gold' as const },
    { name: 'Local Government Academy', tier: 'gold' as const },
    { name: 'Government Procurement Policy Board', tier: 'gold' as const },
  ]

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Welcome to PhALGA"
        subtitle="Philippine Association of Local Government Accountants, Inc."
        ctaText="Get Started"
        ctaHref="/about"
        image="/newofficer.jpg"
      />

      {/* News Section */}
      <Section className="bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Vertical News Label */}
            <div className="hidden lg:flex items-start">
              <div className="bg-cyan-500 text-white px-4 py-8 rounded-lg">
                <h2 className="text-2xl font-bold writing-vertical-rl transform rotate-180">
                  News
                </h2>
              </div>
            </div>
            
            {/* News Cards Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsItems.map((item, index) => (
                  <NewsCard
                    key={index}
                    title={item.title}
                    headline={item.headline}
                    date={item.date}
                    href={item.href}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Officers Gallery */}
      <OfficersGallery />

      {/* Main Content Section */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Navigating Excellence in Local Government Accounting
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                In a time defined by rapid transformation, emerging regulations, and unprecedented challenges,
                local government accountants must be more agile, informed, and forward-thinking. PhALGA's 2026
                Annual Conference, <strong>Navigating Excellence in Local Government Accounting</strong>, is a
                premier event that brings together the industry's thought leaders, experts, and professionals
                to explore the evolving landscape of public financial management and resilience.
              </p>
              <Button href="/events" variant="primary" size="large">
                Learn More About Our Conference
              </Button>
            </div>
            <div className="bg-gradient-to-br from-philippine-blue to-blue-900 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Join PhALGA</h3>
              <p className="text-blue-100 mb-6">
                Today's local government accountants are continually seeking creative, innovative ideas to
                optimize their financial management and drive organizational success. PhALGA is a catalyst for
                networking and sharing these creative ideas.
              </p>
              <Button href="/contact" variant="secondary" size="large" className="bg-philippine-yellow text-gray-900 hover:bg-yellow-400">
                Join PhALGA
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Member Spotlights */}
      <Section className="bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Member Spotlight</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
                organization={testimonial.organization}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Industry Events */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Industry Events</h2>
            <Button href="/events" variant="outline" size="medium">
              View all events
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={index}
                month={event.month}
                date={event.date}
                type={event.type}
                title={event.title}
                location={event.location}
                href={event.href}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Sponsors */}
      <SponsorSection sponsors={sponsors} />
    </>
  )
}
