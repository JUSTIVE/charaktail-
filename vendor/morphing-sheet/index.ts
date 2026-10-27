/**
 * morphing-sheet — core (framework-agnostic).
 *
 * Import the stylesheet once in your app:
 *   import 'morphing-sheet/styles.css'
 *
 * The model is documented in docs/spec.md; the short version is that a stack of
 * sheet layers grows until `maxDepth`, after which the top layer morphs into
 * each new view instead of stacking another one.
 */
export {
  activeView,
  createId,
  createStackState,
  popView,
  pushView,
  replaceView,
  resetStack,
  topSlotIndex,
  viewCount,
  withMaxDepth,
} from './core/stack.js'
export type {
  SheetSlot,
  SheetStackState,
  SheetView,
  StackResult,
  StackTransition,
} from './core/stack.js'

export { startMorphTransition } from './core/transition.js'
export type { StartMorphOptions } from './core/transition.js'

export { delay, readDurationToken, waitForAnimations } from './core/animation.js'
export { setMorphDirection, setMorphKind, setMorphTier, setStackPhase } from './core/flags.js'
export type { MorphKind } from './core/flags.js'

export {
  getStartViewTransition,
  isBrowser,
  prefersReducedMotion,
  supportsAnchorPositioning,
  supportsViewTransitionClass,
  supportsViewTransitions,
  supportsViewTransitionTypes,
} from './core/env.js'

export { createMorphName, handOffMorphName, setMorphClass, setMorphName } from './core/names.js'
export { lockScroll } from './core/scroll-lock.js'
export { installOverlayScrollbars } from './core/overlay-scrollbar.js'
export { trapFocus } from './core/focus-trap.js'

export type {
  ContentPhase,
  MorphDirection,
  MorphTransitionHandle,
  SheetEdge,
  SheetPlacement,
  SheetTier,
  StackPhase,
  ViewTransitionLike,
} from './core/types.js'
