import type { DataID } from 'relay-runtime'

import type { Attribute as AttributeRecord } from '../../domain/schema'
import { record } from '../attributeFields'

/*
 * DateAttribute: one member of `union Attribute`. It carries only the fields its kind
 * has — implementations are shared in ../attributeFields.ts and re-exported
 * here under the field names the compiler imports.
 */

/**
 * A day of the year — 생일.
 * @relayType DateAttribute
 */
export function DateAttribute(id: DataID): AttributeRecord | null {
  const attribute = record(id)
  return attribute?.kind === 'date' ? attribute : null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField DateAttribute.key: String!
 */
export { key } from '../attributeFields'

/**
 * @relayField DateAttribute.label: String!
 */
export { label } from '../attributeFields'

/**
 * The metaball's colour.
 * @relayField DateAttribute.color: String!
 */
export { color } from '../attributeFields'

/**
 * @relayField DateAttribute.description: String!
 */
export { description } from '../attributeFields'

/**
 * One line on what it can become, after the player's edits: "9가지 중 하나", "12–72세".
 * @relayField DateAttribute.summary: String!
 * @live
 */
export { summary } from '../attributeFields'

/**
 * A handful of values to tease with.
 * @relayField DateAttribute.preview: [String!]!
 */
export { preview } from '../attributeFields'

/**
 * Colours its values show, after edits.
 * @relayField DateAttribute.swatches: [String!]!
 * @live
 */
export { swatches } from '../attributeFields'

/**
 * Whether the player has changed it from the catalogue.
 * @relayField DateAttribute.edited: Boolean!
 * @live
 */
export { edited } from '../attributeFields'

/**
 * Going into the next roll.
 * @relayField DateAttribute.selected: Boolean!
 * @live
 */
export { selected } from '../attributeFields'

/**
 * Kept as it is through re-rolls.
 * @relayField DateAttribute.locked: Boolean!
 * @live
 */
export { locked } from '../attributeFields'
