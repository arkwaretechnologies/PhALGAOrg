import Section from '@/components/Section'
import Card from '@/components/Card'

export const metadata = {
  title: 'Downloads',
  description: 'Download conference lectures, presentations, circulars, and other resources from PhALGA events and activities.',
}

export default function DownloadsPage() {
  const downloadCategories = [
    {
      title: '20th Annual National Conference',
      description: 'Presentations and lectures from the 20th Annual National Conference',
      items: [
        { title: 'COA Lecture', description: 'Commission on Audit updates and guidelines' },
        { title: 'DBM Lecture', description: 'Department of Budget and Management presentation' },
        { title: 'DILG Lecture', description: 'Department of the Interior and Local Government updates' },
        { title: 'OMBUDSMAN Lecture', description: 'Office of the Ombudsman presentation' },
      ],
    },
    {
      title: '17th Northern Luzon Geographical Conference',
      description: 'Lectures and presentations from Laoag City conference',
      items: [
        { title: 'IIUUEE Presentation', description: 'Internal and external audit updates' },
        { title: 'Barangay-SK Budgeting Process', description: 'Budgeting guidelines for barangays and SK' },
        { title: 'Tourism Updates 2025', description: 'Tourism-related accounting updates' },
        { title: 'Enhancing Performance, Promoting Good Governance', description: 'Good governance practices' },
      ],
    },
    {
      title: '17th Southern Luzon Geographical Conference',
      description: 'Materials from the Southern Luzon conference',
      items: [
        { title: 'DILG Updates', description: 'DILG memorandum and guidelines' },
        { title: 'The New Government Procurement Act (RA 12009)', description: 'Procurement law updates' },
        { title: 'Withholding Tax Obligations', description: 'BIR updates on withholding taxes for LGUs' },
      ],
    },
    {
      title: '17th Visayas Geographical Conference',
      description: 'Resources from the Visayas conference in Dumaguete',
      items: [
        { title: 'Barangay-SK Budgeting Process', description: 'Budgeting process for barangays' },
        { title: 'COA Updates', description: 'Latest COA circulars and requirements' },
      ],
    },
    {
      title: '17th Mindanao Geographical Conference',
      description: 'Presentations from the Mindanao conference in Zamboanga',
      items: [
        { title: 'EOPT Presentation', description: 'Ease of Paying Taxes updates' },
        { title: 'Gender Planning and Budgeting', description: 'Gender-responsive budgeting' },
        { title: 'NYC Presentation', description: 'National Youth Commission updates' },
      ],
    },
    {
      title: 'Other Resources',
      description: 'Additional downloads and reference materials',
      items: [
        { title: 'BIR Updates', description: 'Bureau of Internal Revenue circulars and updates' },
        { title: 'GPPB Presentations', description: 'Government Procurement Policy Board materials' },
        { title: 'HR Actions Guidelines', description: 'Human resource actions and procedures' },
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-philippine-blue to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Downloads
          </h1>
          <p className="text-xl text-blue-100">
            Access conference lectures, presentations, and other resources.
          </p>
        </div>
      </Section>

      {/* Downloads Sections */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          {downloadCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-philippine-blue transition-colors"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button className="text-philippine-blue hover:text-blue-900 font-semibold text-sm inline-flex items-center group">
                      Download
                      <svg
                        className="ml-2 w-4 h-4 transform group-hover:translate-y-0.5 transition-transform"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
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
          <p className="text-gray-600 mb-4">
            Downloads are available for registered members. Some materials may require login to access.
          </p>
          <p className="text-sm text-gray-500">
            For access issues or to request specific materials, please contact us.
          </p>
        </div>
      </Section>
    </>
  )
}
