import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** The character's image colour — the one an artist would reach for first. */
export default defineAttribute({
  id: 'themeColor',
  code: 'tc',
  label: '테마 컬러',
  color: hue.yellow,
  kind: 'color',
  options: [
    { label: '새벽 남색', hex: '#1f2a5c' },
    { label: '장미', hex: '#c2185b' },
    { label: '숲', hex: '#2e7d32' },
    { label: '노을', hex: '#ef6c00' },
    { label: '라일락', hex: '#b39ddb' },
    { label: '민트', hex: '#80cbc4' },
    { label: '흑백', hex: ['#111111', '#eeeeee'] },
    { label: '금빛', hex: '#d4a017' },
    { label: '하늘', hex: '#81d4fa' },
    { label: '와인', hex: '#6d1b3b' },
    { label: '크림', hex: '#f3e5ab' },
    { label: '은빛', hex: '#c0c0c0' },
  ],
})
