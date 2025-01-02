import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { OnScreenKeyboard } from "@/components/OnScreenKeyboard"
import { ScoreScreen } from "@/components/ScoreScreen"
import { DrillControls } from "@/components/DrillControls"
import { generateSequence } from "@/utils/sequenceGenerator"

interface TypingPracticeProps {
  lessonTitle: string
  onComplete: () => void
  onCancel: () => void
  config: DrillConfig
  lessonKeys: string[]
}

export function TypingPractice({ lessonTitle, onComplete, onCancel, config, lessonKeys }: TypingPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typedKeys, setTypedKeys] = useState<string[]>([])
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [showResults, setShowResults] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const [isRunning, setIsRunning] = useState(true) // Set to true by default
  const [sequence, setSequence] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  const correctAudioRef = useRef<HTMLAudioElement | null>(null)
  const errorAudioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const loadAudio = async () => {
      try {
        correctAudioRef.current = new Audio('/correct-key.mp3')
        await correctAudioRef.current.load()
        errorAudioRef.current = new Audio('/error-key.mp3')
        await errorAudioRef.current.load()
      } catch (error) {
        console.error("Error loading audio:", error)
      }
    }
    loadAudio()
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    generateNewSequence()
    setStartTime(Date.now()) // Start the timer immediately
  }, [])

  const generateNewSequence = useCallback(() => {
    const newSequence = generateSequence(lessonKeys, 8).split('')
    setSequence(newSequence)
    setCurrentIndex(0)
    setTypedKeys([])
  }, [lessonKeys])

  const playSound = (isCorrect: boolean) => {
    const audio = isCorrect ? correctAudioRef.current : errorAudioRef.current
    if (audio) {
      audio.currentTime = 0 // Reset audio to start
      audio.play().catch(error => {
        if (error.name === 'NotSupportedError') {
          console.warn("Audio playback not supported in this environment")
        } else {
          console.error("Error playing sound:", error)
        }
      })
    }
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isRunning || showResults) return
    
    event.preventDefault()
    
    const key = event.key.toLowerCase()
    const expectedKey = sequence[currentIndex].toLowerCase()
    const isCorrect = key === expectedKey

    playSound(isCorrect)

    if (isCorrect) {
      setTypedKeys(prev => [...prev, key])
      setCurrentIndex(prev => prev + 1)
    }

    if (currentIndex + 1 >= sequence.length) {
      generateNewSequence()
    }
  }, [sequence, currentIndex, isRunning, showResults, generateNewSequence])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    if (isRunning && config) {
      if (!startTime) {
        setStartTime(Date.now())
      }

      intervalRef.current = setInterval(() => {
        const elapsedTime = (Date.now() - startTime!) / 1000
        const totalTime = config.duration * 60
        setProgress((elapsedTime / totalTime) * 100)

        if (elapsedTime >= totalTime) {
          setShowResults(true)
          setIsRunning(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
        } else {
          const wordsTyped = typedKeys.length / 5
          const currentWpm = Math.round((wordsTyped / elapsedTime) * 60)
          setWpm(currentWpm)

          const correctChars = typedKeys.filter((char, index) => char === sequence[index % sequence.length].toLowerCase()).length
          const calculatedAccuracy = Math.round((correctChars / typedKeys.length) * 100)
          setAccuracy(calculatedAccuracy)
        }
      }, 1000)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, config, startTime, typedKeys, sequence])

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleResume = () => {
    setIsRunning(true)
    if (!startTime) {
      setStartTime(Date.now())
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentIndex(0)
    setTypedKeys([])
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setProgress(0)
    generateNewSequence()
    setIsRunning(true) // Automatically start after reset
    setStartTime(Date.now())
  }

  if (showResults) {
    return (
      <ScoreScreen
        wpm={wpm}
        accuracy={accuracy}
        time={(startTime ? (Date.now() - startTime) / 1000 : 0)}
        wpmData={[]} // You might want to implement WPM tracking over time
        onRestart={handleReset}
        onExit={onComplete}
      />
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{lessonTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Type the following:</h2>
            <TypingSequenceButtons 
              sequence={sequence} 
              currentIndex={currentIndex} 
              typedKeys={typedKeys}
            />
          </div>

          <Progress value={progress} className="mb-4" />

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">On-Screen Keyboard</h3>
            <OnScreenKeyboard currentKey={sequence[currentIndex]} isMac={isMac} />
          </div>
        </CardContent>
      </Card>

      <DrillControls
        onStart={handleResume}
        onPause={handlePause}
        onReset={handleReset}
        onCancel={onCancel}
        progress={progress}
        config={config}
        isRunning={isRunning}
      />
    </div>
  )
}

export function TypingSequenceButtons({ sequence, currentIndex, typedKeys }: TypingSequenceButtonsProps) {
  const rows = [sequence.slice(0, 4), sequence.slice(4, 8)]

  return (
    <div className="grid grid-cols-2 gap-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between">
          {row.map((char, index) => {
            const globalIndex = rowIndex * 4 + index
            let buttonClass = "flex-1 h-12 text-lg font-bold mx-1"
            if (globalIndex === currentIndex) {
              buttonClass += " bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
            } else if (globalIndex < currentIndex) {
              buttonClass += typedKeys[globalIndex] === char ? " bg-secondary text-secondary-foreground" : " bg-destructive text-destructive-foreground"
            } else {
              buttonClass += " bg-muted text-muted-foreground"
            }
            return (
              <Button key={index} className={buttonClass} disabled>
                {char === ' ' ? 'Space' : char}
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

