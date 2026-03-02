'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const officers = [
  { filename: '01 flores.jpg', name: 'Flores', position: 'President' },
  { filename: '02 OPERANA.jpg', name: 'Operana', position: 'Vice President' },
  { filename: '03 melegrito.jpg', name: 'Melegrito', position: 'Secretary' },
  { filename: '04 meralpes.jpg', name: 'Meralpes', position: 'Treasurer' },
  { filename: '05 lumongsod.jpg', name: 'Lumongsod', position: 'Auditor' },
  { filename: '06 buray.jpg', name: 'Buray', position: 'PRO' },
  { filename: '07 maturan.jpg', name: 'Maturan', position: 'Director' },
  { filename: '08 waje.jpg', name: 'Waje', position: 'Director' },
  { filename: '09 torres.jpg', name: 'Torres', position: 'Director' },
  { filename: '10 oyong.jpg', name: 'Oyong', position: 'Director' },
  { filename: '11 carpitanos.jpg', name: 'Carpitanos', position: 'Director' },
  { filename: '12 socrates.jpg', name: 'Socrates', position: 'Director' },
]

const latestYear = '2025-2026'

export default function OfficersStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -slideWidth : slideWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="officers" className="py-20 bg-ph-blue">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <div className="section-label justify-center [&>span]:text-white/70">
            <span>Leadership 2025–2026</span>
          </div>
          <h2 className="section-title text-white">National Officers</h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all hover:scale-110"
            aria-label="Previous officers"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all hover:scale-110"
            aria-label="Next officers"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory flex px-14"
          >
            {officers.map((o) => (
              <Link
                key={o.filename}
                href="/about/officers"
                className="flex-shrink-0 w-full min-w-full flex justify-center items-center snap-center group"
              >
                <div className="rounded-lg overflow-hidden bg-ph-gold/20 border border-ph-gold/40 transition-transform group-hover:scale-105 flex items-center justify-center min-h-[300px]">
                  <Image
                    src={`/Officers/${latestYear}/${o.filename}`}
                    alt={o.name}
                    width={800}
                    height={600}
                    className="max-w-full max-h-[500px] w-auto h-auto object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/about/officers" className="btn-primary">
            View All Officers →
          </Link>
        </div>
      </div>
    </section>
  )
}
