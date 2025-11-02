'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun, LayoutDashboard, User } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    router.push('/admin/login')
  }

  const isAdminRoute = pathname?.startsWith('/admin') ?? false

  // Don't show navbar on login pages
  if (pathname === '/login' || pathname === '/admin/login' || !pathname) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Liva Dashboard
            </h1>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={isAdminRoute ? "/admin/dashboard" : "/dashboard"}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  (isAdminRoute && pathname === '/admin/dashboard') || (!isAdminRoute && pathname === '/dashboard')
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href={isAdminRoute ? "/admin/profile" : "/profile"}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  (isAdminRoute && pathname === '/admin/profile') || (!isAdminRoute && pathname === '/profile')
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={isAdminRoute ? handleAdminLogout : handleLogout}
              className="px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2 mt-4">
          <Link
            href={isAdminRoute ? "/admin/dashboard" : "/dashboard"}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
              (isAdminRoute && pathname === '/admin/dashboard') || (!isAdminRoute && pathname === '/dashboard')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href={isAdminRoute ? "/admin/profile" : "/profile"}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
              (isAdminRoute && pathname === '/admin/profile') || (!isAdminRoute && pathname === '/profile')
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

