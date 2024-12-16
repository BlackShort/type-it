'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <nav className="p-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Dashboard</h2>
          <ul className="space-y-2">
            {['Lessons', 'Progress', 'Custom Review', 'Typing Test', 'Games', 'Settings'].map((item) => (
              <li key={item}>
                <Link href={`/dashboard/${item.toLowerCase().replace(' ', '-')}`} className="block py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">Welcome, User!</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Progress Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">Typing Speed</h3>
              <p className="text-2xl dark:text-blue-300">60 WPM</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">Accuracy</h3>
              <p className="text-2xl dark:text-green-300">95%</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">Lessons Completed</h3>
              <p className="text-2xl dark:text-yellow-300">15</p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activities</h2>
          <ul className="space-y-2">
            {['Completed Lesson 5: Advanced Words', 'Typing Test: 65 WPM', 'Practiced Custom Drill: Numbers'].map((activity, index) => (
              <li key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded dark:text-gray-300">{activity}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Access</h2>
          <div className="flex space-x-4">
            <Button>Start New Lesson</Button>
            <Button variant="outline">Take Typing Test</Button>
            <Button variant="outline">Play Typing Game</Button>
          </div>
        </section>
      </main>
    </div>
  )
}

