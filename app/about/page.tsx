import Section from '@/components/Section'
import Button from '@/components/Button'

export const metadata = {
  title: 'About PhALGA',
  description: 'Learn about the Philippine Association of Local Government Accountants (PhALGA) - our mission, vision, and commitment to supporting local government accountants.',
}

export default function AboutPage() {
  const values = [
    {
      title: 'Professional Excellence',
      description: 'We are committed to promoting excellence in local government accounting through continuous learning and professional development.',
    },
    {
      title: 'Knowledge Sharing',
      description: 'We foster a culture of knowledge sharing, ensuring that best practices and updates reach all local government accountants across the Philippines.',
    },
    {
      title: 'Advocacy & Support',
      description: 'We advocate for the interests of local government accountants and provide support in navigating complex regulations and standards.',
    },
    {
      title: 'Networking & Collaboration',
      description: 'We create opportunities for local government accountants to connect, collaborate, and learn from each other through conferences and events.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-philippine-blue to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About PhALGA
          </h1>
          <p className="text-xl text-blue-100">
            Supporting and empowering local government accountants across the Philippines.
          </p>
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Our Mission</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl mb-6">
              The Philippine Association of Local Government Accountants (PhALGA) is dedicated to supporting,
              empowering, and advancing the profession of local government accounting in the Philippines. We work
              tirelessly to ensure that local government accountants have access to the latest information, training,
              and resources needed to excel in their roles.
            </p>
            <p className="mb-6">
              Our mission extends to all local government units across the country, from barangays to cities and
              provinces. Through conferences, training programs, circulars, and continuous updates on government
              accounting standards, we help our members stay current with COA regulations, DILG memorandums, and
              best practices in public financial management.
            </p>
          </div>
        </div>
      </Section>

      {/* Vision Section */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Our Vision</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl mb-6">
              We envision a Philippines where every local government accountant is equipped with the knowledge,
              skills, and support needed to ensure transparent, accountable, and efficient financial management
              in their respective local government units.
            </p>
            <p>
              Through our efforts, we aim to elevate the standards of local government accounting, promote
              professional excellence, and contribute to good governance and public trust in local government
              financial management.
            </p>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 hover:border-philippine-blue transition-colors"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Quick Links */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Learn More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Button href="/about/officers" variant="outline" size="medium" className="w-full">
              PhALGA Officers
            </Button>
            <Button href="/about/archives" variant="outline" size="medium" className="w-full">
              PhALGA Archives
            </Button>
            <Button href="/contact" variant="primary" size="medium" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
