import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'eyeColor',
  label: '눈 색상',
  color: hue.indigo,
  defaultSelected: true,
  kind: 'color',
  options: [
    { label: '흑갈색', hex: '#3b2a20', weight: 3 },
    { label: '호박색', hex: '#c98a2b' },
    { label: '에메랄드', hex: '#1f9e6e' },
    { label: '하늘색', hex: '#6fb7ea' },
    { label: '잿빛', hex: '#8a9099' },
    { label: '자수정', hex: '#8d5bd6', weight: 0.6 },
    { label: '진홍', hex: '#c0263a', weight: 0.5, when: { species: ['vampire', 'dragonkin', 'yokai', 'mutant'] } },
    { label: '황금', hex: '#e8b923', weight: 0.5, hint: '빛을 받으면 동공이 가늘어진다', when: { species: ['dragonkin', 'beastkin', 'yokai'] } },
    { label: '발광 시안', hex: '#20e3ff', hint: '광학 센서', when: { species: ['android', 'cyborg'] } },
    { label: '오드아이', hex: ['#6fb7ea', '#c98a2b'], weight: 0.4, hint: '왼쪽과 오른쪽이 다르다' },
    { label: '회청색', hex: '#6b8394' },
    { label: '올리브', hex: '#7a8a3a', weight: 0.7 },
    { label: '꿀색', hex: '#d9a441', weight: 0.7 },
    { label: '새까만', hex: '#111015', weight: 0.6, hint: '빛이 들지 않는 눈동자' },
    { label: '흰자위까지 검은', hex: '#050505', weight: 0.3, when: { species: ['demon', 'ghost'] } },
  ],
})
