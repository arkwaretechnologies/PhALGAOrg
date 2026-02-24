import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
  title: string
  headline?: string
  date?: string
  category?: string
  href?: string
  featured?: boolean
  image?: string
}

export default function NewsCard({ title, headline, date, category, href, featured = false, image }: NewsCardProps) {
  const content = (
    <div className={`bg-white rounded-lg border border-gray-200 hover:border-philippine-blue transition-all duration-200 overflow-hidden h-full flex flex-col ${featured ? 'md:col-span-2' : ''}`}>
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        {headline && (
          <p className="text-philippine-blue text-sm font-semibold uppercase tracking-wide mb-2">
            {headline}
          </p>
        )}
        {category && !headline && (
          <span className="inline-block px-3 py-1 bg-philippine-yellow text-gray-900 text-xs font-semibold rounded-full mb-3 w-fit">
            {category}
          </span>
        )}
        <h3 className={`font-bold text-gray-900 mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>{title}</h3>
        {date && (
          <p className="text-sm text-gray-500 mb-4">{date}</p>
        )}
        {href && (
          <div className="mt-auto">
            <Link
              href={href}
              className="text-gray-900 hover:text-philippine-blue font-semibold text-sm inline-flex items-center group"
            >
              Learn More
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
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
