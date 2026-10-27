const NAME_PROPERTY = 'view-transition-name'
const CLASS_PROPERTY = 'view-transition-class'

let sequence = 0

/**
 * A view-transition-name must be unique across the document while a transition
 * is running, so every sheet instance gets its own.
 */
export function createMorphName(prefix = 'ms-morph'): string {
  sequence += 1
  return `${prefix}-${sequence}`
}

export function setMorphName(element: HTMLElement | null | undefined, name: string | null): void {
  if (!element) return
  if (name === null) element.style.removeProperty(NAME_PROPERTY)
  else element.style.setProperty(NAME_PROPERTY, name)
}

/**
 * Tags an element so a single `::view-transition-group(*.ms-morph)` rule can
 * style it. Silently ignored by browsers without view-transition-class.
 */
export function setMorphClass(element: HTMLElement | null | undefined, className: string | null): void {
  if (!element) return
  if (className === null) element.style.removeProperty(CLASS_PROPERTY)
  else element.style.setProperty(CLASS_PROPERTY, className)
}

/**
 * Hands `name` from `from` to `to` in one step. Two elements may never hold the
 * same name simultaneously, so the release always happens before the claim.
 */
export function handOffMorphName(
  from: HTMLElement | null | undefined,
  to: HTMLElement | null | undefined,
  name: string,
): void {
  setMorphName(from, null)
  setMorphName(to, name)
}
