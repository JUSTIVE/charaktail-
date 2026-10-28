import { catalog } from './catalog/index'

/*
 * Attributes in URLs go by their two-letter codes (`code` in each catalogue
 * file): 'wd' for 세계관, 'ey' for 눈 색상. Fixed width, so a list needs no
 * separators — `wdspagey` is four attributes. Links from before the codes
 * spelled ids out (`world.species`); those still read.
 */

/** id → code; an id the catalogue doesn't know is dropped. */
export function codeOf(id: string): string | undefined {
  return catalog.byId.get(id)?.code
}

/** code (or a legacy full id) → id. */
export function idOf(codeOrId: string): string | undefined {
  return catalog.byCode.get(codeOrId)?.id ?? (catalog.byId.has(codeOrId) ? codeOrId : undefined)
}

export function encodeAttributeIds(ids: readonly string[]): string {
  return ids.flatMap((id) => codeOf(id) ?? []).join('')
}

export function decodeAttributeIds(text: string): string[] {
  const legacy = text.includes('.') || catalog.byId.has(text)
  const pieces = legacy ? text.split('.') : (text.match(/[a-z]{2}/g) ?? [])
  return pieces.flatMap((piece) => idOf(piece) ?? [])
}
