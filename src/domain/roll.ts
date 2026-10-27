import { generators, possibilities, type RollContext } from './generators'
import { createRng } from './rng'
import type { Attribute, AttributeKind, AttributeOf, RolledValue } from './schema'
import type { Catalog } from './catalog'

/**
 * A roll request. `nonces` bumps one attribute's stream — 키만 다시 뽑기 —
 * without disturbing the others.
 */
export interface RollRequest {
  seed: string
  attributeIds: readonly string[]
  nonces?: Readonly<Record<string, number>>
  /** Typed by the player, never rolled. Rides in the key so a link keeps it. */
  name?: string
}

function generate<K extends AttributeKind>(attribute: AttributeOf<K>, ctx: RollContext): RolledValue {
  return (generators[attribute.kind] as (a: AttributeOf<K>, c: RollContext) => RolledValue)(attribute, ctx)
}

/**
 * Rolls every requested attribute, dependencies first, and returns the values
 * in the order the request listed them.
 */
export function rollCharacter(catalog: Catalog, request: RollRequest): RolledValue[] {
  const wanted = new Set(request.attributeIds.filter((id) => catalog.byId.has(id)))
  const rolled = new Map<string, RolledValue>()

  for (const attribute of catalog.rollOrder) {
    if (!wanted.has(attribute.id)) continue
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

export function explainRoll(catalog: Catalog, request: RollRequest): ExplainedValue[] {
  const values = rollCharacter(catalog, request)
  const rolled = new Map(values.map((v) => [v.attributeId, v]))
  return values.map((value) => {
    // The attribute's own value must not constrain its own pool.
    const others = new Map(rolled)
    others.delete(value.attributeId)
    return { ...value, possible: possibilities(catalog.byId.get(value.attributeId)!, others) }
  })
}

/*
 * The roll key is the whole request in one string — it is the Relay record id
 * of a roll and the thing a URL carries. `seed~a.b.c~b:2~이름`. The name goes
 * last, so a `~` inside it cannot shift the other fields.
 */
export function encodeRollKey({ seed, attributeIds, nonces = {}, name }: RollRequest): string {
  const bumps = Object.entries(nonces)
    .filter(([, n]) => n > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, n]) => `${id}:${n}`)
  const parts = [seed, attributeIds.join('.'), bumps.join('.')]
  if (name) parts.push(name)
  return parts.join('~')
}

export function decodeRollKey(key: string): RollRequest | null {
  const [seed, ids, bumps = '', ...rest] = key.split('~')
  if (!seed || ids === undefined) return null
  const name = rest.join('~')
  const nonces: Record<string, number> = {}
  for (const bump of bumps.split('.').filter(Boolean)) {
    const [id, n] = bump.split(':')
    if (id && Number(n) > 0) nonces[id] = Number(n)
  }
  return { seed, attributeIds: ids.split('.').filter(Boolean), nonces, ...(name ? { name } : {}) }
}
