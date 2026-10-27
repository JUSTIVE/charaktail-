import { hue } from '../palette'
import { defineAttribute } from '../schema'

const humanBands = [
  { upTo: 13, label: '어린이' },
  { upTo: 19, label: '청소년' },
  { upTo: 34, label: '청년' },
  { upTo: 54, label: '중년' },
  { upTo: 999, label: '노년' },
]

export default defineAttribute({
  id: 'age',
  label: '나이',
  color: hue.amber,
  defaultSelected: true,
  kind: 'range',
  min: 12,
  max: 72,
  unit: '세',
  distribution: 'normal',
  bands: humanBands,
  cases: [
    { when: { world: ['academy'], species: ['human', 'beastkin'] }, min: 15, max: 19 },
    { when: { species: ['elf'] }, min: 60, max: 900, bands: [{ upTo: 120, label: '어린 엘프' }, { upTo: 600, label: '성숙한 엘프' }, { upTo: 9999, label: '고대 엘프' }] },
    { when: { species: ['dragonkin', 'vampire', 'immortal', 'angel', 'demon'] }, min: 80, max: 1200, step: 10, bands: [{ upTo: 9999, label: '불멸에 가까운' }] },
    { when: { species: ['ghost'] }, min: 9, max: 80, prefix: '사망 당시', bands: [{ upTo: 19, label: '어린 유령' }, { upTo: 999, label: '오래 떠돈' }] },
    { when: { species: ['fairy'] }, min: 10, max: 300, bands: [{ upTo: 50, label: '갓 피어난' }, { upTo: 999, label: '숲의 어른' }] },
    { when: { species: ['android'] }, min: 1, max: 40, prefix: '제조 후', unit: '년', bands: [{ upTo: 3, label: '신형' }, { upTo: 15, label: '현역' }, { upTo: 99, label: '구형' }] },
    { when: { species: ['yokai'] }, min: 100, max: 999, bands: [{ upTo: 9999, label: '천년을 바라보는' }] },
  ],
})
