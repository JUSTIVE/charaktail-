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
 * @relayType TraitsAttribute implements AttributeBase & ValueListAttribute
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

/**
 * Its values, as the player sees them in the editor.
 * @relayField TraitsAttribute.options: [AttributeOption!]!
 * @live
 */
export { options } from '../attributeFields'

/**
 * Whether it can come out several at once.
 * @relayField TraitsAttribute.multiple: Boolean!
 */
export { multiple } from '../attributeFields'

/**
 * The most that come out together, after edits; null while nothing caps it.
 * @relayField TraitsAttribute.count: Int
 * @live
 */
export { count } from '../attributeFields'

/**
 * How many of its values are switched on.
 * @relayField TraitsAttribute.enabledCount: Int!
 * @live
 */
export { enabledCount } from '../attributeFields'

/**
 * The value it is locked at, or null.
 * @relayField TraitsAttribute.lockedValue: String
 * @live
 */
export { lockedValue } from '../attributeFields'

/**
 * The value a lock was let go of on the picker, still there to lock again — null otherwise.
 * @relayField TraitsAttribute.releasedValue: String
 * @live
 */
export { releasedValue } from '../attributeFields'

/**
 * Everything a chip shows of it, in one live read (#192).
 * @relayField TraitsAttribute.head: RelayResolverValue
 * @live
 */
export { head } from '../attributeFields'
