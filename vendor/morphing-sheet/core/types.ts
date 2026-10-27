/**
 * The three bands of the system, bottom to top: base (the app's floor —
 * sidebar, inspector), structure (task surfaces — dialogs, panels), element
 * (momentary surfaces — palettes, popovers). Exactly three; a fourth usually
 * means the design is wrong.
 */
export type SheetTier = 'base' | 'structure' | 'element'

/** An edge of a sheet, in logical directions. */
export type SheetEdge = 'top' | 'bottom' | 'start' | 'end'

/** Where the stack is anchored. Every slot in a stack shares one placement. */
export type SheetPlacement = 'bottom' | 'center' | 'top' | 'left' | 'right'

/** Which way a morph is running, so CSS can shape the two directions differently. */
export type MorphDirection = 'forward' | 'back'

/**
 * Content lifecycle inside a slot during a morph.
 *
 *   idle → exiting → hidden → entering → idle
 *
 * The frame only morphs while the content is `hidden`, which is what makes the
 * geometry change readable instead of a smear of two different layouts.
 */
export type ContentPhase = 'idle' | 'exiting' | 'hidden' | 'entering'

/** What the stack as a whole is doing. */
export type StackPhase = 'idle' | 'layer-entering' | 'layer-exiting' | 'morphing'

/** Structural subset of the ViewTransition interface we rely on. */
export interface ViewTransitionLike {
  readonly ready: Promise<void>
  readonly updateCallbackDone: Promise<void>
  readonly finished: Promise<void>
  skipTransition(): void
}

/**
 * Uniform handle for a morph, whether it was backed by a real view transition
 * or degraded to a plain DOM update. Both promises always resolve; a skipped
 * or unsupported transition is not an error.
 */
export interface MorphTransitionHandle {
  readonly ready: Promise<void>
  readonly finished: Promise<void>
  /** false when no view transition was used (unsupported, disabled, reduced motion). */
  readonly animated: boolean
  skip(): void
}
