import type { DataID } from 'relay-runtime'

import { nameCell } from '../state/name'
import { selectionCell } from '../state/selection'

/*
 * The character being set up on the first screen: the typed name and the
 * attribute selection, as one node. Every field is live over its cell, so a
 * keystroke or a chip toggle re-renders exactly the fields that read it.
 */

export interface DraftModel {
  id: DataID
}

/**
 * @relayType Draft
 */
export function Draft(id: DataID): DraftModel | null {
  return id === 'draft' ? { id } : null
}

/**
 * @relayField Draft.name: String
 * @live
 */
export function name(_draft: DraftModel) {
  return nameCell.live()
}

/**
 * @relayField Draft.selectionCount: Int
 * @live
 */
export function selectionCount(_draft: DraftModel) {
  return selectionCell.live((ids) => ids.length)
}

/**
 * Ready to shake: a name and at least one attribute.
 * @relayField Draft.canShake: Boolean
 * @live
 */
export function canShake(_draft: DraftModel) {
  return {
    read: () => nameCell.read().trim() !== '' && selectionCell.read().length > 0,
    subscribe: (cb: () => void) => {
      const a = nameCell.subscribe(cb)
      const b = selectionCell.subscribe(cb)
      return () => {
        a()
        b()
      }
    },
  }
}
