import Image from 'next/image'
import Button from './Button'

interface HeroProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaHref?: string
  image?: string
  deadline?: string
  eventDate?: string
  eventLocation?: string
}

export default function Hero({ 
  title, 
  subtitle, 
  ctaText = 'Get Started', 
  ctaHref = '/contact', 
  image,
  deadline,
  eventDate,
  eventLocation
}: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {image && (
        <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
          <div className="relative w-full h-auto">
            <Image
              src={image}
              alt="PhALGA Office"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {deadline && (
              <div className="mb-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight">
                  {title}
                </h1>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {deadline}
                </p>
              </div>
            )}
            {!deadline && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight lg:whitespace-nowrap">
                {title}
              </h1>
            )}
            <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
              {subtitle}
            </p>
            {eventDate && eventLocation && (
              <p className="text-base sm:text-lg text-white/80 mb-8">
                {eventDate} in {eventLocation}
              </p>
            )}
            <Button 
              href={ctaHref} 
              variant="secondary" 
              size="large" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white border-0"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
