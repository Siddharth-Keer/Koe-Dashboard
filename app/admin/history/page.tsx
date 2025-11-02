'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { History, CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: number
  name: string
  hours: number
  earnings: number
  payoutAmount: number
  paymentMethod: string
  requestStatus: 'Pending' | 'Approved' | 'Rejected'
  timestamp?: string
}

export default function PaymentHistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<User[]>([])

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Load payment history from localStorage
    const stored = localStorage.getItem('adminPaymentHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [router])

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Sort by timestamp (newest first)
  const sortedHistory = [...history].sort((a, b) => {
    if (!a.timestamp) return 1
    if (!b.timestamp) return -1
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  const approvedCount = history.filter(u => u.requestStatus === 'Approved').length
  const rejectedCount = history.filter(u => u.requestStatus === 'Rejected').length
  const totalAmount = history
    .filter(u => u.requestStatus === 'Approved')
    .reduce((sum, u) => sum + u.payoutAmount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Payment History</h2>
            <p className="text-gray-600 dark:text-gray-400">View all completed payment requests (approved and rejected).</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Payment Requests
            </Link>
            <Link
              href="/admin/history"
              className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              Payment History
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Total Records</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{history.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Approved</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{approvedCount}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Total Approved Amount</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 overflow-x-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Completed Requests</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">All payment requests that have been approved or rejected.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Name</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Hours</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Earnings</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Payout Amount</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Payment Method</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Processed At</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
                      No payment history yet. Approved or rejected requests will appear here.
                    </td>
                  </tr>
                ) : (
                  sortedHistory.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="py-4 px-4 text-gray-800 dark:text-white font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{user.hours} hrs</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">₹{user.earnings.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-800 dark:text-white font-semibold text-lg">₹{user.payoutAmount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{user.paymentMethod}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          user.requestStatus === 'Approved' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                        }`}>
                          {user.requestStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">
                        {formatTimestamp(user.timestamp)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

