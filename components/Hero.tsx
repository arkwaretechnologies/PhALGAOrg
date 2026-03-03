import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ph-blue">
      <div className="relative w-full">
        <Image
          src="/officer2025-2026.jpg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-auto block object-cover object-center"
          priority
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-ph-blue/30" aria-hidden />
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-start text-center w-full px-4 pt-20 pb-3 sm:px-6 sm:pt-24 sm:pb-4 md:px-8 md:pt-28 md:pb-6 lg:px-12 lg:pt-32 lg:pb-8 xl:px-16 max-h-[38vh] sm:max-h-[36vh] md:max-h-[34vh] lg:max-h-[35vh] xl:max-h-[36vh]">
          <div className="flex items-center justify-center mb-0.5 w-full sm:mb-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 uppercase tracking-[0.08em] sm:tracking-[0.1em]">
              Est. Since 2004
            </span>
          </div>
          <h1 className="font-display text-xl font-black text-white leading-[1.08] mb-0.5 max-w-4xl mx-auto text-center px-1 sm:text-2xl sm:mb-1 sm:leading-[1.08] md:text-3xl md:mb-2 lg:text-[2.5rem] lg:leading-[1.08] whitespace-nowrap">
            Welcome <span className="text-ph-gold">to</span> PhALGA
          </h1>
          <p className="text-xs sm:text-sm md:text-[14px] leading-tight text-white/90 max-w-xl mx-auto text-center px-2 sm:px-4 min-w-0 hyphens-auto">
            PhALGA (Philippine Association of Local Government Accountants), Inc. — empowering LGU accounting professionals across the archipelago through education, fellowship, and advocacy.
          </p>
        </div>
      </div>
    </section>
  )
}
