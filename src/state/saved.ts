import { Cell } from './cell'

/** A kept character is just its roll key — the catalogue re-derives the rest. */
export interface SavedCharacter {
  key: string
  savedAt: number
}

export const savedCell = new Cell<readonly SavedCharacter[]>([], 'charaktail:saved', (stored) =>
  Array.isArray(stored)
    ? stored.filter((s): s is SavedCharacter => typeof s?.key === 'string' && typeof s?.savedAt === 'number')
    : null,
)

export function toggleSaved(key: string): void {
  savedCell.set((list) =>
    list.some((s) => s.key === key) ? list.filter((s) => s.key !== key) : [{ key, savedAt: Date.now() }, ...list],
  )
}
