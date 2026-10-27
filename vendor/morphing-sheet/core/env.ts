type UpdateCallback = () => void | Promise<void>

interface StartViewTransitionOptions {
  update: UpdateCallback
  types?: string[]
}

type StartViewTransition = (
  input: UpdateCallback | StartViewTransitionOptions,
) => import('./types.js').ViewTransitionLike

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * Resolves `document.startViewTransition` without depending on the DOM lib
 * shipping it, so the package compiles against older and newer TypeScript alike.
 */
export function getStartViewTransition(): StartViewTransition | null {
  if (!isBrowser()) return null
  const candidate = (document as unknown as Record<string, unknown>)['startViewTransition']
  if (typeof candidate !== 'function') return null
  return (candidate as StartViewTransition).bind(document)
}

export function supportsViewTransitions(): boolean {
  return getStartViewTransition() !== null
}

function cssSupports(condition: string): boolean {
  if (!isBrowser() || typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false
  try {
    return CSS.supports(condition)
  } catch {
    return false
  }
}

/** Chrome 125+: `startViewTransition({ update, types })` and `:active-view-transition-type()`. */
export function supportsViewTransitionTypes(): boolean {
  return supportsViewTransitions() && cssSupports('selector(:active-view-transition-type(morph))')
}

/** Chrome 125+: `view-transition-class`, which lets one rule style every morph pair. */
export function supportsViewTransitionClass(): boolean {
  return cssSupports('view-transition-class: ms-morph')
}

/**
 * Chrome 125+: `anchor-name` / `position-anchor`. Where it exists the browser
 * keeps an anchored sheet attached to its trigger through scroll and resize,
 * which a point resolved once at push time cannot do (#96).
 */
export function supportsAnchorPositioning(): boolean {
  return cssSupports('anchor-name: --ms-a') && cssSupports('position-area: block-end')
}

/**
 * The inspector's explode mode (#104) lays the live page out in 3D. A view
 * transition would paint a flat snapshot of the morphing slot over that scene
 * — every plane under it collapsed into one image, old and new cross-fading —
 * so morphs take the plain-DOM path while it is on.
 */
export function isExploded(): boolean {
  return isBrowser() && document.documentElement.hasAttribute('data-ms-exploded')
}

/**
 * Explode mode with the inspector's Queued toggle on (#105): regions render
 * the views still waiting in their op queue as ghost planes above the slot.
 * Off, nothing waiting is ever mounted.
 */
export function isQueueShown(): boolean {
  return isExploded() && document.documentElement.hasAttribute('data-ms-xray-queued')
}

export function prefersReducedMotion(): boolean {
  if (!isBrowser() || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
