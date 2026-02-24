import Link from 'next/link'

interface Sponsor {
  name: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  logo?: string
}

interface SponsorSectionProps {
  sponsors: Sponsor[]
}

export default function SponsorSection({ sponsors }: SponsorSectionProps) {
  const tiers = ['platinum', 'gold', 'silver', 'bronze'] as const
  const tierLabels = {
    platinum: 'Platinum Sponsors',
    gold: 'Gold Sponsors',
    silver: 'Silver Sponsors',
    bronze: 'Bronze Sponsors',
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Thank you to our 2026 Sponsors
          </h2>
          <Link
            href="/contact"
            className="text-philippine-blue hover:text-blue-900 font-semibold inline-flex items-center"
          >
            Become a Sponsor
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {tiers.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier)
          if (tierSponsors.length === 0) return null

          return (
            <div key={tier} className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{tierLabels[tier]}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {tierSponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center h-32 hover:shadow-md transition-shadow"
                  >
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-20 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm text-center">{sponsor.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
