import { Edits, isMultiple, listOptions, type AttributeEdits } from '../domain/edits'
import { speciesSpans } from '../domain/preview'
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

type Span = { min: number; max: number }

/** What a value can carry besides its name, by kind. */
export interface ValueExtras {
  hex?: string | undefined
  /** null: one colour, where it had two. */
  hex2?: string | null | undefined
  /** 외형 특징 only: its odds, 0–1. */
  chance?: number | undefined
  /** 종족 only: the span its 나이 is rolled in. */
  age?: Span | undefined
  /** 종족 only: the span its 키 is rolled in, in cm. */
  height?: Span | undefined
  /** Compose kinds: the part the value joins. */
  part?: number | undefined
  /** Grouped kinds: the group value it is added under. */
  group?: string | undefined
}

/** Why a value's name and extras are refused, or null. `self` is the value being edited, which may keep its own name. */
function checkValue(attributeId: string, name: string, extras: ValueExtras, self?: string): string | null {
  const attribute = catalog.byId.get(attributeId)
  if (!attribute || attribute.kind === 'range') return '이 속성에는 값을 추가할 수 없어요.'
  if (name === '') return '값을 입력해 주세요.'
  if (listOptions(attribute, editsCell.read()[attributeId]).some((o) => o.label === name && o.id !== self)) return '이미 있는 값이에요.'
  const { age, height, chance, part } = extras
  if (part !== undefined && (attribute.kind !== 'compose' || part < 0 || part >= attribute.parts.length)) return '없는 마디예요.'
  if (age) {
    if (!Number.isInteger(age.min) || !Number.isInteger(age.max) || age.min < 1) return '나이를 1세 이상으로 입력해 주세요.'
    if (age.max > 99999) return '나이는 99999세까지 입력할 수 있어요.'
    if (age.min > age.max) return '최소 나이가 최대보다 클 수 없어요.'
  }
  if (chance !== undefined && !(chance > 0 && chance <= 1)) return '확률은 1–100% 사이로 입력해 주세요.'
  if (height) {
    if (!Number.isInteger(height.min) || !Number.isInteger(height.max) || height.min < 1) return '키를 1cm 이상으로 입력해 주세요.'
    if (height.max > 99999) return '키는 99999cm까지 입력할 수 있어요.'
    if (height.min > height.max) return '최소 키가 최대보다 클 수 없어요.'
  }
  return null
}

/** Returns why the value could not be added, or null when it was. */
export function addOption(attributeId: string, label: string, extras: ValueExtras = {}): string | null {
  const name = label.trim()
  const problem = checkValue(attributeId, name, extras)
  if (problem) return problem
  const attribute = catalog.byId.get(attributeId)!
  const { age, height, chance, part, group } = extras
  const id = `u${Date.now().toString(36)}${Math.floor(Math.random() * 36 ** 2).toString(36)}`
  const colours = attribute.kind === 'color' ? { hex: extras.hex ?? '#7c7a85', ...(extras.hex2 ? { hex2: extras.hex2 } : {}) } : {}
  patch(attributeId, (e) => ({ ...e, added: [...e.added, { id, label: name.slice(0, 24), ...colours, ...(age ? { age } : {}), ...(height ? { height } : {}), ...(chance !== undefined ? { chance } : {}), ...(part ? { part } : {}), ...(group ? { group } : {}) }] }))
  return null
}

/**
 * Changes a value already in the list — the player's own in place, a
 * shipped one as a change laid over it (its id stays, so conditions on it
 * hold). Returns why it was refused, or null.
 */
export function editOption(attributeId: string, optionId: string, label: string, extras: ValueExtras = {}): string | null {
  const name = label.trim()
  const problem = checkValue(attributeId, name, extras, optionId)
  if (problem) return problem
  const attribute = catalog.byId.get(attributeId)!
  const { age, height, chance } = extras
  // Saved untouched: record nothing, so a shipped value keeps its line under it.
  const current = listOptions(attribute, editsCell.read()[attributeId]).find((o) => o.id === optionId)
  const span = attributeId === 'species' ? speciesSpans(catalog, editsCell.read()).get(optionId) : undefined
  const same = (a: { min: number; max: number } | null | undefined, b: { min: number; max: number } | undefined) => !b || (!!a && a.min === b.min && a.max === b.max)
  if (
    current &&
    current.label === name &&
    (attribute.kind !== 'color' || !extras.hex || [extras.hex, ...(extras.hex2 ? [extras.hex2] : [])].join() === current.swatches.join()) &&
    (chance === undefined || chance === current.chance) &&
    same(current.age ?? span?.age, age) &&
    same(current.height ?? span?.height, height)
  ) {
    return null
  }
  const colour = attribute.kind === 'color' && extras.hex ? { hex: extras.hex, hex2: extras.hex2 ?? null } : {}
  patch(attributeId, (e) => {
    const own = e.added.find((o) => o.id === optionId)
    if (own) {
      const { hex2: _, ...rest } = own
      const next = {
        ...rest,
        label: name.slice(0, 24),
        ...(colour.hex ? { hex: colour.hex, ...(colour.hex2 ? { hex2: colour.hex2 } : {}) } : own.hex2 ? { hex2: own.hex2 } : {}),
        ...(age ? { age } : {}),
        ...(height ? { height } : {}),
        ...(chance !== undefined ? { chance } : {}),
      }
      return { ...e, added: e.added.map((o) => (o.id === optionId ? next : o)) }
    }
    const change = { label: name.slice(0, 24), ...colour, ...(age ? { age } : {}), ...(height ? { height } : {}), ...(chance !== undefined ? { chance } : {}) }
    return { ...e, changed: { ...e.changed, [optionId]: { ...e.changed?.[optionId], ...change } } }
  })
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
/** One decimal place on, for a range that allows it (키). */
export function setDecimal(attributeId: string, on: boolean): void {
  patch(attributeId, (e) => {
    const { decimal: _, ...rest } = e
    return on ? { ...rest, decimal: true } : rest
  })
}

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
