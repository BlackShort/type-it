import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Keyboard, ChevronRight, Trophy, Clock, BarChart2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { lessons } from "@/data/lessons"

export function TypingCourseOverview() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 lg:p-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center">Type It! Course Overview</h1>
        
        {/* Course progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Progress</span>
              <Badge variant="secondary">33% Complete</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={33} className="w-full h-2" />
            <p className="mt-2 text-sm text-muted-foreground">Keep up the great work! You&apos;re making steady progress.</p>
          </CardContent>
        </Card>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-4">
              <Trophy className="h-8 w-8 text-yellow-500 mr-4" />
              <div>
                <p className="text-sm font-medium">Lessons Completed</p>
                <p className="text-2xl font-bold">4 / 12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Clock className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-sm font-medium">Time Practiced</p>
                <p className="text-2xl font-bold">2h 15m</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <BarChart2 className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-sm font-medium">Avg. WPM</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons */}
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {lessons.map((lesson, index) => (
            <Card 
              key={lesson.id}
              className={cn(
                "cursor-default hover:shadow-md transition-shadow duration-200",
                "border-2 hover:border-primary flex flex-col h-full"
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Keyboard className="mr-2 h-5 w-5 text-primary" />
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="text-sm text-muted-foreground mb-2">
                  {lesson.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {lesson.keys.map((key, keyIndex) => (
                    <Badge key={keyIndex} variant="secondary">{key}</Badge>
                  ))}
                </div>
                <div className="flex-grow" />
                <div className="flex justify-between items-center mt-4">
                  <Badge variant={index < 4 ? "default" : "secondary"}>
                    {index < 4 ? "Completed" : "Not Started"}
                  </Badge>
                  <Link href={`/lessons/${lesson.id}`} passHref>
                    <Button variant="link" className="p-0">
                      Start Lesson <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

