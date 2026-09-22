'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type TimelineEntry = {
  title: string
  content: React.ReactNode
}

type TimelineProps = {
  data: TimelineEntry[]
  className?: string
}

/**
 * Scroll-progress timeline: a left rail whose gold-to-blue fill tracks how far
 * through the list the reader has scrolled, with each entry's title pinned
 * beside its content on desktop.
 */
export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setHeight(el.getBoundingClientRect().height)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className={cn('w-full font-sans', className)} ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-5xl pb-12 md:pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-8 md:pt-16 lg:gap-12">
            {/* Rail marker + pinned title */}
            <div className="sticky top-20 z-30 flex max-w-[150px] flex-col items-center self-start md:top-28 md:w-full md:max-w-[220px] md:flex-row lg:max-w-[260px]">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-ph-white">
                <div className="h-4 w-4 rounded-full border-2 border-ph-blue/35 bg-ph-off-white ring-2 ring-ph-gold/40" />
              </div>
              <h3 className="hidden font-display text-xl font-bold leading-tight text-ph-text-muted md:block md:pl-16 lg:text-2xl">
                {item.title}
              </h3>
            </div>

            {/* Entry content */}
            <div className="relative w-full min-w-0 pl-16 pr-1 md:pl-0 md:pr-2">
              <h3 className="mb-3 block text-left font-display text-lg font-bold text-ph-blue md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* The rail itself, drawn behind the markers */}
        <div
          style={{ height: height ? `${height}px` : '100%' }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-ph-blue/20 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-ph-gold via-ph-blue to-ph-blue/40"
          />
        </div>
      </div>
    </div>
  )
}
