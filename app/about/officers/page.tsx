import Section from '@/components/Section'

export const metadata = {
  title: 'PhALGA Officers',
  description: 'Meet the National Officers, Council of Advisers, and Past Presidents of the Philippine Association of Local Government Accountants.',
}

export default function OfficersPage() {
  const officerCategories = [
    {
      title: 'National Officers',
      description: 'Current national officers leading PhALGA',
      officers: [
        { name: 'President', position: 'To be updated' },
        { name: 'Vice President', position: 'To be updated' },
        { name: 'Secretary', position: 'To be updated' },
        { name: 'Treasurer', position: 'To be updated' },
        { name: 'Auditor', position: 'To be updated' },
      ],
    },
    {
      title: 'Council of Advisers',
      description: 'Experienced professionals providing guidance and counsel',
      officers: [
        { name: 'Adviser 1', position: 'To be updated' },
        { name: 'Adviser 2', position: 'To be updated' },
        { name: 'Adviser 3', position: 'To be updated' },
      ],
    },
    {
      title: 'Past Presidents',
      description: 'Former presidents who have served PhALGA',
      officers: [
        { name: 'Past President 1', position: 'To be updated' },
        { name: 'Past President 2', position: 'To be updated' },
        { name: 'Past President 3', position: 'To be updated' },
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-philippine-blue to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            PhALGA Officers
          </h1>
          <p className="text-xl text-blue-100">
            Meet the dedicated leaders serving the Philippine Association of Local Government Accountants.
          </p>
        </div>
      </Section>

      {/* Officers Sections */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          {officerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.officers.map((officer, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-philippine-blue transition-colors"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{officer.name}</h3>
                    <p className="text-gray-600">{officer.position}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Note Section */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            Officer information is being updated. Please check back soon or contact us for the latest information.
          </p>
        </div>
      </Section>
    </>
  )
}
