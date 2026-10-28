import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'weakness',
  code: 'wk',
  label: '약점',
  color: hue.gold,
  kind: 'pick',
  options: [
    '단 것에 약함', '길치', '거절을 못 함', '물을 무서워함', '거짓말이 서툶', '아침잠',
    '칭찬에 약함', '체력 부족', '과거의 트라우마', '동물을 못 지나침', '감정이 얼굴에 다 드러남',
    '숫자에 약함', '술에 약함', '귀가 얇음',
    { label: '은에 약함', when: { species: ['vampire', 'demon', 'beastkin'] } },
    { label: '방전되면 멈춤', when: { species: ['android', 'cyborg'] } },
  ],
})
