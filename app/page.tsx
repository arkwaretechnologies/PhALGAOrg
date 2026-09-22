import Hero from '@/components/Hero'
import FlagStrip from '@/components/FlagStrip'
import HeroCardsSection from '@/components/HeroCardsSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import EventsSection from '@/components/EventsSection'
import OfficersStrip from '@/components/OfficersStrip'
import DownloadsSection from '@/components/DownloadsSection'
import NewsSection from '@/components/NewsSection'

export const metadata = {
  title: 'Home',
  description: 'PhALGA (Philippine Association of Local Government Accountants), Inc. — Empowering LGU accounting professionals across the Philippines through education, fellowship, and advocacy.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlagStrip />
      <HeroCardsSection />
      <AboutSection />
      <ServicesSection />
      <EventsSection />
      <OfficersStrip />
      <DownloadsSection />
      <NewsSection />
    </>
  )
}
