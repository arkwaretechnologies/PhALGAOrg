import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ph-blue">
      <div className="relative w-full">
        <Image
          src="/newofficer.jpg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
          quality={90}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-ph-blue/70" aria-hidden />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center w-full px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
          <div className="flex items-center justify-center gap-2.5 mb-4 w-full">
            <div className="w-10 h-0.5 bg-ph-gold rounded" />
            <span className="text-xs font-semibold text-white/90 uppercase tracking-[0.15em]">
              Est. Since 2004
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-black text-white leading-[1.08] mb-4 max-w-4xl mx-auto text-center px-4">
            Welcome{' '}
            <span className="text-ph-gold">to</span>{' '}
            PhALGA
          </h1>
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-white/90 max-w-xl mx-auto mb-6 text-center px-4">
            PhALGA (Philippine Association of Local Government Accountants), Inc. — empowering LGU accounting professionals across the archipelago through education, fellowship, and advocacy.
          </p>
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center mb-6">
            <Link href="/about" className="btn-primary text-sm py-3 px-5 sm:py-4 sm:px-8">
              Explore PhALGA →
            </Link>
            <Link href="/downloads" className="btn-ghost text-sm py-3 px-4 sm:py-4 sm:px-7">
              📥 Downloads
            </Link>
          </div>
          <div className="flex gap-6 sm:gap-10 lg:gap-16 flex-wrap justify-center items-center pt-6 border-t border-white/20 w-full">
            <div className="text-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-ph-gold block">1,700+</span>
              <span className="text-[11px] sm:text-xs font-medium text-white/80 uppercase tracking-wide block mt-1">Members</span>
            </div>
            <div className="text-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-ph-gold block">20+</span>
              <span className="text-[11px] sm:text-xs font-medium text-white/80 uppercase tracking-wide block mt-1">Annual Conferences</span>
            </div>
            <div className="text-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-ph-gold block">17</span>
              <span className="text-[11px] sm:text-xs font-medium text-white/80 uppercase tracking-wide block mt-1">Geo Conferences</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
