import Link from 'next/link'

interface EventCardProps {
  month: string
  date: string
  type: string
  title: string
  location: string
  href?: string
}

export default function EventCard({ month, date, type, title, location, href }: EventCardProps) {
  const content = (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-philippine-blue hover:shadow-lg transition-all p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-center">
          <div className="bg-philippine-blue text-white px-4 py-2 rounded-t-lg">
            <p className="text-xs font-semibold uppercase tracking-wide">{month}</p>
          </div>
          <div className="bg-philippine-red text-white px-4 py-3 rounded-b-lg">
            <p className="text-2xl font-bold">{date}</p>
          </div>
        </div>
        <div className="flex-1">
          <span className="inline-block px-2 py-1 bg-philippine-yellow text-gray-900 text-xs font-semibold rounded mb-2">
            {type}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{location}</p>
          {href && (
            <Link
              href={href}
              className="text-philippine-blue hover:text-blue-900 font-semibold text-sm inline-flex items-center mt-3 group"
            >
              More Information
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
