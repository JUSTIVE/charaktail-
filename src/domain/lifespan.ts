/*
 * Expected lifespan — every species has one (catalog/species.ts), including
 * the player's own. 나이 is rolled within it and banded by its life stages.
 */

export interface Lifespan {
  min: number
  max: number
  /** What the span counts when it isn't a life: 유령은 머무는 기간. */
  note?: string
}

const years = (n: number) => n.toLocaleString('ko-KR')

export function describeLifespan({ min, max, note }: Lifespan): string {
  return `${note ?? '기대 수명'} ${years(min)}–${years(max)}년`
}

/** Human stages as fractions of a 90-year life; the last one runs to the end. */
const HUMAN_STAGES: readonly (readonly [number, string])[] = [
  [13 / 90, '어린이'],
  [19 / 90, '청소년'],
  [34 / 90, '청년'],
  [54 / 90, '중년'],
  [1, '노년'],
]

/**
 * 나이 for one species, from its lifespan: rolled from childhood to the edge
 * of its longest expected life, banded by `stages` (fractions of the lifespan)
 * or by the human ones stretched to fit.
 */
export function ageCase(speciesId: string, { min, max }: Lifespan, stages: readonly (readonly [number, string])[] = HUMAN_STAGES) {
  const span = (min + max) / 2
  const step = max >= 1000 ? 10 : 1
  const round = (n: number) => Math.max(step, Math.round(n / step) * step)
  const bands = stages.map(([f, label], i) => ({ upTo: i === stages.length - 1 ? Number.MAX_SAFE_INTEGER : Math.round(span * f), label }))
  return { when: { species: [speciesId] }, min: round(span * 0.13), max: round(max * 0.95), step, unit: '세', bands }
}
