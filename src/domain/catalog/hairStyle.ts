import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'hairStyle',
  label: '머리 스타일',
  color: hue.pink,
  kind: 'pick',
  options: [
    '숏컷',
    '단발',
    '중단발',
    '장발',
    '포니테일',
    '트윈테일',
    '땋은 머리',
    '올림머리',
    '반묶음',
    '울프컷',
    '히메컷',
    '곱슬머리',
    '웨이브',
    { label: '버즈컷', weight: 0.6 },
    { label: '눈을 가리는 앞머리', weight: 0.8 },
    { label: '삐친 머리 한 가닥', weight: 0.6, hint: '아무리 정리해도 다시 선다' },
  ],
})
