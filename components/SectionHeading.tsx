import { RevealHeading } from '@/components/ui/reveal-heading'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'

type Part = string | { text: string; className?: string }

/**
 * Eyebrow + animated serif title + optional lede, used to open every section.
 * Wrap a word in `{ text, accent: true }` style by passing `{ text, className }`.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'light',
  align = 'left',
  className,
  as = 'h2',
}: {
  eyebrow?: string
  title: Part[]
  lede?: React.ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2'
}) {
  const dark = tone === 'dark'
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <BlurFade>
          <p className={cn('eyebrow', dark && 'eyebrow-light', align === 'center' && 'justify-center')}>{eyebrow}</p>
        </BlurFade>
      )}
      <RevealHeading
        as={as}
        parts={title}
        className={cn('display-title mt-5', dark && '!text-white')}
      />
      {lede && (
        <BlurFade delay={0.15}>
          <p className={cn('lede mt-5', dark && '!text-white/70', align === 'center' && 'mx-auto')}>{lede}</p>
        </BlurFade>
      )}
    </div>
  )
}

/** Italic champagne accent used for one or two words in a heading. */
export const accent = (text: string, dark = false) => ({
  text,
  className: cn('italic font-medium', dark ? 'text-ph-gold-light' : 'text-ph-gold-deep'),
})
