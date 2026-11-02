import type { Edge, SavedEntry } from './root'

/**
 * @relayField SavedEntry.roll: Roll
 */
export function roll(entry: SavedEntry): Edge {
  return { id: entry.key }
}

/**
 * @relayField SavedEntry.savedAt: String!
 */
export function savedAt(entry: SavedEntry): string {
  return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(
    entry.savedAt,
  )
}

/**
 * The folder it is filed in — its id — or null when it is only under 전체.
 * @relayField SavedEntry.folder: String
 */
export function folder(entry: SavedEntry): string | null {
  return entry.folder ?? null
}
