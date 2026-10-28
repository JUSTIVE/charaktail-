import type { SpeciesRange as SpeciesRangeRecord } from '../domain/preview'

/**
 * A range attribute as one species would roll it.
 * @relayType SpeciesRange
 * @weak
 */
export type SpeciesRange = SpeciesRangeRecord

/** Weak model types need a runtime slot too; it is never read. */
export const SpeciesRange = undefined as unknown as SpeciesRange

/**
 * @relayField SpeciesRange.speciesKey: String!
 */
export function speciesKey(range: SpeciesRange): string {
  return range.speciesId
}

/**
 * @relayField SpeciesRange.speciesLabel: String!
 */
export function speciesLabel(range: SpeciesRange): string {
  return range.speciesLabel
}

/**
 * The species' own line — its lifespan.
 * @relayField SpeciesRange.speciesHint: String
 */
export function speciesHint(range: SpeciesRange): string | null {
  return range.speciesHint
}

/**
 * The span as it reads: `110–150cm`, `제조 후 1–40년`.
 * @relayField SpeciesRange.span: String!
 */
export function span(range: SpeciesRange): string {
  return `${range.prefix ? `${range.prefix} ` : ''}${range.min.toLocaleString('ko-KR')}–${range.max.toLocaleString('ko-KR')}${range.unit}`
}

/**
 * @relayField SpeciesRange.bands: [String!]!
 */
export function bands(range: SpeciesRange): string[] {
  return range.bands
}
