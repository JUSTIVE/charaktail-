import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import { applyAttributeEdits, isEdited, isMultiple, listOptions, type Edits } from '../domain/edits'
import type { Attribute as AttributeRecord } from '../domain/schema'
import { dependsOnSpecies as speciesDependent, describeSpan, rangesBySpecies, speciesSpans } from '../domain/preview'
import { liveOf } from '../state/cell'
import { editsCell } from '../state/edits'
import { locksCell, releasedCell } from '../state/locks'
import { selectionCell } from '../state/selection'

/*
 * The attribute graph. The catalogue is the store: every field reads the
 * parsed schema data, and only `selected` — backed by a cell — is live.
 * Exported names must match field names; the compiler imports them by name.
 */

export const record = (id: DataID): AttributeRecord | null => catalog.byId.get(id) ?? null


/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 */
export function key(attribute: AttributeRecord): string {
  return attribute.id
}

export function label(attribute: AttributeRecord): string {
  return attribute.label
}

export function color(attribute: AttributeRecord): string {
  return attribute.color
}

export function description(attribute: AttributeRecord): string {
  return attribute.description
}

/**
 * One line on what the attribute can become: "9가지 중 하나", "12–72세" —
 * counted after the player's edits, so switching a value off shows here.
 */
export function summary(attribute: AttributeRecord) {
  return editsCell.live((edits) => summaryOf(applyAttributeEdits(attribute, edits[attribute.id])))
}

function summaryOf(attribute: AttributeRecord): string {
  switch (attribute.kind) {
    case 'range':
      // Species-specific spans only while the player hasn't set their own bounds.
      return `${attribute.min}–${attribute.max}${attribute.cases.some((c) => c.min !== undefined || c.max !== undefined) ? ' · 종족마다 다름' : ''}`
    case 'pick':
      return attribute.count > 1
        ? `${attribute.options.length}가지 중 ${attribute.count}개`
        : `${attribute.options.length}가지 중 하나`
    case 'color':
      return `${attribute.options.length}가지 색`
    case 'date':
      return attribute.zodiac ? '365일 중 하루 · 별자리' : '365일 중 하루'
    case 'stats':
      return `${attribute.stats.map((s) => s.label).join('·')} · ${attribute.min}–${attribute.max}`
    case 'traits':
      return attribute.max !== undefined && attribute.max < attribute.options.length
        ? `${attribute.options.length}가지 특징 중 최대 ${attribute.max}개`
        : `${attribute.options.length}가지 특징 중 해당하는 것`
    case 'compose':
      return `${attribute.parts.map((part) => part.length).join('×')}가지 조합`
  }
}

/**
 * A handful of values to tease with — swatches for colours, labels otherwise.
 */
export function preview(attribute: AttributeRecord): string[] {
  switch (attribute.kind) {
    case 'pick':
    case 'color':
    case 'traits':
      return attribute.options.slice(0, 4).map((o) => o.label)
    case 'compose':
      return attribute.parts.map((part) => part[0]?.label ?? '')
    case 'stats':
      return attribute.stats.map((s) => s.label)
    case 'date':
    case 'range':
      return []
  }
}

export function swatches(attribute: AttributeRecord) {
  return editsCell.live((edits) => {
    const edited = applyAttributeEdits(attribute, edits[attribute.id])
    return edited.kind === 'color' ? edited.options.flatMap((o) => o.swatches).slice(0, 8) : []
  })
}

/**
 * Names of a compose kind's parts, for grouping its value list.
 */
export function partLabels(attribute: AttributeRecord): string[] {
  return attribute.kind === 'compose' ? attribute.parts.map((_, i) => attribute.partLabels[i] ?? `${i + 1}번째 마디`) : []
}

export function edited(attribute: AttributeRecord) {
  return editsCell.live((edits) => isEdited(edits[attribute.id]))
}

/**
 * Every value in the editor, with the player's switches and additions.
 */
export function options(attribute: AttributeRecord) {
  return editsCell.live((edits) => {
    const list = listOptions(attribute, edits[attribute.id])
    if (attribute.id !== 'species') return list
    // Each species says the 나이 and 키 it rolls in — not its lifespan (#141).
    const spans = speciesSpans(catalog, edits)
    return list.map((option) => {
      const span = spans.get(option.id)
      const age = span?.age ?? null
      const height = span?.height ?? null
      const hint = [age ? `나이 ${describeSpan(age)}` : null, height ? `키 ${describeSpan(height)}` : null].filter(Boolean).join(' · ')
      return {
        ...option,
        hint: hint || option.hint,
        age: option.age ?? (age ? { min: age.min, max: age.max } : null),
        height: option.height ?? (height ? { min: height.min, max: height.max } : null),
      }
    })
  })
}

/**
 * How many of its values are switched on — the number on the picker chip.
 */
export function enabledCount(attribute: AttributeRecord) {
  // A date has no list: it is one of the year's 365 days.
  return editsCell.live((edits) => (attribute.kind === 'date' ? 365 : listOptions(attribute, edits[attribute.id]).filter((o) => o.enabled).length))
}

export function selected(attribute: AttributeRecord) {
  return selectionCell.live((ids) => ids.includes(attribute.id))
}

