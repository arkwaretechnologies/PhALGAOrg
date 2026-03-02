'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function FadeUpObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])
  return null
}
