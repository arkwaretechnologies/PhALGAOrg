'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type BlurFadeProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  /** Distance travelled upward while fading in, in px. */
  offset?: number
  blur?: string
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

/**
 * Blur-fade reveal (after Magic UI's BlurFade on 21st.dev): content rises a few
 * pixels while sharpening from a soft blur the first time it enters the viewport.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  offset = 14,
  blur = '6px',
  immediate = false,
  as = 'div',
}: BlurFadeProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const variants: Variants = {
    hidden: { opacity: 0, y: offset, filter: `blur(${blur})` },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  }
  const Component = motion[as]

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={immediate || inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay, duration, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
