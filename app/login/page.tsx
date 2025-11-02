'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mock authentication
    if (email && password) {
      localStorage.setItem('userAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-indigo-600 dark:bg-indigo-500 p-3 rounded-full">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">User Login</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Welcome back! Please sign in to your account.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

