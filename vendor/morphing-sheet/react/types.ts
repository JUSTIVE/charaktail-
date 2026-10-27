import type { ReactNode } from 'react'

import type { SheetSlot } from '../core/stack.js'
import type { SheetPlacement, SheetTier, StackPhase } from '../core/types.js'

/** What callers hand to `push()`. */
export interface SheetDescriptor {
  /** Stable id. Generated when omitted. */
  id?: string
  title?: ReactNode
  /** Rendered inside the sheet. Stays mounted while covered, so its state survives. */
  content: ReactNode
  /**
   * CSS length the sheet takes while this view is on screen. The frame morphs
   * to it, so a wide picker can narrow into a compact confirmation.
   */
  width?: string
  /** Extra class names for this view's article element. */
  className?: string
}

/** An op waiting in (or running at the head of) a region's queue (#105). */
export interface QueuedOp {
  key: number
  kind: 'push' | 'replace' | 'pop' | 'reset'
  /** push / replace only: the view that has not reached the stack yet. */
  descriptor?: SheetDescriptor
  /** At the head of the queue, its choreography under way. */
  running: boolean
}

/**
 * The imperative surface of a stack. Stable across renders, which is what lets
 * one region drive another without subscribing to its state.
 */
export interface PushOptions {
  /**
   * Element the sheet morphs out of — the trigger hands its box to the frame,
   * and the last pop hands it back. Falls back to the fade/fly arrival when
   * omitted, unsupported, or the trigger has left the DOM by close time.
   */
  from?: HTMLElement | null
  /**
   * Element the sheet attaches to, popover-style: the slot is placed under it
   * (or above, near the viewport's lower edge), clamped to the viewport. In a
   * depth-1 region, pushing with a different anchor morphs the open sheet
   * across to the new anchor.
   */
  anchor?: HTMLElement | null
}

/**
 * Where an anchored slot sits.
 *
 * `name` is set where CSS anchor positioning exists (#96) — the browser then
 * keeps the sheet attached to its trigger through scroll and resize, and the
 * coordinates go unused. Without it the sheet falls back to `x`/`y`/`above`,
 * resolved once at push time, which is what a non-scrolling context needs and
 * all an older engine can offer.
 */
export interface AnchorPoint {
  x: number
  y: number
  above: boolean
  name: string | null
}

export interface SheetStackActions {
  /**
   * Adds a view. A no-op when the descriptor's id is already the one on
   * screen — pushing the visible view has nothing to morph to, and two views
   * sharing an id would both read as active (#92).
   */
  push: (descriptor: SheetDescriptor, options?: PushOptions) => Promise<void>
  /**
   * Swaps the visible view of the top slot without growing its history.
   * A no-op when the top view already has the descriptor's id — callers can
   * fire it idempotently from state changes. Takes the same options as
   * `push`, so an open popover can retarget to another anchor without
   * stacking a view per press.
   */
  replace: (descriptor: SheetDescriptor, options?: PushOptions) => Promise<void>
  pop: () => Promise<void>
  reset: () => Promise<void>
  /** Live layer count — a getter so the actions object can stay stable. */
  getDepth: () => number
  /**
   * Id of the view on screen, or null when the region is empty. Lets a
   * trigger decide between opening, retargeting and closing without
   * subscribing to the region's state.
   */
  getActiveViewId: () => string | null
}

export interface SheetStackApi extends SheetStackActions {
  /** Identifier other parts of the tree use to reach this stack. */
  id: string
  /** Which band this region lives in. */
  tier: SheetTier
  /** False for regions that are always on screen, like a sidebar. */
  modal: boolean
  slots: readonly SheetSlot<SheetDescriptor>[]
  /** Number of sheet layers currently on screen. */
  depth: number
  maxDepth: number
  phase: StackPhase
  placement: SheetPlacement
  /** True when the next `push()` will morph the top layer instead of adding one. */
  willMorph: boolean
  /** True when the current `pop()` will morph back instead of closing a layer. */
  willMorphBack: boolean
}
