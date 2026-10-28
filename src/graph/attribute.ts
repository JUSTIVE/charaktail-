import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import { applyAttributeEdits, isEditable, isEdited, listOptions } from '../domain/edits'
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

/**
 * @relayType Attribute
 */
export function Attribute(id: DataID): AttributeRecord | null {
  return catalog.byId.get(id) ?? null
}

/**
 * The catalogue id, safe for URLs — Relay's own `__id` is a client DataID.
 * @relayField Attribute.key: String
 */
export function key(attribute: AttributeRecord): string {
  return attribute.id
}

/**
 * @relayField Attribute.label: String
 */
export function label(attribute: AttributeRecord): string {
  return attribute.label
}

/**
 * @relayField Attribute.color: String
 */
export function color(attribute: AttributeRecord): string {
  return attribute.color
}

/**
 * @relayField Attribute.description: String
 */
export function description(attribute: AttributeRecord): string {
  return attribute.description
}

/**
 * One line on what the attribute can become: "9가지 중 하나", "12–72세" —
 * counted after the player's edits, so switching a value off shows here.
 * @relayField Attribute.summary: String
 * @live
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
      return `${attribute.stats.map((s) => s.label).join('·')} · 1–${attribute.max}`
    case 'traits':
      return `${attribute.options.length}가지 특징 중 해당하는 것`
    case 'compose':
      return `${attribute.parts.map((part) => part.length).join('×')}가지 조합`
  }
}

/**
 * A handful of values to tease with — swatches for colours, labels otherwise.
 * @relayField Attribute.preview: [String!]
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

/**
 * @relayField Attribute.swatches: [String!]
 * @live
 */
export function swatches(attribute: AttributeRecord) {
  return editsCell.live((edits) => {
    const edited = applyAttributeEdits(attribute, edits[attribute.id])
    return edited.kind === 'color' ? edited.options.flatMap((o) => o.swatches).slice(0, 8) : []
  })
}

/**
 * @relayField Attribute.kind: String
 */
export function kind(attribute: AttributeRecord): string {
  return attribute.kind
}

/**
 * Whether there is a value list to edit — a numeric range has none.
 * @relayField Attribute.editable: Boolean
 */
export function editable(attribute: AttributeRecord): boolean {
  return isEditable(attribute)
}

/**
 * Names of a compose kind's parts, for grouping its value list.
 * @relayField Attribute.partLabels: [String!]
 */
export function partLabels(attribute: AttributeRecord): string[] {
  return attribute.kind === 'compose' ? attribute.parts.map((_, i) => attribute.partLabels[i] ?? `${i + 1}번째 마디`) : []
}

/**
 * @relayField Attribute.edited: Boolean
 * @live
 */
export function edited(attribute: AttributeRecord) {
  return editsCell.live((edits) => isEdited(edits[attribute.id]))
}

/**
 * Every value in the editor, with the player's switches and additions.
 * @relayField Attribute.options: [AttributeOption!]
 * @live
 */
export function options(attribute: AttributeRecord) {
  return editsCell.live((edits) => listOptions(attribute, edits[attribute.id]))
}

/**
 * @relayField Attribute.selected: Boolean
 * @live
 */
export function selected(attribute: AttributeRecord) {
  return selectionCell.live((ids) => ids.includes(attribute.id))
}

/**
 * Kept as it is through re-rolls.
 * @relayField Attribute.locked: Boolean
 * @live
 */
export function locked(attribute: AttributeRecord) {
  return locksCell.live((locks) => attribute.id in locks)
}

/**
 * Range attributes: the lower bound rolls draw from, after the player's edits.
 * @relayField Attribute.rangeMin: Float
 * @live
 */
export function rangeMin(attribute: AttributeRecord) {
  return editsCell.live((edits) => {
    const edited = applyAttributeEdits(attribute, edits[attribute.id])
    return edited.kind === 'range' ? edited.min : null
  })
}

/**
 * @relayField Attribute.rangeMax: Float
 * @live
 */
export function rangeMax(attribute: AttributeRecord) {
  return editsCell.live((edits) => {
    const edited = applyAttributeEdits(attribute, edits[attribute.id])
    return edited.kind === 'range' ? edited.max : null
  })
}

/**
 * @relayField Attribute.unit: String
 */
export function unit(attribute: AttributeRecord): string | null {
  return attribute.kind === 'range' ? attribute.unit : null
}

/**
 * Whether this range changes with 종족 — 키, 나이.
 * @relayField Attribute.dependsOnSpecies: Boolean
 */
export function dependsOnSpecies(attribute: AttributeRecord): boolean {
  return speciesDependent(catalog, attribute.id)
}

/**
 * This range as each enabled species would roll it, edits applied.
 * @relayField Attribute.speciesRanges: [SpeciesRange!]
 * @live
 */
export function speciesRanges(attribute: AttributeRecord) {
  return editsCell.live((edits) => rangesBySpecies(catalog, edits, attribute.id))
}

/**
 * Whether species (or another attribute) change this range by default.
 * @relayField Attribute.hasCases: Boolean
 */
export function hasCases(attribute: AttributeRecord): boolean {
  return attribute.kind === 'range' && attribute.cases.length > 0
}
