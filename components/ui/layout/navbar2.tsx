'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BsDoorOpenFill } from "react-icons/bs"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { LogOut } from "lucide-react"

export default function Navbar2() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <nav className="backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BsDoorOpenFill className="h-6 w-6" />
              <span className="font-bold text-xl">Auth App</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
                <Button onClick={handleLogout} variant="ghost" className="flex items-center space-x-2">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
                <Link href="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
              </>
            )}
          </div>
          <div className="flex md:hidden">
            {/* Mobile menu button */}
            <Button variant="ghost" className="p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" className="p-2">
              <FaFacebookF className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="p-2">
              <FaTwitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="p-2">
              <FaInstagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Dashboard</Link>
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</Link>
              <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}