'use client'

import { useEffect, useRef } from 'react'
import SubpageLayout from '@/components/SubpageLayout'

// ── Design tokens matching the PhALGA flag-inspired system ──────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --blue:      #0038A8;
    --blue-dark: #002070;
    --blue-mid:  #1a4fc4;
    --red:       #CE1126;
    --gold:      #FCD116;
    --gold-dark: #c8a500;
    --white:     #FAFBFF;
    --off-white: #F0F3FA;
    --text:      #0d1b3e;
    --muted:     #5a6a8a;
    --border:    rgba(0,56,168,0.12);
  }

  .about-page * { box-sizing: border-box; margin: 0; padding: 0; }
  .about-page { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }

  /* ── HERO ── */
  .ab-hero {
    background: var(--blue);
    padding: 7rem 2rem 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ab-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 10% 50%, rgba(206,17,38,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 20%, rgba(252,209,22,0.1) 0%, transparent 40%);
  }

  /* animated sun behind the title */
  .ab-hero-sun {
    position: absolute;
    top: -80px; right: -80px;
    width: 380px; height: 380px;
    opacity: 0.07;
    animation: spin-slow 40s linear infinite;
  }
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  .ab-hero-sun svg { width: 100%; height: 100%; }

  .ab-hero-inner {
    position: relative; z-index: 2;
    max-width: 780px;
    text-align: center;
  }

  .ab-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 6px 18px;
    margin-bottom: 1.6rem;
  }
  .ab-eyebrow span {
    font-size: 12px; font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .ab-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .ab-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.06;
    margin-bottom: 1.4rem;
    letter-spacing: -0.01em;
  }
  .ab-hero-title em {
    font-style: italic;
    color: var(--gold);
  }

  .ab-hero-sub {
    font-size: 18px; line-height: 1.75;
    color: rgba(255,255,255,0.72);
    max-width: 540px;
    margin: 0 auto 3rem;
  }

  /* wave divider */
  .ab-hero-wave {
    width: 100%;
    display: block;
    margin-top: 1rem;
  }

  /* ── FLAG BAR ── */
  .ab-flag-bar {
    height: 5px;
    background: linear-gradient(to right, var(--blue) 50%, var(--red) 50%);
    position: relative;
  }
  .ab-flag-bar::after {
    content: '☀';
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%,-50%);
    background: var(--white);
    color: var(--gold);
    font-size: 13px;
    width: 26px; height: 26px;
    border-radius: 50%;
    border: 2px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    line-height: 1;
  }

  /* ── SECTION BASE ── */
  .ab-section {
    padding: 5.5rem 2rem;
  }
  .ab-section-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .ab-label {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 0.8rem;
  }
  .ab-label::before {
    content: '';
    width: 28px; height: 3px;
    background: var(--gold);
    border-radius: 2px;
    display: block;
  }
  .ab-label span {
    font-size: 11px; font-weight: 700;
    color: var(--blue);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .ab-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 700;
    color: var(--text);
    line-height: 1.15;
    margin-bottom: 1rem;
  }
  .ab-section-title .accent { color: var(--blue); }
  .ab-section-title .red { color: var(--red); }

  /* ── MISSION ── */
  .ab-mission {
    background: var(--white);
  }
  .ab-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .ab-mission-text p {
    font-size: 17px; color: var(--muted);
    line-height: 1.8; margin-bottom: 1.2rem;
  }
  .ab-mission-text p:first-child {
    font-size: 19px; color: var(--text);
    font-weight: 500;
  }

  /* visual pillar with flag colours */
  .ab-mission-visual {
    position: relative;
    height: 460px;
  }

  .ab-mv-card {
    position: absolute;
    border-radius: 18px;
    padding: 2rem;
    box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  }
  .ab-mv-blue {
    background: var(--blue);
    width: 240px; top: 0; left: 0;
    height: 280px;
    display: flex; flex-direction: column; justify-content: flex-end;
    color: white;
  }
  .ab-mv-blue .big-num {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem; font-weight: 900;
    color: var(--gold); line-height: 1;
    display: block;
  }
  .ab-mv-blue p { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 4px; }

  .ab-mv-red {
    background: var(--red);
    width: 200px; top: 40px; right: 0;
    height: 200px;
    display: flex; flex-direction: column; justify-content: flex-end;
    color: white;
  }
  .ab-mv-red .big-num {
    font-family: 'Playfair Display', serif;
    font-size: 3rem; font-weight: 900;
    color: #fff; line-height: 1;
    display: block;
  }
  .ab-mv-red p { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 4px; }

  .ab-mv-gold {
    background: var(--gold);
    bottom: 0; right: 30px;
    width: 280px;
    border-radius: 14px;
    padding: 1.4rem 1.6rem;
  }
  .ab-mv-gold p { font-size: 14px; font-weight: 600; color: var(--blue-dark); line-height: 1.5; }
  .ab-mv-gold small { font-size: 11px; color: rgba(0,32,112,0.6); font-weight: 500; }

  /* deco ring */
  .ab-mv-ring {
    position: absolute;
    width: 180px; height: 180px;
    border: 2px dashed rgba(0,56,168,0.12);
    border-radius: 50%;
    bottom: 60px; left: 60px;
    animation: spin-slow 20s linear infinite reverse;
  }

  /* ── VISION ── */
  .ab-vision {
    background: var(--blue);
    position: relative;
    overflow: hidden;
  }
  .ab-vision::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 80% 50%, rgba(206,17,38,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 0% 100%, rgba(252,209,22,0.08) 0%, transparent 40%);
  }

  .ab-vision-inner {
    position: relative; z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  .ab-vision-text .ab-label::before { background: var(--gold); }
  .ab-vision-text .ab-label span { color: rgba(255,255,255,0.6); }
  .ab-vision-text .ab-section-title { color: white; }
  .ab-vision-text .ab-section-title .accent { color: var(--gold); }

  .ab-vision-text p {
    font-size: 17px; color: rgba(255,255,255,0.72);
    line-height: 1.8; margin-bottom: 1.2rem;
  }
  .ab-vision-text p:first-of-type { font-size: 19px; color: rgba(255,255,255,0.9); font-weight: 400; }

  /* quote block */
  .ab-vision-quote {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-left: 4px solid var(--gold);
    border-radius: 14px;
    padding: 2.5rem;
  }
  .ab-vision-quote p {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-style: italic;
    color: rgba(255,255,255,0.88);
    line-height: 1.6;
    margin: 0;
  }
  .ab-vision-quote footer {
    margin-top: 1.2rem;
    font-size: 13px; font-weight: 600;
    color: var(--gold);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* ── VALUES ── */
  .ab-values {
    background: var(--off-white);
  }
  .ab-values-header {
    text-align: center;
    margin-bottom: 3.5rem;
  }
  .ab-values-header .ab-label { justify-content: center; }

  .ab-values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .ab-value-card {
    background: var(--white);
    border-radius: 20px;
    padding: 2.2rem;
    border: 1px solid var(--border);
    position: relative; overflow: hidden;
    transition: transform .25s, box-shadow .25s;
  }
  .ab-value-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,56,168,0.1);
  }

  .ab-value-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    border-radius: 20px 20px 0 0;
  }
  .ab-value-card:nth-child(1)::before { background: var(--blue); }
  .ab-value-card:nth-child(2)::before { background: var(--red); }
  .ab-value-card:nth-child(3)::before { background: var(--gold); }
  .ab-value-card:nth-child(4)::before { background: var(--blue-mid); }

  .ab-value-num {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem; font-weight: 900;
    color: var(--off-white);
    line-height: 1;
    margin-bottom: 0.5rem;
    display: block;
  }
  .ab-value-card:nth-child(1) .ab-value-num { color: rgba(0,56,168,0.08); }
  .ab-value-card:nth-child(2) .ab-value-num { color: rgba(206,17,38,0.08); }
  .ab-value-card:nth-child(3) .ab-value-num { color: rgba(200,165,0,0.1); }
  .ab-value-card:nth-child(4) .ab-value-num { color: rgba(26,79,196,0.08); }

  .ab-value-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; font-weight: 700;
    color: var(--text);
    margin-bottom: 0.7rem;
    line-height: 1.3;
  }
  .ab-value-card p {
    font-size: 15px; color: var(--muted);
    line-height: 1.7;
  }

  /* ── QUICK LINKS ── */
  .ab-links {
    background: var(--white);
    text-align: center;
  }
  .ab-links .ab-section-title { text-align: center; }

  .ab-links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 3rem;
  }

  .ab-link-card {
    display: flex; flex-direction: column; align-items: center;
    text-decoration: none;
    background: var(--off-white);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    border: 1.5px solid var(--border);
    transition: all .25s;
    gap: 0.8rem;
  }
  .ab-link-card:hover {
    transform: translateY(-3px);
    border-color: var(--blue);
    background: rgba(0,56,168,0.04);
    box-shadow: 0 8px 28px rgba(0,56,168,0.1);
  }
  .ab-link-card.primary {
    background: var(--blue);
    border-color: var(--blue);
  }
  .ab-link-card.primary:hover {
    background: var(--blue-dark);
    border-color: var(--blue-dark);
    box-shadow: 0 8px 28px rgba(0,56,168,0.3);
  }
  .ab-link-icon {
    font-size: 2rem;
    width: 56px; height: 56px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,56,168,0.08);
  }
  .ab-link-card.primary .ab-link-icon { background: rgba(255,255,255,0.12); }
  .ab-link-card h4 {
    font-size: 16px; font-weight: 600;
    color: var(--text);
  }
  .ab-link-card.primary h4 { color: white; }
  .ab-link-card p {
    font-size: 13px; color: var(--muted);
  }
  .ab-link-card.primary p { color: rgba(255,255,255,0.65); }

  .ab-link-arrow {
    font-size: 20px; color: var(--blue);
    margin-top: auto;
    transition: transform .2s;
  }
  .ab-link-card:hover .ab-link-arrow { transform: translateX(4px); }
  .ab-link-card.primary .ab-link-arrow { color: var(--gold); }

  /* ── ANIMATIONS ── */
  .fade-in {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .fade-in.visible { opacity: 1; transform: none; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ab-mission-grid,
    .ab-vision-inner { grid-template-columns: 1fr; gap: 3rem; }
    .ab-mission-visual { height: 320px; }
    .ab-mv-blue { width: 200px; }
    .ab-mv-red { width: 170px; }
    .ab-mv-gold { width: 100%; right: 0; bottom: -10px; }
    .ab-links-grid { grid-template-columns: 1fr; }
    .ab-values-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .ab-section { padding: 4rem 1.5rem; }
    .ab-hero { padding: 6rem 1.5rem 0; }
    .ab-hero-title { font-size: 2.6rem; }
  }
`

// ── Data ─────────────────────────────────────────────────────────────────────
const values = [
  {
    num: '01',
    title: 'Professional Excellence',
    description:
      'We are committed to promoting excellence in local government accounting through continuous learning and professional development.',
  },
  {
    num: '02',
    title: 'Knowledge Sharing',
    description:
      'We foster a culture of knowledge sharing, ensuring that best practices and updates reach all local government accountants across the Philippines.',
  },
  {
    num: '03',
    title: 'Advocacy & Support',
    description:
      'We advocate for the interests of local government accountants and provide support in navigating complex regulations and standards.',
  },
  {
    num: '04',
    title: 'Networking & Collaboration',
    description:
      'We create opportunities for local government accountants to connect, collaborate, and learn through conferences and events.',
  },
]

const links = [
  {
    icon: '🧑‍💼',
    title: 'PhALGA Officers',
    desc: 'Meet the national leadership team',
    href: '/about/officers',
  },
  {
    icon: '🗂',
    title: 'PhALGA Archives',
    desc: 'Browse historical records and documents',
    href: '/about/archives',
  },
  {
    icon: '✉️',
    title: 'Contact Us',
    desc: 'Reach out to the PhALGA secretariat',
    href: '/contact',
    primary: true,
  },
]

// ── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const missionRef = useFadeIn()
  const visionRef  = useFadeIn()
  const valuesRef  = useFadeIn()
  const linksRef   = useFadeIn()

  return (
    <>
      <style>{css}</style>
      <SubpageLayout
        title="About"
        titleAccent="PhALGA"
        subtitle="Supporting and empowering local government accountants across every island of the Philippines — from barangay to province."
        eyebrow="Philippine Association of Local Government Accountants"
      >
        {/* ── MISSION ── */}
        <section className="ab-section ab-mission">
          <div className="ab-section-inner ab-mission-grid">
            <div ref={missionRef} className="ab-mission-text fade-in">
              <div className="ab-label"><span>Our Mission</span></div>
              <h2 className="ab-section-title">
                Dedicated to <span className="accent">Accountable</span> Local Governance
              </h2>
              <p>
                PhALGA is dedicated to supporting, empowering, and advancing the profession of local government accounting in the Philippines. We work tirelessly to ensure accountants have access to the latest information, training, and resources.
              </p>
              <p>
                Our mission extends to all local government units — from barangays to cities and provinces. Through conferences, training programs, and updates on government accounting standards, we help members stay current with COA regulations, DILG memorandums, and best practices in public financial management.
              </p>
            </div>

            <div className="ab-mission-visual">
              <div className="ab-mv-ring" />
              <div className="ab-mv-card ab-mv-blue">
                <span className="big-num">25+</span>
                <p>Years serving LGU accountants across the Philippines</p>
              </div>
              <div className="ab-mv-card ab-mv-red">
                <span className="big-num">17</span>
                <p>Regional geo-conferences held to date</p>
              </div>
              <div className="ab-mv-card ab-mv-gold">
                <p>"Advancing transparency and excellence in every LGU."</p>
                <small>PhALGA Core Mandate</small>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION ── */}
        <section className="ab-section ab-vision">
          <div className="ab-section-inner ab-vision-inner">
            <div ref={visionRef} className="ab-vision-text fade-in">
              <div className="ab-label"><span>Our Vision</span></div>
              <h2 className="ab-section-title">
                A Philippines Where Every <span className="accent">LGU Accountant</span> Excels
              </h2>
              <p>
                We envision a Philippines where every local government accountant is equipped with the knowledge, skills, and support needed to ensure transparent, accountable, and efficient financial management in their LGU.
              </p>
              <p>
                Through our efforts, we aim to elevate the standards of local government accounting, promote professional excellence, and contribute to good governance and public trust in local government financial management.
              </p>
            </div>

            <div className="ab-vision-quote">
              <p>
                "We envision local government accounting as the bedrock of transparent governance — building public trust, one audit at a time."
              </p>
              <footer>— PhALGA Vision Statement</footer>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="ab-section ab-values">
          <div className="ab-section-inner">
            <div className="ab-values-header" ref={valuesRef}>
              <div className="ab-label"><span>What We Stand For</span></div>
              <h2 className="ab-section-title">
                Our Core <span className="accent">Values</span>
              </h2>
            </div>
            <div className="ab-values-grid">
              {values.map((v) => (
                <div key={v.num} className="ab-value-card fade-in">
                  <span className="ab-value-num">{v.num}</span>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUICK LINKS ── */}
        <section className="ab-section ab-links">
          <div className="ab-section-inner" ref={linksRef}>
            <div className="ab-label" style={{ justifyContent: 'center' }}><span>Explore More</span></div>
            <h2 className="ab-section-title">Learn More About <span className="accent">PhALGA</span></h2>
            <div className="ab-links-grid">
              {links.map((l) => (
                <a key={l.href} href={l.href} className={`ab-link-card${l.primary ? ' primary' : ''} fade-in`}>
                  <div className="ab-link-icon">{l.icon}</div>
                  <h4>{l.title}</h4>
                  <p>{l.desc}</p>
                  <span className="ab-link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </SubpageLayout>
    </>
  )
}