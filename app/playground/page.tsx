'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TypingPlayground() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.")
  const [input, setInput] = useState('')
  const [timer, setTimer] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timer])

  const handleStart = () => {
    setIsRunning(true)
    setInput('')
    setWpm(0)
    setAccuracy(100)
    setTimer(60)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)

    // Calculate WPM
    const wordsTyped = value.trim().split(' ').length
    const minutesPassed = (60 - timer) / 60
    const currentWpm = Math.round(wordsTyped / minutesPassed)
    setWpm(currentWpm)

    // Calculate accuracy
    const correctChars = value.split('').filter((char, index) => char === text[index]).length
    const currentAccuracy = Math.round((correctChars / value.length) * 100)
    setAccuracy(currentAccuracy)
  }

  return (
    <div className="container mx-auto p-8 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Typing Playground</h1>
        <ThemeToggle />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">Sample Text:</h2>
        <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded dark:text-gray-300">{text}</p>
      </div>

      <div className="mb-8">
        <textarea
          value={input}
          onChange={handleInputChange}
          disabled={!isRunning}
          className="w-full h-32 p-4 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          placeholder={isRunning ? "Start typing here..." : "Click 'Start' to begin"}
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button onClick={handleStart} disabled={isRunning}>
          {isRunning ? 'Typing...' : 'Start'}
        </Button>
        <div className="text-xl dark:text-white">Time left: {timer}s</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
          <h3 className="font-semibold mb-2 dark:text-white">Words Per Minute</h3>
          <p className="text-2xl dark:text-blue-300">{wpm}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
          <h3 className="font-semibold mb-2 dark:text-white">Accuracy</h3>
          <p className="text-2xl dark:text-green-300">{accuracy}%</p>
        </div>
      </div>
    </div>
  )
}

