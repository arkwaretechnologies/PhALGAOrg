import Image from 'next/image'

/** Intrinsic size of `officer2025-2026 main bg.jpg` — used for aspect ratio only. */
const HERO_WIDTH = 1920
const HERO_HEIGHT = 667

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ph-blue">
      {/*
        Full image on every screen: 100% width, height scales with 1920×667 aspect ratio (no crop).
        Replaces object-cover + fill which always cropped the panoramic photo.
      */}
      <div className="relative w-full max-w-full leading-none">
        <Image
          src="/officer2025-2026 main bg.jpg"
          alt="PhALGA national officers"
          width={HERO_WIDTH}
          height={HERO_HEIGHT}
          className="block h-auto w-full max-w-full bg-ph-blue"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>
    </section>
  )
}
