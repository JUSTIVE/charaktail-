import { z } from 'zod'

import type { Catalog } from './catalog'
import { ageCase, ageRangeCase, describeLifespan } from './lifespan'
import type { Attribute } from './schema'

/*
 * The player's own edits to the catalogue: values switched off, built-in
 * values deleted, values of their own added. Edits are data like the
 * catalogue itself, validated the same way, and they never touch the
 * catalogue files — `applyEdits` lays them over it at roll time.
 */

const Hex = z.string().regex(/^#[0-9a-fA-F]{6}$/)

/** Whole years or centimetres, low to high. */
const Span = z
  .object({ min: z.number().int().positive(), max: z.number().int().positive() })
  .refine((s) => s.min <= s.max)
type Span = z.infer<typeof Span>

export const AddedOption = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(24),
  /** Colour attributes only. */
  hex: Hex.optional(),
  /** A second colour — 오드아이, 투톤. */
  hex2: Hex.optional(),
  /** Grouped kinds (직업 by 세계관): the group value it was added under. */
  group: z.string().min(1).optional(),
  /** Compose kinds: which part the value joins (0-based). */
  part: z.number().int().min(0).optional(),
  /** 종족 only, from before #141: its expected lifespan, which 나이 is then rolled within. */
  lifespan: Span.optional(),
  /** 종족 only: the span its 나이 is rolled in, given directly. Wins over `lifespan`. */
  age: Span.optional(),
  /** 외형 특징 only: its odds, 0–1. Unset, ADDED_TRAIT_CHANCE. */
  chance: z.number().gt(0).max(1).optional(),
  /** 종족 only: the span its 키 is rolled in, in cm. Species added before it fall back to 키's own. */
  height: Span.optional(),
})
export type AddedOption = z.infer<typeof AddedOption>

/**
 * The player's change to a shipped value — its name, colours, odds, or a
 * species' lifespan and 키. Its id stays, so every condition naming it still
 * holds.
 */
export const OptionChange = z.object({
  label: z.string().min(1).max(24).optional(),
  hex: Hex.optional(),
  /** null: one colour now, where it had two. */
  hex2: Hex.nullable().optional(),
  chance: z.number().gt(0).max(1).optional(),
  /** 종족: the span its 나이 is rolled in. */
  age: Span.optional(),
  height: Span.optional(),
})
export type OptionChange = z.infer<typeof OptionChange>

export const AttributeEdits = z.object({
  disabled: z.array(z.string()).default([]),
  removed: z.array(z.string()).default([]),
  added: z.array(AddedOption).default([]),
  /** Range attributes only: the player's own bounds, over every case. */
  min: z.number().finite().optional(),
  max: z.number().finite().optional(),
  /** Range attributes with `decimalToggle`: rolled to one decimal place. */
  decimal: z.boolean().optional(),
  /** Several-at-once kinds: how many a pick draws, or the most 외형 특징 that come out together. */
  count: z.number().int().positive().optional(),
  /** Shipped value id → the player's change to it. */
  changed: z.record(z.string(), OptionChange).optional(),
})
export type AttributeEdits = z.infer<typeof AttributeEdits>

export const Edits = z.record(z.string(), AttributeEdits)
export type Edits = z.infer<typeof Edits>

export function isEdited(edits: AttributeEdits | undefined): boolean {
  return (
    !!edits &&
    (edits.disabled.length > 0 || edits.removed.length > 0 || edits.added.length > 0 || edits.min !== undefined || edits.max !== undefined || edits.count !== undefined || edits.decimal !== undefined || Object.keys(edits.changed ?? {}).length > 0)
  )
}

/** Whether this kind has a value list to edit — a range has bounds instead, and the generated kinds have neither. */
export function isEditable(attribute: Attribute): boolean {
  return attribute.kind === 'pick' || attribute.kind === 'color' || attribute.kind === 'compose' || attribute.kind === 'stats' || attribute.kind === 'traits'
}

/** What a 외형 특징 of the player's own comes out at. */
export const ADDED_TRAIT_CHANCE = 0.2

/** Kinds that can come out several at once — 외형 특징, or a pick that draws more than one. */
export function isMultiple(attribute: Attribute): boolean {
  return attribute.kind === 'traits' || (attribute.kind === 'pick' && attribute.count > 1)
}

