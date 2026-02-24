'use client'

import { useState } from 'react'
import Button from './Button'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email signup logic here
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
      setName('')
      setCompany('')
    }, 3000)
  }

  return (
    <section className="bg-gradient-to-r from-philippine-blue to-blue-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            PhALGA news in your inbox.
          </h2>
          <p className="text-blue-100 text-lg">
            Stay updated with the latest circulars, events, and announcements.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-philippine-yellow focus:outline-none"
                placeholder="First Last"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-philippine-yellow focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-philippine-yellow focus:outline-none"
                placeholder="Your Organization"
              />
            </div>
          </div>
          <div className="text-center">
            <Button
              type="submit"
              variant="secondary"
              size="large"
              className="bg-philippine-yellow text-gray-900 hover:bg-yellow-400"
            >
              {submitted ? 'Subscribed!' : 'JOIN OUR EMAIL LIST'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
