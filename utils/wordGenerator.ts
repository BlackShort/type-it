const commonWords = {
  easy: ["an", "at", "be", "by", "do", "go", "he", "if", "in", "is", "it", "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we"],
  medium: ["and", "but", "can", "did", "end", "for", "get", "had", "has", "her", "him", "his", "how", "new", "not", "now", "our", "out", "see", "the", "two", "was", "who"],
  hard: ["that", "with", "have", "this", "will", "your", "from", "they", "know", "want", "been", "good", "much", "some", "time", "very", "when", "which", "work", "would", "year", "about", "after"]
};

export function generateWords(count: number, difficulty: 'easy' | 'medium' | 'hard'): string[] {
  const words: string[] = [];
  const wordSet = commonWords[difficulty];
  for (let i = 0; i < count; i++) {
    words.push(wordSet[Math.floor(Math.random() * wordSet.length)]);
  }
  return words;
}

export function generateCustomWord(length: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return Array(length).fill(null).map(() => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

export function generateCustomWords(count: number, difficulty: 'easy' | 'medium' | 'hard'): string[] {
  const words: string[] = [];
  const length = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  for (let i = 0; i < count; i++) {
    words.push(generateCustomWord(length));
  }
  return words;
}

