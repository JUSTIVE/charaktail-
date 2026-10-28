import type { DataID } from 'relay-runtime'

import type { Attribute as AttributeRecord } from '../../domain/schema'
import { record } from '../attributeFields'

/*
 * ColorAttribute: one member of `union Attribute`. It carries only the fields its kind
 * has — implementations are shared in ../attributeFields.ts and re-exported
 * here under the field names the compiler imports. It also implements the
 * interfaces in ../schema/attribute.graphql for what kinds share.
 */

/**
 * Named colours, one or two swatches each — 눈 색상.
 * @relayType ColorAttribute implements AttributeBase & ValueListAttribute
 */
export function ColorAttribute(id: DataID): AttributeRecord | null {
  const attribute = record(id)
  return attribute?.kind === 'color' ? attribute : null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField ColorAttribute.key: String!
 */
export { key } from '../attributeFields'

/**
 * @relayField ColorAttribute.label: String!
 */
export { label } from '../attributeFields'

/**
 * The metaball's colour.
 * @relayField ColorAttribute.color: String!
 */
export { color } from '../attributeFields'

/**
 * @relayField ColorAttribute.description: String!
 */
export { description } from '../attributeFields'

/**
 * One line on what it can become, after the player's edits: "9가지 중 하나", "12–72세".
 * @relayField ColorAttribute.summary: String!
 * @live
 */
export { summary } from '../attributeFields'

/**
 * A handful of values to tease with.
 * @relayField ColorAttribute.preview: [String!]!
 */
export { preview } from '../attributeFields'

/**
 * Colours its values show, after edits.
 * @relayField ColorAttribute.swatches: [String!]!
 * @live
 */
export { swatches } from '../attributeFields'

/**
 * Whether the player has changed it from the catalogue.
 * @relayField ColorAttribute.edited: Boolean!
 * @live
 */
export { edited } from '../attributeFields'

/**
 * Going into the next roll.
 * @relayField ColorAttribute.selected: Boolean!
 * @live
 */
export { selected } from '../attributeFields'

/**
 * Kept as it is through re-rolls.
 * @relayField ColorAttribute.locked: Boolean!
 * @live
 */
export { locked } from '../attributeFields'

/**
 * Its values, as the player sees them in the editor.
 * @relayField ColorAttribute.options: [AttributeOption!]!
 * @live
 */
export { options } from '../attributeFields'
