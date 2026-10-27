import { describe, expect, test } from 'bun:test'

import { defineCatalog } from './catalog'
import { catalog } from './catalog/index'
import { decodeRollKey, encodeRollKey, rollCharacter } from './roll'
import { defineAttribute } from './schema'

const all = catalog.attributes.map((a) => a.id)

describe('catalog', () => {
  test('parses and orders dependencies first', () => {
    const order = catalog.rollOrder.map((a) => a.id)
    expect(order.indexOf('world')).toBeLessThan(order.indexOf('species'))
    expect(order.indexOf('species')).toBeLessThan(order.indexOf('age'))
  })

  test('rejects a condition on an unknown value', () => {
    const world = defineAttribute({ id: 'world', label: 'w', color: '#000000', kind: 'pick', options: ['a'] })
    const bad = defineAttribute({ id: 'x', label: 'x', color: '#000000', kind: 'pick', options: [{ label: 'y', when: { world: ['b'] } }] })
    expect(() => defineCatalog([world, bad])).toThrow(/없는 값 "b"/)
  })

  test('rejects a dependency cycle', () => {
    const a = defineAttribute({ id: 'a', label: 'a', color: '#000000', kind: 'pick', options: [{ label: '1', when: { b: ['1'] } }] })
    const b = defineAttribute({ id: 'b', label: 'b', color: '#000000', kind: 'pick', options: [{ label: '1', when: { a: ['1'] } }] })
    expect(() => defineCatalog([a, b])).toThrow(/순환/)
  })
})

describe('roll', () => {
  test('is deterministic for a seed', () => {
    expect(rollCharacter(catalog, { seed: 'abc', attributeIds: all })).toEqual(
      rollCharacter(catalog, { seed: 'abc', attributeIds: all }),
    )
  })

  test('a nonce re-rolls only its own stream', () => {
    const ids = ['gender', 'height', 'personality']
    const before = rollCharacter(catalog, { seed: 's', attributeIds: ids })
    const after = rollCharacter(catalog, { seed: 's', attributeIds: ids, nonces: { height: 3 } })
    expect(after[0]).toEqual(before[0]!)
    expect(after[2]).toEqual(before[2]!)
  })

  test('conditions hold across many seeds', () => {
    for (let i = 0; i < 400; i++) {
      const values = new Map(rollCharacter(catalog, { seed: `s${i}`, attributeIds: all }).map((v) => [v.attributeId, v]))
      const world = values.get('world')!.valueIds[0]
      const species = values.get('species')!.valueIds[0]
      if (species === 'alien') expect(world).toBe('spaceOpera')
      if (species === 'android') expect(values.get('age')!.label).toStartWith('제조 후')
      expect(values.get('personality')!.valueIds).toHaveLength(2)
    }
  })

  test('roll keys round-trip', () => {
    const request = { seed: 'k3y', attributeIds: ['world', 'age'], nonces: { age: 2 } }
    expect(decodeRollKey(encodeRollKey(request))).toEqual(request)
    const named = { ...request, name: '렌~제로' }
    expect(decodeRollKey(encodeRollKey(named))).toEqual(named)
  })
})

describe('explain', () => {
  test('a rolled value is always among its possibilities', async () => {
    const { explainRoll } = await import('./roll')
    for (let i = 0; i < 200; i++) {
      for (const value of explainRoll(catalog, { seed: `e${i}`, attributeIds: all })) {
        const attribute = catalog.byId.get(value.attributeId)!
        if (attribute.kind === 'range' || (attribute.kind === 'pick' && attribute.count > 1)) continue
        expect(value.possible).toContain(value.label)
      }
    }
  })
})

describe('edits', () => {
  test('disabled and removed values are never drawn; added ones can be', async () => {
    const { applyEdits } = await import('./edits')
    const edits = { gender: { disabled: ['여성'], removed: ['남성'], added: [{ id: 'u1', label: '안드로진' }] } }
    const seen = new Set<string>()
    for (let i = 0; i < 300; i++) {
      const [value] = rollCharacter(catalog, { seed: `d${i}`, attributeIds: ['gender'], edits })
      seen.add(value!.label)
    }
    expect(seen.has('여성')).toBe(false)
    expect(seen.has('남성')).toBe(false)
    expect(seen.has('안드로진')).toBe(true)
    expect(applyEdits(catalog, {})).toBe(catalog)
  })

  test('edits and a tricky name survive the roll key', () => {
    const request = {
      seed: 's',
      attributeIds: ['gender', 'eyeColor'],
      nonces: {},
      name: 'e:렌~',
      edits: { eyeColor: { disabled: ['흑갈색'], removed: [], added: [{ id: 'u2', label: '무지개', hex: '#ff00aa' }] } },
    }
    expect(decodeRollKey(encodeRollKey(request))).toEqual(request)
    const plain = { seed: 's', attributeIds: ['gender'], nonces: {}, name: 'e:x' }
    expect(decodeRollKey(encodeRollKey(plain))).toEqual(plain)
  })
})

describe('range edits', () => {
  test("the player's bounds win over every species case", () => {
    const edits = { age: { disabled: [], removed: [], added: [], min: 20, max: 25 } }
    for (let i = 0; i < 300; i++) {
      const values = rollCharacter(catalog, { seed: `r${i}`, attributeIds: ['world', 'species', 'age'], edits })
      const age = values.find((v) => v.attributeId === 'age')!
      const n = Number(age.label.replace(/[^0-9]/g, ''))
      expect(n).toBeGreaterThanOrEqual(20)
      expect(n).toBeLessThanOrEqual(25)
    }
  })

  test('bounds and a two-colour value survive the roll key', () => {
    const request = {
      seed: 's',
      attributeIds: ['age', 'eyeColor'],
      nonces: {},
      edits: {
        age: { disabled: [], removed: [], added: [], min: 18, max: 30 },
        eyeColor: { disabled: [], removed: [], added: [{ id: 'u3', label: '금청', hex: '#e8b923', hex2: '#6fb7ea' }] },
      },
    }
    expect(decodeRollKey(encodeRollKey(request))).toEqual(request)
  })
})
