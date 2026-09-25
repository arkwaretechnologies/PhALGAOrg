'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock, Loader2, Mail, MapPin } from 'lucide-react'
import SubpageLayout from '@/components/SubpageLayout'
import { BlurFade } from '@/components/ui/blur-fade'
import { site } from '@/lib/site'

const subjects = [
  { value: 'membership', label: 'Membership' },
  { value: 'conferences', label: 'Conferences & events' },
  { value: 'downloads', label: 'Downloads & member access' },
  { value: 'records', label: 'Archive or records request' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'general', label: 'General inquiry' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission
    // In a real application, this would send data to your backend
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 1000)
  }

  return (
    <SubpageLayout
      eyebrow="The Secretariat"
      title="Get in"
      titleAccent="Touch"
      subtitle="Reach out to learn more about our programs, membership, or conference materials."
    >
      <div className="container-site py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Contact information */}
          <BlurFade>
            <aside className="relative h-full overflow-hidden rounded-3xl bg-ph-navy p-8 text-white lg:p-10">
              <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                aria-hidden
                src="/assets/rosette-light.svg"
                alt=""
                className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] max-w-none opacity-[0.1]"
              />
              <div className="relative">
                <p className="eyebrow eyebrow-light">Contact information</p>
                <h2 className="mt-5 font-display text-[1.9rem] font-semibold leading-tight">
                  We’d be glad to <span className="italic text-ph-gold-light">hear from you.</span>
                </h2>

                <ul className="mt-10 space-y-7">
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-ph-gold-light">
                      <Mail className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">Email</p>
                      <a href={`mailto:${site.email}`} className="link-underline mt-1 inline-block text-[16px] text-white">
                        {site.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-ph-gold-light">
                      <MapPin className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">Office</p>
                      <p className="mt-1 text-[16px] leading-relaxed">
                        {site.office[0]}
                        <br />
                        {site.office[1]}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-ph-gold-light">
                      <Clock className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">Registration</p>
                      <p className="mt-1 text-[16px]">SEC Reg. No. {site.secRegistration}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </BlurFade>

          {/* Form */}
          <BlurFade delay={0.1}>
            <div className="rounded-3xl border border-ph-line bg-white p-8 shadow-card lg:p-10">
              <h2 className="font-display text-[1.9rem] font-semibold text-ph-ink">Send us a message</h2>
              <p className="mt-2 text-[14.5px] text-ph-muted">Fields marked * are required.</p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Name *
                  </label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="field" placeholder="Juan dela Cruz" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Email *
                  </label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="field" placeholder="you@lgu.gov.ph" autoComplete="email" />
                </div>
                <div className="sm:col-span-2">
                  <span id="subject-label" className="field-label">
                    Subject *
                  </span>
                  <div role="radiogroup" aria-labelledby="subject-label" className="flex flex-wrap gap-2">
                    {subjects.map((s) => {
                      const checked = formData.subject === s.value
                      return (
                        <label
                          key={s.value}
                          className={`relative cursor-pointer rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ph-brand ${
                            checked ? 'border-ph-navy text-white' : 'border-ph-line text-ph-ink/75 hover:border-ph-navy/40'
                          }`}
                        >
                          {checked && (
                            <motion.span
                              layoutId="subject-pill"
                              className="absolute inset-0 rounded-full bg-ph-navy"
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
                          <input
                            type="radio"
                            name="subject"
                            value={s.value}
                            checked={checked}
                            onChange={handleChange}
                            required
                            className="sr-only"
                          />
                          <span className="relative">{s.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="field-label">
                    Message *
                  </label>
                  <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} className="field resize-none" placeholder="How can we help?" />
                </div>

                <div className="sm:col-span-2">
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mb-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-[14.5px] text-emerald-800" role="status">
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          Thank you for your message! We’ll get back to you soon.
                        </p>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 rounded-2xl bg-red-50 p-4 text-[14.5px] text-red-800" role="alert">
                        Something went wrong. Please try again later.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <button type="submit" disabled={isSubmitting} className="btn-primary group w-full !py-4 disabled:opacity-70 sm:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="arrow-nudge h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </BlurFade>
        </div>
      </div>
    </SubpageLayout>
  )
}
