import { catalog } from '../domain/catalog/index'
import { Cell } from './cell'

/**
 * Which attributes go into the next roll, in catalogue order. Persisted, and
 * filtered on load so an attribute removed from the catalogue drops out.
 */
export const selectionCell = new Cell<readonly string[]>(
  catalog.attributes.filter((a) => a.defaultSelected).map((a) => a.id),
  'charaktail:selection',
  (stored) => (Array.isArray(stored) ? normalise(stored.filter((id): id is string => typeof id === 'string')) : null),
)

function normalise(ids: readonly string[]): string[] {
  const wanted = new Set(ids)
  return catalog.attributes.filter((a) => wanted.has(a.id)).map((a) => a.id)
}

export function toggleAttribute(id: string): void {
  selectionCell.set((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : normalise([...ids, id])))
}

export function setSelection(ids: readonly string[]): void {
  const next = normalise(ids)
  selectionCell.set((current) => (current.join('.') === next.join('.') ? current : next))
}

export function selectAll(on: boolean): void {
  setSelection(on ? catalog.attributes.map((a) => a.id) : [])
}