const swatchesOf = (o: AddedOption): string[] => [o.hex, o.hex2].filter((h): h is string => !!h)

export interface ListedOption {
  id: string
  label: string
  /** A line under the value, e.g. a species' lifespan. */
  hint: string | null
  /** Compose kinds: the part it belongs to; 0 otherwise. */
  part: number
  /** Grouped kinds: the group values it is listed under; empty means all of them. */
  groups: string[]
  enabled: boolean
  custom: boolean
  swatches: string[]
  /** 외형 특징: its odds, 0–1. */
  chance: number | null
  /** 종족: the 나이 span the player gave it — their own and changed ones; the graph fills in the rest. */
  age: Span | null
  /** 종족: likewise its 키 span. */
  height: Span | null
}

/** Shipped values with the player's changes laid over them. */
export function applyChanges(attribute: Attribute, changed: Record<string, OptionChange> | undefined): Attribute {
  if (!changed || Object.keys(changed).length === 0) return attribute
  // A changed value loses the catalogue's fixed line under it (말투's sample
  // sentence, a colour's note): it was written for the value as shipped.
  const label = <T extends { id: string; label: string }>(o: T): T => {
    const c = changed[o.id]
    if (!c) return o
    return { ...o, ...(c.label ? { label: c.label } : {}), ...('hint' in o ? { hint: undefined } : {}) }
  }
  switch (attribute.kind) {
    case 'pick':
      return {
        ...attribute,
        options: attribute.options.map((o) => {
          return label(o)
        }),
      }
    case 'color':
      return {
        ...attribute,
        options: attribute.options.map((o) => {
          const c = changed[o.id]
          const swatches = c?.hex ? [c.hex, ...(c.hex2 === null ? [] : c.hex2 ? [c.hex2] : o.swatches.slice(1, 2))] : o.swatches
          return label({ ...o, swatches })
        }),
      }
    case 'compose':
      return { ...attribute, parts: attribute.parts.map((part) => part.map(label)) }
    case 'stats':
      return { ...attribute, stats: attribute.stats.map(label) }
    case 'traits':
      return { ...attribute, options: attribute.options.map((o) => label({ ...o, chance: changed[o.id]?.chance ?? o.chance })) }
    default:
      return attribute
  }
}

/** Every value the player sees in the editor: built-ins left, then their own. */
export function listOptions(base: Attribute, edits: AttributeEdits | undefined): ListedOption[] {
  if (!isEditable(base)) return []
  const attribute = applyChanges(base, edits?.changed)
  const changed = edits?.changed ?? {}
  const removed = new Set(edits?.removed ?? [])
  const disabled = new Set(edits?.disabled ?? [])
  const groupBy = attribute.kind === 'pick' ? attribute.groupBy : undefined
  const groupsOf = (when: Record<string, string[]> | undefined) => (groupBy && when?.[groupBy]) || []
  const shipped: {
    id: string
    label: string
    hint?: string | undefined
    swatches: string[]
    part: number
    groups: string[]
    chance?: number | undefined
  }[] =
    attribute.kind === 'color'
      ? attribute.options.map((o) => ({ ...o, part: 0, groups: [] }))
      : attribute.kind === 'compose'
        ? attribute.parts.flatMap((options, part) => options.map((o) => ({ ...o, swatches: [], part, groups: [] })))
        : attribute.kind === 'pick'
          ? attribute.options.map((o) => ({ ...o, swatches: [], part: 0, groups: groupsOf(o.when) }))
          : attribute.kind === 'stats'
            ? attribute.stats.map((o) => ({ ...o, swatches: [], part: 0, groups: [] }))
            : attribute.kind === 'traits'
              ? attribute.options.map((o) => ({ ...o, hint: chanceHint(o.chance), swatches: [], part: 0, groups: [] }))
              : []
  const builtIn = shipped
    .filter((o) => !removed.has(o.id))
    .map((o) => ({
      id: o.id,
      label: o.label,
      hint: o.hint ?? null,
      part: o.part,
      groups: o.groups,
      enabled: !disabled.has(o.id),
      custom: false,
      swatches: o.swatches,
      chance: o.chance ?? null,
      age: changed[o.id]?.age ?? null,
      height: changed[o.id]?.height ?? null,
    }))
  // Within a part, values are listed together: the player's own after the shipped ones.
  const own = (edits?.added ?? []).map((o) => ({
    id: o.id,
    label: o.label,
    hint: attribute.kind === 'traits' ? chanceHint(o.chance ?? ADDED_TRAIT_CHANCE) : null,
    part: o.part ?? 0,
    groups: o.group ? [o.group] : [],
    enabled: !disabled.has(o.id),
    custom: true,
    swatches: swatchesOf(o),
    chance: attribute.kind === 'traits' ? (o.chance ?? ADDED_TRAIT_CHANCE) : null,
    age: o.age ?? null,
    height: o.height ?? null,
  }))
  return [...builtIn, ...own].sort((a, b) => a.part - b.part)
}

