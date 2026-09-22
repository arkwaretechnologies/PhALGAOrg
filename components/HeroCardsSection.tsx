import Link from 'next/link'

const heroCards = [
  {
    icon: '📋',
    iconClass: 'bg-ph-blue/10',
    title: '20th Annual National Conference',
    desc: 'Lectures and resources now available for download',
    badge: 'New',
    badgeClass: 'bg-ph-gold text-ph-blue-dark',
    href: '/downloads',
  },
  {
    icon: '📢',
    iconClass: 'bg-ph-red/10',
    title: 'Latest COA Circulars',
    desc: 'Commission on Audit updates and guidelines',
    badge: '2025',
    badgeClass: 'bg-ph-red text-white',
    href: '/circulars',
  },
  {
    icon: '🏛',
    iconClass: 'bg-ph-gold/20',
    title: '17th Geographical Conferences',
    desc: 'Download presentation materials from the events',
    badge: 'View',
    badgeClass: 'bg-ph-blue text-white',
    href: '/downloads',
  },
]

export default function HeroCardsSection() {
  return (
    <section className="py-12 lg:py-16 bg-ph-off-white">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {heroCards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="bg-white rounded-2xl p-6 border border-ph-border shadow-[0_4px_20px_rgba(0,56,168,0.06)] flex items-start gap-4 transition-all hover:-translate-y-1 hover:shadow-ph-lg"
            >
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0 ${card.iconClass}`}>
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[15px] font-semibold text-ph-text leading-snug">
                  {card.title}
                </h4>
                <p className="text-[13px] text-ph-text-muted mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <span className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${card.badgeClass}`}>
                {card.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
