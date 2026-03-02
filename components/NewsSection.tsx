import Link from 'next/link'

const news = [
  {
    thumb: '📋',
    thumbClass: 'nt-1',
    tag: 'Circular',
    tagClass: 'bg-ph-blue/10 text-ph-blue',
    title: 'COA Circular 2019-001 – Barangay Accounting',
    desc: 'Commission on Audit guidelines on proper accounting procedures for barangay funds and assets.',
    date: '📅 2019 · Commission on Audit',
    href: '/circulars',
  },
  {
    thumb: '⚖️',
    thumbClass: 'nt-2',
    tag: 'Policy',
    tagClass: 'bg-ph-red/10 text-ph-red',
    title: 'Mandanas Ruling Update – August 2023',
    desc: 'Implementation guidelines and implications of the landmark Mandanas-Garcia ruling for LGU budget allocations.',
    date: '📅 August 2023 · DILG',
    href: '/circulars',
  },
  {
    thumb: '📢',
    thumbClass: 'nt-3',
    tag: 'Advisory',
    tagClass: 'bg-ph-gold/15 text-[#9a7d00]',
    title: 'Executive Order 77 – Local Finance',
    desc: 'Presidential executive order outlining fiscal and financial administration guidelines for local government units.',
    date: '📅 March 2019 · Office of the President',
    href: '/circulars',
  },
]

export default function NewsSection() {
  return (
    <section className="py-24 bg-ph-white">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="section-label"><span>Updates</span></div>
        <h2 className="section-title">Latest <span className="accent">Circulars & News</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {news.map((n, i) => (
            <Link
              key={n.title}
              href={n.href}
              className={`fade-up group rounded-[14px] border border-ph-border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-ph-lg`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={`h-[130px] flex items-center justify-center text-5xl ${n.thumbClass === 'nt-1' ? 'bg-gradient-to-br from-[#e8f0ff] to-[#cddaff]' : n.thumbClass === 'nt-2' ? 'bg-gradient-to-br from-[#fff0f2] to-[#ffd6db]' : 'bg-gradient-to-br from-[#fffbe0] to-[#fff3b0]'}`}>
                {n.thumb}
              </div>
              <div className="p-6">
                <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full mb-3 ${n.tagClass}`}>
                  {n.tag}
                </span>
                <h4 className="text-[15px] font-semibold text-ph-text leading-snug mb-2">{n.title}</h4>
                <p className="text-[13px] text-ph-text-muted leading-relaxed">{n.desc}</p>
                <p className="text-xs text-ph-text-muted mt-4">{n.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
