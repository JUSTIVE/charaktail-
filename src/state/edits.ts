import { Edits, listOptions, type AttributeEdits } from '../domain/edits'
import { catalog } from '../domain/catalog/index'
import { Cell } from './cell'
import { revive } from './schema'

/** The player's value-list edits, per attribute. Persisted. */
export const editsCell = new Cell<Edits>({}, 'charaktail:edits', revive(Edits))

const blank = (): AttributeEdits => ({ disabled: [], removed: [], added: [] })

function patch(attributeId: string, change: (current: AttributeEdits) => AttributeEdits): void {
  editsCell.set((all) => ({ ...all, [attributeId]: change(all[attributeId] ?? blank()) }))
}

export function toggleOption(attributeId: string, optionId: string): void {
  patch(attributeId, (e) => ({
    ...e,
    disabled: e.disabled.includes(optionId) ? e.disabled.filter((id) => id !== optionId) : [...e.disabled, optionId],
  }))
}

export function removeOption(attributeId: string, optionId: string): void {
  patch(attributeId, (e) => {
    const own = e.added.some((o) => o.id === optionId)
    return {
      disabled: e.disabled.filter((id) => id !== optionId),
      removed: own ? e.removed : [...e.removed, optionId],
      added: e.added.filter((o) => o.id !== optionId),
    }
  })
}

/** Returns why the value could not be added, or null when it was. */
export function addOption(
  attributeId: string,
  label: string,
  extras: {
    hex?: string | undefined
    hex2?: string | undefined
    lifespan?: { min: number; max: number } | undefined
    /** Compose kinds: the part the value joins. */
    part?: number | undefined
    /** Grouped kinds: the group value it is added under. */
    group?: string | undefined
  } = {},
): string | null {
  const attribute = catalog.byId.get(attributeId)
  const name = label.trim()
  if (!attribute || attribute.kind === 'range') return '이 속성에는 값을 추가할 수 없어요.'
  if (name === '') return '값을 입력해 주세요.'
  if (listOptions(attribute, editsCell.read()[attributeId]).some((o) => o.label === name)) return '이미 있는 값이에요.'
  const { lifespan, part, group } = extras
  if (part !== undefined && (attribute.kind !== 'compose' || part < 0 || part >= attribute.parts.length)) return '없는 마디예요.'
  if (lifespan) {
    if (!Number.isInteger(lifespan.min) || !Number.isInteger(lifespan.max) || lifespan.min < 1) return '수명을 1년 이상으로 입력해 주세요.'
    if (lifespan.max > 99999) return '수명은 99999년까지 입력할 수 있어요.'
    if (lifespan.min > lifespan.max) return '최소 수명이 최대보다 클 수 없어요.'
  }
  const id = `u${Date.now().toString(36)}${Math.floor(Math.random() * 36 ** 2).toString(36)}`
  const colours = attribute.kind === 'color' ? { hex: extras.hex ?? '#7c7a85', ...(extras.hex2 ? { hex2: extras.hex2 } : {}) } : {}
  patch(attributeId, (e) => ({ ...e, added: [...e.added, { id, label: name.slice(0, 24), ...colours, ...(lifespan ? { lifespan } : {}), ...(part ? { part } : {}), ...(group ? { group } : {}) }] }))
  return null
}

/** Returns why the bounds were refused, or null when they were set. */
export function setRange(attributeId: string, min: number, max: number): string | null {
  const attribute = catalog.byId.get(attributeId)
  if (!attribute || (attribute.kind !== 'range' && attribute.kind !== 'stats')) return '범위 속성이 아니에요.'
  if (!Number.isFinite(min) || !Number.isFinite(max)) return '숫자를 입력해 주세요.'
  if (min < 0 || max > 99999) return '0 이상 99999 이하로 입력해 주세요.'
  if (min > max) return '최소가 최대보다 클 수 없어요.'
  patch(attributeId, (e) => ({ ...e, min, max }))
  return null
}

export function resetAttribute(attributeId: string): void {
  editsCell.set((all) => {
    const { [attributeId]: _, ...rest } = all
    return rest
  })
}
