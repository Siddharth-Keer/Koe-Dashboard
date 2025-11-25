'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Clock, DollarSign, CheckCircle, XCircle, History, RefreshCcw, Moon, Sun, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '../../components/ThemeProvider'

interface User {
  id: number
  name: string
  email: string
  role: string
  hours: number
  earnings: number
  payoutAmount: number
  paymentMethod: string
  requestStatus: 'Pending' | 'Under Review' | 'Approved' | 'Rejected'
  avatarUrl?: string
  timestamp?: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [toast, setToast] = useState<{ message: string } | null>(null)
  const [adminEmail, setAdminEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  // Temporary mock/test data for visual QA of the payment table
  const initialPendingUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@creatorhub.com',
      role: 'Tech Vlogger',
      hours: 12.5,
      earnings: 3250,
      payoutAmount: 1200,
      paymentMethod: 'Wise',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@fitnessflow.io',
      role: 'Fitness Coach',
      hours: 18,
      earnings: 4500,
      payoutAmount: 2000,
      paymentMethod: 'PayPal',
      requestStatus: 'Under Review',
      avatarUrl: 'https://i.pravatar.cc/100?img=2',
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul@tradingpost.in',
      role: 'Finance Analyst',
      hours: 10.5,
      earnings: 2875,
      payoutAmount: 980,
      paymentMethod: 'Wise',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=15',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@wanderlust.com',
      role: 'Travel Creator',
      hours: 15,
      earnings: 3750,
      payoutAmount: 1500,
      paymentMethod: 'Gift Card',
      requestStatus: 'Under Review',
      avatarUrl: 'https://i.pravatar.cc/100?img=47',
    },
    {
      id: 5,
      name: 'Leo Martinez',
      email: 'leo@gamestream.gg',
      role: 'Gaming Streamer',
      hours: 22,
      earnings: 5200,
      payoutAmount: 2600,
      paymentMethod: 'Bitcoin',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=12',
    },
    {
      id: 6,
      name: 'Emily Park',
      email: 'emily@wellnesswave.co',
      role: 'Mindfulness Coach',
      hours: 9.25,
      earnings: 1980,
      payoutAmount: 750,
      paymentMethod: 'PayPal',
      requestStatus: 'Under Review',
      avatarUrl: 'https://i.pravatar.cc/100?img=21',
    },
    {
      id: 7,
      name: 'Marcus Chen',
      email: 'marcus@product-labs.io',
      role: 'Product Designer',
      hours: 7.5,
      earnings: 1650,
      payoutAmount: 620,
      paymentMethod: 'Bank Transfer',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=33',
    },
    {
      id: 8,
      name: 'Ananya Patel',
      email: 'ananya@aurorastudios.in',
      role: 'UI Illustrator',
      hours: 5.2,
      earnings: 1280,
      payoutAmount: 540,
      paymentMethod: 'PayPal',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=45',
    },
    {
      id: 9,
      name: 'Noah Carter',
      email: 'noah@cryptoalpha.io',
      role: 'Market Analyst',
      hours: 20,
      earnings: 6100,
      payoutAmount: 3000,
      paymentMethod: 'Wise',
      requestStatus: 'Under Review',
      avatarUrl: 'https://i.pravatar.cc/100?img=5',
    },
    {
      id: 10,
      name: 'Priya Menon',
      email: 'priya@mindfulmedia.in',
      role: 'Content Strategist',
      hours: 4,
      earnings: 980,
      payoutAmount: 400,
      paymentMethod: 'Gift Card',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=52',
    },
    {
      id: 11,
      name: 'David Kim',
      email: 'david@citysound.fm',
      role: 'Audio Producer',
      hours: 13.75,
      earnings: 3420,
      payoutAmount: 1100,
      paymentMethod: 'Bank Transfer',
      requestStatus: 'Pending',
      avatarUrl: 'https://i.pravatar.cc/100?img=27',
    },
    {
      id: 12,
      name: 'Lena Fischer',
      email: 'lena@wellbeinglab.de',
      role: 'Wellness Creator',
      hours: 16.25,
      earnings: 4025,
      payoutAmount: 1700,
      paymentMethod: 'Payoneer',
      requestStatus: 'Under Review',
      avatarUrl: 'https://i.pravatar.cc/100?img=63',
    },
  ]

  const [users, setUsers] = useState<User[]>([])
  const [paymentHistory, setPaymentHistory] = useState<User[]>([])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    const storedPendingUsers = localStorage.getItem('adminPendingUsers')
    if (storedPendingUsers) {
      setUsers(JSON.parse(storedPendingUsers))
    } else {
      setUsers(initialPendingUsers)
      localStorage.setItem('adminPendingUsers', JSON.stringify(initialPendingUsers))
    }

    const storedHistory = localStorage.getItem('adminPaymentHistory')
    if (storedHistory) {
      setPaymentHistory(JSON.parse(storedHistory))
    }

    const storedEmail = localStorage.getItem('adminEmail')
    if (storedEmail) {
      setAdminEmail(storedEmail)
    }

    const storedAvatar = localStorage.getItem('adminAvatar')
    if (storedAvatar) {
      setAvatarUrl(storedAvatar)
    }
  }, [router])

  const pendingUsers = users.filter(u => u.requestStatus === 'Pending' || u.requestStatus === 'Under Review')

  const stats = useMemo(() => ({
    totalUsers: pendingUsers.length + paymentHistory.length,
    pendingRequests: pendingUsers.length,
    totalPaid: paymentHistory.filter((u: User) => u.requestStatus === 'Approved').length,
  }), [pendingUsers.length, paymentHistory])

  const approvedAmountTotal = useMemo(() => (
    paymentHistory
      .filter(item => item.requestStatus === 'Approved')
      .reduce((sum, item) => sum + item.payoutAmount, 0)
  ), [paymentHistory])

  const adminDisplayName = useMemo(() => {
    if (!adminEmail) return 'Admin'
    const [namePart] = adminEmail.split('@')
    if (!namePart) return 'Admin'
    return namePart
      .split(/[._-]/)
      .filter(Boolean)
      .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ')
  }, [adminEmail])

  const adminInitials = useMemo(() => {
    return (
      adminDisplayName
        .split(' ')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('') || 'A'
    )
  }, [adminDisplayName])

  const recentHistory = useMemo(() => paymentHistory.slice(-4).reverse(), [paymentHistory])

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getInitials = (value: string) => {
    if (!value) return 'NA'
    return value
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('') || 'NA'
  }

  const avatarSizeClasses: Record<'lg' | 'md' | 'sm', string> = {
    lg: 'h-14 w-14 text-xl',
    md: 'h-10 w-10 text-base',
    sm: 'h-8 w-8 text-sm',
  }

  const Avatar = ({ label, size = 'md', imageUrl }: { label: string; size?: 'lg' | 'md' | 'sm'; imageUrl?: string | null }) => (
    <div
      className={`${avatarSizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center shadow-lg border border-white/20 dark:border-white/10 overflow-hidden`}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={`${label} avatar`} className="h-full w-full object-cover" />
      ) : (
        getInitials(label)
      )}
    </div>
  )

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
    setPaymentHistory(history)

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
    setPaymentHistory(history)

    setToast({ message: 'Payment request rejected.' })
    setTimeout(() => setToast(null), 3000)
  }

  const handleRefreshHistory = () => {
    console.log('TODO: Refresh completed requests data')
    const stored = localStorage.getItem('adminPaymentHistory')
    setPaymentHistory(stored ? JSON.parse(stored) : [])
  }

  const handleRefreshRequests = () => {
    console.log('TODO: Refresh pending requests data')
    const stored = localStorage.getItem('adminPendingUsers')
    setUsers(stored ? JSON.parse(stored) : initialPendingUsers)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    router.push('/admin/login')
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8">
        <div className="flex flex-wrap items-center justify-end gap-3 mb-8">
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
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-200 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-rose-600 hover:to-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar label={adminDisplayName} size="lg" imageUrl={avatarUrl} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back</p>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white leading-tight">Hi, {adminDisplayName}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{adminEmail || 'admin@koe.app'}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8">Manage user payments and requests with a wider, streamlined admin view.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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

        {/* Requests + History */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 lg:p-8 overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Payment Requests</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Review and manage user payment requests.</p>
              </div>
              <button
                type="button"
                onClick={handleRefreshRequests}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-200 transition"
                aria-label="Refresh payment requests"
              >
                <RefreshCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
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
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar label={user.name} size="sm" imageUrl={user.avatarUrl} />
                          <div>
                            <p className="text-gray-800 dark:text-white font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{user.role}</p>
                          </div>
                        </div>
                      </td>
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
                        <div className="flex flex-wrap gap-2">
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

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 lg:p-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Completed Requests</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Latest approved or rejected payouts. Total approved: ₹{approvedAmountTotal.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRefreshHistory}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-200 transition"
                aria-label="Refresh completed requests"
              >
                <RefreshCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            <div className="space-y-4">
              {recentHistory.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">No completed requests yet.</p>
              ) : (
                recentHistory.map(record => (
                  <div key={record.id} className="rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-4 bg-gray-50/60 dark:bg-gray-900/40">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar label={record.name} size="md" imageUrl={record.avatarUrl} />
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{record.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {record.paymentMethod} • {formatTimestamp(record.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 dark:text-white">₹{record.payoutAmount.toLocaleString()}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            record.requestStatus === 'Approved'
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          }`}
                        >
                          {record.requestStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
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

