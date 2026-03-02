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
    <nav className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between h-[72px] px-6 lg:px-12 bg-[rgba(250,251,255,0.92)] backdrop-blur-[18px] border-b border-[rgba(0,56,168,0.12)] shadow-[0_2px_24px_rgba(0,56,168,0.07)]">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <div className="relative w-11 h-11 flex-shrink-0 rounded-[10px] overflow-hidden">
          <Image
            src="/logo.png"
            alt="PhALGA"
            width={44}
            height={44}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <strong className="font-display text-xl font-bold text-ph-blue leading-none tracking-wide">
            PhALGA
          </strong>
          <small className="text-[9px] lg:text-[10px] font-medium text-ph-text-muted tracking-[0.02em] leading-tight max-w-[220px]">
            (Philippine Association of Local Government Accountants), Inc.
          </small>
        </div>
      </Link>

      <ul className="hidden md:flex items-center list-none gap-0">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-2 px-4 text-sm font-medium text-ph-text no-underline rounded-lg transition-colors hover:text-ph-blue hover:bg-ph-blue/5"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/login"
            className="block py-2 px-5 ml-2 text-white bg-ph-blue rounded-lg font-semibold text-sm no-underline transition-colors hover:bg-ph-blue-dark"
          >
            Member Login
          </Link>
        </li>
      </ul>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg text-ph-text hover:bg-ph-blue/5"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
    </nav>

    {isOpen && (
      <div className="md:hidden fixed inset-0 top-[72px] z-[998] bg-white/95 backdrop-blur-sm p-6">
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
