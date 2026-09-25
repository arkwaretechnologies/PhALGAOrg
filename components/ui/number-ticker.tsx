'use client'

import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Counts up to `value` once the number scrolls into view
 * (after Magic UI's NumberTicker on 21st.dev).
 */
export function NumberTicker({
  value,
  delay = 0,
  className,
}: {
  value: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 40, stiffness: 120 })
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  // Start from zero once hydrated, unless the visitor prefers reduced motion,
  // in which case the server-rendered final value simply stays put.
  const reduced = useRef(false)
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced.current && ref.current) ref.current.textContent = '0'
  }, [])

  useEffect(() => {
    if (!inView || reduced.current) return
    const t = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, value, delay, motionValue])

  useEffect(
    () =>
      spring.on('change', (latest) => {
        if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString('en-US')
      }),
    [spring]
  )

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)}>
      {/* Server-rendered final value keeps the number readable without JS */}
      {value.toLocaleString('en-US')}
    </span>
  )
}
