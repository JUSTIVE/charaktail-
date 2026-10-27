import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import type { Attribute as AttributeRecord } from '../domain/schema'
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
 * One line on what the attribute can become: "9가지 중 하나", "12–72세".
 * @relayField Attribute.summary: String
 */
export function summary(attribute: AttributeRecord): string {
  switch (attribute.kind) {
    case 'range':
      return `${attribute.min}–${attribute.max}${attribute.unit}${attribute.cases.length > 0 ? ' · 종족마다 다름' : ''}`
    case 'pick':
      return attribute.count > 1
        ? `${attribute.options.length}가지 중 ${attribute.count}개`
        : `${attribute.options.length}가지 중 하나`
    case 'color':
      return `${attribute.options.length}가지 색`
  }
}

/**
 * A handful of values to tease with — swatches for colours, labels otherwise.
 * @relayField Attribute.preview: [String!]
 */
export function preview(attribute: AttributeRecord): string[] {
  if (attribute.kind === 'range') return []
  return attribute.options.slice(0, 4).map((o) => o.label)
}

/**
 * @relayField Attribute.swatches: [String!]
 */
export function swatches(attribute: AttributeRecord): string[] {
  return attribute.kind === 'color' ? attribute.options.flatMap((o) => o.swatches).slice(0, 8) : []
}

/**
 * @relayField Attribute.selected: Boolean
 * @live
 */
export function selected(attribute: AttributeRecord) {
  return selectionCell.live((ids) => ids.includes(attribute.id))
}
