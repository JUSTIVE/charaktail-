import { z } from 'zod'

import type { Catalog } from './catalog'
import { ageCase, describeLifespan } from './lifespan'
import type { Attribute } from './schema'

/*
 * The player's own edits to the catalogue: values switched off, built-in
 * values deleted, values of their own added. Edits are data like the
 * catalogue itself, validated the same way, and they never touch the
 * catalogue files — `applyEdits` lays them over it at roll time.
 */

const Hex = z.string().regex(/^#[0-9a-fA-F]{6}$/)

export const AddedOption = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(24),
  /** Colour attributes only. */
  hex: Hex.optional(),
  /** A second colour — 오드아이, 투톤. */
  hex2: Hex.optional(),
  /** 종족 only: its expected lifespan, which 나이 is then rolled within. */
  lifespan: z
    .object({ min: z.number().int().positive(), max: z.number().int().positive() })
    .refine((l) => l.min <= l.max)
    .optional(),
})
export type AddedOption = z.infer<typeof AddedOption>

export const AttributeEdits = z.object({
  disabled: z.array(z.string()).default([]),
  removed: z.array(z.string()).default([]),
  added: z.array(AddedOption).default([]),
  /** Range attributes only: the player's own bounds, over every case. */
  min: z.number().finite().optional(),
  max: z.number().finite().optional(),
})
export type AttributeEdits = z.infer<typeof AttributeEdits>

export const Edits = z.record(z.string(), AttributeEdits)
export type Edits = z.infer<typeof Edits>

export function isEdited(edits: AttributeEdits | undefined): boolean {
  return (
    !!edits &&
    (edits.disabled.length > 0 || edits.removed.length > 0 || edits.added.length > 0 || edits.min !== undefined || edits.max !== undefined)
  )
}

/** Whether this kind has a value list to edit — a range has bounds instead, and the generated kinds have neither. */
export function isEditable(attribute: Attribute): boolean {
  return attribute.kind === 'pick' || attribute.kind === 'color'
}

const swatchesOf = (o: AddedOption): string[] => [o.hex, o.hex2].filter((h): h is string => !!h)

export interface ListedOption {
  id: string
  label: string
  /** A line under the value, e.g. a species' lifespan. */
  hint: string | null
  enabled: boolean
  custom: boolean
  swatches: string[]
}

/** Every value the player sees in the editor: built-ins left, then their own. */
export function listOptions(attribute: Attribute, edits: AttributeEdits | undefined): ListedOption[] {
  if (attribute.kind !== 'pick' && attribute.kind !== 'color') return []
  const removed = new Set(edits?.removed ?? [])
  const disabled = new Set(edits?.disabled ?? [])
  const shipped: { id: string; label: string; hint?: string | undefined; swatches: string[] }[] =
    attribute.kind === 'color' ? attribute.options : attribute.options.map((o) => ({ ...o, swatches: [] }))
  const builtIn = shipped
    .filter((o) => !removed.has(o.id))
    .map((o) => ({ id: o.id, label: o.label, hint: o.hint ?? null, enabled: !disabled.has(o.id), custom: false, swatches: o.swatches }))
  const own = (edits?.added ?? []).map((o) => ({
    id: o.id,
    label: o.label,
    hint: o.lifespan ? describeLifespan(o.lifespan) : null,
    enabled: !disabled.has(o.id),
    custom: true,
    swatches: swatchesOf(o),
  }))
  return [...builtIn, ...own]
}

/** One attribute with its edits applied. Never leaves a list empty. */
export function applyAttributeEdits(attribute: Attribute, edits: AttributeEdits | undefined): Attribute {
  if (!isEdited(edits)) return attribute
  if (attribute.kind === 'range') {
    const min = edits!.min ?? attribute.min
    const max = edits!.max ?? attribute.max
    if ((edits!.min === undefined && edits!.max === undefined) || min > max) return attribute
    // The player's bounds win over every case: species keep their unit,
    // prefix and bands, but no longer their own span.
    const cases = attribute.cases.map(({ min: _min, max: _max, ...rest }) => rest)
    return { ...attribute, min, max, cases }
  }
  if (attribute.kind !== 'pick' && attribute.kind !== 'color') return attribute
  const drop = new Set([...edits!.disabled, ...edits!.removed])
  const added = edits!.added.filter((o) => !drop.has(o.id))
  if (attribute.kind === 'color') {
    const options = [
      ...attribute.options.filter((o) => !drop.has(o.id)),
      ...added.map((o) => ({ id: o.id, label: o.label, hint: undefined, weight: 1, when: undefined, swatches: swatchesOf(o).length ? swatchesOf(o) : ['#7c7a85'] })),
    ]
    return options.length > 0 ? { ...attribute, options } : attribute
  }
  const options = [
    ...attribute.options.filter((o) => !drop.has(o.id)),
    ...added.map((o) => ({ id: o.id, label: o.label, hint: o.lifespan ? describeLifespan(o.lifespan) : undefined, weight: 1, when: undefined })),
  ]
  return options.length > 0 ? { ...attribute, options } : attribute
}

