'use client'

import './SubpageLayout.css'

function SunDecoration() {
  return (
    <div className="sub-hero-sun">
      <svg viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="30" fill="white" />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const x1 = 100 + 35 * Math.cos(angle)
          const y1 = 100 + 35 * Math.sin(angle)
          const x2 = 100 + 85 * Math.cos(angle)
          const y2 = 100 + 85 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" />
        })}
      </svg>
    </div>
  )
}

export type SubpageLayoutProps = {
  title: string
  titleAccent?: string
  subtitle?: string
  eyebrow?: string
  children: React.ReactNode
}

export default function SubpageLayout({ title, titleAccent, subtitle, eyebrow, children }: SubpageLayoutProps) {
  return (
    <div className="subpage-wrap">
        <section className="sub-hero">
          <SunDecoration />
          <div className="sub-hero-inner">
            {eyebrow && (
              <div className="sub-eyebrow">
                <div className="sub-eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h1 className="sub-hero-title">
              {title}
              {titleAccent != null && titleAccent !== '' && <em> {titleAccent}</em>}
            </h1>
            {subtitle && <p className="sub-hero-sub">{subtitle}</p>}
          </div>
          <svg className="sub-hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FAFBFF" />
          </svg>
        </section>
        <div className="sub-flag-bar" />
        {children}
    </div>
  )
}
