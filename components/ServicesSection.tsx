import Link from 'next/link'

const services = [
  { icon: '🗓', title: 'Annual National Conference', desc: 'Our flagship yearly event bringing together LGU accountants for learning, recognition, and professional networking across the Philippines.', href: '/events', featured: true },
  { icon: '🗺', title: 'Geographical Conferences', desc: 'Regional seminars in Luzon, Visayas, and Mindanao tailored to the specific challenges and regulatory context of each area.', href: '/events', featured: false },
  { icon: '📄', title: 'COA Circulars & Updates', desc: 'Stay current with the latest Commission on Audit regulations, circulars, and compliance guidelines for LGU accounting practices.', href: '/circulars', featured: false },
  { icon: '📚', title: 'Resource Downloads', desc: 'Extensive library of presentation materials, lecture decks, and reference documents from past conferences and events.', href: '/downloads', featured: false },
  { icon: '🧑‍💼', title: 'Officer Directory', desc: "Meet the national officers, council of advisers, and regional leaders who guide PhALGA's mission and governance.", href: '/about/officers', featured: false },
  { icon: '📝', title: 'Membership & Registration', desc: 'Join the growing community of LGU accounting professionals and gain access to exclusive events, materials, and support networks.', href: '/contact', featured: false },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-ph-off-white">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <div className="section-label"><span>What We Offer</span></div>
            <h2 className="section-title">Programs & <span className="accent">Services</span></h2>
          </div>
          <Link href="/events" className="btn-primary text-sm py-3 px-6">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className={`fade-up group bg-white rounded-[18px] p-8 border border-ph-border transition-all hover:-translate-y-1 hover:shadow-ph-lg relative overflow-hidden ${s.featured ? 'border-ph-blue' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 transition-transform origin-left ${s.featured ? 'scale-x-100 bg-ph-gold' : 'scale-x-0 group-hover:scale-x-100 bg-ph-blue'}`} />
              <div className="w-[52px] h-[52px] rounded-xl bg-ph-blue/10 flex items-center justify-center text-2xl mb-5">
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-ph-text mb-3">{s.title}</h3>
              <p className="text-sm text-ph-text-muted leading-relaxed">{s.desc}</p>
              <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-ph-blue group-hover:gap-2.5 transition-all">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