function chanceHint(chance: number): string {
  return `나올 확률 ${Math.round(chance * 100)}%`
}

/** One attribute with its edits applied. Never leaves a list empty. */
export function applyAttributeEdits(base: Attribute, edits: AttributeEdits | undefined): Attribute {
  if (!isEdited(edits)) return base
  const attribute = applyChanges(base, edits!.changed)
  if (attribute.kind === 'range') {
    // One decimal place reaches every case too: a species keeps its span, not its step.
    const stepped = edits!.decimal && attribute.decimalToggle ? { ...attribute, step: 0.1 } : attribute
    const min = edits!.min ?? attribute.min
    const max = edits!.max ?? attribute.max
    if ((edits!.min === undefined && edits!.max === undefined) || min > max) return stepped
    // The player's bounds are for when no species decides: a rolled species
    // keeps its own span (#142) — change that on the species itself.
    return { ...stepped, min, max }
  }
  if (attribute.kind !== 'pick' && attribute.kind !== 'color' && attribute.kind !== 'compose' && attribute.kind !== 'stats' && attribute.kind !== 'traits') return attribute
  const drop = new Set([...edits!.disabled, ...edits!.removed])
  const added = edits!.added.filter((o) => !drop.has(o.id))
  if (attribute.kind === 'traits') {
    const options = [
      ...attribute.options.filter((o) => !drop.has(o.id)),
      ...added.map((o) => ({ id: o.id, label: o.label, chance: o.chance ?? ADDED_TRAIT_CHANCE, when: undefined })),
    ]
    const max = edits!.count ?? attribute.max
    return { ...attribute, options: options.length > 0 ? options : attribute.options, ...(max !== undefined ? { max } : {}) }
  }
  if (attribute.kind === 'stats') {
    // Which stats to roll, and the span each one rolls in.
    const kept = [...attribute.stats.filter((s) => !drop.has(s.id)), ...added.map((o) => ({ id: o.id, label: o.label }))]
    const min = edits!.min ?? attribute.min
    const max = edits!.max ?? attribute.max
    return { ...attribute, stats: kept.length > 0 ? kept : attribute.stats, ...(min <= max ? { min, max } : {}) }
  }
  if (attribute.kind === 'compose') {
    // Each part keeps at least one value: a part emptied by edits falls back to its shipped list.
    const parts = attribute.parts.map((options, part) => {
      const kept = [
        ...options.filter((o) => !drop.has(o.id)),
        ...added.filter((o) => (o.part ?? 0) === part).map((o) => ({ id: o.id, label: o.label, hint: undefined, weight: 1, when: undefined })),
      ]
      return kept.length > 0 ? kept : options
    })
    return { ...attribute, parts }
  }
  if (attribute.kind === 'color') {
    const options = [
      ...attribute.options.filter((o) => !drop.has(o.id)),
      ...added.map((o) => ({ id: o.id, label: o.label, hint: undefined, weight: 1, when: undefined, swatches: swatchesOf(o).length ? swatchesOf(o) : ['#7c7a85'] })),
    ]
    return options.length > 0 ? { ...attribute, options } : attribute
  }
  const options = [
    ...attribute.options.filter((o) => !drop.has(o.id)),
    ...added.map((o) => ({
      id: o.id,
      label: o.label,
      hint: o.lifespan ? describeLifespan(o.lifespan) : undefined,
      weight: 1,
      // Added under a group, it belongs there — 하이 판타지에 추가한 직업은 하이 판타지의 것.
      when: o.group && attribute.groupBy ? { [attribute.groupBy]: [o.group] } : undefined,
    })),
  ]
  // Only a pick that draws several takes a count — a stale one on 성격 is ignored.
  const count = attribute.kind === 'pick' && isMultiple(attribute) ? { count: edits!.count ?? attribute.count } : {}
  return options.length > 0 ? { ...attribute, options, ...count } : { ...attribute, ...count }
}

