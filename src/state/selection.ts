import { catalog } from '../domain/catalog/index'
import { listOptions } from '../domain/edits'
import { editsCell } from './edits'
import { Cell } from './cell'
import { revive, Selection } from './schema'

/**
 * Which attributes go into the next roll, in catalogue order. Persisted, and
 * filtered on load so an attribute removed from the catalogue drops out.
 */
export const selectionCell = new Cell<readonly string[]>(
  catalog.attributes.filter((a) => a.defaultSelected).map((a) => a.id),
  'charaktail:selection',
  (stored) => {
    const ids = revive(Selection)(stored)
    return ids ? normalise(ids) : null
  },
)

function normalise(ids: readonly string[]): string[] {
  const wanted = new Set(ids)
  return catalog.attributes.filter((a) => wanted.has(a.id)).map((a) => a.id)
}

/** A value list with nothing switched on — only grouped kinds (직업) may get there. */
function emptied(id: string): boolean {
  const attribute = catalog.byId.get(id)
  if (!attribute || attribute.kind !== 'pick' || !attribute.groupBy) return false
  return !listOptions(attribute, editsCell.read()[id]).some((o) => o.enabled)
}

export function toggleAttribute(id: string): void {
  if (!selectionCell.read().includes(id) && emptied(id)) {
    // Turning an emptied attribute back on brings its values back with it.
    editsCell.set((all) => (all[id] ? { ...all, [id]: { ...all[id], disabled: [] } } : all))
  }
  selectionCell.set((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : normalise([...ids, id])))
}

/*
 * An attribute whose every value is switched off has nothing to roll, so it
 * leaves the selection — 직업 shows as off on the main screen (#116). Checked
 * whenever edits change, and once on load for state saved before.
 */
function dropEmptied(): void {
  selectionCell.set((ids) => (ids.some(emptied) ? ids.filter((id) => !emptied(id)) : ids))
}
editsCell.subscribe(dropEmptied)
dropEmptied()

export function setSelection(ids: readonly string[]): void {
  const next = normalise(ids)
  selectionCell.set((current) => (current.join('.') === next.join('.') ? current : next))
}

export function selectAll(on: boolean): void {
  setSelection(on ? catalog.attributes.map((a) => a.id) : [])
}
