import { catalog } from '../domain/catalog/index'
import { decodeRollKey, packLocks, rollCharacter, unpackLocks } from '../domain/roll'
import { Cell } from './cell'
import type { Locks } from './schema'
import { selectionCell } from './selection'

/**
 * Attributes the player has locked: each keeps its exact value through every
 * re-roll — the next shake, a shake over the result — until unlocked.
 * They live in the address (`?l=`), not in storage: a link carries them, the
 * back button brings earlier ones back. `syncLocksWithUrl` keeps this cell
 * and the address in step.
 */
export const locksCell = new Cell<Locks>({})

const allIds = catalog.attributes.map((a) => a.id)
const pack = (locks: Locks) => packLocks(locks, allIds)

/** Unlocks one attribute — the chip's lock button. */
export function unlock(attributeId: string): void {
  locksCell.set((all) => {
    if (!all[attributeId]) return all
    const { [attributeId]: _, ...rest } = all
    return rest
  })
}

interface UrlSync {
  read: () => string | undefined
  write: (l: string | undefined) => void
  subscribe: (onChange: () => void) => () => void
}

/**
 * The address is where locks live. It wins when it names locks (a link, the
 * back button); when a navigation drops them (a link to /), they are put back
 * — locks last until unlocked. Every change to the locks is written to it.
 */
export function syncLocksWithUrl(url: UrlSync): () => void {
  let writing = false
  const fromUrl = () => {
    if (writing) return
    const l = url.read()
    if (l) {
      if (l !== pack(locksCell.read())) locksCell.set(unpackLocks(l) ?? {})
    } else if (Object.keys(locksCell.read()).length) {
      writing = true
      url.write(pack(locksCell.read()))
      writing = false
    }
  }
  fromUrl()
  const offUrl = url.subscribe(fromUrl)
  const offCell = locksCell.subscribe(() => {
    const packed = pack(locksCell.read()) || undefined
    if (packed === url.read()) return
    writing = true
    url.write(packed)
    writing = false
  })
  return () => {
    offUrl()
    offCell()
  }
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
