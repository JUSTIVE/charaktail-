import { Cell } from './cell'

export const NAME_MAX = 20

/** The character's name, typed before shaking. Kept between visits as a draft. */
export const nameCell = new Cell<string>('', 'charaktail:name', (stored) => (typeof stored === 'string' ? stored : null))

export function setName(value: string): void {
  nameCell.set(value.slice(0, NAME_MAX))
}

/** What goes into a roll: trimmed, or nothing. */
export function currentName(): string | undefined {
  return nameCell.read().trim() || undefined
}
