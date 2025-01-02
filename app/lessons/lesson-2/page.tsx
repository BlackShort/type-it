import React from 'react'
import { LessonView } from "@/components/LessonView"
import { lessons } from "@/data/lessons"

export default function KeysEAndILesson() {
  const lesson = lessons.find(l => l.id === 'lesson-2')

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  return (
    <LessonView
      lesson={lesson}
      onComplete={() => {/* Handle completion */}}
      onNext={() => {/* Handle next lesson */}}
      onPrevious={() => {/* Handle previous lesson */}}
    />
  )
}

