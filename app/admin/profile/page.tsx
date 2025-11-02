'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, ArrowLeft, CheckCircle, XCircle, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AdminProfilePage() {
  const router = useRouter()
  const [adminEmail, setAdminEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else {
      // Try to get admin email from localStorage, or use default
      const email = localStorage.getItem('adminEmail') || 'admin@liva.com'
      setAdminEmail(email)
    }
  }, [router])

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      setToast({
        type: 'error',
        message: 'Please fill in all password fields.',
      })
      setTimeout(() => setToast(null), 3000)
      return
    }

    if (newPassword !== confirmPassword) {
      setToast({
        type: 'error',
        message: 'New passwords do not match.',
      })
      setTimeout(() => setToast(null), 3000)
      return
    }

    if (newPassword.length < 6) {
      setToast({
        type: 'error',
        message: 'Password must be at least 6 characters long.',
      })
      setTimeout(() => setToast(null), 3000)
      return
    }

    // Mock password change - in real app, this would call an API
    setToast({
      type: 'success',
      message: 'Password changed successfully!',
    })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admin Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full">
                <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Account Information</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your admin profile details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-base font-medium text-gray-800 dark:text-white">{adminEmail || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                  <p className="text-base font-medium text-gray-800 dark:text-white">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
                <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Change Password</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your admin password</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition shadow-md hover:shadow-lg"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-4 right-4 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-l-4 ${
            toast.type === 'success' ? 'border-green-500' : 'border-red-500'
          } z-50 animate-slide-up`}>
            {toast.type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
            <p className={`font-medium ${
              toast.type === 'success' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
            }`}>
              {toast.message}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

