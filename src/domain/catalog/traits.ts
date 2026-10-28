import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** Each one rolled on its own odds — none, one, or several. */
export default defineAttribute({
  id: 'traits',
  code: 'tr',
  label: '외형 특징',
  color: hue.coral,
  kind: 'traits',
  options: [
    { label: '안경', chance: 0.25 },
    { label: '주근깨', chance: 0.15 },
    { label: '눈물점', chance: 0.18 },
    { label: '덧니', chance: 0.12 },
    { label: '피어싱', chance: 0.15 },
    { label: '흉터', chance: 0.12 },
    { label: '문신', chance: 0.08 },
    { label: '보조개', chance: 0.15 },
    { label: '안대', chance: 0.05 },
    { label: '뾰족한 귀', chance: 0.6, when: { species: ['elf', 'fairy', 'demon'] } },
    { label: '꼬리', chance: 0.8, when: { species: ['beastkin', 'dragonkin', 'demon'] } },
    { label: '날개', chance: 0.7, when: { species: ['angel', 'fairy', 'dragonkin'] } },
    { label: '기계 의수', chance: 0.4, when: { species: ['cyborg'] } },
  ],
})
