import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    about: [
      { label: 'About PhALGA', href: '/about' },
      { label: 'Contact PhALGA', href: '/contact' },
      { label: 'Partnerships', href: '/about' },
      { label: 'Board of Directors', href: '/about/officers' },
      { label: 'PhALGA Staff', href: '/contact' },
    ],
    resources: [
      { label: 'Events', href: '/events' },
      { label: 'Circulars', href: '/circulars' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Member Directory', href: '/login' },
      { label: 'Professional Development', href: '/events' },
    ],
    connect: [
      { label: 'News & Updates', href: '/circulars' },
      { label: 'Member Login', href: '/login' },
      { label: 'Join PhALGA', href: '/contact' },
      { label: 'Volunteer Opportunities', href: '/contact' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="PhALGA Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Philippine Association of Local Government Accountants - Supporting and empowering local government accountants across the Philippines.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">About PhALGA</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p>Office of the City Accountant</p>
              <p>Navotas City, Metro Manila</p>
            </div>
            <div>
              <p>
                <a href="tel:+639123456789" className="hover:text-white transition-colors">
                  (02) 123-4567
                </a>
              </p>
              <p>
                <a href="mailto:phalga.2004@gmail.com" className="hover:text-white transition-colors">
                  phalga.2004@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-gray-400 text-sm">
              © {currentYear} PhALGA, INC. - Philippine Association of Local Government Accountants. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Legal Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
