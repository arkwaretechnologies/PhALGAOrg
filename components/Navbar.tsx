'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/about/officers', label: 'Officers' },
  { href: '/downloads', label: 'Downloads' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <nav className="sticky top-0 left-0 right-0 z-[999] flex items-center justify-between h-[52px] sm:h-[56px] px-4 sm:px-6 lg:px-10 bg-[rgba(250,251,255,0.92)] backdrop-blur-[18px] border-b border-[rgba(0,56,168,0.12)] shadow-[0_2px_24px_rgba(0,56,168,0.07)]">
      <Link href="/" className="flex items-center gap-2 sm:gap-2.5 no-underline min-w-0">
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src="/logo.png"
            alt="PhALGA"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <strong className="font-display text-base sm:text-lg font-bold text-ph-blue leading-none tracking-wide">
            PhALGA
          </strong>
          <small className="text-[8px] sm:text-[9px] font-medium text-ph-text-muted tracking-[0.02em] leading-tight max-w-[160px] sm:max-w-[220px] line-clamp-2 sm:line-clamp-none">
            (Philippine Association of Local Government Accountants), Inc.
          </small>
        </div>
      </Link>

      <ul className="hidden md:flex items-center list-none gap-0">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-1.5 px-3 text-[13px] font-medium text-ph-text no-underline rounded-lg transition-colors hover:text-ph-blue hover:bg-ph-blue/5"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/login"
            className="block py-1.5 px-4 ml-1.5 text-white bg-ph-blue rounded-lg font-semibold text-[13px] no-underline transition-colors hover:bg-ph-blue-dark"
          >
            Member Login
          </Link>
        </li>
      </ul>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-1.5 rounded-lg text-ph-text hover:bg-ph-blue/5"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
    </nav>

    {isOpen && (
      <div className="md:hidden fixed inset-0 top-[52px] sm:top-[56px] z-[998] bg-white/95 backdrop-blur-sm p-6">
        <ul className="flex flex-col gap-2 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-ph-text font-medium rounded-lg hover:bg-ph-blue/5"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-white bg-ph-blue rounded-lg font-semibold text-center"
            >
              Member Login
            </Link>
          </li>
        </ul>
      </div>
    )}
    </>
  )
}
