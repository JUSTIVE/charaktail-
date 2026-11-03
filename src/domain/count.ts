import type { Catalog } from './catalog'
import { applyEdits, type Edits } from './edits'
import type { Attribute, Condition, RolledValue } from './schema'

/*
 * How many different characters a roll could come out as — the m in
 * "흔들어서 m개의 캐릭터 중 하나 뽑기". Values are counted as listed, after the
 * player's edits; conditions between values (세계관별 직업) are not narrowed,
 * so this is the size of the space, not an exact census. The one dependence
 * that is counted is 종족's spans: 나이 and 키 are counted per species.
 */

function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0
  let out = 1
  for (let i = 1; i <= k; i++) out = (out * (n - k + i)) / i
  return Math.round(out)
}

type Range = Extract<Attribute, { kind: 'range' }>

/** A range's span for one species (or none), the way the roll picks it. */
function spanSize(attribute: Range, speciesId: string | null): number {
  const rolled = new Map<string, RolledValue>(speciesId ? [['species', { attributeId: 'species', valueIds: [speciesId], label: '', swatches: [] }]] : [])
  const holds = (when: Condition) => Object.entries(when).every(([id, allowed]) => rolled.get(id)?.valueIds.some((v) => allowed.includes(v)) ?? false)
  const override = attribute.cases.find((c) => holds(c.when))
  const min = override?.min ?? attribute.min
  const max = override?.max ?? attribute.max
  const step = override?.step ?? attribute.step
  return Math.max(1, Math.floor((max - min) / step + 1e-9) + 1)
}

/** How many ways one attribute can come out, on its own. */
function ways(attribute: Attribute): number {
  switch (attribute.kind) {
    case 'pick':
      return choose(attribute.options.length, Math.min(attribute.count, attribute.options.length))
    case 'color':
      return attribute.options.length
    case 'compose':
      return attribute.parts.reduce((n, part) => n * part.length, 1)
    case 'traits': {
      const cap = Math.min(attribute.max ?? attribute.options.length, attribute.options.length)
      let n = 0
      for (let k = 0; k <= cap; k++) n += choose(attribute.options.length, k)
      return n
    }
    case 'stats':
      return (attribute.max - attribute.min + 1) ** attribute.stats.length
    case 'date':
      return 365
    case 'range':
      return spanSize(attribute, null)
  }
}

/** Locked attributes come out as they are: one way each — a locked 종족 counts only its own 나이·키 (#154). */
export function countCharacters(
  base: Catalog,
  edits: Edits | undefined,
  attributeIds: readonly string[],
  locked: Readonly<Record<string, RolledValue>> = {},
): number {
  if (attributeIds.length === 0) return 0
  const catalog = applyEdits(base, edits)
  const chosen = attributeIds.flatMap((id) => catalog.byId.get(id) ?? [])
  const species = chosen.find((a) => a.id === 'species')
  // Ranges that change with species are counted inside it, species by species.
  const perSpecies = species ? chosen.filter((a): a is Range => a.kind === 'range' && a.cases.some((c) => 'species' in c.when)) : []
  let total = 1
  for (const attribute of chosen) {
    if (attribute === species || perSpecies.includes(attribute as Range)) continue
    total *= locked[attribute.id] ? 1 : ways(attribute)
  }
  if (species && species.kind === 'pick') {
    const kept = locked['species']?.valueIds[0]
    const options = kept ? species.options.filter((o) => o.id === kept) : species.options
    total *= Math.max(1, options.reduce((sum, option) => sum + perSpecies.reduce((n, range) => n * (locked[range.id] ? 1 : spanSize(range, option.id)), 1), 0))
  }
  return total
}
