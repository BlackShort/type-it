"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OnScreenKeyboard } from "@/components/OnScreenKeyboard"
import { DrillControls } from "@/components/DrillControls"
import { DrillConfig } from "@/components/DrillConfigModal"
import { ScoreScreen } from "@/components/ScoreScreen"
import { generateWords } from "@/utils/wordGenerator"

interface WordDrillProps {
  words: string[]
  onComplete: () => void
  onCancel: () => void
  config: DrillConfig | null
}

export function WordDrill({ words: initialWords, onCancel, config }: WordDrillProps) {
  const [words, setWords] = useState<string[]>(initialWords)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean[]>([])
  const [progress, setProgress] = useState(0)
  const [highlightedKey, setHighlightedKey] = useState('')
  const [isMac, setIsMac] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [showScoreScreen, setShowScoreScreen] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [wpmData, setWpmData] = useState<{ time: number; wpm: number }[]>([])
  const startTimeRef = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  const generateMoreWords = useCallback(() => {
    const newWords = generateWords(20, config?.complexity || 'medium')
    setWords(prevWords => [...prevWords, ...newWords])
  }, [config])

  useEffect(() => {
    if (config) {
      // Apply configuration settings
      setWords(generateWords(40, config.complexity))
      // Set up timer based on config duration
      const timer = setTimeout(() => {
        setShowScoreScreen(true)
      }, config.duration * 60 * 1000)

      return () => clearTimeout(timer)
    }
  }, [config])


  useEffect(() => {
    if (isRunning && config) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now()
      }

      const checkTime = () => {
        const elapsedTime = (Date.now() - startTimeRef.current!) / 1000
        if (elapsedTime >= config.duration * 60) {
          setIsRunning(false)
          setShowScoreScreen(true)
        } else {
          setProgress((elapsedTime / (config.duration * 60)) * 100)

          const wordsTyped = currentWordIndex + (typedWord.length / 5)
          const currentWpm = Math.round((wordsTyped / elapsedTime) * 60)
          setWpm(currentWpm)
          setWpmData(prevData => [...prevData, { time: Math.round(elapsedTime), wpm: currentWpm }])

          timerRef.current = setTimeout(checkTime, 1000)
        }
      }

      checkTime()

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }
  }, [isRunning, config, currentWordIndex, typedWord])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isRunning || words.length === 0) return

    event.preventDefault()

    const key = event.key.toLowerCase()
    const currentWord = words[currentWordIndex]
    const nextCharIndex = typedWord.length

    if (key === 'backspace' && typedWord.length > 0) {
      setTypedWord(prev => prev.slice(0, -1))
      setIsCorrect(prev => prev.slice(0, -1))
      return
    }

    if (key.length === 1) {
      if (key === currentWord[nextCharIndex]) {
        setTypedWord(prev => prev + key)
        setIsCorrect(prev => [...prev, true])
        setHighlightedKey(key)

        if (typedWord.length + 1 === currentWord.length) {
          setCurrentWordIndex(prev => prev + 1)
          setTypedWord('')
          setIsCorrect([])

          if (currentWordIndex + 1 >= words.length) {
            generateMoreWords()
          }

          // Update accuracy
          const totalChars = words.slice(0, currentWordIndex + 1).join('').length
          const correctChars = isCorrect.filter(Boolean).length
          setAccuracy(Math.round((correctChars / totalChars) * 100))
        }
      } else {
        setHighlightedKey(key)
        setIsCorrect(prev => [...prev, false])
      }
    }
  }, [currentWordIndex, typedWord, words, isRunning, isCorrect, generateMoreWords])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const renderWordGrid = () => {
    if (words.length === 0) return null

    const startIndex = Math.floor(currentWordIndex / 8) * 8
    const displayWords = words.slice(startIndex, startIndex + 8)
    const rows = [displayWords.slice(0, 4), displayWords.slice(4, 8)]

    return (
      <div className="flex flex-col gap-16">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between px-16">
            {row.map((word, colIndex) => {
              const globalWordIndex = startIndex + rowIndex * 4 + colIndex
              const isCurrentWord = globalWordIndex === currentWordIndex
              return (
                <div
                  key={colIndex}
                  className={`text-3xl font-mono space-x-0 mr-8 ${isCurrentWord
                    ? 'text-primary'
                    : globalWordIndex < currentWordIndex
                      ? 'text-green-500'
                      : 'text-muted-foreground'
                    }`}
                >
                  {word.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className={
                        isCurrentWord
                          ? charIndex < typedWord.length
                            ? isCorrect[charIndex]
                              ? 'text-green-500'
                              : 'text-red-500'
                            : charIndex === typedWord.length
                              ? 'border-b-2 border-primary'
                              : ''
                          : ''
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  const handleRestart = () => {
    setShowScoreScreen(false)
    //setShowConfigModal(true) // Removed
    setWpm(0)
    setAccuracy(100)
    setProgress(0)
    setWpmData([])
  }

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
      <Card className="mb-8 bg-black text-white">
        <CardHeader>
          <CardTitle>Word Drill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[300px]">
            {renderWordGrid()}
          </div>

          <div className="mt-8">
            <OnScreenKeyboard currentKey={highlightedKey} isMac={isMac} />
          </div>
        </CardContent>
      </Card>

      <DrillControls
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setCurrentWordIndex(0)
          setTypedWord('')
          setIsCorrect([])
          setIsRunning(false)
          //setShowConfigModal(true) // Removed
          setWpm(0)
          setAccuracy(100)
          setProgress(0)
          setWpmData([])
          startTimeRef.current = null
          if (timerRef.current) {
            clearTimeout(timerRef.current)
          }
        }}
        onCancel={onCancel}
        progress={progress}
        config={config}
        isRunning={isRunning}
      />
    </div>
  )
}

