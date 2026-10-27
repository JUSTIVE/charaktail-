/*
 * Seeded randomness. A roll is a pure function of (seed, attribute, nonce), so
 * a URL reproduces a character exactly and re-rolling one attribute leaves
 * every other attribute's stream untouched.
 */

/** FNV-1a — small, stable, good enough to spread seeds. */
export function hash(text: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export type Rng = () => number

/** mulberry32: a float in [0, 1). */
export function createRng(...parts: (string | number)[]): Rng {
  let state = hash(parts.join('␟'))
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function weightedPick<T extends { weight: number }>(rng: Rng, items: readonly T[]): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0)
  let cursor = rng() * total
  for (const item of items) {
    cursor -= item.weight
    if (cursor < 0) return item
  }
  return items[items.length - 1]!
}

/** Draws `count` distinct items without replacement, weights respected. */
export function weightedSample<T extends { weight: number }>(rng: Rng, items: readonly T[], count: number): T[] {
  const pool = [...items]
  const picked: T[] = []
  while (picked.length < count && pool.length > 0) {
    const item = weightedPick(rng, pool)
    picked.push(item)
    pool.splice(pool.indexOf(item), 1)
  }
  return picked
}

/** Irwin–Hall with three draws: a cheap bell curve over [0, 1). */
export function bell(rng: Rng): number {
  return (rng() + rng() + rng()) / 3
}

/** A short url-safe seed. */
export function freshSeed(): string {
  const bytes = new Uint8Array(6)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 8)
}
