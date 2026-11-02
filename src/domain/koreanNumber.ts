/*
 * Big numbers the way they are read in Korean: in groups of four digits,
 * each with its unit — 2억 5,891만, not 2.6억 — up to 해. From 1자 on the
 * units stop meaning anything to a reader: that is "셀 수 없이 많은".
 */
const UNITS = ['', '만', '억', '조', '경', '해'] as const

export interface KoreanPart {
  value: number
  unit: string
}

/**
 * The two largest four-digit groups that aren't zero: 258,910,680 → 2억
 * 5,891만; 4 → 4. From 1자 (10²⁴) on: null, beyond counting.
 */
export function koreanParts(n: number): KoreanPart[] | null {
  if (!Number.isFinite(n) || n < 0) return null
  if (n < 1e4) return [{ value: Math.round(n), unit: '' }]
  const top = Math.min(Math.floor(Math.log10(n) / 4), UNITS.length)
  if (top >= UNITS.length) return null
  const lead = Math.floor(n / 10 ** (4 * top))
  const next = Math.floor((n - lead * 10 ** (4 * top)) / 10 ** (4 * (top - 1)))
  // A float this large is only exact to ~16 digits: the second group is as good as it gets.
  return [{ value: lead, unit: UNITS[top]! }, ...(next > 0 ? [{ value: next, unit: UNITS[top - 1]! }] : [])]
}
