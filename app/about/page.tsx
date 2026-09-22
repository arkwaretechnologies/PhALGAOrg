'use client'

import { useEffect, useRef, useState } from 'react'
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

  /* ── STORY / HISTORY ── */
  .ab-story { background: var(--white); }
  .ab-story-head {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 3rem;
  }
  .ab-story-head .ab-label { justify-content: center; }
  .ab-story-head .ab-section-title { text-align: center; }
  .ab-story-lead {
    font-size: 17px; line-height: 1.8;
    color: var(--muted);
  }

  /* video player with click-to-load cover (the recording is a large file) */
  .ab-video {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    aspect-ratio: 16 / 9;
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(135deg, var(--blue-dark), var(--blue-mid));
    box-shadow: 0 20px 60px rgba(0,32,112,0.20);
  }
  .ab-video video {
    display: block;
    width: 100%; height: 100%;
    object-fit: contain;
    background: #000;
  }
  .ab-video-cover {
    position: absolute; inset: 0;
    width: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    border: 0;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    text-align: center;
  }
  .ab-video-cover::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 12% 88%, rgba(206,17,38,0.26) 0%, transparent 55%),
      radial-gradient(ellipse at 88% 12%, rgba(252,209,22,0.14) 0%, transparent 45%);
  }
  .ab-video-sun {
    position: absolute;
    top: -70px; right: -70px;
    width: 260px; height: 260px;
    opacity: 0.10;
    color: #fff;
    animation: spin-slow 60s linear infinite;
  }
  .ab-video-sun svg { width: 100%; height: 100%; }
  .ab-play {
    position: relative;
    width: 74px; height: 74px;
    border-radius: 50%;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 10px 32px rgba(252,209,22,0.38);
    transition: transform .25s ease;
  }
  .ab-play svg { width: 26px; height: 26px; color: var(--blue-dark); margin-left: 4px; }
  .ab-video-cover:hover .ab-play,
  .ab-video-cover:focus-visible .ab-play { transform: scale(1.08); }
  .ab-video-cover:focus-visible { outline: 3px solid var(--gold); outline-offset: -3px; }
  .ab-video-label {
    position: relative;
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.15rem, 2.4vw, 1.6rem);
    font-weight: 700;
    color: #fff;
  }
  .ab-video-hint {
    position: relative;
    font-size: 13px;
    color: rgba(255,255,255,0.68);
    max-width: 380px;
    line-height: 1.6;
  }
  .ab-video-caption {
    max-width: 900px;
    margin: 0.9rem auto 0;
    font-size: 13px;
    color: var(--muted);
    text-align: center;
  }

  /* milestone timeline */
  .ab-timeline {
    max-width: 780px;
    margin: 4rem auto 0;
    padding-left: 2.25rem;
    position: relative;
  }
  .ab-timeline::before {
    content: '';
    position: absolute;
    left: 7px; top: 10px; bottom: 10px;
    width: 2px;
    background: linear-gradient(to bottom, var(--blue), var(--gold));
    border-radius: 2px;
  }
  .ab-tl-item { position: relative; padding-bottom: 2.4rem; }
  .ab-tl-item:last-child { padding-bottom: 0; }
  .ab-tl-item::before {
    content: '';
    position: absolute;
    left: -2.25rem; top: 5px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--white);
    border: 3px solid var(--blue);
    box-shadow: 0 0 0 4px rgba(0,56,168,0.07);
  }
  .ab-tl-item:last-child::before {
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(252,209,22,0.18);
  }
  .ab-tl-date {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--blue);
  }
  .ab-tl-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; font-weight: 700;
    color: var(--text);
    margin: 0.3rem 0 0.5rem;
    line-height: 1.3;
  }
  .ab-tl-text { font-size: 15px; color: var(--muted); line-height: 1.75; }

  /* ── FOUNDING OFFICERS ── */
  .ab-founders { background: var(--off-white); }
  .ab-founders-head { text-align: center; max-width: 700px; margin: 0 auto 3rem; }
  .ab-founders-head .ab-label { justify-content: center; }
  .ab-founders-head .ab-section-title { text-align: center; }
  .ab-founders-head p { font-size: 16px; color: var(--muted); line-height: 1.75; }

  .ab-roster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.1rem;
  }
  .ab-officer {
    display: flex; align-items: center; gap: 1rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.1rem 1.2rem;
    transition: transform .25s, box-shadow .25s, border-color .25s;
  }
  .ab-officer:hover {
    transform: translateY(-3px);
    border-color: rgba(0,56,168,0.28);
    box-shadow: 0 12px 32px rgba(0,56,168,0.10);
  }
  .ab-monogram {
    flex: 0 0 auto;
    width: 52px; height: 52px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--blue), var(--blue-mid));
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-size: 15px; font-weight: 900;
    letter-spacing: 0.02em;
    box-shadow: 0 0 0 3px rgba(0,56,168,0.10);
  }
  .ab-officer--lead .ab-monogram {
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    color: var(--blue-dark);
    box-shadow: 0 0 0 3px rgba(252,209,22,0.28);
  }
  .ab-officer-body { min-width: 0; }
  .ab-officer-name {
    font-size: 15px; font-weight: 600;
    color: var(--text);
    line-height: 1.35;
  }
  .ab-officer-role {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--blue);
    margin-top: 4px;
  }

  .ab-directors { margin-top: 3rem; }
  .ab-directors .ab-label { margin-bottom: 1.2rem; }
  .ab-director-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 0.75rem;
  }
  .ab-director {
    display: flex; align-items: center; gap: 0.75rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 0.7rem 0.9rem;
    transition: border-color .2s, background .2s;
  }
  .ab-director:hover { border-color: rgba(0,56,168,0.28); }
  .ab-director-chip {
    flex: 0 0 auto;
    width: 34px; height: 34px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,56,168,0.07);
    color: var(--blue);
    font-size: 12px; font-weight: 700;
  }
  .ab-director-name { font-size: 14px; font-weight: 500; color: var(--text); line-height: 1.4; }

  .ab-charter {
    display: flex; align-items: flex-start; gap: 1rem;
    margin-top: 2.5rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-left: 4px solid var(--gold);
    border-radius: 14px;
    padding: 1.4rem 1.6rem;
  }
  .ab-charter-icon {
    flex: 0 0 auto;
    width: 42px; height: 42px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,56,168,0.07);
    color: var(--blue);
  }
  .ab-charter-icon svg { width: 20px; height: 20px; }
  .ab-charter h4 { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .ab-charter p { font-size: 14px; color: var(--muted); line-height: 1.7; }
  .ab-charter a {
    color: var(--blue); font-weight: 600; text-decoration: none;
    border-bottom: 1px solid rgba(0,56,168,0.3);
  }
  .ab-charter a:hover { color: var(--blue-dark); }

  /* ── SOCIALS ── */
  .ab-socials {
    background: linear-gradient(135deg, var(--blue), var(--blue-dark));
    position: relative;
    overflow: hidden;
  }
  .ab-socials::before {
    content: '★';
    position: absolute;
    right: 3rem; top: 50%;
    transform: translateY(-50%);
    font-size: 220px; line-height: 1;
    color: var(--gold);
    opacity: 0.05;
    pointer-events: none;
  }
  .ab-socials-inner { position: relative; text-align: center; }
  .ab-socials-inner .ab-label { justify-content: center; }
  .ab-socials-inner .ab-label::before { background: var(--gold); }
  .ab-socials-inner .ab-label span { color: rgba(255,255,255,0.6); }
  .ab-socials-inner .ab-section-title { color: #fff; text-align: center; }
  .ab-socials-inner .ab-section-title .accent { color: var(--gold); }
  .ab-socials-lead {
    font-size: 16px; line-height: 1.75;
    color: rgba(255,255,255,0.72);
    max-width: 520px;
    margin: 0 auto;
  }
  .ab-social-grid {
    display: flex; flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 2.5rem;
  }
  .ab-social {
    display: flex; align-items: center; gap: 0.85rem;
    min-width: 215px;
    text-align: left;
    text-decoration: none;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 14px;
    padding: 0.95rem 1.3rem;
    transition: transform .25s, background .25s, border-color .25s;
  }
  .ab-social:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.12);
    border-color: var(--gold);
  }
  .ab-social:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
  .ab-social-icon {
    flex: 0 0 auto;
    width: 40px; height: 40px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.12);
    color: #fff;
    transition: background .25s, color .25s;
  }
  .ab-social-icon svg { width: 20px; height: 20px; }
  .ab-social:hover .ab-social-icon { background: var(--gold); color: var(--blue-dark); }
  .ab-social-label { font-size: 14px; font-weight: 600; color: #fff; }
  .ab-social-handle { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px; }

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
    .ab-socials::before { right: -1rem; font-size: 160px; }
  }
  @media (max-width: 600px) {
    .ab-section { padding: 4rem 1.5rem; }
    .ab-hero { padding: 6rem 1.5rem 0; }
    .ab-hero-title { font-size: 2.6rem; }

    .ab-story-head { margin-bottom: 2rem; }
    .ab-video { border-radius: 16px; }
    .ab-play { width: 62px; height: 62px; }
    .ab-play svg { width: 22px; height: 22px; }
    .ab-video-hint { display: none; }
    .ab-timeline { margin-top: 2.75rem; padding-left: 1.85rem; }
    .ab-tl-item::before { left: -1.85rem; width: 14px; height: 14px; }
    .ab-tl-item { padding-bottom: 2rem; }
    .ab-tl-title { font-size: 1.08rem; }

    .ab-founders-head { margin-bottom: 2rem; }
    .ab-roster-grid, .ab-director-grid { grid-template-columns: 1fr; }
    .ab-officer { padding: 1rem; gap: 0.85rem; }
    .ab-monogram { width: 46px; height: 46px; font-size: 14px; }
    .ab-charter { flex-direction: column; gap: 0.85rem; padding: 1.2rem 1.3rem; }

    .ab-social { min-width: 0; width: 100%; }
    .ab-social-grid { gap: 0.75rem; margin-top: 2rem; }
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

// Founding history, as recorded on phalga.org/About.html
const milestones = [
  {
    date: '1991',
    title: 'RA 7160 creates the role',
    text:
      'The Local Government Code of 1991 mandates that every provincial, city and municipal government shall have an accountant who takes charge of both the accounting and internal audit services of the local government unit concerned.',
  },
  {
    date: 'Before 2004',
    title: 'Provincial associations lead the way',
    text:
      'Accountants organised at the provincial level first — the League of Accountants in the Municipalities of Batangas (LAMB), the Laguna Association of Local Government Accountants (LALGA), and the Association of Local Accountants of Cavite (ALAC). Earlier attempts at a single national association did not succeed for reasons beyond the group’s control.',
  },
  {
    date: 'June 25, 2004',
    title: 'A meeting is called in Tagaytay City',
    text:
      'At the 2nd Quarter Regional Conference of PICPA Southern Luzon Region, held at the Development Academy of the Philippines in Tagaytay City, the LGU accountants in attendance set a meeting to organise a national association.',
  },
  {
    date: 'August 6, 2004',
    title: 'The committee is formed in Sta. Rosa, Laguna',
    text:
      'Accountants from LAMB, LALGA and ALAC met at Twin Dragon Restaurant in Sta. Rosa, Laguna and formed the committee that would spearhead the organisation of the long-envisioned national association. A joint conference was conceived as the first step.',
  },
  {
    date: 'August 21, 2004',
    title: 'PhALGA is born in Calamba City',
    text:
      'At the One Day Joint Conference of Local Government Accountants at Montevista Resort in Calamba City, Laguna, the Philippine Association of Local Government Accountants (PhALGA), Inc. was born, and its first Officers and Board of Directors were elected.',
  },
  {
    date: 'September 24, 2004',
    title: 'Registered with the SEC',
    text:
      'PhALGA, Inc. was registered with the Securities and Exchange Commission under SEC Registration No. CN200415172.',
  },
]

// The Officers and Board of Directors elected on August 21, 2004
const foundingExecutives = [
  { name: 'Carina S. Padua', role: 'President', lead: true },
  { name: 'Evangeline P. Cruz', role: 'Vice-President', lead: true },
  { name: 'Joan Mila L. Montegrande', role: 'Secretary' },
  { name: 'Rosemarie V. Lerio', role: 'Treasurer' },
  { name: 'Emmanuel D. Magsino', role: 'Auditor' },
  { name: 'Romeo T. Del Mundo', role: 'PRO' },
  { name: 'Roselie A. Pangilinan', role: 'PRO' },
]

const foundingDirectors = [
  'Nelia F. Carvajal',
  'Carmina V. Esperidion',
  'Magnerecio D. Pascua',
  'Cecilia C. Principio',
  'Merlinda P. Santiago',
  'Leonisa T. Santos',
  'Bernadette B. Valenzuela',
]

// TODO: replace the '#' placeholders with PhALGA's real profile URLs.
// The source site (phalga.org/About.html) ships its social icons with href="#",
// so no verified profile links exist yet.
const socials = [
  {
    label: 'Facebook',
    handle: 'PhALGA, Inc.',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    handle: 'Conference recordings',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'phalga.2004@gmail.com',
    href: 'mailto:phalga.2004@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
    ),
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

/** "Carina S. Padua" → "CP" */
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

function SunMotif() {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="28" fill="currentColor" />
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={100 + 34 * Math.cos(angle)}
            y1={100 + 34 * Math.sin(angle)}
            x2={100 + 84 * Math.cos(angle)}
            y2={100 + 84 * Math.sin(angle)}
            stroke="currentColor"
            strokeWidth="3"
          />
        )
      })}
    </svg>
  )
}

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
  const storyRef   = useFadeIn()
  const foundersRef = useFadeIn()
  const linksRef   = useFadeIn()
  const socialsRef = useFadeIn()

  // The history recording is a large file, so it is only fetched once the
  // visitor asks for it.
  const [videoStarted, setVideoStarted] = useState(false)

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

        {/* ── HISTORY + VIDEO ── */}
        <section className="ab-section ab-story">
          <div className="ab-section-inner">
            <div className="ab-story-head fade-in" ref={storyRef}>
              <div className="ab-label"><span>Our History</span></div>
              <h2 className="ab-section-title">
                How <span className="accent">PhALGA</span> Began
              </h2>
              <p className="ab-story-lead">
                Accountants play a major and significant role in all government agencies, which made a unified, solid
                organisation of accountants throughout the archipelago both vital and necessary. This is the story of how
                that national association came to be.
              </p>
            </div>

            <div className="ab-video">
              {videoStarted ? (
                <video
                  src="/PhALGA%20History.mp4"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  controlsList="nodownload"
                  aria-label="PhALGA history video"
                />
              ) : (
                <button
                  type="button"
                  className="ab-video-cover"
                  onClick={() => setVideoStarted(true)}
                  aria-label="Play the PhALGA history video"
                >
                  <span className="ab-video-sun"><SunMotif /></span>
                  <span className="ab-play">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
                    </svg>
                  </span>
                  <span className="ab-video-label">Watch the PhALGA History</span>
                  <span className="ab-video-hint">
                    The full recording is a large file — it starts loading only when you press play.
                  </span>
                </button>
              )}
            </div>
            <p className="ab-video-caption">PhALGA History — the founding of the association, in the members’ own words.</p>

            <div className="ab-timeline">
              {milestones.map((m) => (
                <div key={m.date} className="ab-tl-item">
                  <span className="ab-tl-date">{m.date}</span>
                  <h3 className="ab-tl-title">{m.title}</h3>
                  <p className="ab-tl-text">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUNDING OFFICERS ── */}
        <section className="ab-section ab-founders">
          <div className="ab-section-inner">
            <div className="ab-founders-head fade-in" ref={foundersRef}>
              <div className="ab-label"><span>Charter Leadership</span></div>
              <h2 className="ab-section-title">
                Founding <span className="accent">Officers</span> &amp; Board of Directors
              </h2>
              <p>
                Elected at the One Day Joint Conference of Local Government Accountants on August 21, 2004 in Calamba
                City, Laguna — the first slate to lead PhALGA.
              </p>
            </div>

            <div className="ab-roster-grid">
              {foundingExecutives.map((officer) => (
                <div
                  key={`${officer.name}-${officer.role}`}
                  className={`ab-officer${officer.lead ? ' ab-officer--lead' : ''}`}
                >
                  <span className="ab-monogram" aria-hidden>{initials(officer.name)}</span>
                  <div className="ab-officer-body">
                    <p className="ab-officer-name">{officer.name}</p>
                    <p className="ab-officer-role">{officer.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab-directors">
              <div className="ab-label"><span>Board of Directors</span></div>
              <div className="ab-director-grid">
                {foundingDirectors.map((name) => (
                  <div key={name} className="ab-director">
                    <span className="ab-director-chip" aria-hidden>{initials(name)}</span>
                    <p className="ab-director-name">{name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ab-charter">
              <span className="ab-charter-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 3l7.5 3.5v5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5v-5z" />
                </svg>
              </span>
              <div>
                <h4>Registered with the Securities and Exchange Commission</h4>
                <p>
                  PhALGA, Inc. was registered on September 24, 2004 under SEC Registration No. CN200415172. For the
                  association’s present leadership, see the <a href="/about/officers">current National Officers</a>.
                </p>
              </div>
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

        {/* ── SOCIALS ── */}
        <section className="ab-section ab-socials">
          <div className="ab-section-inner ab-socials-inner" ref={socialsRef}>
            <div className="ab-label"><span>Our Social Networks</span></div>
            <h2 className="ab-section-title">Follow <span className="accent">Us</span></h2>
            <p className="ab-socials-lead">
              Stay connected for conference announcements, circulars, and updates for local government accountants.
            </p>
            <div className="ab-social-grid">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="ab-social"
                  {...(social.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className="ab-social-icon">{social.icon}</span>
                  <span>
                    <span className="ab-social-label">{social.label}</span>
                    <span className="ab-social-handle" style={{ display: 'block' }}>{social.handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </SubpageLayout>
    </>
  )
}