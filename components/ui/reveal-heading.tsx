'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type Part = string | { text: string; className?: string }

/**
 * Heading whose words rise out of a clipping mask one after another
 * (after the staggered text-reveal components on 21st.dev).
 * Pass plain strings, or `{ text, className }` for accented words.
 */
export function RevealHeading({
  parts,
  as = 'h2',
  className,
  delay = 0,
  immediate = false,
}: {
  parts: Part[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const show = immediate || inView

  const words = parts.flatMap((part) => {
    const { text, className: cls } = typeof part === 'string' ? { text: part, className: undefined } : part
    return text
      .split(' ')
      .filter(Boolean)
      .map((w) => ({ w, cls }))
  })

  const Tag = as
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{words.map((x) => x.w).join(' ')}</span>
      <span aria-hidden>
        {words.map(({ w, cls }, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className={cn('inline-block', cls)}
              initial={{ y: '105%' }}
              animate={show ? { y: 0 } : { y: '105%' }}
              transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </Tag>
  )
}
