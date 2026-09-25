'use client'

import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-white/70 transition-colors hover:border-white/40 hover:text-white"
    >
      Back to top
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  )
}
