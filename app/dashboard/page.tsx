'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, DollarSign, CreditCard, Minus, CheckCircle, XCircle } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('Wise')
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Mock data
  const stats = {
    hoursRecorded: 12.5,
    totalEarnings: 3250,
    availableToPayout: 1200,
    minimumWithdrawalLimit: 500,
  }

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('userAuthenticated')
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [router])

  const paymentMethods = ['Wise', 'PayPal', 'Bitcoin', 'Gift Card']

  const handleRequestPayment = () => {
    if (stats.availableToPayout >= stats.minimumWithdrawalLimit) {
      setToast({
        type: 'success',
        message: `Payment request sent successfully via ${paymentMethod}!`,
      })
    } else {
      setToast({
        type: 'error',
        message: 'Minimum withdrawal limit not reached.',
      })
    }

    // Hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome back! Here's your earnings overview.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Hours Recorded</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.hoursRecorded} hrs</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Total Earnings</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">₹{stats.totalEarnings.toLocaleString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Available to Payout</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">₹{stats.availableToPayout.toLocaleString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                <Minus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">Minimum Withdrawal Limit</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">₹{stats.minimumWithdrawalLimit.toLocaleString()}</p>
          </div>
        </div>

        {/* Payment Request Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Request Payment</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Select your preferred payment method and request a withdrawal.</p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Choose Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-medium"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRequestPayment}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Request Payment
            </button>
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

