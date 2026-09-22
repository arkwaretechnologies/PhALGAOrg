interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  organization: string
  image?: string
}

export default function TestimonialCard({ quote, author, position, organization, image }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
      <div className="mb-6">
        <svg className="w-8 h-8 text-philippine-blue mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-700 text-lg leading-relaxed italic">"{quote}"</p>
      </div>
      <div className="flex items-center">
        {image ? (
          <div className="w-12 h-12 rounded-full bg-philippine-blue mr-4 flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-philippine-blue mr-4 flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{position}</p>
          <p className="text-sm text-philippine-blue">{organization}</p>
        </div>
      </div>
    </div>
  )
}
