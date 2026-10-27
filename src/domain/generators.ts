import { bell, weightedPick, weightedSample, type Rng } from './rng'
import type { AttributeKind, AttributeOf, Condition, RolledValue } from './schema'

/**
 * What a generator can see: the attributes already rolled this round, keyed by
 * id. Dependencies are rolled first (see roll.ts), so a condition on 세계관
 * always finds 세계관 here if it was selected at all.
 */
export interface RollContext {
  rng: Rng
  rolled: ReadonlyMap<string, RolledValue>
}

export function matches(when: Condition | undefined, rolled: ReadonlyMap<string, RolledValue>): boolean {
  if (!when) return true
  return Object.entries(when).every(([attributeId, allowed]) => {
    const value = rolled.get(attributeId)
    // Not rolled this time → no constraint.
    if (!value) return true
    return value.valueIds.some((id) => allowed.includes(id))
  })
}

/** Options allowed right now; the whole list if conditions would leave none. */
function eligible<T extends { when?: Condition | undefined }>(options: readonly T[], ctx: RollContext): readonly T[] {
  const open = options.filter((option) => matches(option.when, ctx.rolled))
  return open.length > 0 ? open : options
}

type Generator<K extends AttributeKind> = (attribute: AttributeOf<K>, ctx: RollContext) => RolledValue

/**
 * One generator per kind. The mapped type makes this exhaustive: add a kind to
 * the schema and this object stops compiling until it has a generator.
 */
export const generators: { [K in AttributeKind]: Generator<K> } = {
  pick(attribute, ctx) {
    const pool = eligible(attribute.options, ctx)
    const picked = weightedSample(ctx.rng, pool, attribute.count)
    return {
      attributeId: attribute.id,
      valueIds: picked.map((option) => option.id),
      label: picked.map((option) => option.label).join(' · '),
      detail: picked.length === 1 ? picked[0]!.hint : undefined,
      swatches: [],
    }
  },

  color(attribute, ctx) {
    const option = weightedPick(ctx.rng, eligible(attribute.options, ctx))
    return {
      attributeId: attribute.id,
      valueIds: [option.id],
      label: option.label,
      detail: option.hint,
      swatches: option.swatches,
    }
  },

  range(attribute, ctx) {
    const override = attribute.cases.find((c) => matches(c.when, ctx.rolled))
    const spec = { ...attribute, ...stripUndefined(override ?? {}) }
    const t = spec.distribution === 'normal' ? bell(ctx.rng) : ctx.rng()
    const steps = Math.floor((spec.max - spec.min) / spec.step)
    const value = spec.min + Math.min(Math.floor(t * (steps + 1)), steps) * spec.step
    const band = spec.bands?.find((b) => value <= b.upTo)
    const number = Number.isInteger(spec.step) ? String(value) : value.toFixed(1)
    return {
      attributeId: attribute.id,
      valueIds: band ? [band.label] : [],
      label: `${spec.prefix ? `${spec.prefix} ` : ''}${number}${spec.unit}`,
      detail: band?.label,
      swatches: [],
    }
  },
}

/**
 * What this attribute could have turned out to be, given what else was rolled:
 * the eligible values for a list, the active span for a range. Shown under a
 * result so the conditions in the catalogue are visible, not magic.
 */
export function possibilities(attribute: AttributeOf<AttributeKind>, rolled: ReadonlyMap<string, RolledValue>): string[] {
  const ctx = { rng: () => 0, rolled }
  if (attribute.kind !== 'range') return eligible<{ when?: Condition | undefined; label: string }>(attribute.options, ctx).map((o) => o.label)
  const override = attribute.cases.find((c) => matches(c.when, rolled))
  const spec = { ...attribute, ...stripUndefined(override ?? {}) }
  return [`${spec.prefix ? `${spec.prefix} ` : ''}${spec.min}–${spec.max}${spec.unit}`, ...(spec.bands ?? []).map((b) => b.label)]
}

function stripUndefined<T extends object>(input: T): Partial<T> {
  return Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined)) as Partial<T>
}