type RangeCase = Extract<Attribute, { kind: 'range' }>['cases'][number]

/** 키 for one species from its own span, read against that species — 별사람치고 큰. */
function heightCase(id: string, label: string, { min, max }: Span): RangeCase {
  const third = (max - min) / 3
  const bands = [
    { upTo: Math.round(min + third), label: `${label}치고 작은` },
    { upTo: Math.round(max - third), label: '평균' },
    { upTo: Number.MAX_SAFE_INTEGER, label: `${label}치고 큰` },
  ]
  return { when: { species: [id] }, min, max, bands }
}

/**
 * Species bring their lifespans to 나이 and their spans to 키 as cases: the
 * player's own appended, a changed shipped one put first so it wins over the
 * catalogue's — all before those attributes' own edits, so the player's
 * bounds still win over them.
 */
function withSpeciesEdits(attribute: Attribute, catalog: Catalog, edits: Edits): Attribute {
  if ((attribute.id !== 'age' && attribute.id !== 'height') || attribute.kind !== 'range') return attribute
  const species = edits['species']
  const drop = new Set([...(species?.disabled ?? []), ...(species?.removed ?? [])])
  const isAge = attribute.id === 'age'
  const own = (species?.added ?? []).flatMap((o): RangeCase[] => {
    if (drop.has(o.id)) return []
    if (isAge) return o.age ? [ageRangeCase(o.id, o.age)] : o.lifespan ? [ageCase(o.id, o.lifespan)] : []
    return o.height ? [heightCase(o.id, o.label, o.height)] : []
  })
  const shipped = catalog.byId.get('species')
  const labelOf = (id: string) => species?.changed?.[id]?.label ?? (shipped?.kind === 'pick' ? shipped.options.find((o) => o.id === id)?.label : undefined) ?? id
  const changed = Object.entries(species?.changed ?? {}).flatMap(([id, c]): RangeCase[] => {
    if (drop.has(id)) return []
    if (isAge) {
      if (!c.age) return []
      // Its own way of counting stays (유령은 사망 당시, 안드로이드는 제조 후), with the new span.
      const own = attribute.cases.find((k) => Object.keys(k.when).length === 1 && k.when['species']?.length === 1 && k.when['species'][0] === id)
      // No case of its own (인간): 나이's own bands still read right for it.
      return [own ? { ...own, min: c.age.min, max: c.age.max } : { when: { species: [id] }, min: c.age.min, max: c.age.max }]
    }
    return c.height ? [heightCase(id, labelOf(id), c.height)] : []
  })
  return own.length || changed.length ? { ...attribute, cases: [...changed, ...attribute.cases, ...own] } : attribute
}

export function applyEdits(catalog: Catalog, edits: Edits | undefined): Catalog {
  if (!edits || !Object.values(edits).some(isEdited)) return catalog
  const attributes = catalog.attributes.map((a) => applyAttributeEdits(withSpeciesEdits(a, catalog, edits), edits[a.id]))
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
    /** How many come out — a pick's draw, or the 외형 특징 cap. */
    c?: number | undefined
    /** 1: a range rolled to one decimal place. */
    t?: 1 | undefined
    /** Added option id → the group it was added under. */
    g?: Record<string, string> | undefined
    /** Added option id → compose part, when not the first. */
    p?: Record<string, number> | undefined
    /** Added option id → [min, max] 나이. */
    y?: Record<string, [number, number]> | undefined
    /** Added option id → [min, max] lifespan. */
    l?: Record<string, [number, number]> | undefined
    /** Added option id → its 외형 특징 odds, in whole percent. */
    q?: Record<string, number> | undefined
    /** Shipped value id → the player's change to it. */
    o?: Record<string, OptionChange> | undefined
    /** Added option id → [min, max] 키 in cm. */
    h?: Record<string, [number, number]> | undefined
  }
>

