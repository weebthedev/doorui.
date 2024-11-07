'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface UserData {
  name: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        // Decode the token to get user information
        const decodedToken = jwtDecode<UserData>(token)
        setUser(decodedToken)
      } catch (error) {
        console.error('Error decoding token:', error)
        localStorage.removeItem('authToken')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">No user data available</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-xl mb-2">Welcome, {user.name}!</p>
      <p className="text-lg mb-4">Your email: {user.email}</p>
      <button
        onClick={() => {
          localStorage.removeItem('authToken')
          router.push('/login')
        }}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </div>
  )
}