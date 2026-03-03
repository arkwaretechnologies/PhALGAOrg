import Section from '@/components/Section'
import Card from '@/components/Card'
import SubpageLayout from '@/components/SubpageLayout'

export const metadata = {
  title: 'PhALGA Archives',
  description: 'Browse the archives of the Philippine Association of Local Government Accountants - historical documents, past conferences, and important records.',
}

export default function ArchivesPage() {
  const archiveCategories = [
    {
      title: 'Historical Documents',
      description: 'Important documents and records from PhALGA\'s history',
      items: [
        { title: 'Founding Documents', description: 'Original documents from the establishment of PhALGA' },
        { title: 'Constitution & By-Laws', description: 'Governing documents of the association' },
        { title: 'Annual Reports', description: 'Historical annual reports and summaries' },
      ],
    },
    {
      title: 'Past Conferences',
      description: 'Records and materials from previous conferences',
      items: [
        { title: 'Conference Proceedings', description: 'Documentation from past annual and geographical conferences' },
        { title: 'Conference Photos', description: 'Photo galleries from previous events' },
        { title: 'Presentations & Lectures', description: 'Archived presentations and lecture materials' },
      ],
    },
    {
      title: 'Publications',
      description: 'Newsletters, circulars, and publications',
      items: [
        { title: 'Newsletters', description: 'Past newsletters and member communications' },
        { title: 'Circulars Archive', description: 'Historical circulars and announcements' },
        { title: 'Research Papers', description: 'Research and studies conducted by PhALGA' },
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-philippine-blue to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            PhALGA Archives
          </h1>
          <p className="text-xl text-blue-100">
            Explore our historical records, documents, and archives.
          </p>
        </div>
      </Section>

      {/* Archives Sections */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          {archiveCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <Card
                    key={index}
                    title={item.title}
                    description={item.description}
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
          <p className="text-gray-600 mb-4">
            Archives are being organized and digitized. More materials will be available soon.
          </p>
          <p className="text-sm text-gray-500">
            For specific archive requests, please contact us through our contact page.
          </p>
        </div>
      </Section>
    </SubpageLayout>
  )
}
