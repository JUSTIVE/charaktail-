import type { MorphDirection } from './types.js'

/**
 * One view living in a slot. `payload` is opaque to the core — the React layer
 * puts a ReactNode in it, another host could put anything else.
 */
export interface SheetView<T> {
  readonly id: string
  readonly payload: T
}

/**
 * A rendered sheet layer. A slot holds a *stack* of views: only the last one is
 * on screen, the rest stay mounted underneath it so their state survives the
 * morph and is still there when the stack unwinds.
 */
export interface SheetSlot<T> {
  readonly id: string
  readonly views: readonly SheetView<T>[]
}

export interface SheetStackState<T> {
  readonly slots: readonly SheetSlot<T>[]
  readonly maxDepth: number
}

/**
 * What visually happens for a given state change. The host turns this into
 * choreography: layers fade, slots morph.
 */
export type StackTransition =
  | { readonly kind: 'none' }
  /** A new sheet layer appeared. Fades in; no view transition. */
  | { readonly kind: 'layer-enter'; readonly slotIndex: number }
  /** The top layer left. Fades out; no view transition. */
  | { readonly kind: 'layer-exit'; readonly slotIndex: number }
  /** Depth is exhausted: the top slot morphs into the new view. */
  | { readonly kind: 'morph'; readonly slotIndex: number; readonly direction: MorphDirection }

export interface StackResult<T> {
  readonly state: SheetStackState<T>
  readonly transition: StackTransition
}

let sequence = 0

export function createId(prefix: string): string {
  sequence += 1
  return `${prefix}-${sequence}`
}

export function createStackState<T>(maxDepth = 2): SheetStackState<T> {
  return { slots: [], maxDepth: Math.max(1, Math.trunc(maxDepth)) }
}

export function topSlotIndex<T>(state: SheetStackState<T>): number {
  return state.slots.length - 1
}

export function activeView<T>(state: SheetStackState<T>): SheetView<T> | null {
  const slot = state.slots[topSlotIndex(state)]
  if (!slot) return null
  return slot.views[slot.views.length - 1] ?? null
}

/** Total views held across every slot, including the ones parked out of sight. */
export function viewCount<T>(state: SheetStackState<T>): number {
  return state.slots.reduce((total, slot) => total + slot.views.length, 0)
}

/**
 * Adds a view to the stack.
 *
 * Below `maxDepth` this opens a new layer. At `maxDepth` the layer count is
 * frozen and the top slot morphs into the new view instead — the views it was
 * already holding stay mounted beneath it.
 */
export function pushView<T>(state: SheetStackState<T>, payload: T, id?: string): StackResult<T> {
  const view: SheetView<T> = { id: id ?? createId('view'), payload }

  if (state.slots.length < state.maxDepth) {
    const slot: SheetSlot<T> = { id: createId('slot'), views: [view] }
    return {
      state: { ...state, slots: [...state.slots, slot] },
      transition: { kind: 'layer-enter', slotIndex: state.slots.length },
    }
  }

  const index = topSlotIndex(state)
  const top = state.slots[index]
  if (!top) return { state, transition: { kind: 'none' } }

  const slots = state.slots.slice()
  slots[index] = { ...top, views: [...top.views, view] }
  return {
    state: { ...state, slots },
    transition: { kind: 'morph', slotIndex: index, direction: 'forward' },
  }
}

/**
 * Undoes exactly one `pushView`. A slot that swallowed extra views morphs back
 * to the previous one; a slot down to its last view closes as a layer.
 */
export function popView<T>(state: SheetStackState<T>): StackResult<T> {
  const index = topSlotIndex(state)
  const top = state.slots[index]
  if (!top) return { state, transition: { kind: 'none' } }

  if (top.views.length > 1) {
    const slots = state.slots.slice()
    slots[index] = { ...top, views: top.views.slice(0, -1) }
    return {
      state: { ...state, slots },
      transition: { kind: 'morph', slotIndex: index, direction: 'back' },
    }
  }

  return {
    state: { ...state, slots: state.slots.slice(0, -1) },
    transition: { kind: 'layer-exit', slotIndex: index },
  }
}

/**
 * Swaps the top slot's visible view without growing its history — the morph
 * for navigation, where "back" must not walk through every screen ever shown.
 * On an empty stack it behaves like a first push.
 */
export function replaceView<T>(state: SheetStackState<T>, payload: T, id?: string): StackResult<T> {
  const index = topSlotIndex(state)
  const top = state.slots[index]
  if (!top) return pushView(state, payload, id)

  const view: SheetView<T> = { id: id ?? createId('view'), payload }
  const slots = state.slots.slice()
  slots[index] = { ...top, views: [...top.views.slice(0, -1), view] }
  return {
    state: { ...state, slots },
    transition: { kind: 'morph', slotIndex: index, direction: 'forward' },
  }
}

/** Drops everything without animating the unwind step by step. */
export function resetStack<T>(state: SheetStackState<T>): StackResult<T> {
  if (state.slots.length === 0) return { state, transition: { kind: 'none' } }
  return {
    state: { ...state, slots: [] },
    transition: { kind: 'layer-exit', slotIndex: 0 },
  }
}

export function withMaxDepth<T>(state: SheetStackState<T>, maxDepth: number): SheetStackState<T> {
  return { ...state, maxDepth: Math.max(1, Math.trunc(maxDepth)) }
}
