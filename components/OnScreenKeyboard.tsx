import React from 'react'
import { KEYBOARD_LAYOUT, SPECIAL_KEYS, MAC_KEYBOARD_LAYOUT, MAC_SPECIAL_KEYS } from "@/lib/keyboard-layout"

interface OnScreenKeyboardProps {
  currentKey?: string
  isMac: boolean
}

export function OnScreenKeyboard({ currentKey = '', isMac }: OnScreenKeyboardProps) {
  const layout = isMac ? MAC_KEYBOARD_LAYOUT : KEYBOARD_LAYOUT
  const specialKeys = isMac ? MAC_SPECIAL_KEYS : SPECIAL_KEYS

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map(key => {
            const displayKey = specialKeys[key] || key.toUpperCase()
            const isHighlighted = currentKey && key.toLowerCase() === currentKey.toLowerCase()
            const keyClass = `m-1 flex items-center justify-center rounded ${
              isHighlighted ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary' : 'bg-white dark:bg-gray-700 dark:text-white'
            }`
            let keyStyle: React.CSSProperties = { minWidth: '40px', height: '40px' }
            
            if (key === 'Space') {
              keyStyle.width = '200px'
            } else if (['ShiftLeft', 'ShiftRight', 'Enter', 'Backspace'].includes(key)) {
              keyStyle.width = '80px'
            } else if (['CapsLock', 'Tab'].includes(key)) {
              keyStyle.width = '60px'
            }
            
            return (
              <div
                key={key}
                className={keyClass}
                style={keyStyle}
              >
                {displayKey}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

