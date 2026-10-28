import { describe, expect, test } from 'bun:test'

import { defineCatalog } from './catalog'
import { catalog } from './catalog/index'
import { decodeRollKey, encodeRollKey, rollCharacter } from './roll'
import { type AttributeOf, defineAttribute } from './schema'
import { speciesTable } from './catalog/species'

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
        // Only list kinds name their values; generated kinds describe how they roll.
        if (attribute.kind !== 'color' && !(attribute.kind === 'pick' && attribute.count === 1)) continue
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

describe('lifespan', () => {
  test('every species says its lifespan and no one outlives it', () => {
    for (const s of speciesTable) {
      const option = (catalog.byId.get('species') as AttributeOf<'pick'>).options.find((o) => o.id === s.id)!
      expect(option.hint).toContain('년')
    }
    for (let i = 0; i < 600; i++) {
      const values = rollCharacter(catalog, { seed: `l${i}`, attributeIds: ['world', 'species', 'age'] })
      const species = speciesTable.find((s) => s.id === values.find((v) => v.attributeId === 'species')!.valueIds[0])!
      const age = Number(values.find((v) => v.attributeId === 'age')!.label.replace(/[^0-9]/g, ''))
      expect(age).toBeLessThanOrEqual(species.lifespan.max)
    }
  })
})

describe('custom species', () => {
  test('its lifespan bounds its age and rides in the roll key', () => {
    const edits = {
      species: { disabled: speciesTable.map((s) => s.id), removed: [], added: [{ id: 'uX', label: '별사람', lifespan: { min: 20, max: 30 } }] },
    }
    for (let i = 0; i < 200; i++) {
      const request = { seed: `c${i}`, attributeIds: ['species', 'age'], nonces: {}, edits }
      const key = encodeRollKey(request)
      const values = rollCharacter(catalog, decodeRollKey(key)!)
      expect(values.find((v) => v.attributeId === 'species')!.detail).toBe('기대 수명 20–30년')
      const age = Number(values.find((v) => v.attributeId === 'age')!.label.replace(/[^0-9]/g, ''))
      expect(age).toBeGreaterThanOrEqual(3)
      expect(age).toBeLessThanOrEqual(29)
    }
  })
})

describe('compose edits', () => {
  test('a value added to the second part lands there and survives the roll key', () => {
    const epithet = catalog.byId.get('epithet') as AttributeOf<'compose'>
    const edits = {
      epithet: { disabled: epithet.parts[1]!.map((o) => o.id), removed: [], added: [{ id: 'uN', label: '고양이', part: 1 }] },
    }
    for (let i = 0; i < 50; i++) {
      const request = { seed: `e${i}`, attributeIds: ['epithet'], nonces: {}, edits }
      const values = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!)
      expect(values[0]!.label.endsWith(' 고양이')).toBe(true)
    }
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

describe('generated kinds', () => {
  test('date is a real day with the right star sign', async () => {
    const { dayOfYear, zodiacOf } = await import('./calendar')
    expect(dayOfYear(0)).toEqual({ month: 1, day: 1 })
    expect(dayOfYear(364)).toEqual({ month: 12, day: 31 })
    expect(zodiacOf(3, 14).label).toBe('물고기자리')
    expect(zodiacOf(1, 5).label).toBe('염소자리')
    expect(zodiacOf(12, 25).label).toBe('염소자리')
    for (let i = 0; i < 100; i++) {
      const [v] = rollCharacter(catalog, { seed: `b${i}`, attributeIds: ['birthday'] })
      expect(v!.label).toMatch(/^\d{1,2}월 \d{1,2}일$/)
      expect(v!.detail).toEndWith('자리')
    }
  })

  test('stats roll every stat within 1..max', () => {
    for (let i = 0; i < 100; i++) {
      const [v] = rollCharacter(catalog, { seed: `s${i}`, attributeIds: ['stats'] })
      const numbers = v!.label.split(' · ').map((part) => Number(part.split(' ').pop()))
      expect(numbers).toHaveLength(5)
      for (const n of numbers) expect(n >= 1 && n <= 10).toBe(true)
    }
  })

  test('traits can be none, one or several; conditions hold', () => {
    const counts = new Set<number>()
    for (let i = 0; i < 300; i++) {
      const values = rollCharacter(catalog, { seed: `t${i}`, attributeIds: ['world', 'species', 'traits'] })
      const traits = values.find((v) => v.attributeId === 'traits')!
      const species = values.find((v) => v.attributeId === 'species')!.valueIds[0]
      counts.add(traits.valueIds.length)
      if (traits.valueIds.includes('기계 의수')) expect(species).toBe('cyborg')
      if (traits.valueIds.length === 0) expect(traits.label).toBe('특이사항 없음')
    }
    expect(counts.has(0)).toBe(true)
    expect([...counts].some((n) => n >= 2)).toBe(true)
  })

  test('compose joins one word per part', () => {
    const [v] = rollCharacter(catalog, { seed: 'e1', attributeIds: ['epithet'] })
    expect(v!.label.split(' ').length).toBeGreaterThanOrEqual(2)
    expect(v!.valueIds).toHaveLength(2)
  })
})
