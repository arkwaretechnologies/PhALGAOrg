'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Button from './Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      label: 'About us',
      submenu: [
        { href: '/about', label: 'About PhALGA' },
        { href: '/about/officers', label: 'PhALGA Officers' },
        { href: '/about/archives', label: 'PhALGA Archives' },
        { href: '/contact', label: 'Contact us' },
      ],
    },
    {
      label: 'Attend & Learn',
      submenu: [
        { href: '/events', label: 'Events' },
        { href: '/circulars', label: 'Circulars' },
        { href: '/downloads', label: 'Downloads' },
      ],
    },
    { href: '/events', label: 'Events' },
    { href: '/circulars', label: 'Circulars' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/login', label: 'Login' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logo.png"
              alt="PhALGA Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              if ('submenu' in link && link.submenu) {
                return (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(link.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="text-gray-700 hover:text-philippine-blue font-medium transition-colors flex items-center">
                      {link.label}
                      <svg
                        className="ml-1 w-4 h-4 transform transition-transform"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-4 transition-all duration-200 ${
                        activeMenu === link.label ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      {link.submenu.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-6 py-3 text-gray-700 hover:bg-philippine-blue hover:text-white transition-colors"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-philippine-blue font-medium transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-philippine-blue transition-all group-hover:w-full"></span>
                </Link>
              )
            })}
          </div>

          {/* Search and Login */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-philippine-blue font-medium transition-colors"
            >
              Log In
            </Link>
            <Button href="/contact" variant="primary" size="small">
              Join
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-philippine-blue hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => {
              if ('submenu' in link) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-philippine-blue hover:bg-gray-50 rounded-md transition-colors font-medium"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transform transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileAboutOpen && (
                      <div className="pl-4 space-y-1 mt-1">
                        {link.submenu.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            onClick={() => {
                              setIsOpen(false)
                              setMobileAboutOpen(false)
                            }}
                            className="block px-3 py-2 text-gray-600 hover:text-philippine-blue hover:bg-gray-50 rounded-md transition-colors text-sm"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-philippine-blue hover:bg-gray-50 rounded-md transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
