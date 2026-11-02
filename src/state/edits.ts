import { Edits, isMultiple, listOptions, type AttributeEdits } from '../domain/edits'
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

/** Switches several values at once — a 세계관's 직업 together. */
export function setOptionsEnabled(attributeId: string, optionIds: readonly string[], enabled: boolean): void {
  const ids = new Set(optionIds)
  patch(attributeId, (e) => ({
    ...e,
    disabled: enabled ? e.disabled.filter((id) => !ids.has(id)) : [...new Set([...e.disabled, ...optionIds])],
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
    /** 종족 only: the span its 키 is rolled in, in cm. */
    height?: { min: number; max: number } | undefined
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
  const { lifespan, height, part, group } = extras
  if (part !== undefined && (attribute.kind !== 'compose' || part < 0 || part >= attribute.parts.length)) return '없는 마디예요.'
  if (lifespan) {
    if (!Number.isInteger(lifespan.min) || !Number.isInteger(lifespan.max) || lifespan.min < 1) return '수명을 1년 이상으로 입력해 주세요.'
    if (lifespan.max > 99999) return '수명은 99999년까지 입력할 수 있어요.'
    if (lifespan.min > lifespan.max) return '최소 수명이 최대보다 클 수 없어요.'
  }
  if (height) {
    if (!Number.isInteger(height.min) || !Number.isInteger(height.max) || height.min < 1) return '키를 1cm 이상으로 입력해 주세요.'
    if (height.max > 99999) return '키는 99999cm까지 입력할 수 있어요.'
    if (height.min > height.max) return '최소 키가 최대보다 클 수 없어요.'
  }
  const id = `u${Date.now().toString(36)}${Math.floor(Math.random() * 36 ** 2).toString(36)}`
  const colours = attribute.kind === 'color' ? { hex: extras.hex ?? '#7c7a85', ...(extras.hex2 ? { hex2: extras.hex2 } : {}) } : {}
  patch(attributeId, (e) => ({ ...e, added: [...e.added, { id, label: name.slice(0, 24), ...colours, ...(lifespan ? { lifespan } : {}), ...(height ? { height } : {}), ...(part ? { part } : {}), ...(group ? { group } : {}) }] }))
  return null
}

/** How many come out — a pick's draw, or the most 외형 특징 together. Returns why it was refused, or null. */
export function setCount(attributeId: string, count: number): string | null {
  const attribute = catalog.byId.get(attributeId)
  if (!attribute || !isMultiple(attribute)) return '여러 개가 나오는 속성이 아니에요.'
  const on = listOptions(attribute, editsCell.read()[attributeId]).filter((o) => o.enabled).length
  if (!Number.isInteger(count) || count < 1) return '1개 이상이어야 해요.'
  if (count > on) return `켜져 있는 값이 ${on}개라 그보다 많이는 안 돼요.`
  patch(attributeId, (e) => ({ ...e, count }))
  return null
}

/** 외형 특징 with no cap again: every one that hits comes out. */
export function clearCount(attributeId: string): void {
  patch(attributeId, ({ count: _, ...rest }) => rest)
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
