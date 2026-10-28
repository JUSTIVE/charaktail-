import type { DataID } from 'relay-runtime'

import type { Attribute as AttributeRecord } from '../../domain/schema'
import { record } from '../attributeFields'

/*
 * RangeAttribute: one member of `union Attribute`. It carries only the fields its kind
 * has — implementations are shared in ../attributeFields.ts and re-exported
 * here under the field names the compiler imports. It also implements the
 * interfaces in ../schema/attribute.graphql for what kinds share.
 */

/**
 * One number within bounds, which species may change — 키, 나이.
 * @relayType RangeAttribute implements AttributeBase & BoundedAttribute
 */
export function RangeAttribute(id: DataID): AttributeRecord | null {
  const attribute = record(id)
  return attribute?.kind === 'range' ? attribute : null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField RangeAttribute.key: String!
 */
export { key } from '../attributeFields'

/**
 * @relayField RangeAttribute.label: String!
 */
export { label } from '../attributeFields'

/**
 * The metaball's colour.
 * @relayField RangeAttribute.color: String!
 */
export { color } from '../attributeFields'

/**
 * @relayField RangeAttribute.description: String!
 */
export { description } from '../attributeFields'

/**
 * One line on what it can become, after the player's edits: "9가지 중 하나", "12–72세".
 * @relayField RangeAttribute.summary: String!
 * @live
 */
export { summary } from '../attributeFields'

/**
 * A handful of values to tease with.
 * @relayField RangeAttribute.preview: [String!]!
 */
export { preview } from '../attributeFields'

/**
 * Colours its values show, after edits.
 * @relayField RangeAttribute.swatches: [String!]!
 * @live
 */
export { swatches } from '../attributeFields'

/**
 * Whether the player has changed it from the catalogue.
 * @relayField RangeAttribute.edited: Boolean!
 * @live
 */
export { edited } from '../attributeFields'

/**
 * Going into the next roll.
 * @relayField RangeAttribute.selected: Boolean!
 * @live
 */
export { selected } from '../attributeFields'

/**
 * Kept as it is through re-rolls.
 * @relayField RangeAttribute.locked: Boolean!
 * @live
 */
export { locked } from '../attributeFields'

/**
 * The lower bound rolls draw from, after edits.
 * @relayField RangeAttribute.rangeMin: Float!
 * @live
 */
export { rangeMin } from '../attributeFields'

/**
 * The upper bound rolls draw from, after edits.
 * @relayField RangeAttribute.rangeMax: Float!
 * @live
 */
export { rangeMax } from '../attributeFields'

/**
 * @relayField RangeAttribute.unit: String!
 */
export { unit } from '../attributeFields'

/**
 * Whether species (or another attribute) change the span by default.
 * @relayField RangeAttribute.hasCases: Boolean!
 */
export { hasCases } from '../attributeFields'

/**
 * Whether the span changes with 종족 — 키, 나이.
 * @relayField RangeAttribute.dependsOnSpecies: Boolean!
 */
export { dependsOnSpecies } from '../attributeFields'

/**
 * The span as each enabled species would roll it, edits applied.
 * @relayField RangeAttribute.speciesRanges: [SpeciesRange!]!
 * @live
 */
export { speciesRanges } from '../attributeFields'
