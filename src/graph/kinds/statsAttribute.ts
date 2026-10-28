import type { DataID } from 'relay-runtime'

import type { Attribute as AttributeRecord } from '../../domain/schema'
import { record } from '../attributeFields'

/*
 * StatsAttribute: one member of `union Attribute`. It carries only the fields its kind
 * has — implementations are shared in ../attributeFields.ts and re-exported
 * here under the field names the compiler imports. It also implements the
 * interfaces in ../schema/attribute.graphql for what kinds share.
 */

/**
 * Several numbers rolled at once, within bounds — 능력치.
 * @relayType StatsAttribute implements AttributeBase & ValueListAttribute & BoundedAttribute
 */
export function StatsAttribute(id: DataID): AttributeRecord | null {
  const attribute = record(id)
  return attribute?.kind === 'stats' ? attribute : null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField StatsAttribute.key: String!
 */
export { key } from '../attributeFields'

/**
 * @relayField StatsAttribute.label: String!
 */
export { label } from '../attributeFields'

/**
 * The metaball's colour.
 * @relayField StatsAttribute.color: String!
 */
export { color } from '../attributeFields'

/**
 * @relayField StatsAttribute.description: String!
 */
export { description } from '../attributeFields'

/**
 * One line on what it can become, after the player's edits: "9가지 중 하나", "12–72세".
 * @relayField StatsAttribute.summary: String!
 * @live
 */
export { summary } from '../attributeFields'

/**
 * A handful of values to tease with.
 * @relayField StatsAttribute.preview: [String!]!
 */
export { preview } from '../attributeFields'

/**
 * Colours its values show, after edits.
 * @relayField StatsAttribute.swatches: [String!]!
 * @live
 */
export { swatches } from '../attributeFields'

/**
 * Whether the player has changed it from the catalogue.
 * @relayField StatsAttribute.edited: Boolean!
 * @live
 */
export { edited } from '../attributeFields'

/**
 * Going into the next roll.
 * @relayField StatsAttribute.selected: Boolean!
 * @live
 */
export { selected } from '../attributeFields'

/**
 * Kept as it is through re-rolls.
 * @relayField StatsAttribute.locked: Boolean!
 * @live
 */
export { locked } from '../attributeFields'

/**
 * Its values, as the player sees them in the editor.
 * @relayField StatsAttribute.options: [AttributeOption!]!
 * @live
 */
export { options } from '../attributeFields'

/**
 * The lower bound rolls draw from, after edits.
 * @relayField StatsAttribute.rangeMin: Float!
 * @live
 */
export { rangeMin } from '../attributeFields'

/**
 * The upper bound rolls draw from, after edits.
 * @relayField StatsAttribute.rangeMax: Float!
 * @live
 */
export { rangeMax } from '../attributeFields'
