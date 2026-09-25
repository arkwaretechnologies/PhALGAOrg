/** Facts and navigation shared across the site, so they're stated once. */
export const site = {
  name: 'PhALGA',
  legalName: 'Philippine Association of Local Government Accountants, Inc.',
  founded: 'August 21, 2004',
  secRegistration: 'CN200415172',
  email: 'phalga.2004@gmail.com',
  office: ['Office of the City Accountant', 'Navotas City, Metro Manila'],
}

export type NavItem = { href: string; label: string; description?: string }

export const aboutLinks: NavItem[] = [
  { href: '/about', label: 'About PhALGA', description: 'Mission, vision, values and our founding story' },
  { href: '/about/officers', label: 'National Officers', description: 'The 2025–2026 leadership' },
  { href: '/about/past-presidents', label: 'Past Presidents', description: 'Two decades of national leadership' },
  { href: '/about/archives', label: 'Archives', description: 'Historical records and documents' },
]

export const mainLinks: NavItem[] = [
  { href: '/events', label: 'Events' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/circulars', label: 'Circulars' },
]
