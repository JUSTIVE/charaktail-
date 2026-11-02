import type { SavedFolder } from './root'
import { savedCell } from '../state/saved'

/**
 * @relayField SavedFolder.key: String!
 */
export function key(folder: SavedFolder): string {
  return folder.id
}

/**
 * @relayField SavedFolder.name: String!
 */
export function name(folder: SavedFolder): string {
  return folder.name
}

/**
 * How many saved characters are filed in it.
 * @relayField SavedFolder.count: Int!
 * @live
 */
export function count(folder: SavedFolder) {
  return savedCell.live((list) => list.filter((s) => s.folder === folder.id).length)
}
