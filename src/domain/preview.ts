import type { Catalog } from './catalog'
import { applyEdits, listOptions, type Edits } from './edits'

/** A range attribute as one species would roll it. */
export interface SpeciesRange {
  speciesId: string
  speciesLabel: string
  /** The species' own line — its lifespan. */
  speciesHint: string | null
  min: number
  max: number
  unit: string
  prefix: string | null
  /** Named stretches, in order, e.g. 드워프치고 작은 · 드워프치고 큰. */
  bands: string[]
}

/**
 * How a range attribute (키, 나이) reads for each enabled species, with the
 * player's edits applied. Only cases that hang on species alone count — a
 * case that also needs a world (학원물 인간은 15–19세) is a world's
 * business, not the species'.
 */
export function rangesBySpecies(base: Catalog, edits: Edits, attributeId: string): SpeciesRange[] {
  const catalog = applyEdits(base, edits)
  const attribute = catalog.byId.get(attributeId)
  const species = base.byId.get('species')
  if (!attribute || attribute.kind !== 'range' || !species) return []
  return listOptions(species, edits['species'])
    .filter((o) => o.enabled)
    .map((option) => {
      const match = attribute.cases.find(
        (c) => Object.keys(c.when).every((k) => k === 'species') && (c.when['species'] ?? []).includes(option.id),
      )
      const pick = <T,>(own: T | undefined, fallback: T) => (own === undefined ? fallback : own)
      const bands = pick(match?.bands, attribute.bands) ?? []
      return {
        speciesId: option.id,
        speciesLabel: option.label,
        speciesHint: option.hint,
        min: pick(match?.min, attribute.min),
        max: pick(match?.max, attribute.max),
        unit: pick(match?.unit, attribute.unit),
        prefix: pick(match?.prefix, attribute.prefix) ?? null,
        bands: bands.map((b) => b.label),
      }
    })
}

/** Does this range attribute change with species at all? */
export function dependsOnSpecies(base: Catalog, attributeId: string): boolean {
  const attribute = base.byId.get(attributeId)
  return attribute?.kind === 'range' && attribute.cases.some((c) => 'species' in c.when)
}
