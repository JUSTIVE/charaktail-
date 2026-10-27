import type { Edge, SavedEntry } from './root'

/**
 * @relayField SavedEntry.roll: Roll
 */
export function roll(entry: SavedEntry): Edge {
  return { id: entry.key }
}

/**
 * @relayField SavedEntry.savedAt: String
 */
export function savedAt(entry: SavedEntry): string {
  return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(
    entry.savedAt,
  )
}
