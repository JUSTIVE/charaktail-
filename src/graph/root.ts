import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import { decodeRollKey } from '../domain/roll'
import { savedCell, type SavedCharacter } from '../state/saved'
import { selectionCell } from '../state/selection'

/*
 * An edge to a strong model type is `{ id }`, never a bare id — the generated
 * artifacts assert this, but they are @ts-nocheck, so tsc cannot. A bare id
 * resolves to a null item at runtime.
 */
export type Edge = { id: DataID }

/**
 * @relayField Query.attributes: [Attribute!]
 */
export function attributes(): Edge[] {
  return catalog.attributes.map((a) => ({ id: a.id }))
}

/**
 * @relayField Query.selectedAttributes: [Attribute!]
 * @live
 */
export function selectedAttributes() {
  return selectionCell.live((ids) => ids.map((id) => ({ id })))
}

/**
 * @relayField Query.roll(key: String!): Roll
 */
export function roll(args: { key: string }): Edge | null {
  return decodeRollKey(args.key) ? { id: args.key } : null
}

/**
 * @relayField Query.saved: [SavedEntry!]
 * @live
 */
export function saved() {
  return savedCell.live((list) => [...list])
}

/**
 * @relayType SavedEntry
 * @weak
 */
export type SavedEntry = SavedCharacter

export const SavedEntry = undefined as unknown as SavedEntry
