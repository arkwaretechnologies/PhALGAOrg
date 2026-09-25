'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

/** The history recording is a large file, so it is only fetched once the visitor asks for it. */
export default function HistoryVideo() {
  const [started, setStarted] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-ph-navy-deep shadow-lift">
      {started ? (
        <video
          src="/PhALGA%20History.mp4"
          controls
          autoPlay
          playsInline
          preload="auto"
          controlsList="nodownload"
          aria-label="PhALGA history video"
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setStarted(true)}
          aria-label="Play the PhALGA history video"
          className="group absolute inset-0 flex flex-col items-center justify-center text-white"
        >
          <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            aria-hidden
            src="/assets/rosette-light.svg"
            alt=""
            className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.1] transition-transform duration-[2s] ease-out group-hover:rotate-12 sm:w-[90%]"
          />
          <span className="relative flex h-20 w-20 items-center justify-center">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-ph-gold-light/60"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ph-gold-light text-ph-navy-deep transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7" fill="currentColor" />
            </span>
          </span>
          <span className="relative mt-6 font-display text-[22px] font-semibold sm:text-[26px]">Watch the PhALGA History</span>
          <span className="relative mt-2 max-w-sm px-6 text-center text-[13px] text-white/55">
            The full recording is a large file — it starts loading only when you press play.
          </span>
        </button>
      )}
    </div>
  )
}
