import Link from 'next/link'

export default function DownloadsSection() {
  return (
    <section className="py-20 bg-ph-off-white">
      <div className="container-ph max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="bg-gradient-to-br from-ph-blue to-ph-blue-dark rounded-[24px] p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <span className="absolute right-12 top-1/2 -translate-y-1/2 text-[200px] opacity-[0.04] text-ph-gold" aria-hidden>★</span>
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Access Conference Materials</h2>
            <p className="text-base text-white/70">
              Download lecture decks, circulars, and guidelines from all PhALGA events.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap relative z-10">
            <Link href="/downloads" className="btn-white">
              📥 Browse Downloads
            </Link>
            <Link
              href="/circulars"
              className="inline-flex items-center gap-2 bg-transparent text-white/80 font-medium text-[15px] py-4 px-7 rounded-[10px] border-[1.5px] border-white/30 transition-all hover:border-ph-gold hover:text-ph-gold"
            >
              📋 View Circulars
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
