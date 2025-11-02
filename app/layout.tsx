import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Liva Dashboard',
  description: 'User and Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

