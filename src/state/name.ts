import { Cell } from './cell'
import { Name, NAME_MAX, revive } from './schema'

export { NAME_MAX }

/** The character's name, typed before shaking. Kept between visits as a draft. */
export const nameCell = new Cell<string>('', 'charaktail:name', revive(Name))

export function setName(value: string): void {
  nameCell.set(value.slice(0, NAME_MAX))
}

/** What goes into a roll: trimmed, or nothing. */
export function currentName(): string | undefined {
  return nameCell.read().trim() || undefined
}
