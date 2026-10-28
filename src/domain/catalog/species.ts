import { hue } from '../palette'
import { defineAttribute } from '../schema'

const magical = ['fantasy', 'darkFantasy']

/** Expected lifespan in years — what 나이 is rolled within and what the value's hint says. */
export interface Lifespan {
  min: number
  max: number
  /** What the span counts when it isn't a life: 유령은 머무는 기간. */
  note?: string
}

/**
 * Every species with its lifespan. A species can't be added without one —
 * `lifespan` is required here, and 나이 derives its range from this table.
 */
interface Species {
  id: string
  label: string
  weight?: number
  when?: Record<string, string[]>
  lifespan: Lifespan
}

export const speciesTable: readonly Species[] = [
  { id: 'human', label: '인간', weight: 3, lifespan: { min: 70, max: 100 } },
  { id: 'elf', label: '엘프', when: { world: [...magical, 'academy'] }, lifespan: { min: 700, max: 1000 } },
  { id: 'dwarf', label: '드워프', when: { world: [...magical, 'steampunk'] }, lifespan: { min: 250, max: 400 } },
  { id: 'beastkin', label: '수인', when: { world: [...magical, 'academy', 'apocalypse'] }, lifespan: { min: 50, max: 80 } },
  { id: 'dragonkin', label: '용인', weight: 0.6, when: { world: [...magical, 'wuxia'] }, lifespan: { min: 1000, max: 3000 } },
  { id: 'vampire', label: '흡혈귀', weight: 0.7, when: { world: ['darkFantasy', 'modern', 'academy'] }, lifespan: { min: 1000, max: 5000, note: '피가 끊기지 않는다면' } },
  { id: 'android', label: '안드로이드', when: { world: ['cyberpunk', 'spaceOpera', 'steampunk'] }, lifespan: { min: 20, max: 40, note: '설계 수명' } },
  { id: 'cyborg', label: '사이보그', when: { world: ['cyberpunk', 'apocalypse', 'spaceOpera'] }, lifespan: { min: 90, max: 150 } },
  { id: 'alien', label: '외계인', when: { world: ['spaceOpera'] }, lifespan: { min: 150, max: 400 } },
  { id: 'mutant', label: '변이체', when: { world: ['apocalypse'] }, lifespan: { min: 30, max: 60 } },
  { id: 'yokai', label: '요괴', when: { world: ['wuxia', 'modern'] }, lifespan: { min: 1000, max: 3000 } },
  { id: 'immortal', label: '신선', weight: 0.5, when: { world: ['wuxia'] }, lifespan: { min: 5000, max: 10000 } },
  { id: 'angel', label: '천사', weight: 0.5, when: { world: ['fantasy', 'darkFantasy', 'occult', 'fairytale'] }, lifespan: { min: 3000, max: 10000 } },
  { id: 'demon', label: '악마', weight: 0.5, when: { world: ['darkFantasy', 'occult', 'modern'] }, lifespan: { min: 2000, max: 8000 } },
  { id: 'mermaid', label: '인어', weight: 0.6, when: { world: ['fantasy', 'pirate', 'fairytale'] }, lifespan: { min: 300, max: 500 } },
  { id: 'fairy', label: '요정', weight: 0.6, when: { world: ['fantasy', 'fairytale'] }, lifespan: { min: 200, max: 400 } },
  { id: 'ghost', label: '유령', weight: 0.6, when: { world: ['occult', 'modern', 'academy'] }, lifespan: { min: 50, max: 500, note: '이승에 머무는 기간' } },
]

const years = (n: number) => n.toLocaleString('ko-KR')

export function describeLifespan({ min, max, note }: Lifespan): string {
  return `${note ?? '기대 수명'} ${years(min)}–${years(max)}년`
}

export default defineAttribute({
  id: 'species',
  label: '종족',
  color: hue.grass,
  description: '세계관에 따라 등장하는 종족이 달라진다',
  defaultSelected: true,
  kind: 'pick',
  options: speciesTable.map(({ lifespan, ...option }) => ({ ...option, hint: describeLifespan(lifespan) })),
})
