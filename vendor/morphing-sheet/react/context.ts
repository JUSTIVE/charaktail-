import { createContext, useContext, useMemo } from 'react'

import type { SheetTier } from '../core/types.js'
import type { PushOptions, SheetDescriptor, SheetStackActions, SheetStackApi } from './types.js'

export const SheetStackContext = createContext<SheetStackApi | null>(null)

/** Returns the nearest region, with its reactive state. */
export function useSheetStack(): SheetStackApi {
  const stack = useContext(SheetStackContext)
  if (stack === null) {
    throw new Error('useSheetStack() must be used inside <SheetStackProvider>')
  }
  return stack
}

/**
 * What a region registers about itself. `getDepth` reads live state, so the
 * cross-tier rules (structure clears element, Escape order) can be decided at
 * event time without subscribing anyone to anyone else's renders.
 */
export interface SheetStackRegistryEntry {
  id: string
  tier: SheetTier
  /** False for element regions that must survive (toasts): the cross-tier
   * clear and the Escape-priority rule only consider dismissable regions. */
  lightDismiss: boolean
  actions: SheetStackActions
  getDepth: () => number
}

export interface SheetStackRegistry {
  set: (entry: SheetStackRegistryEntry) => void
  remove: (id: string) => void
  get: (id: string) => SheetStackRegistryEntry | undefined
  all: () => SheetStackRegistryEntry[]
}

export const SheetStackRegistryContext = createContext<SheetStackRegistry | null>(null)

export function createSheetStackRegistry(): SheetStackRegistry {
  const entries = new Map<string, SheetStackRegistryEntry>()
  return {
    set: (entry) => void entries.set(entry.id, entry),
    remove: (id) => void entries.delete(id),
    get: (id) => entries.get(id),
    all: () => Array.from(entries.values()),
  }
}

const missing = (id: string) => (): Promise<void> => {
  console.warn(`[morphing-sheet] no region registered as "${id}"`)
  return Promise.resolve()
}

/**
 * Imperative handle for a region somewhere else in the tree — a sidebar view
 * opening a dialog, say. Deliberately actions only: the returned object is
 * stable, so reaching another region never re-renders this one.
 */
export function useSheetStackActions(id: string): SheetStackActions {
  const registry = useContext(SheetStackRegistryContext)

  return useMemo<SheetStackActions>(
    () => ({
      push: (descriptor: SheetDescriptor, options?: PushOptions) =>
        registry?.get(id)?.actions.push(descriptor, options) ?? missing(id)(),
      replace: (descriptor: SheetDescriptor, options?: PushOptions) =>
        registry?.get(id)?.actions.replace(descriptor, options) ?? missing(id)(),
      pop: () => registry?.get(id)?.actions.pop() ?? missing(id)(),
      reset: () => registry?.get(id)?.actions.reset() ?? missing(id)(),
      getDepth: () => registry?.get(id)?.getDepth() ?? 0,
      getActiveViewId: () => registry?.get(id)?.actions.getActiveViewId() ?? null,
    }),
    [registry, id],
  )
}
