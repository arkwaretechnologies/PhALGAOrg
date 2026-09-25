'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Card with a soft radial light that follows the pointer (after Aceternity's
 * Card Spotlight on 21st.dev). `tone` picks a light that reads on the card surface.
 */
export function SpotlightCard({
  children,
  className,
  tone = 'light',
  radius = 320,
}: {
  children: React.ReactNode
  className?: string
  tone?: 'light' | 'dark'
  radius?: number
}) {
  const x = useMotionValue(-radius)
  const y = useMotionValue(-radius)
  const color = tone === 'dark' ? 'rgba(230,210,166,0.16)' : 'rgba(184,144,74,0.12)'
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 70%)`

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }}
      className={cn('group/spot relative overflow-hidden', className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  )
}
