"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, RotateCcw, X } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DrillConfig } from './DrillConfigModal'

interface DrillControlsProps {
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onCancel: () => void
  progress: number
  config: DrillConfig | null
  isRunning: boolean
}

export function DrillControls({ onStart, onPause, onReset, onCancel, progress, config, isRunning }: DrillControlsProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && config) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev >= config.duration * 60) {
            clearInterval(interval!)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, config])

  useEffect(() => {
    if (!isRunning) {
      setTime(0)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <TooltipProvider>
      <Card className="bg-background/50 backdrop-blur-sm fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={isRunning ? onPause : onStart}
                  className="h-8 w-8"
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRunning ? 'Pause' : 'Start'} Typing</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={onReset}
                  className="h-8 w-8"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset Progress</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={onCancel}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exit Drill</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="text-xl font-mono font-bold">
            {formatTime(time)} / {config ? formatTime(config.duration * 60) : '0:00'}
          </div>

          <div className="w-1/3">
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

