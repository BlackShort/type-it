import React from 'react'
import { Button } from "@/components/ui/button"

interface TypingSequenceButtonsProps {
  sequence: string[]
  currentIndex: number
  typedKeys: string[]
  // lastKeyCorrect: boolean
}

// export function TypingSequenceButtons({ sequence, currentIndex, typedKeys, lastKeyCorrect }: TypingSequenceButtonsProps) {
//   const rows = [sequence.slice(0, 5), sequence.slice(5, 10), sequence.slice(10, 15), sequence.slice(15, 20)]

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {rows.map((row, rowIndex) => (
//         <div key={rowIndex} className="flex justify-between">
//           {row.map((char, index) => {
//             const globalIndex = rowIndex * 5 + index
//             let buttonClass = "flex-1 h-12 text-lg font-bold mx-1"
//             if (globalIndex === currentIndex) {
//               buttonClass += lastKeyCorrect ? " bg-primary text-primary-foreground" : " bg-destructive text-destructive-foreground"
//             } else if (globalIndex < currentIndex) {
//               buttonClass += typedKeys[globalIndex] === char ? " bg-secondary text-secondary-foreground" : " bg-destructive text-destructive-foreground"
//             }
//             return (
//               <Button key={index} className={buttonClass} disabled>
//                 {char === ' ' ? 'Space' : char}
//               </Button>
//             )
//           })}
//         </div>
//       ))}
//     </div>
//   )
// }


export function TypingSequenceButtons({ sequence, currentIndex, typedKeys }: TypingSequenceButtonsProps) {
  const rows = [sequence.slice(0, 4), sequence.slice(4, 8)]

  return (
    <div className="grid grid-cols-2 gap-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between">
          {row.map((char, index) => {
            const globalIndex = rowIndex * 4 + index
            let buttonClass = "flex-1 h-12 text-lg font-bold mx-1"
            if (globalIndex === currentIndex) {
              buttonClass += " bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
            } else if (globalIndex < currentIndex) {
              buttonClass += typedKeys[globalIndex] === char ? " bg-secondary text-secondary-foreground" : " bg-destructive text-destructive-foreground"
            } else {
              buttonClass += " bg-muted text-muted-foreground"
            }
            return (
              <Button key={index} className={buttonClass} disabled>
                {char === ' ' ? 'Space' : char}
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

