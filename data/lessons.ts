import { Lesson } from "@/types/lessons"

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Home Row',
    description: 'Master the foundation of touch typing with home row keys.',
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    drills: [
      { type: 'key', content: 'asdfjkl;' },
      { type: 'word', content: ['as', 'dad', 'fall', 'salad', 'flask', 'jack', 'lad'] },
      { type: 'paragraph', content: 'A sad lad asks dad for a salad. Jack has a flask full of soda.' }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Keys E and I',
    description: 'Learn to reach for the E and I keys efficiently.',
    keys: ['e', 'i'],
    drills: [
      { type: 'key', content: 'eiasdfjkl;' },
      { type: 'word', content: ['die', 'feel', 'like', 'side', 'idea', 'file', 'slide'] },
      { type: 'paragraph', content: 'I like the idea of a slide. Eddie feels the file is ideal.' }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Keys R and U',
    description: 'Practice reaching for the R and U keys.',
    keys: ['r', 'u'],
    drills: [
      { type: 'key', content: 'rueiasdfjkl;' },
      { type: 'word', content: ['rule', 'sure', 'user', 'rural', 'nurse', 'curse', 'fuse'] },
      { type: 'paragraph', content: 'The rural nurse is sure the user will refuse the cure.' }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Keys T and O',
    description: 'Add T and O to your typing repertoire.',
    keys: ['t', 'o'],
    drills: [
      { type: 'key', content: 'torueiasdfjkl;' },
      { type: 'word', content: ['to', 'out', 'too', 'tool', 'root', 'toot', 'loot'] },
      { type: 'paragraph', content: 'Otto took the tool out to the root of the old oak tree.' }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Capital Letters and Periods',
    description: 'Learn to use the Shift key for capitals and type periods.',
    keys: ['Shift', '.'],
    drills: [
      { type: 'key', content: 'A. S. D. F. J. K. L.' },
      { type: 'word', content: ['The', 'And', 'But', 'For', 'Not', 'Yet', 'So.'] },
      { type: 'paragraph', content: 'The dog ran. And the cat followed. But they were not friends yet.' }
    ]
  },
  {
    id: 'lesson-6',
    title: 'Keys C and Comma',
    description: 'Practice with the C key and comma.',
    keys: ['c', ','],
    drills: [
      { type: 'key', content: 'c,torueiasdfjkl;' },
      { type: 'word', content: ['car', 'cat', 'call', 'cool', 'code', 'come,', 'care,'] },
      { type: 'paragraph', content: 'The cool cat can come, call, and care for the car code.' }
    ]
  },
  {
    id: 'lesson-7',
    title: 'Keys G, H, and Apostrophe',
    description: 'Add G, H, and apostrophe to your skill set.',
    keys: ['g', 'h', "'"],
    drills: [
      { type: 'key', content: "gh'c,torueiasdfjkl;" },
      { type: 'word', content: ['high', 'sigh', "it's", "he's", 'ghost', 'light', 'right'] },
      { type: 'paragraph', content: "It's a high ghost that sighs. He's right to light the night." }
    ]
  },
  {
    id: 'lesson-8',
    title: 'Keys V, N, and Question Mark',
    description: 'Practice with V, N, and question mark.',
    keys: ['v', 'n', '?'],
    drills: [
      { type: 'key', content: 'vn?gh\'c,torueiasdfjkl;' },
      { type: 'word', content: ['van', 'never', 'vine', 'novel', 'haven', 'vain?', 'noun?'] },
      { type: 'paragraph', content: 'Have you never seen a van on a vine? Is that novel vain?' }
    ]
  },
  {
    id: 'lesson-9',
    title: 'Keys W and M',
    description: 'Add W and M to your typing skills.',
    keys: ['w', 'm'],
    drills: [
      { type: 'key', content: 'wmvn?gh\'c,torueiasdfjkl;' },
      { type: 'word', content: ['wow', 'mow', 'warm', 'swim', 'swam', 'wisdom', 'woman'] },
      { type: 'paragraph', content: 'Wow, the woman swam with wisdom. Men mow in the warm weather.' }
    ]
  },
  {
    id: 'lesson-10',
    title: 'Keys Q and P',
    description: 'Practice with Q and P keys.',
    keys: ['q', 'p'],
    drills: [
      { type: 'key', content: 'qpwmvn?gh\'c,torueiasdfjkl;' },
      { type: 'word', content: ['quick', 'quip', 'pique', 'plaque', 'opaque', 'equip', 'pique'] },
      { type: 'paragraph', content: 'The quick quip piqued interest. Can you equip the opaque plaque?' }
    ]
  },
  {
    id: 'lesson-11',
    title: 'Keys B and Y',
    description: 'Learn to type with B and Y keys.',
    keys: ['b', 'y'],
    drills: [
      { type: 'key', content: 'byqpwmvn?gh\'c,torueiasdfjkl;' },
      { type: 'word', content: ['by', 'bay', 'boy', 'yay', 'baby', 'yoyo', 'byway'] },
      { type: 'paragraph', content: 'The baby boy plays by the bay. Yay for the yoyo on the byway!' }
    ]
  },
  {
    id: 'lesson-12',
    title: 'Keys Z and X',
    description: 'Complete your keyboard mastery with Z and X.',
    keys: ['z', 'x'],
    drills: [
      { type: 'key', content: 'zxbyqpwmvn?gh\'c,torueiasdfjkl;' },
      { type: 'word', content: ['zap', 'zip', 'zoom', 'xray', 'box', 'fax', 'xylophone'] },
      { type: 'paragraph', content: 'Zap the box with an x-ray! Can you fax a xylophone or zoom with a zip?' }
    ]
  }
]

