import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import { applyAttributeEdits, isEdited, listOptions, type Edits } from '../domain/edits'
import type { Attribute as AttributeRecord } from '../domain/schema'
import { dependsOnSpecies as speciesDependent, rangesBySpecies } from '../domain/preview'
import { editsCell } from '../state/edits'
import { locksCell } from '../state/locks'
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
      return `${attribute.options.length}가지 특징 중 해당하는 것`
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
  return editsCell.live((edits) => listOptions(attribute, edits[attribute.id]))
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
