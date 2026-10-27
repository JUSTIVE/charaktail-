import { z } from 'zod'

import { ZODIAC_IDS } from './calendar'
import { Attribute, type AttributeInput, type Condition } from './schema'

export interface Catalog {
  /** Display order — the order catalogue files are listed in. */
  attributes: readonly Attribute[]
  byId: ReadonlyMap<string, Attribute>
  /** Dependencies before dependents, derived from every `when` in the data. */
  rollOrder: readonly Attribute[]
  /** attribute id → attributes its conditions read. */
  dependencies: ReadonlyMap<string, ReadonlySet<string>>
}

/** Every attribute a condition anywhere in this attribute points at. */
function conditionTargets(attribute: Attribute): Map<string, Set<string>> {
  const targets = new Map<string, Set<string>>()
  const withWhen = (items: readonly { when?: Condition | undefined }[]) => items.flatMap((o) => (o.when ? [o.when] : []))
  const conditions: Condition[] =
    attribute.kind === 'range'
      ? attribute.cases.map((c) => c.when)
      : attribute.kind === 'pick' || attribute.kind === 'color' || attribute.kind === 'traits'
        ? withWhen(attribute.options)
        : attribute.kind === 'compose'
          ? attribute.parts.flatMap(withWhen)
          : []
  for (const when of conditions) {
    for (const [attributeId, valueIds] of Object.entries(when)) {
      const set = targets.get(attributeId) ?? new Set()
      for (const id of valueIds) set.add(id)
      targets.set(attributeId, set)
    }
  }
  return targets
}

/** Value ids a condition may name, per kind. */
function knownValueIds(attribute: Attribute): Set<string> {
  switch (attribute.kind) {
    case 'pick':
    case 'color':
    case 'traits':
      return new Set(attribute.options.map((o) => o.id))
    case 'compose':
      return new Set(attribute.parts.flat().map((o) => o.id))
    case 'stats':
      return new Set(attribute.stats.map((s) => `best:${s.id}`))
    case 'date':
      return new Set([...Array.from({ length: 12 }, (_, i) => `m${i + 1}`), ...ZODIAC_IDS])
    case 'range': {
      const bands = [attribute.bands ?? [], ...attribute.cases.map((c) => c.bands ?? [])].flat()
      return new Set(bands.map((b) => b.label))
    }
  }
}

/**
 * Parses and cross-checks the catalogue once, at startup. A typo in a
 * condition, a duplicate id or a dependency cycle fails loudly here instead of
 * silently never matching at roll time.
 */
export function defineCatalog(inputs: readonly AttributeInput[]): Catalog {
  const attributes = inputs.map((input, index) => {
    const parsed = Attribute.safeParse(input)
    if (!parsed.success) {
      const name = (input as { id?: string }).id ?? `#${index}`
      throw new Error(`카탈로그의 속성 ${name}이(가) 스키마에 맞지 않습니다:\n${z.prettifyError(parsed.error)}`)
    }
    return parsed.data
  })

  const byId = new Map<string, Attribute>()
  for (const attribute of attributes) {
    if (byId.has(attribute.id)) throw new Error(`속성 id "${attribute.id}"가 중복됩니다`)
    byId.set(attribute.id, attribute)
  }

  const dependencies = new Map<string, Set<string>>()
  for (const attribute of attributes) {
    const targets = conditionTargets(attribute)
    for (const [targetId, valueIds] of targets) {
      const target = byId.get(targetId)
      if (!target) throw new Error(`${attribute.id}의 조건이 없는 속성 "${targetId}"를 가리킵니다`)
      if (targetId === attribute.id) throw new Error(`${attribute.id}의 조건이 자기 자신을 가리킵니다`)
      const known = knownValueIds(target)
      for (const id of valueIds) {
        if (!known.has(id)) throw new Error(`${attribute.id}의 조건이 ${targetId}에 없는 값 "${id}"를 가리킵니다`)
      }
    }
    dependencies.set(attribute.id, new Set(targets.keys()))
  }

  // Depth-first topological sort; a grey node seen twice is a cycle.
  const rollOrder: Attribute[] = []
  const state = new Map<string, 'visiting' | 'done'>()
  const visit = (id: string, path: string[]) => {
    if (state.get(id) === 'done') return
    if (state.get(id) === 'visiting') throw new Error(`속성 조건이 순환합니다: ${[...path, id].join(' → ')}`)
    state.set(id, 'visiting')
    for (const dep of dependencies.get(id) ?? []) visit(dep, [...path, id])
    state.set(id, 'done')
    rollOrder.push(byId.get(id)!)
  }
  for (const attribute of attributes) visit(attribute.id, [])

  return { attributes, byId, rollOrder, dependencies }
}
