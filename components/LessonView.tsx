"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lesson, Drill } from "@/types/lessons"
import { TypingPractice } from "@/components/TypingPractice"
import { WordDrill } from "@/components/WordDrill"
import { ParagraphDrill } from "@/components/ParagraphDrill"
import { ChevronLeft, ChevronRight, Keyboard, Type, FileText } from 'lucide-react'
import { lessons } from "@/data/lessons"
import { DrillConfigModal, DrillConfig } from "@/components/DrillConfigModal"
import { generateSequence } from "@/utils/sequenceGenerator" // Updated import path

interface LessonViewProps {
  lesson: Lesson
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
}

export function LessonView({ lesson }: LessonViewProps) {
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null)
  const [drillConfig, setDrillConfig] = useState<DrillConfig | null>(null)
  const router = useRouter()

  const handleDrillSelect = (drill: Drill) => {
    setSelectedDrill({
      ...drill,
      generateMoreContent: () => {
        if (drill.type === 'key') {
          return generateSequence(lesson.keys, 20).split(''); // Generate 20 new characters
        }
        return drill.content;
      }
    });
    setDrillConfig(null)
  }

  const handleDrillComplete = () => {
    setSelectedDrill(null)
  }

  const handleConfigSubmit = (config: DrillConfig) => {
    setDrillConfig(config)
  }

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === lesson.id)
    if (currentIndex < lessons.length - 1) {
      router.push(`/lessons/${lessons[currentIndex + 1].id}`)
    }
  }

  const handlePreviousLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === lesson.id)
    if (currentIndex > 0) {
      router.push(`/lessons/${lessons[currentIndex - 1].id}`)
    }
  }

  const defaultDrillConfig: DrillConfig = {
    complexity: 'easy', // Default to the simplest complexity
    duration: 5, // Default duration in minutes, adjust as needed
    generationType: 'auto', // Default to automatic generation
    level: 'beginner', // Default to the starting level
  };


  const renderDrill = () => {
    if (!selectedDrill) return null

    switch (selectedDrill.type) {
      case 'key':
        return (
          <TypingPractice
            lessonTitle={`${lesson.title} - Key Practice`}
            sequence={
              typeof selectedDrill.content === 'string'
                ? selectedDrill.content.split('')
                : selectedDrill.content
            }
            onComplete={handleDrillComplete}
            onCancel={() => setSelectedDrill(null)}
            config={drillConfig ?? defaultDrillConfig}
            generateMoreContent={selectedDrill.generateMoreContent}
            lessonKeys={lesson.keys}
          />

        )
      case 'word':
        return (
          <WordDrill
            words={selectedDrill.content as string[]}
            onComplete={handleDrillComplete}
            onCancel={() => setSelectedDrill(null)}
            config={drillConfig}
          />
        )
      case 'paragraph':
        return (
          <ParagraphDrill
            text={selectedDrill.content as string}
            onComplete={handleDrillComplete}
            onCancel={() => setSelectedDrill(null)}
            config={drillConfig}
          />
        )
      default:
        return null
    }
  }

  const getDrillIcon = (type: string) => {
    switch (type) {
      case 'key':
        return <Keyboard className="h-6 w-6" />
      case 'word':
        return <Type className="h-6 w-6" />
      case 'paragraph':
        return <FileText className="h-6 w-6" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8 border-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{lesson.title}</span>
            <Badge variant="secondary">
              {lesson.keys.join(', ')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-lg">{lesson.description}</p>
          {!selectedDrill ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lesson.drills.map((drill, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => handleDrillSelect(drill)}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    {getDrillIcon(drill.type)}
                    <h3 className="text-xl font-semibold mt-4 mb-2">
                      {drill.type === 'key' ? 'Key Drill' :
                        drill.type === 'word' ? 'Word Drill' :
                          'Paragraph Drill'}
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      {drill.type === 'key' ? 'Practice individual keys' :
                        drill.type === 'word' ? 'Type common words' :
                          'Master full sentences'}
                    </p>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDrillSelect(drill)
                      }}
                    >
                      Start Drill
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            renderDrill()
          )}
          {selectedDrill && !drillConfig && (
            <DrillConfigModal
              isOpen={true}
              onClose={() => setSelectedDrill(null)}
              onStart={handleConfigSubmit}
            />
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between items-start mt-8">
        {lessons.findIndex(l => l.id === lesson.id) > 0 && (
          <Button
            onClick={handlePreviousLesson}
            variant="outline"
            className="flex items-center space-x-2 transition-all hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Lesson</span>
          </Button>
        )}
        <Button
          onClick={() => router.push('/')}
          variant="secondary"
          className="transition-all hover:bg-secondary-foreground hover:text-secondary"
        >
          Back to Lessons
        </Button>
        {lessons.findIndex(l => l.id === lesson.id) < lessons.length - 1 ? (
          <Button
            onClick={handleNextLesson}
            variant="outline"
            className="flex items-center space-x-2 transition-all hover:bg-secondary"
          >
            <span>Next Lesson</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

