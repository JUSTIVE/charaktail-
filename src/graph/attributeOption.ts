import type { ListedOption } from '../domain/edits'

/**
 * One value in an attribute's editor.
 * @relayType AttributeOption
 * @weak
 */
export type AttributeOption = ListedOption

/** Weak model types need a runtime slot too; it is never read. */
export const AttributeOption = undefined as unknown as AttributeOption

/**
 * @relayField AttributeOption.key: String
 */
export function key(option: AttributeOption): string {
  return option.id
}

/**
 * @relayField AttributeOption.label: String
 */
export function label(option: AttributeOption): string {
  return option.label
}

/**
 * A line under the value, e.g. a species' lifespan.
 * @relayField AttributeOption.hint: String
 */
export function hint(option: AttributeOption): string | null {
  return option.hint
}

/**
 * Compose kinds: which part the value belongs to.
 * @relayField AttributeOption.part: Int
 */
export function part(option: AttributeOption): number {
  return option.part
}

/**
 * Grouped kinds: the group values it is listed under; empty means all.
 * @relayField AttributeOption.groups: [String!]
 */
export function groups(option: AttributeOption): string[] {
  return option.groups
}

/**
 * @relayField AttributeOption.enabled: Boolean
 */
export function enabled(option: AttributeOption): boolean {
  return option.enabled
}

/**
 * Added by the player rather than shipped in the catalogue.
 * @relayField AttributeOption.custom: Boolean
 */
export function custom(option: AttributeOption): boolean {
  return option.custom
}

/**
 * @relayField AttributeOption.swatches: [String!]
 */
export function swatches(option: AttributeOption): string[] {
  return option.swatches
}
