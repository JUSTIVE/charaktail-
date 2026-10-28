/** The hue of `#rrggbb`, 0–360 — red 0, yellow 60, green 120, blue 240, violet ~270, pink ~330. */
export function hueOf(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  if (d === 0) return 0
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (h * 60 + 360) % 360
}

/** Colours in rainbow order: red, orange, yellow, green, blue, violet, then pinks. */
export function inRainbowOrder(colors: readonly string[]): string[] {
  return [...colors].sort((a, b) => hueOf(a) - hueOf(b))
}

/** A left-to-right gradient through `colors`; one colour is just that colour. */
export function rainbowGradient(colors: readonly string[]): string {
  const sorted = inRainbowOrder(colors)
  if (sorted.length === 0) return 'linear-gradient(90deg, #6e56cf, #e93d82, #ffc53d, #00a2c7)'
  if (sorted.length === 1) return sorted[0]!
  return `linear-gradient(90deg, ${sorted.join(', ')})`
}
