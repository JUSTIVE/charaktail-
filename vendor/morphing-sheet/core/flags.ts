import { isBrowser } from './env.js'
import type { MorphDirection, SheetTier, StackPhase } from './types.js'

const PHASE = 'data-ms-phase'
const DIRECTION = 'data-ms-direction'
const TIER = 'data-ms-tier'
const MORPH = 'data-ms-morph'

function setFlag(attribute: string, value: string | null): void {
  if (!isBrowser()) return
  if (value === null) document.documentElement.removeAttribute(attribute)
  else document.documentElement.setAttribute(attribute, value)
}

/**
 * Mirrors the stack's phase and direction onto <html>. View transition
 * pseudo-elements can only be selected from the document root, and not every
 * browser has `:active-view-transition-type()` yet — these attributes are how
 * CSS knows a morph is running and which way it points.
 */
export function setStackPhase(phase: StackPhase | null): void {
  setFlag(PHASE, phase === null || phase === 'idle' ? null : phase)
}

export function setMorphDirection(direction: MorphDirection | null): void {
  setFlag(DIRECTION, direction)
}

/**
 * View-transition pseudo-elements originate at the root, so per-tier morph
 * timing can only reach them through an attribute mirrored up here.
 */
export function setMorphTier(tier: SheetTier | null): void {
  setFlag(TIER, tier)
}

/** What kind of morph is running: an in-place view swap, a trigger-born
 * arrival, or a departure back into a trigger. CSS shapes the snapshot
 * crossfade differently for each. */
export type MorphKind = 'swap' | 'arrive' | 'depart'

export function setMorphKind(kind: MorphKind | null): void {
  setFlag(MORPH, kind)
}
