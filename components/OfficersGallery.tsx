'use client'

import Image from 'next/image'
import { useRef } from 'react'

// Officer positions based on numbering (1 = highest position)
const officerPositions: { [key: number]: string } = {
  1: 'President',
  2: 'Vice President',
  3: 'Secretary',
  4: 'Treasurer',
  5: 'Auditor',
  6: 'Public Relations Officer',
  7: 'Board Member',
  8: 'Board Member',
  9: 'Board Member',
  10: 'Board Member',
  11: 'Board Member',
  12: 'Board Member',
  13: 'Board Member',
  14: 'Board Member',
  15: 'Board Member',
  16: 'Board Member',
  17: 'Board Member',
  18: 'Board Member',
  19: 'Board Member',
  20: 'Board Member',
  21: 'Board Member',
  22: 'Board Member',
}

// Officer images from the latest year folder (2025-2026)
const officerImages = [
  { filename: '01 flores.jpg', name: 'Flores', number: 1, lgu: 'LGU' },
  { filename: '02 OPERANA.jpg', name: 'Operana', number: 2, lgu: 'LGU' },
  { filename: '03 melegrito.jpg', name: 'Melegrito', number: 3, lgu: 'LGU' },
  { filename: '04 meralpes.jpg', name: 'Meralpes', number: 4, lgu: 'LGU' },
  { filename: '05 lumongsod.jpg', name: 'Lumongsod', number: 5, lgu: 'LGU' },
  { filename: '06 buray.jpg', name: 'Buray', number: 6, lgu: 'LGU' },
  { filename: '07 maturan.jpg', name: 'Maturan', number: 7, lgu: 'LGU' },
  { filename: '08 waje.jpg', name: 'Waje', number: 8, lgu: 'LGU' },
  { filename: '09 torres.jpg', name: 'Torres', number: 9, lgu: 'LGU' },
  { filename: '10 oyong.jpg', name: 'Oyong', number: 10, lgu: 'LGU' },
  { filename: '11 carpitanos.jpg', name: 'Carpitanos', number: 11, lgu: 'LGU' },
  { filename: '12 socrates.jpg', name: 'Socrates', number: 12, lgu: 'LGU' },
  { filename: '13 cesar.jpg', name: 'Cesar', number: 13, lgu: 'LGU' },
  { filename: '14 libo-on.jpg', name: 'Libo-on', number: 14, lgu: 'LGU' },
  { filename: '15 valdez.jpg', name: 'Valdez', number: 15, lgu: 'LGU' },
  { filename: '16 lachica.jpg', name: 'Lachica', number: 16, lgu: 'LGU' },
  { filename: '17 marcos.jpg', name: 'Marcos', number: 17, lgu: 'LGU' },
  { filename: '18 kisim.jpg', name: 'Kisim', number: 18, lgu: 'LGU' },
  { filename: '19 lluisma.jpg', name: 'Lluisma', number: 19, lgu: 'LGU' },
  { filename: '20 villar.jpg', name: 'Villar', number: 20, lgu: 'LGU' },
  { filename: '21 pangilinan.jpg', name: 'Pangilinan', number: 21, lgu: 'LGU' },
  { filename: '22 magsino.jpg', name: 'Magsino', number: 22, lgu: 'LGU' },
]

const latestYear = '2025-2026'

export default function OfficersGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -containerWidth : containerWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="bg-gradient-to-r from-philippine-blue to-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            PhALGA Officers {latestYear}
          </h2>
          <p className="text-blue-100 text-lg">
            Meet our dedicated national officers serving PhALGA
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
            aria-label="Previous officers"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
            aria-label="Next officers"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {officerImages.map((officer, index) => {
              const position = officerPositions[officer.number] || 'Board Member'
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-full bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-200 group flex flex-col snap-center px-2"
                  style={{ minWidth: '100%' }}
                >
                  <div className="relative bg-white/5 flex items-center justify-center min-h-[500px]">
                    <Image
                      src={`/Officers/${latestYear}/${officer.filename}`}
                      alt={`${officer.name} - ${position}`}
                      width={800}
                      height={0}
                      className="max-w-full max-h-[600px] w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-xl font-semibold text-white mb-2">
                      {officer.name}
                    </p>
                    <p className="text-base text-blue-100 mb-2">
                      {position}
                    </p>
                    <p className="text-sm text-blue-200">
                      {officer.lgu}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {officerImages.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/30"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
