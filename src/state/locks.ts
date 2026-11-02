import { catalog } from '../domain/catalog/index'
import { decodeRollKey, rollCharacter, unpackLocks } from '../domain/roll'
import { Cell } from './cell'
import type { Locks } from './schema'
import { selectionCell } from './selection'

/**
 * Attributes the player has locked: each keeps its exact value through every
 * re-roll — the next shake, a shake over the result — until unlocked.
 * A link can start them (`?l=`, read once on entry by `locksFromUrl`); from
 * there they are the player's to lock and unlock, and the address is left
 * alone — it records how the page was opened, not every change after.
 */
export const locksCell = new Cell<Locks>({})

/** Unlocks one attribute — the chip's lock button. */
export function unlock(attributeId: string): void {
  locksCell.set((all) => {
    if (!all[attributeId]) return all
    const { [attributeId]: _, ...rest } = all
    return rest
  })
}

/** The locks a link opens with: `?l=`, packed like a roll key's locked segment. Read once, on entry. */
export function locksFromUrl(l: string | null | undefined): void {
  const locks = l ? unpackLocks(l) : undefined
  if (locks) locksCell.set(locks)
}

/** Locks (or unlocks) an attribute at the value it has in this roll. */
export function toggleLock(attributeId: string, rollKey: string): void {
  if (locksCell.read()[attributeId]) {
    locksCell.set(({ [attributeId]: _, ...rest }) => rest)
    return
  }
  const request = decodeRollKey(rollKey)
  const value = request && rollCharacter(catalog, request).find((v) => v.attributeId === attributeId)
  if (value) locksCell.set((all) => ({ ...all, [attributeId]: value }))
}

/** What the next roll keeps: locks on attributes still selected. */
export function activeLocks(): Locks {
  const selected = new Set(selectionCell.read())
  return Object.fromEntries(Object.entries(locksCell.read()).filter(([id]) => selected.has(id)))
}
