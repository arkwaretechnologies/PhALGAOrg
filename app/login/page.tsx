'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpenText, FileText, LockKeyhole } from 'lucide-react'
import SubpageLayout from '@/components/SubpageLayout'
import { cn } from '@/lib/utils'

const perks = [
  { icon: BookOpenText, text: 'Lecture decks from national and regional conferences' },
  { icon: FileText, text: 'Circulars, memoranda and reference materials' },
  { icon: LockKeyhole, text: 'Member-only announcements from the Secretariat' },
]

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup logic here
    console.log(isLogin ? 'Login' : 'Sign Up', formData)
  }

  const reveal = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  } as const

  return (
    <SubpageLayout
      eyebrow="Members"
      title={isLogin ? 'Member' : 'Create an'}
      titleAccent={isLogin ? 'Login' : 'Account'}
      subtitle={isLogin ? 'Access member-exclusive resources and downloads.' : 'Create an account to join PhALGA.'}
    >
      <div className="container-site py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="lg:pt-6">
            <p className="eyebrow">Member benefits</p>
            <h2 className="mt-5 font-display text-[2rem] font-semibold leading-tight text-ph-ink">
              Your library of <span className="italic text-ph-gold-deep">practice resources.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {perks.map((p) => (
                <li key={p.text} className="flex items-center gap-4 text-[15px] text-ph-ink/80">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ph-mist text-ph-navy">
                    <p.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-ph-line bg-white p-7 shadow-lift sm:p-9">
            {/* Segmented control */}
            <div className="relative grid grid-cols-2 rounded-full bg-ph-mist p-1" role="tablist">
              {[
                { id: true, label: 'Log in' },
                { id: false, label: 'Sign up' },
              ].map((t) => (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={isLogin === t.id}
                  onClick={() => setIsLogin(t.id)}
                  className={cn(
                    'relative rounded-full py-2.5 text-[14px] font-semibold transition-colors',
                    isLogin === t.id ? 'text-white' : 'text-ph-ink/60 hover:text-ph-ink'
                  )}
                >
                  {isLogin === t.id && (
                    <motion.span
                      layoutId="auth-tab"
                      className="absolute inset-0 rounded-full bg-ph-navy"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <AnimatePresence initial={false}>
                {!isLogin && (
                  <motion.div key="signup-top" {...reveal} className="overflow-hidden">
                    <div className="space-y-5 pb-5">
                      <div>
                        <label htmlFor="fullname" className="field-label">
                          Full name *
                        </label>
                        <input type="text" id="fullname" name="fullname" required={!isLogin} value={formData.fullname} onChange={handleChange} className="field" placeholder="Your full name" autoComplete="name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="field-label">
                          Email address *
                        </label>
                        <input type="email" id="email" name="email" required={!isLogin} value={formData.email} onChange={handleChange} className="field" placeholder="you@lgu.gov.ph" autoComplete="email" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="field-label">
                    Username *
                  </label>
                  <input type="text" id="username" name="username" required value={formData.username} onChange={handleChange} className="field" placeholder="Your username" autoComplete="username" />
                </div>
                <div>
                  <label htmlFor="password" className="field-label">
                    Password *
                  </label>
                  <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} className="field" placeholder="Your password" autoComplete={isLogin ? 'current-password' : 'new-password'} />
                </div>
              </div>

              <AnimatePresence initial={false} mode="wait">
                {!isLogin ? (
                  <motion.div key="confirm" {...reveal} className="overflow-hidden">
                    <div className="pt-5">
                      <label htmlFor="confirmPassword" className="field-label">
                        Confirm password *
                      </label>
                      <input type="password" id="confirmPassword" name="confirmPassword" required={!isLogin} value={formData.confirmPassword} onChange={handleChange} className="field" placeholder="Confirm your password" autoComplete="new-password" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="remember" {...reveal} className="overflow-hidden">
                    <div className="flex items-center justify-between pt-5">
                      <label className="flex cursor-pointer items-center gap-2 text-[14px] text-ph-muted">
                        <input type="checkbox" className="h-4 w-4 rounded border-ph-line accent-ph-navy" />
                        Remember me
                      </label>
                      <Link href="#" className="link-underline text-[14px] font-medium text-ph-navy">
                        Forgot password?
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="btn-primary group mt-8 w-full !py-4">
                {isLogin ? 'Log in' : 'Create account'}
                <ArrowRight className="arrow-nudge h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </SubpageLayout>
  )
}