/** `keyOf` names each attribute in the packed form — the roll key uses its two-letter code. */
export function packEdits(edits: Edits, attributeIds: readonly string[], keyOf: (id: string) => string = (id) => id): string {
  const packed: Packed = {}
  for (const id of attributeIds) {
    const e = edits[id]
    if (!isEdited(e)) continue
    packed[keyOf(id)] = {
      ...(e!.disabled.length ? { d: e!.disabled } : {}),
      ...(e!.removed.length ? { r: e!.removed } : {}),
      ...(e!.added.length
        ? { a: e!.added.map((o) => [o.id, o.label, ...(o.hex ? [o.hex] : []), ...(o.hex2 ? [o.hex2] : [])]) as Packed[string]['a'] }
        : {}),
      ...(e!.min !== undefined ? { n: e!.min } : {}),
      ...(e!.max !== undefined ? { x: e!.max } : {}),
      ...(e!.count !== undefined ? { c: e!.count } : {}),
      ...(e!.decimal ? { t: 1 as const } : {}),
      ...(Object.keys(e!.changed ?? {}).length ? { o: e!.changed } : {}),
      ...(e!.added.some((o) => o.group)
        ? { g: Object.fromEntries(e!.added.flatMap((o) => (o.group ? [[o.id, o.group]] : []))) }
        : {}),
      ...(e!.added.some((o) => o.part)
        ? { p: Object.fromEntries(e!.added.flatMap((o) => (o.part ? [[o.id, o.part]] : []))) }
        : {}),
      ...(e!.added.some((o) => o.lifespan)
        ? { l: Object.fromEntries(e!.added.flatMap((o) => (o.lifespan ? [[o.id, [o.lifespan.min, o.lifespan.max]]] : []))) }
        : {}),
      ...(e!.added.some((o) => o.chance !== undefined)
        ? { q: Object.fromEntries(e!.added.flatMap((o) => (o.chance !== undefined ? [[o.id, Math.round(o.chance * 100)]] : []))) }
        : {}),
      ...(e!.added.some((o) => o.age)
        ? { y: Object.fromEntries(e!.added.flatMap((o) => (o.age ? [[o.id, [o.age.min, o.age.max]]] : []))) }
        : {}),
      ...(e!.added.some((o) => o.height)
        ? { h: Object.fromEntries(e!.added.flatMap((o) => (o.height ? [[o.id, [o.height.min, o.height.max]]] : []))) }
        : {}),
    }
  }
  if (Object.keys(packed).length === 0) return ''
  const bytes = new TextEncoder().encode(JSON.stringify(packed))
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function unpackEdits(text: string, idOf: (key: string) => string = (key) => key): Edits | undefined {
  if (!text) return undefined
  try {
    const binary = atob(text.replace(/-/g, '+').replace(/_/g, '/'))
    const packed = JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)))) as Packed
    const edits = Object.fromEntries(
      Object.entries(packed).map(([key, p]) => [
        idOf(key),
        {
          disabled: p.d ?? [],
          removed: p.r ?? [],
          added: (p.a ?? []).map(([oid, label, hex, hex2]) => {
            const life = p.l?.[oid]
            const height = p.h?.[oid]
            const age = p.y?.[oid]
            const percent = p.q?.[oid]
            const part = p.p?.[oid]
            const group = p.g?.[oid]
            return {
              id: oid,
              label,
              ...(hex ? { hex } : {}),
              ...(hex2 ? { hex2 } : {}),
              ...(part ? { part } : {}),
              ...(group ? { group } : {}),
              ...(life ? { lifespan: { min: life[0], max: life[1] } } : {}),
              ...(height ? { height: { min: height[0], max: height[1] } } : {}),
              ...(age ? { age: { min: age[0], max: age[1] } } : {}),
              ...(percent !== undefined ? { chance: percent / 100 } : {}),
            }
          }),
          ...(p.n !== undefined ? { min: p.n } : {}),
          ...(p.x !== undefined ? { max: p.x } : {}),
          ...(p.c !== undefined ? { count: p.c } : {}),
          ...(p.t ? { decimal: true } : {}),
          ...(p.o ? { changed: p.o } : {}),
        },
      ]),
    )
    const parsed = Edits.safeParse(edits)
    return parsed.success ? parsed.data : undefined
  } catch {
    return undefined
  }
}
