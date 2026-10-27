/*
 * The palette. Hues are Radix Colors' dark-theme step 9 (radix-ui.com/colors,
 * @radix-ui/colors 3.0.0): solid fills tuned to carry equal visual weight, so
 * no drop shouts over another. Neutrals are the mauve scale — a grey with a
 * trace of violet, which keeps the night stage from reading as dead black.
 *
 * Catalogue files take their colour from here, so a new attribute picks a
 * token instead of inventing a hex. Hues already on the stage are spread
 * around the wheel; take an unused one before doubling up.
 */
export const hue = {
  violet: '#6e56cf',
  indigo: '#3e63dd',
  cyan: '#00a2c7',
  teal: '#12a594',
  grass: '#46a758',
  lime: '#bdee63',
  amber: '#ffc53d',
  tomato: '#e54d2e',
  crimson: '#e93d82',
  plum: '#ab4aba',
  bronze: '#a18072',
  // In reserve for the next attributes.
  iris: '#5b5bd6',
  sky: '#7ce2fe',
  jade: '#29a383',
  orange: '#f76b15',
  gold: '#978365',
} as const

/** Mauve, dark — steps 1 (app background) to 12 (high-contrast text). */
export const mauve = {
  1: '#121113',
  2: '#1a191b',
  3: '#232225',
  6: '#3c393f',
  10: '#7c7a85',
  11: '#b5b2bc',
  12: '#eeeef0',
} as const

/** Ink for a label printed on `hex`: dark on light fills, white otherwise. */
export function inkOn(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16)
  const lin = (c: number) => {
    const s = c / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const luminance = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  return luminance > 0.42 ? mauve[1] : '#ffffff'
}
