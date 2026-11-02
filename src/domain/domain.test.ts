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
    const world = defineAttribute({ id: 'world', code: 'wd', label: 'w', color: '#000000', kind: 'pick', options: ['a'] })
    const bad = defineAttribute({ id: 'x', code: 'xx', label: 'x', color: '#000000', kind: 'pick', options: [{ label: 'y', when: { world: ['b'] } }] })
    expect(() => defineCatalog([world, bad])).toThrow(/없는 값 "b"/)
  })

  test('rejects a duplicate URL code', () => {
    const a = defineAttribute({ id: 'a', code: 'zz', label: 'a', color: '#000000', kind: 'pick', options: ['1'] })
    const b = defineAttribute({ id: 'b', code: 'zz', label: 'b', color: '#000000', kind: 'pick', options: ['1'] })
    expect(() => defineCatalog([a, b])).toThrow(/코드 "zz"/)
  })

  test('rejects a dependency cycle', () => {
    const a = defineAttribute({ id: 'a', code: 'aa', label: 'a', color: '#000000', kind: 'pick', options: [{ label: '1', when: { b: ['1'] } }] })
    const b = defineAttribute({ id: 'b', code: 'bb', label: 'b', color: '#000000', kind: 'pick', options: [{ label: '1', when: { a: ['1'] } }] })
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
      // One personality; two only when 이중인격.
      expect(values.get('personality')!.valueIds).toHaveLength(values.get('personality')!.label.includes('⇄') ? 2 : 1)
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
        // A split (이중인격) names two sets at once, so it is no single value either.
        if (attribute.kind !== 'color' && !(attribute.kind === 'pick' && value.valueIds.length === 1)) continue
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

  test('its 키 span bounds its height, is read against it, and rides in the roll key', () => {
    const edits = {
      species: {
        disabled: speciesTable.map((s) => s.id),
        removed: [],
        added: [{ id: 'uX', label: '별사람', lifespan: { min: 20, max: 30 }, height: { min: 300, max: 330 } }],
      },
    }
    const bands = new Set<string>()
    for (let i = 0; i < 200; i++) {
      const request = { seed: `h${i}`, attributeIds: ['species', 'height'], nonces: {}, edits }
      const values = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!)
      const height = values.find((v) => v.attributeId === 'height')!
      const cm = Number(height.label.replace(/[^0-9]/g, ''))
      expect(cm).toBeGreaterThanOrEqual(300)
      expect(cm).toBeLessThanOrEqual(330)
      if (height.detail) bands.add(height.detail)
    }
    expect([...bands].some((b) => b.includes('별사람치고'))).toBe(true)
  })
})

describe('several at once', () => {
  test('외형 특징 keep at most the cap, take values of the player\'s own, and the cap rides in the roll key', () => {
    const edits = { traits: { disabled: [], removed: [], added: [{ id: 'uT', label: '별 문신' }], count: 2 } }
    const counts = new Set<number>()
    let own = false
    for (let i = 0; i < 400; i++) {
      const request = { seed: `x${i}`, attributeIds: ['species', 'traits'], nonces: {}, edits }
      const traits = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!).find((v) => v.attributeId === 'traits')!
      expect(traits.valueIds.length).toBeLessThanOrEqual(2)
      counts.add(traits.valueIds.length)
      own ||= traits.valueIds.includes('uT')
    }
    expect([...counts].sort()).toEqual([0, 1, 2])
    expect(own).toBe(true)
  })

  test('a 외형 특징 of the player\'s own comes out at its own odds, kept in the roll key', () => {
    const edits = { traits: { disabled: [], removed: [], added: [{ id: 'uA', label: '늘 있는 것', chance: 1 }, { id: 'uB', label: '없는 것', chance: 0.01 }] } }
    let rare = 0
    for (let i = 0; i < 200; i++) {
      const request = { seed: `q${i}`, attributeIds: ['traits'], nonces: {}, edits }
      const traits = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!)[0]!
      expect(traits.valueIds).toContain('uA')
      if (traits.valueIds.includes('uB')) rare++
    }
    expect(rare).toBeLessThan(10)
  })

  test('without a cap, 외형 특징 roll exactly as before', () => {
    const plain = { seed: 'same', attributeIds: ['species', 'traits'] }
    const edited = { ...plain, edits: { traits: { disabled: [], removed: [], added: [], count: 99 } } }
    for (let i = 0; i < 100; i++) {
      expect(rollCharacter(catalog, { ...edited, seed: `s${i}` })).toEqual(rollCharacter(catalog, { ...plain, seed: `s${i}` }))
    }
  })

  test('성격 stays at one even with a count left over from before', () => {
    const edits = { personality: { disabled: [], removed: [], added: [], count: 3 } }
    const value = rollCharacter(catalog, { seed: 'one', attributeIds: ['personality'], edits })[0]!
    expect(value.valueIds).toHaveLength(1)
  })

  test('a pick draws as many as the player says', () => {
    const edits = { accessory: { disabled: [], removed: [], added: [], count: 4 } }
    for (let i = 0; i < 50; i++) {
      const request = { seed: `a${i}`, attributeIds: ['accessory'], nonces: {}, edits }
      const value = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!)[0]!
      expect(new Set(value.valueIds).size).toBe(4)
    }
  })
})