/**
 * Kept as it is through re-rolls.
 */
export function locked(attribute: AttributeRecord) {
  return locksCell.live((locks) => attribute.id in locks)
}

/**
 * Whether it can come out several at once — 외형 특징, 성격 키워드 두 개.
 */
export function multiple(attribute: AttributeRecord): boolean {
  return isMultiple(attribute)
}

/**
 * How many come out, after edits: exactly this many for a pick, at most this
 * many for 외형 특징 — null there while nothing caps it.
 */
export function count(attribute: AttributeRecord) {
  return editsCell.live((edits) => {
    const edited = applyAttributeEdits(attribute, edits[attribute.id])
    return edited.kind === 'pick' ? edited.count : edited.kind === 'traits' ? (edited.max ?? null) : null
  })
}

/**
 * The value it is locked at — what the next shake keeps — or null.
 */
export function lockedValue(attribute: AttributeRecord) {
  return locksCell.live((locks) => locks[attribute.id]?.label ?? null)
}

export function releasedValue(attribute: AttributeRecord) {
  return releasedCell.live((released) => released[attribute.id]?.label ?? null)
}

/** Only range and stats implement BoundedAttribute; anything else is a wiring bug. */
function bounded(attribute: AttributeRecord, edits: Edits): Extract<AttributeRecord, { kind: 'range' | 'stats' }> {
  const edited = applyAttributeEdits(attribute, edits[attribute.id])
  if (edited.kind !== 'range' && edited.kind !== 'stats') throw new Error(`${attribute.id} has no bounds`)
  return edited
}

/**
 * The lower bound rolls draw from, after the player's edits.
 */
export function rangeMin(attribute: AttributeRecord) {
  return editsCell.live((edits) => bounded(attribute, edits).min)
}

export function rangeMax(attribute: AttributeRecord) {
  return editsCell.live((edits) => bounded(attribute, edits).max)
}

/** Whether the player may switch on one decimal place. */
export function decimalToggle(attribute: AttributeRecord): boolean {
  return attribute.kind === 'range' && attribute.decimalToggle
}

/** Whether it is rolled to one decimal place now. */
export function decimal(attribute: AttributeRecord) {
  return editsCell.live((edits) => attribute.kind === 'range' && attribute.decimalToggle && !!edits[attribute.id]?.decimal)
}

export function unit(attribute: AttributeRecord): string {
  if (attribute.kind !== 'range') throw new Error(`${attribute.id} is not a range`)
  return attribute.unit
}

/**
 * The attribute this one's values are listed under in the editor — 직업 →
 * 세계관.
 */
export function groupBy(attribute: AttributeRecord): { id: string } | null {
  // defineCatalog checked that a groupBy names a pick attribute.
  return attribute.kind === 'pick' && attribute.groupBy ? { id: attribute.groupBy } : null
}

/**
 * Whether this range changes with 종족 — 키, 나이.
 */
export function dependsOnSpecies(attribute: AttributeRecord): boolean {
  return speciesDependent(catalog, attribute.id)
}

/**
 * This range as each enabled species would roll it, edits applied.
 */
export function speciesRanges(attribute: AttributeRecord) {
  return editsCell.live((edits) => rangesBySpecies(catalog, edits, attribute.id))
}

/**
 * Whether species (or another attribute) change this range by default.
 */
export function hasCases(attribute: AttributeRecord): boolean {
  return attribute.kind === 'range' && attribute.cases.length > 0
}

/** Everything a chip, a bubble or a card header shows of an attribute, in one read. */
export interface Head {
  key: string
  label: string
  color: string
  summary: string
  edited: boolean
  selected: boolean
  locked: boolean
  /** List kinds: how many values are on — 365 for a date. Null for a range. */
  enabledCount: number | null
  /** Several at once: exactly this many (a pick), at most (외형 특징; Infinity = 무제한). Null otherwise. */
  draws: number | null
  lockedValue: string | null
  releasedValue: string | null
}

/**
 * The chip's whole head as one live value (#192). Each of these was its own
 * resolver field before, and every query that showed chips carried all of
 * them for each of the seven kinds — ~100KB of generated code a query.
 */
export function head(attribute: AttributeRecord) {
  return liveOf([editsCell, selectionCell, locksCell, releasedCell], (): Head => {
    const edits = editsCell.read()[attribute.id]
    const edited = applyAttributeEdits(attribute, edits)
    const lock = locksCell.read()[attribute.id]
    return {
      key: attribute.id,
      label: attribute.label,
      color: attribute.color,
      summary: summaryOf(edited),
      edited: isEdited(edits),
      selected: selectionCell.read().includes(attribute.id),
      locked: !!lock,
      enabledCount: attribute.kind === 'date' ? 365 : attribute.kind === 'range' ? null : listOptions(attribute, edits).filter((o) => o.enabled).length,
      draws: isMultiple(attribute)
        ? edited.kind === 'pick'
          ? edited.count
          : edited.kind === 'traits'
            ? (edited.max ?? Number.POSITIVE_INFINITY)
            : null
        : null,
      lockedValue: lock?.label ?? null,
      releasedValue: releasedCell.read()[attribute.id]?.label ?? null,
    }
  })
}
