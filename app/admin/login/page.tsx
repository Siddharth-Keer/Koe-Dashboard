'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mock authentication
    if (email && password) {
      localStorage.setItem('adminAuthenticated', 'true')
      localStorage.setItem('adminEmail', email)
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-purple-600 dark:bg-purple-500 p-3 rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Admin Login</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Admin access only. Please sign in to continue.</p>
        
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter admin email"
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 dark:bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

