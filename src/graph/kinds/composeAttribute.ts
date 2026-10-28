import type { DataID } from 'relay-runtime'

import type { Attribute as AttributeRecord } from '../../domain/schema'
import { record } from '../attributeFields'

/*
 * ComposeAttribute: one member of `union Attribute`. It carries only the fields its kind
 * has — implementations are shared in ../attributeFields.ts and re-exported
 * here under the field names the compiler imports. It also implements the
 * interfaces in ../schema/attribute.graphql for what kinds share.
 */

/**
 * A phrase built one part at a time — 이명.
 * @relayType ComposeAttribute implements AttributeBase & ValueListAttribute
 */
export function ComposeAttribute(id: DataID): AttributeRecord | null {
  const attribute = record(id)
  return attribute?.kind === 'compose' ? attribute : null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField ComposeAttribute.key: String!
 */
export { key } from '../attributeFields'

/**
 * @relayField ComposeAttribute.label: String!
 */
export { label } from '../attributeFields'

/**
 * The metaball's colour.
 * @relayField ComposeAttribute.color: String!
 */
export { color } from '../attributeFields'

/**
 * @relayField ComposeAttribute.description: String!
 */
export { description } from '../attributeFields'

/**
 * One line on what it can become, after the player's edits: "9가지 중 하나", "12–72세".
 * @relayField ComposeAttribute.summary: String!
 * @live
 */
export { summary } from '../attributeFields'

/**
 * A handful of values to tease with.
 * @relayField ComposeAttribute.preview: [String!]!
 */
export { preview } from '../attributeFields'

/**
 * Colours its values show, after edits.
 * @relayField ComposeAttribute.swatches: [String!]!
 * @live
 */
export { swatches } from '../attributeFields'

/**
 * Whether the player has changed it from the catalogue.
 * @relayField ComposeAttribute.edited: Boolean!
 * @live
 */
export { edited } from '../attributeFields'

/**
 * Going into the next roll.
 * @relayField ComposeAttribute.selected: Boolean!
 * @live
 */
export { selected } from '../attributeFields'

/**
 * Kept as it is through re-rolls.
 * @relayField ComposeAttribute.locked: Boolean!
 * @live
 */
export { locked } from '../attributeFields'

/**
 * Its values, as the player sees them in the editor.
 * @relayField ComposeAttribute.options: [AttributeOption!]!
 * @live
 */
export { options } from '../attributeFields'

/**
 * A name per part — 수식어, 이름.
 * @relayField ComposeAttribute.partLabels: [String!]!
 */
export { partLabels } from '../attributeFields'
