const pillars = [
  { icon: '🎓', title: 'Professional Development', desc: 'Continuous learning through conferences, seminars, and training programs', border: 'border-l-ph-blue' },
  { icon: '🤝', title: 'Networking & Fellowship', desc: 'Connecting LGU accountants nationwide for collaboration and support', border: 'border-l-ph-red' },
  { icon: '⚖️', title: 'Advocacy & Standards', desc: 'Promoting sound fiscal policies and best practices in local governance', border: 'border-l-ph-gold' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-ph-white">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="about-visual fade-up relative max-w-[500px] lg:max-w-none">
            <div className="bg-ph-blue rounded-[20px] h-[420px] flex flex-col justify-end p-10 overflow-hidden relative">
              <span className="absolute top-8 right-8 text-[100px] opacity-[0.08]" aria-hidden>⚖</span>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold text-white leading-tight mb-2">
                  Serving Every LGU Accountant Across the Philippines
                </h3>
                <p className="text-sm text-white/70">From Luzon to Mindanao</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-ph-gold rounded-[14px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)] w-[180px]">
              <span className="font-display text-3xl font-black text-ph-blue-dark leading-none block">25+</span>
              <small className="text-xs font-semibold text-ph-blue-dark/60 uppercase tracking-wide">Years of Service</small>
            </div>
          </div>
          <div className="about-content fade-up">
            <div className="section-label"><span>Who We Are</span></div>
            <h2 className="section-title">
              Strengthening Local <span className="accent">Financial Governance</span>
            </h2>
            <p className="section-sub max-w-full mb-8">
              PhALGA is the premier professional organization for accountants in local government units throughout the Philippines. We champion excellence, transparency, and accountability in public financial management.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className={`flex items-center gap-4 bg-ph-off-white rounded-xl p-4 pl-5 border-l-4 ${p.border} transition-colors`}
                >
                  <span className="text-2xl" aria-hidden>{p.icon}</span>
                  <div>
                    <h4 className="text-[15px] font-semibold text-ph-text">{p.title}</h4>
                    <p className="text-[13px] text-ph-text-muted">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