describe('split', () => {
  test('이중인격 shows up about once in a thousand, as two personalities that share nothing', () => {
    let splits = 0
    for (let i = 0; i < 20000; i++) {
      const value = rollCharacter(catalog, { seed: `p${i}`, attributeIds: ['personality'] })[0]!
      if (!value.label.includes('⇄')) {
        expect(value.valueIds).toHaveLength(1)
        continue
      }
      splits++
      expect(new Set(value.valueIds).size).toBe(2)
      expect(value.detail).toContain('이중인격')
    }
    expect(splits).toBeGreaterThan(5)
    expect(splits).toBeLessThan(45)
  })
})

describe('species spans', () => {
  test('a locked 키 that doesn\'t fit the rolled species is rolled again inside its span', () => {
    const locked = { height: { attributeId: 'height', valueIds: ['큰 편'], label: '190cm', detail: '큰 편', swatches: [] } }
    for (let i = 0; i < 100; i++) {
      const values = rollCharacter(catalog, { seed: `k${i}`, attributeIds: ['world', 'species', 'height'], locked })
      const species = values.find((v) => v.attributeId === 'species')!.valueIds[0]
      const cm = Number(values.find((v) => v.attributeId === 'height')!.label.replace(/[^0-9]/g, ''))
      if (species === 'dwarf') expect(cm).toBeLessThanOrEqual(150)
      if (species === 'fairy') expect(cm).toBeLessThanOrEqual(40)
      if (species === 'human') expect(cm).toBe(190)
    }
  })

  test('the player\'s 키 bounds no longer override a species\' own span', () => {
    const edits = { height: { disabled: [], removed: [], added: [], min: 180, max: 190 } }
    for (let i = 0; i < 200; i++) {
      const values = rollCharacter(catalog, { seed: `b${i}`, attributeIds: ['world', 'species', 'height'], edits })
      const species = values.find((v) => v.attributeId === 'species')!.valueIds[0]
      const cm = Number(values.find((v) => v.attributeId === 'height')!.label.replace(/[^0-9]/g, ''))
      if (species === 'dwarf') expect(cm).toBeLessThanOrEqual(150)
      if (species === 'human') expect(cm).toBeGreaterThanOrEqual(180)
    }
  })

  test('a shipped species takes a changed name, 나이 and 키, kept in the roll key', () => {
    const edits = { species: { disabled: [], removed: [], added: [], changed: { human: { label: '사람', age: { min: 20, max: 25 }, height: { min: 200, max: 210 } } } } }
    let seen = 0
    for (let i = 0; i < 300; i++) {
      const request = { seed: `h${i}`, attributeIds: ['world', 'species', 'age', 'height'], nonces: {}, edits }
      const values = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!)
      const species = values.find((v) => v.attributeId === 'species')!
      if (species.valueIds[0] !== 'human') continue
      seen++
      expect(species.label).toBe('사람')
      const age = Number(values.find((v) => v.attributeId === 'age')!.label.replace(/[^0-9]/g, ''))
      const cm = Number(values.find((v) => v.attributeId === 'height')!.label.replace(/[^0-9]/g, ''))
      expect(age).toBeGreaterThanOrEqual(20)
      expect(age).toBeLessThanOrEqual(25)
      expect(cm).toBeGreaterThanOrEqual(200)
      expect(cm).toBeLessThanOrEqual(210)
    }
    expect(seen).toBeGreaterThan(10)
  })

  test('changed names and colours of other kinds come out in rolls', () => {
    const color = catalog.byId.get('eyeColor') as AttributeOf<'color'>
    const first = color.options[0]!.id
    const edits = { eyeColor: { disabled: color.options.slice(1).map((o) => o.id), removed: [], added: [], changed: { [first]: { label: '바꾼 색', hex: '#123456', hex2: null } } } }
    const value = rollCharacter(catalog, { seed: 'c', attributeIds: ['eyeColor'], edits })[0]!
    expect(value.label).toBe('바꾼 색')
    expect(value.swatches).toEqual(['#123456'])
  })
})

