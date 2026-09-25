import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import OfficersStrip from '@/components/OfficersStrip'
import EventsSection from '@/components/EventsSection'
import HistorySection from '@/components/HistorySection'
import NewsSection from '@/components/NewsSection'
import DownloadsSection from '@/components/DownloadsSection'

export const metadata = {
  title: 'Home',
  description:
    'PhALGA (Philippine Association of Local Government Accountants), Inc. — Empowering LGU accounting professionals across the Philippines through education, fellowship, and advocacy.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <OfficersStrip />
      <EventsSection />
      <HistorySection />
      <NewsSection />
      <DownloadsSection />
    </>
  )
}
