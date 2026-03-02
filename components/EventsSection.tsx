import Link from 'next/link'

const events = [
  {
    day: '20',
    month: 'ANC 2025',
    title: '20th Annual National Conference',
    meta: ['📍 Philippines', '🗓 2025'],
    desc: "The landmark 20th edition of PhALGA's flagship national conference. Keynotes, technical sessions, and networking for LGU accountants nationwide.",
    link: 'Download Materials →',
    href: '/downloads',
    gradient: 'from-ph-blue-dark to-ph-blue-light',
  },
  {
    day: '17',
    month: 'MINDANAO',
    title: '17th Mindanao Geographical Conference',
    meta: ['📍 Zamboanga City'],
    desc: 'Topics covered EOPT, fiscal administration, gender planning, and budgeting for Mindanao LGUs.',
    link: 'Get Lectures →',
    href: '/downloads',
    gradient: 'from-ph-red to-[#a50d1f]',
  },
  {
    day: '17',
    month: 'N. LUZON',
    title: '17th Northern Luzon Geo Conference',
    meta: ['📍 Northern Luzon'],
    desc: 'Sessions covering RA 6713, RA 3019, barangay budgeting, and anti-corruption topics for northern LGUs.',
    link: 'Get Lectures →',
    href: '/downloads',
    gradient: 'from-[#1a3a70] to-[#2c5ac0]',
  },
]

export default function EventsSection() {
  return (
    <section id="events" className="py-24 bg-ph-white">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <div className="section-label"><span>Upcoming & Recent</span></div>
            <h2 className="section-title">Events & <span className="accent">Conferences</span></h2>
          </div>
          <Link href="/events" className="text-sm font-semibold text-ph-blue no-underline">
            View all events →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-6">
          {events.map((e, i) => (
            <article key={e.title} className="fade-up rounded-[18px] overflow-hidden border border-ph-border transition-all hover:-translate-y-1 hover:shadow-ph-lg">
              <div className={`bg-gradient-to-br ${e.gradient} p-8 min-h-[180px] flex flex-col justify-end relative`}>
                <div className="absolute top-6 right-6 bg-ph-gold rounded-[10px] px-3 py-2 text-center">
                  <span className="font-display text-2xl font-black text-ph-blue-dark leading-none block">{e.day}</span>
                  <span className="text-[11px] font-bold text-ph-blue-dark uppercase tracking-wide block">{e.month}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white leading-snug">{e.title}</h3>
              </div>
              <div className="bg-white p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {e.meta.map((m) => (
                    <span key={m} className="text-xs text-ph-text-muted flex items-center gap-1">{m}</span>
                  ))}
                </div>
                <p className="text-[13px] text-ph-text-muted leading-relaxed">{e.desc}</p>
                <Link href={e.href} className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-ph-blue hover:gap-2.5 transition-all">
                  {e.link}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
