import Section from '@/components/Section'
import Card from '@/components/Card'
import SubpageLayout from '@/components/SubpageLayout'

export const metadata = {
  title: 'Circulars',
  description: 'Latest circulars, memorandums, and official communications from COA, DILG, and other government agencies relevant to local government accountants.',
}

export default function CircularsPage() {
  const circularCategories = [
    {
      title: 'COA Circulars',
      description: 'Commission on Audit circulars and updates',
      circulars: [
        { title: 'COA Circular 2020-004', description: 'Updates on latest guidelines and documentary requirements', date: '2024' },
        { title: 'COA Circular 2019-001', description: 'Barangay accounting and financial reporting guidelines', date: '2019' },
        { title: 'COA Circular 2015-008', description: 'Road network and infrastructure accounting', date: '2015' },
      ],
    },
    {
      title: 'DILG Memorandums',
      description: 'Department of the Interior and Local Government memorandums',
      circulars: [
        { title: 'DILG MC 2023-047', description: 'Memorandum circular on local government financial management', date: '2023' },
        { title: 'Mandanas Ruling', description: 'Supreme Court ruling on local government share in national taxes', date: '2023' },
      ],
    },
    {
      title: 'Other Government Circulars',
      description: 'Circulars from DBM, BIR, and other relevant agencies',
      circulars: [
        { title: 'DBM Circulars', description: 'Department of Budget and Management guidelines', date: '2024' },
        { title: 'BIR Updates', description: 'Bureau of Internal Revenue updates for LGUs', date: '2024' },
        { title: 'EO 77', description: 'Executive Order on local government accounting', date: '2019' },
      ],
    },
  ]

  return (
    <SubpageLayout
      title="Circulars"
      subtitle="Stay updated with the latest circulars and official communications."
      eyebrow="Philippine Association of Local Government Accountants"
    >
      {/* Circulars Sections */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          {circularCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.circulars.map((circular, index) => (
                  <Card
                    key={index}
                    title={circular.title}
                    description={circular.description}
                    date={circular.date}
                    href={`/downloads?category=circulars&item=${encodeURIComponent(circular.title)}`}
                  />
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
            Circulars are regularly updated. For the most current information, please refer to the official websites
            of COA, DILG, and other issuing agencies.
          </p>
        </div>
      </Section>
    </SubpageLayout>
  )
}
