export const KEYBOARD_LAYOUT = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ShiftRight'],
  ['CtrlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'Menu', 'CtrlRight']
]

export const SPECIAL_KEYS: { [key: string]: string } = {
  'Backspace': '⌫',
  'Tab': '⇥',
  'CapsLock': '⇪',
  'Enter': '↵',
  'ShiftLeft': '⇧',
  'ShiftRight': '⇧',
  'CtrlLeft': 'Ctrl',
  'CtrlRight': 'Ctrl',
  'Win': '⊞',
  'AltLeft': 'Alt',
  'AltRight': 'Alt',
  'Space': ' ',
  'Menu': '☰'
}

export const MAC_KEYBOARD_LAYOUT = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ShiftRight'],
  ['CtrlLeft', 'Option', 'CmdLeft', 'Space', 'CmdRight', 'Option', 'CtrlRight']
]

export const MAC_SPECIAL_KEYS: { [key: string]: string } = {
  ...SPECIAL_KEYS,
  'Option': '⌥',
  'CmdLeft': '⌘',
  'CmdRight': '⌘'
}

