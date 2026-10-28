import type { DataID } from 'relay-runtime'

import type { Attribute as AttributeRecord } from '../../domain/schema'
import { record } from '../attributeFields'

/*
 * TraitsAttribute: one member of `union Attribute`. It carries only the fields its kind
 * has — implementations are shared in ../attributeFields.ts and re-exported
 * here under the field names the compiler imports. It also implements the
 * interfaces in ../schema/attribute.graphql for what kinds share.
 */

/**
 * Features each rolled on their own odds — 외형 특징.
 * @relayType TraitsAttribute implements AttributeBase
 */
export function TraitsAttribute(id: DataID): AttributeRecord | null {
  const attribute = record(id)
  return attribute?.kind === 'traits' ? attribute : null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField TraitsAttribute.key: String!
 */
export { key } from '../attributeFields'

/**
 * @relayField TraitsAttribute.label: String!
 */
export { label } from '../attributeFields'

/**
 * The metaball's colour.
 * @relayField TraitsAttribute.color: String!
 */
export { color } from '../attributeFields'

/**
 * @relayField TraitsAttribute.description: String!
 */
export { description } from '../attributeFields'

/**
 * One line on what it can become, after the player's edits: "9가지 중 하나", "12–72세".
 * @relayField TraitsAttribute.summary: String!
 * @live
 */
export { summary } from '../attributeFields'

/**
 * A handful of values to tease with.
 * @relayField TraitsAttribute.preview: [String!]!
 */
export { preview } from '../attributeFields'

/**
 * Colours its values show, after edits.
 * @relayField TraitsAttribute.swatches: [String!]!
 * @live
 */
export { swatches } from '../attributeFields'

/**
 * Whether the player has changed it from the catalogue.
 * @relayField TraitsAttribute.edited: Boolean!
 * @live
 */
export { edited } from '../attributeFields'

/**
 * Going into the next roll.
 * @relayField TraitsAttribute.selected: Boolean!
 * @live
 */
export { selected } from '../attributeFields'

/**
 * Kept as it is through re-rolls.
 * @relayField TraitsAttribute.locked: Boolean!
 * @live
 */
export { locked } from '../attributeFields'
