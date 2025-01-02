export interface Lesson {
  id: string
  title: string
  description: string
  keys: string[]
  drills: Drill[]
}

export interface Drill {
  type: 'key' | 'word' | 'paragraph'
  content: string | string[]
}

// Keep the existing interfaces if they're still needed elsewhere
export interface WordDrill {
  words: string[]
  difficulty: number // 2-4 letters
  repetitions: number
}

export interface ParagraphDrill {
  text: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
}

