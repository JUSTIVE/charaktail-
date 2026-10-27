import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'height',
  label: '키',
  color: '#2ec5e6',
  defaultSelected: true,
  kind: 'range',
  min: 145,
  max: 195,
  unit: 'cm',
  distribution: 'normal',
  bands: [
    { upTo: 158, label: '작은 편' },
    { upTo: 178, label: '평균' },
    { upTo: 999, label: '큰 편' },
  ],
  cases: [
    { when: { species: ['dwarf'] }, min: 110, max: 150, bands: [{ upTo: 125, label: '드워프치고 작은' }, { upTo: 999, label: '드워프치고 큰' }] },
    { when: { species: ['dragonkin', 'beastkin'] }, min: 160, max: 230 },
    { when: { species: ['alien'] }, min: 90, max: 260, distribution: 'uniform' },
  ],
})
