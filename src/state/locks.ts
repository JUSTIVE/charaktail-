import { catalog } from '../domain/catalog/index'
import { decodeRollKey, rollCharacter } from '../domain/roll'
import { Cell } from './cell'
import { Locks, revive } from './schema'
import { selectionCell } from './selection'

/**
 * Attributes the player has locked: each keeps its exact value through every
 * re-roll — the next shake, a shake over the result — until unlocked.
 * Persisted, like the selection.
 */
export const locksCell = new Cell<Locks>({}, 'charaktail:locks', revive(Locks))

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
