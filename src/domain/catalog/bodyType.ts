import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'bodyType',
  code: 'bt',
  label: '체형',
  color: hue.brown,
  kind: 'pick',
  options: [
    { label: '마른 편', weight: 1.4 },
    { label: '슬림', weight: 1.4 },
    { label: '보통', weight: 2 },
    { label: '탄탄함', weight: 1.4 },
    '근육질',
    '통통함',
    '덩치가 큼',
    '아담함',
    { label: '장신에 호리호리', weight: 0.7 },
    { label: '어깨가 넓음', weight: 0.8 },
  ],
})