/**
 * The player's own species bring their lifespans to 나이 as extra cases —
 * before 나이's own edits, so the player's bounds still win over them.
 */
function withCustomLifespans(attribute: Attribute, edits: Edits): Attribute {
  if (attribute.id !== 'age' || attribute.kind !== 'range') return attribute
  const drop = new Set([...(edits['species']?.disabled ?? []), ...(edits['species']?.removed ?? [])])
  const cases = (edits['species']?.added ?? []).flatMap((o) => (o.lifespan && !drop.has(o.id) ? [ageCase(o.id, o.lifespan)] : []))
  return cases.length ? { ...attribute, cases: [...attribute.cases, ...cases] } : attribute
}

export function applyEdits(catalog: Catalog, edits: Edits | undefined): Catalog {
  if (!edits || !Object.values(edits).some(isEdited)) return catalog
  const attributes = catalog.attributes.map((a) => applyAttributeEdits(withCustomLifespans(a, edits), edits[a.id]))
  const byId = new Map(attributes.map((a) => [a.id, a]))
  return { ...catalog, attributes, byId, rollOrder: catalog.rollOrder.map((a) => byId.get(a.id)!) }
}

/*
 * Edits travel inside a roll key, so a saved or shared character keeps the
 * value lists it was rolled from even after the player edits again. Only the
 * rolled attributes' edits go in, as compact JSON in base64url.
 */
type Packed = Record<
  string,
  {
    d?: string[] | undefined
    r?: string[] | undefined
    a?: [string, string, string?, string?][] | undefined
    n?: number | undefined
    x?: number | undefined
    /** Added option id → [min, max] lifespan. */
    l?: Record<string, [number, number]> | undefined
  }
>

export function packEdits(edits: Edits, attributeIds: readonly string[]): string {
  const packed: Packed = {}
  for (const id of attributeIds) {
    const e = edits[id]
    if (!isEdited(e)) continue
    packed[id] = {
      ...(e!.disabled.length ? { d: e!.disabled } : {}),
      ...(e!.removed.length ? { r: e!.removed } : {}),
      ...(e!.added.length
        ? { a: e!.added.map((o) => [o.id, o.label, ...(o.hex ? [o.hex] : []), ...(o.hex2 ? [o.hex2] : [])]) as Packed[string]['a'] }
        : {}),
      ...(e!.min !== undefined ? { n: e!.min } : {}),
      ...(e!.max !== undefined ? { x: e!.max } : {}),
      ...(e!.added.some((o) => o.lifespan)
        ? { l: Object.fromEntries(e!.added.flatMap((o) => (o.lifespan ? [[o.id, [o.lifespan.min, o.lifespan.max]]] : []))) }
        : {}),
    }
  }
  if (Object.keys(packed).length === 0) return ''
  const bytes = new TextEncoder().encode(JSON.stringify(packed))
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function unpackEdits(text: string): Edits | undefined {
  if (!text) return undefined
  try {
    const binary = atob(text.replace(/-/g, '+').replace(/_/g, '/'))
    const packed = JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)))) as Packed
    const edits = Object.fromEntries(
      Object.entries(packed).map(([id, p]) => [
        id,
        {
          disabled: p.d ?? [],
          removed: p.r ?? [],
          added: (p.a ?? []).map(([oid, label, hex, hex2]) => {
            const life = p.l?.[oid]
            return { id: oid, label, ...(hex ? { hex } : {}), ...(hex2 ? { hex2 } : {}), ...(life ? { lifespan: { min: life[0], max: life[1] } } : {}) }
          }),
          ...(p.n !== undefined ? { min: p.n } : {}),
          ...(p.x !== undefined ? { max: p.x } : {}),
        },
      ]),
    )
    const parsed = Edits.safeParse(edits)
    return parsed.success ? parsed.data : undefined
  } catch {
    return undefined
  }
}
