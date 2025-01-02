'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!userLoggedIn) {
      router.push('/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/')
  }

  if (!isLoggedIn) {
    return null // or a loading spinner
  }

  const dashboardNavItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/lessons', label: 'Lessons' },
    { href: '/dashboard/progress', label: 'Progress' },
    { href: '/dashboard/settings', label: 'Settings' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar navItems={dashboardNavItems} />

      <div className="flex flex-1">
        <aside className="w-64 bg-card shadow-md">
          <nav className="p-4">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <ul className="space-y-2">
              {['Lessons', 'Progress', 'Custom Review', 'Typing Test', 'Games', 'Settings'].map((item) => (
                <li key={item}>
                  <Link href={`/dashboard/${item.toLowerCase().replace(' ', '-')}`} className="block py-2 px-4 rounded hover:bg-accent hover:text-accent-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Welcome, User!</h1>
            <Button onClick={handleLogout}>Logout</Button>
          </div>

          <section className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Typing Speed</h3>
                <p className="text-2xl text-primary">60 WPM</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Accuracy</h3>
                <p className="text-2xl text-green-600 dark:text-green-400">95%</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Lessons Completed</h3>
                <p className="text-2xl text-yellow-600 dark:text-yellow-400">15</p>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <ul className="space-y-2">
              {['Completed Lesson 5: Advanced Words', 'Typing Test: 65 WPM', 'Practiced Custom Drill: Numbers'].map((activity, index) => (
                <li key={index} className="bg-accent/50 p-3 rounded">{activity}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <div className="flex space-x-4">
              <Button>Start New Lesson</Button>
              <Button variant="outline">Take Typing Test</Button>
              <Button variant="outline">Play Typing Game</Button>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}

