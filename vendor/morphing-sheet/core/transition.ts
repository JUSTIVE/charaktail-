import { getStartViewTransition, isExploded, prefersReducedMotion, supportsViewTransitionTypes } from './env.js'
import type { MorphTransitionHandle } from './types.js'

export interface StartMorphOptions {
  /** View transition types, e.g. `['morph', 'open']`. Ignored where unsupported. */
  types?: string[]
  /** Force the plain-DOM path, skipping the view transition entirely. */
  disabled?: boolean
  /** Degrade to an instant update when the user asked for reduced motion. */
  respectReducedMotion?: boolean
  onError?: (error: unknown) => void
}

const noop = (): void => {}

/**
 * Runs `update` inside a view transition when the browser has one, and falls
 * back to calling it directly otherwise. The returned promises never reject:
 * a skipped transition is a normal outcome, not a failure.
 */
export function startMorphTransition(
  update: () => void | Promise<void>,
  options: StartMorphOptions = {},
): MorphTransitionHandle {
  const { types, disabled = false, respectReducedMotion = true, onError } = options
  const start = getStartViewTransition()
  const degraded =
    disabled || start === null || isExploded() || (respectReducedMotion && prefersReducedMotion())

  if (degraded) {
    const done = (async () => {
      try {
        await update()
      } catch (error) {
        onError?.(error)
      }
    })()
    return { ready: done, finished: done, animated: false, skip: noop }
  }

  const useTypes = types !== undefined && types.length > 0 && supportsViewTransitionTypes()
  const transition = useTypes ? start({ update, types }) : start(update)

  const swallow = (promise: Promise<unknown>): Promise<void> =>
    promise.then(
      () => undefined,
      (error: unknown) => {
        onError?.(error)
      },
    )

  return {
    // `ready` rejects when the transition is skipped mid-flight; callers only
    // care that the pseudo-elements are (or never will be) in place.
    ready: swallow(transition.ready),
    finished: swallow(transition.finished),
    animated: true,
    skip: () => transition.skipTransition(),
  }
}
