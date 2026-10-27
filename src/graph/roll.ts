import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import { decodeRollKey, explainRoll, rollCharacter, type ExplainedValue, type RollRequest } from '../domain/roll'
import { savedCell } from '../state/saved'

/*
 * A roll's record id is its roll key, so the same URL is the same record and
 * Relay caches it like any other node. Nothing is stored: the entries are
 * re-derived from (seed, attributes, nonces) by the pure domain function.
 */

export interface RollRecord extends RollRequest {
  key: string
}

/**
 * @relayType Roll
 */
export function Roll(id: DataID): RollRecord | null {
  const request = decodeRollKey(id)
  return request ? { ...request, key: id } : null
}

/**
 * @relayField Roll.key: String
 */
export function key(roll: RollRecord): string {
  return roll.key
}

/**
 * @relayField Roll.name: String
 */
export function name(roll: RollRecord): string | null {
  return roll.name ?? null
}

/**
 * @relayField Roll.seed: String
 */
export function seed(roll: RollRecord): string {
  return roll.seed
}

/**
 * @relayField Roll.entries: [RollEntry!]
 */
export function entries(roll: RollRecord): ExplainedValue[] {
  return explainRoll(catalog, roll)
}

/**
 * The first values, as a one-line teaser for lists.
 * @relayField Roll.headline: String
 */
export function headline(roll: RollRecord): string {
  return rollCharacter(catalog, roll)
    .slice(0, 3)
    .map((v) => v.label)
    .join(' · ')
}

/**
 * @relayField Roll.saved: Boolean
 * @live
 */
export function saved(roll: RollRecord) {
  return savedCell.live((list) => list.some((s) => s.key === roll.key))
}
