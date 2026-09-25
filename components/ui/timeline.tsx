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
 * Scroll-progress timeline (after Aceternity's Timeline on 21st.dev): a left rail
 * whose gold fill tracks how far through the list the reader has scrolled, with
 * each entry's title pinned beside its content on desktop.
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
    offset: ['start 20%', 'end 60%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-5xl pb-12 md:pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-20">
            <div className="sticky top-28 z-30 flex max-w-[150px] flex-col items-center self-start md:w-full md:max-w-[260px] md:flex-row">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-ph-paper">
                <div className="h-3.5 w-3.5 rounded-full border border-ph-gold bg-ph-paper ring-4 ring-ph-gold/15" />
              </div>
              <h3 className="hidden font-display text-[2rem] font-medium italic leading-none tracking-[-0.02em] text-ph-navy/25 md:block md:pl-20">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full min-w-0 pl-16 pr-1 md:pl-0">
              <h3 className="mb-3 block font-display text-lg font-medium italic text-ph-gold-deep md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: height ? `${height}px` : '100%' }}
          className="absolute left-8 top-0 w-px overflow-hidden bg-ph-ink/10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-ph-gold-light via-ph-gold to-ph-navy"
          />
        </div>
      </div>
    </div>
  )
}
