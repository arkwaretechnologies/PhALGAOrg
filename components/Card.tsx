import Link from 'next/link'

interface CardProps {
  title: string
  description: string
  href?: string
  image?: string
  date?: string
  className?: string
}

export default function Card({ title, description, href, image, date, className = '' }: CardProps) {
  const cardContent = (
    <>
      {image && (
        <div className="w-full h-48 bg-gradient-to-br from-ph-blue to-ph-blue-dark overflow-hidden">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image</span>
          </div>
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        {date && (
          <p className="text-sm text-gray-500 mb-2">{date}</p>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 flex-1">{description}</p>
        {href && (
          <span className="mt-4 text-ph-blue hover:text-ph-blue-dark font-semibold text-sm inline-flex items-center group">
            Learn more
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
          </span>
        )}
      </div>
    </>
  )

  const wrapperClass = `bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col ${className}`

  if (href) {
    return (
      <Link href={href} className={`block ${wrapperClass}`}>
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={wrapperClass}>
      {cardContent}
    </div>
  )
}
