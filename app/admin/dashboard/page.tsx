'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Clock, DollarSign, CheckCircle, XCircle, History } from 'lucide-react'
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

export default function AdminDashboardPage() {
  const router = useRouter()
  const [toast, setToast] = useState<{ message: string } | null>(null)

  // Initial mock user data (only pending requests start here)
  const initialPendingUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      hours: 12.5,
      earnings: 3250,
      payoutAmount: 1200,
      paymentMethod: 'Wise',
      requestStatus: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      hours: 18.0,
      earnings: 4500,
      payoutAmount: 2000,
      paymentMethod: 'PayPal',
      requestStatus: 'Pending',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      hours: 15.0,
      earnings: 3750,
      payoutAmount: 1500,
      paymentMethod: 'Gift Card',
      requestStatus: 'Pending',
    },
  ]

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Load pending users from localStorage or use initial data
    const storedPendingUsers = localStorage.getItem('adminPendingUsers')
    if (storedPendingUsers) {
      setUsers(JSON.parse(storedPendingUsers))
    } else {
      setUsers(initialPendingUsers)
      localStorage.setItem('adminPendingUsers', JSON.stringify(initialPendingUsers))
    }
  }, [router])

  // Filter to only show pending requests (users state should only contain pending anyway)
  const pendingUsers = users.filter(u => u.requestStatus === 'Pending')

  // Load payment history for stats
  const paymentHistory = useMemo(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('adminPaymentHistory')
    return stored ? JSON.parse(stored) : []
  }, [users]) // Recalculate when users change (after approve/reject)

  const stats = useMemo(() => ({
    totalUsers: pendingUsers.length + paymentHistory.length,
    pendingRequests: pendingUsers.length,
    totalPaid: paymentHistory.filter((u: User) => u.requestStatus === 'Approved').length,
  }), [pendingUsers.length, paymentHistory.length])

  const handleApprove = (id: number) => {
    const userToApprove = users.find(u => u.id === id)
    if (!userToApprove) return

    // Add timestamp
    const approvedUser: User = {
      ...userToApprove,
      requestStatus: 'Approved',
      timestamp: new Date().toISOString(),
    }

    // Remove from pending and add to history
    const updatedPending = users.filter(u => u.id !== id)
    setUsers(updatedPending)
    localStorage.setItem('adminPendingUsers', JSON.stringify(updatedPending))

    // Add to payment history
    const storedHistory = localStorage.getItem('adminPaymentHistory')
    const history = storedHistory ? JSON.parse(storedHistory) : []
    history.push(approvedUser)
    localStorage.setItem('adminPaymentHistory', JSON.stringify(history))

    setToast({ message: 'Payment request approved successfully!' })
    setTimeout(() => setToast(null), 3000)
  }

  const handleReject = (id: number) => {
    const userToReject = users.find(u => u.id === id)
    if (!userToReject) return

    // Add timestamp
    const rejectedUser: User = {
      ...userToReject,
      requestStatus: 'Rejected',
      timestamp: new Date().toISOString(),
    }

    // Remove from pending and add to history
    const updatedPending = users.filter(u => u.id !== id)
    setUsers(updatedPending)
    localStorage.setItem('adminPendingUsers', JSON.stringify(updatedPending))

    // Add to payment history
    const storedHistory = localStorage.getItem('adminPaymentHistory')
    const history = storedHistory ? JSON.parse(storedHistory) : []
    history.push(rejectedUser)
    localStorage.setItem('adminPaymentHistory', JSON.stringify(history))

    setToast({ message: 'Payment request rejected.' })
    setTimeout(() => setToast(null), 3000)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage user payments and requests.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Payment Requests
            </Link>
            <Link
              href="/admin/history"
              className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
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
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalUsers}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Pending Requests</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.pendingRequests}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Total Paid</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalPaid}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 overflow-x-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Payment Requests</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Review and manage user payment requests.</p>
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
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Request Status</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
                      No pending payment requests.
                    </td>
                  </tr>
                ) : (
                  pendingUsers.map((user) => (
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
                          : user.requestStatus === 'Rejected'
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {user.requestStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 dark:hover:from-green-500 dark:hover:to-green-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-semibold hover:from-red-700 hover:to-red-800 dark:hover:from-red-500 dark:hover:to-red-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-4 right-4 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-l-4 border-purple-500 z-50 animate-slide-up">
            <CheckCircle className="w-6 h-6 text-purple-500" />
            <p className="font-medium text-gray-800 dark:text-white">{toast.message}</p>
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

