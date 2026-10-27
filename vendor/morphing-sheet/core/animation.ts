import { isBrowser } from './env.js'

/**
 * Resolves once every animation running on `element` (and its subtree) has
 * settled. The timeout is a guard, not a schedule: a dropped animation event or
 * a display:none mid-flight must never strand the morph sequence.
 */
export async function waitForAnimations(
  element: HTMLElement | null | undefined,
  timeoutMs: number,
): Promise<void> {
  if (!isBrowser() || !element || typeof element.getAnimations !== 'function') return

  const animations = element.getAnimations({ subtree: true }).filter((animation) => {
    // Long-running or infinite animations (spinners, marquees) are not part of
    // the sequence and must not hold it up.
    const timing = animation.effect?.getComputedTiming()
    return timing !== undefined && timing.iterations !== Infinity
  })

  if (animations.length === 0) return

  await Promise.race([
    Promise.allSettled(animations.map((animation) => animation.finished)),
    new Promise<void>((resolve) => {
      setTimeout(resolve, timeoutMs)
    }),
  ])
}

/** Reads a CSS time token (`120ms`, `0.4s`) off an element as milliseconds. */
export function readDurationToken(
  element: HTMLElement | null | undefined,
  token: string,
  fallbackMs: number,
): number {
  if (!isBrowser() || !element) return fallbackMs
  const raw = getComputedStyle(element).getPropertyValue(token).trim()
  if (raw === '') return fallbackMs
  const value = Number.parseFloat(raw)
  if (Number.isNaN(value)) return fallbackMs
  return raw.endsWith('ms') ? value : value * 1000
}

/** Plain timer, used where a phase is paced by a CSS token rather than an event. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
