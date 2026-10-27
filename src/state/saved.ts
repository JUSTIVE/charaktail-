import { Cell } from './cell'
import { revive, SavedList, type SavedCharacter } from './schema'

export type { SavedCharacter }

export const savedCell = new Cell<readonly SavedCharacter[]>([], 'charaktail:saved', revive(SavedList))

export function toggleSaved(key: string): void {
  savedCell.set((list) =>
    list.some((s) => s.key === key) ? list.filter((s) => s.key !== key) : [{ key, savedAt: Date.now() }, ...list],
  )
}
