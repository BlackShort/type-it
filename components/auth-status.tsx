'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (e.g., by checking localStorage or a cookie)
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    router.push('/')
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">Logged In</span>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" onClick={() => router.push('/login')}>Login</Button>
      <Button onClick={() => router.push('/signup')}>Sign Up</Button>
    </div>
  )
}

