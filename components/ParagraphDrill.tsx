'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DrillControls } from "@/components/DrillControls"
import { DrillConfigModal, DrillConfig } from "@/components/DrillConfigModal"
import { ScoreScreen } from "@/components/ScoreScreen"

interface ParagraphDrillProps {
  text: string
  onComplete: () => void
  onCancel: () => void
  config: DrillConfig | null
}

export function ParagraphDrill({ text, onComplete, onCancel, config }: ParagraphDrillProps) {
  const [typedText, setTypedText] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean[]>([])
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showScoreScreen, setShowScoreScreen] = useState(false)
  const [wpmData, setWpmData] = useState<{ time: number; wpm: number }[]>([])
  const startTimeRef = React.useRef<number | null>(null)

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isRunning || text.length === 0) return

    const key = event.key
    if (key === 'Backspace' && typedText.length > 0) {
      setTypedText(prev => prev.slice(0, -1))
      setIsCorrect(prev => prev.slice(0, -1))
      return
    }

    if (key.length === 1) {
      const nextCharIndex = typedText.length
      const isCharCorrect = key === text[nextCharIndex]
      
      setTypedText(prev => prev + key)
      setIsCorrect(prev => [...prev, isCharCorrect])

      if (nextCharIndex + 1 === text.length) {
        setShowScoreScreen(true)
        setIsRunning(false)
      }
    }
  }, [text, typedText, isRunning])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (isRunning && typedText.length > 0 && config) {
      const timeElapsed = (Date.now() - startTimeRef.current!) / 1000 / 60 // in minutes
      const wordsTyped = typedText.length / 5 // assume average word length of 5 characters
      const currentWpm = Math.round(wordsTyped / timeElapsed)
      setWpm(currentWpm)
      setWpmData(prevData => [...prevData, { time: Math.round(timeElapsed * 60), wpm: currentWpm }])

      const correctChars = isCorrect.filter(Boolean).length
      setAccuracy(Math.round((correctChars / typedText.length) * 100))

      setProgress((typedText.length / text.length) * 100)
    }
  }, [typedText, isCorrect, isRunning, config, text.length])

  useEffect(() => {
    if (config) {
      // Apply configuration settings
      // For example, you might want to generate a new paragraph based on the config
      // setText(generateParagraph(config.complexity))

      // Set up timer based on config duration
      const timer = setTimeout(() => {
        setShowScoreScreen(true)
      }, config.duration * 60 * 1000)

      return () => clearTimeout(timer)
    }
  }, [config])


  const handleRestart = () => {
    setShowScoreScreen(false)
    //setShowConfigModal(true) // Removed
    setWpm(0)
    setAccuracy(100)
    setProgress(0)
    setWpmData([])
  }

  useEffect(() => {
    if (config && !isRunning) {
      startTimeRef.current = Date.now()
      setIsRunning(true);
    }
  }, [config, isRunning])


  if (showScoreScreen) {
    return (
      <ScoreScreen
        wpm={wpm}
        accuracy={accuracy}
        time={(Date.now() - startTimeRef.current!) / 1000}
        wpmData={wpmData}
        onRestart={handleRestart}
        onExit={onCancel}
      />
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Paragraph Drill</span>
            <div className="text-sm space-x-4">
              <span>WPM: {wpm}</span>
              <span>Accuracy: {accuracy}%</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl leading-relaxed whitespace-pre-wrap mb-8">
            {text.split('').map((char, index) => {
              const isTyped = index < typedText.length
              const isCurrentChar = index === typedText.length
              
              return (
                <span
                  key={index}
                  className={`${
                    isTyped
                      ? isCorrect[index]
                        ? 'text-green-500'
                        : 'text-red-500'
                      : isCurrentChar
                      ? 'border-b-2 border-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {char}
                </span>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <DrillControls
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setTypedText('')
          setIsCorrect([])
          setWpm(0)
          setAccuracy(100)
          setProgress(0)
          setIsRunning(false)
          //setShowConfigModal(true) // Removed
          //setText('')
          setWpmData([])
        }}
        onCancel={onCancel}
        progress={progress}
        config={config}
        isRunning={isRunning}
      />
    </div>
  )
}

