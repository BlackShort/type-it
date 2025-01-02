import React from 'react'
import { LessonView } from "@/components/LessonView"
import { lessons } from "@/data/lessons"
import { notFound } from 'next/navigation'

interface LessonPageProps {
  params: {
    lessonId: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = lessons.find(l => l.id === params.lessonId)

  if (!lesson) {
    notFound()
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

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    lessonId: lesson.id,
  }))
}

