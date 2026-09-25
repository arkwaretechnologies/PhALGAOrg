import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  /** Seconds for one full loop. */
  duration?: number
  gap?: string
  repeat?: number
}

/**
 * Infinite horizontal marquee (after Magic UI's Marquee on 21st.dev). The track is
 * repeated so the loop is seamless; pure CSS so it costs nothing on the main thread.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  duration = 60,
  gap = '1.25rem',
  repeat = 2,
}: MarqueeProps) {
  return (
    <div
      className={cn('group flex overflow-hidden', className)}
      style={{ ['--duration' as string]: `${duration}s`, ['--gap' as string]: gap, gap }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          // Copies are decorative: keep their links out of the tab order too
          {...(i > 0 ? ({ inert: '' } as Record<string, string>) : {})}
          className={cn(
            'flex shrink-0 justify-around',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]'
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
