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
export function rangesBySpecies(base: Catalog, edits: Edits, attributeId: string, { all = false } = {}): SpeciesRange[] {
  const catalog = applyEdits(base, edits)
  const attribute = catalog.byId.get(attributeId)
  const species = base.byId.get('species')
  if (!attribute || attribute.kind !== 'range' || !species) return []
  return listOptions(species, edits['species'])
    .filter((o) => all || o.enabled)
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

/** A range as one line: `사망 당시 9–80세`, `110–150cm`. */
export function describeSpan(range: SpeciesRange): string {
  return `${range.prefix ? `${range.prefix} ` : ''}${range.min.toLocaleString('ko-KR')}–${range.max.toLocaleString('ko-KR')}${range.unit}`
}

/**
 * Each species' 나이 and 키 as it would roll them, edits applied — the line
 * under it in the species list, and what its edit form starts from. Switched
 * off ones too: they can be edited while off.
 */
export function speciesSpans(base: Catalog, edits: Edits): Map<string, { age: SpeciesRange | null; height: SpeciesRange | null }> {
  const ages = new Map(rangesBySpecies(base, edits, 'age', { all: true }).map((r) => [r.speciesId, r]))
  const heights = new Map(rangesBySpecies(base, edits, 'height', { all: true }).map((r) => [r.speciesId, r]))
  const ids = new Set([...ages.keys(), ...heights.keys()])
  return new Map([...ids].map((id) => [id, { age: ages.get(id) ?? null, height: heights.get(id) ?? null }]))
}