describe('character count', () => {
  test('counts values as edited, and 나이·키 species by species', async () => {
    const { countCharacters } = await import('./count')
    expect(countCharacters(catalog, {}, [])).toBe(0)
    expect(countCharacters(catalog, {}, ['gender'])).toBe(4)
    expect(countCharacters(catalog, { gender: { disabled: ['여성'], removed: [], added: [] } }, ['gender'])).toBe(3)
    // One species on: its own 키 span, not 키's default.
    const onlyDwarf = { species: { disabled: speciesTable.filter((s) => s.id !== 'dwarf').map((s) => s.id), removed: [], added: [] } }
    expect(countCharacters(catalog, onlyDwarf, ['species', 'height'])).toBe(150 - 110 + 1)
  })
})

describe('korean numbers', () => {
  test('two four-digit groups with their units, up to 해; from 1자 beyond counting', async () => {
    const { koreanParts } = await import('./koreanNumber')
    expect(koreanParts(4)).toEqual([{ value: 4, unit: '' }])
    expect(koreanParts(258_910_680)).toEqual([{ value: 2, unit: '억' }, { value: 5891, unit: '만' }])
    expect(koreanParts(1e8)).toEqual([{ value: 1, unit: '억' }])
    expect(koreanParts(3.2e20)).toEqual([{ value: 3, unit: '해' }, { value: 2000, unit: '경' }])
    expect(koreanParts(1e24)).toBeNull()
    expect(koreanParts(2.7e49)).toBeNull()
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

describe('compact keys', () => {
  test('attributes go by two-letter codes, and old full-name keys still read', () => {
    const request = { seed: 's1', attributeIds: ['world', 'species', 'age'], nonces: { age: 2 }, name: '이름' }
    const key = encodeRollKey(request)
    expect(key).toBe('s1~wdspag~ag2~이름')
    expect(decodeRollKey(key)).toEqual(request)
    expect(decodeRollKey('s1~world.species.age~age:2~이름')).toEqual(request)
  })
})

describe('locks', () => {
  test('a locked value survives every new seed and the roll key, and its dependents follow it', () => {
    const elf = { attributeId: 'species', valueIds: ['elf'], label: '엘프', detail: '기대 수명 700–1,000년', swatches: [] }
    for (let i = 0; i < 100; i++) {
      const request = { seed: `k${i}`, attributeIds: ['world', 'species', 'age'], nonces: {}, locked: { species: elf } }
      const values = rollCharacter(catalog, decodeRollKey(encodeRollKey(request))!)
      expect(values.find((v) => v.attributeId === 'species')).toEqual(elf)
      // 나이 reads the locked species: an elf's span, not a human's.
      expect(Number(values.find((v) => v.attributeId === 'age')!.label.replace(/[^0-9]/g, ''))).toBeGreaterThan(90)
    }
  })
})

describe('stats edits', () => {
  test('stats roll only the kept items, in the edited span', () => {
    const edits = { stats: { disabled: ['luck'], removed: [], added: [{ id: 'uM', label: '마력' }], min: 50, max: 100 } }
    for (let i = 0; i < 100; i++) {
      const [value] = rollCharacter(catalog, decodeRollKey(encodeRollKey({ seed: `t${i}`, attributeIds: ['stats'], nonces: {}, edits }))!)
      expect(value!.label).not.toContain('운')
      expect(value!.label).toContain('마력')
      for (const n of value!.label.match(/\d+/g)!.map(Number)) {
        expect(n).toBeGreaterThanOrEqual(50)
        expect(n).toBeLessThanOrEqual(100)
      }
    }
  })
})

describe('range edits', () => {
  test("the player's bounds hold when no species is rolled — a species keeps its own (#142)", () => {
    const edits = { age: { disabled: [], removed: [], added: [], min: 20, max: 25 } }
    for (let i = 0; i < 300; i++) {
      const values = rollCharacter(catalog, { seed: `r${i}`, attributeIds: ['world', 'age'], edits })
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
