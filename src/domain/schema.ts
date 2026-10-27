import { z } from 'zod'

/*
 * The domain, as a schema. Everything the app knows about a character — which
 * attributes exist, what each can turn out to be, how likely each value is and
 * when it is allowed — is plain data validated here. Components, resolvers and
 * the shader never hard-code an attribute; they read the catalogue.
 *
 * Three levels of extension, from most to least common:
 *   1. add a value      → append to an attribute's `options` (a bare string works)
 *   2. add an attribute → drop a file in catalog/ and list it in catalog/index.ts
 *   3. add a kind       → add a variant to `Attribute` below and a generator in
 *                         generators.ts; the compiler points at every place left
 */

const Key = z.string().min(1)
const Hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, '#rrggbb 형식의 색이어야 합니다')

/**
 * When a value may be drawn: attribute id → value ids it must have rolled.
 * Every listed attribute must match (AND); within one attribute any listed
 * value does (OR). An attribute that was not rolled at all never blocks —
 * leaving 세계관 unselected opens every species, not none of them.
 */
export const Condition = z.record(Key, z.array(Key).min(1))
export type Condition = z.infer<typeof Condition>

const Weight = z.number().positive().default(1)

/** `'용감함'` is shorthand for `{ id: '용감함', label: '용감함' }`. */
const PickOption = z
  .union([
    Key,
    z.object({
      id: Key.optional(),
      label: Key,
      /** A line under the value — flavour, not data. */
      hint: z.string().optional(),
      weight: Weight,
      when: Condition.optional(),
    }),
  ])
  .transform((input) =>
    typeof input === 'string'
      ? { id: input, label: input, hint: undefined, weight: 1, when: undefined }
      : { ...input, id: input.id ?? input.label },
  )
export type PickOption = z.output<typeof PickOption>

const ColorOption = z
  .object({
    id: Key.optional(),
    label: Key,
    /** One swatch, or several for 오드아이·그라데이션 같은 값. */
    hex: z.union([Hex, z.array(Hex).min(1)]),
    hint: z.string().optional(),
    weight: Weight,
    when: Condition.optional(),
  })
  .transform(({ hex, ...input }) => ({
    ...input,
    id: input.id ?? input.label,
    swatches: Array.isArray(hex) ? hex : [hex],
  }))
export type ColorOption = z.output<typeof ColorOption>

/** Named stretches of a numeric range: `{ upTo: 19, label: '청소년' }`. */
const Band = z.object({ upTo: z.number(), label: Key })

const RangeSpec = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive().default(1),
  unit: z.string().default(''),
  /** 'normal' clusters around the middle — most people are of average height. */
  distribution: z.enum(['uniform', 'normal']).default('uniform'),
  bands: z.array(Band).optional(),
  /** Free-form line under the number, e.g. "제조 후". */
  prefix: z.string().optional(),
})

const Base = {
  id: Key.regex(/^[a-z][a-zA-Z0-9]*$/, 'camelCase 영문 id여야 합니다'),
  label: Key,
  /** The metaball's colour. */
  color: Hex,
  description: z.string().default(''),
  /** Ticked on first launch. */
  defaultSelected: z.boolean().default(false),
}

const PickAttribute = z.object({
  ...Base,
  kind: z.literal('pick'),
  options: z.array(PickOption).min(1),
  /** How many distinct values to draw — 성격 키워드 두 개 같은 경우. */
  count: z.number().int().positive().default(1),
})

const ColorAttribute = z.object({
  ...Base,
  kind: z.literal('color'),
  options: z.array(ColorOption).min(1),
})

const RangeAttribute = z.object({
  ...Base,
  kind: z.literal('range'),
  ...RangeSpec.shape,
  /** Overrides chosen by condition, first match wins: 엘프의 나이는 사람과 다르다. */
  cases: z.array(z.object({ when: Condition, ...RangeSpec.partial().shape })).default([]),
})

export const Attribute = z
  .discriminatedUnion('kind', [PickAttribute, ColorAttribute, RangeAttribute])
  .superRefine((attribute, ctx) => {
    if (attribute.kind === 'range') {
      for (const spec of [attribute, ...attribute.cases]) {
        if (spec.min !== undefined && spec.max !== undefined && spec.min > spec.max) {
          ctx.addIssue({ code: 'custom', message: `${attribute.id}: min(${spec.min}) > max(${spec.max})` })
        }
      }
      return
    }
    const ids = attribute.options.map((option) => option.id)
    const duplicate = ids.find((id, index) => ids.indexOf(id) !== index)
    if (duplicate) ctx.addIssue({ code: 'custom', message: `${attribute.id}: 값 id "${duplicate}"가 중복됩니다` })
  })

/** What a catalogue file writes. */
export type AttributeInput = z.input<typeof Attribute>
/** What the rest of the app reads — defaults filled, shorthands expanded. */
export type Attribute = z.output<typeof Attribute>
export type AttributeKind = Attribute['kind']
export type AttributeOf<K extends AttributeKind> = Extract<Attribute, { kind: K }>

/**
 * Typed identity for catalogue files: the editor checks the literal as it is
 * written, and parsing happens once, in `defineCatalog`, where cross-attribute
 * rules can be checked too.
 */
export function defineAttribute<const T extends AttributeInput>(input: T): T {
  return input
}

/** One attribute's outcome. */
export const RolledValue = z.object({
  attributeId: Key,
  /** Ids other attributes' conditions match against. */
  valueIds: z.array(Key),
  label: z.string(),
  detail: z.string().optional(),
  swatches: z.array(Hex).default([]),
})
export type RolledValue = z.infer<typeof RolledValue>
