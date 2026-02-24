'use client'

import { useState } from 'react'
import Section from '@/components/Section'
import Button from '@/components/Button'
import Link from 'next/link'

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup logic here
    console.log(isLogin ? 'Login' : 'Sign Up', formData)
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-philippine-blue to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {isLogin ? 'Member Login' : 'Sign Up'}
          </h1>
          <p className="text-xl text-blue-100">
            {isLogin
              ? 'Access member-exclusive resources and downloads'
              : 'Create an account to join PhALGA'}
          </p>
        </div>
      </Section>

      {/* Login/Signup Form */}
      <Section className="bg-white">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            {/* Toggle between Login and Sign Up */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  isLogin
                    ? 'bg-philippine-blue text-white'
                    : 'text-gray-700 hover:text-philippine-blue'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  !isLogin
                    ? 'bg-philippine-blue text-white'
                    : 'text-gray-700 hover:text-philippine-blue'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-2">
                    Fullname *
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    required={!isLogin}
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-philippine-blue focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required={!isLogin}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-philippine-blue focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-philippine-blue focus:border-transparent transition-all"
                  placeholder="Your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-philippine-blue focus:border-transparent transition-all"
                  placeholder="Your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-philippine-blue focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-philippine-blue focus:ring-philippine-blue" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm text-philippine-blue hover:text-blue-900">
                    Forgot Password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
