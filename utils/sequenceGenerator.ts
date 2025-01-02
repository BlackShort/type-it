export function generateSequence(keys: string[], length: number): string {
  let sequence = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    sequence += keys[randomIndex];
  }
  return sequence;
}

