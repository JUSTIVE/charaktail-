import type { DataID } from 'relay-runtime'

import { attributeRef } from './refs'
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
 * @relayField Query.attributes: [Attribute!]!
 */
export function attributes() {
  return catalog.attributes.flatMap((a) => attributeRef(a.id) ?? [])
}

/**
 * The character being set up — name and selection.
 * @relayField Query.draft: Draft!
 */
export function draft(): Edge {
  return { id: 'draft' }
}

/**
 * The installed app: waiting update, offline readiness.
 * @relayField Query.app: App!
 */
export function app(): Edge {
  return { id: 'app' }
}

/**
 * The stage's mode and motion permission.
 * @relayField Query.stage: StageStatus!
 */
export function stage(): Edge {
  return { id: 'stage' }
}

/**
 * @relayField Query.attribute(id: ID!): Attribute
 */
export function attribute(args: { id: string }) {
  return attributeRef(args.id)
}

/**
 * @relayField Query.selectedAttributes: [Attribute!]!
 * @live
 */
export function selectedAttributes() {
  return selectionCell.live((ids) => ids.flatMap((id) => attributeRef(id) ?? []))
}

/**
 * @relayField Query.roll(key: String!): Roll
 */
export function roll(args: { key: string }): Edge | null {
  return decodeRollKey(args.key) ? { id: args.key } : null
}

/**
 * @relayField Query.saved: [SavedEntry!]!
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
