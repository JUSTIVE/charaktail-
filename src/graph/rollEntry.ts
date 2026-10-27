
import type { ExplainedValue } from '../domain/roll'
import type { Edge } from './root'

/**
 * @relayType RollEntry
 * @weak
 */
export type RollEntry = ExplainedValue

/**
 * Weak model types are imported as values by the generated artifacts, so the
 * name needs a runtime slot as well as a type slot — it is never read.
 */
export const RollEntry = undefined as unknown as RollEntry

/**
 * @relayField RollEntry.attribute: Attribute
 */
export function attribute(entry: RollEntry): Edge {
  return { id: entry.attributeId }
}

/**
 * @relayField RollEntry.value: String
 */
export function value(entry: RollEntry): string {
  return entry.label
}

/**
 * @relayField RollEntry.detail: String
 */
export function detail(entry: RollEntry): string | null {
  return entry.detail ?? null
}

/**
 * @relayField RollEntry.swatches: [String!]
 */
export function swatches(entry: RollEntry): string[] {
  return entry.swatches
}

/**
 * What this attribute could have been, given the rest of the roll.
 * @relayField RollEntry.possible: [String!]
 */
export function possible(entry: RollEntry): string[] {
  return entry.possible
}
