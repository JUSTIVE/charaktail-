import { applyEdits, packEdits, unpackEdits, type Edits } from './edits'
import { generators, possibilities, type RollContext } from './generators'
import { createRng } from './rng'
import { RolledValue, type Attribute, type AttributeKind, type AttributeOf } from './schema'
import type { Catalog } from './catalog'

/**
 * A roll request. `nonces` bumps one attribute's stream — 키만 다시 뽑기 —
 * without disturbing the others.
 */
export interface RollRequest {
  seed: string
  attributeIds: readonly string[]
  nonces?: Readonly<Record<string, number>> | undefined
  /** Typed by the player, never rolled. Rides in the key so a link keeps it. */
  name?: string | undefined
  /** The player's value-list edits the roll was drawn from. */
  edits?: Edits | undefined
  /**
   * Locked attributes: kept exactly as they were, not rolled. Their value ids
   * still feed the conditions of everything rolled after them.
   */
  locked?: Readonly<Record<string, RolledValue>> | undefined
}

function generate<K extends AttributeKind>(attribute: AttributeOf<K>, ctx: RollContext): RolledValue {
  return (generators[attribute.kind] as (a: AttributeOf<K>, c: RollContext) => RolledValue)(attribute, ctx)
}

/**
 * Rolls every requested attribute, dependencies first, and returns the values
 * in the order the request listed them.
 */
export function rollCharacter(base: Catalog, request: RollRequest): RolledValue[] {
  const catalog = applyEdits(base, request.edits)
  const wanted = new Set(request.attributeIds.filter((id) => catalog.byId.has(id)))
  const rolled = new Map<string, RolledValue>()

  for (const attribute of catalog.rollOrder) {
    if (!wanted.has(attribute.id)) continue
    const kept = request.locked?.[attribute.id]
    if (kept) {
      rolled.set(attribute.id, { ...kept, attributeId: attribute.id })
      continue
    }
    const nonce = request.nonces?.[attribute.id] ?? 0
    const rng = createRng(request.seed, attribute.id, nonce)
    rolled.set(attribute.id, generate(attribute as AttributeOf<Attribute['kind']>, { rng, rolled }))
  }

  return request.attributeIds.flatMap((id) => {
    const value = rolled.get(id)
    return value ? [value] : []
  })
}

/** A rolled value plus everything else it could have been. */
export interface ExplainedValue extends RolledValue {
  possible: string[]
}

export function explainRoll(base: Catalog, request: RollRequest): ExplainedValue[] {
  const catalog = applyEdits(base, request.edits)
  const values = rollCharacter(base, request)
  const rolled = new Map(values.map((v) => [v.attributeId, v]))
  return values.map((value) => {
    // The attribute's own value must not constrain its own pool.
    const others = new Map(rolled)
    others.delete(value.attributeId)
    return { ...value, possible: possibilities(catalog.byId.get(value.attributeId)!, others) }
  })
}

const toBase64Url = (text: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(text))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
const fromBase64Url = (text: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)))

/** Locked values, compact: id → [label, valueIds, detail, swatches]. Only the rolled attributes' go in. */
type PackedLocks = Record<string, [string, string[], string?, string[]?]>

function packLocks(locked: Readonly<Record<string, RolledValue>>, attributeIds: readonly string[]): string {
  const packed: PackedLocks = {}
  for (const id of attributeIds) {
    const v = locked[id]
    if (!v) continue
    packed[id] = v.swatches.length ? [v.label, v.valueIds, v.detail ?? '', v.swatches] : v.detail ? [v.label, v.valueIds, v.detail] : [v.label, v.valueIds]
  }
  return Object.keys(packed).length ? toBase64Url(JSON.stringify(packed)) : ''
}

function unpackLocks(text: string): Record<string, RolledValue> | undefined {
  if (!text) return undefined
  try {
    const packed = JSON.parse(fromBase64Url(text)) as PackedLocks
    const out: Record<string, RolledValue> = {}
    for (const [id, [label, valueIds, detail, swatches]] of Object.entries(packed)) {
      const parsed = RolledValue.safeParse({ attributeId: id, label, valueIds, swatches: swatches ?? [], ...(detail ? { detail } : {}) })
      if (parsed.success) out[id] = parsed.data
    }
    return out
  } catch {
    return undefined
  }
}

/*
 * The roll key is the whole request in one string — it is the Relay record id
 * of a roll and the thing a URL carries.
 * `seed~a.b.c~b:2~e:<edits>~l:<locked>~이름`. The edits and locked segments
 * are optional and marked; the name goes last, so a `~` inside it cannot
 * shift the other fields.
 */
export function encodeRollKey({ seed, attributeIds, nonces = {}, name, edits, locked }: RollRequest): string {
  const bumps = Object.entries(nonces)
    .filter(([, n]) => n > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, n]) => `${id}:${n}`)
  const parts = [seed, attributeIds.join('.'), bumps.join('.')]
  const packed = edits ? packEdits(edits, attributeIds) : ''
  const locks = locked ? packLocks(locked, attributeIds) : ''
  // Empty markers keep a name that itself starts with "e:" or "l:" unambiguous.
  const ambiguous = !!name && (name.startsWith('e:') || name.startsWith('l:'))
  if (packed || ambiguous) parts.push(`e:${packed}`)
  if (locks || ambiguous) parts.push(`l:${locks}`)
  if (name) parts.push(name)
  return parts.join('~')
}

export function decodeRollKey(key: string): RollRequest | null {
  const [seed, ids, bumps = '', ...rest] = key.split('~')
  if (!seed || ids === undefined) return null
  const edits = rest[0]?.startsWith('e:') ? unpackEdits(rest.shift()!.slice(2)) : undefined
  const locked = rest[0]?.startsWith('l:') ? unpackLocks(rest.shift()!.slice(2)) : undefined
  const name = rest.join('~')
  const nonces: Record<string, number> = {}
  for (const bump of bumps.split('.').filter(Boolean)) {
    const [id, n] = bump.split(':')
    if (id && Number(n) > 0) nonces[id] = Number(n)
  }
  return { seed, attributeIds: ids.split('.').filter(Boolean), nonces, ...(name ? { name } : {}), ...(edits ? { edits } : {}), ...(locked && Object.keys(locked).length ? { locked } : {}) }
}
