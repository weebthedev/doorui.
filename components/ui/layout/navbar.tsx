'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BsDoorOpenFill } from "react-icons/bs"
import { LogOut } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken')
      setIsLoggedIn(!!token)
    }

    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <nav className="backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <BsDoorOpenFill className="h-6 w-6" />
              <span className="font-bold text-xl">Auth App</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <Button onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}